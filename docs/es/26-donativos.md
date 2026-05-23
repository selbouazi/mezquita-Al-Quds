# Módulo: Donativos

## ¿Qué hace?

Gestión de donaciones para la mezquita. Permite al admin llevar un registro de donantes, cantidades y estado de pago. Los usuarios autenticados pueden consultar la lista.

## Base de datos

**Tabla:** `donativos`
**Campos:** nombre_arabe, nombre, cantidad, pagado (boolean), ano, notas

## Backend

**Controlador:** `Admin\DonativosController`
**Modelo:** `Donativo`

**Scopes del modelo:**
- `byYear($ano)` — filtrar por año
- `paid()` — donativos pagados
- `pending()` — donativos pendientes

**Métodos del controlador:**
- `index()` — lista con filtro por año
- `store(Request)` — crear donativo
- `update(Request, $id)` — actualizar
- `destroy($id)` — eliminar
- `togglePagado(Donativo $donativo)` — cambiar estado pagado/pendiente

## Frontend admin

**Página:** `Admin/Donativos.jsx`
- Tabla con todos los donativos
- Formulario para añadir/editar
- Botón toggle para pagado/pendiente
- Filtro por año

## Frontend público

**Página:** `Donativos.jsx` (requiere autenticación)
- Lista de donativos filtrable por año
- Solo lectura (sin edición)

## Decisiones técnicas

- **`nombre_arabe` + `nombre`**: Se almacena el nombre en árabe y en latino por separado para respetar la identidad cultural.
- **Toggle en vez de eliminar**: El botón pagado/pendiente permite corregir estados sin perder el registro. No hay delete en la UI pública.
- **Filtro por año**: Los donativos se agrupan por año para facilitar la consulta histórica.

## Archivos clave

- `app/Models/Donativo.php`
- `app/Http/Controllers/Admin/DonativosController.php`
- `resources/js/Pages/Admin/Donativos.jsx`
- `resources/js/Pages/Donativos.jsx`
- `database/migrations/2026_04_20_000001_create_donativos_table.php`
