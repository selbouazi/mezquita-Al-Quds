# Module: Classes

## What it does

Management of classes offered by the mosque (Arabic, Quran, etc.). Admin can create classes with levels, schedules and teacher info. Displayed on the public page.

## Database

**Table:** `clases`
**Fields:** titulo, descripcion, horarios, nivel, profesor, requisitos, activo (boolean)

## Backend

**Controller:** `Admin\ClasesController`
**Model:** `Clase`

**Methods:**
- `index()` — list classes
- `store(Request)` — create
- `update(Request, $id)` — update
- `destroy($id)` — delete

## Admin frontend

**Page:** `Admin/Clases.jsx`
- Class table
- Form: title, description, schedule, level, teacher, requirements
- Active/inactive toggle

## Public frontend

Classes are shown integrated into the main page (Home) or a dedicated section.

## Key files

- `app/Models/Clase.php`
- `app/Http/Controllers/Admin/ClasesController.php`
- `resources/js/Pages/Admin/Clases.jsx`
- `database/migrations/2026_04_20_000003_create_clases_table.php`
