import { useState } from 'react';
import { usePage, Link } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import AdminTable from '../../Components/AdminTable';
import { useTranslation } from '../../hooks/useTranslation';

export default function Contactos() {
    const { t, locale } = useTranslation();
    const { props } = usePage();
    const [selected, setSelected] = useState(null);

    const formatFecha = (fecha) => {
        const date = new Date(fecha);
        const now = new Date();
        const diffMs = now - date;
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffHours < 1) return t('adminContactos', 'momentsAgo') || 'Hace un momento';
        if (diffHours < 24) return t('adminContactos', 'hoursAgo')?.replace('{h}', diffHours) || `Hace ${diffHours}h`;
        if (diffDays < 7) return t('adminContactos', 'daysAgo')?.replace('{d}', diffDays) || `Hace ${diffDays}d`;
        return date.toLocaleDateString(locale);
    };

    const { contactos, sinLeer } = props;

    const getTipoLabel = (tipo) => {
        const tipos = {
            'general': t('adminContactos', 'general') || 'General',
            'donativo': t('adminContactos', 'donation') || 'Donativo',
            'clase': t('adminContactos', 'class') || 'Clase',
            'voluntario': t('adminContactos', 'volunteer') || 'Voluntario',
            'otro': t('adminContactos', 'other') || 'Otro',
        };
        return tipos[tipo] || t('adminContactos', 'general') || 'General';
    };

    const columns = [
        { label: t('adminContactos', 'name') },
        { label: t('adminContactos', 'tipo') },
        { label: t('adminContactos', 'date') },
        { label: t('adminContactos', 'status'), align: 'center' },
        { label: t('adminContactos', 'actions'), align: 'right' },
    ];

    const renderRow = (contacto) => (
        <>
            <td className="px-4 py-3 cursor-pointer" onClick={() => setSelected(contacto)}>
                <p className="font-medium text-gray-900">{contacto.nombre}</p>
                <p className="text-xs text-gray-500">{contacto.email}</p>
            </td>
            <td className="px-4 py-3 cursor-pointer" onClick={() => setSelected(contacto)}>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">{getTipoLabel(contacto.tipo)}</span>
            </td>
            <td className="px-4 py-3 text-sm text-gray-500 cursor-pointer" onClick={() => setSelected(contacto)}>
                {formatFecha(contacto.created_at)}
            </td>
            <td className="px-4 py-3 text-center cursor-pointer" onClick={() => setSelected(contacto)}>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${contacto.leido ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {contacto.leido ? t('adminContactos', 'read') : t('adminContactos', 'new')}
                </span>
            </td>
            <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                    {!contacto.leido && (
                        <Link href={`/admin/contactos/${contacto.id}/leido`} method="post" className="px-2 py-1 text-xs text-blue-600 rounded-lg hover:bg-blue-50 min-h-[32px]">{t('adminContactos', 'markRead')}</Link>
                    )}
                    <Link href={`/admin/contactos/${contacto.id}`} method="delete" className="px-2 py-1 text-xs text-red-600 rounded-lg hover:bg-red-50 min-h-[32px]">{t('common', 'delete')}</Link>
                </div>
            </td>
        </>
    );

    const renderMobileCard = (contacto) => (
        <div onClick={() => setSelected(contacto)}>
            <div className="flex items-start justify-between mb-2">
                <div className="min-w-0 flex-1 mr-2">
                    <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-900 text-sm">{contacto.nombre}</p>
                        {!contacto.leido && <span className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"></span>}
                    </div>
                    <p className="text-xs text-gray-500">{contacto.email}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${contacto.leido ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {contacto.leido ? t('adminContactos', 'read') : t('adminContactos', 'new')}
                </span>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">{getTipoLabel(contacto.tipo)}</span>
                <span>{formatFecha(contacto.created_at)}</span>
            </div>
        </div>
    );

    return (
        <AdminLayout title={t('adminModules', 'messages')}>
            <div className="px-2 sm:px-0">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-[#0F5132]">{t('adminModules', 'messages')}</h1>
                        <p className="text-gray-600 text-sm hidden sm:block">{t('adminContactos', 'subtitle')}</p>
                    </div>
                    <div className="px-3 py-1.5 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                        {sinLeer} {t('adminContactos', 'unread').toLowerCase()}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-xl shadow-sm border">
                        <p className="text-2xl font-bold text-[#0F5132]">{contactos.total}</p>
                        <p className="text-sm text-gray-600">{t('adminContactos', 'total')}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border">
                        <p className="text-2xl font-bold text-yellow-600">{sinLeer}</p>
                        <p className="text-sm text-gray-600">{t('adminContactos', 'unread')}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border">
                        <p className="text-2xl font-bold text-green-600">{contactos.total - sinLeer}</p>
                        <p className="text-sm text-gray-600">{t('adminContactos', 'read')}</p>
                    </div>
                </div>

                <AdminTable
                    columns={columns}
                    rows={contactos.data}
                    renderRow={renderRow}
                    renderMobileCard={renderMobileCard}
                    emptyMessage={t('adminContactos', 'noMessages')}
                    emptyColspan={5}
                />

                {contactos.last_page > 1 && (
                    <div className="flex justify-center gap-2 py-6">
                        {contactos.prev_page_url && (
                            <Link href={contactos.prev_page_url} className="px-4 py-2.5 bg-white border rounded-xl hover:bg-gray-50 text-sm min-h-[44px] flex items-center shadow-sm">
                                ← {t('common', 'previous')}
                            </Link>
                        )}
                        <span className="px-4 py-2.5 text-gray-600 text-sm flex items-center">
                            {contactos.current_page} / {contactos.last_page}
                        </span>
                        {contactos.next_page_url && (
                            <Link href={contactos.next_page_url} className="px-4 py-2.5 bg-white border rounded-xl hover:bg-gray-50 text-sm min-h-[44px] flex items-center shadow-sm">
                                {t('common', 'next')} →
                            </Link>
                        )}
                    </div>
                )}
            </div>

            {selected && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelected(null)}>
                    <div className="bg-white rounded-2xl p-4 sm:p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-start justify-between mb-4">
                            <h2 className="text-lg sm:text-xl font-bold text-[#0F5132]">{selected.nombre}</h2>
                            <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 p-1">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="space-y-3 text-sm">
                            <div className="flex gap-2">
                                <span className="font-medium text-gray-600 min-w-20">{t('adminContactos', 'email')}:</span>
                                <a href={`mailto:${selected.email}`} className="text-[#C9A646] hover:underline">{selected.email}</a>
                            </div>
                            <div className="flex gap-2">
                                <span className="font-medium text-gray-600 min-w-20">{t('adminContactos', 'tipo')}:</span>
                                <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">{getTipoLabel(selected.tipo)}</span>
                            </div>
                            <div className="flex gap-2">
                                <span className="font-medium text-gray-600 min-w-20">{t('adminContactos', 'date')}:</span>
                                <span className="text-gray-700">{formatFecha(selected.created_at)}</span>
                            </div>
                            {selected.telefono && (
                                <div className="flex gap-2">
                                    <span className="font-medium text-gray-600 min-w-20">{t('adminContactos', 'telefono') || 'Teléfono'}:</span>
                                    <a href={`tel:${selected.telefono}`} className="text-[#C9A646] hover:underline">{selected.telefono}</a>
                                </div>
                            )}
                            <div className="pt-3 border-t">
                                <p className="font-medium text-gray-700 mb-2">{t('adminContactos', 'mensaje')}:</p>
                                <p className="text-gray-600 whitespace-pre-wrap bg-gray-50 rounded-lg p-4 leading-relaxed">{selected.mensaje}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
