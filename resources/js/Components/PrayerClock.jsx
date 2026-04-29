import { useState, useEffect, useRef } from 'react';
import { useTranslation } from '../hooks/useTranslation';

export default function PrayerClock({ prayerTimes }) {
    const { t } = useTranslation();
    const hourRef   = useRef(null);
    const minuteRef = useRef(null);
    const secondRef = useRef(null);
    const arcRef    = useRef(null);

    // Convierte un número como 18 → '18' en es/ca, '١٨' en ar
    const digits = t('numbers', null); // devuelve el array ['0'..'9'] o ['٠'..'٩']
    function localizeNumber(n) {
        if (!Array.isArray(digits)) return String(n);
        return String(n).split('').map(d => /\d/.test(d) ? digits[parseInt(d)] : d).join('');
    }

    // Los 4 números del reloj de 24h
    const CLOCK_NUMBERS = [
        { hour: 12, label: localizeNumber(12) },
        { hour: 18, label: localizeNumber(18) },
        { hour: 0,  label: localizeNumber(0)  },
        { hour: 6,  label: localizeNumber(6)  },
    ];

    function toMinutes(str) {
        const [h, m] = str.split(':').map(Number);
        return h * 60 + m;
    }

    function formatRemaining(diff) {
        if (diff < 0) diff += 1440;
        return `${localizeNumber(Math.floor(diff / 60))}h ${localizeNumber(diff % 60)}m`;
    }

    useEffect(() => {
        function updateClock() {
            const now     = new Date();
            const seconds = now.getSeconds();
            const minutes = now.getMinutes();
            const hours24 = now.getHours();
            const hours12 = hours24 % 12;
            const nowMin  = hours24 * 60 + minutes;

            if (secondRef.current)
                secondRef.current.style.transform = `translate(-50%, -100%) rotate(${seconds * 6}deg)`;
            if (minuteRef.current)
                minuteRef.current.style.transform = `translate(-50%, -100%) rotate(${minutes * 6}deg)`;
            if (hourRef.current)
                hourRef.current.style.transform = `translate(-50%, -100%) rotate(${hours12 * 30 + minutes * 0.5}deg)`;
            if (arcRef.current)
                arcRef.current.style.strokeDashoffset = String(276 - (nowMin / 1440) * 276);

            document.querySelectorAll('[data-prayer-time]').forEach(item => {
                const el = item.querySelector('.tooltip-remaining');
                if (el) el.textContent = formatRemaining(toMinutes(item.dataset.prayerTime) - nowMin);
            });
        }

        updateClock();
        const interval = setInterval(updateClock, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative reloj-container
                        w-[340px] h-[340px] sm:w-[380px] sm:h-[380px]
                        md:w-[460px] md:h-[460px] lg:w-[520px] lg:h-[520px]
                        xl:w-[580px] xl:h-[580px]
                        rounded-3xl bg-white shadow-xl
                        hover:shadow-2xl hover:-translate-y-1 transition overflow-visible fade"
             style={{ animation: 'floatClock 7s ease-in-out infinite' }}>

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#ffffff,#f3f3f3)] rounded-3xl" />
            <div className="absolute -inset-10 bg-[radial-gradient(circle_at_top,#C9A22722,transparent_70%)] pointer-events-none" />

            {/* Números del reloj */}
            {CLOCK_NUMBERS.map(({ hour, label }) => {
                const angle = (hour / 24) * 360;
                return (
                    <p key={hour}
                       className="absolute text-[#0F5132] font-bold text-xs pointer-events-none"
                       style={{
                           left: '50%', top: '50%',
                           transform: `translate(-50%,-50%) rotate(${angle}deg) translateY(calc(var(--size) * -0.44)) rotate(-${angle}deg)`,
                       }}>
                        {label}
                    </p>
                );
            })}

            {/* Marcas minutos */}
            {Array.from({ length: 60 }, (_, i) => (
                <div key={i} className="absolute bg-[#0F5132] pointer-events-none"
                     style={{
                         width: '1px', height: 'calc(var(--size) * 0.03)',
                         left: '50%', top: '50%',
                         opacity: i % 5 === 0 ? 1 : 0.35,
                         transform: `translate(-50%,-50%) rotate(${i * 6}deg) translateY(calc(var(--size) * -0.44))`,
                     }} />
            ))}

            {/* Marcas horas */}
            {Array.from({ length: 12 }, (_, i) => (
                <div key={i} className="absolute bg-[#0F5132] pointer-events-none"
                     style={{
                         width: '3px', height: 'calc(var(--size) * 0.05)',
                         left: '50%', top: '50%',
                         transform: `translate(-50%,-50%) rotate(${i * 30}deg) translateY(calc(var(--size) * -0.40))`,
                     }} />
            ))}

            {/* Arco día */}
            <svg className="absolute pointer-events-none"
                 style={{ inset: 'calc(var(--size) * 0.10)' }}
                 viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="44" stroke="#C9A22733" strokeWidth="5" fill="none" />
                <circle ref={arcRef} cx="50" cy="50" r="44"
                        stroke="#C9A227" strokeWidth="5" fill="none"
                        strokeLinecap="round"
                        strokeDasharray="276" strokeDashoffset="276"
                        style={{ transition: 'stroke-dashoffset .8s ease-out', transform: 'rotate(90deg)', transformOrigin: '50% 50%' }} />
            </svg>

            {/* Agujas */}
            <div ref={hourRef} className="absolute bg-[#0F5132] rounded-full origin-bottom pointer-events-none"
                 style={{ left: '50%', top: '50%', width: '4px', height: 'calc(var(--size) * 0.22)', transform: 'translate(-50%,-100%) rotate(0deg)' }} />
            <div ref={minuteRef} className="absolute bg-[#0F5132] rounded-full origin-bottom pointer-events-none"
                 style={{ left: '50%', top: '50%', width: '3px', height: 'calc(var(--size) * 0.32)', transform: 'translate(-50%,-100%) rotate(0deg)' }} />
            <div ref={secondRef} className="absolute bg-[#C9A227] rounded-full origin-bottom pointer-events-none"
                 style={{ left: '50%', top: '50%', width: '2px', height: 'calc(var(--size) * 0.38)', transform: 'translate(-50%,-100%) rotate(0deg)' }} />

            {/* Centro */}
            <div className="absolute bg-white border-[3px] border-[#C9A227] rounded-full shadow-lg pointer-events-none"
                 style={{ left: '50%', top: '50%', width: 'calc(var(--size) * 0.07)', height: 'calc(var(--size) * 0.07)', transform: 'translate(-50%,-50%)' }} />

            {/* Rezos */}
            {Object.entries(prayerTimes).map(([key, time]) => {
                const label = t('prayers', key.charAt(0).toUpperCase() + key.slice(1));
                const [h, m] = time.split(':').map(Number);
                const angle  = ((h * 60 + m) / 1440) * 360;
                return (
                    <PrayerItem
                        key={key}
                        label={label}
                        time={time}
                        localTime={`${localizeNumber(h)}:${localizeNumber(String(m).padStart(2,'0'))}`}
                        angle={angle}
                        remainingLabel={t('prayers', 'remaining')}
                        localizeNumber={localizeNumber}
                    />
                );
            })}

            <style>{`
                .reloj-container { --size: 340px; }
                @media (min-width:640px)  { .reloj-container { --size: 380px; } }
                @media (min-width:768px)  { .reloj-container { --size: 460px; } }
                @media (min-width:1024px) { .reloj-container { --size: 520px; } }
                @media (min-width:1280px) { .reloj-container { --size: 580px; } }
                @keyframes floatClock {
                    0%,100% { transform: translateY(0px); }
                    50%     { transform: translateY(-6px); }
                }
            `}</style>
        </div>
    );
}

function PrayerItem({ label, time, localTime, angle, remainingLabel, localizeNumber }) {
    const [open, setOpen] = useState(false);
    const [remaining, setRemaining] = useState('');

    useEffect(() => {
        function updateRemaining() {
            const now = new Date();
            const nowMin = now.getHours() * 60 + now.getMinutes();
            const [h, m] = time.split(':').map(Number);
            const prayerMin = h * 60 + m;
            let diff = prayerMin - nowMin;
            if (diff < 0) diff += 1440;
            setRemaining(`${localizeNumber(Math.floor(diff / 60))}h ${localizeNumber(diff % 60)}m`);
        }
        updateRemaining();
        const interval = setInterval(updateRemaining, 60000);
        return () => clearInterval(interval);
    }, [time, localizeNumber]);

    return (
        <div className="absolute text-[11px] font-semibold text-[#0F5132]
                        px-2 py-1 rounded-md bg-white/60 backdrop-blur-sm
                        border border-[#C9A227]/30 shadow-sm cursor-pointer whitespace-nowrap"
             style={{
                 left: '50%', top: '50%',
                 zIndex: open ? 999 : 10,
                 transform: `translate(-50%,-50%) rotate(${angle}deg) translateY(calc(var(--size) * -0.39)) rotate(-${angle}deg)`,
             }}
             onMouseEnter={() => setOpen(true)}
             onMouseLeave={() => setOpen(false)}
             onClick={e => { e.stopPropagation(); setOpen(v => !v); }}>
            {label}
            {open && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 px-3 py-2 rounded-lg
                                bg-[#0F5132] text-white text-[10px] shadow-xl border border-[#C9A227]/40"
                     style={{ zIndex: 999 }}>
                    <span>{localTime}</span><br />
                    <span className="text-[9px] opacity-80">
                        {remainingLabel}: <span className="tooltip-remaining">{remaining}</span>
                    </span>
                </div>
            )}
        </div>
    );
}
