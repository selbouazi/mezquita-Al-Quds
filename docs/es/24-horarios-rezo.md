# Módulo: Horarios de Rezo

El módulo más complejo del proyecto. Gestiona los horarios de las 6 oraciones diarias (fajr, sunrise, dhuhr, asr, maghrib, isha) con datos reales de la mezquita.

## ¿Qué hace?

- Muestra el horario de rezo del día actual en la página principal
- Calendario mensual con todos los días del año
- Reloj analógico de 24h con marcadores de cada rezo
- Countdown del próximo rezo con tiempo restante
- Aplica tiempos de espera entre adhan (llamada) e iqama (inicio)
- Permite al admin configurar los tiempos de espera

## Base de datos

3 tablas:
- `horarios` — horarios base (365 días reales)
- `tiempos_espera` — minutos entre adhan e iqama por rezo
- `horarios_modificados` — excepciones puntuales (Ramadán, eventos)

## Dificultades y soluciones

### 1) Datos de horarios reales

**Problema:** Los horarios mostrados inicialmente eran hardcoded. Necesitábamos datos reales de la mezquita.

**Solución:** Se obtuvo el PDF oficial de Mawaqit (sistema que usa la mezquita) y se generó un seeder con los 365 días. Se descartó la API de AlAdhan porque sus horarios no coinciden con los reales.

### 2) Cambio de horario (verano/invierno)

**Problema:** El seeder debía respetar el cambio de hora de marzo (adelanto) y octubre (atraso).

**Solución:** Se generó manualmente el seeder con los horarios ajustados para cada período. El PDF de Mawaqit ya incluye el cambio horario.

### 3) Caché de horarios

**Decisión:** Los horarios se cachean porque solo cambian una vez al año. Se usa `Cache::remember()` con clave por fecha para invalidación automática.

### 4) Reloj analógico de 24h

**Problema:** Los relojes de rezos típicos usan formato de 12h, pero necesitábamos uno de 24h que mostrara correctamente todos los rezos del día.

**Solución:** Mapear 24 horas a 360° (15° por hora). Cada marcador de rezo se posiciona según `hora * 15 + minutos * 0.25`. El arco diurno va desde sunrise hasta maghrib.

## Archivos clave

- `database/migrations/2026_03_23_014431_create_horarios_table.php`
- `database/migrations/2026_03_23_014432_create_tiempos_espera_table.php`
- `database/seeders/Horarios2026Seeder.php` (365 días)
- `database/seeders/TiemposEsperaSeeder.php`
- `app/Models/Horario.php`
- `app/Models/TiempoEspera.php`
- `app/Services/HorarioService.php`
- `app/Services/TiempoEsperaService.php`
- `app/Http/Controllers/HorarioController.php`
- `app/Http/Controllers/Admin/TiemposEsperaController.php`
- `app/Http/Middleware/HandleInertiaRequests.php` (comparte tiempos globalmente)
- `resources/js/Components/PrayerClock.jsx`
- `resources/js/Components/PrayerHeader.jsx`
- `resources/js/Pages/Horarios.jsx`
- `resources/js/Pages/Home.jsx`
- `resources/js/Pages/Admin/Horarios.jsx`
