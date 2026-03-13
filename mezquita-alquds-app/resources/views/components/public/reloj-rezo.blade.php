@php
    // Horarios de ejemplo. Más adelante vendrán desde la base de datos.
    $prayerTimes = [
        'Fajr'     => '06:00',
        'Amanecer' => '07:30',
        'Dhuhr'    => '13:30',
        'Asr'      => '16:30',
        'Maghrib'  => '19:00',
        'Isha'     => '20:30',
    ];
@endphp

<div class="relative w-[340px] h-[340px] rounded-3xl bg-white shadow-xl">

    {{-- Fondo suave para darle profundidad al reloj --}}
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_#ffffff,_#f3f3f3)]"></div>

    {{-- Marcadores principales del reloj (12, 18, 24, 6) colocados en sus posiciones --}}
    <p class="absolute top-2 left-1/2 -translate-x-1/2 text-[#0F5132] font-bold text-xs">12</p>
    <p class="absolute right-2 top-1/2 -translate-y-1/2 text-[#0F5132] font-bold text-xs">18</p>
    <p class="absolute bottom-2 left-1/2 -translate-x-1/2 text-[#0F5132] font-bold text-xs">24</p>
    <p class="absolute left-2 top-1/2 -translate-y-1/2 text-[#0F5132] font-bold text-xs">6</p>

    {{-- Líneas de minutos (60 marcas alrededor del reloj) --}}
    @for ($i = 0; $i < 60; $i++)
        <div class="absolute left-1/2 top-1/2 w-[1px] h-[10px] bg-[#0F5132]"
             style="transform: translate(-50%, -50%) rotate({{ $i * 6 }}deg) translateY(-150px); opacity: {{ $i % 5 == 0 ? '1' : '0.35' }};">
        </div>
    @endfor

    {{-- Líneas de horas (12 marcas más gruesas) --}}
    @for ($i = 0; $i < 12; $i++)
        <div class="absolute left-1/2 top-1/2 w-[3px] h-[18px] bg-[#0F5132]"
             style="transform: translate(-50%, -50%) rotate({{ $i * 30 }}deg) translateY(-135px);">
        </div>
    @endfor

    {{-- Arco que muestra el progreso del día (como en Mawaqit) --}}
    <svg class="absolute inset-6 pointer-events-none" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="44" stroke="#C9A22733" stroke-width="5" fill="none" />
        <circle id="dayArc" cx="50" cy="50" r="44"
                stroke="#C9A227" stroke-width="5" fill="none"
                stroke-linecap="round" stroke-dasharray="276" stroke-dashoffset="276"
                style="transition: stroke-dashoffset .8s ease-out; transform: rotate(-90deg); transform-origin: 50% 50%;" />
    </svg>

    {{-- Aguja de las horas --}}
    <div id="hourHand" class="absolute left-1/2 top-1/2 w-[4px] h-[70px] bg-[#0F5132] rounded-full origin-bottom pointer-events-none"
         style="transform: translate(-50%, -100%) rotate(0deg);"></div>

    {{-- Aguja de los minutos --}}
    <div id="minuteHand" class="absolute left-1/2 top-1/2 w-[3px] h-[100px] bg-[#0F5132] rounded-full origin-bottom pointer-events-none"
         style="transform: translate(-50%, -100%) rotate(0deg);"></div>

    {{-- Aguja de los segundos (en dorado) --}}
    <div id="secondHand" class="absolute left-1/2 top-1/2 w-[2px] h-[120px] bg-[#C9A227] rounded-full origin-bottom pointer-events-none"
         style="transform: translate(-50%, -100%) rotate(0deg);"></div>

    {{-- Punto central del reloj --}}
    <div class="absolute left-1/2 top-1/2 w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white border-[3px] border-[#C9A227] shadow-lg pointer-events-none"></div>

    {{-- Etiquetas de los rezos colocadas en su posición exacta según la hora --}}
    @foreach ($prayerTimes as $label => $time)
        @php
            // Convertimos la hora del rezo a un ángulo dentro del reloj de 24h
            [$h, $m] = explode(':', $time);
            $minutesFrom12 = ((($h - 12) + 24) % 24) * 60 + $m;
            $angle = ($minutesFrom12 / 1440) * 360;
        @endphp

        <div class="prayer-item absolute text-[11px] font-semibold text-[#0F5132] cursor-pointer
                    px-2 py-1 rounded-md bg-white/40 backdrop-blur-sm border border-[#C9A227]/30 shadow-sm"
             data-time="{{ $time }}"
             data-label="{{ $label }}"
             style="left: 50%; top: 50%; transform: translate(-50%, -50%) rotate({{ $angle }}deg) translateY(-115px) rotate(-{{ $angle }}deg);">

            {{-- Nombre del rezo --}}
            {{ $label }}

            {{-- Tooltip que aparece al pasar el ratón o hacer click --}}
            <div class="rezo-tooltip absolute left-1/2 -translate-x-1/2 mt-2 px-3 py-2 rounded-lg
                        bg-[#0F5132] text-white text-[10px] shadow-xl border border-[#C9A227]/40 backdrop-blur-sm
                        hidden z-[9999] pointer-events-auto">

                <span class="tooltip-time">{{ $time }}</span><br>
                <span class="text-[9px] opacity-80">
                    Falta: <span class="tooltip-remaining">--h --m</span>
                </span>
            </div>
        </div>
    @endforeach

</div>

<script>
(function () {

    // Horarios usados para calcular el tiempo restante
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

    // Formato bonito para el tiempo restante
    function formatRemaining(diff) {
        if (diff < 0) diff += 1440;
        return `${Math.floor(diff / 60)}h ${diff % 60}m`;
    }

    // Actualiza agujas, arco del día y tooltips
    function updateClock() {
        const now = new Date();
        const seconds = now.getSeconds();
        const minutes = now.getMinutes();
        const hours24 = now.getHours();
        const hours12 = hours24 % 12;

        // Movimiento de las agujas
        document.getElementById('secondHand').style.transform =
            `translate(-50%, -100%) rotate(${seconds * 6}deg)`;
        document.getElementById('minuteHand').style.transform =
            `translate(-50%, -100%) rotate(${minutes * 6}deg)`;
        document.getElementById('hourHand').style.transform =
            `translate(-50%, -100%) rotate(${hours12 * 30 + minutes * 0.5}deg)`;

        const nowMinutes = hours24 * 60 + minutes;

        // Progreso del día
        document.getElementById('dayArc').style.strokeDashoffset =
            276 - (nowMinutes / 1440) * 276;

        // Actualiza el tiempo restante en cada tooltip
        document.querySelectorAll('.prayer-item').forEach(item => {
            const time = item.dataset.time;
            const remainingEl = item.querySelector('.tooltip-remaining');
            const diff = toMinutes(time) - nowMinutes;
            remainingEl.textContent = formatRemaining(diff);
        });
    }

    // Controla la aparición de los tooltips
    function setupTooltips() {
        const items = document.querySelectorAll('.prayer-item');

        items.forEach(item => {
            const tooltip = item.querySelector('.rezo-tooltip');

            // Hover
            item.addEventListener('mouseenter', () => {
                tooltip.classList.remove('hidden');
            });

            item.addEventListener('mouseleave', () => {
                tooltip.classList.add('hidden');
            });

            // Click (útil en móvil)
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                const hidden = tooltip.classList.contains('hidden');
                document.querySelectorAll('.rezo-tooltip').forEach(t => t.classList.add('hidden'));
                if (hidden) tooltip.classList.remove('hidden');
            });
        });

        // Cerrar al hacer click fuera
        document.addEventListener('click', () => {
            document.querySelectorAll('.rezo-tooltip').forEach(t => t.classList.add('hidden'));
        });
    }

    setupTooltips();
    updateClock();
    setInterval(updateClock, 1000);

})();
</script>
