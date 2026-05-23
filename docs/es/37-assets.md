# Assets y almacenamiento

## Archivos públicos (public/)

| Archivo | Propósito |
|---------|-----------|
| `favicon.ico` | Favicon para navegadores antiguos |
| `favicon.png` | Favicon moderno |
| `robots.txt` | Control de crawlers |
| `.htaccess` | Configuración Apache (URL rewriting) |

### Imágenes

| Ruta | Descripción |
|------|-------------|
| `public/img/mezquitaAlquds_logo.png` | Logo principal (navbar, footer) |
| `public/img/mezquitaAlquds_logo2.png` | Logo alternativo |
| `public/img/mezquitaAlquds_logo3.png` | Logo alternativo |
| `public/img/lang/es.png` | Bandera español |
| `public/img/lang/ca.png` | Bandera catalana |
| `public/img/lang/en.png` | Bandera inglesa |
| `public/img/lang/ar.png` | Bandera árabe |

## Almacenamiento (storage/app/public/)

### facturas/

Directorio donde se almacenan los PDFs de facturas subidos desde el admin. Los archivos se nombran automáticamente con un ID único generado por Laravel.

**Acceso público:** Las URLs se generan mediante el accesor `getArchivoUrlAttribute()` del modelo Factura.

### noticias/

Directorio donde se almacenan las imágenes destacadas de las noticias.

### imam/

Directorio donde se almacena la foto del imam.

## Discos de almacenamiento (config/filesystems.php)

| Disco | Driver | Ruta |
|-------|--------|------|
| `local` | local | `storage/app/` |
| `public` | local | `storage/app/public/` |
| `facturas` | local | `storage/app/public/facturas/` |
| `noticias` | local | `storage/app/public/noticias/` |
| `imam` | local | `storage/app/public/imam/` |

**Nota:** Para que los archivos sean accesibles públicamente, debe existir el symlink: `php artisan storage:link`
