# Tests

Tests PHPUnit para el proyecto.

## Configuración

**Archivo:** `phpunit.xml`

- Base de datos en memoria (`sqlite :memory:`) para tests
- Variable de entorno `TESTS_DB_CONNECTION` para distinguir entorno de test del real

## Tests existentes

### Feature Tests

| Test | Archivo | Descripción |
|------|---------|-------------|
| `ExampleTest` | `tests/Feature/ExampleTest.php` | Test básico de Laravel |
| `HorarioControllerTest` | `tests/Feature/HorarioControllerTest.php` | Tests del controlador de horarios |

### Unit Tests

| Test | Archivo | Descripción |
|------|---------|-------------|
| `ExampleTest` | `tests/Unit/ExampleTest.php` | Test unitario básico |
| `HorarioTest` | `tests/Unit/HorarioTest.php` | Tests del modelo Horario |

## Cómo ejecutar

```bash
# Todos los tests
composer test

# Solo un archivo específico
php artisan test --filter=HorarioControllerTest

# Tests con cobertura
php artisan test --coverage
```

## Notas

- Los tests usan `RefreshDatabase` para evitar efectos secundarios entre tests.
- No hay tests para todos los módulos admin aún (pendiente de añadir).
- El test de autenticación (`AuthenticationTest`) se menciona en el diario de desarrollo pero no está presente en el código actual.
