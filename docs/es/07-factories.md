# Factories

## UserFactory

Único factory del proyecto, ubicado en `database/factories/UserFactory.php`.

Genera usuarios de prueba con:

- `name` — nombre realista con faker
- `email` — email único
- `password` — por defecto `'password'` (hasheado con bcrypt)
- `rol` — por defecto `'user'`

Uso en tests:

```php
User::factory()->create();                    // usuario normal
User::factory()->create(['rol' => 'admin']);  // admin
User::factory()->count(5)->create();          // 5 usuarios
```
