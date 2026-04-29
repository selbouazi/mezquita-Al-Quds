# Diario de Desarrollo

## Mezquita Al-Quds — Web de gestión comunitaria

**Período:** 13 de marzo – 27 de marzo de 2026 · **Autor:** Suli

---

### Introducción

Este documento recoge el proceso de desarrollo de la aplicación web de la Mezquita Al-Quds del Vendrell (Tarragona). El objetivo es documentar de forma honesta y cronológica qué se hizo cada día, qué problemas aparecieron y cómo se resolvieron.

Este proyecto nació al detectar que la mezquita tenía necesidades de gestión sin cubrir: no había forma organizada de comunicar horarios de rezo, gestionar donativos, publicar noticias o distribuir información a la comunidad. La idea fue construir una plataforma web completa que lo resolviera.

Todo el desarrollo se realizó con la ayuda de Claude, una inteligencia artificial de Anthropic, que actuó como asistente técnico. El aprendizaje, las decisiones y la ejecución fueron propios — Claude guió el proceso y ayudó a resolver los errores técnicos que fueron apareciendo. Este documento también refleja cómo la IA puede ser una herramienta real y útil para desarrollar proyectos web desde cero.

**Tecnologías utilizadas:** Laravel 12 · React 18 · Inertia.js v2 · Tailwind CSS v4 · Vite 8 · MySQL

---

### Registro cronológico

#### 13 de marzo de 2026

**Inicio del proyecto**

**Arranque y planificación**

Primer día de trabajo. Se identificó la necesidad: la mezquita no tenía ninguna herramienta digital para gestionar la comunicación con su comunidad. Los horarios de rezo se comunicaban de forma manual, no había registro de donativos y el imam no tenía forma de publicar noticias ni notificaciones.

Se tomó la decisión de construir una aplicación web con Laravel como backend, dado que es un framework robusto y conocido. Se creó el proyecto con `laravel new mezquita-alquds-app` y se configuró el entorno local.

También se empezó a definir qué debía tener la aplicación: horarios de rezo, panel del imam, donativos, noticias, formulario de contacto y soporte multiidioma (español, catalán y árabe). Todo quedó recogido en el Documento de Requerimientos Funcionales y No Funcionales v1.

---

#### 14 de marzo de 2026

**Desarrollo**

**Primeras vistas y estructura base**

Se empezó a construir la app con el stack inicial: Laravel 12, Blade, Tailwind CSS v4 y Vite. Se crearon las primeras vistas públicas: página de inicio, horarios, noticias, contacto y ubicación.

Se implementó el reloj analógico de rezos con JavaScript vanilla — un reloj de 24 horas que muestra los tiempos de oración del día como marcadores interactivos, con tooltips que indican el tiempo restante para cada rezo.

También se añadió el sistema multiidioma con los archivos `lang/es.php`, `lang/ca.php` y `lang/ar.php`, y un middleware `SetLocale` para cambiar el idioma de la sesión. El árabe incluye soporte RTL (escritura de derecha a izquierda).

Al final del día la app mostraba correctamente la página de inicio con el reloj, el navbar con cambio de idioma y el footer, todo en los tres idiomas.

---

#### 15 – 20 de marzo de 2026

**Desarrollo**

**Diseño visual y refinamiento**

Durante esta semana se trabajó en el diseño visual de la aplicación. Se definió la paleta de colores (verde oscuro `#0F5132`, dorado `#C9A227` y blanco) y se aplicó en todas las vistas. Se añadieron animaciones de aparición con `IntersectionObserver`, el navbar con efecto de reducción al hacer scroll y las tarjetas con hover effects.

Se completaron las páginas de contacto, ubicación y noticias (en construcción). También se refinó el reloj — ajustando el posicionamiento de los marcadores de rezo, los tooltips y la animación flotante.

Al terminar esta fase, la app tenía un aspecto visual sólido y coherente, completamente responsive y funcional en los tres idiomas.

---

#### 21 de marzo de 2026

**Control de versiones**

**Problema con Git: demasiados cambios sin organizar**

Al querer hacer el primer commit formal del proyecto, se detectó un problema: había demasiados archivos modificados mezclados — vistas, middleware, rutas, configuración — y no tenía sentido meterlos todos en un solo commit. Lo correcto era separar los cambios por ramas (branches) temáticas.

**Cómo se organizó el trabajo en ramas**

Se crearon varias ramas para separar los cambios por área:

