# Authenticated User Pages

2 pages accessible for logged-in users (role `user` or `admin`).

## Invoices (`/facturas`)

**File:** `Pages/Facturas.jsx`

Invoice list available for download. Each row shows:
- Invoice title
- Date
- Download link (PDF)

**Backend:** `Factura` model with `getArchivoUrlAttribute()` generating the full PDF URL from `storage/app/public/facturas/`.

## Donations (`/donativos`)

**File:** `Pages/Donativos.jsx`

Donation list with year filter. Shows:
- Donor name
- Amount
- Status (paid/pending)
- Year filter (dropdown)

**Backend:** `Donativo` model with scopes `byYear()`, `paid()`, `pending()`.

**Decision:** Read-only for non-admin users. Editing is done from the admin panel.
