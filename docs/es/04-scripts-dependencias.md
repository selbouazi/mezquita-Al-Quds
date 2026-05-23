# Scripts y dependencias

## composer.json

### Dependencias PHP

| Paquete | Versión | Propósito |
|---------|---------|-----------|
| `laravel/framework` | ^12.0 | Framework principal |
| `inertiajs/inertia-laravel` | ^2.0 | Bridge Laravel ↔ React |
| `laravel/fortify` | ^1.36 | Autenticación |
| `laravel/tinker` | ^2.10 | Shell interactiva |

### Dev dependencies

| Paquete | Propósito |
|---------|-----------|
| `phpunit/phpunit` | Tests |
| `laravel/sail` | Entorno Docker |
| `laravel/pint` | Formateador PHP |
| `fakerphp/faker` | Datos fake |
| `nunomaduro/collision` | Errores bonitos en terminal |

### Scripts personalizados

```bash
# Setup completo del proyecto (nuevo desarrollador)
composer setup
# → composer install + .env + key:generate + migrate + npm install + npm build

# Entorno de desarrollo (3 procesos concurrentes)
composer dev
# → php artisan serve + php artisan queue:listen + npm run dev

# Tests
composer test
# → config:clear + phpunit test
```

## package.json

### Dependencias

| Paquete | Versión | Propósito |
|---------|---------|-----------|
| `react` | ^18.3.1 | UI framework |
| `react-dom` | ^18.3.1 | Renderizado DOM |
| `@inertiajs/react` | ^2.3.18 | Bridge React ↔ Laravel |
| `@vitejs/plugin-react` | ^4.3.4 | Plugin Vite para React |

### Dev dependencies

| Paquete | Propósito |
|---------|-----------|
| `vite` | Build tool |
| `tailwindcss` | CSS framework |
| `@tailwindcss/vite` | Plugin Tailwind para Vite |
| `laravel-vite-plugin` | Plugin Laravel para Vite |
| `axios` | HTTP client |
| `concurrently` | Ejecutar procesos en paralelo |

### Nota sobre versiones

Se usa `@vitejs/plugin-react@4` en lugar de la v5 porque v5 requiere React 19, que no es compatible con esta configuración. Se usó `--legacy-peer-deps` durante la instalación para resolver conflictos de dependencias entre Vite 7 y los plugins de React.

## phpunit.xml

Configuración estándar de PHPUnit con:
- `TESTS_DB_CONNECTION` establecido a `sqlite` con `:memory:` para tests
- Cobertura de código desactivada
