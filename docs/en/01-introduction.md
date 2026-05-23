# Introduction

## Purpose

Mezquita Al-Quds is a web application for community management of the Al-Quds Mosque in El Vendrell (Tarragona, Spain). The project was born after detecting that the mosque had no digital tools to manage communication with its community.

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Backend | Laravel | ^12.0 |
| Frontend | React | ^18.3.1 |
| Bridge | Inertia.js | ^2.0 |
| CSS | Tailwind CSS | ^4.0 |
| Build | Vite | ^7.3.1 |
| DB | MySQL | |
| Auth | Laravel Fortify | ^1.36 |

## Key Technical Decisions

**Laravel** was chosen as the backend for being a robust, batteries-included framework (ORM, migrations, authentication, queues) with a large community.

**React + Inertia.js** was adopted after an initial phase with Blade. The migration happened because React offers a more mature ecosystem for dynamic interfaces, and Inertia removes the need for a separate REST API — it acts as a bridge between Laravel and React without losing backend typing or routes.

**Tailwind CSS v4** was chosen for its utility-first approach that speeds up development and avoids CSS spaghetti. v4 brings significant improvements over v3 with zero manual configuration.

**Laravel Fortify** was used for authentication instead of Breeze/Jetstream because it exposes actions explicitly (CreateNewUser, UpdateUserProfile, etc.) and gives full control over the login/registration flow without imposing a specific frontend.

## Main Features

- Prayer times with real data (365 days imported from Mawaqit)
- Admin panel with 10 management modules
- Role-based authentication (admin/user)
- Registration via activation codes
- Multi-language system (Spanish, Catalan, English, Arabic with RTL)
- Contact form with inbox
- Donations and invoices management
- News with images and scheduled publishing
- Push-style notifications with priority and expiry
- Classes with levels and schedules
- JSON API for public data

## Screenshots

> Pending: add screenshots
