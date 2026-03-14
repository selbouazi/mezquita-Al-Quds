<footer class="bg-[#0F5132] text-white pt-16 pb-10 mt-20 border-t border-[#C9A227]/30 fade">

    <div class="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">

        {{-- LOGO + IDENTIDAD --}}
        <div class="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
            <img src="{{ asset('img/mezquitaAlquds_logo3.png') }}" class="h-20 brightness-0 invert" alt="Logo Mezquita">

            <div>
                <p class="text-lg font-semibold tracking-wide">{{ __('messages.footer.title') }}</p>
                <p class="text-sm text-[#C9A227]">{{ __('messages.footer.subtitle') }}</p>
            </div>

            <p class="text-sm text-white/80 max-w-xs">
                {{ __('messages.footer.description') }}
            </p>
        </div>

        {{-- ENLACES RÁPIDOS --}}
        <div class="flex flex-col items-center md:items-start text-center md:text-left space-y-3">
            <p class="text-lg font-semibold mb-2">{{ __('messages.footer.links_title') }}</p>

            <a href="/" class="text-white/80 hover:text-[#C9A227] transition">{{ __('messages.navbar.home') }}</a>
            <a href="/horarios" class="text-white/80 hover:text-[#C9A227] transition">{{ __('messages.navbar.prayers') }}</a>
            <a href="/ubicacion" class="text-white/80 hover:text-[#C9A227] transition">{{ __('messages.navbar.location') }}</a>
            <a href="/contacto" class="text-white/80 hover:text-[#C9A227] transition">{{ __('messages.navbar.contact') }}</a>
        </div>

        {{-- INFORMACIÓN DE CONTACTO --}}
        <div class="flex flex-col items-center md:items-start text-center md:text-left space-y-3">
            <p class="text-lg font-semibold mb-2">{{ __('messages.footer.contact_title') }}</p>

            <p class="text-white/80 text-sm">{{ __('messages.footer.address') }}</p>
            <p class="text-white/80 text-sm">{{ __('messages.footer.email') }}</p>

            <a href="https://maps.google.com"
               class="inline-block mt-3 bg-[#C9A227] text-[#0F5132] px-6 py-2 rounded-full font-semibold shadow-md hover:bg-[#b8921f] transition">
                {{ __('messages.footer.google_maps') }}
            </a>
        </div>

    </div>

    {{-- COPYRIGHT --}}
    <div class="mt-16 border-t border-white/10 pt-6 text-center text-white/60 text-sm">
        © {{ date('Y') }} Mezquita Al‑Quds — {{ __('messages.footer.rights') }}
    </div>

</footer>
