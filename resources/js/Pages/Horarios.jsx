import { useState } from 'react';
import { router } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import { useTranslation } from '../hooks/useTranslation';
import { useReveal } from '../hooks/useReveal';

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
    const { t, locale, isRTL } = useTranslation();
    const calRef = useReveal();
    const detailRef = useReveal();

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
        <MainLayout title={t('navbar', 'prayers')}
            description="Horarios de oración (salat) para la Mezquita Al‑Quds de El Vendrell. Consulta los tiempos de Fajr, Dhuhr, Asr, Maghrib e Isha."
            canonical="/horarios">

            {/* === HERO === */}
            <section className="relative pt-28 pb-16 sm:pb-20 lg:pb-24 overflow-hidden bg-gradient-to-b from-[#0F3B2E] to-[#09291e]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#C9A64615,transparent_60%)] pointer-events-none" />
                <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                    <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full border border-[#C9A646]/10 animate-float-spin" />
                    <div className="absolute -bottom-16 -left-16 w-48 h-48 rotate-45 border border-[#C9A646]/8 animate-float-spin-reverse" style={{ animationDuration: '18s' }} />
                </div>
                <div className="relative max-w-3xl mx-auto px-5 sm:px-8 text-center">
                    <div className="inline-block px-4 py-1.5 mb-4 bg-white/10 backdrop-blur-sm rounded-full border border-white/10 text-sm sm:text-base text-[#C9A646] font-medium tracking-wider uppercase">
                        {t('navbar', 'prayers')}
                    </div>
                    <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.2] mb-4">
                        {Array.isArray(monthNames) ? monthNames[month - 1] : month} <span className="text-[#C9A646]">{year}</span>
                    </h1>
                    <p className="text-[#E8E8E8] text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
                        {t('footer', 'description')}
                    </p>
                </div>
            </section>

            {/* === UNIFIED BACKGROUND WRAPPER === */}
            <div className="relative">
                {/* Full allahakbar background like Home hero */}
                <div className="absolute inset-0 bg-[url('/img/allahakbar.png')] bg-cover bg-center animate-ken-burns" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(200, 160, 60, 0.35), rgba(170, 130, 40, 0.3))' }} />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#C9A64612,transparent_60%)] pointer-events-none animate-gold-pulse" />
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent animate-shimmer" />
                </div>
                {/* Girih pattern overlay */}
                <div className="footer-pattern">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                        <defs>
                            <pattern id="girih-horarios" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                                <polygon points="60,0 90,30 90,70 60,100 30,70 30,30" fill="none" stroke="#C9A646" strokeWidth="0.5" opacity="0.1" />
                                <polygon points="60,20 80,40 80,60 60,80 40,60 40,40" fill="none" stroke="#C9A646" strokeWidth="0.3" opacity="0.06" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#girih-horarios)" />
                    </svg>
                </div>

            {/* === CALENDAR SECTION === */}
            <section ref={calRef} className="reveal relative py-16 sm:py-20 lg:py-24 overflow-hidden">

                {/* Month navigation */}
                <div className={`relative max-w-3xl mx-auto px-5 sm:px-8 flex items-center justify-between mb-8 sm:mb-10 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <button
                        onClick={() => goToMonth(year, month - 1)}
                        className="w-12 h-12 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm border border-[#C9A646]/30 text-[#0F3B2E] hover:bg-[#C9A646] hover:text-[#0F3B2E] hover:border-[#C9A646] transition-all duration-300 shadow-lg hover:shadow-xl text-xl font-bold min-w-[48px] min-h-[48px]"
                        aria-label={t('common', 'previous')}
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d={isRTL ? 'M9 5l7 7-7 7' : 'M15 19l-7-7 7-7'} />
                        </svg>
                    </button>

                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-[1.3] drop-shadow-lg">
                        {Array.isArray(monthNames) ? monthNames[month - 1] : month} <span className="text-[#C9A646]">{year}</span>
                    </h2>

                    <button
                        onClick={() => goToMonth(year, month + 1)}
                        className="w-12 h-12 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm border border-[#C9A646]/30 text-[#0F3B2E] hover:bg-[#C9A646] hover:text-[#0F3B2E] hover:border-[#C9A646] transition-all duration-300 shadow-lg hover:shadow-xl text-xl font-bold min-w-[48px] min-h-[48px]"
                        aria-label={t('common', 'next')}
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d={isRTL ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
                        </svg>
                    </button>
                </div>

                {/* Calendar */}
                <div className="relative max-w-3xl mx-auto px-5 sm:px-8">
                    <div className="home-glass-card p-4 sm:p-6 lg:p-8">
                        {/* Day headers */}
                        <div className={`grid grid-cols-7 mb-2 ${isRTL ? 'grid-flow-dense' : ''}`}>
                            {Array.isArray(dayNames) && dayNames.map((d, i) => (
                                <div key={i} className={`text-center text-xs sm:text-sm font-semibold py-2 sm:py-3 ${i === 4 ? 'text-[#C9A646]' : 'text-gray-400'}`}>
                                    {d}
                                </div>
                            ))}
                        </div>

                        {/* Day cells */}
                        <div className="grid grid-cols-7">
                            {cells.map((d, idx) => {
                                if (!d) return <div key={`e-${idx}`} className="py-2 sm:py-3" />;

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
                                            py-2 sm:py-3 flex flex-col items-center gap-0.5 transition-all duration-200 relative
                                            ${!hasData ? 'opacity-15 cursor-default' : 'cursor-pointer hover:bg-[#0F3B2E]/5'}
                                            ${isSel ? 'bg-[#0F3B2E] rounded-lg' : 'rounded-lg'}
                                            ${isToday && !isSel ? 'ring-2 ring-[#C9A646]/40 ring-inset' : ''}
                                        `}
                                    >
                                        <span className={`
                                            w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-sm sm:text-base font-semibold transition-all
                                            ${isSel                        ? 'bg-white text-[#0F3B2E] shadow-md' : ''}
                                            ${isToday && !isSel            ? 'text-[#0F3B2E] font-bold' : ''}
                                            ${isFri && !isSel && !isToday  ? 'text-[#C9A646]' : ''}
                                            ${!isSel && !isToday && !isFri ? 'text-gray-700' : ''}
                                        `}>
                                            {d}
                                        </span>
                                        {hasData && (
                                            <span className={`text-[8px] sm:text-[10px] font-medium leading-none tabular-nums
                                                ${isSel ? 'text-white/60' : 'text-gray-300'}`}>
                                                {dayData.fajr}
                                            </span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* === DIAMOND SEPARATOR === */}
            <div className="flex items-center justify-center gap-1.5 py-3 sm:py-4 bg-[#0F3B2E]" aria-hidden="true">
                {[0,1,2,3,4,5,6,7,8].map(i => (
                    <span key={i} className={`block w-1 h-1 bg-[#C9A646]/${i % 2 === 0 ? '50' : '30'} rotate-45`} />
                ))}
            </div>

            {/* === DAY DETAIL SECTION === */}
            <section ref={detailRef} className="reveal relative py-16 sm:py-20 lg:py-24 overflow-hidden">

                <div className="relative max-w-3xl mx-auto px-5 sm:px-8">
                    {selected && selectedData ? (
                        <div className="home-glass-card p-0 overflow-hidden">
                            {/* Header with date */}
                            <div className={`px-5 sm:px-6 lg:px-8 py-4 sm:py-5 flex items-center justify-between border-b border-[#C9A646]/10 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <div className={isRTL ? 'text-right' : ''}>
                                    <p className="font-semibold text-[#0F3B2E] text-base sm:text-lg capitalize">
                                        {formatSelectedDate()}
                                    </p>
                                    {selectedData.fecha_hijri && (
                                        <p className="text-xs sm:text-sm text-[#C9A646]/70 mt-0.5 font-medium">{selectedData.fecha_hijri}</p>
                                    )}
                                </div>
                                {selected === todayStr && (
                                    <span className="text-xs font-bold bg-[#C9A646]/15 text-[#C9A646] px-3 py-1 rounded-full border border-[#C9A646]/20">
                                        {t('horarios', 'today')}
                                    </span>
                                )}
                            </div>

                            {/* Prayer times grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
                                {PRAYER_KEYS.map((key, idx) => (
                                    <div key={key} className={`
                                        flex flex-col items-center justify-center py-6 sm:py-8 gap-2 sm:gap-3
                                        border-b sm:border-b-0 border-[#C9A646]/8
                                        ${idx < (isRTL ? 4 : 2) ? 'border-r border-[#C9A646]/8' : ''}
                                        ${idx >= (isRTL ? 4 : 2) && idx < 4 ? 'sm:border-r sm:border-[#C9A646]/8' : ''}
                                        ${idx < (isRTL ? 2 : 4) ? 'sm:border-r sm:border-[#C9A646]/8' : ''}
                                        hover:bg-[#0F3B2E]/3 transition-colors duration-200
                                    `}>
                                        <div className="text-[#C9A646]">
                                            <PrayerIcon name={key} />
                                        </div>
                                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gray-400">
                                            {prayerLabel(key)}
                                        </span>
                                        <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0F3B2E] tabular-nums tracking-tight">
                                            {selectedData[key]}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : selected && !selectedData ? (
                        <div className="home-glass-card p-8 sm:p-12 text-center">
                            <svg className="w-12 h-12 mx-auto mb-4 text-[#C9A646]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            <p className="text-gray-400 text-base sm:text-lg">{t('horarios', 'no_data')}</p>
                        </div>
                    ) : null}
                </div>
            </section>
            </div>
        </MainLayout>
    );
}
