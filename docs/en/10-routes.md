# Routes

## web.php — Public and Authenticated Routes

### Auth Routes

| Method | URI | Controller | Description |
|--------|-----|------------|-------------|
| GET | `/login` | Fortify — Inertia view | Login form |
| POST | `/login` | Fortify — rate limited (5/min) | Sign in |
| POST | `/logout` | Fortify | Sign out |
| GET | `/register` | `RegisterController@showRegistrationForm` | Register form |
| POST | `/register` | `RegisterController@register` — throttle:5,1 | Register with activation code |

### Public Routes (no auth)

| Method | URI | Description |
|--------|-----|-------------|
| GET | `/` | Home with daily prayer times and clock |
| GET | `/horarios` | Monthly prayer calendar (?year=Y&month=M) |
| GET | `/noticias` | Published news list (paginated) |
| GET | `/noticia/{noticia}` | Single news article |
| GET | `/contacto` | Contact form |
| POST | `/contacto` | Send message (ContactController@store) — throttle:5,1 |
| GET | `/ubicacion` | Map and contact data |
| GET | `/imam` | Imam information |
| GET | `/notifications` | Public notifications |
| GET | `/lang/{lang}` | Switch language (es, ca, ar, en) |

### Public API Routes

| Method | URI | Description |
|--------|-----|-------------|
| GET | `/api/imam` | Imam data in JSON |
| GET | `/api/notificaciones` | Active notifications in JSON |

### Authenticated Routes (middleware: auth)

| Method | URI | Description |
|--------|-----|-------------|
| GET | `/facturas` | Invoice list (logged-in users only) |
| GET | `/facturas/{factura}/download` | Download invoice PDF |
| GET | `/donativos` | Donation list (year filter) |

### admin.php — Admin Panel Routes

Included from `web.php` with `require __DIR__.'/admin.php'`.

All admin routes use `auth` and `admin` middleware.

| URI | Module | Methods |
|-----|--------|---------|
| `/admin` | Dashboard | GET |
| `/admin/donativos` | Donations | GET, POST, PUT/{donativo}, DELETE/{donativo}, POST/{donativo}/toggle |
| `/admin/facturas` | Invoices | GET, POST, POST/{factura}, DELETE/{factura}, GET/{factura}/download |
| `/admin/clases` | Classes | GET, POST, POST/{clase}, DELETE/{clase} |
| `/admin/noticias` | News | GET, POST, POST/{noticia}, DELETE/{noticia} |
| `/admin/notificaciones` | Notifications | GET, POST, PUT/{notificacion}, DELETE/{notificacion}, POST/{notificacion}/toggle |
| `/admin/contactos` | Contacts | GET, POST/{contacto}/leido, DELETE/{contacto} |
| `/admin/ubicacion` | Location | GET, POST/guardar |
| `/admin/imam` | Imam | GET, POST/guardar |
| `/admin/codigos` | Codes | GET, POST/generar, POST/actualizar |
| `/admin/horarios` | Wait times | GET, POST/{rezo} |

### console.php

Only command: `php artisan inspire` (Laravel default).
