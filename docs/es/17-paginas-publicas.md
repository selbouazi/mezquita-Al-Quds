# Páginas públicas

7 páginas React accesibles sin autenticación.

## Home (`/`)

**Archivo:** `Pages/Home.jsx`

Página principal con:
- PrayerHeader — countdown del próximo rezo
- PrayerClock — reloj analógico de 24h con marcadores
- Horario del día completo (fajr, sunrise, dhuhr, asr, maghrib, isha)
- Notificaciones activas destacadas
- Diseño responsive con animaciones fade-in

## Horarios (`/horarios`)

**Archivo:** `Pages/Horarios.jsx`

Calendario mensual de rezos. Acepta parámetros `?year=YYYY&month=M`.

Muestra una tabla con todos los días del mes y sus 6 horarios de rezo. Navegación entre meses con flechas.

## Noticias (`/noticias`)

**Archivo:** `Pages/Noticias.jsx`

Lista paginada de noticias publicadas (6 por página). Cada tarjeta muestra título, imagen destacada, extracto y fecha de publicación.

## Contacto (`/contacto`)

**Archivo:** `Pages/Contacto.jsx`

Formulario de contacto con:
- Campos: nombre, email, mensaje
- Selector de tipo: formulario web / contacto telefónico
- Envío AJAX mediante `useForm` de Inertia
- Validación en frontend y backend
- Mensaje de éxito/error sin recarga

## Ubicación (`/ubicacion`)

**Archivo:** `Pages/Ubicacion.jsx`

Datos de la mezquita:
- Dirección
- Teléfono, email, WhatsApp
- Botón "Ver en Google Maps"
- Información del imam

## Imam (`/imam`)

**Archivo:** `Pages/Imam.jsx`

Página pública con información del imam: nombre, foto, descripción. Los datos se cargan desde la tabla `imam_settings`.

## Notifications (`/notifications`)

**Archivo:** `Pages/Public/Notifications.jsx`

Lista de notificaciones activas, ordenadas por prioridad. Muestra título, mensaje, fecha de publicación.
