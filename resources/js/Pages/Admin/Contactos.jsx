import { usePage, Link } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import { useTranslation } from '../../hooks/useTranslation';

export default function Contactos() {
    const { t } = useTranslation();
    const { props } = usePage();
    const { contactos, sinLeer } = props;

    const formatFecha = (fecha) => {
        const date = new Date(fecha);
        const now = new Date();
        const diffMs = now - date;
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffHours < 1) return 'Hace un momento';
        if (diffHours < 24) return `Hace ${diffHours}h`;
        if (diffDays < 7) return `Hace ${diffDays}d`;
        return date.toLocaleDateString('es');
    };

    const getTipoLabel = (tipo) => {
        const tipos = {
            'general': 'General',
            'donativo': 'Donativo',
            'clase': 'Clase',
            'voluntario': 'Voluntario',
            'otro': 'Otro',
        };
        return tipos[tipo] || 'General';
    };

    return (
        <AdminLayout title={t('adminModules', 'messages')}>
            <div className="px-2 sm:px-0">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-[#0F5132]">{t('adminModules', 'messages')}</h1>
                        <p className="text-gray-600 text-sm hidden sm:block">Mensajes recibidos del formulario de contacto</p>
                    </div>
                    <div className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                        {sinLeer} sin leer
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-xl shadow-sm border">
                        <p className="text-2xl font-bold text-[#0F5132]">{contactos.total}</p>
                        <p className="text-sm text-gray-600">Total mensajes</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border">
                        <p className="text-2xl font-bold text-yellow-600">{sinLeer}</p>
                        <p className="text-sm text-gray-600">Sin leer</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border col-span-2 md:col-span-1">
                        <p className="text-2xl font-bold text-green-600">{contactos.total - sinLeer}</p>
                        <p className="text-sm text-gray-600">Leídos</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Estado</th>
                                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {contactos.data.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                                            No hay mensajes para mostrar
                                        </td>
                                    </tr>
                                ) : (
                                    contactos.data.map((contacto) => (
                                        <tr key={contacto.id} className={`hover:bg-gray-50 ${!contacto.leido ? 'bg-yellow-50/50' : ''}`}>
                                            <td className="px-4 py-3">
                                                <div>
                                                    <p className="font-medium text-gray-900">{contacto.nombre}</p>
                                                    <p className="text-xs text-gray-500">{contacto.email}</p>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                                    {getTipoLabel(contacto.tipo)}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-500">
                                                {formatFecha(contacto.created_at)}
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                    contacto.leido 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {contacto.leido ? 'Leído' : 'Nuevo'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex justify-end gap-2">
                                                    {!contacto.leido && (
                                                        <Link
                                                            href={`/admin/contactos/${contacto.id}/leido`}
                                                            method="post"
                                                            className="px-2 py-1 text-xs text-blue-600 rounded hover:bg-blue-50"
                                                        >
                                                            Marcar leído
                                                        </Link>
                                                    )}
                                                    <Link
                                                        href={`/admin/contactos/${contacto.id}`}
                                                        method="delete"
                                                        className="px-2 py-1 text-xs text-red-600 rounded hover:bg-red-50"
                                                    >
                                                        Eliminar
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {contactos.last_page > 1 && (
                        <div className="flex justify-center gap-2 py-4 border-t">
                            {contactos.prev_page_url && (
                                <Link href={contactos.prev_page_url} className="px-3 py-2 bg-white border rounded-lg hover:bg-gray-50 text-sm">
                                    ← Anterior
                                </Link>
                            )}
                            <span className="px-3 py-2 text-gray-600 text-sm">
                                {contactos.current_page} / {contactos.last_page}
                            </span>
                            {contactos.next_page_url && (
                                <Link href={contactos.next_page_url} className="px-3 py-2 bg-white border rounded-lg hover:bg-gray-50 text-sm">
                                    Siguiente →
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}