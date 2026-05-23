# Services

2 services encapsulating reusable business logic.

## HorarioService

**File:** `app/Services/HorarioService.php`

**Purpose:** Centralize all prayer schedule logic.

### Methods

| Method | Description |
|--------|-------------|
| `getTodaySchedule()` | Returns today's schedule with applied wait times |
| `getMonthlySchedule($year, $month)` | Returns all days of a month with schedules |
| `getPrayerTimesForDay($date)` | Base times for a specific date |
| `applyWaitTimes($prayerTimes)` | Applies wait minutes to each prayer |
| `formatTime($time)` | Formats HH:MM time |

### Cache

Schedules are cached with `Cache::remember()` to avoid repeated DB queries. Cache key includes the date for automatic invalidation.

**Technical decision:** Caching is used because prayer times only change once a year (with the seeder). Querying the DB on every request makes no sense.

## TiempoEsperaService

**File:** `app/Services/TiempoEsperaService.php`

**Purpose:** Manage wait times between adhan and iqama.

### Methods

| Method | Description |
|--------|-------------|
| `getAll()` | Returns all wait times as key→value array |
| `getForPrayer($rezo)` | Wait minutes for a specific prayer |

### Cache

Also uses `Cache::remember()`. Invalidated when the admin modifies times from the panel.

### Usage

`TiempoEsperaService` is injected into HorarioService to calculate final times (adhan + wait = iqama). It's also shared globally via `HandleInertiaRequests` so the frontend can display both adhan and iqama.
