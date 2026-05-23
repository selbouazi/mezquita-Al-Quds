# Module: Imam

## What it does

Manages the mosque imam's information: name, description and photo. Displayed on the public page and exposed via API.

## Database

**Table:** `imam_settings`
**Fields:** nombre, descripcion, foto (image path)

Functions as a singleton (single row). No list or multi-CRUD.

## Backend

**Admin controller:** `Admin\ImamController`
**API controller:** closure in `web.php`
**Model:** `ImamSetting`

**Methods:**
- `index()` — shows form with current data
- `guardar(Request)` — saves/updates name, description and photo

**Model accessor:**
- `foto` — returns full image URL

## Admin frontend

**Page:** `Admin/Imam.jsx`
- Form: name, description (textarea), photo (file input)
- Image validation (size, type)

## Public frontend

**Page:** `Imam.jsx`
- Displays imam name, photo and description

## API

**Endpoint:** `GET /api/imam`
**Response:** JSON with name, description and photo URL

## Key files

- `app/Models/ImamSetting.php`
- `app/Http/Controllers/Admin/ImamController.php`
- `resources/js/Pages/Admin/Imam.jsx`
- `resources/js/Pages/Imam.jsx`
- `database/migrations/2026_04_13_000003_create_imam_settings_table.php`
- `routes/web.php` (`/api/imam`)
