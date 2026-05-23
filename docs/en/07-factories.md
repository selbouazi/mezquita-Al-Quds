# Factories

## UserFactory

The only factory in the project, located at `database/factories/UserFactory.php`.

Generates test users with:

- `name` — realistic name via faker
- `email` — unique email
- `password` — defaults to `'password'` (bcrypt hashed)
- `rol` — defaults to `'user'`

Usage in tests:

```php
User::factory()->create();                    // normal user
User::factory()->create(['rol' => 'admin']);  // admin
User::factory()->count(5)->create();          // 5 users
```
