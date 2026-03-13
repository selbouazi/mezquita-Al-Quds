@extends('layouts.app')

@section('title', 'Inicio')

@section('content')

{{-- Barra superior para avisos rápidos. De momento solo muestra un mensaje genérico --}}
<section class="bg-gradient-to-r from-[#0F5132] to-[#198754] text-white py-3">
    <div class="max-w-7xl mx-auto px-6">
        <p class="text-sm font-medium">No hay notificaciones por ahora.</p>
    </div>
</section>

{{-- HERO PRINCIPAL DE LA PÁGINA --}}
<section class="relative pt-16 pb-10 bg-white">
    {{-- Fondo decorativo con un degradado radial muy suave --}}
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_#C9A22720,_transparent_70%)]"></div>

    <div class="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        {{-- Columna de texto principal del hero --}}
        <div>
            <h1 class="text-4xl sm:text-5xl font-bold text-[#0F5132] leading-tight mb-4">
                Mezquita <span class="text-[#C9A227]">Al‑Quds</span><br>
                del Vendrell
            </h1>

            {{-- Descripción corta para contextualizar la web --}}
            <p class="text-gray-600 text-lg mb-8">
                Un espacio de espiritualidad, comunidad y conocimiento para todos.
            </p>

            {{-- Botones de acción principales --}}
            <div class="flex flex-wrap gap-3">
                <a href="/horarios"
                   class="inline-block bg-[#0F5132] text-white px-7 py-3 rounded-full font-semibold hover:bg-[#0c3f27] transition shadow-md">
                    Ver horarios de rezo
                </a>
                <a href="/contacto"
                   class="inline-block border border-[#C9A227] text-[#C9A227] px-7 py-3 rounded-full font-semibold hover:bg-[#C9A227]/5 transition">
                    Contactar
                </a>
            </div>
        </div>

        {{-- Tarjeta lateral con el logo de la mezquita --}}
        <div class="flex justify-center">
            <div class="bg-white border border-[#C9A227]/40 shadow-xl rounded-3xl p-10 w-full max-w-sm text-center">
                <img src="{{ asset('img/mezquitaAlquds_logo.png') }}" class="h-32 mx-auto mb-4">
                <p class="arabic text-lg text-[#0F5132] font-semibold mb-1">مسجد القدس</p>
                <p class="text-xs text-gray-500">Comunitat musulmana del Vendrell</p>
            </div>
        </div>

    </div>
</section>

{{-- SECCIÓN DEL RELOJ --}}
<section class="bg-[#F8F8F8] py-12">
    <div class="max-w-7xl mx-auto px-6 flex flex-col items-center">

        {{-- Texto dinámico del próximo rezo (lo actualiza JS cada segundo) --}}
        <div id="nextPrayerBanner"
             class="text-[17px] font-semibold text-[#C9A227] tracking-wide
                    bg-[#0F5132]/10 px-5 py-3 rounded-full shadow-sm border border-[#C9A227]/30
                    w-fit mb-6">
            <!-- JS rellena: "Maghrib en 01:22" -->
        </div>

        {{-- Reloj completo (componente separado) --}}
        @include('components.public.reloj-rezo')

    </div>
</section>

{{-- HORARIOS DEL DÍA (versión estática por ahora) --}}
<section class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-6">

        {{-- Cabecera de la sección --}}
        <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
                <h2 class="text-2xl sm:text-3xl font-bold text-[#0F5132]">Horarios de hoy</h2>
                <p class="text-gray-600 text-sm sm:text-base">Próximamente serán dinámicos desde el panel del imam.</p>
            </div>

            {{-- Tiempo restante hasta el próximo rezo --}}
            <div class="text-sm text-gray-600">
                Próximo rezo en: <span class="font-semibold text-[#198754]" id="nextPrayerLabel">—:—</span>
            </div>
        </div>

        {{-- Tarjetas de cada salah --}}
        <div class="grid grid-cols-2 md:grid-cols-5 gap-6">
            @foreach (['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as $salah)
                <div class="p-6 bg-[#F8F8F8] rounded-2xl shadow-sm border border-[#C9A227]/20 text-center">
                    <h3 class="text-lg font-semibold text-[#0F5132]">{{ $salah }}</h3>
                    <p class="text-gray-500 mt-2 text-sm">Hora: próximamente</p>
                </div>
            @endforeach
        </div>

        {{-- Enlace a la página completa de horarios --}}
        <div class="text-center mt-10">
            <a href="/horarios" class="text-[#C9A227] font-semibold hover:underline">
                Ver horarios completos →
            </a>
        </div>
    </div>
</section>

@endsection

{{-- SCRIPT PARA EL TEXTO "Maghrib en 01:22" --}}
<script>
    (function () {
        // Horarios usados para calcular el próximo rezo
        const prayerTimes = {
            Fajr: "06:00",
            Amanecer: "07:30",
            Dhuhr: "13:30",
            Asr: "16:30",
            Maghrib: "19:00",
            Isha: "20:30",
        };

        // Convierte "HH:MM" a minutos totales
        function toMinutes(t) {
            const [h, m] = t.split(':').map(Number);
            return h * 60 + m;
        }

        // Actualiza el texto del banner superior y el contador lateral
        function updateBanner() {
            const now = new Date();
            const nowMinutes = now.getHours() * 60 + now.getMinutes();

            let nextName = null;
            let nextTime = null;

            // Busca el siguiente rezo del día
            Object.entries(prayerTimes).forEach(([name, time]) => {
                const tMin = toMinutes(time);
                if (tMin > nowMinutes && (nextTime === null || tMin < nextTime)) {
                    nextName = name;
                    nextTime = tMin;
                }
            });

            // Si ya pasaron todos, el siguiente es el primero del día siguiente
            if (!nextName) {
                const first = Object.entries(prayerTimes)[0];
                nextName = first[0];
                nextTime = toMinutes(first[1]) + 1440;
            }

            const diff = nextTime - nowMinutes;
            const h = Math.floor(diff / 60);
            const m = diff % 60;

            // Texto principal del banner
            document.getElementById('nextPrayerBanner').textContent =
                `${nextName} en ${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}`;

            // Texto pequeño en la sección de horarios
            document.getElementById('nextPrayerLabel').textContent =
                `${h}h ${m}m`;
        }

        updateBanner();
        setInterval(updateBanner, 1000);
    })();
</script>
