# React Components

5 reusable components.

## Navbar

**File:** `Components/Navbar.jsx`

Main navigation bar with:
- Mosque logo
- Links to public pages (Home, Schedules, News, Contact, Location, Imam)
- Language selector (4 flags: ES, CA, AR, EN)
- Notification bell (NotificationBell)
- User menu (login/logout)
- Responsive mobile hamburger menu

Visual effect: navbar shrinks on scroll (padding and shadow change).

## Footer

**File:** `Components/Footer.jsx`

Footer with:
- Logo
- Quick links
- Contact info
- "View in Google Maps" button

## PrayerHeader

**File:** `Components/PrayerHeader.jsx`

Countdown component showing:
- Next prayer of the day
- Remaining time (updated every second)
- Status: "X time until Y" or "It's time for Y" depending on the moment
- If prayer has iqama, shows both times

**Backend:** Receives data from `HandleInertiaRequests` (shared globally).

## PrayerClock

**File:** `Components/PrayerClock.jsx`

24-hour analog clock built with SVG:
- Clock circumference
- Markers for each prayer (fajr, sunrise, dhuhr, asr, maghrib, isha)
- Day arc (from sunrise to maghrib)
- Current time hand
- Hover tooltips for each prayer
- Floating second hand animation

**Technical complexity:** Positioning markers on a 24h clock (instead of 12h) requires mapping 24 hours to 360 degrees (15° per hour). Markers are positioned according to each prayer's time of day.

## NotificationBell

**File:** `Components/NotificationBell.jsx`

Bell with:
- Badge showing active notification count
- Dropdown with 5 most recent notifications
- "View all" link to `/notifications`
