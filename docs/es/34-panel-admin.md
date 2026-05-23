# Módulo: Panel de Administración

## ¿Qué hace?

Panel completo para que el imam gestione todos los aspectos de la mezquita: donativos, facturas, noticias, notificaciones, clases, contacto, ubicación, imam, códigos de activación y horarios.

## Estructura

### Layout

`AdminLayout.jsx` proporciona:
- Sidebar de navegación con los 10 módulos + dashboard
- Cabecera con selector de idioma y datos del usuario
- Botón de cerrar sesión
- Diseño responsive (sidebar se oculta en móvil)

### Dashboard

`Dashboard.jsx` muestra un grid de tarjetas clicables para acceder a cada módulo. Cada tarjeta tiene un icono SVG representativo.

### Módulos incluidos

| # | Módulo | Ruta | Descripción |
|---|--------|------|-------------|
| 1 | Dashboard | `/admin` | Resumen y acceso a módulos |
| 2 | Donativos | `/admin/donativos` | CRUD + toggle pagado |
| 3 | Facturas | `/admin/facturas` | CRUD + PDF upload/download |
| 4 | Clases | `/admin/clases` | CRUD + toggle activo |
| 5 | Noticias | `/admin/noticias` | CRUD + imagen + toggle publicado |
| 6 | Notificaciones | `/admin/notificaciones` | CRUD + prioridad + toggle + expiración |
| 7 | Contactos | `/admin/contactos` | Bandeja + marcar leído |
| 8 | Ubicación | `/admin/ubicacion` | Editar datos de contacto y mapa |
| 9 | Imam | `/admin/imam` | Editar nombre, descripción, foto |
| 10 | Códigos | `/admin/codigos` | Generar/desactivar códigos |
| 11 | Horarios | `/admin/horarios` | Tiempos de espera por rezo |

## Rutas

Todas las rutas admin están en `routes/admin.php`, incluidas desde `web.php`. Usan middleware `auth` y `admin`.

## Decisiones técnicas

- **Sidebar con iconos SVG:** Se usaron iconos SVG inline (sin librerías externas) para mantener el peso bajo y evitar dependencias.
- **Responsive:** En móvil, el sidebar se convierte en overlay que se abre con botón hamburguesa.
- **Idioma en admin:** El panel respeta el idioma seleccionado por el usuario. Las traducciones del admin están en los mismos archivos lang que el frontend público.

## Archivos clave

- `resources/js/Layouts/AdminLayout.jsx`
- `resources/js/Pages/Admin/Dashboard.jsx`
- `routes/admin.php`
- `app/Http/Controllers/Admin/DashboardController.php`
- `app/Http/Middleware/AdminMiddleware.php`
