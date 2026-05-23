# Assets and Storage

## Public files (public/)

| File | Purpose |
|------|---------|
| `favicon.ico` | Favicon for older browsers |
| `favicon.png` | Modern favicon |
| `robots.txt` | Crawler control |
| `.htaccess` | Apache config (URL rewriting) |

### Images

| Path | Description |
|------|-------------|
| `public/img/mezquitaAlquds_logo.png` | Main logo (navbar, footer) |
| `public/img/mezquitaAlquds_logo2.png` | Alternative logo |
| `public/img/mezquitaAlquds_logo3.png` | Alternative logo |
| `public/img/lang/es.png` | Spanish flag |
| `public/img/lang/ca.png` | Catalan flag |
| `public/img/lang/en.png` | English flag |
| `public/img/lang/ar.png` | Arabic flag |

## Storage (storage/app/public/)

### facturas/

Directory for invoice PDFs uploaded from admin. Files are automatically named with a unique Laravel-generated ID.

**Public access:** URLs are generated via the `getArchivoUrlAttribute()` accessor on the Factura model.

### noticias/

Directory for featured news images.

### imam/

Directory for the imam's photo.

## Storage disks (config/filesystems.php)

| Disk | Driver | Path |
|------|--------|------|
| `local` | local | `storage/app/` |
| `public` | local | `storage/app/public/` |
| `facturas` | local | `storage/app/public/facturas/` |
| `noticias` | local | `storage/app/public/noticias/` |
| `imam` | local | `storage/app/public/imam/` |

**Note:** For public file access, the symlink must exist: `php artisan storage:link`
