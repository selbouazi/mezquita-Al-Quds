# API

Endpoints públicos JSON para consumir datos desde otros servicios.

## /api/imam

**Método:** GET
**Respuesta:**
```json
{
    "nombre": "Nombre del Imam",
    "descripcion": "Descripción del imam...",
    "foto": "http://ejemplo.com/storage/imam/foto.jpg"
}
```

**Propósito:** Proveer datos del imam para integrar en pantallas informativas, apps externas, etc.

**Backend:** Closure en `routes/web.php` que consulta `ImamSetting::first()`.

## /api/notificaciones

**Método:** GET
**Respuesta:**
```json
[
    {
        "titulo": "Título de la notificación",
        "mensaje": "Mensaje...",
        "prioridad": "alta",
        "fecha_publicacion": "2026-04-13"
    }
]
```

**Propósito:** Listar notificaciones activas (no expiradas), ordenadas por prioridad. Útil para pantallas informativas o integraciones externas.

**Backend:** Closure en `routes/web.php` que consulta `Notification::activas()->ordenadas()->get(['titulo', 'mensaje', 'prioridad', 'fecha_publicacion'])`.

## Seguridad

Ambos endpoints son públicos (sin autenticación) porque solo exponen datos no sensibles. Los endpoints del panel admin están protegidos por middleware `auth` y `admin`.

## Archivos clave

- `routes/web.php` (closures para ambos endpoints)
- `app/Models/ImamSetting.php`
- `app/Models/Notification.php`
