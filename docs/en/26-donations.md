# Module: Donations

## What it does

Donation management for the mosque. Admin can track donors, amounts and payment status. Authenticated users can view the list.

## Database

**Table:** `donativos`
**Fields:** nombre_arabe, nombre, cantidad, pagado (boolean), ano, notas

## Backend

**Controller:** `Admin\DonativosController`
**Model:** `Donativo`

**Model scopes:**
- `byYear($ano)` — filter by year
- `paid()` — paid donations
- `pending()` — pending donations

**Controller methods:**
- `index()` — list with year filter
- `store(Request)` — create
- `update(Request, $id)` — update
- `destroy($id)` — delete
- `togglePagado(Donativo $donativo)` — toggle paid/pending

## Admin frontend

**Page:** `Admin/Donativos.jsx`
- Table with all donations
- Add/edit form
- Paid/pending toggle button
- Year filter

## Public frontend

**Page:** `Donativos.jsx` (requires auth)
- Filterable donation list
- Read-only (no editing)

## Technical decisions

- **`nombre_arabe` + `nombre`**: Arabic and Latin names stored separately to respect cultural identity.
- **Toggle instead of delete**: Paid/pending button allows status correction without losing records. No delete in public UI.
- **Year filter**: Donations grouped by year for historical reference.

## Key files

- `app/Models/Donativo.php`
- `app/Http/Controllers/Admin/DonativosController.php`
- `resources/js/Pages/Admin/Donativos.jsx`
- `resources/js/Pages/Donativos.jsx`
- `database/migrations/2026_04_20_000001_create_donativos_table.php`
