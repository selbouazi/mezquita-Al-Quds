# Rutas

## web.php — Rutas públicas y autenticadas

### Rutas de autenticación

| Método | URI | Controlador | Descripción |
|--------|-----|-------------|-------------|
| GET | `/login` | Fortify — vista Inertia | Formulario login |
| POST | `/login` | Fortify — rate limited (5/min) | Iniciar sesión |
| POST | `/logout` | Fortify | Cerrar sesión |
| GET | `/register` | `RegisterController@showRegistrationForm` | Formulario registro |
| POST | `/register` | `RegisterController@register` — throttle:5,1 | Registrarse con código de activación |

### Rutas públicas (sin autenticación)

| Método | URI | Descripción |
|--------|-----|-------------|
| GET | `/` | Home con horario del día y reloj rezos |
| GET | `/horarios` | Calendario mensual de rezos (?year=Y&month=M) |
| GET | `/noticias` | Lista de noticias publicadas (paginated) |
| GET | `/noticia/{noticia}` | Noticia individual |
| GET | `/contacto` | Formulario de contacto |
| POST | `/contacto` | Enviar mensaje (ContactController@store) — throttle:5,1 |
| GET | `/ubicacion` | Mapa y datos de contacto |
| GET | `/imam` | Información del imam |
| GET | `/notifications` | Notificaciones públicas |
| GET | `/lang/{lang}` | Cambiar idioma (es, ca, ar, en) |

### Rutas de API pública

| Método | URI | Descripción |
|--------|-----|-------------|
| GET | `/api/imam` | Datos del imam en JSON |
| GET | `/api/notificaciones` | Notificaciones activas en JSON |

### Rutas autenticadas (auth)

| Método | URI | Descripción |
|--------|-----|-------------|
| GET | `/facturas` | Lista de facturas (solo usuarios logueados) |
| GET | `/facturas/{factura}/download` | Descargar PDF de factura |
| GET | `/donativos` | Lista de donativos (filtro por año) |

### admin.php — Rutas del panel de administración

Incluido desde `web.php` con `require __DIR__.'/admin.php'`.

Todas las rutas admin usan middleware `auth` y `admin`.

| URI | Módulo | Métodos |
|-----|--------|---------|
| `/admin` | Dashboard | GET |
| `/admin/donativos` | Donativos | GET, POST, PUT/{donativo}, DELETE/{donativo}, POST/{donativo}/toggle |
| `/admin/facturas` | Facturas | GET, POST, POST/{factura}, DELETE/{factura}, GET/{factura}/download |
| `/admin/clases` | Clases | GET, POST, POST/{clase}, DELETE/{clase} |
| `/admin/noticias` | Noticias | GET, POST, POST/{noticia}, DELETE/{noticia} |
| `/admin/notificaciones` | Notificaciones | GET, POST, PUT/{notificacion}, DELETE/{notificacion}, POST/{notificacion}/toggle |
| `/admin/contactos` | Contactos | GET, POST/{contacto}/leido, DELETE/{contacto} |
| `/admin/ubicacion` | Ubicación | GET, POST/guardar |
| `/admin/imam` | Imam | GET, POST/guardar |
| `/admin/codigos` | Códigos | GET, POST/generar, POST/actualizar |
| `/admin/horarios` | Tiempos espera | GET, POST/{rezo} |

### console.php

Único comando: `php artisan inspire` (por defecto de Laravel).
