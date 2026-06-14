import { useState, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { useTranslation } from '../hooks/useTranslation';
import NotificationBell from './NotificationBell';

const LANGUAGES = [
    { code: 'es', label: 'Español' },
    { code: 'ca', label: 'Català' },
    { code: 'en', label: 'English' },
    { code: 'ar', label: 'العربية' },
];

const MODULE_MAP = {
    '/horarios': 'horarios',
    '/noticias': 'noticias',
    '/imam': 'imam',
    '/ubicacion': 'ubicacion',
    '/facturas': 'facturas',
    '/donativos': 'donativos',
};

export default function Navbar() {
    const { t, locale, isRTL } = useTranslation();
    const { auth, modules } = usePage().props;
    const [scrolled, setScrolled] = useState(false);
    const [atBottom, setAtBottom] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [hoveredLink, setHoveredLink] = useState(null);
    const navRef = useRef(null);
    const linkRefs = useRef([]);

    useEffect(() => {
        const onScroll = () => {
            const scrollY = window.scrollY;
            setScrolled(scrollY > 50);
            setAtBottom(scrollY + window.innerHeight >= document.documentElement.scrollHeight - 100);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        const close = () => setLangOpen(false);
        document.addEventListener('click', close);
        return () => document.removeEventListener('click', close);
    }, []);

    useEffect(() => {
        fetch('/api/notificaciones')
            .then(res => res.json())
            .then(data => setNotifications(data))
            .catch(() => {});
    }, []);

    useEffect(() => {
        if (!mobileOpen) return;
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    useEffect(() => {
        const pathname = window.location.pathname;
        const idx = allNavLinks.findIndex(l => l.href !== '/' && pathname.startsWith(l.href));
        if (pathname === '/') setActiveIndex(0);
        else if (idx !== -1) setActiveIndex(idx);
        else setActiveIndex(null);
    }, []);

    const allNavLinks = [
        { href: '/', label: t('navbar', 'home') },
        { href: '/horarios', label: t('navbar', 'prayers') },
        { href: '/noticias', label: t('adminModules', 'news') },
        { href: '/imam', label: t('navbar', 'imam') },
        { href: '/ubicacion', label: t('navbar', 'location') },
        { href: '/contacto', label: t('navbar', 'contact') },
    ];

    const navLinks = allNavLinks.filter(link => {
        const mod = MODULE_MAP[link.href];
        return !mod || (modules?.[mod] ?? true);
    });

    const isLoggedIn = auth?.user !== null;
    const isAdmin = auth?.user?.is_admin === true;

    const allUserLinks = isLoggedIn ? [
        { href: '/facturas', label: t('adminModules', 'invoices') },
        { href: '/donativos', label: t('adminModules', 'donations') },
    ] : [];

    const userLinks = allUserLinks.filter(link => {
        const mod = MODULE_MAP[link.href];
        return !mod || (modules?.[mod] ?? true);
    });

    const handleMouseMove = (e, index) => {
        if (!navRef.current) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const offsetX = (e.clientX - rect.left - rect.width / 2) * 0.15;
        const offsetY = (e.clientY - rect.top - rect.height / 2) * 0.15;
        setHoveredLink({ index, x: offsetX, y: offsetY });
    };

    const handleMouseLeave = () => {
        setHoveredLink(null);
    };

    const diamondOffset = activeIndex !== null && linkRefs.current[activeIndex]
        ? linkRefs.current[activeIndex].offsetLeft + linkRefs.current[activeIndex].offsetWidth / 2 - 4
        : null;

    return (
        <nav
            ref={navRef}
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out
                ${atBottom ? 'opacity-0 pointer-events-none' : ''}
                ${scrolled
                    ? 'py-1.5 bg-white/85 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.06)] border-b border-[#C9A646]/15'
                    : 'py-5 bg-white/60 backdrop-blur-xl border-b border-transparent'}`}
        >
            <div className={`max-w-7xl mx-auto px-6 flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                {/* LOGO */}
                <Link href="/" className={`flex items-center gap-3 group shrink-0 ${isRTL ? 'ml-auto' : ''}`}>
                    <img
                        src="/img/mezquitaAlquds_logo2.png"
                        className={`transition-all duration-500 ${scrolled ? 'h-8' : 'h-12'} group-hover:scale-105 group-hover:brightness-110`}
                        alt="Logo"
                        loading="lazy"
                    />
                    <div className={`transition-all duration-500 overflow-hidden ${scrolled ? 'max-w-0 opacity-0 md:max-w-xs md:opacity-100' : 'max-w-xs opacity-100'} ${isRTL ? 'text-right' : ''}`}>
                        <p className="text-xs text-gray-400 font-medium leading-tight">{t('navbar', 'subtitle')}</p>
                        <p className={`font-bold text-[#0F3B2E] tracking-wide transition-all duration-500 ${scrolled ? 'text-lg' : 'text-xl'}`}>{t('navbar', 'title')}</p>
                    </div>
                    <div className={`md:hidden transition-all duration-500 ${scrolled ? 'block' : 'hidden'}`}>
                        <p className="text-base font-bold text-[#0F3B2E] tracking-wide">Al‑Quds</p>
                    </div>
                </Link>

                {/* MENÚ DESKTOP */}
                <div className={`hidden md:flex items-center gap-0.5 text-sm font-medium ${isRTL ? 'mr-auto flex-row-reverse' : 'ml-auto'}`}>
                    <div className="relative flex items-center">
                        {navLinks.map((link, i) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                ref={el => linkRefs.current[i] = el}
                                onMouseMove={(e) => handleMouseMove(e, i)}
                                onMouseLeave={handleMouseLeave}
                                className={`relative px-4 py-2.5 transition-all duration-300 rounded-lg
                                    ${activeIndex === i
                                        ? 'text-[#0F3B2E]'
                                        : 'text-gray-500 hover:text-[#0F3B2E]'}`}
                                style={hoveredLink?.index === i ? {
                                    transform: `translate(${hoveredLink.x}px, ${hoveredLink.y}px)`,
                                } : {}}
                            >
                                {link.label}
                            </Link>
                        ))}
                        {diamondOffset !== null && (
                            <span
                                className="nav-diamond hidden lg:block"
                                style={{ left: `${diamondOffset}px` }}
                            />
                        )}
                    </div>

                    {userLinks.map(link => (
                        <Link key={link.href} href={link.href}
                              className="relative px-4 py-2.5 text-gray-500 hover:text-[#0F3B2E] transition rounded-lg">
                            {link.label}
                        </Link>
                    ))}

                    <NotificationBell notifications={notifications} />

                    {/* SELECTOR IDIOMA MINIMALISTA */}
                    <div className="relative">
                        <button
                            className="flex items-center justify-center w-10 h-10 rounded-xl border border-gray-200/60 bg-white/70 hover:bg-white hover:border-[#C9A646]/40 hover:shadow-md transition-all duration-300"
                            onClick={e => { e.stopPropagation(); setLangOpen(v => !v); }}
                        >
                            <img src={`/img/lang/${locale}.png`} className="h-5 w-5 rounded-sm" alt={locale} loading="lazy" />
                        </button>
                        {langOpen && (
                            <div className={`absolute ${isRTL ? 'left-0' : 'right-0'} mt-2 w-40 bg-white/95 backdrop-blur-2xl border border-gray-100/80 rounded-2xl shadow-2xl py-2 overflow-hidden`}
                                 style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.02)' }}>
                                {LANGUAGES.map(l => (
                                    <a key={l.code} href={`/lang/${l.code}`}
                                       className={`flex items-center gap-3 px-4 py-2.5 hover:bg-[#0F3B2E]/5 transition group ${isRTL ? 'flex-row-reverse' : ''}`}>
                                        <img src={`/img/lang/${l.code}.png`} className="h-5 w-5 rounded-sm" alt={l.code} loading="lazy" />
                                        <span className="text-sm font-medium text-gray-600 group-hover:text-[#0F3B2E] transition">{l.label}</span>
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* BOTÓN LOGIN/REGISTRO */}
                    {isLoggedIn ? (
                        <div className="flex items-center gap-2">
                            {isAdmin ? (
                                <Link href="/admin"
                                      className="px-5 py-2.5 bg-gradient-to-r from-[#C9A646] to-[#b88a36] text-white rounded-xl text-sm font-semibold shadow-lg hover:shadow-[#C9A646]/30 hover:-translate-y-0.5 transition-all duration-300">
                                    {t('admin', 'manage')}
                                </Link>
                            ) : (
                                <Link href="/logout" method="post" as="button"
                                      className="px-5 py-2.5 bg-gradient-to-r from-red-500/90 to-red-600/90 text-white rounded-xl text-sm font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                                    {t('auth', 'logout')}
                                </Link>
                            )}
                        </div>
                    ) : (
                        <Link href="/login"
                              className="relative px-5 py-2.5 bg-gradient-to-r from-[#0F3B2E] via-[#09291e] to-[#0F3B2E] animate-shimmer-btn text-white rounded-xl text-sm font-semibold shadow-lg overflow-hidden group">
                            <span className="relative z-10">{t('auth', 'login')}</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </Link>
                    )}
                </div>

                {/* HAMBURGUESA */}
                <button
                    className={`md:hidden text-[#0F3B2E] p-2 hover:bg-[#0F3B2E]/5 rounded-lg transition ${isRTL ? 'ml-auto mr-2' : 'ml-auto'}`}
                    onClick={() => setMobileOpen(v => !v)}
                    aria-label="Toggle menu"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        {mobileOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* MENÚ MÓVIL - PANEL LATERAL */}
            {mobileOpen && (
                <div className="fixed inset-0 z-40 md:hidden" onClick={() => setMobileOpen(false)}>
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
                    <div
                        className={`absolute top-0 ${isRTL ? 'left-0' : 'right-0'} h-full w-80 max-w-[85vw] bg-white/90 backdrop-blur-2xl shadow-2xl overflow-y-auto`}
                        onClick={e => e.stopPropagation()}
                        style={{
                            animation: 'slide-in 0.3s ease-out forwards',
                        }}
                    >
                        <style>{`
                            @keyframes slide-in {
                                from { transform: translateX(${isRTL ? '-100%' : '100%'}); }
                                to { transform: translateX(0); }
                            }
                        `}</style>
                        <div className="pt-20 pb-8 px-6 space-y-1">
                            {navLinks.map(link => (
                                <Link key={link.href} href={link.href}
                                      className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition group
                                          ${activeIndex === navLinks.indexOf(link)
                                              ? 'text-[#0F3B2E] bg-[#0F3B2E]/5 font-semibold'
                                              : 'text-gray-700 hover:text-[#0F3B2E] hover:bg-[#0F3B2E]/5'}`}
                                      onClick={() => setMobileOpen(false)}>
                                    <span className="w-1.5 h-1.5 bg-[#C9A646] rotate-45 shrink-0" />
                                    {link.label}
                                </Link>
                            ))}

                            {userLinks.map(link => (
                                <Link key={link.href} href={link.href}
                                      className="flex items-center gap-3 px-4 py-3.5 text-gray-700 hover:text-[#0F3B2E] hover:bg-[#0F3B2E]/5 rounded-xl transition"
                                      onClick={() => setMobileOpen(false)}>
                                    <span className="w-1.5 h-1.5 bg-[#C9A646] rotate-45 shrink-0" />
                                    {link.label}
                                </Link>
                            ))}

                            <div className="px-4 py-4">
                                <NotificationBell notifications={notifications} />
                            </div>

                            <div className={`flex gap-2 px-4 pt-4 pb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                {LANGUAGES.map(l => (
                                    <a key={l.code} href={`/lang/${l.code}`}
                                       className={`flex items-center gap-2 px-3 py-2 border border-gray-200/60 rounded-xl text-xs hover:bg-white hover:border-[#C9A646]/30 hover:shadow-sm transition-all ${l.code === locale ? 'bg-[#0F3B2E]/5 border-[#C9A646]/30' : 'bg-white/50'}`}>
                                        <img src={`/img/lang/${l.code}.png`} className="h-4 w-4 rounded-sm" alt={l.code} loading="lazy" />
                                        {l.code === locale && <span className="font-medium text-[#0F3B2E]">{l.label}</span>}
                                    </a>
                                ))}
                            </div>

                            <div className="pt-4 px-4">
                                {isLoggedIn ? (
                                    <div className="flex flex-col gap-2">
                                        {isAdmin ? (
                                            <Link href="/admin"
                                                  className="px-4 py-3.5 bg-gradient-to-r from-[#C9A646] to-[#b88a36] text-white rounded-xl text-sm text-center font-semibold shadow-md transition">
                                                {t('admin', 'manage')}
                                            </Link>
                                        ) : (
                                            <Link href="/logout" method="post" as="button"
                                                  className="px-4 py-3.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl text-sm text-center font-semibold shadow-md transition">
                                                {t('auth', 'logout')}
                                            </Link>
                                        )}
                                    </div>
                                ) : (
                                    <Link href="/login"
                                          className="block px-4 py-3.5 bg-gradient-to-r from-[#0F3B2E] to-[#09291e] text-white rounded-xl text-sm text-center font-semibold shadow-md transition hover:shadow-lg">
                                        {t('auth', 'login')}
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
