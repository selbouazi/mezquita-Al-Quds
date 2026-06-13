import { useState } from 'react';
import { usePage, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import AdminTable from '../../Components/AdminTable';
import FormModal from '../../Components/FormModal';
import FormField from '../../Components/FormField';
import Pagination from '../../Components/Pagination';
import { useTranslation } from '../../hooks/useTranslation';

export default function Noticias() {
    const { t } = useTranslation();
    const { props } = usePage();
    const { noticias } = props;

    const [showModal, setShowModal] = useState(false);
    const [editando, setEditando] = useState(null);
    const [imagenPreview, setImagenPreview] = useState(null);

    const formData = useForm({
        titulo: '',
        contenido: '',
        imagen: null,
        fecha_publicacion: new Date().toISOString().split('T')[0],
        publicado: true,
    });

    const openCreate = () => {
        formData.reset();
        formData.clearErrors();
        setEditando(null);
        setImagenPreview(null);
        setShowModal(true);
    };

    const openEdit = (noticia) => {
        formData.setData({
            titulo: noticia.titulo || '',
            contenido: noticia.contenido || '',
            imagen: null,
            fecha_publicacion: noticia.fecha_publicacion || new Date().toISOString().split('T')[0],
            publicado: noticia.publicado ?? true,
        });
        setEditando(noticia.id);
        setImagenPreview(noticia.imagen ? `/storage/${noticia.imagen}` : null);
        setShowModal(true);
    };

    const handleImagenChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            formData.setData('imagen', file);
            setImagenPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = () => {
        if (editando) {
            formData.post(`/admin/noticias/${editando}`, {
                onSuccess: () => {
                    setShowModal(false);
                    formData.reset();
                },
            });
        } else {
            formData.post('/admin/noticias', {
                onSuccess: () => {
                    setShowModal(false);
                    formData.reset();
                },
            });
        }
    };

    const noticiasList = noticias?.data || noticias || [];
    const publishedNews = noticiasList.filter(n => n.publicado);
    const draftNews = noticiasList.filter(n => !n.publicado);

    const columns = [
        { label: t('adminNoticias', 'imagen'), align: 'left' },
        { label: t('adminNoticias', 'titulo'), align: 'left' },
        { label: t('adminNoticias', 'fecha'), align: 'left' },
        { label: t('adminNoticias', 'estado'), align: 'center' },
        { label: t('adminNoticias', 'acciones'), align: 'right' },
    ];

    const renderRow = (noticia) => (
        <>
            <td className="px-4 py-3">
                {noticia.imagen ? (
                    <img src={`/storage/${noticia.imagen}`} alt={noticia.titulo} className="w-16 h-12 object-cover rounded-lg" />
                ) : (
                    <div className="w-16 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-400 text-xs">{t('adminNoticias', 'noImage')}</span>
                    </div>
                )}
            </td>
            <td className="px-4 py-3">
                <p className="font-medium text-gray-900">{noticia.titulo}</p>
                <p className="text-xs text-gray-500 line-clamp-1">{noticia.contenido}</p>
            </td>
            <td className="px-4 py-3 text-sm text-gray-500">
                {noticia.fecha_publicacion ? new Date(noticia.fecha_publicacion).toLocaleDateString('es') : '-'}
            </td>
            <td className="px-4 py-3 text-center">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${noticia.publicado ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                    {t('noticias', noticia.publicado ? 'published' : 'draft')}
                </span>
            </td>
            <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-2">
                    <button onClick={() => openEdit(noticia)} className="px-2 py-1 text-xs text-blue-600 rounded hover:bg-blue-50">{t('common', 'edit')}</button>
                    <Link href={`/admin/noticias/${noticia.id}`} method="delete" className="px-2 py-1 text-xs text-red-600 rounded hover:bg-red-50">{t('common', 'delete')}</Link>
                </div>
            </td>
        </>
    );

    const renderMobileCard = (noticia) => (
        <>
            <div className="flex gap-3 mb-3">
                {noticia.imagen && (
                    <img src={`/storage/${noticia.imagen}`} alt={noticia.titulo} className="w-16 h-14 rounded-lg object-cover flex-shrink-0" />
                )}
                <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm leading-tight">{noticia.titulo}</h3>
                    <p className="text-xs text-gray-500 line-clamp-2 mt-1">{noticia.contenido}</p>
                </div>
            </div>
            <div className="flex items-center justify-between mb-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${noticia.publicado ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                    {t('noticias', noticia.publicado ? 'published' : 'draft')}
                </span>
                <span className="text-xs text-gray-500">
                    {noticia.fecha_publicacion ? new Date(noticia.fecha_publicacion).toLocaleDateString('es') : ''}
                </span>
            </div>
            <div className="flex gap-2 pt-3 border-t border-gray-100">
                <button onClick={() => openEdit(noticia)} className="flex-1 px-3 py-3 text-sm font-medium text-blue-700 border border-blue-200 rounded-xl hover:bg-blue-50 min-h-[44px]">
                    {t('common', 'edit')}
                </button>
                <Link href={`/admin/noticias/${noticia.id}`} method="delete" className="flex-1 px-3 py-3 text-sm font-medium text-red-700 border border-red-200 rounded-xl hover:bg-red-50 min-h-[44px] text-center block">
                    {t('common', 'delete')}
                </Link>
            </div>
        </>
    );

    return (
        <AdminLayout title={t('adminModules', 'news')}>
            <div className="px-2 sm:px-0">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-[#0F5132]">{t('adminModules', 'news')}</h1>
                        <p className="text-gray-600 text-sm hidden sm:block">{t('adminNoticias', 'manageNews')}</p>
                    </div>
                    <button
                        onClick={openCreate}
                        className="w-full sm:w-auto px-4 py-2 bg-[#0F5132] text-white rounded-lg hover:bg-[#0c3f27] transition text-sm"
                    >
                        + {t('noticias', 'addNew')}
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-xl shadow-sm border">
                        <p className="text-2xl font-bold text-[#0F5132]">{noticiasList.length}</p>
                        <p className="text-sm text-gray-600">{t('adminNoticias', 'totalNews')}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border">
                        <p className="text-2xl font-bold text-green-600">{publishedNews.length}</p>
                        <p className="text-sm text-gray-600">{t('adminNoticias', 'published')}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border">
                        <p className="text-2xl font-bold text-gray-400">{draftNews.length}</p>
                        <p className="text-sm text-gray-600">{t('adminNoticias', 'drafts')}</p>
                    </div>
                </div>

                <AdminTable
                    columns={columns}
                    rows={noticiasList}
                    renderRow={renderRow}
                    renderMobileCard={renderMobileCard}
                    emptyMessage={t('adminNoticias', 'noNewsAdmin')}
                    emptyColspan={5}
                />

                <Pagination meta={noticias} />
            </div>

            <FormModal
                open={showModal}
                onClose={() => setShowModal(false)}
                title={editando ? t('adminNoticias', 'editTitle') : t('noticias', 'addNew')}
                onSubmit={handleSubmit}
                submitText={editando ? t('adminNoticias', 'update') : t('adminNoticias', 'create')}
                processing={formData.processing}
            >
                <FormField label={t('adminNoticias', 'tituloLabel')} name="titulo" required>
                    <input
                        type="text"
                        value={formData.data.titulo}
                        onChange={(e) => formData.setData('titulo', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                        required
                    />
                </FormField>

                <FormField label={t('adminNoticias', 'contenidoLabel')} name="contenido" required>
                    <textarea
                        value={formData.data.contenido}
                        onChange={(e) => formData.setData('contenido', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                        rows="5"
                        required
                    />
                </FormField>

                <FormField label={t('adminNoticias', 'imagenLabel')} name="imagen">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImagenChange}
                        className="w-full px-3 py-2 border rounded-lg text-sm file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-[#0F5132] file:text-white file:cursor-pointer"
                    />
                    {imagenPreview && (
                        <div className="mt-2 relative inline-block">
                            <img src={imagenPreview} alt={t('adminNoticias', 'imagenLabel')} className="w-32 h-20 object-cover rounded-lg" />
                            <button
                                type="button"
                                onClick={() => {
                                    setImagenPreview(null);
                                    formData.setData('imagen', null);
                                }}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                aria-label={t('noticias', 'removeImage')}
                            >
                                ×
                            </button>
                        </div>
                    )}
                </FormField>

                <FormField label={t('adminNoticias', 'fechaLabel')} name="fecha_publicacion">
                    <input
                        type="date"
                        value={formData.data.fecha_publicacion}
                        onChange={(e) => formData.setData('fecha_publicacion', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                    />
                </FormField>

                <FormField name="publicado">
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="publicado"
                            checked={formData.data.publicado}
                            onChange={(e) => formData.setData('publicado', e.target.checked)}
                            className="rounded"
                        />
                        <label htmlFor="publicado" className="text-sm text-gray-700">{t('adminNoticias', 'publishLabel')}</label>
                    </div>
                </FormField>
            </FormModal>
        </AdminLayout>
    );
}
