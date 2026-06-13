import { useState } from 'react';
import { usePage, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import AdminTable from '../../Components/AdminTable';
import FormModal from '../../Components/FormModal';
import FormField from '../../Components/FormField';
import { useTranslation } from '../../hooks/useTranslation';

export default function Clases() {
    const { t } = useTranslation();
    const { props } = usePage();
    const { clases } = props;

    const [showModal, setShowModal] = useState(false);
    const [editando, setEditando] = useState(null);

    const formData = useForm({
        titulo: '',
        descripcion: '',
        horarios: '',
        nivel: '',
        profesor: '',
        requisitos: '',
        activo: true,
    });

    const openCreate = () => {
        formData.reset();
        formData.clearErrors();
        setEditando(null);
        setShowModal(true);
    };

    const openEdit = (clase) => {
        formData.setData({
            titulo: clase.titulo || '',
            descripcion: clase.descripcion || '',
            horarios: clase.horarios || '',
            nivel: clase.nivel || '',
            profesor: clase.profesor || '',
            requisitos: clase.requisitos || '',
            activo: clase.activo ?? true,
        });
        setEditando(clase.id);
        setShowModal(true);
    };

    const handleSubmit = () => {
        if (editando) {
            formData.put(`/admin/clases/${editando}`, {
                onSuccess: () => {
                    setShowModal(false);
                    formData.reset();
                },
            });
        } else {
            formData.post('/admin/clases', {
                onSuccess: () => {
                    setShowModal(false);
                    formData.reset();
                },
            });
        }
    };

    const activeClases = clases.filter(c => c.activo);
    const inactiveClases = clases.filter(c => !c.activo);

    const columns = [
        { label: t('adminClases', 'tituloLabel') },
        { label: t('adminClases', 'nivelLabel') },
        { label: t('adminClases', 'horarioLabel') },
        { label: t('adminClases', 'profesorLabel') },
        { label: t('adminClases', 'state'), align: 'center' },
        { label: t('adminClases', 'actions'), align: 'right' },
    ];

    const renderRow = (clase) => (
        <>
            <td className="px-4 py-3">
                <p className="font-medium text-gray-900">{clase.titulo}</p>
                {clase.descripcion && <p className="text-xs text-gray-500 line-clamp-1">{clase.descripcion}</p>}
            </td>
            <td className="px-4 py-3">
                {clase.nivel ? (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">{clase.nivel}</span>
                ) : <span className="text-gray-400">-</span>}
            </td>
            <td className="px-4 py-3 text-sm text-gray-600">{clase.horarios || '-'}</td>
            <td className="px-4 py-3 text-sm text-gray-600">{clase.profesor || '-'}</td>
            <td className="px-4 py-3 text-center">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${clase.activo ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                    {clase.activo ? t('clases', 'active') : t('clases', 'inactive')}
                </span>
            </td>
            <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-2">
                    <button onClick={() => openEdit(clase)} className="px-2 py-1 text-xs text-blue-600 rounded hover:bg-blue-50">{t('common', 'edit')}</button>
                    <Link href={`/admin/clases/${clase.id}`} method="delete" className="px-2 py-1 text-xs text-red-600 rounded hover:bg-red-50">{t('common', 'delete')}</Link>
                </div>
            </td>
        </>
    );

    const renderMobileCard = (clase) => (
        <>
            <div className="flex items-start justify-between mb-2">
                <div className="min-w-0 flex-1 mr-2">
                    <h3 className="font-semibold text-gray-900 text-sm">{clase.titulo}</h3>
                    {clase.descripcion && <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{clase.descripcion}</p>}
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${clase.activo ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                    {clase.activo ? t('clases', 'active') : t('clases', 'inactive')}
                </span>
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-gray-600 mb-3">
                {clase.nivel && <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">{clase.nivel}</span>}
                {clase.profesor && <span>👤 {clase.profesor}</span>}
                {clase.horarios && <span>🕐 {clase.horarios}</span>}
            </div>
            <div className="flex gap-2 pt-3 border-t border-gray-100">
                <button onClick={() => openEdit(clase)} className="flex-1 px-3 py-3 text-sm font-medium text-blue-700 border border-blue-200 rounded-xl hover:bg-blue-50 min-h-[44px]">
                    {t('common', 'edit')}
                </button>
                <Link href={`/admin/clases/${clase.id}`} method="delete" className="flex-1 px-3 py-3 text-sm font-medium text-red-700 border border-red-200 rounded-xl hover:bg-red-50 min-h-[44px] text-center block">
                    {t('common', 'delete')}
                </Link>
            </div>
        </>
    );

    return (
        <AdminLayout title={t('adminModules', 'classes')}>
            <div className="px-2 sm:px-0">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-[#0F5132]">{t('adminModules', 'classes')}</h1>
                        <p className="text-gray-600 text-sm hidden sm:block">{t('clases', 'subtitle')}</p>
                    </div>
                    <button
                        onClick={openCreate}
                        className="w-full sm:w-auto px-4 py-2 bg-[#0F5132] text-white rounded-lg hover:bg-[#0c3f27] transition text-sm"
                    >
                        + {t('clases', 'addNew')}
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-xl shadow-sm border">
                        <p className="text-2xl font-bold text-[#0F5132]">{clases.length}</p>
                        <p className="text-sm text-gray-600">{t('clases', 'total')}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border">
                        <p className="text-2xl font-bold text-green-600">{activeClases.length}</p>
                        <p className="text-sm text-gray-600">{t('clases', 'active')}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border">
                        <p className="text-2xl font-bold text-gray-400">{inactiveClases.length}</p>
                        <p className="text-sm text-gray-600">{t('clases', 'inactive')}</p>
                    </div>
                </div>

                <AdminTable
                    columns={columns}
                    rows={clases}
                    renderRow={renderRow}
                    renderMobileCard={renderMobileCard}
                    emptyMessage={t('clases', 'noClases')}
                    emptyColspan={6}
                />
            </div>

            <FormModal
                open={showModal}
                onClose={() => setShowModal(false)}
                title={editando ? t('adminClases', 'editTitle') : t('clases', 'addNew')}
                onSubmit={handleSubmit}
                processing={formData.processing}
            >
                <FormField label={t('adminClases', 'tituloLabel')} name="titulo" required>
                    <input
                        type="text"
                        id="titulo"
                        value={formData.data.titulo}
                        onChange={(e) => formData.setData('titulo', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                        required
                    />
                </FormField>

                <FormField label={t('adminClases', 'descripcionLabel')} name="descripcion">
                    <textarea
                        id="descripcion"
                        value={formData.data.descripcion}
                        onChange={(e) => formData.setData('descripcion', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                        rows="3"
                    />
                </FormField>

                <div className="grid grid-cols-2 gap-4">
                    <FormField label={t('adminClases', 'nivelLabel')} name="nivel">
                        <input
                            type="text"
                            id="nivel"
                            value={formData.data.nivel}
                            onChange={(e) => formData.setData('nivel', e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg text-sm"
                            placeholder={t('adminClases', 'nivelLabel') + '...'}
                        />
                    </FormField>

                    <FormField label={t('adminClases', 'profesorLabel')} name="profesor">
                        <input
                            type="text"
                            id="profesor"
                            value={formData.data.profesor}
                            onChange={(e) => formData.setData('profesor', e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg text-sm"
                        />
                    </FormField>
                </div>

                <FormField label={t('adminClases', 'horarioLabel')} name="horarios">
                    <input
                        type="text"
                        id="horarios"
                        value={formData.data.horarios}
                        onChange={(e) => formData.setData('horarios', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                        placeholder={t('adminClases', 'horarioLabel') + '...'}
                    />
                </FormField>

                <FormField label={t('adminClases', 'requisitosLabel')} name="requisitos">
                    <textarea
                        id="requisitos"
                        value={formData.data.requisitos}
                        onChange={(e) => formData.setData('requisitos', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                        rows="2"
                        placeholder={t('adminClases', 'requisitosLabel') + '...'}
                    />
                </FormField>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="activo"
                        checked={formData.data.activo}
                        onChange={(e) => formData.setData('activo', e.target.checked)}
                        className="rounded"
                    />
                    <label htmlFor="activo" className="text-sm text-gray-700">{t('adminClases', 'activoLabel')}</label>
                </div>
            </FormModal>
        </AdminLayout>
    );
}
