import { useState, useRef } from 'react';
import { router, usePage, Link } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import AdminTable from '../../Components/AdminTable';
import FormModal from '../../Components/FormModal';
import FormField from '../../Components/FormField';
import { useTranslation } from '../../hooks/useTranslation';
import ConfirmDialog from '../../Components/ConfirmDialog';

export default function Normas() {
    const { t } = useTranslation();
    const { props } = usePage();
    const { normas } = props;

    const [showModal, setShowModal] = useState(false);
    const [editando, setEditando] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [activo, setActivo] = useState(true);
    const [orden, setOrden] = useState(0);
    const [imagenPreview, setImagenPreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [removeImagen, setRemoveImagen] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const fileInputRef = useRef(null);

    const openCreate = () => {
        setTitulo('');
        setDescripcion('');
        setActivo(true);
        setOrden(0);
        setEditando(null);
        setImagenPreview(null);
        setSelectedFile(null);
        setRemoveImagen(false);
        setShowModal(true);
    };

    const openEdit = (norma) => {
        setTitulo(norma.titulo || '');
        setDescripcion(norma.descripcion || '');
        setActivo(norma.activo ?? true);
        setOrden(norma.orden ?? 0);
        setEditando(norma.id);
        setImagenPreview(norma.imagen || null);
        setSelectedFile(null);
        setRemoveImagen(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        setShowModal(true);
    };

    const handleImagenChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setRemoveImagen(false);
            setImagenPreview(URL.createObjectURL(file));
        }
    };

    const handleRemoveImagen = () => {
        setSelectedFile(null);
        setRemoveImagen(true);
        setImagenPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = () => {
        setProcessing(true);

        const fd = new FormData();
        fd.append('titulo', titulo);
        fd.append('descripcion', descripcion || '');
        fd.append('activo', activo ? '1' : '0');
        fd.append('orden', String(orden || 0));

        if (selectedFile) {
            fd.append('imagen', selectedFile);
        } else if (removeImagen) {
            fd.append('remove_imagen', '1');
        }

        const url = editando ? `/admin/normas/${editando}` : '/admin/normas';
        if (editando) {
            fd.append('_method', 'PUT');
        }

        router.post(url, fd, {
            preserveScroll: true,
            onSuccess: () => {
                setShowModal(false);
                setProcessing(false);
            },
            onError: () => {
                setProcessing(false);
            },
            onFinish: () => {
                setProcessing(false);
            },
        });
    };

    const activeNormas = normas.filter(n => n.activo);
    const inactiveNormas = normas.filter(n => !n.activo);

    const GEOMETRIC_ICONS = [
        <svg className="w-6 h-6" viewBox="0 0 48 48" fill="none"><path d="M24 4L44 24L24 44L4 24L24 4Z" stroke="currentColor" strokeWidth="1.5"/><path d="M24 12L36 24L24 36L12 24L24 12Z" stroke="currentColor" strokeWidth="1" opacity="0.5"/></svg>,
        <svg className="w-6 h-6" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.5"/><circle cx="24" cy="24" r="12" stroke="currentColor" strokeWidth="1" opacity="0.5"/><circle cx="24" cy="24" r="4" fill="currentColor" opacity="0.3"/></svg>,
        <svg className="w-6 h-6" viewBox="0 0 48 48" fill="none"><path d="M24 2L29.3 16.7L44 18.5L32.8 29.1L35.8 44L24 36.7L12.2 44L15.2 29.1L4 18.5L18.7 16.7L24 2Z" stroke="currentColor" strokeWidth="1.5"/></svg>,
        <svg className="w-6 h-6" viewBox="0 0 48 48" fill="none"><rect x="4" y="4" width="40" height="40" rx="4" stroke="currentColor" strokeWidth="1.5"/><rect x="12" y="12" width="24" height="24" rx="2" stroke="currentColor" strokeWidth="1" opacity="0.5"/></svg>,
        <svg className="w-6 h-6" viewBox="0 0 48 48" fill="none"><path d="M24 8L40 24L24 40L8 24L24 8Z" stroke="currentColor" strokeWidth="1.5"/><path d="M24 16L32 24L24 32L16 24L24 16Z" stroke="currentColor" strokeWidth="1" opacity="0.5"/><circle cx="24" cy="24" r="3" fill="currentColor" opacity="0.3"/></svg>,
    ];

    const columns = [
        { label: t('adminNormas', 'imagenLabel') },
        { label: t('adminNormas', 'tituloLabel') },
        { label: t('adminNormas', 'descripcionLabel') },
        { label: t('adminNormas', 'orderLabel'), align: 'center' },
        { label: t('adminNormas', 'state'), align: 'center' },
        { label: t('adminNormas', 'actions'), align: 'right' },
    ];

    const renderRow = (norma) => (
        <>
            <td className="px-4 py-3">
                {norma.imagen ? (
                    <img src={norma.imagen} alt={norma.titulo} className="w-12 h-12 object-cover rounded-lg" loading="lazy" />
                ) : (
                    <div className="w-12 h-12 bg-[#C9A646]/10 rounded-lg flex items-center justify-center text-[#C9A646]">
                        {GEOMETRIC_ICONS[norma.orden % GEOMETRIC_ICONS.length]}
                    </div>
                )}
            </td>
            <td className="px-4 py-3">
                <p className="font-medium text-gray-900">{norma.titulo}</p>
            </td>
            <td className="px-4 py-3">
                {norma.descripcion ? (
                    <p className="text-xs text-gray-500 line-clamp-2">{norma.descripcion}</p>
                ) : <span className="text-gray-400">-</span>}
            </td>
            <td className="px-4 py-3 text-center text-sm text-gray-600">
                {norma.orden ?? '-'}
            </td>
            <td className="px-4 py-3 text-center">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${norma.activo ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                    {norma.activo ? t('common', 'active') : t('common', 'inactive')}
                </span>
            </td>
            <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-2">
                    <button onClick={() => openEdit(norma)} className="px-2 py-1 text-xs text-blue-600 rounded hover:bg-blue-50">{t('common', 'edit')}</button>
                    <button onClick={() => setConfirmDelete(norma)} className="px-2 py-1 text-xs text-red-600 rounded hover:bg-red-50">{t('common', 'delete')}</button>
                </div>
            </td>
        </>
    );

    const renderMobileCard = (norma) => (
        <>
            <div className="flex items-start gap-3 mb-2">
                {norma.imagen ? (
                    <img src={norma.imagen} alt={norma.titulo} className="w-12 h-12 object-cover rounded-lg shrink-0" loading="lazy" />
                ) : (
                    <div className="w-12 h-12 bg-[#C9A646]/10 rounded-lg flex items-center justify-center text-[#C9A646] shrink-0">
                        {GEOMETRIC_ICONS[norma.orden % GEOMETRIC_ICONS.length]}
                    </div>
                )}
                <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm">{norma.titulo}</h3>
                    {norma.descripcion && <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{norma.descripcion}</p>}
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${norma.activo ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                    {norma.activo ? t('common', 'active') : t('common', 'inactive')}
                </span>
            </div>
            <div className="flex gap-2 pt-3 border-t border-gray-100">
                <button onClick={() => openEdit(norma)} className="flex-1 px-3 py-3 text-sm font-medium text-blue-700 border border-blue-200 rounded-xl hover:bg-blue-50 min-h-[44px]">
                    {t('common', 'edit')}
                </button>
                <button onClick={() => setConfirmDelete(norma)} className="flex-1 px-3 py-3 text-sm font-medium text-red-700 border border-red-200 rounded-xl hover:bg-red-50 min-h-[44px] text-center block">
                    {t('common', 'delete')}
                </button>
            </div>
        </>
    );

    return (
        <AdminLayout title={t('adminModules', 'normas')}>
            <div className="px-2 sm:px-0">

                {confirmDelete && (
                    <ConfirmDialog
                        variant="danger"
                        title={t('common', 'confirm')}
                        message={t('common', 'confirmMessage')}
                        confirmLabel={t('common', 'delete')}
                        cancelLabel={t('common', 'cancel')}
                        onConfirm={() => {
                            router.delete(`/admin/normas/${confirmDelete.id}`);
                            setConfirmDelete(null);
                        }}
                        onCancel={() => setConfirmDelete(null)}
                    />
                )}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-[#0F5132]">{t('adminModules', 'normas')}</h1>
                        <p className="text-gray-600 text-sm hidden sm:block">{t('adminNormas', 'subtitle')}</p>
                    </div>
                    <button
                        onClick={openCreate}
                        className="w-full sm:w-auto px-4 py-2 bg-[#0F5132] text-white rounded-lg hover:bg-[#0c3f27] transition text-sm"
                    >
                        + {t('adminNormas', 'addNew')}
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-xl shadow-sm border">
                        <p className="text-2xl font-bold text-[#0F5132]">{normas.length}</p>
                        <p className="text-sm text-gray-600">{t('adminNormas', 'total')}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border">
                        <p className="text-2xl font-bold text-green-600">{activeNormas.length}</p>
                        <p className="text-sm text-gray-600">{t('adminNormas', 'active')}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border">
                        <p className="text-2xl font-bold text-gray-400">{inactiveNormas.length}</p>
                        <p className="text-sm text-gray-600">{t('adminNormas', 'inactive')}</p>
                    </div>
                </div>

                <AdminTable
                    columns={columns}
                    rows={normas}
                    renderRow={renderRow}
                    renderMobileCard={renderMobileCard}
                    emptyMessage={t('adminNormas', 'noNormas')}
                    emptyColspan={6}
                />
            </div>

            <FormModal
                open={showModal}
                onClose={() => setShowModal(false)}
                title={editando ? t('adminNormas', 'editTitle') : t('adminNormas', 'addNew')}
                onSubmit={handleSubmit}
                processing={processing}
            >
                <FormField label={t('adminNormas', 'tituloLabel')} name="titulo" required>
                    <input
                        type="text"
                        id="titulo"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                        required
                    />
                </FormField>

                <FormField label={t('adminNormas', 'descripcionLabel')} name="descripcion">
                    <textarea
                        id="descripcion"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                        rows="3"
                    />
                </FormField>

                <FormField label={t('adminNormas', 'imagenLabel')} name="imagen">
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImagenChange}
                        className="w-full px-3 py-2 border rounded-lg text-sm file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-[#0F5132] file:text-white file:cursor-pointer"
                    />
                    {imagenPreview && (
                        <div className="mt-2 relative inline-block">
                            <img src={imagenPreview} alt="Preview" className="w-24 h-16 object-cover rounded-lg" />
                            <button
                                type="button"
                                onClick={handleRemoveImagen}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                            >
                                ×
                            </button>
                        </div>
                    )}
                </FormField>

                <FormField label={t('adminNormas', 'orderLabel')} name="orden">
                    <input
                        type="number"
                        id="orden"
                        value={orden}
                        onChange={(e) => setOrden(parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                        min="0"
                    />
                </FormField>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="activo"
                        checked={activo}
                        onChange={(e) => setActivo(e.target.checked)}
                        className="rounded"
                    />
                    <label htmlFor="activo" className="text-sm text-gray-700">{t('adminNormas', 'activoLabel')}</label>
                </div>
            </FormModal>
        </AdminLayout>
    );
}
