# Changelog / Project History

Summary of the project's evolution, extracted from the Development Diary and commit history.

## March 12, 2026 — Initial setup
- Repository creation
- Requirements v1 document (PDF)
- Logo and initial assets

## March 13, 2026 — Kickoff
- Laravel project creation
- Main page with Blade
- First structured commit

## March 14, 2026 — Blade frontend
- Analog prayer clock (vanilla JS)
- Multi-language system (ES, CA, AR)
- Color palette and responsive design
- SetLocale middleware

## March 23, 2026 — React migration
- Migrated from Blade to React + Inertia.js
- Solved React "preamble" problem
- React structure: Pages, Components, Layouts, hooks
- JS translation files (es, ca, ar)

## March 23-24, 2026 — Prayer times DB
- Migrations for horarios, tiempos_espera, horarios_modificados
- 365-day seeder with real Mawaqit data
- HorarioService and TiempoEsperaService
- PrayerClock React with real data

## March 25, 2026 — Contact form
- ContactController and ContactMessage model
- Validation and DB storage
- Dev diary migrated from PDF to Markdown

## March 26, 2026 — Authentication
- Laravel Fortify integrated
- Login, Register, Fortify actions
- Rate limiting

## March 27, 2026 — Admin scaffold
- DashboardController
- Admin routes
- AdminUserSeeder

## March 28, 2026 — Admin redesign
- AdminLayout with sidebar
- 10 placeholder modules

## April 13-20, 2026 — Admin modules
- Notifications: model, controller, UI, NotificationBell
- Activation codes: model, controller, UI
- Imam settings: model, controller, UI
- APIs: /api/imam, /api/notificaciones

## April 20, 2026 — General update
- Auth, translations, admin, frontend updates
- Navbar, public pages, configuration
- Project restructure (app contents to root)

## April 23, 2026 — Full admin CRUD
- Donations, Invoices, Classes, Contacts, News, Location
- Prayer wait times (admin)
- Roles and permissions (AdminMiddleware)
- Multiple branches merged: admin-panels, horarios-admin, auth-permissions

## April 23-29, 2026 — Fixes
- Missing translations in admin and public
- Route merge conflicts
- SVG icons for admin modules
- Filters, metrics, bootstrap restoration

## May 10, 2026 — English support
- en.js file (504 lines)
- Complete project translation
- 4 functional languages: ES, CA, AR, EN

## May 23, 2026 — Block 1: Critical security
- Rate limiting (throttle:5,1) on POST /register and POST /contacto
- Added missing POST /contacto route (contact form was not working)
- Removed real APP_KEY from `.env.example` (empty placeholder)
- Admin password moved to env variable `ADMIN_PASSWORD`
- AdminMiddleware: denied access now redirects with error (no longer returns HTTP 200)
- NotificationController: `after:fecha_publicacion` validation also on update
- Global function `getHorarioHoy()` wrapped in `function_exists` to prevent test errors
- Documentation updated: authentication, middleware, notifications, routes, contact
