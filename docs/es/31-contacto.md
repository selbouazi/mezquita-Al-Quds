# Módulo: Contacto

## ¿Qué hace?

Sistema de contacto en dos partes:
1. **Formulario público** — los visitantes pueden enviar mensajes a la mezquita
2. **Bandeja admin** — el imam consulta y gestiona los mensajes recibidos

## Base de datos

Existen dos tablas de contacto (evolución del proyecto):

| Tabla | Propósito | Creada |
|-------|-----------|--------|
| `contact_messages` | Primera implementación del formulario | 24 Mar |
| `contactos` | Segunda implementación con bandeja admin | 20 Abr |

**contact_messages campos:** name, email, message, type (web/phone), phone, ip_address, user_agent

**contactos campos:** nombre, email, telefono, mensaje, tipo, leido (boolean)

## Backend

**ContactController:**
- `store(Request)` — valida y guarda en `contact_messages`
- Validación: name, email, message requeridos
- Guarda IP y user agent automáticamente
- Tipo: formulario web o contacto telefónico directo
- Rate limiting: 5 intentos/minuto (middleware `throttle:5,1` en ruta)

**Admin\ContactosController:**
- `index()` — lista de mensajes (no leídos primero)
- `marcarLeido(Contacto $contacto)` — marca como leído
- `destroy($id)` — eliminar mensaje

## Frontend público

**Página:** `Contacto.jsx`
- Formulario con campos: nombre, email, mensaje
- Selector de tipo: formulario web / contacto telefónico
- Envío AJAX con `useForm` de Inertia (sin recarga)
- Validación visual con estados de error

## Frontend admin

**Página:** `Admin/Contactos.jsx`
- Bandeja de entrada con lista de mensajes
- Indicador de leído/no leído
- Botón "marcar como leído"
- Botón eliminar

## Dificultades y soluciones

**Problema:** Dos tablas de contacto similares.
**Contexto:** `contact_messages` se creó primero como solución rápida. Al implementar el módulo admin con bandeja, se creó `contactos` con campo `leido` para gestionar el estado de lectura. Queda como mejora pendiente unificar ambas tablas.

## Archivos clave

- `app/Models/ContactMessage.php`
- `app/Models/Contacto.php`
- `app/Http/Controllers/ContactController.php`
- `app/Http/Controllers/Admin/ContactosController.php`
- `resources/js/Pages/Contacto.jsx`
- `resources/js/Pages/Admin/Contactos.jsx`
- `database/migrations/2026_03_24_022027_create_contact_messages_table.php`
- `database/migrations/2026_04_20_000004_create_contactos_table.php`
