# Module: Authentication

Complete authentication system with activation code registration, user roles and rate limiting.

## What it does

- Login with email and password
- Registration with activation code
- Logout
- Roles: admin and user
- Rate limiting (5 attempts/minute)
- Two-factor authentication (supported by Fortify, not implemented in UI)
- Access denied page for non-admin users

## Components

| Component | Technology |
|-----------|-----------|
| Backend auth | Laravel Fortify |
| Login UI | React + Inertia |
| Register UI | React + Inertia |
| Roles | MySQL enum + AdminMiddleware |
| Rate limiting | Fortify + Laravel RateLimiter |
| Activation codes | ActivationCode model + admin CRUD |

## Difficulties and solutions

### 1) Fortify vs Breeze/Jetstream

**Problem:** Breeze and Jetstream impose a specific frontend (Blade or their own React structure). With Inertia, we needed full control.

**Solution:** Fortify exposes auth actions as independent classes (CreateNewUser, UpdateUserProfile, etc.) without imposing views. Views are rendered from `FortifyServiceProvider` with `Inertia::render()`.

### 2) Activation codes

**Decision:** To prevent automated registrations, a code system was implemented. The imam generates codes from the admin panel and distributes them offline. Codes are **reusable**: as long as they remain active in `/admin/codigos`, any number of users can register with the same code. The imam manually deactivates a code when it should no longer be used.

**Validation in RegisterController:**
```php
$codigo = ActivationCode::where('codigo', strtoupper($request->codigo_activacion))
    ->where('activo', true)
    ->first();

if (!$codigo) {
    return back()->withErrors([
        'codigo_activacion' => 'El código de activación no es válido o está inactivo.',
    ]);
}
```

### 3) Roles

**Implementation:** Added `rol` column as enum(admin, user) to the `users` table. The `AdminMiddleware` checks the role on every admin route.

**Access flow:**
1. Unauthenticated user → redirect to login
2. Authenticated user with role=user → redirect to `/` with error message
3. Authenticated user with role=admin → allow access

### 4) Rate limiting

**Implementation:** Three-layer rate limiting to prevent brute force and spam:

| Route | Limit | Implemented in |
|-------|-------|----------------|
| POST /login | 5 attempts/min per email+IP | FortifyServiceProvider (RateLimiter::for('login')) |
| POST /register | 5 attempts/min | `throttle:5,1` middleware in web.php |
| POST /contacto | 5 attempts/min | `throttle:5,1` middleware in web.php |

## Key files

- `app/Actions/Fortify/CreateNewUser.php`
- `app/Providers/FortifyServiceProvider.php`
- `app/Http/Controllers/Auth/LoginController.php`
- `app/Http/Controllers/Auth/RegisterController.php`
- `app/Http/Middleware/AdminMiddleware.php`
- `app/Http/Middleware/RedirectIfAuthenticated.php`
- `app/Models/User.php`
- `app/Models/ActivationCode.php`
- `resources/js/Pages/Auth/Login.jsx`
- `resources/js/Pages/Auth/Register.jsx`
- `resources/js/Pages/Auth/AccessDenied.jsx`
- `resources/js/Pages/Admin/Codigos.jsx`
- `config/fortify.php`
