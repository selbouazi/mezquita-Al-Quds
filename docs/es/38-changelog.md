# Changelog / Historia del proyecto

Resumen de la evolución del proyecto, extraído del Diario de Desarrollo y del historial de commits.

## 12 de marzo de 2026 — Setup inicial
- Creación del repositorio
- Documento de Requerimientos v1 (PDF)
- Logo y assets iniciales

## 13 de marzo de 2026 — Arranque
- Creación del proyecto Laravel
- Página principal con Blade
- Primer commit estructurado

## 14 de marzo de 2026 — Frontend Blade
- Reloj analógico de rezos (JS vanilla)
- Sistema multiidioma (ES, CA, AR)
- Paleta de colores y diseño responsive
- Middleware SetLocale

## 23 de marzo de 2026 — Migración a React
- Migración de Blade a React + Inertia.js
- Problema del "preamble" de React resuelto
- Estructura React: Pages, Components, Layouts, hooks
- Archivos de traducción JS (es, ca, ar)

## 23-24 de marzo de 2026 — Horarios BD
- Migraciones de horarios, tiempos_espera, horarios_modificados
- Seeder 365 días con datos reales de Mawaqit
- HorarioService y TiempoEsperaService
- PrayerClock React con datos reales

## 25 de marzo de 2026 — Formulario contacto
- ContactController y modelo ContactMessage
- Validación y almacenamiento en BD
- Diario de Desarrollo migrado de PDF a Markdown

## 26 de marzo de 2026 — Autenticación
- Laravel Fortify integrado
- Login, Register, Fortify actions
- Rate limiting

## 27 de marzo de 2026 — Admin scaffold
- DashboardController
- Rutas admin
- AdminUserSeeder

## 28 de marzo de 2026 — Admin redesign
- AdminLayout con sidebar
- 10 módulos placeholder

## 13-20 de abril de 2026 — Módulos admin
- Notificaciones: modelo, controlador, UI, NotificationBell
- Códigos de activación: modelo, controlador, UI
- Imam settings: modelo, controlador, UI
- APIs: /api/imam, /api/notificaciones

## 20 de abril de 2026 — Actualización general
- Actualización de auth, traducciones, admin, frontend
- Navbar, páginas públicas, configuración
- Reestructuración del proyecto (app contents a root)

## 23 de abril de 2026 — CRUD admin completo
- Donativos, Facturas, Clases, Contactos, Noticias, Ubicación
- Tiempos de espera (admin)
- Roles y permisos (AdminMiddleware)
- Varias ramas mergeadas: admin-panels, horarios-admin, auth-permissions

## 23-29 de abril de 2026 — Fixes
- Traducciones faltantes en admin y público
- Conflictos de merge en rutas
- Iconos SVG para módulos admin
- Filtros, métricas, restauración de bootstrap

## 10 de mayo de 2026 — Soporte inglés
- Archivo en.js (504 líneas)
- Traducción completa del proyecto
- 4 idiomas funcionales: ES, CA, AR, EN

## 23 de mayo de 2026 — Bloque 1: Seguridad crítica
- Rate limiting (throttle:5,1) en POST /register y POST /contacto
- Añadida ruta POST /contacto que faltaba (el formulario no funcionaba)
- APP_KEY real eliminada de `.env.example` (placeholder vacío)
- Contraseña admin movida a variable de entorno `ADMIN_PASSWORD`
- AdminMiddleware: acceso denegado ahora redirige con error (ya no devuelve HTTP 200)
- NotificationController: validación `after:fecha_publicacion` también en update
- Función global `getHorarioHoy()` envuelta en `function_exists` para evitar error en tests
- Documentación actualizada: autenticación, middleware, notificaciones, rutas, contacto
