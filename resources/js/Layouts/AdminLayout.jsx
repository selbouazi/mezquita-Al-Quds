import { Link, usePage, Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import Alert from '../Components/Alert';

const LANGUAGES = [
    { code: 'es', label: 'Español' },
    { code: 'ca', label: 'Català' },
    { code: 'en', label: 'English' },
    { code: 'ar', label: 'العربية' },
];

const ADMIN_MODULES = [
    { key: 'dashboard', label: 'dashboard', href: '/admin' },
    { key: 'notificaciones', label: 'notifications', href: '/admin/notificaciones' },
    { key: 'noticias', label: 'news', href: '/admin/noticias' },
    { key: 'codigos', label: 'activation', href: '/admin/codigos' },
    { key: 'horarios', label: 'schedules', href: '/admin/horarios' },
    { key: 'donativos', label: 'donations', href: '/admin/donativos' },
    { key: 'facturas', label: 'invoices', href: '/admin/facturas' },
    { key: 'clases', label: 'classes', href: '/admin/clases' },
    { key: 'imam', label: 'imam', href: '/admin/imam' },
    { key: 'ubicacion', label: 'location', href: '/admin/ubicacion' },
    { key: 'normas', label: 'normas', href: '/admin/normas' },
    { key: 'comentarios', label: 'comments', href: '/admin/comentarios' },
];

const Icons = {
    dashboard: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
    notificaciones: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>,
    noticias: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h10" /></svg>,
    codigos: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9zm-8 5a2 2 0 100 4 2 2 0 000-4z" /></svg>,
    horarios: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    donativos: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    facturas: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    clases: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v16a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H6a2 2 0 00-2 2z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16" /></svg>,
    imam: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
    ubicacion: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    normas: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 3-3" /></svg>,
    comentarios: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
};

export default function AdminLayout({ title, children }) {
    const { t, locale } = useTranslation();
    const { auth, flash, url } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        if (flash?.success) setAlert({ type: 'success', message: flash.success });
        else if (flash?.error) setAlert({ type: 'error', message: flash.error });
    }, [flash]);

    const closeAlert = () => setAlert(null);

    const currentPath = url || window.location.pathname;

    return (
        <>
            <Head>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <div className="min-h-screen flex" style={{ background: '#f5f0e6' }}>
                <div className="fixed inset-0 pointer-events-none overflow-hidden">
                    <svg className="w-full h-full opacity-[0.025]" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <pattern id="adminBg" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                                <polygon points="30,2 58,30 30,58 2,30" fill="none" stroke="#0F3B2E" strokeWidth="0.6" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#adminBg)" />
                    </svg>
                    <div className="absolute -top-48 -right-48 w-96 h-96 rounded-full border-[50px] border-[#C9A646]/6" />
                    <div className="absolute -bottom-48 -left-48 w-96 h-96 rounded-full border-[50px] border-[#0F3B2E]/5" />
                </div>

                {/* Sidebar */}
                <aside className={`fixed inset-y-0 left-0 z-50 w-72 transform transition-all duration-500 ease-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="relative h-full flex flex-col" style={{ background: 'linear-gradient(180deg, #0a2d22 0%, #0F3B2E 30%, #124a35 100%)' }}>
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            <svg className="absolute inset-0 w-full h-full opacity-[0.04]" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
                                <defs>
                                    <pattern id="sidebarPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                                        <polygon points="20,1 39,20 20,39 1,20" fill="none" stroke="#C9A646" strokeWidth="0.5" />
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#sidebarPattern)" />
                            </svg>
                            <div className="absolute top-1/3 -right-20 w-40 h-40 rounded-full border-[30px] border-[#C9A646]/5" />
                        </div>

                        {/* Logo */}
                        <div className="relative px-6 pt-8 pb-6">
                            <Link href="/" className="flex items-center gap-3 group">
                                <div className="relative">
                                    <img src="/img/mezquitaAlquds_logo2.png" className="h-11 group-hover:scale-105 transition-transform duration-300" alt="Logo" loading="lazy" />
                                    <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-[#C9A646] border-2 border-[#0a2d22]" />
                                </div>
                                <div>
                                    <p className="text-xs text-white/50 font-medium leading-tight">{t('navbar', 'subtitle')}</p>
                                    <p className="text-xl font-bold tracking-wide text-white">Al‑Quds</p>
                                </div>
                            </Link>
                        </div>

                        {/* Admin badge */}
                        <div className="relative px-6 pb-5">
                            <div className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: 'rgba(201,166,70,0.1)', border: '1px solid rgba(201,166,70,0.2)' }}>
                                <svg className="w-4 h-4 text-[#C9A646]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                <span className="text-xs font-medium text-[#C9A646] uppercase tracking-wider">{t('admin', 'panel')}</span>
                            </div>
                        </div>

                        {/* Navigation */}
                        <nav className="relative flex-1 overflow-y-auto px-4 pb-4 scrollbar-thin" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(201,166,70,0.2) transparent' }}>
                            <ul className="space-y-0.5">
                                {ADMIN_MODULES.map((module) => {
                                    const isActive = currentPath === module.href || (module.href !== '/admin' && currentPath.startsWith(module.href));
                                    return (
                                        <li key={module.key}>
                                            <Link
                                                href={module.href}
                                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 min-h-[48px] group
                                                    ${isActive
                                                        ? 'text-white bg-[#C9A646]/15 shadow-sm'
                                                        : 'text-white/60 hover:text-white hover:bg-white/5'
                                                    }`}
                                                style={isActive ? { borderLeft: '3px solid #C9A646' } : { borderLeft: '3px solid transparent' }}
                                            >
                                                <span className={`transition-colors duration-200 ${isActive ? 'text-[#C9A646]' : 'text-white/40 group-hover:text-white/60'}`}>
                                                    {Icons[module.key]}
                                                </span>
                                                <span>{t('adminModules', module.label)}</span>
                                                {isActive && (
                                                    <svg className="w-3 h-3 ml-auto text-[#C9A646]" fill="currentColor" viewBox="0 0 12 12">
                                                        <circle cx="6" cy="6" r="3" />
                                                    </svg>
                                                )}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>

                        {/* User card */}
                        <div className="relative px-4 pb-6">
                            <div className="rounded-xl backdrop-blur-sm p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: 'linear-gradient(135deg, #C9A646, #a3872e)' }}>
                                        {(auth?.user?.name || 'A')[0].toUpperCase()}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-medium text-white truncate">{auth?.user?.name}</p>
                                        <p className="text-xs text-white/40 truncate">{auth?.user?.email}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Link href="/" className="flex-1 text-center text-xs text-white/50 hover:text-white py-2 rounded-lg hover:bg-white/5 transition">
                                        {t('admin', 'goToWebsite')}
                                    </Link>
                                    <Link href="/logout" method="post" as="button" className="flex-1 text-center text-xs text-red-300 hover:text-red-200 py-2 rounded-lg hover:bg-white/5 transition">
                                        {t('auth', 'logout')}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1 lg:ml-72 relative">
                    {/* Header */}
                    <header className="sticky top-0 z-40 backdrop-blur-xl border-b" style={{ background: 'rgba(245,240,230,0.85)', borderColor: 'rgba(201,166,70,0.12)' }}>
                        <div className="flex items-center justify-between px-6 py-4">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setSidebarOpen(!sidebarOpen)}
                                    className="lg:hidden w-11 h-11 flex items-center justify-center rounded-xl text-gray-600 hover:text-[#0F3B2E] hover:bg-white transition"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-[#C9A646]" />
                                    <h1 className="text-xl font-bold text-[#0F3B2E]">
                                        {title || t('admin', 'panel')}
                                    </h1>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                {/* Language selector */}
                                <div className="relative">
                                    <button
                                        className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 min-h-[44px] border"
                                        style={{ background: 'rgba(255,255,255,0.7)', borderColor: 'rgba(201,166,70,0.15)', color: '#4a4a4a' }}
                                        onClick={() => setLangOpen(v => !v)}
                                    >
                                        <img src={`/img/lang/${locale}.png`} className="h-5 w-5 rounded-sm" alt={locale} loading="lazy" />
                                        <span className="font-semibold uppercase tracking-wider text-xs">{locale}</span>
                                        <svg className={`w-3 h-3 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4l3 4 3-4" />
                                        </svg>
                                    </button>
                                    {langOpen && (
                                        <div className="absolute right-0 mt-2 w-44 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border py-2 z-50 overflow-hidden"
                                            style={{ borderColor: 'rgba(201,166,70,0.1)', boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}>
                                            {LANGUAGES.map(l => (
                                                <a key={l.code} href={`/lang/${l.code}`}
                                                    className={`flex items-center gap-3 px-4 py-2.5 text-sm transition hover:bg-[#0F3B2E]/5 min-h-[44px]
                                                        ${l.code === locale ? 'text-[#0F3B2E] font-semibold' : 'text-gray-600'}`}>
                                                    <img src={`/img/lang/${l.code}.png`} className="h-5 w-5 rounded-sm" alt={l.code} loading="lazy" />
                                                    {l.label}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* User badge */}
                                <div className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-xl" style={{ background: 'rgba(15,59,46,0.04)', border: '1px solid rgba(15,59,46,0.06)' }}>
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: 'linear-gradient(135deg, #0F3B2E, #1a6b50)' }}>
                                        {(auth?.user?.name || 'A')[0].toUpperCase()}
                                    </div>
                                    <span className="text-sm font-medium text-[#0F3B2E]">{auth?.user?.name}</span>
                                </div>

                                {/* Logout */}
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 min-h-[44px] text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    <span className="hidden sm:inline">{t('auth', 'logout')}</span>
                                </Link>
                            </div>
                        </div>
                    </header>

                    {/* Page Content */}
                    <main className="p-6 sm:p-8">
                        <div className="relative">
                            {children}
                        </div>
                    </main>
                </div>

                {/* Overlay for mobile */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 z-40 lg:hidden"
                        style={{ background: 'rgba(0,0,0,0.4)' }}
                        onClick={() => setSidebarOpen(false)}
                    />
                )}
            </div>

            {alert && (
                <Alert
                    type={alert.type}
                    message={alert.message}
                    onClose={closeAlert}
                    autoDismiss={true}
                    autoDismissTimeout={4000}
                />
            )}
        </>
    );
}
