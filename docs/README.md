# Mezquita Al-Quds — Documentación

Aplicación web para la gestión comunitaria de la Mezquita Al-Quds del Vendrell (Tarragona).

**Stack:** Laravel 12 · React 18 · Inertia.js v2 · Tailwind CSS v4 · Vite 8 · MySQL

---

## Documentación en Español

| # | Documento | Descripción |
|---|-----------|-------------|
| 01 | [Introducción](es/01-introduccion.md) | Stack, propósito, funcionalidades |
| 02 | [Estructura del proyecto](es/02-estructura.md) | Mapa completo de carpetas y archivos |
| 03 | [Configuración general](es/03-config-general.md) | .env, config/fortify.php, etc. |
| 04 | [Scripts y dependencias](es/04-scripts-dependencias.md) | composer.json, package.json, phpunit.xml |
| 05 | [Migraciones](es/05-migraciones.md) | 18 migraciones detalladas |
| 06 | [Seeders](es/06-seeders.md) | 4 seeders |
| 07 | [Factories](es/07-factories.md) | UserFactory |
| 08 | [Bootstrap y providers](es/08-bootstrap-middleware.md) | bootstrap/app.php, service providers |
| 09 | [Middleware](es/09-middleware.md) | 4 middleware personalizados |
| 10 | [Rutas](es/10-rutas.md) | web.php, admin.php |
| 11 | [Modelos](es/11-modelos.md) | 13 modelos Eloquent |
| 12 | [Controladores](es/12-controladores.md) | 17 controladores |
| 13 | [Servicios](es/13-servicios.md) | HorarioService, TiempoEsperaService |
| 14 | [Actions Fortify](es/14-actions-fortify.md) | 5 acciones de autenticación |
| 15 | [Vite y app.blade.php](es/15-vite-app-blade.md) | Configuración Vite, preamble fix |
| 16 | [Entry point React](es/16-app-jsx.md) | app.jsx, bootstrap.js |
| 17 | [Páginas públicas](es/17-paginas-publicas.md) | Home, Horarios, Noticias, etc. |
| 18 | [Páginas auth](es/18-paginas-auth.md) | Login, Register, AccessDenied |
| 19 | [Páginas de usuario](es/19-paginas-usuario.md) | Facturas, Donativos |
| 20 | [Páginas admin](es/20-paginas-admin.md) | Dashboard + 10 módulos |
| 21 | [Componentes](es/21-componentes.md) | Navbar, Footer, PrayerClock, etc. |
| 22 | [Layouts y hooks](es/22-layouts-hooks.md) | MainLayout, AdminLayout, useTranslation |
| 23 | [Traducciones](es/23-traducciones.md) | Sistema multiidioma (ES, CA, AR, EN) |
| 24 | [Horarios de rezo](es/24-horarios-rezo.md) | Sistema completo de horarios |
| 25 | [Autenticación](es/25-autenticacion.md) | Fortify + códigos + roles |
| 26 | [Donativos](es/26-donativos.md) | CRUD + público |
| 27 | [Facturas](es/27-facturas.md) | CRUD + PDF + público |
| 28 | [Noticias](es/28-noticias.md) | CRUD + imágenes + público |
| 29 | [Notificaciones](es/29-notificaciones.md) | CRUD + bell + API |
| 30 | [Clases](es/30-clases.md) | CRUD + niveles |
| 31 | [Contacto](es/31-contacto.md) | Formulario + bandeja admin |
| 32 | [Imam](es/32-imam.md) | Admin + público + API |
| 33 | [Ubicación](es/33-ubicacion.md) | Admin + público |
| 34 | [Panel admin](es/34-panel-admin.md) | Layout, dashboard, navegación |
| 35 | [API](es/35-api.md) | /api/imam, /api/notificaciones |
| 36 | [Tests](es/36-tests.md) | PHPUnit |
| 37 | [Assets y storage](es/37-assets.md) | public/, storage/ |
| 38 | [Changelog](es/38-changelog.md) | Historia del proyecto |

---

## English Documentation

| # | Document | Description |
|---|----------|-------------|
| 01 | [Introduction](en/01-introduction.md) | Stack, purpose, features |
| 02 | [Project structure](en/02-structure.md) | Complete file/folder map |
| 03 | [General config](en/03-config.md) | .env, config/fortify.php, etc. |
| 04 | [Scripts & dependencies](en/04-scripts.md) | composer.json, package.json, phpunit.xml |
| 05 | [Migrations](en/05-migrations.md) | 18 detailed migrations |
| 06 | [Seeders](en/06-seeders.md) | 4 seeders |
| 07 | [Factories](en/07-factories.md) | UserFactory |
| 08 | [Bootstrap & providers](en/08-bootstrap.md) | bootstrap/app.php, service providers |
| 09 | [Middleware](en/09-middleware.md) | 4 custom middleware |
| 10 | [Routes](en/10-routes.md) | web.php, admin.php |
| 11 | [Models](en/11-models.md) | 13 Eloquent models |
| 12 | [Controllers](en/12-controllers.md) | 17 controllers |
| 13 | [Services](en/13-services.md) | HorarioService, TiempoEsperaService |
| 14 | [Fortify Actions](en/14-actions-fortify.md) | 5 auth actions |
| 15 | [Vite & app.blade.php](en/15-vite-app-blade.md) | Vite config, preamble fix |
| 16 | [React entry point](en/16-app-jsx.md) | app.jsx, bootstrap.js |
| 17 | [Public pages](en/17-public-pages.md) | Home, Horarios, News, etc. |
| 18 | [Auth pages](en/18-auth-pages.md) | Login, Register, AccessDenied |
| 19 | [User pages](en/19-user-pages.md) | Invoices, Donations |
| 20 | [Admin pages](en/20-admin-pages.md) | Dashboard + 10 modules |
| 21 | [Components](en/21-components.md) | Navbar, Footer, PrayerClock, etc. |
| 22 | [Layouts & hooks](en/22-layouts-hooks.md) | MainLayout, AdminLayout, useTranslation |
| 23 | [Translations](en/23-translations.md) | Multi-language (ES, CA, AR, EN) |
| 24 | [Prayer times](en/24-prayer-times.md) | Complete schedule system |
| 25 | [Authentication](en/25-authentication.md) | Fortify + codes + roles |
| 26 | [Donations](en/26-donations.md) | CRUD + public |
| 27 | [Invoices](en/27-invoices.md) | CRUD + PDF + public |
| 28 | [News](en/28-news.md) | CRUD + images + public |
| 29 | [Notifications](en/29-notifications.md) | CRUD + bell + API |
| 30 | [Classes](en/30-classes.md) | CRUD + levels |
| 31 | [Contact](en/31-contact.md) | Form + admin inbox |
| 32 | [Imam](en/32-imam.md) | Admin + public + API |
| 33 | [Location](en/33-location.md) | Admin + public |
| 34 | [Admin panel](en/34-admin-panel.md) | Layout, dashboard, navigation |
| 35 | [API](en/35-api.md) | /api/imam, /api/notificaciones |
| 36 | [Tests](en/36-tests.md) | PHPUnit |
| 37 | [Assets & storage](en/37-assets.md) | public/, storage/ |
| 38 | [Changelog](en/38-changelog.md) | Project history |
