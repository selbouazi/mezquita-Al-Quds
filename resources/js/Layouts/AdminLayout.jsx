import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';

const LANGUAGES = [
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'ca', label: 'Català', flag: '🇪🇸' },
    { code: 'ar', label: 'العربية', flag: '🇸🇦' },
];

const ADMIN_MODULES = [
    { key: 'notificaciones', label: 'notifications', href: '/admin/notificaciones' },
    { key: 'noticias', label: 'news', href: '/admin/noticias' },
    { key: 'codigos', label: 'activation', href: '/admin/codigos' },
    { key: 'horarios', label: 'schedules', href: '/admin/horarios' },
    { key: 'donativos', label: 'donations', href: '/admin/donativos' },
    { key: 'facturas', label: 'invoices', href: '/admin/facturas' },
    { key: 'clases', label: 'classes', href: '/admin/clases' },
    { key: 'imam', label: 'imam', href: '/admin/imam' },
    { key: 'ubicacion', label: 'location', href: '/admin/ubicacion' },
    { key: 'contactos', label: 'contacts', href: '/admin/contactos' },
];

const Icons = {
    notificaciones: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5m-4.5-5.5V17m-4.5 5.5V17m-4.5-9.5a6 6 0 0112 0v2a6 6 0 01-12 0v-2z" /></svg>,
    noticias: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
    codigos: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9zm-8 5a2 2 0 100 4 2 2 0 000-4z" /></svg>,
    horarios: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    donativos: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    facturas: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    clases: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
    imam: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
    ubicacion: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    contactos: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
};

export default function AdminLayout({ title, children }) {
    const { t, locale } = useTranslation();
    const { auth } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [langOpen, setLangOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0F5132] text-white transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="p-6 border-b border-white/10">
                        <Link href="/" className="flex items-center gap-3">
                            <img src="/img/mezquitaAlquds_logo2.png" className="h-10" alt="Logo" />
                            <div>
                                <p className="text-xs text-white/70">{t('navbar', 'subtitle')}</p>
                                <p className="font-bold text-lg">Al‑Quds</p>
                            </div>
                        </Link>
                    </div>

                    {/* Admin Title */}
                    <div className="p-4 border-b border-white/10">
                        <p className="text-xs text-white/50 uppercase tracking-wider">{t('admin', 'panel')}</p>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto py-4">
                        <ul className="space-y-1 px-3">
                            {ADMIN_MODULES.map((module) => (
                                <li key={module.key}>
                                    <Link
                                        href={module.href}
                                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition"
                                    >
                                        {Icons[module.key]}
                                        <span className="text-sm">{t('adminModules', module.label)}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Footer */}
                    <div className="p-4 border-t border-white/10">
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition"
                        >
                            <span>🌐</span>
                            {t('admin', 'goToWebsite')}
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 lg:ml-64">
                {/* Header */}
                <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
                    <div className="flex items-center justify-between px-6 py-4">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="lg:hidden p-2 text-gray-600 hover:text-[#0F5132]"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                            <h1 className="text-xl font-semibold text-gray-800">
                                {title || t('admin', 'panel')}
                            </h1>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <button
                                    className="flex items-center gap-2 px-3 py-2 border rounded-lg bg-white shadow-sm hover:bg-gray-50 transition"
                                    onClick={() => setLangOpen(v => !v)}
                                >
                                    <img src={`/img/lang/${locale}.png`} className="h-5 w-5" alt={locale} />
                                    <span className="text-sm font-medium uppercase">{locale}</span>
                                </button>
                                {langOpen && (
                                    <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg py-2 z-50">
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
                            <span className="text-sm text-gray-600">
                                {auth?.user?.name}
                            </span>
                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                                className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition"
                            >
                                {t('auth', 'logout')}
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-6">
                    {children}
                </main>
            </div>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
}