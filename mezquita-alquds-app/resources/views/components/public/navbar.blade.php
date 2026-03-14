<nav class="navbar fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-[#C9A227]/20 py-5">
    <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:justify-between md:items-center">

        {{-- LOGO + HAMBURGUESA (POSICIÓN DINÁMICA EN MÓVIL) --}}
        <div class="flex items-center w-full md:w-auto">

            {{-- LOGO (siempre a la izquierda visualmente) --}}
            <a href="/" class="flex items-center gap-3 flex-grow">
                <img src="{{ asset('img/mezquitaAlquds_logo2.png') }}" class="h-12" alt="Logo Mezquita">

                <div class="leading-tight {{ app()->getLocale() === 'ar' ? 'text-right' : '' }}">
                    <p class="text-xs text-gray-500">{{ __('messages.navbar.subtitle') }}</p>
                    <p class="text-xl font-bold text-[#0F5132] tracking-wide">{{ __('messages.navbar.title') }}</p>
                </div>
            </a>

            {{-- HAMBURGUESA (se mueve según idioma) --}}
            <button id="menuBtn" class="md:hidden text-[#0F5132] text-3xl transition active:scale-90"
                style="{{ app()->getLocale() === 'ar' ? 'margin-right:auto;' : 'margin-left:auto;' }}">
                ☰
            </button>
        </div>

        {{-- SELECTOR DE IDIOMA (MÓVIL) --}}
        <div class="relative mt-4 md:hidden flex"
            style="justify-content: {{ app()->getLocale() === 'ar' ? 'flex-start' : 'flex-end' }};">

            {{-- BOTÓN --}}
            <button id="langBtnMobile"
                class="flex items-center gap-2 px-3 py-2 border rounded-lg bg-white shadow-sm hover:bg-gray-50 transition active:scale-95"
                style="{{ app()->getLocale() === 'ar' ? 'margin-right:auto;' : 'margin-left:auto;' }}">

                <img src="{{ asset('img/lang/' . app()->getLocale() . '.png') }}" class="h-5 w-5">
                <span class="text-sm font-medium uppercase">{{ app()->getLocale() }}</span>
            </button>

            {{-- MENÚ DESPLEGABLE --}}
            <div id="langMenuMobile"
                class="hidden absolute mt-2 w-40 bg-white border rounded-lg shadow-lg py-2 animate-fade"
                style="{{ app()->getLocale() === 'ar' ? 'left:0;' : 'right:0;' }}">

                <a href="{{ route('lang.switch', 'es') }}" class="flex items-center gap-2 px-3 py-2 hover:bg-gray-100">
                    <img src="{{ asset('img/lang/es.png') }}" class="h-5 w-5"> Español
                </a>
                <a href="{{ route('lang.switch', 'ca') }}" class="flex items-center gap-2 px-3 py-2 hover:bg-gray-100">
                    <img src="{{ asset('img/lang/ca.png') }}" class="h-5 w-5"> Català
                </a>
                <a href="{{ route('lang.switch', 'ar') }}" class="flex items-center gap-2 px-3 py-2 hover:bg-gray-100">
                    <img src="{{ asset('img/lang/ar.png') }}" class="h-5 w-5"> العربية
                </a>
            </div>
        </div>

        {{-- MENU DESKTOP --}}
        <div class="hidden md:flex items-center space-x-10 text-sm font-medium">

            <a href="/" class="hover:text-[#C9A227] transition"> {{ __('messages.navbar.home') }} </a>
            <a href="/horarios" class="hover:text-[#C9A227] transition"> {{ __('messages.navbar.prayers') }} </a>
            <a href="/ubicacion" class="hover:text-[#C9A227] transition"> {{ __('messages.navbar.location') }} </a>
            <a href="/contacto" class="hover:text-[#C9A227] transition"> {{ __('messages.navbar.contact') }} </a>

            {{-- SELECTOR IDIOMA DESKTOP --}}
            <div class="relative">
                <button id="langBtn"
                    class="flex items-center gap-2 px-3 py-2 border rounded-lg bg-white shadow-sm hover:bg-gray-50 transition active:scale-95">
                    <img src="{{ asset('img/lang/' . app()->getLocale() . '.png') }}" class="h-5 w-5">
                    <span class="text-sm font-medium uppercase">{{ app()->getLocale() }}</span>
                </button>

                <div id="langMenu"
                    class="hidden absolute mt-2 w-40 bg-white border rounded-lg shadow-lg py-2 animate-fade"
                    style="right:0;">

                    <a href="{{ route('lang.switch', 'es') }}"
                        class="flex items-center gap-2 px-3 py-2 hover:bg-gray-100">
                        <img src="{{ asset('img/lang/es.png') }}" class="h-5 w-5"> Español
                    </a>
                    <a href="{{ route('lang.switch', 'ca') }}"
                        class="flex items-center gap-2 px-3 py-2 hover:bg-gray-100">
                        <img src="{{ asset('img/lang/ca.png') }}" class="h-5 w-5"> Català
                    </a>
                    <a href="{{ route('lang.switch', 'ar') }}"
                        class="flex items-center gap-2 px-3 py-2 hover:bg-gray-100">
                        <img src="{{ asset('img/lang/ar.png') }}" class="h-5 w-5"> العربية
                    </a>
                </div>
            </div>
        </div>

    </div>

    {{-- MENU MÓVIL --}}
    <div id="mobileMenu"
        class="hidden bg-white/95 backdrop-blur-xl border-t border-[#C9A227]/20 md:hidden px-6 py-4 space-y-3 text-sm animate-slide">

        <a href="/" class="block text-gray-700 hover:text-[#C9A227] transition">{{ __('messages.navbar.home') }}</a>
        <a href="/horarios"
            class="block text-gray-700 hover:text-[#C9A227] transition">{{ __('messages.navbar.prayers') }}</a>
        <a href="/ubicacion"
            class="block text-gray-700 hover:text-[#C9A227] transition">{{ __('messages.navbar.location') }}</a>
        <a href="/contacto"
            class="block text-gray-700 hover:text-[#C9A227] transition">{{ __('messages.navbar.contact') }}</a>
    </div>

    <style>
        .animate-fade {
            animation: fadeIn .25s ease-out;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(5px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .animate-slide {
            animation: slideDown .25s ease-out;
        }

        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    </style>

    <script>
        document.getElementById('menuBtn').onclick = () => {
            document.getElementById('mobileMenu').classList.toggle('hidden');
        };

        document.getElementById('langBtn').onclick = () => {
            document.getElementById('langMenu').classList.toggle('hidden');
        };

        document.getElementById('langBtnMobile').onclick = () => {
            document.getElementById('langMenuMobile').classList.toggle('hidden');
        };
    </script>
</nav>