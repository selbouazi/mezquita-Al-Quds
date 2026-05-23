# Módulo: Facturas

## ¿Qué hace?

Gestión de facturas de la mezquita. El admin puede subir archivos PDF, y los usuarios autenticados pueden descargarlos.

## Base de datos

**Tabla:** `facturas`
**Campos:** titulo, fecha, archivo_pdf (string con ruta al archivo), notas

El PDF se almacena en `storage/app/public/facturas/`.

## Backend

**Controlador:** `Admin\FacturasController`
**Modelo:** `Factura`

**Métodos del controlador:**
- `index()` — lista de facturas
- `store(Request)` — crear factura con subida de PDF
- `update(Request, $id)` — actualizar (con opción de nuevo PDF)
- `destroy($id)` — eliminar factura y su PDF
- `download(Factura $factura)` — descargar el PDF

**Accesor del modelo:**
- `getArchivoUrlAttribute()` — devuelve la URL pública del PDF

## Frontend admin

**Página:** `Admin/Facturas.jsx`
- Tabla con facturas
- Formulario con file input para subir PDF
- Botón de descarga directa

## Frontend público

**Página:** `Facturas.jsx` (requiere autenticación)
- Lista de facturas con enlace de descarga
- Solo lectura

## Decisiones técnicas

- **Subida de archivos:** Se usa el disco `public` de Laravel. El PDF se almacena con nombre único generado por `$request->file('archivo_pdf')->store('facturas', 'public')`.
- **Accesor `archivoUrl`:** El modelo expone una URL pública para que el frontend pueda descargar el PDF sin exponer la ruta real del servidor.
- **Eliminación:** Al borrar una factura, también se elimina el archivo PDF del disco.

## Archivos clave

- `app/Models/Factura.php`
- `app/Http/Controllers/Admin/FacturasController.php`
- `resources/js/Pages/Admin/Facturas.jsx`
- `resources/js/Pages/Facturas.jsx`
- `database/migrations/2026_04_20_000002_create_facturas_table.php`
- `storage/app/public/facturas/` (PDFs almacenados)
