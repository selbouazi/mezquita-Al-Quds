@php
    $prayerTimes = [
        __('messages.prayers.Fajr') => '06:00',
        __('messages.prayers.Sunrise') => '07:30',
        __('messages.prayers.Dhuhr') => '13:30',
        __('messages.prayers.Asr') => '16:30',
        __('messages.prayers.Maghrib') => '19:00',
        __('messages.prayers.Isha') => '20:30',
    ];
@endphp

<style>
    /* Tamaño dinámico */
    .reloj-container { --size: 340px; }
    @media (min-width: 640px) { .reloj-container { --size: 380px; } }
    @media (min-width: 768px) { .reloj-container { --size: 460px; } }
    @media (min-width: 1024px) { .reloj-container { --size: 520px; } }
    @media (min-width: 1280px) { .reloj-container { --size: 580px; } }

    /* Tooltips y prioridad */
    .prayer-item {
        position: absolute;
        z-index: 10;
        pointer-events: auto;
        white-space: nowrap;
    }

    .prayer-item.active,
    .prayer-item:hover {
        z-index: 999999 !important;
    }

    .rezo-tooltip {
        z-index: 999999 !important;
        pointer-events: auto;
    }

    /* Nada bloquea el hover */
    svg, #hourHand, #minuteHand, #secondHand {
        pointer-events: none !important;
    }

    @keyframes floatClock {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-6px); }
        100% { transform: translateY(0px); }
    }
</style>

