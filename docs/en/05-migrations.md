# Migrations

18 migrations that define the complete database schema.

## System Tables (Laravel)

| # | Migration | Tables | Purpose |
|---|-----------|--------|---------|
| 1 | `0001_01_01_000000_create_users_table` | `users`, `password_reset_tokens`, `sessions` | Users, password resets, sessions |
| 2 | `0001_01_01_000001_create_cache_table` | `cache`, `cache_locks` | Cache system |
| 3 | `0001_01_01_000002_create_jobs_table` | `jobs`, `job_batches`, `failed_jobs` | Job queue |

## Prayer Schedule Tables

| # | Migration | Table | Key fields |
|---|-----------|-------|------------|
| 4 | `2026_03_23_014431_create_horarios_table` | `horarios` | fecha, fecha_hijri, fajr, sunrise, dhuhr, asr, maghrib, isha |
| 5 | `2026_03_23_014432_create_tiempos_espera_table` | `tiempos_espera` | rezo (string), minutos |
| 6 | `2026_03_23_014444_create_horarios_modificados_table` | `horarios_modificados` | fecha, rezo, hora, duracion |

**Decision:** `rezo` is `string` instead of `enum` for flexibility — allows adding new prayers without schema changes. `sunrise` is treated as just another prayer.

## Contact Tables

| # | Migration | Table | Key fields |
|---|-----------|-------|------------|
| 7 | `2026_03_24_022027_create_contact_messages_table` | `contact_messages` | name, email, message, type (web/phone), phone, ip_address, user_agent |
| 16 | `2026_04_20_000004_create_contactos_table` | `contactos` | nombre, email, telefono, mensaje, tipo, leido |

**Note:** Two contact tables exist. `contact_messages` was the first implementation. `contactos` was created later as part of the admin module with an inbox.

## Auth Tables

| # | Migration | Table | Key fields |
|---|-----------|-------|------------|
| 8 | `2026_03_24_023710_add_two_factor_columns_to_users_table` | `users` (alter) | two_factor_secret, two_factor_recovery_codes, two_factor_confirmed_at |
| 12 | `2026_04_13_000004_add_rol_to_users_table` | `users` (alter) | rol: enum(admin, user) |

## Admin Module Tables

| # | Migration | Table | Key fields |
|---|-----------|-------|------------|
| 9 | `2026_04_13_000001_create_notifications_table` | `notifications` | titulo, mensaje, prioridad, activa, fecha_publicacion, fecha_expiracion |
| 10 | `2026_04_13_000002_create_activation_codes_table` | `activation_codes` | codigo, activo, expira_en |
| 11 | `2026_04_13_000003_create_imam_settings_table` | `imam_settings` | nombre, descripcion, foto |
| 13 | `2026_04_20_000001_create_donativos_table` | `donativos` | nombre_arabe, nombre, cantidad, pagado, ano, notas |
| 14 | `2026_04_20_000002_create_facturas_table` | `facturas` | titulo, fecha, archivo_pdf, notas |
| 15 | `2026_04_20_000003_create_clases_table` | `clases` | titulo, descripcion, horarios, nivel, profesor, requisitos, activo |
| 17 | `2026_04_20_000005_create_noticias_table` | `noticias` | titulo, contenido, imagen, fecha_publicacion, publicado |
| 18 | `2026_04_20_000006_create_ubicaciones_table` | `ubicaciones` | direccion, latitud, longitud, telefono, email, whatsapp |

## Key Relationships

```
User (1) ──── (N) Donativo          (no direct user association with donations)
User (1) ──── (N) Factura           (no direct user association with invoices)
Horario (1) ─ (N) HorariosModificados (modifications by date/prayer)
```

Most tables are independent (no foreign keys), managed exclusively from the admin panel. Only `users` has role and two-factor relationships.
