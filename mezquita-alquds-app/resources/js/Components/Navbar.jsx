import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { useTranslation } from '../hooks/useTranslation';

const LANGUAGES = [
    { code: 'es', label: 'Español' },
    { code: 'ca', label: 'Català' },
    { code: 'ar', label: 'العربية' },
];

export default function Navbar() {
    const { t, locale, isRTL } = useTranslation();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [langOpen, setLangOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        const close = () => setLangOpen(false);
        document.addEventListener('click', close);
        return () => document.removeEventListener('click', close);
    }, []);

    const navLinks = [
        { href: '/',          label: t('navbar', 'home') },
        { href: '/horarios',  label: t('navbar', 'prayers') },
        { href: '/ubicacion', label: t('navbar', 'location') },
        { href: '/contacto',  label: t('navbar', 'contact') },
    ];

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 border-b border-[#C9A227]/20 transition-all duration-300
            ${scrolled ? 'py-2 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)]' : 'py-5 bg-white/80 backdrop-blur-xl'}`}>

            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:justify-between md:items-center">

                {/* LOGO + HAMBURGUESA */}
                <div className="flex items-center w-full md:w-auto">
                    <Link href="/" className="flex items-center gap-3 flex-grow">
                        <img src="/img/mezquitaAlquds_logo2.png" className="h-12" alt="Logo" />
                        <div className={isRTL ? 'text-right' : ''}>
                            <p className="text-xs text-gray-500">{t('navbar', 'subtitle')}</p>
                            <p className="text-xl font-bold text-[#0F5132] tracking-wide">{t('navbar', 'title')}</p>
                        </div>
                    </Link>
                    <button
                        className="md:hidden text-[#0F5132] text-3xl"
                        onClick={() => setMobileOpen(v => !v)}
                    >
                        ☰
                    </button>
                </div>

                {/* MENÚ DESKTOP */}
                <div className="hidden md:flex items-center space-x-10 text-sm font-medium">
                    {navLinks.map(link => (
                        <Link key={link.href} href={link.href}
                              className="hover:text-[#C9A227] transition">
                            {link.label}
                        </Link>
                    ))}

                    {/* SELECTOR IDIOMA */}
                    <div className="relative">
                        <button
                            className="flex items-center gap-2 px-3 py-2 border rounded-lg bg-white shadow-sm hover:bg-gray-50 transition"
                            onClick={e => { e.stopPropagation(); setLangOpen(v => !v); }}
                        >
                            <img src={`/img/lang/${locale}.png`} className="h-5 w-5" alt={locale} />
                            <span className="text-sm font-medium uppercase">{locale}</span>
                        </button>
                        {langOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg py-2">
                                {LANGUAGES.map(l => (
                                    <a key={l.code} href={`/lang/${l.code}`}
                                       className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100">
                                        <img src={`/img/lang/${l.code}.png`} className="h-5 w-5" alt={l.code} />
                                        {l.label}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* MENÚ MÓVIL */}
            {mobileOpen && (
                <div className="bg-white/95 backdrop-blur-xl border-t border-[#C9A227]/20 md:hidden px-6 py-4 space-y-3 text-sm">
                    {navLinks.map(link => (
                        <Link key={link.href} href={link.href}
                              className="block text-gray-700 hover:text-[#C9A227] transition"
                              onClick={() => setMobileOpen(false)}>
                            {link.label}
                        </Link>
                    ))}
                    <div className="flex gap-3 pt-2">
                        {LANGUAGES.map(l => (
                            <a key={l.code} href={`/lang/${l.code}`}
                               className="flex items-center gap-1 px-2 py-1 border rounded-lg text-xs hover:bg-gray-100">
                                <img src={`/img/lang/${l.code}.png`} className="h-4 w-4" alt={l.code} />
                                {l.label}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}