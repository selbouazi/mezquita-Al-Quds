import { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import { useTranslation } from '../../hooks/useTranslation';
import FormModal from '../../Components/FormModal';
import FormField from '../../Components/FormField';

export default function Notificaciones({ notificaciones, filtros }) {
    const { t } = useTranslation();
    const [showModal, setShowModal] = useState(false);
    const [editando, setEditando] = useState(null);

    const form = useForm({
        titulo: '',
        mensaje: '',
        prioridad: 'normal',
        activa: true,
        fecha_expiracion: '',
    });

    const prioridades = [
        { value: 'muy_alta', label: t('notifications', 'veryHigh') },
        { value: 'alta', label: t('notifications', 'high') },
        { value: 'normal', label: t('notifications', 'normal') },
        { value: 'baja', label: t('notifications', 'low') },
    ];

    const openCreate = () => {
        form.reset();
        form.clearErrors();
        setEditando(null);
        setShowModal(true);
    };

    const openEdit = (notif) => {
        form.setData({
            titulo: notif.titulo || '',
            mensaje: notif.mensaje,
            prioridad: notif.prioridad,
            activa: notif.activa,
            fecha_expiracion: notif.fecha_expiracion ? notif.fecha_expiracion.split(' ')[0] : '',
        });
        setEditando(notif.id);
        setShowModal(true);
    };

    const submitCreate = () => {
        form.post('/admin/notificaciones', {
            onSuccess: () => {
                setShowModal(false);
                form.reset();
            },
        });
    };

    const submitEdit = () => {
        form.put(`/admin/notificaciones/${editando}`, {
            onSuccess: () => {
                setShowModal(false);
                form.reset();
            },
        });
    };

    const getPriorityClass = (prioridad) => {
        switch (prioridad) {
            case 'muy_alta': return 'bg-red-100 text-red-800';
            case 'alta': return 'bg-orange-100 text-orange-800';
            case 'normal': return 'bg-blue-100 text-blue-800';
            case 'baja': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const handleSubmit = () => {
        if (editando) {
            submitEdit();
        } else {
            submitCreate();
        }
    };

    return (
        <AdminLayout title={t('notifications', 'title')}>
            <div className="px-2 sm:px-0">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-[#0F5132]">{t('notifications', 'title')}</h1>
                        <p className="text-gray-600 text-sm hidden sm:block">{t('notifications', 'subtitle')}</p>
                    </div>
                    <button
                        onClick={openCreate}
                        className="w-full sm:w-auto px-4 py-2 bg-[#0F5132] text-white rounded-lg hover:bg-[#0c3f27] transition text-sm"
                    >
                        + {t('notifications', 'createNew')}
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 mb-6">
                    <form method="get" className="space-y-3">
                        <input
                            type="text"
                            name="busqueda"
                            defaultValue={filtros?.busqueda}
                            placeholder={t('notifications', 'search')}
                            className="w-full px-3 py-2 border rounded-lg text-sm"
                        />
                        <div className="flex flex-wrap gap-2">
                            <select
                                name="estado"
                                defaultValue={filtros?.estado}
                                className="flex-1 min-w-[120px] px-3 py-2 border rounded-lg text-sm"
                            >
                                <option value="">{t('notifications', 'all')}</option>
                                <option value="activas">{t('notifications', 'activas')}</option>
                                <option value="inactivas">{t('notifications', 'inactivas')}</option>
                            </select>
                            <select
                                name="prioridad"
                                defaultValue={filtros?.prioridad}
                                className="flex-1 min-w-[120px] px-3 py-2 border rounded-lg text-sm"
                            >
                                <option value="">{t('notifications', 'priority')}</option>
                                {prioridades.map(p => (
                                    <option key={p.value} value={p.value}>{p.label}</option>
                                ))}
                            </select>
                            <button
                                type="submit"
                                className="flex-1 min-w-[80px] px-4 py-2 bg-[#C9A227] text-white rounded-lg hover:bg-[#9a7b1c] text-sm"
                            >
                                {t('notifications', 'filter')}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="space-y-3">
                    {notificaciones.data.length === 0 ? (
                        <div className="bg-white rounded-xl shadow-sm border p-8 text-center text-gray-500">
                            {t('notifications', 'noNotifications')}
                        </div>
                    ) : (
                        notificaciones.data.map((notif) => (
                            <div key={notif.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                                    <div className="flex flex-wrap gap-2">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityClass(notif.prioridad)}`}>
                                            {prioridades.find(p => p.value === notif.prioridad)?.label || t('notifications', 'normal')}
                                        </span>
                                        <span className={`px-2 py-1 rounded-full text-xs ${notif.activa ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                                            {t('notifications', notif.activa ? 'active' : 'inactive')}
                                        </span>
                                    </div>
                                    <span className="text-xs text-gray-500">
                                        {new Date(notif.fecha_publicacion).toLocaleDateString('es')}
                                    </span>
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-1">{notif.titulo || 'Sin título'}</h3>
                                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{notif.mensaje}</p>
                                <div className="flex flex-wrap gap-2 pt-2 border-t">
                                    <button
                                        onClick={() => openEdit(notif)}
                                        className="text-[#0F5132] hover:text-[#C9A227] text-xs font-medium"
                                    >
                                        {t('notifications', 'edit')}
                                    </button>
                                    <Link
                                        href={`/admin/notificaciones/${notif.id}/toggle`}
                                        method="post"
                                        className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                                    >
                                        {notif.activa ? t('notifications', 'deactivate') : t('notifications', 'activate')}
                                    </Link>
                                    <Link
                                        href={`/admin/notificaciones/${notif.id}`}
                                        method="delete"
                                        className="text-red-600 hover:text-red-800 text-xs font-medium"
                                    >
                                        {t('notifications', 'delete')}
                                    </Link>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {notificaciones.last_page > 1 && (
                    <div className="flex justify-center gap-2 mt-6 flex-wrap">
                        {notificaciones.prev_page_url && (
                            <Link href={notificaciones.prev_page_url} className="px-3 py-2 bg-white border rounded-lg hover:bg-gray-50 text-sm">
                                ← {t('common', 'previous')}
                            </Link>
                        )}
                        <span className="px-3 py-2 text-gray-600 text-sm">
                            {notificaciones.current_page} / {notificaciones.last_page}
                        </span>
                        {notificaciones.next_page_url && (
                            <Link href={notificaciones.next_page_url} className="px-3 py-2 bg-white border rounded-lg hover:bg-gray-50 text-sm">
                                {t('common', 'next')} →
                            </Link>
                        )}
                    </div>
                )}
            </div>

            <FormModal
                open={showModal}
                onClose={() => setShowModal(false)}
                title={editando ? t('notifications', 'edit') : t('notifications', 'createNew')}
                onSubmit={handleSubmit}
                submitText={editando ? t('notifications', 'update') : t('notifications', 'save')}
                processing={form.processing}
            >
                <FormField label={t('notifications', 'titleField')} name="titulo">
                    <input
                        type="text"
                        id="titulo"
                        value={form.data.titulo}
                        onChange={(e) => form.setData('titulo', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                        placeholder={t('notifications', 'titlePlaceholder')}
                    />
                </FormField>
                <FormField label={t('notifications', 'message')} name="mensaje" required>
                    <textarea
                        id="mensaje"
                        value={form.data.mensaje}
                        onChange={(e) => form.setData('mensaje', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                        rows={3}
                        required
                    />
                </FormField>
                <FormField label={t('notifications', 'priority')} name="prioridad">
                    <select
                        id="prioridad"
                        value={form.data.prioridad}
                        onChange={(e) => form.setData('prioridad', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                    >
                        {prioridades.map(p => (
                            <option key={p.value} value={p.value}>{p.label}</option>
                        ))}
                    </select>
                </FormField>
                <FormField label={t('notifications', 'expirationDate')} name="fecha_expiracion">
                    <input
                        type="date"
                        id="fecha_expiracion"
                        value={form.data.fecha_expiracion}
                        onChange={(e) => form.setData('fecha_expiracion', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                    />
                </FormField>
            </FormModal>
        </AdminLayout>
    );
}
