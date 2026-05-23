# Module: Notifications

Push-style notification system for urgent community communication.

## What it does

- Admin creates notifications with title, message and priority
- Active notifications show in a dropdown (bell) in the navbar
- Public page with all active notifications
- JSON API for consuming from other services
- Notifications can have expiration dates

## Database

**Table:** `notifications`
**Fields:** titulo, mensaje, prioridad (low/normal/high/urgent), activa (boolean), fecha_publicacion, fecha_expiracion

## Backend

**Admin controller:** `Admin\NotificationController`
**API controller:** closure in `web.php`
**Model:** `Notification`

**Scopes:**
- `scopeActivas()` — active and not expired
- `scopeOrdenadas()` — ordered by priority (urgent first) and date

**Admin methods:**
- `index()` — list with search/filter
- `store(Request)` — create
- `update(Request, $id)` — update
- `destroy($id)` — delete
- `toggle(Notification $notification)` — enable/disable

## Frontend

**Bell (navbar):** `Components/NotificationBell.jsx`
- Badge with active notification count
- Dropdown with 5 most recent
- "View all" link

**Public page:** `Pages/Public/Notifications.jsx`
- Complete list of active notifications
- Ordered by priority

**Admin page:** `Pages/Admin/Notificaciones.jsx`
- Full CRUD with search
- Priority selector
- Active/inactive toggle
- Expiration date

## API

**Endpoint:** `GET /api/notificaciones`
**Response:** JSON with active, ordered notifications

## Technical decisions

- **Priorities:** 4 levels (low, normal, high, urgent) so the imam can highlight important messages.
- **Expiration:** Notifications auto-hide when `fecha_expiracion` passes, no manual intervention needed.
- **JSON API:** Allows integration with other systems (info screens, external apps).

## Key files

- `app/Models/Notification.php`
- `app/Http/Controllers/Admin/NotificationController.php`
- `resources/js/Components/NotificationBell.jsx`
- `resources/js/Pages/Admin/Notificaciones.jsx`
- `resources/js/Pages/Public/Notifications.jsx`
- `database/migrations/2026_04_13_000001_create_notifications_table.php`
- `routes/web.php` (`/api/notificaciones` endpoint)