1. Se usó `git stash` para guardar temporalmente todos los cambios sin commitear.
2. Se creó la rama `feature/ui-base` y se recuperaron solo los archivos de vistas con `git checkout stash -- ruta/archivo`.
3. Se hizo commit de las vistas, el CSS y el layout principal.
4. Se creó la rama `feature/i18n` para los archivos de idioma y el middleware `SetLocale`.
5. Se hizo commit de las traducciones y la lógica de cambio de idioma.
6. Finalmente se fusionaron las ramas con `git merge` sobre `main`.

**El problema que apareció**

Al creer que todo estaba bien y revisar el estado del proyecto, se descubrió que algunos archivos no se habían incluido correctamente en los commits o habían quedado en un estado intermedio. Concretamente:

- Los archivos de `app/Http/` — el middleware `HandleInertiaRequests.php` y el middleware `SetLocale.php` — no estaban correctamente versionados.
- La ruta de cambio de idioma en `routes/web.php` (`Route::get('/lang/{lang}', ...)`) también había desaparecido del commit.

Esto se detectó más tarde, cuando al trabajar sobre la migración a React se comprobó que el comportamiento del cambio de idioma no funcionaba como se esperaba. Los archivos tuvieron que revisarse y restaurarse manualmente.

---

#### 22 de marzo de 2026

**Migración**

**Migración de Blade a React con Inertia.js**

Con la app base funcionando en Blade, se tomó la decisión de migrar el frontend a React usando Inertia.js. El objetivo era poder seguir desarrollando con todas las ventajas del ecosistema React sin tener que construir una API separada — Inertia actúa de puente entre el backend Laravel y el frontend React.

**Instalación de dependencias**

Se instaló el paquete PHP de Inertia y las dependencias de JavaScript necesarias:

```bash
composer require inertiajs/inertia-laravel
npm install @inertiajs/react react@18.3.1 react-dom@18.3.1 @vitejs/plugin-react@4.3.4 --legacy-peer-deps
```

Se usó `--legacy-peer-deps` por conflictos entre versiones de Vite y los plugins de React. Tras varios intentos con distintas versiones del plugin (incluyendo `plugin-react-oxc` y `plugin-react-swc`), se determinó que la combinación estable era React 18 + `@vitejs/plugin-react@4`. React 19 no era compatible con esta configuración.

**Configuración de Laravel**

Se ejecutó `php artisan inertia:middleware` para generar el middleware de Inertia, se registró en `bootstrap/app.php` y se configuró para compartir el locale activo con todas las páginas React.

Se creó el blade raíz `resources/views/app.blade.php` — el único archivo Blade que permanece en el proyecto, cuyo trabajo es simplemente cargar React.

Se actualizó `vite.config.js` para añadir el plugin de React y cambiar el punto de entrada de `app.js` a `app.jsx`. Se creó el archivo `resources/js/app.jsx` con la configuración de `createInertiaApp`.

**Estructura de archivos React**

Se crearon las carpetas y archivos necesarios: `Pages/` con una página por ruta, `Components/` con Navbar, Footer, PrayerClock y PrayerHeader, `Layouts/` con el layout principal, y `lang/` con las traducciones convertidas de PHP a módulos JavaScript.

Se implementó el hook `useTranslation` que lee el locale desde las props de Inertia y devuelve la función de traducción para cualquier componente.

Las rutas se actualizaron para usar `Inertia::render()` en lugar de `Route::view()`, y los blades antiguos se eliminaron.

**El error más difícil: "can't detect preamble"**

Al cargar la app, la página aparecía en blanco con el siguiente error en consola:

```
Uncaught Error: @vitejs/plugin-react can't detect preamble. Something is wrong.
```

Se probaron múltiples soluciones durante horas: cambiar versiones del plugin, bajar de React 19 a React 18, mover los imports de los componentes, consultar otra IA para una segunda opinión. Nada funcionaba.

La causa real: `@vitejs/plugin-react` necesita inyectar un script especial en el HTML antes de que cargue cualquier JSX (el "preamble" de React HMR). En proyectos Vite normales lo hace automáticamente, pero en Laravel el HTML lo genera Blade — así que Vite nunca puede inyectarlo por su cuenta.

La solución fue añadir ese script manualmente en `app.blade.php`, dentro de un bloque `@if(app()->environment('local'))`:

| Problema | Solución |
|----------|----------|
| Vite no puede inyectar el preamble de React porque el HTML lo genera Blade | Añadir el script del preamble manualmente en `app.blade.php` solo para entorno local |

Con esto la migración quedó completada. La app funciona con React e Inertia, tiene exactamente el mismo aspecto que antes y es completamente escalable para seguir desarrollando.

---

