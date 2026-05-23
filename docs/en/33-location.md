# Module: Location

## What it does

Manages the mosque's location and contact info: address, coordinates, phone, email and WhatsApp. Displayed on the public page with a Google Maps button.

## Database

**Table:** `ubicaciones`
**Fields:** direccion, latitud, longitud, telefono, email, whatsapp

Functions as a singleton (single row).

## Backend

**Controller:** `Admin\UbicacionController`
**Model:** `Ubicacion`

**Methods:**
- `index()` — form with current data
- `guardar(Request)` — saves/updates all fields

## Admin frontend

**Page:** `Admin/Ubicacion.jsx`
- Form: address, latitude, longitude, phone, email, WhatsApp
- All fields editable

## Public frontend

**Page:** `Ubicacion.jsx`
- Full address
- Phone, email and WhatsApp with clickable links
- "View in Google Maps" button (opens Google Maps with coordinates)

## Key files

- `app/Models/Ubicacion.php`
- `app/Http/Controllers/Admin/UbicacionController.php`
- `resources/js/Pages/Admin/Ubicacion.jsx`
- `resources/js/Pages/Ubicacion.jsx`
- `database/migrations/2026_04_20_000006_create_ubicaciones_table.php`
