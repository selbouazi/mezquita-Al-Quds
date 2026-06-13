# Mezquita Al-Quds — Web Platform

Sistema de gestión integral para la **Mezquita Al-Quds**. Plataforma web con panel de administración, horarios de oración, gestión de donativos, facturas, clases, noticias y notificaciones.

## Stack

| Capa | Tecnología |
|------|-----------|
| Backend | Laravel 12 + PHP ^8.2 |
| Frontend | React 18 + Inertia.js (SPA) |
| Estilos | Tailwind CSS v4 |
| Build | Vite 7 |
| Auth | Laravel Fortify |
| BD | MySQL |
| i18n | ES / CA / AR / EN (RTL support) |

## Funcionalidades

- Horarios de oración mensuales con reloj de cuenta atrás
- Panel admin completo (CRUD): notificaciones, donativos, facturas, clases, contactos, noticias, ubicación, imam
- Sistema de códigos de activación para registro
- Roles de usuario (admin / user)
- Subida de facturas en PDF
- Internacionalización: español, catalán, árabe (RTL), inglés
- API endpoints públicos (imam, notificaciones)

## Requisitos

- PHP ^8.2
- Composer
- Node.js + npm
- MySQL

## Instalación

```bash
cp .env.example .env
php artisan key:generate
composer install
npm install
npm run build
php artisan migrate --seed
php artisan storage:link
```

## Desarrollo

```bash
composer run dev
```

## Tests

```bash
composer run test
```

## Licencia

MIT
