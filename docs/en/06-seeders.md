# Seeders

4 seeders that populate the database with initial data.

## DatabaseSeeder.php

Master seeder that calls the other three:

```php
$this->call([
    AdminUserSeeder::class,
    TiemposEsperaSeeder::class,
    Horarios2026Seeder::class,
]);
```

Run: `php artisan db:seed`

## AdminUserSeeder

Creates the initial admin user:

- Email: `suli@gmail.com`
- Password: `11111111`
- Role: `admin`
- Name: `Suli`

**Decision:** A single initial admin. The imam can create more admins from the panel or directly in the DB.

## Horarios2026Seeder

The largest and most complex seeder. Contains all 365 days of 2026 with real prayer times from the mosque.

**Data source:** Official Mawaqit PDF (the system used by the mosque). The AlAdhan API was discarded because its times don't match the mosque's real schedules.

**Structure:** Each day has: date, hijri_date, fajr, sunrise, dhuhr, asr, maghrib, isha — all in `HH:MM` format.

**Includes:** March daylight saving time change (winter → summer).

**Run:** `php artisan db:seed --class=Horarios2026Seeder`
**Result:** 365 records inserted.

## TiemposEsperaSeeder

Configures the waiting minutes between adhan (call to prayer) and iqama (prayer start):

| Prayer | Minutes |
|--------|---------|
| fajr | 20 |
| sunrise | 0 |
| dhuhr | 10 |
| asr | 10 |
| maghrib | 10 |
| isha | 10 |

**Decision:** One row per prayer instead of a "global" field to allow individual adjustments. `sunrise` has 0 minutes because it's not a prayer with iqama.
