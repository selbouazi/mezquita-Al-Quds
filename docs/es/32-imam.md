# Módulo: Imam

## ¿Qué hace?

Gestiona la información del imam de la mezquita: nombre, descripción y foto. Se muestra en la página pública y se expone via API.

## Base de datos

**Tabla:** `imam_settings`
**Campos:** nombre, descripcion, foto (ruta de imagen)

Funciona como singleton (una sola fila). No hay lista ni CRUD múltiple.

## Backend

**Controlador admin:** `Admin\ImamController`
**Controlador API:** closure en `web.php`
**Modelo:** `ImamSetting`

**Métodos:**
- `index()` — muestra el formulario con datos actuales
- `guardar(Request)` — guarda/actualiza nombre, descripción y foto

**Accesor del modelo:**
- `foto` — devuelve URL completa de la imagen

## Frontend admin

**Página:** `Admin/Imam.jsx`
- Formulario: nombre, descripción (textarea), foto (file input)
- Validación de imagen (tamaño, tipo)

## Frontend público

**Página:** `Imam.jsx`
- Muestra nombre, foto y descripción del imam

## API

**Endpoint:** `GET /api/imam`
**Respuesta:** JSON con nombre, descripción y URL de la foto

## Archivos clave

- `app/Models/ImamSetting.php`
- `app/Http/Controllers/Admin/ImamController.php`
- `resources/js/Pages/Admin/Imam.jsx`
- `resources/js/Pages/Imam.jsx`
- `database/migrations/2026_04_13_000003_create_imam_settings_table.php`
- `routes/web.php` (`/api/imam`)
