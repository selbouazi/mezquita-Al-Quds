<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Mezquita Al‑Quds')</title>

    {{-- Carga de tipografías principales del proyecto --}}
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">

    {{-- Favicoin personalizado --}}
    <link rel="icon" type="image/png" sizes="256x256" href="{{ asset('favicon.png') }}">



    {{-- Archivos compilados con Vite (CSS + JS) --}}
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])

    <style>
        /* Fuente general del sitio */
        body { font-family: 'Inter', sans-serif; }

        /* Fuente árabe para textos específicos */
        .arabic { font-family: 'Cairo', sans-serif; }
    </style>
</head>

<body class="bg-white text-gray-800">

    {{-- Barra de navegación fija en la parte superior --}}
    @include('components.public.navbar')

    {{-- Contenido principal. Se deja un padding arriba para no tapar nada con el navbar --}}
    <main class="min-h-screen pt-24">
        @yield('content')
    </main>

    {{-- Pie de página común para todas las páginas --}}
    @include('components.public.footer')

</body>
</html>
