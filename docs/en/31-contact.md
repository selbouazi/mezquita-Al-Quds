# Module: Contact

## What it does

Two-part contact system:
1. **Public form** — visitors can send messages to the mosque
2. **Admin inbox** — the imam reads and manages received messages

## Database

Two contact tables exist (project evolution):

| Table | Purpose | Created |
|-------|---------|---------|
| `contact_messages` | First form implementation | 24 Mar |
| `contactos` | Second implementation with admin inbox | 20 Apr |

**contact_messages fields:** name, email, message, type (web/phone), phone, ip_address, user_agent

**contactos fields:** nombre, email, telefono, mensaje, tipo, leido (boolean)

## Backend

**ContactController:**
- `store(Request)` — validates and saves to `contact_messages`
- Validation: name, email, message required
- Auto-saves IP and user agent
- Type: web form or phone contact
- Rate limiting: 5 attempts/minute (`throttle:5,1` middleware on route)

**Admin\ContactosController:**
- `index()` — message list (unread first)
- `marcarLeido(Contacto $contacto)` — mark as read
- `destroy($id)` — delete

## Public frontend

**Page:** `Contacto.jsx`
- Form fields: name, email, message
- Type selector: web form / phone contact
- AJAX submission with Inertia `useForm` (no reload)
- Visual validation with error states

## Admin frontend

**Page:** `Admin/Contactos.jsx`
- Inbox with message list
- Read/unread indicator
- "Mark as read" button
- Delete button

## Difficulties and solutions

**Problem:** Two similar contact tables.
**Context:** `contact_messages` was created first as a quick solution. When implementing the admin module with inbox, `contactos` was created with a `leido` field for read status tracking. Unifying both tables is a pending improvement.

## Key files

- `app/Models/ContactMessage.php`
- `app/Models/Contacto.php`
- `app/Http/Controllers/ContactController.php`
- `app/Http/Controllers/Admin/ContactosController.php`
- `resources/js/Pages/Contacto.jsx`
- `resources/js/Pages/Admin/Contactos.jsx`
- `database/migrations/2026_03_24_022027_create_contact_messages_table.php`
- `database/migrations/2026_04_20_000004_create_contactos_table.php`
