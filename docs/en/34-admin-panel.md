# Module: Admin Panel

## What it does

Full panel for the imam to manage all aspects of the mosque: donations, invoices, news, notifications, classes, contacts, location, imam, activation codes and prayer wait times.

## Structure

### Layout

`AdminLayout.jsx` provides:
- Sidebar navigation with 10 modules + dashboard
- Header with language selector and user data
- Logout button
- Responsive design (sidebar hidden on mobile)

### Dashboard

`Dashboard.jsx` shows a grid of clickable cards for each module. Each card has a representative SVG icon.

### Included modules

| # | Module | Route | Description |
|---|--------|-------|-------------|
| 1 | Dashboard | `/admin` | Overview and module access |
| 2 | Donations | `/admin/donativos` | CRUD + paid toggle |
| 3 | Invoices | `/admin/facturas` | CRUD + PDF upload/download |
| 4 | Classes | `/admin/clases` | CRUD + active toggle |
| 5 | News | `/admin/noticias` | CRUD + image + publish toggle |
| 6 | Notifications | `/admin/notificaciones` | CRUD + priority + toggle + expiry |
| 7 | Contacts | `/admin/contactos` | Inbox + mark read |
| 8 | Location | `/admin/ubicacion` | Edit contact and map data |
| 9 | Imam | `/admin/imam` | Edit name, description, photo |
| 10 | Codes | `/admin/codigos` | Generate/deactivate codes |
| 11 | Wait Times | `/admin/horarios` | Wait minutes per prayer |

## Routes

All admin routes are in `routes/admin.php`, included from `web.php`. Use `auth` and `admin` middleware.

## Technical decisions

- **SVG icons in sidebar:** Inline SVG icons (no external libraries) to keep bundle size low and avoid dependencies.
- **Responsive:** On mobile, the sidebar becomes an overlay opened via hamburger button.
- **Language in admin:** The panel respects the user's selected language. Admin translations are in the same lang files as the public frontend.

## Key files

- `resources/js/Layouts/AdminLayout.jsx`
- `resources/js/Pages/Admin/Dashboard.jsx`
- `routes/admin.php`
- `app/Http/Controllers/Admin/DashboardController.php`
- `app/Http/Middleware/AdminMiddleware.php`
