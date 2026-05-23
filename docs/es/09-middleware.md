# Middleware

4 middleware personalizados que gestionan autenticación, idioma y datos compartidos.

## AdminMiddleware

**Archivo:** `app/Http/Middleware/AdminMiddleware.php`

**Propósito:** Restringir rutas del panel admin solo a usuarios con rol `admin`.

**Comportamiento:**
- Si el usuario no está autenticado → redirige a login
- Si el usuario está autenticado pero su `rol` no es `admin` → redirige a `/` con mensaje flash de error y HTTP redirect
- Si es admin → permite el acceso

**Cambio:** Anteriormente renderizaba una página Inertia `Auth/AccessDenied` con HTTP 200. Ahora redirige con HTTP 302 y mensaje de error, comportamiento HTTP semánticamente correcto.

**Uso en rutas:**
```php
Route::middleware(['auth', 'admin'])->group(function () {
    // rutas admin
});
```

## HandleInertiaRequests

**Archivo:** `app/Http/Middleware/HandleInertiaRequests.php`

**Propósito:** Compartir datos globales con todas las páginas React a través de Inertia.

**Datos compartidos:**
- `locale` — idioma activo (de la sesión)
- `auth.user` — usuario autenticado (o null)
- `flash` — mensajes flash de sesión
- `tiemposEspera` — tiempos de espera de rezos (cacheados)

**Decisión técnica:** Los tiempos de espera se comparten globalmente porque se necesitan en todas las páginas que muestran horarios (Header, Clock, etc.), evitando una llamada a BD por cada render.

## SetLocale

**Archivo:** `app/Http/Middleware/SetLocale.php`

**Propósito:** Establecer el idioma de la aplicación basado en la sesión.

**Comportamiento:**
```php
$locale = session('locale', 'es');
app()->setLocale($locale);
```

El locale se guarda en sesión cuando el usuario visita `/lang/{locale}`. Por defecto: `es`.

**Idiomas soportados:** `es`, `ca`, `ar`, `en`

## RedirectIfAuthenticated

**Archivo:** `app/Http/Middleware/RedirectIfAuthenticated.php`

**Propósito:** Redirigir usuarios ya autenticados lejos de las páginas de login/register.

**Comportamiento:**
- Si el usuario está autenticado → redirige a `/admin`
- Si no → permite el acceso a la ruta

**Registrado como alias** `guest` en `bootstrap/app.php`.
