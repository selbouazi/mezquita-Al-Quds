# Scripts and Dependencies

## composer.json

### PHP Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `laravel/framework` | ^12.0 | Main framework |
| `inertiajs/inertia-laravel` | ^2.0 | Laravel ↔ React bridge |
| `laravel/fortify` | ^1.36 | Authentication |
| `laravel/tinker` | ^2.10 | Interactive shell |

### Dev Dependencies

| Package | Purpose |
|---------|---------|
| `phpunit/phpunit` | Tests |
| `laravel/sail` | Docker environment |
| `laravel/pint` | PHP formatter |
| `fakerphp/faker` | Fake data |
| `nunomaduro/collision` | Pretty terminal errors |

### Custom Scripts

```bash
# Full project setup (new developer)
composer setup
# → composer install + .env + key:generate + migrate + npm install + npm build

# Development environment (3 concurrent processes)
composer dev
# → php artisan serve + php artisan queue:listen + npm run dev

# Tests
composer test
# → config:clear + phpunit test
```

## package.json

### Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^18.3.1 | UI framework |
| `react-dom` | ^18.3.1 | DOM rendering |
| `@inertiajs/react` | ^2.3.18 | React ↔ Laravel bridge |
| `@vitejs/plugin-react` | ^4.3.4 | Vite plugin for React |

### Dev Dependencies

| Package | Purpose |
|---------|---------|
| `vite` | Build tool |
| `tailwindcss` | CSS framework |
| `@tailwindcss/vite` | Tailwind Vite plugin |
| `laravel-vite-plugin` | Laravel Vite plugin |
| `axios` | HTTP client |
| `concurrently` | Run processes in parallel |

### Version Notes

Uses `@vitejs/plugin-react@4` instead of v5 because v5 requires React 19, which is not compatible with this setup. `--legacy-peer-deps` was used during installation to resolve dependency conflicts between Vite 7 and React plugins.

## phpunit.xml

Standard PHPUnit config with:
- `TESTS_DB_CONNECTION` set to `sqlite` with `:memory:` for tests
- Code coverage disabled
