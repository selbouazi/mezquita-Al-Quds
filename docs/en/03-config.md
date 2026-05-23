# General Configuration

## Environment Variables (.env)

Key project variables:

| Variable | Example value | Description |
|----------|---------------|-------------|
| `APP_LOCALE` | es | Default language |
| `DB_DATABASE` | mezquita_alquds | Database name |
| `FILESYSTEM_DISK` | local | Storage disk |

## Config Files (config/)

### config/app.php
General Laravel config: timezone (`UTC`), locale (`es`), providers, aliases.

### config/database.php
Default MySQL connection. Pooling, charset, collation config.

### config/filesystems.php
Storage disks:
- `local` — default local storage
- `public` — public files (PDFs, news images, imam photos)
- `facturas`, `noticias`, `imam` — additional disks for organization

### config/fortify.php
Authentication system config:
- `features` — registration, login, two-factor, password reset
- `views` — disabled (we use Inertia)
- `redirects` — post-login redirect to `/admin`
- `home` — `/admin` route for authenticated users
- `limiters` — rate limiting: 5 attempts/min for login, 5 for two-factor

### config/session.php
Session config: `file` driver (default), 120 min lifetime.

### config/mail.php, config/queue.php, config/cache.php, config/auth.php, config/services.php, config/logging.php
Standard Laravel configurations. No relevant customizations.

## Technical Decisions

- **Fortify over Breeze/Jetstream**: Fortify was chosen because it exposes actions explicitly and gives full control over the auth flow. We didn't want Breeze imposing a specific frontend (Blade or their own React style).
- **Rate limiting**: 5 attempts/minute for login as a basic security measure.
- **Inertia views**: Login/register views are rendered from FortifyServiceProvider using `Inertia::render()` instead of Fortify's default Blade views.
