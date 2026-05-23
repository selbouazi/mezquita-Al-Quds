# Public Pages

7 React pages accessible without authentication.

## Home (`/`)

**File:** `Pages/Home.jsx`

Main page with:
- PrayerHeader — next prayer countdown
- PrayerClock — 24h analog clock with markers
- Full daily schedule (fajr, sunrise, dhuhr, asr, maghrib, isha)
- Active notifications highlight
- Responsive design with fade-in animations

## Horarios (`/horarios`)

**File:** `Pages/Horarios.jsx`

Monthly prayer calendar. Accepts `?year=YYYY&month=M` params.

Shows a table with all days of the month and their 6 prayer times. Month navigation with arrows.

## News (`/noticias`)

**File:** `Pages/Noticias.jsx`

Paginated published news (6 per page). Each card shows title, featured image, excerpt and publication date.

## Contact (`/contacto`)

**File:** `Pages/Contacto.jsx`

Contact form with:
- Fields: name, email, message
- Type selector: web form / phone contact
- AJAX submission via Inertia `useForm`
- Frontend and backend validation
- Success/error messages without page reload

## Location (`/ubicacion`)

**File:** `Pages/Ubicacion.jsx`

Mosque data:
- Address
- Phone, email, WhatsApp
- "View in Google Maps" button
- Imam info

## Imam (`/imam`)

**File:** `Pages/Imam.jsx`

Public page with imam info: name, photo, description. Data loaded from `imam_settings` table.

## Notifications (`/notifications`)

**File:** `Pages/Public/Notifications.jsx`

Active notifications list, ordered by priority. Shows title, message, publication date.
