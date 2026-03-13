<nav class="w-full bg-white/90 backdrop-blur border-b border-[#C9A227]/20 fixed top-0 left-0 z-50 shadow-sm">
    {{-- Barra de navegación fija con fondo semitransparente y efecto blur para darle un toque moderno --}}
    <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {{-- LOGO + NOMBRE --}}
        <div class="flex items-center space-x-3">
            {{-- Logo principal de la mezquita --}}
            <img src="/img/mezquitaAlquds_logo2.png" class="h-12" alt="Logo Mezquita">

            {{-- Nombre y subtítulo alineados verticalmente --}}
            <div class="leading-tight">
                <p class="text-xs text-gray-500">Comunitat musulmana del Vendrell</p>
                <p class="text-xl font-bold text-[#0F5132] tracking-wide">Mezquita Al‑Quds</p>
            </div>
        </div>

        {{-- MENU DESKTOP --}}
        <div class="hidden md:flex items-center space-x-10 text-sm font-medium">
            {{-- Enlaces principales del sitio, visibles solo en pantallas grandes --}}
            <a href="/" class="text-gray-700 hover:text-[#C9A227] transition">Inicio</a>
            <a href="/horarios" class="text-gray-700 hover:text-[#C9A227] transition">Horarios</a>
            <a href="/noticias" class="text-gray-700 hover:text-[#C9A227] transition">Noticias</a>
            <a href="/ubicacion" class="text-gray-700 hover:text-[#C9A227] transition">Cómo llegar</a>
            <a href="/contacto" class="text-gray-700 hover:text-[#C9A227] transition">Contacto</a>
        </div>

        {{-- HAMBURGUESA (solo móvil) --}}
        <button id="menuBtn" class="md:hidden text-[#0F5132] text-3xl">
            ☰
        </button>
    </div>

    {{-- MENU MÓVIL --}}
    <div id="mobileMenu" class="hidden bg-white border-t border-gray-100 md:hidden px-6 py-4 space-y-3">
        {{-- Versión móvil del menú, aparece al pulsar el botón --}}
        <a href="/" class="block text-gray-700">Inicio</a>
        <a href="/horarios" class="block text-gray-700">Horarios</a>
        <a href="/noticias" class="block text-gray-700">Noticias</a>
        <a href="/ubicacion" class="block text-gray-700">Cómo llegar</a>
        <a href="/contacto" class="block text-gray-700">Contacto</a>
    </div>

    <script>
        // Alterna la visibilidad del menú móvil al pulsar el botón hamburguesa
        document.getElementById('menuBtn').onclick = () => {
            document.getElementById('mobileMenu').classList.toggle('hidden');
        };
    </script>
</nav>
