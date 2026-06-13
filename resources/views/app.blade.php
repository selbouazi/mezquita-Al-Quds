<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" dir="{{ app()->getLocale() === 'ar' ? 'rtl' : 'ltr' }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Mezquita Al‑Quds en El Vendrell, Tarragona. Horarios de oración, clases de árabe y Corán, comunidad musulmana abierta a todos.">
    <meta property="og:site_name" content="Mezquita Al‑Quds">
    <meta name="robots" content="index, follow">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Cairo:wght@400;600;700&display=swap"
        rel="stylesheet" media="print" onload="this.media='all'">
    <link rel="icon" type="image/png" href="{{ asset('favicon.png') }}">

    <link rel="alternate" hreflang="es" href="{{ url()->current() }}" />
    <link rel="alternate" hreflang="ca" href="{{ url()->current() }}" />
    <link rel="alternate" hreflang="en" href="{{ url()->current() }}" />
    <link rel="alternate" hreflang="ar" href="{{ url()->current() }}" />

    <script type="application/ld+json">
{
    "@@context": "https://schema.org",
    "@@type": "Mosque",
    "name": "Mezquita Al-Quds",
    "alternateName": ["Mesquita Al-Quds", "Al-Quds Mosque", "مسجد القدس"],
    "description": "Comunidad musulmana de El Vendrell. Horarios de oraci\u00f3n, clases de \u00e1rabe y Cor\u00e1n.",
    "address": {
        "@@type": "PostalAddress",
        "streetAddress": "El Vendrell",
        "addressLocality": "Tarragona",
        "addressCountry": "ES"
    },
    "telephone": "+34 123 456 789",
    "email": "info@mezquita-alquds.cat",
    "url": "https://mezquita-alquds.cat",
    "sameAs": ["https://www.facebook.com/mezquitaalquds"],
    "openingHoursSpecification": [
        {"@@type": "OpeningHoursSpecification", "dayOfWeek": "Monday", "opens": "09:00", "closes": "21:00"},
        {"@@type": "OpeningHoursSpecification", "dayOfWeek": "Tuesday", "opens": "09:00", "closes": "21:00"},
        {"@@type": "OpeningHoursSpecification", "dayOfWeek": "Wednesday", "opens": "09:00", "closes": "21:00"},
        {"@@type": "OpeningHoursSpecification", "dayOfWeek": "Thursday", "opens": "09:00", "closes": "21:00"},
        {"@@type": "OpeningHoursSpecification", "dayOfWeek": "Friday", "opens": "09:00", "closes": "21:00"},
        {"@@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "10:00", "closes": "14:00"},
        {"@@type": "OpeningHoursSpecification", "dayOfWeek": "Sunday", "opens": "10:00", "closes": "14:00"}
    ]
}
    </script>
    @if(app()->environment('local'))
        <script type="module">
            import RefreshRuntime from 'http://localhost:5173/@react-refresh'
            RefreshRuntime.injectIntoGlobalHook(window)
            window.$RefreshReg$ = () => { }
            window.$RefreshSig$ = () => (type) => type
            window.__vite_plugin_react_preamble_installed__ = true
        </script>
    @endif
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    @inertiaHead
</head>

<body>
    <a href="#main-content" class="skip-link">
        Saltar al contenido principal
    </a>
    @inertia
</body>

</html>