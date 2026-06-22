import { useState } from 'react';
import { usePage, router, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import AdminTable from '../../Components/AdminTable';
import FormModal from '../../Components/FormModal';
import FormField from '../../Components/FormField';
import { useTranslation } from '../../hooks/useTranslation';
import ModuleToggle from '../../Components/ModuleToggle';
import ConfirmDialog from '../../Components/ConfirmDialog';

export default function Notificaciones({ notificaciones, filtros }) {
    const { t } = useTranslation();
    const [showModal, setShowModal] = useState(false);
    const [editando, setEditando] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);

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

    const handleSubmit = () => {
        const options = {
            onSuccess: () => {
                setShowModal(false);
                form.reset();
            },
        };
        if (editando) {
            form.put(`/admin/notificaciones/${editando}`, options);
        } else {
            form.post('/admin/notificaciones', options);
        }
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

    const activeCount = notificaciones.data.filter(n => n.activa).length;
    const inactiveCount = notificaciones.data.filter(n => !n.activa).length;

    const columns = [
        { label: t('notifications', 'titleField') },
        { label: t('notifications', 'priority') },
        { label: t('notifications', 'date') },
        { label: t('common', 'state'), align: 'center' },
        { label: t('common', 'actions'), align: 'right' },
    ];

    const renderRow = (notif) => (
        <>
            <td className="px-4 py-3">
                <p className="font-medium text-gray-900">{notif.titulo || 'Sin título'}</p>
                <p className="text-xs text-gray-500 line-clamp-1">{notif.mensaje}</p>
            </td>
            <td className="px-4 py-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityClass(notif.prioridad)}`}>
                    {prioridades.find(p => p.value === notif.prioridad)?.label || t('notifications', 'normal')}
                </span>
            </td>
            <td className="px-4 py-3 text-sm text-gray-500">
                {new Date(notif.fecha_publicacion).toLocaleDateString('es')}
            </td>
            <td className="px-4 py-3 text-center">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${notif.activa ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                    {t('notifications', notif.activa ? 'active' : 'inactive')}
                </span>
            </td>
            <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-2">
                    <button onClick={() => openEdit(notif)} className="px-2 py-1 text-xs text-blue-600 rounded-lg hover:bg-blue-50 min-h-[32px]">{t('notifications', 'edit')}</button>
                    <Link href={`/admin/notificaciones/${notif.id}/toggle`} method="post" className="px-2 py-1 text-xs text-orange-600 rounded-lg hover:bg-orange-50 min-h-[32px]">
                        {notif.activa ? t('notifications', 'deactivate') : t('notifications', 'activate')}
                    </Link>
                    <button onClick={() => setConfirmDelete(notif)} className="px-2 py-1 text-xs text-red-600 rounded-lg hover:bg-red-50 min-h-[32px] flex items-center">
                        {t('notifications', 'delete')}
                    </button>
                </div>
            </td>
        </>
    );

    const renderMobileCard = (notif) => (
        <>
            <div className="flex items-start justify-between gap-3 mb-2">
                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityClass(notif.prioridad)}`}>
                            {prioridades.find(p => p.value === notif.prioridad)?.label || t('notifications', 'normal')}
                        </span>
                        <span className="text-xs text-gray-400">{new Date(notif.fecha_publicacion).toLocaleDateString('es')}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm">{notif.titulo || 'Sin título'}</h3>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{notif.mensaje}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${notif.activa ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                    {t('notifications', notif.activa ? 'active' : 'inactive')}
                </span>
            </div>
            <div className="flex gap-2 pt-3 border-t border-gray-100">
                <button onClick={() => openEdit(notif)} className="flex-1 px-3 py-3 text-sm font-medium text-blue-700 border border-blue-200 rounded-xl hover:bg-blue-50 min-h-[44px]">
                    {t('notifications', 'edit')}
                </button>
                <Link href={`/admin/notificaciones/${notif.id}/toggle`} method="post" className="flex-1 px-3 py-3 text-sm font-medium text-orange-700 border border-orange-200 rounded-xl hover:bg-orange-50 min-h-[44px] text-center block">
                    {notif.activa ? t('notifications', 'deactivate') : t('notifications', 'activate')}
                </Link>
                <button onClick={() => setConfirmDelete(notif)} className="flex-1 px-3 py-3 text-sm font-medium text-red-700 border border-red-200 rounded-xl hover:bg-red-50 min-h-[44px] text-center block">
                    {t('notifications', 'delete')}
                </button>
            </div>
        </>
    );

    return (
        <AdminLayout title={t('notifications', 'title')}>

            {confirmDelete && (
                <ConfirmDialog
                    variant="danger"
                    title={t('common', 'confirm')}
                    message={t('common', 'confirmMessage')}
                    confirmLabel={t('notifications', 'delete')}
                    cancelLabel={t('common', 'cancel')}
                    onConfirm={() => {
                        router.delete(`/admin/notificaciones/${confirmDelete.id}`);
                        setConfirmDelete(null);
                    }}
                    onCancel={() => setConfirmDelete(null)}
                />
            )}
            <div className="px-2 sm:px-0">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <p className="text-gray-600 text-sm hidden sm:block">{t('notifications', 'subtitle')}</p>
                    <div className="flex items-center gap-3">
                        <ModuleToggle module="notificaciones" />
                        <button onClick={openCreate} className="px-4 py-2 bg-[#0F5132] text-white rounded-lg hover:bg-[#0c3f27] transition text-sm">
                            + {t('notifications', 'createNew')}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-xl shadow-sm border">
                        <p className="text-2xl font-bold text-[#0F5132]">{notificaciones.total || notificaciones.data.length}</p>
                        <p className="text-sm text-gray-600">{t('notifications', 'title')}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border">
                        <p className="text-2xl font-bold text-green-600">{activeCount}</p>
                        <p className="text-sm text-gray-600">{t('notifications', 'active')}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border">
                        <p className="text-2xl font-bold text-gray-400">{inactiveCount}</p>
                        <p className="text-sm text-gray-600">{t('notifications', 'inactive')}</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
                    <form method="get" className="space-y-3">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input type="text" name="busqueda" defaultValue={filtros?.busqueda}
                                placeholder={t('notifications', 'search')}
                                className="flex-1 px-3 py-2.5 border rounded-lg text-sm min-h-[44px]" />
                            <select name="estado" defaultValue={filtros?.estado}
                                className="sm:w-36 px-3 py-2.5 border rounded-lg text-sm min-h-[44px]">
                                <option value="">{t('notifications', 'all')}</option>
                                <option value="activas">{t('notifications', 'activas')}</option>
                                <option value="inactivas">{t('notifications', 'inactivas')}</option>
                            </select>
                            <select name="prioridad" defaultValue={filtros?.prioridad}
                                className="sm:w-36 px-3 py-2.5 border rounded-lg text-sm min-h-[44px]">
                                <option value="">{t('notifications', 'priority')}</option>
                                {prioridades.map(p => (
                                    <option key={p.value} value={p.value}>{p.label}</option>
                                ))}
                            </select>
                            <button type="submit"
                                className="px-5 py-2.5 bg-[#C9A646] text-white rounded-lg hover:bg-[#b88a36] text-sm min-h-[44px]">
                                {t('notifications', 'filter')}
                            </button>
                        </div>
                    </form>
                </div>

                <AdminTable
                    columns={columns}
                    rows={notificaciones.data}
                    renderRow={renderRow}
                    renderMobileCard={renderMobileCard}
                    emptyMessage={t('notifications', 'noNotifications')}
                    emptyColspan={5}
                />

                {notificaciones.last_page > 1 && (
                    <div className="flex justify-center gap-2 py-6">
                        {notificaciones.prev_page_url && (
                            <Link href={notificaciones.prev_page_url} className="px-4 py-2.5 bg-white border rounded-xl hover:bg-gray-50 text-sm min-h-[44px] flex items-center shadow-sm">
                                ← {t('common', 'previous')}
                            </Link>
                        )}
                        <span className="px-4 py-2.5 text-gray-600 text-sm flex items-center">
                            {notificaciones.current_page} / {notificaciones.last_page}
                        </span>
                        {notificaciones.next_page_url && (
                            <Link href={notificaciones.next_page_url} className="px-4 py-2.5 bg-white border rounded-xl hover:bg-gray-50 text-sm min-h-[44px] flex items-center shadow-sm">
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
                processing={form.processing}
            >
                {form.errors.titulo && <p className="text-red-600 text-sm mb-2">{form.errors.titulo}</p>}
                {form.errors.mensaje && <p className="text-red-600 text-sm mb-2">{form.errors.mensaje}</p>}

                <FormField label={t('notifications', 'titleField')} name="titulo">
                    <input type="text" id="titulo" value={form.data.titulo}
                        onChange={(e) => form.setData('titulo', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                        placeholder={t('notifications', 'titlePlaceholder')} />
                </FormField>
                <FormField label={t('notifications', 'message')} name="mensaje" required>
                    <textarea id="mensaje" value={form.data.mensaje}
                        onChange={(e) => form.setData('mensaje', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-sm" rows={3} required />
                </FormField>
                <div className="grid grid-cols-2 gap-4">
                    <FormField label={t('notifications', 'priority')} name="prioridad">
                        <select id="prioridad" value={form.data.prioridad}
                            onChange={(e) => form.setData('prioridad', e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg text-sm">
                            {prioridades.map(p => (
                                <option key={p.value} value={p.value}>{p.label}</option>
                            ))}
                        </select>
                    </FormField>
                    <FormField label={t('notifications', 'expirationDate')} name="fecha_expiracion">
                        <input type="date" id="fecha_expiracion" value={form.data.fecha_expiracion}
                            onChange={(e) => form.setData('fecha_expiracion', e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg text-sm" />
                    </FormField>
                </div>
                <div className="flex items-center gap-2">
                    <input type="checkbox" id="activa" checked={form.data.activa}
                        onChange={(e) => form.setData('activa', e.target.checked)} className="rounded" />
                    <label htmlFor="activa" className="text-sm text-gray-700">{t('notifications', 'active')}</label>
                </div>
            </FormModal>
        </AdminLayout>
    );
}
