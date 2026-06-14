import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { useTranslation } from '../hooks/useTranslation';
import MapButton from './MapButton';

function BackToTop() {
    const { isRTL } = useTranslation();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 400);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-8 ${isRTL ? 'left-8' : 'right-8'} z-40 w-12 h-12 bg-[#0F3B2E] text-[#C9A646] rounded-full shadow-2xl hover:bg-[#09291e] hover:-translate-y-1 hover:shadow-[#C9A646]/20 transition-all duration-300 flex items-center justify-center group
                ${visible ? 'animate-btt-appear' : 'opacity-0 pointer-events-none'}`}
            aria-label="Volver arriba"
        >
            <svg className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 48 48">
                <circle cx="24" cy="24" r="22" fill="none" stroke="#C9A646" strokeWidth="1.5"
                    strokeDasharray="138" strokeDashoffset="138"
                    className="transition-all duration-700 group-hover:stroke-dashoffset-0"
                    style={{ strokeDashoffset: visible ? 0 : 138, transition: 'stroke-dashoffset 0.8s ease' }}
                />
            </svg>
        </button>
    );
}

export default function Footer() {
    const { t, isRTL } = useTranslation();
    const { props } = usePage();
    const ubicacion = props?.ubicacion ?? null;
    const lat = ubicacion?.latitud || 41.230484;
    const lng = ubicacion?.longitud || 1.532144;

    return (
        <footer className="relative bg-gradient-to-br from-[#0F3B2E] via-[#061a10] to-[#04150c] text-white pt-16 pb-6 mt-20 overflow-hidden">
            {/* Patrón geométrico islámico de fondo */}
            <div className="footer-pattern">
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                    <defs>
                        <pattern id="girih" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                            <polygon points="60,0 90,30 90,70 60,100 30,70 30,30" fill="none" stroke="#C9A646" strokeWidth="0.5" opacity="0.5" />
                            <polygon points="60,20 80,40 80,60 60,80 40,60 40,40" fill="none" stroke="#C9A646" strokeWidth="0.3" opacity="0.3" />
                            <line x1="60" y1="0" x2="60" y2="100" stroke="#C9A646" strokeWidth="0.3" opacity="0.2" />
                            <line x1="0" y1="60" x2="120" y2="60" stroke="#C9A646" strokeWidth="0.3" opacity="0.2" />
                            <line x1="30" y1="30" x2="90" y2="70" stroke="#C9A646" strokeWidth="0.3" opacity="0.15" />
                            <line x1="30" y1="70" x2="90" y2="30" stroke="#C9A646" strokeWidth="0.3" opacity="0.15" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#girih)" />
                </svg>
            </div>

            {/* Borde superior decorativo con patrón */}
            <div className="absolute top-0 left-0 right-0 h-2 flex">
                <div className="w-full h-full" style={{
                    background: 'repeating-linear-gradient(90deg, #C9A646 0px, #C9A646 2px, transparent 2px, transparent 8px, #C9A646 8px, #C9A646 10px, transparent 10px, transparent 16px)',
                    opacity: 0.6,
                }} />
            </div>
            <div className="absolute top-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A646]/20 to-transparent" />

            <BackToTop />

            <div className="relative max-w-6xl mx-auto px-6">
                <div className="grid md:grid-cols-5 gap-x-8 gap-y-12">
                    {/* COLUMNA IZQUIERDA - LOGO (2/5) */}
                    <div className="md:col-span-2 flex flex-col items-start space-y-5 md:pr-8 md:border-r border-white/5">
                        <div className="flex items-center gap-4">
                            <img src="/img/mezquitaAlquds_logo3.png" className="h-14 brightness-0 invert opacity-80" alt="Logo" loading="lazy" />
                            <div>
                                <p className="text-lg font-bold tracking-wide">{t('footer', 'title')}</p>
                                <p className="text-xs text-[#C9A646] font-medium tracking-widest uppercase">{t('footer', 'subtitle')}</p>
                            </div>
                        </div>
                        <p className="text-sm text-white/40 leading-relaxed max-w-sm">{t('footer', 'description')}</p>
                        <div className="flex items-center gap-4 pt-2">
                            {[
                                { href: '#', icon: 'M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' },
                                { href: '#', icon: 'M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z M14.222 7.685c-1.066-.48-2.338-.367-3.2.36-.86.727-1.134 1.914-.785 3.01.35 1.095 1.298 1.866 2.457 1.995.166.018.332.027.5.027.96 0 1.86-.382 2.522-1.06.66-.68.994-1.594.93-2.558-.066-.964-.523-1.815-1.28-2.374l-.14-.4z' },
                                { href: '#', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
                            ].map((social, i) => (
                                <a key={i} href={social.href}
                                   className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:bg-[#C9A646]/20 hover:border-[#C9A646]/40 hover:text-[#C9A646] transition-all duration-300">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d={social.icon} />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* ENLACES (1/5) */}
                    <div className="flex flex-col items-start space-y-4">
                        <p className="text-sm font-bold text-white/90 tracking-wide mb-3 flex items-center gap-2">
                            <span className="w-1 h-4 bg-[#C9A646] rounded-full" />
                            {t('footer', 'links_title')}
                        </p>
                        {[
                            { href: '/', label: t('navbar', 'home') },
                            { href: '/horarios', label: t('navbar', 'prayers') },
                            { href: '/ubicacion', label: t('navbar', 'location') },
                            { href: '/contacto', label: t('navbar', 'contact') },
                        ].map(({ href, label }) => (
                            <Link key={href} href={href}
                                  className="group relative text-sm text-white/45 hover:text-[#C9A646] transition-all duration-300 flex items-center gap-1 py-1">
                                <span className="link-arrow">→</span>
                                {label}
                            </Link>
                        ))}
                    </div>

                    {/* CONTACTO (1/5) */}
                    <div className="flex flex-col items-start space-y-4">
                        <p className="text-sm font-bold text-white/90 tracking-wide mb-3 flex items-center gap-2">
                            <span className="w-1 h-4 bg-[#C9A646] rounded-full" />
                            {t('footer', 'contact_title')}
                        </p>
                        <div className="footer-glass-card w-full">
                            <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#C9A646] mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                </svg>
                                <p className="text-sm text-white/60 leading-relaxed">Carrer dels Carboners, 11<br />43700 El Vendrell, Tarragona</p>
                            </div>
                        </div>
                        <div className="footer-glass-card w-full">
                            <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#C9A646] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                </svg>
                                <a href="mailto:info@mezquita-alquds.cat" className="text-sm text-white/60 hover:text-[#C9A646] transition">info@mezquita-alquds.cat</a>
                            </div>
                        </div>
                        <div className="footer-glass-card w-full">
                            <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#C9A646] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                </svg>
                                <span className="text-sm text-white/60">+34 977 66 55 44</span>
                            </div>
                        </div>
                    </div>

                    {/* MAPA (1/5) */}
                    <div className="flex flex-col items-start space-y-4">
                        <p className="text-sm font-bold text-white/90 tracking-wide mb-3 flex items-center gap-2">
                            <span className="w-1 h-4 bg-[#C9A646] rounded-full" />
                            {t('footer', 'links_title')}
                        </p>
                        <div className="footer-glass-card w-full p-4">
                            <p className="text-sm text-white/50 mb-3 flex items-center gap-2">
                                <svg className="w-4 h-4 text-[#C9A646]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                </svg>
                                Carrer dels Carboners, 11
                            </p>
                            <MapButton
                                lat={lat}
                                lng={lng}
                                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#C9A646] to-[#b88a36] text-[#0F3B2E] px-4 py-3 rounded-lg text-sm font-bold shadow-lg hover:shadow-[#C9A646]/30 hover:-translate-y-0.5 transition-all duration-300"
                            >
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                </svg>
                                {t('footer', 'google_maps')}
                            </MapButton>
                        </div>
                    </div>
                </div>

                {/* COPYRIGHT */}
                <div className="relative mt-14 pt-6">
                    <div className="absolute top-0 left-0 right-0 flex justify-center">
                        <div className="flex items-center gap-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className="flex items-center">
                                    <span className="w-1.5 h-1.5 bg-[#C9A646]/40 rotate-45" />
                                    <span className="w-8 h-px bg-gradient-to-r from-[#C9A646]/20 to-transparent" />
                                </div>
                            ))}
                            <span className="w-1.5 h-1.5 bg-[#C9A646]/60 rotate-45" />
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className="flex items-center">
                                    <span className="w-8 h-px bg-gradient-to-l from-[#C9A646]/20 to-transparent" />
                                    <span className="w-1.5 h-1.5 bg-[#C9A646]/40 rotate-45" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={`flex flex-col md:flex-row items-center justify-between gap-2 pt-4 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
                        <p className="text-xs text-white/25 tracking-wide">
                            &copy; {new Date().getFullYear()} Mezquita Al-Quds &mdash; {t('footer', 'rights')}
                        </p>
                        <p className="text-xs text-white/20 tracking-wider">
                            <span className="text-[#C9A646]/40">✦</span> Designed with <span className="text-[#C9A646]/40">■</span> in El Vendrell
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
