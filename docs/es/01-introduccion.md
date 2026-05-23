# Introducción

## Propósito

Mezquita Al-Quds es una aplicación web para la gestión comunitaria de la Mezquita Al-Quds del Vendrell (Tarragona). El proyecto nació al detectar que la mezquita no tenía ninguna herramienta digital para gestionar la comunicación con su comunidad.

## Stack tecnológico

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Backend | Laravel | ^12.0 |
| Frontend | React | ^18.3.1 |
| Bridge | Inertia.js | ^2.0 |
| CSS | Tailwind CSS | ^4.0 |
| Build | Vite | ^7.3.1 |
| BD | MySQL | |
| Auth | Laravel Fortify | ^1.36 |

## Decisiones técnicas principales

**Laravel** se eligió como backend por ser un framework robusto, con baterías incluidas (ORM, migraciones, autenticación, colas) y amplia comunidad.

**React + Inertia.js** se adoptó tras una primera fase con Blade. Se migró porque React ofrece un ecosistema más maduro para interfaces dinámicas, e Inertia elimina la necesidad de construir una API REST separada — actúa de puente entre Laravel y React sin perder el tipado ni las rutas del backend.

**Tailwind CSS v4** se eligió por su enfoque utility-first que acelera el desarrollo y evita CSS spaghetti. La v4 trae mejoras significativas sobre v3 sin configuración manual.

**Laravel Fortify** se usó para autenticación en lugar de Breeze/Jetstream porque expone las acciones de forma explícita (CreateNewUser, UpdateUserProfile, etc.) y da control total sobre el flujo de login/registro sin imponer un frontend específico.

## Funcionalidades principales

- Horarios de rezo con datos reales (365 días importados desde Mawaqit)
- Panel de administración con 10 módulos de gestión
- Autenticación con roles (admin/user)
- Registro mediante códigos de activación
- Sistema multiidioma (español, catalán, inglés, árabe con RTL)
- Formulario de contacto con bandeja de entrada
- Gestión de donativos y facturas
- Noticias con imágenes y publicaciones programadas
- Notificaciones push-style con prioridad y expiración
- Clases con niveles y horarios
- API JSON para datos públicos

## Capturas

> Pendiente: añadir capturas de pantalla