<div class="relative reloj-container
            w-[340px] h-[340px]
            sm:w-[380px] sm:h-[380px]
            md:w-[460px] md:h-[460px]
            lg:w-[520px] lg:h-[520px]
            xl:w-[580px] xl:h-[580px]
            rounded-3xl bg-white shadow-xl
            hover:shadow-2xl hover:-translate-y-1 transition
            overflow-visible fade"
     style="animation: floatClock 7s ease-in-out infinite;">

    {{-- Fondo --}}
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,#ffffff,#f3f3f3)]"></div>

    {{-- Glow --}}
    <div class="absolute -inset-10 bg-[radial-gradient(circle_at_top,#C9A22722,transparent_70%)]"></div>

    {{-- Números principales --}}
    @php
        $numbers = [
            12 => __('messages.numbers.12'),
            18 => __('messages.numbers.18'),
            0  => __('messages.numbers.00'),
            6  => __('messages.numbers.6'),
        ];
    @endphp

    @foreach ($numbers as $hour => $text)
        @php $angle = ($hour / 24) * 360; @endphp

        <p class="absolute text-[#0F5132] font-bold text-xs"
           style="
                left: 50%;
                top: 50%;
                transform:
                    translate(-50%, -50%)
                    rotate({{ $angle }}deg)
                    translateY(calc(var(--size) * -0.44))
                    rotate(-{{ $angle }}deg);
           ">
            {{ $text }}
        </p>
    @endforeach

    {{-- Minutos --}}
    @for ($i = 0; $i < 60; $i++)
        <div class="absolute bg-[#0F5132]"
             style="
                width: 1px;
                height: calc(var(--size) * 0.03);
                left: 50%;
                top: 50%;
                opacity: {{ $i % 5 == 0 ? '1' : '0.35' }};
                transform:
                    translate(-50%, -50%)
                    rotate({{ $i * 6 }}deg)
                    translateY(calc(var(--size) * -0.44));
             ">
        </div>
    @endfor

    {{-- Horas --}}
    @for ($i = 0; $i < 12; $i++)
        <div class="absolute bg-[#0F5132]"
             style="
                width: 3px;
                height: calc(var(--size) * 0.05);
                left: 50%;
                top: 50%;
                transform:
                    translate(-50%, -50%)
                    rotate({{ $i * 30 }}deg)
                    translateY(calc(var(--size) * -0.40));
             ">
        </div>
    @endfor

    {{-- Arco del día --}}
    <svg class="absolute inset-[calc(var(--size)*0.10)] pointer-events-none"
         viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="44" stroke="#C9A22733" stroke-width="5" fill="none" />
        <circle id="dayArc" cx="50" cy="50" r="44"
                stroke="#C9A227" stroke-width="5" fill="none"
                stroke-linecap="round"
                stroke-dasharray="276" stroke-dashoffset="276"
                style="transition: stroke-dashoffset .8s ease-out;
                       transform: rotate(90deg);
                       transform-origin: 50% 50%;" />
    </svg>

    {{-- Agujas --}}
    <div id="hourHand"
         class="absolute bg-[#0F5132] rounded-full origin-bottom"
         style="left: 50%; top: 50%;
                width: 4px;
                height: calc(var(--size) * 0.22);
                transform: translate(-50%, -100%) rotate(0deg);"></div>

    <div id="minuteHand"
         class="absolute bg-[#0F5132] rounded-full origin-bottom"
         style="left: 50%; top: 50%;
                width: 3px;
                height: calc(var(--size) * 0.32);
                transform: translate(-50%, -100%) rotate(0deg);"></div>

    <div id="secondHand"
         class="absolute bg-[#C9A227] rounded-full origin-bottom"
         style="left: 50%; top: 50%;
                width: 2px;
                height: calc(var(--size) * 0.38);
                transform: translate(-50%, -100%) rotate(0deg);"></div>

    {{-- Centro --}}
    <div class="absolute bg-white border-[3px] border-[#C9A227] rounded-full shadow-lg"
         style="left: 50%; top: 50%;
                width: calc(var(--size) * 0.07);
                height: calc(var(--size) * 0.07);
                transform: translate(-50%, -50%);"></div>

    {{-- Rezós --}}
    @foreach ($prayerTimes as $label => $time)
        @php
            [$h, $m] = explode(':', $time);
            $minutes = $h * 60 + $m;
            $angle = ($minutes / 1440) * 360;
        @endphp

        <div class="prayer-item text-[11px] font-semibold text-[#0F5132]
                    px-2 py-1 rounded-md bg-white/60 backdrop-blur-sm border border-[#C9A227]/30 shadow-sm
                    hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
             data-time="{{ $time }}"
             style="
                left: 50%;
                top: 50%;
                transform:
                    translate(-50%, -50%)
                    rotate({{ $angle }}deg)
                    translateY(calc(var(--size) * -0.39))
                    rotate(-{{ $angle }}deg);
             ">
            {{ $label }}

            <div class="rezo-tooltip absolute left-1/2 -translate-x-1/2 mt-2 px-3 py-2 rounded-lg
                        bg-[#0F5132] text-white text-[10px] shadow-xl border border-[#C9A227]/40 backdrop-blur-sm hidden">
                <span class="tooltip-time">{{ $time }}</span><br>
                <span class="text-[9px] opacity-80">
                    {{ __('messages.prayers.remaining') }}:
                    <span class="tooltip-remaining">--h --m</span>
                </span>
            </div>
        </div>
    @endforeach

</div>

<script>
(function () {

    function toMinutes(t) {
        const [h, m] = t.split(':').map(Number);
        return h * 60 + m;
    }

    function formatRemaining(diff) {
        if (diff < 0) diff += 1440;
        return `${Math.floor(diff / 60)}h ${diff % 60}m`;
    }

    function updateClock() {
        const now = new Date();
        const seconds = now.getSeconds();
        const minutes = now.getMinutes();
        const hours24 = now.getHours();
        const hours12 = hours24 % 12;

        document.getElementById('secondHand').style.transform =
            `translate(-50%, -100%) rotate(${seconds * 6}deg)`;

        document.getElementById('minuteHand').style.transform =
            `translate(-50%, -100%) rotate(${minutes * 6}deg)`;

        document.getElementById('hourHand').style.transform =
            `translate(-50%, -100%) rotate(${hours12 * 30 + minutes * 0.5}deg)`;

        const nowMinutes = hours24 * 60 + minutes;

        document.getElementById('dayArc').style.strokeDashoffset =
            276 - (nowMinutes / 1440) * 276;

        document.querySelectorAll('.prayer-item').forEach(item => {
            const time = item.dataset.time;
            const remainingEl = item.querySelector('.tooltip-remaining');
            const diff = toMinutes(time) - nowMinutes;
            remainingEl.textContent = formatRemaining(diff);
        });
    }

    function setupTooltips() {
        const items = document.querySelectorAll('.prayer-item');

        items.forEach(item => {
            const tooltip = item.querySelector('.rezo-tooltip');

            item.addEventListener('mouseenter', () => {
                item.classList.add('active');
                tooltip.classList.remove('hidden');
            });

            item.addEventListener('mouseleave', () => {
                item.classList.remove('active');
                tooltip.classList.add('hidden');
            });

            item.addEventListener('click', (e) => {
                e.stopPropagation();

                document.querySelectorAll('.prayer-item').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.rezo-tooltip').forEach(t => t.classList.add('hidden'));

                item.classList.add('active');
                tooltip.classList.remove('hidden');
            });
        });

        document.addEventListener('click', () => {
            document.querySelectorAll('.prayer-item').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.rezo-tooltip').forEach(t => t.classList.add('hidden'));
        });
    }

    setupTooltips();
    updateClock();
    setInterval(updateClock, 1000);

})();
</script>
