@extends('layouts.app')

@section('title', __('messages.navbar.home'))

@section('content')

@php
    $prayerTimes = [
        __('messages.prayers.Fajr')     => '04:30',
        __('messages.prayers.Sunrise')  => '07:30',
        __('messages.prayers.Dhuhr')    => '10:25',
        __('messages.prayers.Asr')      => '16:30',
        __('messages.prayers.Maghrib')  => '19:00',
        __('messages.prayers.Isha')     => '23:30',
    ];
@endphp


{{-- HERO --}}
<section class="relative pt-24 pb-20 fade bg-white/70 backdrop-blur-sm shadow-sm rounded-b-3xl">

    <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_#C9A22715,_transparent_70%)]"></div>

    <div class="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">

        <div>
            <h1 class="text-5xl font-bold text-[#0F5132] leading-tight mb-4">
                {{ __('messages.home.hero_title_1') }}
                <span class="text-[#C9A227]">{{ __('messages.home.hero_title_2') }}</span><br>
                {{ __('messages.home.hero_title_3') }}
            </h1>

            <p class="text-gray-600 text-lg mb-10">
                {{ __('messages.home.hero_subtitle') }}
            </p>

            <div class="flex flex-wrap gap-4">
                <a href="/horarios"
                   class="bg-[#0F5132] text-white px-8 py-3 rounded-full font-semibold
                          hover:bg-[#0c3f27] hover:-translate-y-1 hover:shadow-lg transition">
                    {{ __('messages.home.btn_prayer_times') }}
                </a>

                <a href="/contacto"
                   class="border border-[#C9A227] text-[#C9A227] px-8 py-3 rounded-full font-semibold
                          hover:bg-[#C9A227]/10 hover:-translate-y-1 transition">
                    {{ __('messages.home.btn_contact') }}
                </a>
            </div>
        </div>

        <div class="flex justify-center">
            <div class="bg-white border border-[#C9A227]/40 shadow-xl rounded-3xl p-10 w-full max-w-sm text-center
                        hover:shadow-2xl hover:-translate-y-1 transition">
                <img src="{{ asset('img/mezquitaAlquds_logo.png') }}" class="h-32 mx-auto mb-4">
                <p class="arabic text-2xl text-[#0F5132] font-semibold mb-1">مسجد القدس</p>
                <p class="text-xs text-gray-500">{{ __('messages.home.card_subtitle') }}</p>
            </div>
        </div>

    </div>
</section>



{{-- TARJETA PREMIUM DEL REZO ACTUAL --}}
<section class="flex justify-center mt-0 fade">
    <div class="bg-white border border-[#C9A227]/40 shadow-xl rounded-3xl p-8 w-full max-w-md text-center
                hover:shadow-2xl transition">

        <div id="nextPrayerFull"
             class="text-4xl font-semibold text-[#0F5132] tracking-tight mb-3 drop-shadow-sm"></div>

        {{-- ESTA LÍNEA SOLO SE USA EN ESTADO 2 --}}
        <div id="iqamaInfo"
             class="text-lg text-[#0F5132] font-medium mb-4"></div>

        {{-- ESTE CUADRADITO CAMBIA SEGÚN EL ESTADO --}}
        <div id="waitingTime"
             class="inline-block px-7 py-3 bg-white border border-[#E5C76B] rounded-xl
                    text-[#8A6D00] font-semibold text-base shadow-[0_2px_8px_rgba(0,0,0,0.08)]
                    backdrop-blur-sm tracking-wide"></div>
    </div>
</section>

<div id="todayDate" class="text-sm font-semibold text-gray-600 tracking-wide mt-4 text-center"></div>



{{-- RELOJ — MÁS PEGADO Y CON MÁS VOLUMEN --}}
<section class="relative pt-20 pb-28 bg-gradient-to-b from-[#F8F8F8] to-[#ECECEC] fade">

    {{-- Sombra superior suave --}}
    <div class="absolute top-0 left-0 w-full h-10 bg-gradient-to-b from-black/5 to-transparent pointer-events-none"></div>

    {{-- Contenedor principal --}}
    <div class="max-w-7xl mx-auto px-6 flex flex-col items-center">

        {{-- Tarjeta envolvente para dar volumen --}}
        <div class="p-10 rounded-3xl bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)]
                    border border-[#C9A227]/20 backdrop-blur-sm
                    hover:shadow-[0_15px_50px_rgba(0,0,0,0.12)] transition">

            @include('components.public.home.reloj-rezo')

        </div>

    </div>
</section>



{{-- INFORMACIÓN --}}
<section class="py-20 bg-[#F8F8F8] fade">
    <div class="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">

        <div class="p-8 bg-white rounded-3xl shadow-md border border-[#C9A227]/20
                    hover:-translate-y-1 hover:shadow-xl transition">
            <h3 class="text-xl font-semibold text-[#0F5132] mb-3">
                {{ __('messages.home.info_community_title') }}
            </h3>
            <p class="text-gray-600 text-sm leading-relaxed">
                {{ __('messages.home.info_community_text') }}
            </p>
        </div>

        <div class="p-8 bg-white rounded-3xl shadow-md border border-[#C9A227]/20
                    hover:-translate-y-1 hover:shadow-xl transition">
            <h3 class="text-xl font-semibold text-[#0F5132] mb-3">
                {{ __('messages.home.info_activities_title') }}
            </h3>
            <p class="text-gray-600 text-sm leading-relaxed">
                {{ __('messages.home.info_activities_text') }}
            </p>
        </div>

        <div class="p-8 bg-white rounded-3xl shadow-md border border-[#C9A227]/20
                    hover:-translate-y-1 hover:shadow-xl transition">
            <h3 class="text-xl font-semibold text-[#0F5132] mb-3">
                {{ __('messages.home.info_visit_title') }}
            </h3>
            <p class="text-gray-600 text-sm leading-relaxed">
                {{ __('messages.home.info_visit_text') }}
            </p>
        </div>

    </div>
</section>



{{-- CTA FINAL --}}
<section class="py-20 bg-[#0F5132] text-white text-center fade">
    <h2 class="text-3xl font-bold mb-4">{{ __('messages.home.cta_title') }}</h2>
    <p class="text-white/80 mb-8">{{ __('messages.home.cta_subtitle') }}</p>

    <a href="/contacto"
       class="inline-block bg-[#C9A227] text-[#0F5132] px-10 py-3 rounded-full font-semibold
              hover:bg-[#b8921f] hover:-translate-y-1 hover:shadow-xl transition">
        {{ __('messages.home.cta_button') }}
    </a>
</section>

@endsection



{{-- SCRIPT DEL RELOJ --}}
@push('scripts')
<script>
(function () {

    const prayerTimes = @json($prayerTimes);
    const WAITING_TIME_MINUTES = 10;
    const IQAMA_WINDOW = 30;

    const T = @json(__('messages.time'));

    const iqamaEl = document.getElementById('iqamaInfo');

    function toMinutes(t) {
        const [h, m] = t.split(':').map(Number);
        return h * 60 + m;
    }

    function updateHeader() {
        const now = new Date();
        const nowMin = now.getHours() * 60 + now.getMinutes();
        const nowSec = now.getSeconds();

        let nextName = null, nextTime = null;
        let lastName = null, lastTime = null;

        for (const [name, time] of Object.entries(prayerTimes)) {
            const tMin = toMinutes(time);

            if (tMin <= nowMin) {
                if (lastTime === null || tMin > lastTime) {
                    lastName = name;
                    lastTime = tMin;
                }
            }

            if (tMin > nowMin) {
                if (nextTime === null || tMin < nextTime) {
                    nextName = name;
                    nextTime = tMin;
                }
            }
        }

        if (!nextName) {
            const first = Object.entries(prayerTimes)[0];
            nextName = first[0];
            nextTime = toMinutes(first[1]) + 1440;
        }

        if (!lastName) {
            const last = Object.entries(prayerTimes).slice(-1)[0];
            lastName = last[0];
            lastTime = toMinutes(last[1]) - 1440;
        }

        const diffFuture = (nextTime * 60) - (nowMin * 60 + nowSec);
        const diffPast = (nowMin * 60 + nowSec) - (lastTime * 60);

        const waitingEl = document.getElementById('waitingTime');

        // ESTADO 2 — ENTRE ADHAN E IQAMA
        if (diffPast < WAITING_TIME_MINUTES * 60) {

            const mins = Math.floor(diffPast / 60);
            const secs = diffPast % 60;
            const remaining = WAITING_TIME_MINUTES - mins;

            document.getElementById('nextPrayerFull').textContent =
                `${lastName} · ${T.ago} ${mins}:${secs.toString().padStart(2,'0')} ${T.mins}`;

            iqamaEl.textContent = "";

            waitingEl.textContent =
                `${T.wait} ${T.remaining}: ${remaining} ${T.mins}`;

            return;
        }

        // ESTADO 3 — IQAMA
        if (diffPast >= WAITING_TIME_MINUTES * 60 &&
            diffPast < (WAITING_TIME_MINUTES + IQAMA_WINDOW) * 60) {

            const mins = Math.floor(diffPast / 60);
            const secs = diffPast % 60;

            const iqamaMins = mins - WAITING_TIME_MINUTES;
            const iqamaSecs = secs;

            document.getElementById('nextPrayerFull').textContent =
                `${lastName} · ${T.ago} ${mins} ${T.mins}`;

            waitingEl.textContent =
                `${T.iqama} · ${T.ago} ${iqamaMins}:${iqamaSecs.toString().padStart(2,'0')} ${T.mins}`;

            iqamaEl.textContent = "";

            return;
        }

        // ESTADO 1 — ANTES DEL ADHAN
        const h = Math.floor(diffFuture / 3600);
        const m = Math.floor((diffFuture % 3600) / 60);
        const s = diffFuture % 60;

        document.getElementById('nextPrayerFull').textContent =
            `${nextName} ${T.in} ${h}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;

        iqamaEl.textContent = "";

        waitingEl.textContent = `${T.wait}: ${WAITING_TIME_MINUTES} ${T.mins}`;
    }

    updateHeader();
    setInterval(updateHeader, 1000);

})();
</script>
@endpush
