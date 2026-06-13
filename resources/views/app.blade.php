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