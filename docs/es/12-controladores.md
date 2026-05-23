# Controladores

17 controladores que manejan toda la lógica de la aplicación.

## Controlador base

### Controller.php

Clase abstracta base. Sin contenido propio — solo extiende `Illuminate\Routing\Controller`.

## Controladores públicos

### HorarioController.php

Controlador principal para páginas públicas. Métodos:
- `home()` — renderiza Home con horario del día
- `horarios(Request)` — renderiza vista mensual con filtro año/mes
- `noticias()` — renderiza lista de noticias
- `contacto()` — renderiza formulario de contacto
- `ubicacion()` — renderiza página de ubicación
- `switchLang(Request, $lang)` — cambia idioma y redirige

### ContactController.php

Maneja el envío del formulario de contacto:
- `store(Request)` — valida y guarda el mensaje en `contact_messages`

**Validación:** name (required), email (required, email), message (required). Guarda también IP y user agent.

### NoticiasController.php

- `index()` — devuelve noticias publicadas paginadas (6 por página)

## Controladores de autenticación

### LoginController.php

- `showLoginForm()` — renderiza Auth/Login
- `login(Request)` — valida y autentica, redirige a `/admin` si admin
- `logout(Request)` — cierra sesión

### RegisterController.php

- `showRegistrationForm()` — renderiza Auth/Register
- `register(Request)` — valida código de activación, crea usuario

**Validación de código:** Busca un `ActivationCode` activo y no expirado que coincida con el código proporcionado. Si no existe, rechaza el registro.

## Controladores admin (todos en Admin/)

| Controlador | Módulo | Métodos clave |
|-------------|--------|---------------|
| DashboardController | Dashboard | `index()` — renderiza dashboard |
| DonativosController | Donativos | `index()`, `store()`, `update()`, `destroy()`, `togglePagado()` |
| FacturasController | Facturas | `index()`, `store()`, `update()`, `destroy()`, `download()` |
| ClasesController | Clases | `index()`, `store()`, `update()`, `destroy()` |
| NoticiasController | Noticias | `index()`, `store()`, `update()`, `destroy()` |
| NotificationController | Notificaciones | `index()`, `store()`, `update()`, `destroy()`, `toggle()` |
| ContactosController | Contactos | `index()`, `marcarLeido()`, `destroy()` |
| UbicacionController | Ubicación | `index()`, `guardar()` |
| ImamController | Imam | `index()`, `guardar()` |
| ActivationCodeController | Códigos | `index()`, `generar()`, `actualizar()` |
| TiemposEsperaController | Horarios | `index()`, `update($rezo)` |

### Detalle de métodos comunes

**CRUD estándar:**
- `index()` — lista todos los registros (con filtros si aplica)
- `store(Request)` — valida y crea nuevo registro
- `update(Request, $id)` — valida y actualiza
- `destroy($id)` — elimina (soft delete o hard delete según el módulo)

**Métodos específicos:**
- `togglePagado(Donativo $donativo)` — cambia estado pagado/pendiente
- `toggle(Notification $notification)` — activa/desactiva notificación
- `marcarLeido(Contacto $contacto)` — marca mensaje como leído
- `generar()` — genera nuevo código de activación aleatorio
- `actualizar()` — actualiza estado de códigos
- `download(Factura $factura)` — descarga el PDF de la factura