#### 23 de marzo de 2026

**Desarrollo**

**Horarios de rezo: Integración completa con base de datos**

Con la app ya migrada a React e Inertia, se abordó uno de los módulos más importantes del proyecto: el sistema de horarios de rezo. Hasta ahora los horarios estaban hardcodeados en el frontend, lo que impedía flexibilidad, actualizaciones dinámicas y control por parte del imam. El objetivo fue construir una solución profesional, escalable y conectada a la base de datos, respetando los horarios reales de la mezquita.

**Diseño del sistema**

Se definieron tres tablas clave:

- **horarios**: contiene los horarios base de cada día (fajr, sunrise, dhuhr, asr, maghrib, isha).
- **tiempos_espera**: tiempo entre adhan e iqama, configurable por rezo.
- **horarios_modificados**: excepciones puntuales (Ramadán, viernes, eventos).

Se descartó el campo "global" en `tiempos_espera` y se decidió usar una fila por rezo. También se optó por usar `String` en vez de `ENUM` para el campo rezo por motivos de mantenimiento. El campo sunrise se trató como un rezo más.

**Migraciones**

Se generaron las migraciones con:

```bash
php artisan make:migration create_horarios_table
php artisan make:migration create_tiempos_espera_table
php artisan make:migration create_horarios_modificados_table
```

Se pegaron las estructuras y se ejecutó `php artisan migrate`. Las tablas quedaron correctamente creadas en MySQL.

**Importación de horarios reales**

Se descartó el uso de la API de AlAdhan tras comprobar que no coincide con los horarios reales de la mezquita. Se confirmó que la mezquita usa Mawaqit, que gestiona los horarios manualmente.

Se obtuvo el PDF oficial de Mawaqit con los 365 días de 2026. Se generó el seeder `Horarios2026Seeder.php` con todos los datos exactos, incluyendo el cambio horario de marzo. Se ejecutó:

```bash
php artisan db:seed --class=Horarios2026Seeder
```

Resultado: 365 registros insertados correctamente.

**Integración con React e Inertia**

- Se creó el modelo `Horario` con los campos fillable.
- Se desarrolló `HorarioService`, que centraliza la lógica: obtener el horario del día, aplicar modificaciones, aplicar tiempos de espera y devolver los datos listos para React.
- Se actualizó `web.php` para usar el servicio y pasar datos a Inertia.
- En `HandleInertiaRequests` se añadieron los tiempos de espera como prop global.
- `PrayerHeader.jsx` se actualizó para leer los horarios reales, calcular el próximo rezo y aplicar los tiempos de espera.

**Limpieza de archivos**

Se revisaron y actualizaron: `PrayerClock.jsx`, `PrayerHeader.jsx`, `Navbar.jsx`, `Footer.jsx`, `Horarios.jsx` y los archivos de idioma (`es.js`, `ca.js`, `ar.js`). Se eliminaron restos del sistema antiguo y se adaptó todo para funcionar con datos reales.

**Estado actual del proyecto**

A fecha de 23 de marzo de 2026, la aplicación cuenta con:

- Sistema de horarios conectado a base de datos
- Horarios reales de la mezquita importados desde Mawaqit
- Migraciones limpias y bien estructuradas
- Seeder completo de horarios de rezo de 2026
- Comando artisan para importar años futuros
- React e Inertia consumiendo datos reales
- Tiempos de espera configurables por rezo
- Arquitectura escalable y profesional
- 5 páginas públicas: Inicio, Horarios, Noticias, Contacto y Ubicación
- Reloj analógico de rezos con countdown del próximo rezo
- Soporte multidioma completo: español, catalán y árabe (con RTL)

---

#### 25 de marzo de 2026

**Desarrollo**

**Formulario de contacto con backend**

Se implementó el formulario de contacto conectado a base de datos. Hasta ahora el formulario era estático — no guardaba nada y no hacía nada al enviarlo. El objetivo fue crear un sistema funcional que almacene los mensajes para que el imam pueda consultarlos.

**Cambios realizados:**

- Se creó `ContactController` con la lógica de validación y almacenamiento
- Se creó el modelo `ContactMessage` con las reglas de validación (nombre, email y mensaje obligatorios)
- Se creó la migración `contact_messages` con campos: nombre, email, mensaje, tipo (web/teléfono), dirección IP, user agent y fecha de lectura
- Se actualizó la página `Contacto.jsx` con el hook `useForm` de Inertia para envío AJAX sin recarga de página
- Se añadió selector de tipo de contacto: formulario web o contacto telefónico directo con el imán

