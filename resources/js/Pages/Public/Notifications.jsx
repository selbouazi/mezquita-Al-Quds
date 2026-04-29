import { Link } from '@inertiajs/react';
import MainLayout from '../../Layouts/MainLayout';
import { useTranslation } from '../../hooks/useTranslation';

export default function Notifications({ notificaciones }) {
    const { t } = useTranslation();

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('es', {
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

    return (
        <MainLayout title={t('notifications', 'allNotifications')}>
            <section className="py-16 fade">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-[#0F5132] mb-4">
                            {t('notifications', 'allNotifications')}
                        </h1>
                        <p className="text-gray-600">
                            {t('notifications', 'allNotificationsDesc')}
                        </p>
                    </div>

                    {notificaciones.data.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-3xl shadow-md">
                            <svg
                                className="mx-auto h-16 w-16 text-gray-300 mb-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                />
                            </svg>
                            <p className="text-gray-500 text-lg">
                                {t('notifications', 'noNotifications')}
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {notificaciones.data.map((notification) => (
                                <div
                                    key={notification.id}
                                    className="bg-white rounded-2xl shadow-md border border-[#C9A227]/20 p-6 hover:shadow-lg transition"
                                >
                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(notification.prioridad)}`}>
                                                    {t('notifications', notification.prioridad)}
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    {formatDate(notification.fecha_publicacion)}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-semibold text-[#0F5132] mb-2">
                                                {notification.titulo}
                                            </h3>
                                            <p className="text-gray-600 leading-relaxed">
                                                {notification.mensaje}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {notificaciones.last_page > 1 && (
                        <div className="flex justify-center gap-2 mt-8">
                            {notificaciones.prev_page_url && (
                                <Link
                                    href={notificaciones.prev_page_url}
                                    className="px-4 py-2 bg-[#0F5132] text-white rounded-lg hover:bg-[#0c3f27] transition"
                                >
                                    ← Anterior
                                </Link>
                            )}
                            <span className="px-4 py-2 text-gray-600">
                                {notificaciones.current_page} / {notificaciones.last_page}
                            </span>
                            {notificaciones.next_page_url && (
                                <Link
                                    href={notificaciones.next_page_url}
                                    className="px-4 py-2 bg-[#0F5132] text-white rounded-lg hover:bg-[#0c3f27] transition"
                                >
                                    Siguiente →
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </MainLayout>
    );
}
