# Bootstrap and Service Providers

## bootstrap/app.php

Central file that configures the Laravel application. Registers:

### Global Middleware (->withMiddleware)

```php
->withMiddleware(function (Middleware $middleware) {
    $middleware->alias([
        'guest' => \App\Http\Middleware\RedirectIfAuthenticated::class,
    ]);
})
```

The `guest` alias is used in routes to redirect already authenticated users.

### Web Middleware (default group)

- `SetLocale` — sets session language
- `HandleInertiaRequests` — shares data with React

### Routes (->withRouting)

```php
->withRouting(
    web: __DIR__.'/../routes/web.php',
)
```

Admin routes are loaded from `routes/admin.php` via `require __DIR__.'/../routes/admin.php'` inside `routes/web.php`.

## bootstrap/providers.php

Registers service providers:

```php
return [
    App\Providers\AppServiceProvider::class,
    App\Providers\FortifyServiceProvider::class,
];
```

## AppServiceProvider

Empty service provider (`register()` and `boot()` are empty). Ready for future customizations.

## FortifyServiceProvider

Registers Fortify actions and configures login/register views with Inertia:

```php
Fortify::createUsersUsing(CreateNewUser::class);
Fortify::updateUserProfileInformationUsing(UpdateUserProfileInformation::class);
Fortify::updateUserPasswordsUsing(UpdateUserPassword::class);
Fortify::resetUserPasswordsUsing(ResetUserPassword::class);

Fortify::loginView(fn () => Inertia::render('Auth/Login'));
Fortify::registerView(fn () => Inertia::render('Auth/Register'));
```

Also configures rate limiting:

```php
RateLimiter::for('login', fn ($request) => Limit::perMinute(5)->by($key));
RateLimiter::for('two-factor', fn ($request) => Limit::perMinute(5)->by($request->session()->get('login.id')));
```
