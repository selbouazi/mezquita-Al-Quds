# Seeders

4 seeders que pueblan la base de datos con datos iniciales.

## DatabaseSeeder.php

Seeder maestro que llama a los otros tres:

```php
$this->call([
    AdminUserSeeder::class,
    TiemposEsperaSeeder::class,
    Horarios2026Seeder::class,
]);
```

Ejecución: `php artisan db:seed`

## AdminUserSeeder

Crea el usuario administrador inicial:

- Email: `suli@gmail.com`
- Password: definido por `ADMIN_PASSWORD` en `.env` (fallback: `12345678`)
- Rol: `admin`
- Name: `Suli`

**Decisión:** Un solo admin inicial. El imam puede crear más admins desde el panel o directamente en BD.  
**Cambio:** La contraseña ya no está hardcodeada. Se configura mediante variable de entorno `ADMIN_PASSWORD`.

## Horarios2026Seeder

El seeder más grande y complejo. Contiene los 365 días del año 2026 con los horarios de rezo reales de la mezquita.

**Origen de los datos:** PDF oficial de Mawaqit (sistema que usa la mezquita). Se descartó la API de AlAdhan porque sus horarios no coinciden con los reales de la mezquita.

**Estructura:** Cada día tiene: fecha, fecha_hijri, fajr, sunrise, dhuhr, asr, maghrib, isha — todos en formato `HH:MM`.

**Incluye:** Cambio de horario de marzo (invierno → verano).

**Ejecución:** `php artisan db:seed --class=Horarios2026Seeder`
**Resultado:** 365 registros insertados.

## TiemposEsperaSeeder

Configura los minutos de espera entre el adhan (llamada a la oración) y la iqama (inicio de la oración):

| Rezo | Minutos |
|------|---------|
| fajr | 20 |
| sunrise | 0 |
| dhuhr | 10 |
| asr | 10 |
| maghrib | 10 |
| isha | 10 |

**Decisión:** Se usó una fila por rezo en lugar de un campo "global" para permitir ajustes individuales. `sunrise` tiene 0 minutos porque no es un rezo con iqama.
