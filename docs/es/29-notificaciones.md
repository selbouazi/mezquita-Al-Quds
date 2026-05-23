# Módulo: Notificaciones

Sistema de notificaciones tipo push para comunicación urgente con la comunidad.

## ¿Qué hace?

- El admin crea notificaciones con título, mensaje y prioridad
- Las notificaciones activas se muestran en un dropdown (campana) en el navbar
- Página pública con todas las notificaciones activas
- API JSON para consumir notificaciones desde otros servicios
- Las notificaciones pueden tener fecha de expiración

## Base de datos

**Tabla:** `notifications`
**Campos:** titulo, mensaje, prioridad (baja/normal/alta/urgente), activa (boolean), fecha_publicacion, fecha_expiracion

## Backend

**Controlador admin:** `Admin\NotificationController`
**Controlador API:** en `web.php` (closure)
**Modelo:** `Notification`

**Scopes:**
- `scopeActivas()` — activas y no expiradas
- `scopeOrdenadas()` — ordenadas por prioridad (urgente primero) y fecha

**Métodos admin:**
- `index()` — lista con búsqueda/filtro
- `store(Request)` — crear (valida `fecha_expiracion > fecha_publicacion`)
- `update(Request, $id)` — actualizar (valida `fecha_expiracion > fecha_publicacion`)
- `destroy($id)` — eliminar
- `toggle(Notification $notification)` — activar/desactivar

## Frontend

**Campana (navbar):** `Components/NotificationBell.jsx`
- Badge con número de notificaciones activas
- Dropdown con las 5 más recientes
- Enlace "Ver todas"

**Página pública:** `Pages/Public/Notifications.jsx`
- Lista completa de notificaciones activas
- Ordenadas por prioridad

**Página admin:** `Pages/Admin/Notificaciones.jsx`
- CRUD completo con buscador
- Selector de prioridad
- Toggle activa/inactiva
- Fecha de expiración

## API

**Endpoint:** `GET /api/notificaciones`
**Respuesta:** JSON con notificaciones activas ordenadas

## Decisiones técnicas

- **Prioridades:** 4 niveles (baja, normal, alta, urgente) para que el imam pueda destacar mensajes importantes.
- **Expiración:** Las notificaciones se ocultan automáticamente al llegar a `fecha_expiracion`, sin necesidad de intervención manual.
- **API JSON:** Permite integrar las notificaciones en otros sistemas (pantallas informativas,apps externas).

## Archivos clave

- `app/Models/Notification.php`
- `app/Http/Controllers/Admin/NotificationController.php`
- `resources/js/Components/NotificationBell.jsx`
- `resources/js/Pages/Admin/Notificaciones.jsx`
- `resources/js/Pages/Public/Notifications.jsx`
- `database/migrations/2026_04_13_000001_create_notifications_table.php`
- `routes/web.php` (endpoint `/api/notificaciones`)