**Estado:** El formulario guarda los mensajes correctamente en la base de datos. El imam podrá consultarlos desde el panel de administración (por implementar).

---

#### 26 de marzo de 2026

**Desarrollo**

**Sistema de autenticación con Laravel Fortify**

Se implementó el sistema completo de autenticación usando Laravel Fortify. Hasta ahora no había forma de que usuarios se registraran o iniciaran sesión. El objetivo fue añadir login, registro y cierre de sesión de forma segura y profesional.

**Cambios realizados:**

- Se creó el directorio `app/Actions/Fortify/` con las acciones de Fortify:
  - `CreateNewUser` — creación de usuarios con validación
  - `UpdateUserProfileInformation` — actualización de perfil
  - `UpdateUserPassword` — cambio de contraseña
  - `ResetUserPassword` — recuperación de contraseña
  - `PasswordValidationRules` — reglas de contraseña configurables
- Se creó `FortifyServiceProvider` para registrar las acciones
- Se creó el archivo de configuración `config/fortify.php` con opciones de autenticación
- Se creó el middleware `RedirectIfAuthenticated` para redirigir usuarios ya autenticados
- Se actualizó `bootstrap/app.php` para registrar el provider y el middleware con alias `guest`
- Se crearon las páginas `Login.jsx` y `Register.jsx` con formularios completos y validación
- Se añadieron traducciones de autenticación en los tres idiomas (ES, CA, AR)
- Se actualizaron las dependencias de Composer

**Estado:** El sistema de autenticación funciona correctamente. Los usuarios pueden registrarse, iniciar sesión y cerrar sesión. El panel de administración queda protegido y solo accesible para usuarios autenticados.

---

#### 26 de marzo de 2026

**Integración**

**Merge de funcionalidades en main**

Se fusionaron las ramas de desarrollo en la rama principal `main`:

- `feature/contact-form` — formulario de contacto con backend (25 mar)
- `feature/authentication` — sistema de autenticación Fortify (26 mar)
- `feature/docs` — diario de desarrollo en Markdown (25 mar)

Las funcionalidades quedan integradas y desplegadas en producción.

---

#### 27 de marzo de 2026

**Desarrollo**

**Panel de administración básico**

Se implementó la estructura básica del panel de administración. El objetivo fue crear un punto de partida para que el imam pueda gestionar los contenidos de la mezquita.

**Cambios realizados:**

- Se creó `Admin\DashboardController` con método `index` que devuelve una vista placeholder
- Se creó `routes/admin.php` con las rutas del panel bajo `/admin`
- Se creó la página `Admin/Dashboard.jsx` con estructura básica y menú de navegación
- Se creó `AdminUserSeeder` para crear un usuario administrador inicial
- Se registraron las rutas admin en `bootstrap/app.php` mediante el callback `then`

**Estado:** El panel de administración existe en su versión básica. Muestra un dashboard placeholder.Queda por implementar la funcionalidad real de gestión de horarios, donativos, noticias y otros módulos.

---

#### 28 de marzo de 2026

**Desarrollo**

**Rediseño completo del panel de administración**

Se rediseñó completamente el panel de administración con una estructura profesional y navegación completa. El objetivo fue preparar la base para gestionar todos los módulos de la aplicación.

**Cambios realizados:**

- Se creó `AdminLayout.jsx` con sidebar de navegación que incluye todos los módulos
- Se rediseñó `Dashboard.jsx` con grid de tarjetas clicables para cada módulo
- Se crearon 10 páginas placeholder para cada sección del admin:
  - Horarios, Donativos, Facturas, Noticias, Notificaciones, Imam, Clases, Ubicación, Contactos, Códigos
- Se actualizó `routes/admin.php` con todas las rutas de los módulos
- Cada página muestra un mensaje de "Módulo en construcción" con el icono de 🚧

**Módulos incluidos (según documento de requerimientos):**
1. Horarios de rezo (RF-1 a RF-4)
2. Donativos (RF-5 a RF-11)
3. Facturas (RF-12 a RF-17)
4. Notificaciones (RF-18 a RF-21)
5. Noticias (RF-21 a RF-23)
6. Información del Imán (RF-24 a RF-25)
7. Clases de Árabe/Corán (RF-26 a RF-27)
8. Ubicación/Dirección (RF-28 a RF-30)
9. Mensajes de contacto (RF-31 a RF-34)
10. Códigos de activación (RF-35 a RF-39)

**Estado:** El panel de administración tiene ahora una interfaz profesional con navegación completa. Cada módulo es accesible aunque el contenido es placeholder (por implementar).
