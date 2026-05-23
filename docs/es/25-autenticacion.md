# Módulo: Autenticación

Sistema completo de autenticación con registro mediante códigos de activación, roles de usuario y rate limiting.

## ¿Qué hace?

- Login con email y contraseña
- Registro con código de activación
- Cierre de sesión
- Roles: admin y user
- Rate limiting (5 intentos/minuto)
- Two-factor authentication (soportado por Fortify, no implementado en UI)
- Página de acceso denegado para usuarios no-admin

## Componentes

| Componente | Tecnología |
|------------|-----------|
| Backend auth | Laravel Fortify |
| Login UI | React + Inertia |
| Register UI | React + Inertia |
| Roles | MySQL enum + AdminMiddleware |
| Rate limiting | Fortify + Laravel RateLimiter |
| Códigos activación | Modelo ActivationCode + CRUD admin |

## Dificultades y soluciones

### 1) Elección de Fortify vs Breeze/Jetstream

**Problema:** Breeze y Jetstream imponen un frontend específico (Blade o React con su propia estructura). Con Inertia, necesitábamos control total.

**Solución:** Fortify expone las acciones de autenticación como clases independientes (CreateNewUser, UpdateUserProfile, etc.) sin imponer vistas. Las vistas se renderizan desde `FortifyServiceProvider` con `Inertia::render()`.

### 2) Códigos de activación

**Decisión:** Para evitar registros automatizados, se implementó un sistema de códigos. El imam genera códigos desde el panel admin y los distribuye offline. Los códigos son **reutilizables**: mientras estén activos en `/admin/codigos`, cualquier número de usuarios puede registrarse con el mismo código. El imam desactiva manualmente un código cuando ya no debe usarse.

**Validación en RegisterController:**
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

**Implementación:** Se añadió columna `rol` como enum(admin, user) a la tabla `users`. El middleware `AdminMiddleware` verifica el rol en cada ruta admin.

**Flujo de acceso:**
1. Usuario no autenticado → redirigir a login
2. Usuario autenticado rol=user → redirigir a `/` con mensaje de error
3. Usuario autenticado rol=admin → permitir acceso

### 4) Rate limiting

**Implementación:** Triple capa de rate limiting para prevenir ataques de fuerza bruta y spam:

| Ruta | Límite | Implementado en |
|------|--------|-----------------|
| POST /login | 5 intentos/min por email+IP | FortifyServiceProvider (RateLimiter::for('login')) |
| POST /register | 5 intentos/min | Middleware `throttle:5,1` en web.php |
| POST /contacto | 5 intentos/min | Middleware `throttle:5,1` en web.php |

## Archivos clave

- `app/Actions/Fortify/CreateNewUser.php`
- `app/Actions/Fortify/PasswordValidationRules.php`
- `app/Actions/Fortify/ResetUserPassword.php`
- `app/Actions/Fortify/UpdateUserPassword.php`
- `app/Actions/Fortify/UpdateUserProfileInformation.php`
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
- `database/migrations/2026_04_13_000004_add_rol_to_users_table.php`
- `config/fortify.php`
