# Module: Prayer Times

The most complex module in the project. Manages the 6 daily prayer times (fajr, sunrise, dhuhr, asr, maghrib, isha) with real mosque data.

## What it does

- Displays today's prayer times on the homepage
- Monthly calendar with all days of the year
- 24h analog clock with prayer markers
- Next prayer countdown with remaining time
- Applies wait times between adhan (call) and iqama (start)
- Admin can configure wait times

## Database

3 tables:
- `horarios` — base times (365 real days)
- `tiempos_espera` — minutes between adhan and iqama per prayer
- `horarios_modificados` — exceptions (Ramadan, events)

## Difficulties and solutions

### 1) Real prayer time data

**Problem:** Initial times were hardcoded. We needed real mosque data.

**Solution:** Obtained the official Mawaqit PDF (the system used by the mosque) and generated a seeder with 365 days. The AlAdhan API was discarded because its times don't match the real ones.

### 2) Daylight saving time

**Problem:** The seeder had to respect March (spring forward) and October (fall back) time changes.

**Solution:** Manually generated the seeder with adjusted times for each period. The Mawaqit PDF already includes the time change.

### 3) Schedule caching

**Decision:** Schedules are cached because they only change once a year. Uses `Cache::remember()` with date-based keys for automatic invalidation.

### 4) 24h analog clock

**Problem:** Typical prayer clocks use 12h format, but we needed 24h to show all prayers correctly.

**Solution:** Map 24 hours to 360° (15° per hour). Each prayer marker is positioned at `hour * 15 + minutes * 0.25`. The day arc goes from sunrise to maghrib.

## Key files

- `database/migrations/2026_03_23_014431_create_horarios_table.php`
- `database/seeders/Horarios2026Seeder.php` (365 days)
- `database/seeders/TiemposEsperaSeeder.php`
- `app/Models/Horario.php`
- `app/Models/TiempoEspera.php`
- `app/Services/HorarioService.php`
- `app/Services/TiempoEsperaService.php`
- `app/Http/Controllers/HorarioController.php`
- `app/Http/Controllers/Admin/TiemposEsperaController.php`
- `resources/js/Components/PrayerClock.jsx`
- `resources/js/Components/PrayerHeader.jsx`
- `resources/js/Pages/Horarios.jsx`
- `resources/js/Pages/Home.jsx`
- `resources/js/Pages/Admin/Horarios.jsx`
