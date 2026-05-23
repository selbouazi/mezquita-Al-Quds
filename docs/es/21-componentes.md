# Componentes React

5 componentes reutilizables.

## Navbar

**Archivo:** `Components/Navbar.jsx`

Barra de navegación principal con:
- Logo de la mezquita
- Enlaces a páginas públicas (Inicio, Horarios, Noticias, Contacto, Ubicación, Imam)
- Selector de idioma (4 banderas: ES, CA, AR, EN)
- Campana de notificaciones (NotificationBell)
- Menú de usuario (login/logout)
- Menú responsive para móvil (hamburguesa)

Efecto visual: el navbar se reduce al hacer scroll (cambia padding y sombra).

## Footer

**Archivo:** `Components/Footer.jsx`

Footer con:
- Logo
- Enlaces rápidos
- Información de contacto
- Botón "Ver en Google Maps"

## PrayerHeader

**Archivo:** `Components/PrayerHeader.jsx`

Componente de countdown que muestra:
- Próximo rezo del día
- Tiempo restante (actualizado cada segundo)
- Estado: "Falta X tiempo para Y" o "Es hora de Y" según el momento
- Si el rezo tiene iqama, muestra ambos tiempos

**Backend:** Recibe los datos desde `HandleInertiaRequests` (compartido globalmente).

## PrayerClock

**Archivo:** `Components/PrayerClock.jsx`

Reloj analógico de 24 horas construido con SVG/Canvas:
- Circunferencia del reloj
- Marcadores para cada rezo (fajr, sunrise, dhuhr, asr, maghrib, isha)
- Arco diurno (desde sunrise hasta maghrib)
- Aguja de hora actual
- Tooltips al hover sobre cada rezo
- Animación flotante del segundero

**Complejidad técnica:** El cálculo de posiciones de los marcadores en un reloj de 24h (en lugar de 12h) requiere mapear las 24 horas a 360 grados (15° por hora). Los marcadores se posicionan según la hora del rezo en el día.

## NotificationBell

**Archivo:** `Components/NotificationBell.jsx`

Campana con:
- Badge con número de notificaciones activas
- Dropdown con las 5 notificaciones más recientes
- Enlace "Ver todas" que lleva a `/notifications`
