# Layouts and Hooks

## MainLayout

**File:** `Layouts/MainLayout.jsx`

Wrapper layout for all public pages. Provides:
- `<html>` with dynamic `lang` and `dir` attributes
  - `dir="rtl"` when language is Arabic
  - `dir="ltr"` for everything else
- Navbar at the top
- Footer at the bottom
- Fade-in animations on page load (IntersectionObserver)
- Main content with consistent spacing

## AdminLayout

**File:** `Layouts/AdminLayout.jsx`

Layout for all admin panel pages. Provides:

**Sidebar navigation** with links to 10 modules:
- Dashboard, Donations, Invoices, Classes, News, Notifications, Contacts, Location, Imam, Codes, Wait Times

Each link has an SVG icon and name. The active module is visually highlighted.

**Features:**
- Language selector in header
- Responsive menu: on mobile the sidebar hides and opens via hamburger button (overlay)
- Authenticated user indicator (name and email)
- Logout button
- Main content container that adjusts based on sidebar visibility

**Active state:** Determined by comparing current URL with each module's route using Inertia's `usePage().url`.

## useTranslation

**File:** `hooks/useTranslation.js`

Custom hook for the multi-language system.

```js
function useTranslation() {
    const { locale } = usePage().props;
    const translations = {
        es: langEs,
        ca: langCa,
        en: langEn,
        ar: langAr,
    };
    const t = (section, key) => translations[locale]?.[section]?.[key] ?? key;
    const isRTL = locale === 'ar';
    return { t, locale, isRTL };
}
```

**Usage in components:**
```jsx
const { t, isRTL } = useTranslation();
<p>{t('nav', 'home')}</p>  // "Inicio" in Spanish, "Home" in English, etc.
<div dir={isRTL ? 'rtl' : 'ltr'}>
```

**How it works:**
1. Locale comes from `HandleInertiaRequests` (shared globally)
2. `t(section, key)` looks up `lang/[locale].[section].[key]`
3. If no translation found, returns the key as fallback
4. `isRTL` allows components to adjust layout for Arabic
