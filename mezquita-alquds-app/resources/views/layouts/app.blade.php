<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}" dir="{{ app()->getLocale() === 'ar' ? 'rtl' : 'ltr' }}">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Mezquita Al‑Quds')</title>

    {{-- Tipografías --}}
    <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Cairo:wght@400;600;700&display=swap"
        rel="stylesheet">

    {{-- Favicon --}}
    <link rel="icon" type="image/png" href="{{ asset('favicon.png') }}">

    {{-- Vite --}}
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])

    {{-- ESTILO MINIMALISTA --}}
    <style>
        body {
            font-family: {{ app()->getLocale() === 'ar' ? "'Cairo', sans-serif" : "'Inter', sans-serif" }};
            background: #faf7e8; /* fondo cálido suave */
            color: #1a1a1a;
            scroll-behavior: smooth;
        }

        .fade {
            opacity: 0;
            transform: translateY(25px);
            transition: opacity .8s ease, transform .8s ease;
        }

        .fade.show {
            opacity: 1;
            transform: translateY(0);
        }

        .navbar {
            transition: padding .3s ease, background .3s ease, box-shadow .3s ease;
        }

        .navbar.shrink {
            padding-top: .4rem !important;
            padding-bottom: .4rem !important;
            background: #ffffff;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }

        * {
            transition: all .25s ease;
        }
    </style>

    {{-- RTL para árabe --}}
    @if(app()->getLocale() === 'ar')
        <style>
            body {
                direction: rtl;
                text-align: right;
            }

            nav a {
                text-align: right;
            }
        </style>
    @endif
</head>

<body>

    @include('components.public.navbar')

    <main class="pt-24">
        @yield('content')
    </main>

    @include('components.public.footer')

    {{-- Scripts globales --}}
    <script>
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('show');
            });
        }, { threshold: 0.15 });

        document.querySelectorAll('.fade').forEach(el => observer.observe(el));

        const nav = document.querySelector('.navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) nav.classList.add('shrink');
            else nav.classList.remove('shrink');
        });
    </script>

    @stack('scripts')

</body>

</html>
