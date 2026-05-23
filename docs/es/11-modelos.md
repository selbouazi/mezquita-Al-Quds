# Modelos

13 modelos Eloquent que representan todas las entidades del proyecto.

## User

**Archivo:** `app/Models/User.php`
**Tabla:** `users`

Métodos clave:
- `isAdmin()` — devuelve `$this->rol === 'admin'`
- `isUser()` — devuelve `$this->rol === 'user'`

**Campos:** name, email, password, rol (enum: admin, user), two_factor_secret, two_factor_recovery_codes, two_factor_confirmed_at

**Decisión:** El rol es un enum nativo de MySQL (no string) para integridad a nivel BD.

## Horario

**Archivo:** `app/Models/Horario.php`
**Tabla:** `horarios`

Almacena los horarios de rezo diarios. El campo `fecha` tiene cast a `date`.

**Scopes:** Ninguno personalizado.

## TiempoEspera

**Archivo:** `app/Models/TiempoEspera.php`
**Tabla:** `tiempos_espera`

Minutos de espera entre adhan e iqama por rezo.

## Clase

**Archivo:** `app/Models/Clase.php`
**Tabla:** `clases`

**Campos:** titulo, descripcion, horarios, nivel, profesor, requisitos, activo (boolean cast)

## ContactMessage

**Archivo:** `app/Models/ContactMessage.php`
**Tabla:** `contact_messages`

Mensajes del formulario de contacto (primera implementación).

## Contacto

**Archivo:** `app/Models/Contacto.php`
**Tabla:** `contactos`

Mensajes de contacto con bandeja admin (segunda implementación).

**Scopes:**
- `scopeNoLeidos()` — mensajes no leídos

## Donativo

**Archivo:** `app/Models/Donativo.php`
**Tabla:** `donativos`

**Campos:** nombre_arabe, nombre, cantidad, pagado (boolean), ano, notas

**Scopes:**
- `scopeByYear($ano)` — filtrar por año
- `scopePaid()` — donativos pagados
- `scopePending()` — donativos pendientes

## Factura

**Archivo:** `app/Models/Factura.php`
**Tabla:** `facturas`

**Campos:** titulo, fecha, archivo_pdf, notas

**Accesores:**
- `getArchivoUrlAttribute()` — devuelve la URL completa del PDF almacenado

## ImamSetting

**Archivo:** `app/Models/ImamSetting.php`
**Tabla:** `imam_settings`

Almacena nombre, descripción y foto del imam. Funciona como singleton (una sola fila).

**Accesores:**
- `foto` — devuelve la URL completa de la imagen

## Noticia

**Archivo:** `app/Models/Noticia.php`
**Tabla:** `noticias`

**Campos:** titulo, contenido, imagen, fecha_publicacion, publicado (boolean)

**Scopes:**
- `scopePublicado()` — solo noticias publicadas

**Accesores:**
- `imagen` — devuelve la URL completa de la imagen

## Notification (sistema)

**Archivo:** `app/Models/Notification.php`
**Tabla:** `notifications`

**Campos:** titulo, mensaje, prioridad (string), activa (boolean), fecha_publicacion, fecha_expiracion

**Scopes:**
- `scopeActivas()` — notificaciones activas y no expiradas
- `scopeOrdenadas()` — ordenadas por prioridad y fecha

## Ubicacion

**Archivo:** `app/Models/Ubicacion.php`
**Tabla:** `ubicaciones`

**Campos:** direccion, latitud, longitud, telefono, email, whatsapp

## ActivationCode

**Archivo:** `app/Models/ActivationCode.php`
**Tabla:** `activation_codes`

**Campos:** codigo, activo (boolean), expira_en (datetime)

## Resumen de características por modelo

| Modelo | Scopes | Accesores | Casts boolean |
|--------|--------|-----------|---------------|
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
