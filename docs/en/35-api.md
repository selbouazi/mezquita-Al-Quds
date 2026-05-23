# API

Public JSON endpoints for consuming data from other services.

## /api/imam

**Method:** GET
**Response:**
```json
{
    "nombre": "Imam Name",
    "descripcion": "Imam description...",
    "foto": "http://example.com/storage/imam/photo.jpg"
}
```

**Purpose:** Provide imam data for integration with info screens, external apps, etc.

**Backend:** Closure in `routes/web.php` querying `ImamSetting::first()`.

## /api/notificaciones

**Method:** GET
**Response:**
```json
[
    {
        "titulo": "Notification title",
        "mensaje": "Message...",
        "prioridad": "high",
        "fecha_publicacion": "2026-04-13"
    }
]
```

**Purpose:** List active (non-expired) notifications, ordered by priority. Useful for info screens or external integrations.

**Backend:** Closure in `routes/web.php` querying `Notification::activas()->ordenadas()->get(['titulo', 'mensaje', 'prioridad', 'fecha_publicacion'])`.

## Security

Both endpoints are public (no auth) because they only expose non-sensitive data. Admin panel endpoints are protected by `auth` and `admin` middleware.

## Key files

- `routes/web.php` (closures for both endpoints)
- `app/Models/ImamSetting.php`
- `app/Models/Notification.php`
