# Módulo: Ubicación

## ¿Qué hace?

Gestiona la información de ubicación y contacto de la mezquita: dirección, coordenadas, teléfono, email y WhatsApp. Se muestra en la página pública con botón para abrir en Google Maps.

## Base de datos

**Tabla:** `ubicaciones`
**Campos:** direccion, latitud, longitud, telefono, email, whatsapp

Funciona como singleton (una sola fila).

## Backend

**Controlador:** `Admin\UbicacionController`
**Modelo:** `Ubicacion`

**Métodos:**
- `index()` — formulario con datos actuales
- `guardar(Request)` — guarda/actualiza todos los campos

## Frontend admin

**Página:** `Admin/Ubicacion.jsx`
- Formulario: dirección, latitud, longitud, teléfono, email, WhatsApp
- Todos los campos editables

## Frontend público

**Página:** `Ubicacion.jsx`
- Dirección completa
- Teléfono, email y WhatsApp con enlaces clicables
- Botón "Ver en Google Maps" (abre Google Maps con las coordenadas)

## Archivos clave

- `app/Models/Ubicacion.php`
- `app/Http/Controllers/Admin/UbicacionController.php`
- `resources/js/Pages/Admin/Ubicacion.jsx`
- `resources/js/Pages/Ubicacion.jsx`
- `database/migrations/2026_04_20_000006_create_ubicaciones_table.php`
