# Estructura del proyecto

Mapa completo de la estructura del proyecto con descripción de cada directorio y archivo clave.

```
mezquita-Al-Quds/
├── app/                           ← Código PHP (Laravel)
│   ├── Actions/
│   │   └── Fortify/              ← Acciones de autenticación (5 archivos)
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Admin/            ← 10 controladores del panel admin
│   │   │   ├── Auth/             ← LoginController, RegisterController
│   │   │   ├── ContactController.php
│   │   │   ├── HorarioController.php
│   │   │   ├── NoticiasController.php
│   │   │   └── Controller.php    ← Controlador base
│   │   └── Middleware/            ← 4 middleware personalizados
│   ├── Models/                    ← 13 modelos Eloquent
│   ├── Providers/                 ← AppServiceProvider, FortifyServiceProvider
│   └── Services/                  ← HorarioService, TiempoEsperaService
│
├── bootstrap/
│   ├── app.php                    ← Configuración de middleware, rutas, providers
│   └── providers.php              ← Registro de service providers
│
├── config/                        ← Configuración de Laravel (9 archivos)
│   ├── fortify.php                ← Config de autenticación Fortify
│   ├── app.php, auth.php, database.php, filesystems.php, ...
│
├── database/
│   ├── factories/                 ← UserFactory
│   ├── migrations/                ← 18 migraciones
│   └── seeders/                   ← 4 seeders
│
├── resources/
│   ├── css/
│   │   └── app.css                ← Tailwind v4 + fuente Instrument Sans
│   ├── js/                        ← Frontend React
│   │   ├── app.jsx                ← Punto de entrada Inertia + React
│   │   ├── bootstrap.js           ← Configuración de Axios
│   │   ├── Components/            ← 5 componentes React
│   │   ├── Layouts/               ← MainLayout, AdminLayout
│   │   ├── Pages/                 ← 23 páginas React
│   │   ├── hooks/                 ← useTranslation
│   │   └── lang/                  ← Traducciones (es, ca, en, ar)
│   └── views/
│       └── app.blade.php          ← Única vista Blade (carga React)
│
├── routes/
│   ├── web.php                    ← Rutas públicas + autenticadas
│   ├── admin.php                  ← Rutas del panel admin
│   └── console.php                ← Comandos Artisan
│
├── public/
│   ├── favicon.ico
│   ├── favicon.png
│   ├── img/
│   │   ├── lang/                  ← Banderas de idioma (4 PNGs)
│   │   ├── mezquitaAlquds_logo.png
│   │   ├── mezquitaAlquds_logo2.png
│   │   └── mezquitaAlquds_logo3.png
│   └── docs/                      ← Documentación legacy
│
├── storage/
│   └── app/public/
│       ├── facturas/              ← PDFs subidos
│       └── noticias/              ← Imágenes de noticias
│
├── tests/                         ← Tests PHPUnit
│   ├── Feature/
│   │   ├── ExampleTest.php
│   │   └── HorarioControllerTest.php
│   └── Unit/
│       ├── ExampleTest.php
│       └── HorarioTest.php
│
├── composer.json                  ← Dependencias PHP + scripts (setup, dev, test)
├── package.json                   ← Dependencias JS + scripts (dev, build)
├── vite.config.js                 ← Configuración de Vite (Laravel + React + Tailwind)
├── phpunit.xml                    ← Configuración de tests
├── .env / .env.example            ← Variables de entorno
└── .editorconfig                  ← Estilo de código
```
