import { useState } from 'react';
import { router } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import { useTranslation } from '../hooks/useTranslation';

const PRAYER_KEYS = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'];

const PrayerIcon = ({ name }) => {
    const icons = {
        fajr: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75 9.75 9.75 0 0 1 8.25 6c0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25 9.75 9.75 0 0 0 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
            </svg>
        ),
        sunrise: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
            </svg>
        ),
        dhuhr: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
            </svg>
        ),
        asr: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
            </svg>
        ),
        maghrib: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
            </svg>
        ),
        isha: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75 9.75 9.75 0 0 1 8.25 6c0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25 9.75 9.75 0 0 0 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
            </svg>
        ),
    };
    return icons[name] ?? null;
};

export default function Horarios({ horariosMes, year, month }) {
    const { t, locale } = useTranslation();

    // Meses y días vienen de los archivos de idioma — sin arrays hardcodeados
    const monthNames = t('horarios', 'months');
    const dayNames   = t('horarios', 'days');

    const today    = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
    const isCurrentMonth = year === today.getFullYear() && month === today.getMonth() + 1;
    const defaultDay = isCurrentMonth ? todayStr : `${year}-${String(month).padStart(2,'0')}-01`;

    const [selected, setSelected] = useState(defaultDay);

    function goToMonth(y, m) {
        if (m < 1)  { m = 12; y--; }
        if (m > 12) { m = 1;  y++; }
        router.get('/horarios', { year: y, month: m }, { preserveState: false });
    }

    const firstDay    = new Date(year, month - 1, 1);
    const daysInMonth = new Date(year, month, 0).getDate();
    const startOffset = (firstDay.getDay() + 6) % 7;

    const cells = [];
    for (let i = 0; i < startOffset; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    while (cells.length % 7 !== 0) cells.push(null);

    function dateStr(d) {
        return `${year}-${String(month).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    }

    const selectedData = selected ? horariosMes[selected] : null;

    function prayerLabel(key) {
        const map = { fajr: 'Fajr', sunrise: 'Sunrise', dhuhr: 'Dhuhr', asr: 'Asr', maghrib: 'Maghrib', isha: 'Isha' };
        return t('prayers', map[key]) ?? key;
    }

    function formatSelectedDate() {
        if (!selected) return '';
        return new Date(selected + 'T12:00:00').toLocaleDateString(
            locale === 'ar' ? 'ar-EG' : locale === 'ca' ? 'ca-ES' : 'es-ES',
            { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
        );
    }

    return (
        <MainLayout title={t('navbar', 'prayers')}>
            <section className="pt-28 pb-16 max-w-3xl mx-auto px-4 sm:px-6">

                {/* ── CABECERA MES ── */}
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={() => goToMonth(year, month - 1)}
                        className="w-9 h-9 flex items-center justify-center rounded-full
                                   border border-[#C9A227]/40 text-[#0F5132]
                                   hover:bg-[#0F5132] hover:text-white hover:border-[#0F5132]
                                   transition-all duration-200 font-bold text-lg"
                    >
                        ‹
                    </button>

                    <h1 className="text-xl font-bold text-[#0F5132] tracking-wide">
                        {Array.isArray(monthNames) ? monthNames[month - 1] : month} {year}
                    </h1>

                    <button
                        onClick={() => goToMonth(year, month + 1)}
                        className="w-9 h-9 flex items-center justify-center rounded-full
                                   border border-[#C9A227]/40 text-[#0F5132]
                                   hover:bg-[#0F5132] hover:text-white hover:border-[#0F5132]
                                   transition-all duration-200 font-bold text-lg"
                    >
                        ›
                    </button>
                </div>

                {/* ── CALENDARIO ── */}
                <div className="bg-white rounded-2xl shadow-sm border border-[#C9A227]/20 overflow-hidden mb-5">

                    {/* Cabecera días */}
                    <div className="grid grid-cols-7 border-b border-gray-100">
                        {Array.isArray(dayNames) && dayNames.map((d, i) => (
                            <div key={i}
                                 className={`text-center text-xs font-semibold py-3
                                     ${i === 4 ? 'text-[#C9A227]' : 'text-gray-400'}`}>
                                {d}
                            </div>
                        ))}
                    </div>

                    {/* Filas */}
                    {Array.from({ length: cells.length / 7 }, (_, row) => (
                        <div key={row} className="grid grid-cols-7 border-b border-gray-50 last:border-0">
                            {cells.slice(row * 7, row * 7 + 7).map((d, col) => {
                                if (!d) return (
                                    <div key={`e-${row}-${col}`} className="py-3 bg-[#F5F5F5]/40" />
                                );

                                const ds      = dateStr(d);
                                const isToday = ds === todayStr;
                                const isSel   = ds === selected;
                                const hasData = !!horariosMes[ds];
                                const isFri   = new Date(year, month - 1, d).getDay() === 5;
                                const dayData = horariosMes[ds];

                                return (
                                    <button
                                        key={ds}
                                        onClick={() => hasData && setSelected(ds)}
                                        disabled={!hasData}
                                        className={`
                                            py-2.5 flex flex-col items-center gap-0.5
                                            transition-all duration-150
                                            ${!hasData ? 'opacity-20 cursor-default' : 'cursor-pointer'}
                                            ${isSel ? 'bg-[#0F5132]' : 'hover:bg-[#F5F5F5]'}
                                        `}
                                    >
                                        <span className={`
                                            w-7 h-7 flex items-center justify-center rounded-full text-sm font-semibold
                                            ${isSel                        ? 'bg-white text-[#0F5132]'               : ''}
                                            ${isToday && !isSel            ? 'ring-2 ring-[#0F5132] text-[#0F5132]'  : ''}
                                            ${isFri && !isSel && !isToday  ? 'text-[#C9A227]'                        : ''}
                                            ${!isSel && !isToday && !isFri ? 'text-gray-700'                         : ''}
                                        `}>
                                            {d}
                                        </span>
                                        {hasData && (
                                            <span className={`text-[9px] font-medium leading-none tabular-nums
                                                ${isSel ? 'text-white/50' : 'text-gray-300'}`}>
                                                {dayData.fajr}
                                            </span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    ))}
                </div>

                {/* ── DETALLE DÍA ── */}
                {selected && selectedData ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-[#C9A227]/20 overflow-hidden">
                        <div className="px-5 py-4 flex items-center justify-between border-b border-gray-50">
                            <div>
                                <p className="font-semibold text-[#0F5132] text-sm capitalize">
                                    {formatSelectedDate()}
                                </p>
                                {selectedData.fecha_hijri && (
                                    <p className="text-xs text-gray-400 mt-0.5">{selectedData.fecha_hijri}</p>
                                )}
                            </div>
                            {selected === todayStr && (
                                <span className="text-[11px] font-bold bg-[#0F5132]/10 text-[#0F5132] px-3 py-1 rounded-full">
                                    {t('horarios', 'today')}
                                </span>
                            )}
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3">
                            {PRAYER_KEYS.map((key) => (
                                <div key={key}
                                     className="flex flex-col items-center justify-center py-7 gap-2
                                                border-b border-r border-gray-100
                                                hover:bg-[#F5F5F5]/60 transition-colors duration-150">
                                    <div className="text-[#198754]">
                                        <PrayerIcon name={key} />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                                        {prayerLabel(key)}
                                    </span>
                                    <span className="text-2xl font-bold text-[#0F5132] tabular-nums tracking-tight">
                                        {selectedData[key]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : selected && !selectedData ? (
                    <div className="text-center text-gray-400 text-sm py-8 bg-white rounded-2xl border border-[#C9A227]/20">
                        {t('horarios', 'no_data')}
                    </div>
                ) : null}

            </section>
        </MainLayout>
    );
}
