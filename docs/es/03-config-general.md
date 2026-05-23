# Configuración general

## Variables de entorno (.env)

Variables clave del proyecto:

| Variable | Valor ejemplo | Descripción |
|----------|---------------|-------------|
| `APP_LOCALE` | es | Idioma por defecto |
| `ADMIN_PASSWORD` | — | Contraseña del admin (generada con `php artisan key:generate` o manual) |
| `DB_DATABASE` | mezquita_alquds | Nombre de la BD |
| `FILESYSTEM_DISK` | local | Disco de almacenamiento |

## Archivos de configuración (config/)

### config/app.php
Configuración general de Laravel: zona horaria (`UTC`), locale (`es`), providers, aliases.

### config/database.php
Conexión a MySQL por defecto. Configuración de pooling, charset, collation.

### config/filesystems.php
Discos de almacenamiento:
- `local` — almacenamiento local por defecto
- `public` — archivos públicos (facturas PDF, imágenes noticias, fotos imam)
- `facturas`, `noticias`, `imam` — discos adicionales para organización

### config/fortify.php
Configuración del sistema de autenticación:
- `features` — registro, login, two-factor, password reset
- `views` — desactivadas (usamos Inertia)
- `redirects` — redirección post-login a `/admin`
- `home` — ruta `/admin` para usuarios autenticados
- `limiters` — rate limiting: 5 intentos/minuto para login, 5 para two-factor

### config/session.php
Configuración de sesión: driver `file` (por defecto), lifetime 120 minutos.

### config/mail.php, config/queue.php, config/cache.php, config/auth.php, config/services.php, config/logging.php
Configuraciones estándar de Laravel. Sin personalizaciones relevantes.

## Decisiones técnicas

- **Fortify en lugar de Breeze/Jetstream**: Se eligió Fortify porque expone las acciones de forma explícita y da control total sobre el flujo de autenticación. No queríamos que Breeze impusiera un frontend específico (Blade o React a su manera).
- **Rate limiting**: Se configuró límite de 5 intentos/minuto para login como medida de seguridad básica.
- **Vistas Inertia**: Las vistas de login/registro se renderizan desde FortifyServiceProvider usando `Inertia::render()` en lugar de las vistas Blade por defecto de Fortify.
