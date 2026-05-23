# Project Structure

Complete project tree with descriptions of every directory and key file.

```
mezquita-Al-Quds/
├── app/                           ← PHP code (Laravel)
│   ├── Actions/
│   │   └── Fortify/              ← Authentication actions (5 files)
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Admin/            ← 10 admin panel controllers
│   │   │   ├── Auth/             ← LoginController, RegisterController
│   │   │   ├── ContactController.php
│   │   │   ├── HorarioController.php
│   │   │   ├── NoticiasController.php
│   │   │   └── Controller.php    ← Base controller
│   │   └── Middleware/            ← 4 custom middleware
│   ├── Models/                    ← 13 Eloquent models
│   ├── Providers/                 ← AppServiceProvider, FortifyServiceProvider
│   └── Services/                  ← HorarioService, TiempoEsperaService
│
├── bootstrap/
│   ├── app.php                    ← Middleware, routes, providers config
│   └── providers.php              ← Service provider registration
│
├── config/                        ← Laravel config (9 files)
│   ├── fortify.php                ← Fortify auth config
│   ├── app.php, auth.php, database.php, filesystems.php, ...
│
├── database/
│   ├── factories/                 ← UserFactory
│   ├── migrations/                ← 18 migrations
│   └── seeders/                   ← 4 seeders
│
├── resources/
│   ├── css/
│   │   └── app.css                ← Tailwind v4 + Instrument Sans font
│   ├── js/                        ← React frontend
│   │   ├── app.jsx                ← Inertia + React entry point
│   │   ├── bootstrap.js           ← Axios setup
│   │   ├── Components/            ← 5 React components
│   │   ├── Layouts/               ← MainLayout, AdminLayout
│   │   ├── Pages/                 ← 23 React pages
│   │   ├── hooks/                 ← useTranslation
│   │   └── lang/                  ← Translations (es, ca, en, ar)
│   └── views/
│       └── app.blade.php          ← Single Blade view (loads React)
│
├── routes/
│   ├── web.php                    ← Public + authenticated routes
│   ├── admin.php                  ← Admin panel routes
│   └── console.php                ← Artisan commands
│
├── public/
│   ├── favicon.ico
│   ├── favicon.png
│   ├── img/
│   │   ├── lang/                  ← Language flags (4 PNGs)
│   │   ├── mezquitaAlquds_logo.png
│   │   ├── mezquitaAlquds_logo2.png
│   │   └── mezquitaAlquds_logo3.png
│   └── docs/                      ← Legacy documentation
│
├── storage/
│   └── app/public/
│       ├── facturas/              ← Uploaded PDFs
│       └── noticias/              ← News images
│
├── tests/                         ← PHPUnit tests
│   ├── Feature/
│   │   ├── ExampleTest.php
│   │   └── HorarioControllerTest.php
│   └── Unit/
│       ├── ExampleTest.php
│       └── HorarioTest.php
│
├── composer.json                  ← PHP deps + scripts (setup, dev, test)
├── package.json                   ← JS deps + scripts (dev, build)
├── vite.config.js                 ← Vite config (Laravel + React + Tailwind)
├── phpunit.xml                    ← Test config
├── .env / .env.example            ← Environment variables
└── .editorconfig                  ← Code style
```
