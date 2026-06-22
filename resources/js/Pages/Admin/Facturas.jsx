import { useState } from 'react';
import { usePage, router, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import AdminTable from '../../Components/AdminTable';
import FormModal from '../../Components/FormModal';
import FormField from '../../Components/FormField';
import { useTranslation } from '../../hooks/useTranslation';
import ModuleToggle from '../../Components/ModuleToggle';
import ConfirmDialog from '../../Components/ConfirmDialog';

export default function Facturas() {
    const { t } = useTranslation();
    const { props } = usePage();
    const { facturas } = props;

    const [showModal, setShowModal] = useState(false);
    const [editando, setEditando] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);

    const formData = useForm({
        titulo: '',
        fecha: '',
        archivo_pdf: null,
        notas: '',
    });

    const openCreate = () => {
        formData.reset();
        formData.clearErrors();
        setEditando(null);
        setShowModal(true);
    };

    const openEdit = (factura) => {
        formData.setData({
            titulo: factura.titulo || '',
            fecha: factura.fecha || '',
            archivo_pdf: null,
            notas: factura.notas || '',
        });
        setEditando(factura.id);
        setShowModal(true);
    };

    const handleSubmit = () => {
        const options = {
            forceFormData: true,
            onSuccess: () => {
                setShowModal(false);
                formData.reset();
            },
        };

        if (editando) {
            formData.put(`/admin/facturas/${editando}`, options);
        } else {
            formData.post('/admin/facturas', options);
        }
    };

    const columns = [
        { label: t('adminFacturas', 'tituloLabel') },
        { label: t('adminFacturas', 'fechaLabel') },
        { label: t('adminFacturas', 'archivo'), align: 'center' },
        { label: t('adminFacturas', 'actions'), align: 'right' },
    ];

    const renderRow = (factura) => (
        <>
            <td className="px-4 py-3">
                <p className="font-medium text-gray-900">{factura.titulo}</p>
                {factura.notas && (
                    <p className="text-xs text-gray-500 truncate max-w-xs">{factura.notas}</p>
                )}
            </td>
            <td className="px-4 py-3 text-sm text-gray-600">
                {new Date(factura.fecha).toLocaleDateString('es')}
            </td>
            <td className="px-4 py-3 text-center">
                {factura.archivo_pdf ? (
                    <span className="px-2 py-1 bg-red-50 text-red-600 rounded-lg text-xs font-medium">
                        PDF
                    </span>
                ) : (
                    <span className="text-gray-400 text-sm">{t('facturas', 'noFile')}</span>
                )}
            </td>
            <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-2">
                    {factura.archivo_pdf && (
                        <a
                            href={`/admin/facturas/${factura.id}/download`}
                            className="px-2 py-1 text-xs text-blue-600 rounded-lg hover:bg-blue-50 min-h-[32px] flex items-center"
                        >
                            {t('facturas', 'download')}
                        </a>
                    )}
                    <button
                        onClick={() => openEdit(factura)}
                        className="px-2 py-1 text-xs text-blue-600 rounded-lg hover:bg-blue-50 min-h-[32px]"
                    >
                        {t('common', 'edit')}
                    </button>
                    <button
                        onClick={() => setConfirmDelete(factura)}
                        className="px-2 py-1 text-xs text-red-600 rounded-lg hover:bg-red-50 min-h-[32px] flex items-center"
                    >
                        {t('common', 'delete')}
                    </button>
                </div>
            </td>
        </>
    );

    const renderMobileCard = (factura) => (
        <>
            <div className="flex items-start justify-between gap-3 mb-2">
                <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm">{factura.titulo}</h3>
                    {factura.notas && <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{factura.notas}</p>}
                    <p className="text-xs text-gray-400 mt-1">{new Date(factura.fecha).toLocaleDateString('es')}</p>
                </div>
                {factura.archivo_pdf ? (
                    <span className="px-2 py-1 bg-red-50 text-red-600 rounded-lg text-xs font-medium shrink-0">PDF</span>
                ) : (
                    <span className="text-gray-400 text-xs italic shrink-0">{t('facturas', 'noFile')}</span>
                )}
            </div>
            <div className="flex gap-2 pt-3 border-t border-gray-100">
                {factura.archivo_pdf && (
                    <a href={`/admin/facturas/${factura.id}/download`} className="flex-1 px-3 py-3 text-sm font-medium text-blue-700 border border-blue-200 rounded-xl hover:bg-blue-50 min-h-[44px] text-center block">
                        {t('facturas', 'download')}
                    </a>
                )}
                <button onClick={() => openEdit(factura)} className="flex-1 px-3 py-3 text-sm font-medium text-blue-700 border border-blue-200 rounded-xl hover:bg-blue-50 min-h-[44px]">
                    {t('common', 'edit')}
                </button>
                <button onClick={() => setConfirmDelete(factura)} className="flex-1 px-3 py-3 text-sm font-medium text-red-700 border border-red-200 rounded-xl hover:bg-red-50 min-h-[44px] text-center block">
                    {t('common', 'delete')}
                </button>
            </div>
        </>
    );

    return (
        <AdminLayout title={t('adminModules', 'invoices')}>
            <div className="px-2 sm:px-0">

                {confirmDelete && (
                    <ConfirmDialog
                        variant="danger"
                        title={t('common', 'confirm')}
                        message={t('common', 'confirmMessage')}
                        confirmLabel={t('common', 'delete')}
                        cancelLabel={t('common', 'cancel')}
                        onConfirm={() => {
                            router.delete(`/admin/facturas/${confirmDelete.id}`);
                            setConfirmDelete(null);
                        }}
                        onCancel={() => setConfirmDelete(null)}
                    />
                )}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <p className="text-gray-600 text-sm hidden sm:block">{t('adminFacturas', 'description')}</p>
                    <div className="flex items-center gap-3">
                        <ModuleToggle module="facturas" />
                        <button
                            onClick={openCreate}
                            className="px-4 py-2 bg-[#0F5132] text-white rounded-lg hover:bg-[#0c3f27] transition text-sm"
                        >
                            + {t('facturas', 'addNew')}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-xl shadow-sm border">
                        <p className="text-2xl font-bold text-[#0F5132]">{facturas.total || facturas.length}</p>
                        <p className="text-sm text-gray-600">{t('adminFacturas', 'total')}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border">
                        <p className="text-2xl font-bold text-[#C9A646]">{facturas.total || facturas.length}</p>
                        <p className="text-sm text-gray-600">{t('adminFacturas', 'numero')}</p>
                    </div>
                </div>

                <AdminTable
                    columns={columns}
                    rows={facturas.data || facturas}
                    renderRow={renderRow}
                    renderMobileCard={renderMobileCard}
                    emptyMessage={t('adminFacturas', 'noInvoices')}
                    emptyColspan={4}
                />

                {(facturas.last_page > 1) && (
                    <div className="flex justify-center gap-2 py-6">
                        {facturas.prev_page_url && (
                            <Link href={facturas.prev_page_url} className="px-4 py-2.5 bg-white border rounded-xl hover:bg-gray-50 text-sm min-h-[44px] flex items-center shadow-sm">
                                ← {t('common', 'previous')}
                            </Link>
                        )}
                        <span className="px-4 py-2.5 text-gray-600 text-sm flex items-center">
                            {facturas.current_page} / {facturas.last_page}
                        </span>
                        {facturas.next_page_url && (
                            <Link href={facturas.next_page_url} className="px-4 py-2.5 bg-white border rounded-xl hover:bg-gray-50 text-sm min-h-[44px] flex items-center shadow-sm">
                                {t('common', 'next')} →
                            </Link>
                        )}
                    </div>
                )}
            </div>

            <FormModal
                open={showModal}
                onClose={() => setShowModal(false)}
                title={editando ? t('adminFacturas', 'editTitle') : t('facturas', 'addNew')}
                onSubmit={handleSubmit}
                processing={formData.processing}
            >
                {formData.errors.titulo && <p className="text-red-600 text-sm mb-2">{formData.errors.titulo}</p>}
                {formData.errors.fecha && <p className="text-red-600 text-sm mb-2">{formData.errors.fecha}</p>}
                {formData.errors.archivo_pdf && <p className="text-red-600 text-sm mb-2">{formData.errors.archivo_pdf}</p>}

                <FormField label={t('adminFacturas', 'tituloLabel')} name="titulo" required>
                    <input
                        type="text"
                        id="titulo"
                        value={formData.data.titulo}
                        onChange={(e) => formData.setData('titulo', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                        required
                    />
                </FormField>

                <FormField label={t('adminFacturas', 'fechaLabel')} name="fecha" required>
                    <input
                        type="date"
                        id="fecha"
                        value={formData.data.fecha}
                        onChange={(e) => formData.setData('fecha', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                        required
                    />
                </FormField>

                <FormField label={`${t('adminFacturas', 'archivoLabel')} ${editando ? t('facturas', 'optional') : '*'}`} name="archivo_pdf">
                    <input
                        type="file"
                        id="archivo_pdf"
                        accept=".pdf"
                        onChange={(e) => formData.setData('archivo_pdf', e.target.files[0])}
                        className="w-full px-3 py-2 border rounded-lg text-sm file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-[#0F5132] file:text-white file:cursor-pointer"
                        required={!editando}
                    />
                    <p className="text-xs text-gray-500 mt-1">{t('facturas', 'maxSize')}</p>
                </FormField>

                <FormField label={t('adminFacturas', 'notasLabel')} name="notas">
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
