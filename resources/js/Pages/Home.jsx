import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import PrayerHeader from '../Components/PrayerHeader';
import PrayerClock from '../Components/PrayerClock';
import { useTranslation } from '../hooks/useTranslation';
import { useReveal } from '../hooks/useReveal';

const PRAYER_ORDER = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'];

function toSeconds(str) {
    if (!str) return -1;
    const [h, m] = str.split(':').map(Number);
    return h * 3600 + m * 60;
}

function fmtDiff(sec) {
    if (sec === 0) return '+00min';
    const abs = Math.abs(sec);
    const totalMin = Math.floor(abs / 60);
    const h = Math.floor(totalMin / 60);
    const m = totalMin % 60;
    const mm = String(m).padStart(2, '0');
    const sign = sec > 0 ? '-' : '+';
    if (h > 0) return `${sign}${h}:${mm}min`;
    return `${sign}${mm}min`;
}

function prayerProgress(key, prayerTimes, tiemposEspera, nowSec) {
    const time = prayerTimes[key];
    if (!time) return 0;
    const prayerSec = toSeconds(time);
    const waiting = tiemposEspera?.[key] ?? 0;
    const windowSec = waiting * 60;
    if (nowSec < prayerSec) return 0;
    if (windowSec === 0) return nowSec > prayerSec ? 100 : 0;
    const elapsed = nowSec - prayerSec;
    return Math.min(100, Math.max(0, (elapsed / windowSec) * 100));
}

