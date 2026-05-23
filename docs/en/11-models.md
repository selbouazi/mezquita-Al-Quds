# Models

13 Eloquent models representing all project entities.

## User

**File:** `app/Models/User.php`
**Table:** `users`

Key methods:
- `isAdmin()` — returns `$this->rol === 'admin'`
- `isUser()` — returns `$this->rol === 'user'`

**Fields:** name, email, password, rol (enum: admin, user), two_factor_secret, two_factor_recovery_codes, two_factor_confirmed_at

**Decision:** Role is a native MySQL enum (not string) for DB-level integrity.

## Horario

**File:** `app/Models/Horario.php`
**Table:** `horarios`

Stores daily prayer times. `fecha` is cast to `date`.

## TiempoEspera

**File:** `app/Models/TiempoEspera.php`
**Table:** `tiempos_espera`

Wait minutes between adhan and iqama per prayer.

## Clase

**File:** `app/Models/Clase.php`
**Table:** `clases`

**Fields:** titulo, descripcion, horarios, nivel, profesor, requisitos, activo (boolean cast)

## ContactMessage

**File:** `app/Models/ContactMessage.php`
**Table:** `contact_messages`

Contact form messages (first implementation).

## Contacto

**File:** `app/Models/Contacto.php`
**Table:** `contactos`

Contact form messages with admin inbox (second implementation).

**Scopes:**
- `scopeNoLeidos()` — unread messages

## Donativo

**File:** `app/Models/Donativo.php`
**Table:** `donativos`

**Fields:** nombre_arabe, nombre, cantidad, pagado (boolean), ano, notas

**Scopes:**
- `scopeByYear($ano)` — filter by year
- `scopePaid()` — paid donations
- `scopePending()` — pending donations

## Factura

**File:** `app/Models/Factura.php`
**Table:** `facturas`

**Fields:** titulo, fecha, archivo_pdf, notas

**Accessors:**
- `getArchivoUrlAttribute()` — returns full PDF URL

## ImamSetting

**File:** `app/Models/ImamSetting.php`
**Table:** `imam_settings`

Stores imam name, description and photo. Singleton (single row).

**Accessors:**
- `foto` — returns full image URL

## Noticia

**File:** `app/Models/Noticia.php`
**Table:** `noticias`

**Fields:** titulo, contenido, imagen, fecha_publicacion, publicado (boolean)

**Scopes:**
- `scopePublicado()` — only published news

**Accessors:**
- `imagen` — returns full image URL

## Notification (system)

**File:** `app/Models/Notification.php`
**Table:** `notifications`

**Fields:** titulo, mensaje, prioridad (string), activa (boolean), fecha_publicacion, fecha_expiracion

**Scopes:**
- `scopeActivas()` — active and not expired
- `scopeOrdenadas()` — ordered by priority and date

## Ubicacion

**File:** `app/Models/Ubicacion.php`
**Table:** `ubicaciones`

**Fields:** direccion, latitud, longitud, telefono, email, whatsapp

## ActivationCode

**File:** `app/Models/ActivationCode.php`
**Table:** `activation_codes`

**Fields:** codigo, activo (boolean), expira_en (datetime)

## Model features summary

| Model | Scopes | Accessors | Boolean casts |
|-------|--------|-----------|---------------|
| User | - | - | - |
| Horario | - | - | fecha (date) |
| TiempoEspera | - | - | - |
| Clase | - | - | activo |
| ContactMessage | - | - | - |
| Contacto | noLeidos | - | leido |
| Donativo | byYear, paid, pending | - | pagado |
| Factura | - | archivoUrl | - |
| ImamSetting | - | foto | - |
| Noticia | publicado | imagen | publicado |
| Notification | activas, ordenadas | - | activa |
| Ubicacion | - | - | - |
| ActivationCode | - | - | activo |
