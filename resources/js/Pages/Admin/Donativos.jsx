import { useState } from 'react';
import { usePage, router, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import AdminTable from '../../Components/AdminTable';
import FormModal from '../../Components/FormModal';
import FormField from '../../Components/FormField';
import { useTranslation } from '../../hooks/useTranslation';
import ModuleToggle from '../../Components/ModuleToggle';
import ConfirmDialog from '../../Components/ConfirmDialog';

export default function Donativos() {
    const { t } = useTranslation();
    const { props } = usePage();
    const { donativos, años, filtros, stats } = props;

    const [showModal, setShowModal] = useState(false);
    const [editando, setEditando] = useState(null);
    const [searchTerm, setSearchTerm] = useState(filtros?.search || '');
    const [confirmDelete, setConfirmDelete] = useState(null);

    const formData = useForm({
        nombre_arabe: '',
        nombre: '',
        cantidad: '',
        pagado: false,
        año: filtros?.año || new Date().getFullYear(),
        notas: '',
    });

    const openCreate = () => {
        formData.reset();
        formData.clearErrors();
        setEditando(null);
        setShowModal(true);
    };

    const openEdit = (donativo) => {
        formData.setData({
            nombre_arabe: donativo.nombre_arabe || '',
            nombre: donativo.nombre || '',
            cantidad: donativo.cantidad || '',
            pagado: donativo.pagado || false,
            año: donativo.año || filtros?.año || new Date().getFullYear(),
            notas: donativo.notas || '',
        });
        setEditando(donativo.id);
        setShowModal(true);
    };

    const handleSubmit = () => {
        if (editando) {
            formData.put(`/admin/donativos/${editando}`, {
                onSuccess: () => {
                    setShowModal(false);
                    formData.reset();
                },
            });
        } else {
            formData.post('/admin/donativos', {
                onSuccess: () => {
                    setShowModal(false);
                    formData.reset();
                },
            });
        }
    };

    const handleSearch = (value) => {
        setSearchTerm(value);
        router.get('/admin/donativos', {
            año: filtros?.año,
            search: value,
        }, { preserveState: true, replace: true });
    };

    const columns = [
        { label: t('adminDonativos', 'nombreLabel') },
        { label: t('adminDonativos', 'amount'), align: 'center' },
        { label: t('adminDonativos', 'state'), align: 'center' },
        { label: t('adminDonativos', 'date'), align: 'center' },
        { label: t('adminDonativos', 'actions'), align: 'right' },
    ];

    const renderRow = (donativo) => (
        <>
            <td className="px-4 py-3">
                <div>
                    <p className="font-medium text-gray-900">{donativo.nombre}</p>
                    {donativo.nombre_arabe && (
                        <p className="text-xs text-gray-500 mt-0.5">{donativo.nombre_arabe}</p>
                    )}
                </div>
            </td>
            <td className="px-4 py-3 text-center font-semibold text-[#0F5132]">
                {parseFloat(donativo.cantidad).toFixed(2)} €
            </td>
            <td className="px-4 py-3 text-center">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    donativo.pagado
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                }`}>
                    {donativo.pagado ? t('adminDonativos', 'paid') : t('adminDonativos', 'pending')}
                </span>
            </td>
            <td className="px-4 py-3 text-center text-sm text-gray-500">
                {new Date(donativo.created_at).toLocaleDateString('es')}
            </td>
            <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-2">
                    <Link
                        href={`/admin/donativos/${donativo.id}/toggle`}
                        method="post"
                        className="px-2 py-1 text-xs rounded-lg hover:bg-gray-100 min-h-[32px] flex items-center"
                    >
                        {donativo.pagado ? t('adminDonativos', 'pending') : t('adminDonativos', 'paid')}
                    </Link>
                    <button
                        onClick={() => openEdit(donativo)}
                        className="px-2 py-1 text-xs text-blue-600 rounded-lg hover:bg-blue-50 min-h-[32px]"
                    >
                        {t('common', 'edit')}
                    </button>
                    <button
                        onClick={() => setConfirmDelete(donativo)}
                        className="px-2 py-1 text-xs text-red-600 rounded-lg hover:bg-red-50 min-h-[32px] flex items-center"
                    >
                        {t('common', 'delete')}
                    </button>
                </div>
            </td>
        </>
    );

    const renderMobileCard = (donativo) => (
        <>
            <div className="flex items-start justify-between gap-3 mb-2">
                <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm">{donativo.nombre}</h3>
                    {donativo.nombre_arabe && <p className="text-xs text-gray-500" dir="rtl">{donativo.nombre_arabe}</p>}
                    <p className="text-xs text-gray-400 mt-1">{new Date(donativo.created_at).toLocaleDateString('es')}</p>
                </div>
                <div className="text-right shrink-0">
                    <p className="font-semibold text-[#0F5132] text-sm">{parseFloat(donativo.cantidad).toFixed(2)} €</p>
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${
                        donativo.pagado ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                        {donativo.pagado ? t('adminDonativos', 'paid') : t('adminDonativos', 'pending')}
                    </span>
                </div>
            </div>
            <div className="flex gap-2 pt-3 border-t border-gray-100">
                <Link href={`/admin/donativos/${donativo.id}/toggle`} method="post" className="flex-1 px-3 py-3 text-sm font-medium border border-gray-200 rounded-xl hover:bg-gray-50 min-h-[44px] text-center block">
                    {donativo.pagado ? t('adminDonativos', 'pending') : t('adminDonativos', 'paid')}
                </Link>
                <button onClick={() => openEdit(donativo)} className="flex-1 px-3 py-3 text-sm font-medium text-blue-700 border border-blue-200 rounded-xl hover:bg-blue-50 min-h-[44px]">
                    {t('common', 'edit')}
                </button>
                <button onClick={() => setConfirmDelete(donativo)} className="flex-1 px-3 py-3 text-sm font-medium text-red-700 border border-red-200 rounded-xl hover:bg-red-50 min-h-[44px] text-center block">
                    {t('common', 'delete')}
                </button>
            </div>
        </>
    );

    return (
        <AdminLayout title={t('adminModules', 'donations')}>

            {confirmDelete && (
                <ConfirmDialog
                    variant="danger"
                    title={t('common', 'confirm')}
                    message={t('common', 'confirmMessage')}
                    confirmLabel={t('common', 'delete')}
                    cancelLabel={t('common', 'cancel')}
                    onConfirm={() => {
                        router.delete(`/admin/donativos/${confirmDelete.id}`);
                        setConfirmDelete(null);
                    }}
                    onCancel={() => setConfirmDelete(null)}
                />
            )}
            <div className="px-2 sm:px-0">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-[#0F5132]">{t('adminModules', 'donations')}</h1>
                        <p className="text-gray-600 text-sm hidden sm:block">{t('adminDonativos', 'description')}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <ModuleToggle module="donativos" />
                        <button
                            onClick={openCreate}
                            className="px-4 py-2 bg-[#0F5132] text-white rounded-lg hover:bg-[#0c3f27] transition text-sm"
                        >
                            + {t('donativos', 'addNew')}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-xl shadow-sm border">
                        <p className="text-2xl font-bold text-[#0F5132]">{stats?.total || 0}</p>
                        <p className="text-sm text-gray-600">{t('adminDonativos', 'total')}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border">
                        <p className="text-2xl font-bold text-green-600">{stats?.pagados || 0}</p>
                        <p className="text-sm text-gray-600">{t('adminDonativos', 'paidStats')}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border">
                        <p className="text-2xl font-bold text-yellow-600">{stats?.pendientes || 0}</p>
                        <p className="text-sm text-gray-600">{t('adminDonativos', 'pendingStats')}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border">
                        <p className="text-2xl font-bold text-[#C9A646]">{stats?.totalCantidad || 0} €</p>
                        <p className="text-sm text-gray-600">{t('adminDonativos', 'collectedStats')}</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <select
                                value={filtros?.año}
                                onChange={(e) => router.get('/admin/donativos', { año: e.target.value })}
                                className="appearance-none w-full px-4 py-2.5 pr-8 border rounded-lg text-sm bg-white min-h-[44px]"
                            >
                                <option value="">{t('donativos', 'allYears')}</option>
                                {años.map(año => (
                                    <option key={año} value={año}>{año}</option>
                                ))}
                            </select>
                            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder={t('donativos', 'searchPlaceholder')}
                            value={searchTerm}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="flex-1 px-4 py-2.5 border rounded-lg text-sm min-h-[44px]"
                        />
                    </div>
                </div>

                <AdminTable
                    columns={columns}
                    rows={donativos.data || []}
                    renderRow={renderRow}
                    renderMobileCard={renderMobileCard}
                    emptyMessage={t('donativos', 'noDonations')}
                    emptyColspan={5}
                />

                {(donativos.last_page > 1) && (
                    <div className="flex justify-center gap-2 py-6">
                        {donativos.prev_page_url && (
                            <Link href={donativos.prev_page_url} className="px-4 py-2.5 bg-white border rounded-xl hover:bg-gray-50 text-sm min-h-[44px] flex items-center shadow-sm">
                                ← {t('common', 'previous')}
                            </Link>
                        )}
                        <span className="px-4 py-2.5 text-gray-600 text-sm flex items-center">
                            {donativos.current_page} / {donativos.last_page}
                        </span>
                        {donativos.next_page_url && (
                            <Link href={donativos.next_page_url} className="px-4 py-2.5 bg-white border rounded-xl hover:bg-gray-50 text-sm min-h-[44px] flex items-center shadow-sm">
                                {t('common', 'next')} →
                            </Link>
                        )}
                    </div>
                )}
            </div>

            <FormModal
                open={showModal}
                onClose={() => setShowModal(false)}
                title={editando ? t('adminDonativos', 'editTitle') : t('donativos', 'addNew')}
                onSubmit={handleSubmit}
                processing={formData.processing}
            >
                <FormField label={t('adminDonativos', 'nombreLabel')} name="nombre" required>
                    <input
                        type="text"
                        id="nombre"
                        value={formData.data.nombre}
                        onChange={(e) => formData.setData('nombre', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                        required
                    />
                </FormField>

                <FormField label={t('adminDonativos', 'nombreArLabel')} name="nombre_arabe">
                    <input
                        type="text"
                        id="nombre_arabe"
                        value={formData.data.nombre_arabe}
                        onChange={(e) => formData.setData('nombre_arabe', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                        dir="rtl"
                    />
                </FormField>

                <div className="grid grid-cols-2 gap-4">
                    <FormField label={t('adminDonativos', 'cantidadLabel')} name="cantidad" required>
                        <input
                            type="number"
                            id="cantidad"
                            step="0.01"
                            value={formData.data.cantidad}
                            onChange={(e) => formData.setData('cantidad', e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg text-sm"
                            required
                        />
                    </FormField>

                    <FormField label={t('adminDonativos', 'yearLabel')} name="año" required>
                        <input
                            type="number"
                            id="año"
                            value={formData.data.año}
                            onChange={(e) => formData.setData('año', e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg text-sm"
                            required
                        />
                    </FormField>
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="pagado"
                        checked={formData.data.pagado}
                        onChange={(e) => formData.setData('pagado', e.target.checked)}
                        className="rounded"
                    />
                    <label htmlFor="pagado" className="text-sm text-gray-700">{t('adminDonativos', 'paidLabel')}</label>
                </div>

                <FormField label={t('adminDonativos', 'notasLabel')} name="notas">
                    <textarea
                        id="notas"
                        value={formData.data.notas}
                        onChange={(e) => formData.setData('notas', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                        rows="2"
                    />
                </FormField>
            </FormModal>
        </AdminLayout>
    );
}
