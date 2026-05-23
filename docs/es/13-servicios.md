# Servicios

2 servicios que encapsulan lógica de negocio reutilizable.

## HorarioService

**Archivo:** `app/Services/HorarioService.php`

**Propósito:** Centralizar toda la lógica relacionada con horarios de rezo.

### Métodos

| Método | Descripción |
|--------|-------------|
| `getTodaySchedule()` | Devuelve el horario de hoy con tiempos de espera aplicados |
| `getMonthlySchedule($year, $month)` | Devuelve todos los días de un mes con sus horarios |
| `getPrayerTimesForDay($date)` | Horarios base para una fecha concreta |
| `applyWaitTimes($prayerTimes)` | Aplica los minutos de espera a cada rezo |
| `formatTime($time)` | Formatea hora HH:MM |

### Cache

Los horarios se cachean con `Cache::remember()` para evitar consultas repetitivas a BD. La clave de cache incluye la fecha para invalidación automática.

**Decisión técnica:** Se usa caché porque los horarios de rezo solo cambian una vez al año (con el seeder). No tiene sentido consultar BD en cada request.

## TiempoEsperaService

**Archivo:** `app/Services/TiempoEsperaService.php`

**Propósito:** Gestionar los tiempos de espera entre adhan e iqama.

### Métodos

| Método | Descripción |
|--------|-------------|
| `getAll()` | Devuelve todos los tiempos de espera como array clave→valor |
| `getForPrayer($rezo)` | Minutos de espera para un rezo concreto |

### Cache

También usa caché con `Cache::remember()`. Se invalida cuando el admin modifica los tiempos desde el panel.

### Uso

`TiempoEsperaService` se inyecta en HorarioService para calcular los horarios definitivos (adhan + espera = iqama). También se comparte globalmente via `HandleInertiaRequests` para que el frontend pueda mostrar tanto el adhan como la iqama.
