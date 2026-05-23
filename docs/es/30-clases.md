# Módulo: Clases

## ¿Qué hace?

Gestión de clases ofrecidas por la mezquita (árabe, Corán, etc.). El admin puede crear clases con niveles, horarios y profesor. Se muestran en la página pública.

## Base de datos

**Tabla:** `clases`
**Campos:** titulo, descripcion, horarios, nivel, profesor, requisitos, activo (boolean)

## Backend

**Controlador:** `Admin\ClasesController`
**Modelo:** `Clase`

**Métodos:**
- `index()` — lista de clases
- `store(Request)` — crear
- `update(Request, $id)` — actualizar
- `destroy($id)` — eliminar

## Frontend admin

**Página:** `Admin/Clases.jsx`
- Tabla con clases
- Formulario: título, descripción, horarios, nivel, profesor, requisitos
- Toggle activo/inactivo

## Frontend público

Las clases se muestran integradas en la página principal (Home) o en una sección dedicada.

## Archivos clave

- `app/Models/Clase.php`
- `app/Http/Controllers/Admin/ClasesController.php`
- `resources/js/Pages/Admin/Clases.jsx`
- `database/migrations/2026_04_20_000003_create_clases_table.php`
