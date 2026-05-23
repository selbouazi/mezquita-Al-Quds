# Module: News

## What it does

News system to keep the community informed. Admin creates news with images, displayed on the public page with pagination.

## Database

**Table:** `noticias`
**Fields:** titulo, contenido, imagen (path), fecha_publicacion, publicado (boolean)

Images stored in `storage/app/public/noticias/`.

## Backend

**Public controller:** `NoticiasController`
**Admin controller:** `Admin\NoticiasController`
**Model:** `Noticia`

**Scopes:**
- `scopePublicado()` — only published news

**Admin methods:**
- `index()` — list news
- `store(Request)` — create with image
- `update(Request, $id)` — update
- `destroy($id)` — delete

## Admin frontend

**Page:** `Admin/Noticias.jsx`
- Table with all news
- Form: title, content (textarea), image, publication date
- Published/draft toggle

## Public frontend

**Page:** `Noticias.jsx`
- Paginated list (6 per page)
- Each news shows: featured image, title, excerpt, date

## Technical decisions

- **Featured image:** Stored on `public` disk, path `noticias/`. Model has an accessor generating the public URL.
- **Scheduled publishing:** `fecha_publicacion` allows preparing news in advance. Combined with `publicado`, we control when it's shown.
- **Pagination:** 6 news per page for a clean interface.

## Key files

- `app/Models/Noticia.php`
- `app/Http/Controllers/NoticiasController.php`
- `app/Http/Controllers/Admin/NoticiasController.php`
- `resources/js/Pages/Noticias.jsx`
- `resources/js/Pages/Admin/Noticias.jsx`
- `database/migrations/2026_04_20_000005_create_noticias_table.php`
