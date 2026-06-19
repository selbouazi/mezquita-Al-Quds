import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { useTranslation } from '../hooks/useTranslation';
import NotificationBell from './NotificationBell';

const LANGUAGES = [
    { code: 'es', label: 'Español', dir: 'ltr' },
    { code: 'ca', label: 'Català', dir: 'ltr' },
    { code: 'en', label: 'English', dir: 'ltr' },
    { code: 'ar', label: 'العربية', dir: 'rtl' },
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
    const [mobileOpen, setMobileOpen] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null);
    const navRef = useRef(null);
    const mobilePanelRef = useRef(null);
    const langBtnRef = useRef(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
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
        const idx = navLinks.findIndex(l => l.href !== '/' && pathname.startsWith(l.href));
        setActiveIndex(pathname === '/' ? 0 : idx !== -1 ? idx : null);
    }, []);

    const closeMobile = useCallback(() => setMobileOpen(false), []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (langOpen && langBtnRef.current && !langBtnRef.current.contains(e.target)) {
                setLangOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [langOpen]);

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

    const isLoggedIn = !!auth?.user;
    const isAdmin = auth?.user?.is_admin === true;

    const allUserLinks = isLoggedIn ? [
        { href: '/facturas', label: t('adminModules', 'invoices') },
        { href: '/donativos', label: t('adminModules', 'donations') },
    ] : [];

    const userLinks = allUserLinks.filter(link => {
        const mod = MODULE_MAP[link.href];
        return !mod || (modules?.[mod] ?? true);
    });

    return (
        <>
        <nav ref={navRef} className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out
            ${scrolled
                ? 'py-1.5 bg-white/85 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.06)] border-b border-[#C9A646]/15'
                : 'py-5 bg-gradient-to-b from-white/80 via-white/50 to-transparent backdrop-blur-xl border-b border-transparent'}`}>

            <div className={`max-w-7xl mx-auto px-5 flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                {/* LOGO */}
                <Link href="/" className={`flex items-center gap-3 group shrink-0 ${isRTL ? 'ml-auto' : ''}`}>
                    <img src="/img/mezquitaAlquds_logo2.png"
                         className={`transition-all duration-500 ${scrolled ? 'h-8' : 'h-11 sm:h-12'} group-hover:scale-105`}
                         alt="Logo" loading="lazy"
                    />
                    <div className={`transition-all duration-500 overflow-hidden ${scrolled ? 'max-w-0 opacity-0 md:max-w-xs md:opacity-100' : 'max-w-xs opacity-100'}`}>
                        <p className="text-xs text-gray-400 font-medium leading-tight">{t('navbar', 'subtitle')}</p>
                        <p className={`font-bold text-[#0F3B2E] tracking-wide transition-all duration-500 ${scrolled ? 'text-lg' : 'text-xl'}`}>{t('navbar', 'title')}</p>
                    </div>
                    <div className="md:hidden">
                        <p className={`text-base font-bold text-[#0F3B2E] tracking-wide transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-0 max-w-0 overflow-hidden'}`}>Al‑Quds</p>
                    </div>
                </Link>

                {/* DESKTOP MENU */}
                <div className={`hidden md:flex items-center gap-0.5 text-sm font-medium ${isRTL ? 'mr-auto flex-row-reverse' : 'ml-auto'}`}>
                    <div className="relative flex items-center">
                        {navLinks.map((link, i) => (
                            <Link key={link.href} href={link.href}
                                  className={`relative px-4 py-2.5 transition-all duration-300 rounded-lg
                                      ${activeIndex === i
                                          ? 'text-[#0F3B2E] bg-[#0F3B2E]/5'
                                          : 'text-gray-500 hover:text-[#0F3B2E] hover:bg-[#0F3B2E]/5'}`}>
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {userLinks.map(link => (
                        <Link key={link.href} href={link.href}
                              className="relative px-4 py-2.5 text-gray-500 hover:text-[#0F3B2E] hover:bg-[#0F3B2E]/5 transition rounded-lg">
                            {link.label}
                        </Link>
                    ))}

                    <NotificationBell notifications={notifications} />

                    {/* LANGUAGE SELECTOR */}
                    <div className="relative" ref={langBtnRef}>
                        <button
                            className="flex items-center justify-center w-10 h-10 rounded-xl border border-gray-200/60 bg-white/70 hover:bg-white hover:border-[#C9A646]/40 hover:shadow-md transition-all duration-300"
                            onClick={() => setLangOpen(v => !v)}
                            aria-label="Select language"
                        >
                            <img src={`/img/lang/${locale}.png`} className="h-5 w-5 rounded-sm" alt={locale} loading="lazy" />
                        </button>
                        {langOpen && (
                            <div className={`absolute ${isRTL ? 'left-0' : 'right-0'} mt-2 w-40 bg-white/95 backdrop-blur-2xl border border-gray-100/80 rounded-2xl shadow-2xl py-2 overflow-hidden z-50`}
                                 style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}>
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

                    {/* LOGIN / ADMIN */}
                    {isLoggedIn ? (
                        <Link href={isAdmin ? '/admin' : '/logout'}
                              method={isAdmin ? 'get' : 'post'} as={isAdmin ? undefined : 'button'}
                              className={`px-5 py-2.5 rounded-xl text-sm font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300
                                  ${isAdmin
                                      ? 'bg-gradient-to-r from-[#C9A646] to-[#b88a36] text-white'
                                      : 'bg-gradient-to-r from-red-500/90 to-red-600/90 text-white'}`}>
                            {isAdmin ? t('admin', 'manage') : t('auth', 'logout')}
                        </Link>
                    ) : (
                        <Link href="/login"
                              className="relative px-5 py-2.5 bg-gradient-to-r from-[#0F3B2E] via-[#09291e] to-[#0F3B2E] text-white rounded-xl text-sm font-semibold shadow-lg overflow-hidden group">
                            <span className="relative z-10">{t('auth', 'login')}</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </Link>
                    )}
                </div>

                {/* HAMBURGER */}
                <button
                    className={`md:hidden relative z-50 w-11 h-11 flex items-center justify-center rounded-xl transition-all duration-300
                        ${mobileOpen ? 'bg-[#0F3B2E] text-white' : 'text-[#0F3B2E] hover:bg-[#0F3B2E]/5'}
                        ${isRTL ? 'mr-auto' : 'ml-auto'}`}
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
        </nav>

        {/* MOBILE MENU (outside nav to avoid backdrop-filter containing block bug) */}
        <div className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeMobile} />

            <div ref={mobilePanelRef}
                 className={`absolute top-0 ${isRTL ? 'left-0' : 'right-0'} h-full w-80 max-w-[85vw] overflow-y-auto transition-transform duration-300 ease-out
                     ${mobileOpen ? 'translate-x-0' : isRTL ? '-translate-x-full' : 'translate-x-full'}`}>

                {/* Glass panel with geometric decoration */}
                    <div className="relative min-h-full bg-white/95 backdrop-blur-2xl shadow-2xl border-l border-white/20">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                        <div className="absolute -top-20 -right-20 w-40 h-40 border border-[#C9A646]/8 rounded-full" />
                        <div className="absolute -bottom-20 -left-20 w-40 h-40 border border-[#C9A646]/8 rounded-full" />
                        <div className="absolute top-1/3 right-0 w-32 h-px bg-gradient-to-l from-[#C9A646]/10 to-transparent" />
                        <div className="absolute bottom-1/3 left-0 w-32 h-px bg-gradient-to-r from-[#C9A646]/10 to-transparent" />
                        <svg className="absolute top-1/4 left-6 w-12 h-12 text-[#C9A646]/5" viewBox="0 0 48 48" fill="none">
                            <path d="M24 4L44 24L24 44L4 24L24 4Z" stroke="currentColor" strokeWidth="1" />
                            <path d="M24 12L36 24L24 36L12 24L24 12Z" stroke="currentColor" strokeWidth="0.8" />
                        </svg>
                        <svg className="absolute bottom-1/4 right-6 w-10 h-10 text-[#C9A646]/5" viewBox="0 0 48 48" fill="none">
                            <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1" />
                            <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="0.8" />
                        </svg>
                    </div>

                    <div className="relative pt-20 pb-8 px-4 sm:px-6">
                        {/* Navigation links */}
                        <div className="space-y-0.5 mb-6">
                            <p className="px-4 pb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C9A646]">{t('navbar', 'menu')}</p>
                            {[...navLinks, ...userLinks].map((link, i) => (
                                <Link key={link.href} href={link.href}
                                      className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 min-h-[48px]
                                          ${activeIndex === i
                                              ? 'text-[#0F3B2E] bg-[#0F3B2E]/8 font-semibold'
                                              : 'text-gray-700 hover:text-[#0F3B2E] hover:bg-[#0F3B2E]/5'}`}
                                      onClick={closeMobile}>
                                    <span className={`w-1.5 h-1.5 ${activeIndex === i ? 'bg-[#C9A646]' : 'bg-[#C9A646]/40'} rotate-45 shrink-0`} />
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        {/* Notifications */}
                            <div className="px-4 mb-6">
                                <NotificationBell notifications={notifications} inMobile />
                            </div>

                        {/* Language selector */}
                        <div className="px-4 mb-6">
                            <p className="pb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C9A646]/60">{t('navbar', 'selectLang')}</p>
                            <div className={`flex flex-wrap gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                {LANGUAGES.map(l => (
                                    <a key={l.code} href={`/lang/${l.code}`}
                                       className={`flex items-center gap-2 px-3 py-2.5 border rounded-xl text-xs transition-all duration-200 min-h-[44px]
                                           ${l.code === locale
                                               ? 'bg-[#0F3B2E] text-white border-[#0F3B2E] shadow-md'
                                               : 'bg-white/60 text-gray-600 border-gray-200/60 hover:bg-white hover:border-[#C9A646]/30 hover:shadow-sm'}`}>
                                        <img src={`/img/lang/${l.code}.png`} className="h-4 w-4 rounded-sm" alt={l.code} loading="lazy" />
                                        <span className="font-medium">{l.label}</span>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Login/Logout button */}
                        <div className="px-4 pt-2">
                            {isLoggedIn ? (
                                isAdmin ? (
                                    <Link href="/admin"
                                          className="flex items-center justify-center gap-2 px-4 py-3.5 bg-gradient-to-r from-[#C9A646] to-[#b88a36] text-white rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 min-h-[48px]"
                                          onClick={closeMobile}>
                                        {t('admin', 'manage')}
                                    </Link>
                                ) : (
                                    <Link href="/logout" method="post" as="button"
                                          className="flex items-center justify-center gap-2 px-4 py-3.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 min-h-[48px] w-full"
                                          onClick={closeMobile}>
                                        {t('auth', 'logout')}
                                    </Link>
                                )
                            ) : (
                                <Link href="/login"
                                      className="flex items-center justify-center gap-2 px-4 py-3.5 bg-gradient-to-r from-[#0F3B2E] to-[#09291e] text-white rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 min-h-[48px]"
                                      onClick={closeMobile}>
                                    {t('auth', 'login')}
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
