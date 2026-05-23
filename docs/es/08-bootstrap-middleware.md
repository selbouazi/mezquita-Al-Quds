# Bootstrap y Service Providers

## bootstrap/app.php

Archivo central que configura la aplicación Laravel. Aquí se registran:

### Middleware global (->withMiddleware)

```php
->withMiddleware(function (Middleware $middleware) {
    $middleware->alias([
        'guest' => \App\Http\Middleware\RedirectIfAuthenticated::class,
    ]);
})
```

El alias `guest` se usa en rutas para redirigir usuarios ya autenticados.

### Middleware web (grupo por defecto)

- `SetLocale` — establece el idioma de la sesión
- `HandleInertiaRequests` — comparte datos con React

### Rutas (->withRouting)

```php
->withRouting(
    web: __DIR__.'/../routes/web.php',
    // admin.php se incluye desde web.php
)
```

Las rutas admin se cargan desde `routes/admin.php` mediante `require __DIR__.'/../routes/admin.php'` dentro de `routes/web.php`.

## bootstrap/providers.php

Registra los service providers:

```php
return [
    App\Providers\AppServiceProvider::class,
    App\Providers\FortifyServiceProvider::class,
];
```

## AppServiceProvider

Service provider vacío (`register()` y `boot()` sin contenido). Listo para futuras personalizaciones.

## FortifyServiceProvider

Registra las acciones de Fortify y configura las vistas de login/register con Inertia:

```php
Fortify::createUsersUsing(CreateNewUser::class);
Fortify::updateUserProfileInformationUsing(UpdateUserProfileInformation::class);
Fortify::updateUserPasswordsUsing(UpdateUserPassword::class);
Fortify::resetUserPasswordsUsing(ResetUserPassword::class);

Fortify::loginView(fn () => Inertia::render('Auth/Login'));
Fortify::registerView(fn () => Inertia::render('Auth/Register'));
```

También configura el rate limiting:

```php
RateLimiter::for('login', fn ($request) => Limit::perMinute(5)->by($key));
RateLimiter::for('two-factor', fn ($request) => Limit::perMinute(5)->by($request->session()->get('login.id')));
```
