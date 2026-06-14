import { Link } from '@inertiajs/react';
import MainLayout from '../../Layouts/MainLayout';
import { useTranslation } from '../../hooks/useTranslation';

export default function Notifications({ notificaciones }) {
    const { t, locale } = useTranslation();

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString(locale === 'ar' ? 'ar-EG' : locale === 'ca' ? 'ca-ES' : locale === 'en' ? 'en-US' : 'es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    const getPriorityColor = (prioridad) => {
        switch (prioridad) {
            case 'muy_alta': return 'bg-red-100 text-red-800';
            case 'alta': return 'bg-orange-100 text-orange-800';
            case 'normal': return 'bg-blue-100 text-blue-800';
            case 'baja': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getPriorityIcon = (prioridad) => {
        switch (prioridad) {
            case 'muy_alta':
                return <svg viewBox="0 0 24 24" className="w-4 h-4 fill-red-600"><path d="M12 2l3 7h7l-5.5 5 2 8L12 17l-5.5 5 2-8L3 9h7z"/></svg>;
            case 'alta':
                return <svg viewBox="0 0 24 24" className="w-4 h-4 fill-orange-600"><path d="M12 2l3 7h7l-5.5 5 2 8L12 17l-5.5 5 2-8L3 9h7z"/></svg>;
            case 'normal':
                return <svg viewBox="0 0 24 24" className="w-4 h-4 fill-blue-600"><circle cx="12" cy="12" r="10"/></svg>;
            case 'baja':
                return <svg viewBox="0 0 24 24" className="w-4 h-4 fill-gray-500"><circle cx="12" cy="12" r="10"/></svg>;
            default: return null;
        }
    };

    return (
        <MainLayout title={t('notifications', 'allNotifications')}
            description="Todas las notificaciones activas de la Mezquita Al‑Quds de El Vendrell."
            canonical="/notifications">
            <section className="relative">
                <div className="bg-gradient-to-br from-[#0F3B2E] via-[#0F3B2E] to-[#0a2d22] pt-28 pb-16">
                    <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                        <svg viewBox="0 0 60 60" className="w-12 h-12 mx-auto mb-4 text-[#C9A646]/80" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M30 4L8 17v26l22 13 22-13V17L30 4z"/>
                            <path d="M30 4v52"/>
                            <path d="M8 17l22 13 22-13"/>
                            <path d="M30 30l22-13"/>
                        </svg>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            {t('notifications', 'allNotifications')}
                        </h1>
                        <p className="text-[#C9A646]/80 text-lg">
                            {t('notifications', 'allNotificationsDesc')}
                        </p>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto px-6 -mt-8 pb-16 relative z-20">
                    {notificaciones.data.length === 0 ? (
                        <div className="text-center py-16 bg-white/80 backdrop-blur-md rounded-3xl shadow-lg border border-[#C9A646]/20">
                            <svg className="mx-auto h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                            </svg>
                            <p className="text-gray-500 text-lg">{t('notifications', 'noNotifications')}</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {notificaciones.data.map((notification) => (
                                <div key={notification.id}
                                    className="group bg-white/80 backdrop-blur-md rounded-2xl shadow-md border border-[#C9A646]/20 p-6 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(notification.prioridad)}`}>
                                                    {getPriorityIcon(notification.prioridad)}
                                                    {t('notifications', notification.prioridad)}
                                                </span>
                                                <span className="text-xs text-gray-400">{formatDate(notification.fecha_publicacion)}</span>
                                            </div>
                                            <h3 className="text-xl font-semibold text-[#0F3B2E] mb-2">
                                                {notification.titulo}
                                            </h3>
                                            <p className="text-gray-600 leading-relaxed">
                                                {notification.mensaje}
                                            </p>
                                        </div>
                                        <svg className="hidden md:block w-5 h-5 text-[#C9A646] opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M5 12h14M12 5l7 7-7 7"/>
                                        </svg>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {notificaciones.last_page > 1 && (
                        <div className="flex items-center justify-center gap-3 mt-10">
                            {notificaciones.prev_page_url ? (
                                <Link href={notificaciones.prev_page_url}
                                    className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-white/80 backdrop-blur-md border border-[#C9A646]/30 rounded-xl text-sm font-medium text-[#0F3B2E] hover:bg-[#0F3B2E] hover:text-white hover:border-[#0F3B2E] transition-all min-h-[48px]">
                                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                                    </svg>
                                    <span className="hidden sm:inline">{t('common', 'previous')}</span>
                                </Link>
                            ) : (
                                <span className="inline-flex items-center px-5 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-400 min-h-[48px]">
                                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                                    </svg>
                                    <span className="hidden sm:inline ml-1.5">{t('common', 'previous')}</span>
                                </span>
                            )}
                            <span className="px-4 py-2.5 text-sm font-medium text-[#0F3B2E] bg-white/80 backdrop-blur-md border border-[#C9A646]/20 rounded-xl min-h-[48px] flex items-center">
                                {notificaciones.current_page} / {notificaciones.last_page}
                            </span>
                            {notificaciones.next_page_url ? (
                                <Link href={notificaciones.next_page_url}
                                    className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-white/80 backdrop-blur-md border border-[#C9A646]/30 rounded-xl text-sm font-medium text-[#0F3B2E] hover:bg-[#0F3B2E] hover:text-white hover:border-[#0F3B2E] transition-all min-h-[48px]">
                                    <span className="hidden sm:inline">{t('common', 'next')}</span>
                                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14M12 5l7 7-7 7"/>
                                    </svg>
                                </Link>
                            ) : (
                                <span className="inline-flex items-center px-5 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-400 min-h-[48px]">
                                    <span className="hidden sm:inline mr-1.5">{t('common', 'next')}</span>
                                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14M12 5l7 7-7 7"/>
                                    </svg>
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </MainLayout>
    );
}
