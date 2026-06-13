import { useState } from 'react';
import { usePage, router, Link } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import AdminTable from '../../Components/AdminTable';
import FormModal from '../../Components/FormModal';
import FormField from '../../Components/FormField';
import Pagination from '../../Components/Pagination';
import { useTranslation } from '../../hooks/useTranslation';

export default function Facturas() {
    const { t } = useTranslation();
    const { props } = usePage();
    const { facturas } = props;

    const [showModal, setShowModal] = useState(false);
    const [editando, setEditando] = useState(null);
    const [formData, setFormData] = useState({
        titulo: '',
        fecha: '',
        archivo_pdf: null,
        notas: '',
    });

    const openCreate = () => {
        setFormData({
            titulo: '',
            fecha: new Date().toISOString().split('T')[0],
            archivo_pdf: null,
            notas: '',
        });
        setEditando(null);
        setShowModal(true);
    };

    const openEdit = (factura) => {
        setFormData({
            titulo: factura.titulo || '',
            fecha: factura.fecha || '',
            archivo_pdf: null,
            notas: factura.notas || '',
        });
        setEditando(factura.id);
        setShowModal(true);
    };

    const handleSubmit = (e) => {
        const form = e.target;
        const data = new FormData(form);

        if (editando) {
            router.post(`/admin/facturas/${editando}`, data, {
                forceFormData: true,
                onSuccess: () => setShowModal(false),
            });
        } else {
            router.post('/admin/facturas', data, {
                forceFormData: true,
                onSuccess: () => setShowModal(false),
            });
        }
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, archivo_pdf: e.target.files[0] });
    };

    const columns = [
        { label: t('adminFacturas', 'tituloLabel') },
        { label: t('adminFacturas', 'fechaLabel') },
        { label: t('adminFacturas', 'archivoLabel'), align: 'center' },
        { label: t('adminFacturas', 'actions'), align: 'right' },
    ];

    const renderRow = (factura) => (
        <>
            <td className="px-4 py-3">
                <p className="font-medium text-gray-900">{factura.titulo}</p>
                {factura.notas && <p className="text-xs text-gray-500">{factura.notas}</p>}
            </td>
            <td className="px-4 py-3 text-sm text-gray-600">{new Date(factura.fecha).toLocaleDateString('es')}</td>
            <td className="px-4 py-3 text-center">
                {factura.archivo_pdf ? (
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">{t('facturas', 'pdfAvailable')}</span>
                ) : (
                    <span className="text-gray-400 text-sm">{t('facturas', 'noFile')}</span>
                )}
            </td>
            <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-2">
                    {factura.archivo_pdf && (
                        <a href={`/admin/facturas/${factura.id}/download`} className="px-2 py-1 text-xs text-blue-600 rounded hover:bg-blue-50">{t('facturas', 'download')}</a>
                    )}
                    <button onClick={() => openEdit(factura)} className="px-2 py-1 text-xs text-blue-600 rounded hover:bg-blue-50">{t('common', 'edit')}</button>
                    <Link href={`/admin/facturas/${factura.id}`} method="delete" className="px-2 py-1 text-xs text-red-600 rounded hover:bg-red-50">{t('common', 'delete')}</Link>
                </div>
            </td>
        </>
    );

    const renderMobileCard = (factura) => (
        <>
            <div className="mb-2">
                <h3 className="font-semibold text-gray-900 text-sm">{factura.titulo}</h3>
                {factura.notas && <p className="text-xs text-gray-500 mt-0.5">{factura.notas}</p>}
            </div>
            <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-gray-500">{new Date(factura.fecha).toLocaleDateString('es')}</span>
                {factura.archivo_pdf ? (
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">{t('facturas', 'pdfAvailable')}</span>
                ) : (
                    <span className="text-gray-400 text-xs">{t('facturas', 'noFile')}</span>
                )}
            </div>
            <div className="flex gap-2 pt-3 border-t border-gray-100">
                {factura.archivo_pdf && (
                    <a href={`/admin/facturas/${factura.id}/download`} className="flex-1 px-3 py-3 text-sm font-medium text-blue-700 border border-blue-200 rounded-xl hover:bg-blue-50 min-h-[44px] text-center block">
                        {t('facturas', 'download')}
                    </a>
                )}
                <button onClick={() => openEdit(factura)} className={`flex-1 px-3 py-3 text-sm font-medium text-blue-700 border border-blue-200 rounded-xl hover:bg-blue-50 min-h-[44px] ${!factura.archivo_pdf ? 'flex-1' : ''}`}>
                    {t('common', 'edit')}
                </button>
                <Link href={`/admin/facturas/${factura.id}`} method="delete" className="flex-1 px-3 py-3 text-sm font-medium text-red-700 border border-red-200 rounded-xl hover:bg-red-50 min-h-[44px] text-center block">
                    {t('common', 'delete')}
                </Link>
            </div>
        </>
    );

    return (
        <AdminLayout title={t('adminModules', 'invoices')}>
            <div className="px-2 sm:px-0">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-[#0F5132]">{t('adminModules', 'invoices')}</h1>
                        <p className="text-gray-600 text-sm hidden sm:block">{t('adminFacturas', 'description')}</p>
                    </div>
                    <button
                        onClick={openCreate}
                        className="w-full sm:w-auto px-4 py-2 bg-[#0F5132] text-white rounded-lg hover:bg-[#0c3f27] transition text-sm"
                    >
                        + {t('facturas', 'addNew')}
                    </button>
                </div>

                <AdminTable
                    columns={columns}
                    rows={facturas.data}
                    renderRow={renderRow}
                    renderMobileCard={renderMobileCard}
                    emptyMessage={t('facturas', 'noData')}
                    emptyColspan={4}
                />

                <Pagination meta={facturas} />
            </div>

            <FormModal
                open={showModal}
                onClose={() => setShowModal(false)}
                title={editando ? t('adminFacturas', 'editTitle') : t('facturas', 'addNew')}
                onSubmit={handleSubmit}
            >
                <FormField label={t('adminFacturas', 'tituloLabel')} name="titulo" required>
                    <input
                        type="text"
                        name="titulo"
                        id="titulo"
                        value={formData.titulo}
                        onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                        required
                    />
                </FormField>

                <FormField label={t('adminFacturas', 'fechaLabel')} name="fecha" required>
                    <input
                        type="date"
                        name="fecha"
                        id="fecha"
                        value={formData.fecha}
                        onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                        required
                    />
                </FormField>

                <FormField
                    label={editando
                        ? `${t('adminFacturas', 'archivoLabel')} ${t('facturas', 'optional')}`
                        : t('adminFacturas', 'archivoLabel')}
                    name="archivo_pdf"
                >
                    <input
                        type="file"
                        name="archivo_pdf"
                        id="archivo_pdf"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                        required={!editando}
                    />
                    <p className="text-xs text-gray-500 mt-1">{t('facturas', 'maxSize')}</p>
                </FormField>

                <FormField label={t('adminFacturas', 'notasLabel')} name="notas">
                    <textarea
                        name="notas"
                        id="notas"
                        value={formData.notas}
                        onChange={(e) => setFormData({ ...formData, notas: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                        rows="2"
                    />
                </FormField>
            </FormModal>
        </AdminLayout>
    );
}
