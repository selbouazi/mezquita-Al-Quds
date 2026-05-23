# Admin Panel Pages

11 React pages for administrative management, all wrapped in `AdminLayout`.

## Dashboard (`/admin`)

**File:** `Pages/Admin/Dashboard.jsx`

Grid of clickable cards for each of the 10 modules. Each card has an SVG icon, title and brief description.

## Donations (`/admin/donativos`)

**File:** `Pages/Admin/Donativos.jsx`

Full CRUD: table with all donations, add/edit form, paid/pending toggle, year filter.

## Invoices (`/admin/facturas`)

**File:** `Pages/Admin/Facturas.jsx`

CRUD + PDF upload: invoice table, form with PDF file input, direct download.

## Classes (`/admin/clases`)

**File:** `Pages/Admin/Clases.jsx`

CRUD for classes: title, description, schedule, level, teacher, requirements, active/inactive toggle.

## News (`/admin/noticias`)

**File:** `Pages/Admin/Noticias.jsx`

CRUD for news: title, content (textarea), featured image, publication date, published/draft toggle.

## Notifications (`/admin/notificaciones`)

**File:** `Pages/Admin/Notificaciones.jsx`

CRUD for notifications: title, message, priority (low/normal/high/urgent), active/inactive toggle, expiration date. Search/filter included.

## Contacts (`/admin/contactos`)

**File:** `Pages/Admin/Contactos.jsx`

Inbox: received messages list, mark as read, delete.

## Location (`/admin/ubicacion`)

**File:** `Pages/Admin/Ubicacion.jsx`

Form for editing: address, latitude, longitude, phone, email, WhatsApp.

## Imam (`/admin/imam`)

**File:** `Pages/Admin/Imam.jsx`

Form for editing: imam name, description, photo (image upload).

## Codes (`/admin/codigos`)

**File:** `Pages/Admin/Codigos.jsx`

Activation code management: generate new codes, view existing, enable/disable.

## Wait Times (`/admin/horarios`)

**File:** `Pages/Admin/Horarios.jsx`

Wait time configuration (minutes between adhan and iqama) for each prayer: fajr, sunrise, dhuhr, asr, maghrib, isha.
