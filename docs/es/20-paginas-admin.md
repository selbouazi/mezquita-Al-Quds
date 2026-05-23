# Páginas del panel admin

11 páginas React para la gestión administrativa, todas envueltas en `AdminLayout`.

## Dashboard (`/admin`)

**Archivo:** `Pages/Admin/Dashboard.jsx`

Grid de tarjetas clicables para cada uno de los 10 módulos. Cada tarjeta tiene icono SVG, título y descripción breve.

## Donativos (`/admin/donativos`)

**Archivo:** `Pages/Admin/Donativos.jsx`

CRUD completo: tabla con todos los donativos, formulario para añadir/editar, toggle pagado/pendiente, filtro por año.

## Facturas (`/admin/facturas`)

**Archivo:** `Pages/Admin/Facturas.jsx`

CRUD + subida de PDF: tabla con facturas, formulario con file input para PDF, descarga directa.

## Clases (`/admin/clases`)

**Archivo:** `Pages/Admin/Clases.jsx`

CRUD de clases: título, descripción, horarios, nivel, profesor, requisitos, toggle activo/inactivo.

## Noticias (`/admin/noticias`)

**Archivo:** `Pages/Admin/Noticias.jsx`

CRUD de noticias: título, contenido (textarea), imagen destacada, fecha de publicación, toggle publicado/borrador.

## Notificaciones (`/admin/notificaciones`)

**Archivo:** `Pages/Admin/Notificaciones.jsx`

CRUD de notificaciones: título, mensaje, prioridad (baja/normal/alta/urgente), toggle activa/inactiva, fecha de expiración. Buscador/filtro incluido.

## Contactos (`/admin/contactos`)

**Archivo:** `Pages/Admin/Contactos.jsx`

Bandeja de entrada: lista de mensajes recibidos, marcar como leído, eliminar.

## Ubicación (`/admin/ubicacion`)

**Archivo:** `Pages/Admin/Ubicacion.jsx`

Formulario para editar: dirección, latitud, longitud, teléfono, email, WhatsApp.

## Imam (`/admin/imam`)

**Archivo:** `Pages/Admin/Imam.jsx`

Formulario para editar: nombre del imam, descripción, foto (subida de imagen).

## Códigos (`/admin/codigos`)

**Archivo:** `Pages/Admin/Codigos.jsx`

Gestión de códigos de activación: generar nuevos códigos, ver códigos existentes, activar/desactivar.

## Horarios (admin) (`/admin/horarios`)

**Archivo:** `Pages/Admin/Horarios.jsx`

Configuración de tiempos de espera (minutos entre adhan e iqama) para cada rezo: fajr, sunrise, dhuhr, asr, maghrib, isha.
