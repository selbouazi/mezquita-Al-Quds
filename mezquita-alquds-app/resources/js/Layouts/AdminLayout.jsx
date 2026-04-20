import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';

const ADMIN_MODULES = [
    { key: 'notificaciones', label: 'notifications', icon: '🔔', href: '/admin/notificaciones' },
    { key: 'noticias', label: 'news', icon: '📰', href: '/admin/noticias' },
    { key: 'codigos', label: 'activation', icon: '🔑', href: '/admin/codigos' },
    { key: 'horarios', label: 'schedules', icon: '📅', href: '/admin/horarios' },
    { key: 'donativos', label: 'donations', icon: '💰', href: '/admin/donativos' },
    { key: 'facturas', label: 'invoices', icon: '📄', href: '/admin/facturas' },
    { key: 'clases', label: 'classes', icon: '📚', href: '/admin/clases' },
    { key: 'ubicacion', label: 'location', icon: '📍', href: '/admin/ubicacion' },
    { key: 'contactos', label: 'contacts', icon: '📧', href: '/admin/contactos' },
];

export default function AdminLayout({ title, children }) {
    const { t } = useTranslation();
    const { auth } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);

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
                                        <span className="text-lg">{module.icon}</span>
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