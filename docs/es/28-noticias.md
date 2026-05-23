# Módulo: Noticias

## ¿Qué hace?

Sistema de noticias para mantener informada a la comunidad. El admin crea noticias con imágenes, y se muestran en la página pública con paginación.

## Base de datos

**Tabla:** `noticias`
**Campos:** titulo, contenido, imagen (ruta), fecha_publicacion, publicado (boolean)

Las imágenes se almacenan en `storage/app/public/noticias/`.

## Backend

**Controlador público:** `NoticiasController`
**Controlador admin:** `Admin\NoticiasController`
**Modelo:** `Noticia`

**Scopes:**
- `scopePublicado()` — solo noticias con publicado=true

**Métodos admin:**
- `index()` — lista de noticias
- `store(Request)` — crear con imagen
- `update(Request, $id)` — actualizar
- `destroy($id)` — eliminar

## Frontend admin

**Página:** `Admin/Noticias.jsx`
- Tabla con todas las noticias
- Formulario: título, contenido (textarea), imagen, fecha de publicación
- Toggle publicado/borrador

## Frontend público

**Página:** `Noticias.jsx`
- Lista paginada (6 por página)
- Cada noticia muestra: imagen destacada, título, extracto, fecha

## Decisiones técnicas

- **Imagen destacada:** Se almacena en el disco `public`, ruta `noticias/`. El modelo tiene un accesor que genera la URL pública.
- **Publicación programada:** El campo `fecha_publicacion` permite preparar noticias con antelación. Combinado con `publicado`, controlamos cuándo se muestra.
- **Paginación:** 6 noticias por página para mantener la interfaz limpia.

## Archivos clave

- `app/Models/Noticia.php`
- `app/Http/Controllers/NoticiasController.php`
- `app/Http/Controllers/Admin/NoticiasController.php`
- `resources/js/Pages/Noticias.jsx`
- `resources/js/Pages/Admin/Noticias.jsx`
- `database/migrations/2026_04_20_000005_create_noticias_table.php`
