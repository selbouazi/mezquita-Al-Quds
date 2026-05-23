# Tests

PHPUnit tests for the project.

## Configuration

**File:** `phpunit.xml`

- In-memory database (`sqlite :memory:`) for tests
- `TESTS_DB_CONNECTION` env variable to distinguish test environment from production

## Existing tests

### Feature Tests

| Test | File | Description |
|------|------|-------------|
| `ExampleTest` | `tests/Feature/ExampleTest.php` | Basic Laravel test |
| `HorarioControllerTest` | `tests/Feature/HorarioControllerTest.php` | Schedule controller tests |

### Unit Tests

| Test | File | Description |
|------|------|-------------|
| `ExampleTest` | `tests/Unit/ExampleTest.php` | Basic unit test |
| `HorarioTest` | `tests/Unit/HorarioTest.php` | Horario model tests |

## How to run

```bash
# All tests
composer test

# Specific file
php artisan test --filter=HorarioControllerTest

# With coverage
php artisan test --coverage
```

## Notes

- Tests use `RefreshDatabase` to prevent side effects between tests.
- Not all admin modules have tests yet (pending addition).
- The auth test (`AuthenticationTest`) is mentioned in the dev diary but not present in current code.
