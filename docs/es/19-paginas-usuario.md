# Páginas de usuario autenticado

2 páginas accesibles para usuarios logueados (rol `user` o `admin`).

## Facturas (`/facturas`)

**Archivo:** `Pages/Facturas.jsx`

Lista de facturas disponibles para descarga. Cada fila muestra:
- Título de la factura
- Fecha
- Enlace de descarga (PDF)

**Backend:** `Factura` model con `getArchivoUrlAttribute()` que genera la URL completa del PDF almacenado en `storage/app/public/facturas/`.

## Donativos (`/donativos`)

**Archivo:** `Pages/Donativos.jsx`

Lista de donativos con filtro por año. Muestra:
- Nombre del donante
- Cantidad
- Estado (pagado/pendiente)
- Filtro de año (dropdown)

**Backend:** `Donativo` model con scopes `byYear()`, `paid()`, `pending()`.

**Decisión:** Solo lectura para usuarios no-admin. La edición se hace desde el panel admin.
