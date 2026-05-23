# Translation System

4 languages: Spanish, Catalan, English, Arabic.

## Language Files

All in `resources/js/lang/` as JavaScript modules:

| File | Language | Lines |
|------|----------|-------|
| `es.js` | Spanish | 481 |
| `ca.js` | Catalan | 469 |
| `en.js` | English | 504 |
| `ar.js` | Arabic | 502 |

### File structure

```js
export default {
    nav: {
        home: 'Inicio',
        horarios: 'Horarios',
        noticias: 'Noticias',
        // ...
    },
    home: {
        title: 'Welcome to Al-Quds Mosque',
        // ...
    },
    auth: {
        login: 'Sign In',
        register: 'Register',
        // ...
    },
    // ... sections for each page/module
}
```

### Available sections

| Section | Content |
|---------|---------|
| `nav` | Navigation and menus |
| `home` | Homepage |
| `horarios` | Prayer schedules |
| `noticias` | News |
| `contacto` | Contact form |
| `ubicacion` | Location |
| `imam` | Imam info |
| `auth` | Login and registration |
| `admin` | Admin panel (sidebar, actions) |
| `donativos` | Donations |
| `facturas` | Invoices |
| `clases` | Classes |
| `notifications` | Notifications |
| `footer` | Footer |
| `common` | Generic buttons, states |

## useTranslation Hook

See `47-layouts-hooks.md` for hook implementation.

## SetLocale Middleware

See `31-middleware.md` for the middleware that sets the locale.

## RTL (Right-to-Left)

Arabic requires RTL support. Implemented at two levels:

**1. HTML:** `app.blade.php` sets `dir="{{ app()->getLocale() === 'ar' ? 'rtl' : 'ltr' }}"`.

**2. Components:** `useTranslation` returns `isRTL` which components can use for style adjustments:
```jsx
<div className={isRTL ? 'rtl-support' : ''}>
```

## How to add a new language

1. Create `resources/js/lang/[code].js` following the existing structure
2. Translate all sections
3. Add the code to supported languages in `SetLocale.php`
4. Add the code to the `/lang/{lang}` route in `web.php`
5. Add the flag to the language selector in `Navbar.jsx`