export default function Home({ prayerTimes, latestNews, notificaciones, tiemposEspera }) {
    const { t, locale, isRTL } = useTranslation();
    const [now, setNow] = useState(new Date());
    const notifRef = useReveal();
    const timesRef = useReveal();
    const aboutRef = useReveal();
    const newsRef = useReveal();

    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 60000);
        return () => clearInterval(id);
    }, []);

    const nowSec = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();

    const PRIORITY_CONFIG = {
        muy_alta: { border: 'border-red-500', dot: 'bg-red-500' },
        alta: { border: 'border-orange-500', dot: 'bg-orange-500' },
        normal: { border: 'border-blue-500', dot: 'bg-blue-500' },
        baja: { border: 'border-gray-400', dot: 'bg-gray-400' },
    };

    return (
        <MainLayout
            title={t('navbar', 'home')}
            meta={{ title: t('meta.home.title'), description: t('meta.home.description') }}
            canonical="/"
        >
            {/* ===== HERO ===== */}
            <section className="relative min-h-[90vh] sm:min-h-screen flex items-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('/img/FONDOIMAGEN.png')] bg-cover bg-center" />
                <div className="absolute inset-0" style={{ background: 'rgba(15, 59, 46, 0.7)' }} />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#C9A64610,transparent_60%)] pointer-events-none" />
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
                </div>

                <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                    <div className={`hero-shape w-32 h-32 rounded-full border-2 top-[15%] ${isRTL ? 'right-[10%]' : 'left-[10%]'} animate-float-spin hidden lg:block`} style={{ borderColor: 'rgba(201, 166, 70, 0.12)' }} />
                    <div className={`hero-shape w-24 h-24 rotate-45 top-[25%] ${isRTL ? 'left-[15%]' : 'right-[15%]'} animate-float-spin-reverse hidden lg:block`} style={{ borderWidth: '1.5px', borderColor: 'rgba(201, 166, 70, 0.12)' }} />
                    <div className={`hero-shape w-40 h-40 rounded-full border top-[60%] ${isRTL ? 'right-[5%]' : 'left-[5%]'} animate-float-spin-reverse hidden lg:block`} style={{ animationDuration: '18s', borderColor: 'rgba(201, 166, 70, 0.12)' }} />
                    <div className={`hero-shape w-20 h-20 rotate-12 top-[70%] ${isRTL ? 'left-[10%]' : 'right-[10%]'} animate-float-spin hidden lg:block`} style={{ animationDuration: '14s', borderWidth: '1px', borderColor: 'rgba(201, 166, 70, 0.12)' }} />

                    {/* Medallón central: luna creciente + Rub el Hizb */}
                    <div className={`absolute top-1/2 ${isRTL ? '-translate-x-1/3' : 'translate-x-1/3'} -translate-y-1/2 w-[250px] h-[250px] md:w-[350px] md:h-[350px] lg:w-[450px] lg:h-[450px] opacity-[0.13]`}>
                        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                            <defs>
                                <mask id="hero-crescent">
                                    <rect width="200" height="200" fill="white" />
                                    <circle cx="42" cy="72" r="75" fill="black" />
                                </mask>
                            </defs>
                            <circle cx="100" cy="100" r="98" stroke="#C9A646" strokeWidth="0.3" />
                            <circle cx="118" cy="105" r="92" fill="#C9A646" mask="url(#hero-crescent)" />
                            <rect x="55" y="55" width="90" height="90" stroke="#C9A646" strokeWidth="0.4" />
                            <rect x="55" y="55" width="90" height="90" stroke="#C9A646" strokeWidth="0.4" transform="rotate(45 100 100)" />
                            <circle cx="100" cy="100" r="8" stroke="#C9A646" strokeWidth="0.3" />
                            <circle cx="100" cy="100" r="3" fill="#C9A646" />
                        </svg>
                    </div>
                </div>

                <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 py-14 sm:py-24 lg:py-32">
                    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-14 items-center">
                        <div className={`w-full max-w-lg mx-auto lg:mx-0 ${isRTL ? 'lg:text-right' : 'text-left'}`}>
                            <div className="inline-block px-4 py-1.5 mb-5 bg-white/10 backdrop-blur-sm rounded-full border border-white/10 text-sm sm:text-base text-[#C9A646] font-medium tracking-wider uppercase">
                                {t('home', 'card_subtitle')}
                            </div>
                            <h1 className={`font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.2] sm:leading-[1.25] mb-4 sm:mb-5 ${isRTL ? 'lg:text-right' : ''}`}>
                                {t('home', 'hero_title_1')}{' '}
                                <span className="bg-gradient-to-r from-[#C9A646] to-[#d4b44c] bg-clip-text text-transparent animate-glow-text">
                                    {t('home', 'hero_title_2')}
                                </span>
                                <br />
                                <span className="text-white/90">{t('home', 'hero_title_3')}</span>
                            </h1>
                            <p className={`text-[#E8E8E8] text-base sm:text-lg max-w-lg leading-relaxed mb-8 sm:mb-10 ${isRTL ? 'lg:ml-auto' : ''}`}>
                                {t('home', 'hero_subtitle')}
                            </p>

                            <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 ${isRTL ? 'lg:justify-end' : ''}`}>
                                <Link
                                    href="/horarios"
                                    className="relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#C9A646] via-[#d4b44c] to-[#b88a36] animate-shimmer-btn text-[#0F3B2E] px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-semibold text-base sm:text-lg shadow-lg shadow-[#C9A646]/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 overflow-hidden group min-h-[48px]"
                                >
                                    <span className="relative z-10">{t('home', 'btn_prayer_times')}</span>
                                    <svg className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 transition-transform shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d={isRTL ? 'M15.75 19.5L8.25 12l7.5-7.5' : 'M8.25 4.5l7.5 7.5-7.5 7.5'} />
                                    </svg>
                                </Link>
                                <Link
                                    href="/contacto"
                                    className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white/25 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-white/20 hover:border-[#C9A646]/50 hover:text-[#C9A646] transition-all duration-300 min-h-[48px]"
                                >
                                    {t('home', 'btn_contact')}
                                </Link>
                            </div>
                        </div>

                        <div className="w-full max-w-sm mx-auto lg:mx-0">
                            <div className="home-glass-card p-4 sm:p-6 lg:p-8 w-fit mx-auto animate-pulse-soft">
                                <div className="scale-[0.7] sm:scale-[0.8] lg:scale-90 origin-center">
                                    <PrayerClock prayerTimes={prayerTimes} />
                                </div>
                            </div>
                            <div className="mt-4 sm:mt-6 w-full mx-auto">
                                <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 px-4 sm:px-5 py-3">
                                    <PrayerHeader compact prayerTimes={prayerTimes} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-scroll-hint hidden sm:block" aria-hidden="true">
                    <div className="flex flex-col items-center gap-1.5 text-white/30">
                        <span className="text-xs tracking-widest uppercase">Scroll</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>
                </div>
            </section>

            {/* ===== NOTIFICACIONES ===== */}
            {notificaciones?.length > 0 && (
                <section ref={notifRef} className="reveal py-8 sm:py-10">
                    <div className="max-w-4xl mx-auto px-5 sm:px-8 space-y-3">
                        {notificaciones.map((n, idx) => {
                            const cfg = PRIORITY_CONFIG[n.prioridad] || PRIORITY_CONFIG.normal;
                            return (
                                <div
                                    key={n.id}
                                    className={`notif-glass rounded-2xl px-4 sm:px-5 py-3.5 border-l-4 ${cfg.border} bg-white/70 shadow-sm`}
                                    style={{ animation: `slide-in 0.4s ease-out ${idx * 0.1}s both` }}
                                >
                                    <style>{`
                                        @keyframes slide-in {
                                            from { opacity: 0; transform: translateX(${isRTL ? '' : '-'}30px); }
                                            to { opacity: 1; transform: translateX(0); }
                                        }
                                    `}</style>
                                    <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                        <span className={`w-2.5 h-2.5 rounded-full ${cfg.dot} mt-1.5 shrink-0`} />
                                        <div className="flex-1 min-w-0">
                                            {n.titulo && <p className="font-semibold text-base text-gray-800 mb-0.5">{n.titulo}</p>}
                                            <p className="text-base text-gray-600 leading-relaxed">{n.mensaje}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            )}

            {/* ===== TODAY'S PRAYER TIMES ===== */}
            <section ref={timesRef} className="reveal relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-[#F7F5F0] overflow-hidden">
                {/* Patrón geométrico islámico — cuadrados superpuestos rotados */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <defs>
                        <pattern id="islamic-geo-prayers" x="0" y="0" width="160" height="160" patternUnits="userSpaceOnUse">
                            <rect x="20" y="20" width="120" height="120" fill="none" stroke="#C9A646" strokeWidth="0.6" opacity="0.45"/>
                            <rect x="20" y="20" width="120" height="120" fill="none" stroke="#C9A646" strokeWidth="0.6" opacity="0.45" transform="rotate(45 80 80)"/>
                            <circle cx="80" cy="80" r="11" fill="none" stroke="#C9A646" strokeWidth="0.4" opacity="0.4"/>
                            <circle cx="80" cy="80" r="3" fill="#C9A646" opacity="0.3"/>
                            <line x1="80" y1="0"   x2="80" y2="20"  stroke="#C9A646" strokeWidth="0.3" opacity="0.25"/>
                            <line x1="80" y1="140" x2="80" y2="160" stroke="#C9A646" strokeWidth="0.3" opacity="0.25"/>
                            <line x1="0"  y1="80"  x2="20" y2="80"  stroke="#C9A646" strokeWidth="0.3" opacity="0.25"/>
                            <line x1="140" y1="80" x2="160" y2="80" stroke="#C9A646" strokeWidth="0.3" opacity="0.25"/>
                            <line x1="0"   y1="0"   x2="20"  y2="20"  stroke="#C9A646" strokeWidth="0.2" opacity="0.15"/>
                            <line x1="160" y1="0"   x2="140" y2="20"  stroke="#C9A646" strokeWidth="0.2" opacity="0.15"/>
                            <line x1="0"   y1="160" x2="20"  y2="140" stroke="#C9A646" strokeWidth="0.2" opacity="0.15"/>
                            <line x1="160" y1="160" x2="140" y2="140" stroke="#C9A646" strokeWidth="0.2" opacity="0.15"/>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#islamic-geo-prayers)"/>
                </svg>

                {/* Media luna pequeña — esquina inferior izquierda */}
                <div className="absolute bottom-0 left-0 w-28 h-28 sm:w-36 sm:h-36 pointer-events-none opacity-[0.05]" aria-hidden="true">
                    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        <defs>
                            <mask id="crescent-prayers-sm">
                                <rect width="200" height="200" fill="white"/>
                                <circle cx="55" cy="75" r="80" fill="black"/>
                            </mask>
                        </defs>
                        <circle cx="120" cy="100" r="95" fill="#0F3B2E" mask="url(#crescent-prayers-sm)"/>
                    </svg>
                </div>

                {/* Caligrafía árabe "السلام" difuminada al centro */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.04] select-none w-full text-center" aria-hidden="true">
                    <span className="font-serif text-[8rem] sm:text-[12rem] lg:text-[16rem] text-[#0F3B2E] leading-none whitespace-nowrap">
                        السلام
                    </span>
                </div>

                {/* Estrellas de 8 puntas decorativas */}
                <div className="absolute top-6 left-6 w-8 h-8 sm:w-10 sm:h-10 pointer-events-none opacity-[0.08]" aria-hidden="true">
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        <polygon points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35" fill="#C9A646"/>
                    </svg>
                </div>
                <div className="absolute bottom-8 right-8 w-6 h-6 sm:w-8 sm:h-8 pointer-events-none opacity-[0.07]" aria-hidden="true">
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        <polygon points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35" fill="#C9A646"/>
                    </svg>
                </div>

                {/* Silueta de mezquita — base inferior centrada */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[260px] sm:w-[360px] lg:w-[480px] pointer-events-none opacity-[0.035]" aria-hidden="true">
                    <svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet" className="w-full">
                        <rect x="20" y="60" width="18" height="140" fill="#0F3B2E"/>
                        <polygon points="29,40 14,60 44,60" fill="#0F3B2E"/>
                        <rect x="24" y="35" width="10" height="10" fill="#0F3B2E"/>
                        <rect x="282" y="60" width="18" height="140" fill="#0F3B2E"/>
                        <polygon points="291,40 276,60 306,60" fill="#0F3B2E"/>
                        <rect x="286" y="35" width="10" height="10" fill="#0F3B2E"/>
                        <rect x="55" y="100" width="210" height="100" fill="#0F3B2E"/>
                        <ellipse cx="160" cy="100" rx="60" ry="50" fill="#0F3B2E"/>
                        <ellipse cx="90" cy="120" rx="38" ry="32" fill="#0F3B2E"/>
                        <ellipse cx="230" cy="120" rx="38" ry="32" fill="#0F3B2E"/>
                        <rect x="135" y="140" width="50" height="60" fill="white"/>
                        <ellipse cx="160" cy="140" rx="25" ry="18" fill="white"/>
                    </svg>
                </div>

                {/* Caligrafía "بسم الله" — esquina superior discreta */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 pointer-events-none opacity-[0.04] select-none" aria-hidden="true">
                    <span className="font-serif text-6xl sm:text-8xl lg:text-9xl text-[#C9A646] whitespace-nowrap">
                        بسم الله
                    </span>
                </div>

                {/* Minarete lateral derecho */}
                <div className="absolute top-0 right-0 h-full w-12 sm:w-16 pointer-events-none opacity-[0.04]" aria-hidden="true">
                    <svg viewBox="0 0 50 400" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        <rect x="16" y="80" width="18" height="320" fill="#0F3B2E"/>
                        <polygon points="25,50 10,80 40,80" fill="#0F3B2E"/>
                        <rect x="19" y="36" width="12" height="20" fill="#0F3B2E"/>
                        <circle cx="25" cy="26" r="10" fill="#C9A646" opacity="0.5"/>
                    </svg>
                </div>

                <div className="max-w-3xl mx-auto px-5 sm:px-8">
                    <div className="text-center mb-10 sm:mb-12 lg:mb-14">
                        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3">
                            <span className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-[#C9A646]/40" />
                            <span className="w-2 h-2 bg-[#C9A646] rotate-45" />
                            <span className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-[#C9A646]/40" />
                        </div>
                        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F3B2E] leading-[1.3]">
                            {t('navbar', 'prayers')}
                        </h2>
                        <p className="text-[#E8E8E8] text-sm sm:text-base mt-2">{t('footer', 'description')}</p>
                    </div>

                    <div className="home-glass-card p-4 sm:p-6 lg:p-8">
                        <div className="space-y-1 sm:space-y-2">
                            {PRAYER_ORDER.map((key, idx) => {
                                const labelKey = key.charAt(0).toUpperCase() + key.slice(1);
                                const time = prayerTimes[key];
                                const prayerSec = toSeconds(time);
                                const diff = prayerSec - nowSec;
                                const waiting = tiemposEspera?.[key] ?? 0;
                                const past = nowSec - prayerSec;
                                const waitingSec = waiting * 60;
                                const isNext = diff > 0 && PRAYER_ORDER.every(k => {
                                    const pt = toSeconds(prayerTimes[k]);
                                    return pt < 0 || pt <= nowSec || pt >= prayerSec;
                                });
                                const progress = prayerProgress(key, prayerTimes, tiemposEspera, nowSec);

                                return (
                                    <div
                                        key={key}
                                        style={{ animationDelay: `${idx * 0.08}s` }}
                                        className={`animate-fade-in-up ${idx > 0 ? 'border-t border-[#C9A646]/8' : ''}`}
                                    >
                                        <div className={`flex flex-wrap items-center justify-between py-3 sm:py-4 px-2 sm:px-3 rounded-xl transition-all duration-300 ${isNext
                                            ? 'bg-gradient-to-r from-[#0F3B2E]/8 via-[#0F3B2E]/5 to-transparent shadow-sm -mx-1 px-3 sm:px-4'
                                            : 'hover:bg-white/40'}`}>
                                            <div className={`flex items-center gap-2 sm:gap-3 min-w-0 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                                {isNext && (
                                                    <span className="flex items-center gap-1.5 text-[#C9A646]">
                                                        <span className="w-2 h-2 bg-[#C9A646] rotate-45 shrink-0" />
                                                        <span className="text-xs sm:text-sm font-bold uppercase tracking-wider hidden sm:inline">{t('prayers', 'remaining')}</span>
                                                    </span>
                                                )}
                                                {!isNext && <span className="w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />}
                                                <span className={`text-base sm:text-lg font-medium ${isNext ? 'text-[#0F3B2E] font-semibold' : 'text-gray-700'}`}>
                                                    {t('prayers', labelKey)}
                                                </span>
                                            </div>

                                            <div className={`flex items-center gap-3 sm:gap-5 lg:gap-6 text-base ${isRTL ? 'flex-row-reverse' : ''}`}>
                                                <span className="font-semibold text-gray-800 w-10 sm:w-14 text-right font-mono tabular-nums">
                                                    {time || '--:--'}
                                                </span>
                                                {waiting > 0 && (
                                                    <span className="text-gray-500 w-12 sm:w-14 text-right text-sm sm:text-base">
                                                        {waiting}min
                                                    </span>
                                                )}
                                                {waiting === 0 && <span className="w-12 sm:w-14 hidden sm:block" />}
                                                <span className={`text-right font-mono text-sm sm:text-base ${isRTL ? 'text-left' : 'text-right'}`}
                                                      style={{ minWidth: '5.5rem' }}>
                                                    {diff > 0 && (
                                                        <span className="text-red-500 font-semibold whitespace-nowrap">{fmtDiff(diff)}</span>
                                                    )}
                                                    {diff <= 0 && past >= 0 && past < waitingSec && (
                                                        <span className="text-orange-500 font-semibold whitespace-nowrap">{t('time', 'iqama')} {fmtDiff(waitingSec - past)}</span>
                                                    )}
                                                    {diff <= 0 && (!waiting || past >= waitingSec) && (
                                                        <span className="text-green-600 font-semibold whitespace-nowrap">{fmtDiff(diff)}</span>
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                        {waiting > 0 && (
                                            <div className="prayer-progress mx-2 sm:mx-3 mb-1">
                                                <div
                                                    className="prayer-progress-bar animate-progress-fill"
                                                    style={{ width: `${Math.min(100, progress)}%` }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="text-center mt-8 sm:mt-10">
                        <Link
                            href="/horarios"
                            className="inline-flex items-center gap-2 text-base sm:text-lg text-[#0F3B2E]/70 hover:text-[#0F3B2E] font-medium transition group py-2"
                        >
                            {t('home', 'btn_prayer_times')}
                            <span className="link-arrow">→</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ——— Separador ——— */}
            <div className="flex items-center justify-center gap-1.5 py-3 sm:py-4 bg-gradient-to-b from-[#F7F5F0] to-[#F7F5F0]" aria-hidden="true">
                {[0,1,2,3,4,5,6,7,8].map(i => (
                    <span key={i} className={`block w-1 h-1 bg-[#C9A646]/${i % 2 === 0 ? '40' : '25'} rotate-45`} />
                ))}
            </div>

            {/* ===== ABOUT ===== */}
            <section ref={aboutRef} className="reveal relative py-16 sm:py-20 lg:py-24 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#F7F5F0] to-[#efece4]" />

                {/* Caligrafía "السلام" — watermark central */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.04] select-none text-center" aria-hidden="true">
                    <span className="font-serif text-[10rem] sm:text-[14rem] lg:text-[18rem] text-[#0F3B2E] leading-none whitespace-nowrap tracking-[-0.05em]">
                        السلام
                    </span>
                </div>

                {/* Silueta mezquita — base inferior */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[280px] sm:w-[380px] lg:w-[500px] pointer-events-none opacity-[0.035]" aria-hidden="true">
                    <svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet" className="w-full">
                        <rect x="20" y="60" width="18" height="140" fill="#0F3B2E"/>
                        <polygon points="29,40 14,60 44,60" fill="#0F3B2E"/>
                        <rect x="24" y="35" width="10" height="10" fill="#0F3B2E"/>
                        <rect x="282" y="60" width="18" height="140" fill="#0F3B2E"/>
                        <polygon points="291,40 276,60 306,60" fill="#0F3B2E"/>
                        <rect x="286" y="35" width="10" height="10" fill="#0F3B2E"/>
                        <rect x="55" y="100" width="210" height="100" fill="#0F3B2E"/>
                        <ellipse cx="160" cy="100" rx="60" ry="50" fill="#0F3B2E"/>
                        <ellipse cx="90" cy="120" rx="38" ry="32" fill="#0F3B2E"/>
                        <ellipse cx="230" cy="120" rx="38" ry="32" fill="#0F3B2E"/>
                        <rect x="135" y="140" width="50" height="60" fill="white"/>
                        <ellipse cx="160" cy="140" rx="25" ry="18" fill="white"/>
                    </svg>
                </div>

                <div className="max-w-3xl mx-auto px-5 sm:px-8">
                    <div className="text-center mb-10 sm:mb-12 lg:mb-14">
                        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3">
                            <span className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-[#C9A646]/40" />
                            <span className="w-2 h-2 bg-[#C9A646] rotate-45" />
                            <span className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-[#C9A646]/40" />
                        </div>
                        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F3B2E] leading-[1.3]">
                            {t('home', 'info_community_title')}
                        </h2>
                        <p className="text-[#E8E8E8] text-sm sm:text-base mt-2">{t('footer', 'description')}</p>
                    </div>

                    <div className="home-glass-card p-5 sm:p-6 lg:p-8">
                        <p className={`text-gray-600 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 ${isRTL ? 'text-right' : ''}`}>
                            {t('home', 'info_community_text')}
                        </p>
                        <div className="space-y-3 mb-6 sm:mb-8">
                            <div className="footer-glass-card !bg-white/60 !backdrop-blur-md !border-[#C9A646]/10">
                                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                    <svg className="w-5 h-5 sm:w-5 sm:h-5 text-[#C9A646] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                    </svg>
                                    <p className="text-base sm:text-lg text-gray-700">Carrer dels Carboners, 11 · 43700 El Vendrell</p>
                                </div>
                            </div>
                            <div className="footer-glass-card !bg-white/60 !backdrop-blur-md !border-[#C9A646]/10">
                                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                    <svg className="w-5 h-5 sm:w-5 sm:h-5 text-[#C9A646] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                    </svg>
                                    <a href="mailto:info@mezquita-alquds.cat" className="text-base sm:text-lg text-gray-700 hover:text-[#C9A646] transition">info@mezquita-alquds.cat</a>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 sm:p-7 text-center border border-[#C9A646]/15 mb-6 sm:mb-8">
                            <div className="text-[#C9A646]/20 text-2xl sm:text-3xl mb-3 font-serif leading-none select-none">﷽</div>
                            <div className="w-8 h-px bg-[#C9A646]/20 mx-auto mb-4" />
                            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                                "Y hemos hecho de vosotros una comunidad moderada para que seáis testigos ante los hombres."
                            </p>
                            <p className="text-xs sm:text-sm text-[#C9A646] mt-3 font-medium tracking-wide">— Corán 2:143</p>
                        </div>
                        <div className="text-center">
                            <Link
                                href="/ubicacion"
                                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#0F3B2E] to-[#09291e] text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 hover:from-[#09291e] hover:to-[#061a10] transition-all duration-300 group min-h-[48px]"
                            >
                                {t('ubicacion', 'btn')}
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 transition-transform shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d={isRTL ? 'M15.75 19.5L8.25 12l7.5-7.5' : 'M8.25 4.5l7.5 7.5-7.5 7.5'} />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ——— Separador ——— */}
            <div className="flex items-center justify-center gap-1.5 py-3 sm:py-4 bg-white" aria-hidden="true">
                {[0,1,2,3,4,5,6,7,8].map(i => (
                    <span key={i} className={`block w-1 h-1 bg-[#C9A646]/${i % 2 === 0 ? '40' : '25'} rotate-45`} />
                ))}
            </div>

            {/* ===== LATEST NEWS ===== */}
            {latestNews?.length > 0 && (
                <section ref={newsRef} className="reveal relative py-16 sm:py-20 lg:py-24 bg-white overflow-hidden">
                    <div className="max-w-6xl mx-auto px-5 sm:px-8 relative">
                        <div className="text-center mb-10 sm:mb-12 lg:mb-14">
                            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3">
                                <span className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-[#C9A646]/40" />
                                <span className="w-2 h-2 bg-[#C9A646] rotate-45" />
                                <span className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-[#C9A646]/40" />
                            </div>
                            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F3B2E] leading-[1.3]">
                                {t('noticias', 'title')}
                            </h2>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6 lg:gap-8">
                            {latestNews.map((noticia, idx) => {
                                const dateStr = noticia.fecha_publicacion
                                    ? new Date(noticia.fecha_publicacion).toLocaleDateString(
                                        locale === 'ar' ? 'ar-EG' : locale === 'ca' ? 'ca-ES' : locale === 'en' ? 'en-US' : 'es-ES',
                                        { day: 'numeric', month: 'long', year: 'numeric' }
                                      )
                                    : '';
                                return (
                                    <Link
                                        key={noticia.id}
                                        href={`/noticias/${noticia.id}`}
                                        className="news-card-premium group block bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl"
                                        style={{ animation: `fade-in-up 0.6s ease-out ${idx * 0.12}s both` }}
                                    >
                                        <div className="relative overflow-hidden">
                                            {noticia.imagen ? (
                                                <>
                                                    <img
                                                        src={noticia.imagen}
                                                        alt={noticia.titulo}
                                                        className="w-full h-44 sm:h-48 object-cover group-hover:scale-105 transition duration-700"
                                                        loading="lazy"
                                                        style={{ filter: 'saturate(0.8)' }}
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F3B2E]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                                </>
                                            ) : (
                                                <div className="w-full h-44 sm:h-48 bg-gradient-to-br from-[#0F3B2E]/5 to-[#C9A646]/5 flex items-center justify-center">
                                                    <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#C9A646]/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                                                    </svg>
                                                </div>
                                            )}
                                            {dateStr && (
                                                <div className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} bg-white/90 backdrop-blur-sm rounded-lg px-2.5 py-1.5 text-sm sm:text-base text-gray-600 font-medium shadow-sm flex items-center gap-1.5`}>
                                                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C9A646] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                                                    </svg>
                                                    <span className="truncate">{dateStr}</span>
                                                </div>
                                            )}
                                            <div className={`absolute top-3 ${isRTL ? 'left-3' : 'right-3'} bg-[#0F3B2E]/80 backdrop-blur-sm text-white text-xs sm:text-sm font-bold px-2.5 py-1 rounded-md uppercase tracking-wider`}>
                                                {t('noticias', 'title')}
                                            </div>
                                        </div>
                                        <div className={`p-4 sm:p-5 ${isRTL ? 'text-right' : ''}`}>
                                            <h3 className="font-display text-lg sm:text-xl font-semibold text-[#0F3B2E] group-hover:text-[#C9A646] transition-colors duration-300 mb-2 leading-snug">
                                                {noticia.titulo}
                                            </h3>
                                            <p className={`text-gray-500 text-base leading-relaxed line-clamp-3 ${isRTL ? 'text-right' : ''}`}>
                                                {noticia.contenido}
                                            </p>
                                            <div className={`mt-3 sm:mt-4 flex items-center gap-1 text-base sm:text-lg text-[#C9A646] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isRTL ? 'flex-row-reverse justify-start' : ''}`}>
                                                <span>{t('common', 'read')}</span>
                                                <span className="link-arrow !opacity-100 !transform-none">→</span>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>

                        <div className="text-center mt-10 sm:mt-12">
                            <Link
                                href="/noticias"
                                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-[#0F3B2E] to-[#09291e] text-white rounded-full text-base sm:text-lg font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group min-h-[48px]"
                            >
                                {t('noticias', 'title')}
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 transition-transform shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d={isRTL ? 'M15.75 19.5L8.25 12l7.5-7.5' : 'M8.25 4.5l7.5 7.5-7.5 7.5'} />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </section>
            )}
        </MainLayout>
    );
}
