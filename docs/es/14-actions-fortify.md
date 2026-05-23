# Actions de Fortify

5 acciones de autenticación ubicadas en `app/Actions/Fortify/`.

## CreateNewUser.php

Valida y crea un nuevo usuario durante el registro.

**Validación:**
- `name` — requerido, máximo 255 caracteres
- `email` — requerido, email válido, único en `users`
- `password` — requerido, confirmado, aplica `PasswordValidationRules`
- `codigo` — requerido, debe ser un código de activación válido y no expirado

**Lógica de código de activación:**
```php
$code = ActivationCode::where('codigo', $request->codigo)
    ->where('activo', true)
    ->where('expira_en', '>', now())
    ->first();

if (!$code) {
    throw ValidationException::withMessages(['codigo' => 'Código inválido o expirado.']);
}

$code->update(['activo' => false]); // consumir el código
```

## UpdateUserProfileInformation.php

Valida y actualiza la información del perfil del usuario.

## UpdateUserPassword.php

Valida y actualiza la contraseña del usuario. Requiere contraseña actual.

## ResetUserPassword.php

Resetea la contraseña de un usuario (flujo "olvidé mi contraseña").

## PasswordValidationRules.php (Trait)

Trait con reglas de validación de contraseña reutilizables:
- Mínimo 8 caracteres
- Debe contener mayúsculas, minúsculas y números (configurable)

## Flujo de registro completo

1. Usuario visita `/register`
2. Introduce nombre, email, contraseña y código de activación
3. `RegisterController@register` valida los datos
4. `CreateNewUser` verifica el código de activación
5. Si el código es válido → crea el usuario con rol `user`, consume el código
6. Si el código no es válido → error de validación
7. Usuario redirigido a `/admin` (login automático)
