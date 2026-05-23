# Controllers

17 controllers handling all application logic.

## Base Controller

### Controller.php

Abstract base class. Extends `Illuminate\Routing\Controller`. Empty.

## Public Controllers

### HorarioController.php

Main controller for public pages. Methods:
- `home()` — renders Home with today's prayer times
- `horarios(Request)` — renders monthly view with year/month filter
- `noticias()` — renders news list
- `contacto()` — renders contact form
- `ubicacion()` — renders location page
- `switchLang(Request, $lang)` — switches language and redirects

### ContactController.php

Handles contact form submission:
- `store(Request)` — validates and saves to `contact_messages`

**Validation:** name (required), email (required, email), message (required). Also saves IP and user agent.

### NoticiasController.php

- `index()` — returns paginated published news (6 per page)

## Auth Controllers

### LoginController.php

- `showLoginForm()` — renders Auth/Login
- `login(Request)` — validates and authenticates, redirects to `/admin` if admin
- `logout(Request)` — logs out

### RegisterController.php

- `showRegistrationForm()` — renders Auth/Register
- `register(Request)` — validates activation code, creates user

**Code validation:** Looks for an active, non-expired `ActivationCode` matching the provided code. Rejects registration if not found.

## Admin Controllers (all in Admin/)

| Controller | Module | Key Methods |
|------------|--------|-------------|
| DashboardController | Dashboard | `index()` — renders dashboard |
| DonativosController | Donations | `index()`, `store()`, `update()`, `destroy()`, `togglePagado()` |
| FacturasController | Invoices | `index()`, `store()`, `update()`, `destroy()`, `download()` |
| ClasesController | Classes | `index()`, `store()`, `update()`, `destroy()` |
| NoticiasController | News | `index()`, `store()`, `update()`, `destroy()` |
| NotificationController | Notifications | `index()`, `store()`, `update()`, `destroy()`, `toggle()` |
| ContactosController | Contacts | `index()`, `marcarLeido()`, `destroy()` |
| UbicacionController | Location | `index()`, `guardar()` |
| ImamController | Imam | `index()`, `guardar()` |
| ActivationCodeController | Codes | `index()`, `generar()`, `actualizar()` |
| TiemposEsperaController | Wait Times | `index()`, `update($rezo)` |

### Common method patterns

**Standard CRUD:**
- `index()` — lists all records (with filters if applicable)
- `store(Request)` — validates and creates
- `update(Request, $id)` — validates and updates
- `destroy($id)` — deletes (soft or hard depending on module)

**Specific methods:**
- `togglePagado(Donativo $donativo)` — toggles paid/pending
- `toggle(Notification $notification)` — enables/disables
- `marcarLeido(Contacto $contacto)` — marks as read
- `generar()` — generates random activation code
- `actualizar()` — updates code statuses
- `download(Factura $factura)` — downloads invoice PDF
