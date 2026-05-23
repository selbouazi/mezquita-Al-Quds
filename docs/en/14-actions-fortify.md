# Fortify Actions

5 authentication actions in `app/Actions/Fortify/`.

## CreateNewUser.php

Validates and creates a new user during registration.

**Validation:**
- `name` — required, max 255 chars
- `email` — required, valid email, unique in `users`
- `password` — required, confirmed, applies `PasswordValidationRules`
- `codigo` — required, must be a valid, non-expired activation code

**Activation code logic:**
```php
$code = ActivationCode::where('codigo', $request->codigo)
    ->where('activo', true)
    ->where('expira_en', '>', now())
    ->first();

if (!$code) {
    throw ValidationException::withMessages(['codigo' => 'Invalid or expired code.']);
}

$code->update(['activo' => false]); // consume the code
```

## UpdateUserProfileInformation.php

Validates and updates user profile info.

## UpdateUserPassword.php

Validates and updates user password. Requires current password.

## ResetUserPassword.php

Resets user password (forgot password flow).

## PasswordValidationRules.php (Trait)

Reusable password validation rules:
- Minimum 8 characters
- Must contain uppercase, lowercase and numbers (configurable)

## Complete Registration Flow

1. User visits `/register`
2. Enters name, email, password and activation code
3. `RegisterController@register` validates data
4. `CreateNewUser` verifies the activation code
5. If code is valid → creates user with `user` role, consumes code
6. If code is invalid → validation error
7. User redirected to `/admin` (auto-login)
