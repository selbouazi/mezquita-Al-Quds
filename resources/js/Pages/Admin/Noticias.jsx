import { useState } from 'react';
import { usePage, router, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import AdminTable from '../../Components/AdminTable';
import FormModal from '../../Components/FormModal';
import FormField from '../../Components/FormField';
import { useTranslation } from '../../hooks/useTranslation';
import ModuleToggle from '../../Components/ModuleToggle';
import ConfirmDialog from '../../Components/ConfirmDialog';

export default function Noticias() {
    const { t } = useTranslation();
    const { props } = usePage();
    const { noticias } = props;

    const [showModal, setShowModal] = useState(false);
    const [editando, setEditando] = useState(null);
    const [imagenPreview, setImagenPreview] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);

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
        const options = {
            forceFormData: true,
            onSuccess: () => {
                setShowModal(false);
                formData.reset();
            },
        };
        if (editando) {
            formData.put(`/admin/noticias/${editando}`, options);
        } else {
            formData.post('/admin/noticias', options);
        }
    };

    const noticiasList = noticias?.data || noticias || [];
    const publishedNews = noticiasList.filter(n => n.publicado);
    const draftNews = noticiasList.filter(n => !n.publicado);

    const columns = [
        { label: t('adminNoticias', 'titulo') },
        { label: t('adminNoticias', 'fecha') },
        { label: t('adminNoticias', 'estado'), align: 'center' },
        { label: t('adminNoticias', 'acciones'), align: 'right' },
    ];

    const renderRow = (noticia) => (
        <>
            <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                    {noticia.imagen ? (
                        <img src={`/storage/${noticia.imagen}`} alt={noticia.titulo}
                            className="w-12 h-10 object-cover rounded-lg shrink-0" loading="lazy" />
                    ) : (
                        <div className="w-12 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                            </svg>
                        </div>
                    )}
                    <div className="min-w-0">
                        <p className="font-medium text-gray-900 truncate">{noticia.titulo}</p>
                        <p className="text-xs text-gray-500 line-clamp-1">{noticia.contenido}</p>
                    </div>
                </div>
            </td>
            <td className="px-4 py-3 text-sm text-gray-500">
                {noticia.fecha_publicacion ? new Date(noticia.fecha_publicacion).toLocaleDateString('es') : '-'}
            </td>
            <td className="px-4 py-3 text-center">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    noticia.publicado ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                }`}>
                    {t('noticias', noticia.publicado ? 'published' : 'draft')}
                </span>
            </td>
            <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-2">
                    <button onClick={() => openEdit(noticia)} className="px-2 py-1 text-xs text-blue-600 rounded-lg hover:bg-blue-50 min-h-[32px]">
                        {t('common', 'edit')}
                    </button>
                    <button onClick={() => setConfirmDelete(noticia)} className="px-2 py-1 text-xs text-red-600 rounded-lg hover:bg-red-50 min-h-[32px] flex items-center">
                        {t('common', 'delete')}
                    </button>
                </div>
            </td>
        </>
    );

    const renderMobileCard = (noticia) => (
        <>
            <div className="flex items-start gap-3 mb-2">
                {noticia.imagen ? (
                    <img src={`/storage/${noticia.imagen}`} alt={noticia.titulo}
                        className="w-14 h-12 object-cover rounded-lg shrink-0" loading="lazy" />
                ) : (
                    <div className="w-14 h-12 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                        </svg>
                    </div>
                )}
                <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm truncate">{noticia.titulo}</h3>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{noticia.contenido}</p>
                    <p className="text-xs text-gray-400 mt-1">{noticia.fecha_publicacion ? new Date(noticia.fecha_publicacion).toLocaleDateString('es') : '-'}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                    noticia.publicado ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                }`}>
                    {t('noticias', noticia.publicado ? 'published' : 'draft')}
                </span>
            </div>
            <div className="flex gap-2 pt-3 border-t border-gray-100">
                <button onClick={() => openEdit(noticia)} className="flex-1 px-3 py-3 text-sm font-medium text-blue-700 border border-blue-200 rounded-xl hover:bg-blue-50 min-h-[44px]">
                    {t('common', 'edit')}
                </button>
                <button onClick={() => setConfirmDelete(noticia)} className="flex-1 px-3 py-3 text-sm font-medium text-red-700 border border-red-200 rounded-xl hover:bg-red-50 min-h-[44px] text-center block">
                    {t('common', 'delete')}
                </button>
            </div>
        </>
    );

    return (
        <AdminLayout title={t('adminModules', 'news')}>
            <div className="px-2 sm:px-0">

                {confirmDelete && (
                    <ConfirmDialog
                        variant="danger"
                        title={t('common', 'confirm')}
                        message={t('common', 'confirmMessage')}
                        confirmLabel={t('common', 'delete')}
                        cancelLabel={t('common', 'cancel')}
                        onConfirm={() => {
                            router.delete(`/admin/noticias/${confirmDelete.id}`);
                            setConfirmDelete(null);
                        }}
                        onCancel={() => setConfirmDelete(null)}
                    />
                )}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <p className="text-gray-600 text-sm hidden sm:block">{t('adminNoticias', 'manageNews')}</p>
                    <div className="flex items-center gap-3">
                        <ModuleToggle module="noticias" />
                        <button onClick={openCreate} className="px-4 py-2 bg-[#0F5132] text-white rounded-lg hover:bg-[#0c3f27] transition text-sm">
                            + {t('noticias', 'addNew')}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
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
                    emptyColspan={4}
                />

                {noticias?.last_page > 1 && (
                    <div className="flex justify-center gap-2 py-6">
                        {noticias.prev_page_url && (
                            <Link href={noticias.prev_page_url} className="px-4 py-2.5 bg-white border rounded-xl hover:bg-gray-50 text-sm min-h-[44px] flex items-center shadow-sm">
                                ← {t('common', 'previous')}
                            </Link>
                        )}
                        <span className="px-4 py-2.5 text-gray-600 text-sm flex items-center">
                            {noticias.current_page} / {noticias.last_page}
                        </span>
                        {noticias.next_page_url && (
                            <Link href={noticias.next_page_url} className="px-4 py-2.5 bg-white border rounded-xl hover:bg-gray-50 text-sm min-h-[44px] flex items-center shadow-sm">
                                {t('common', 'next')} →
                            </Link>
                        )}
                    </div>
                )}
            </div>

            <FormModal
                open={showModal}
                onClose={() => setShowModal(false)}
                title={editando ? t('adminNoticias', 'editTitle') : t('noticias', 'addNew')}
                onSubmit={handleSubmit}
                processing={formData.processing}
            >
                {formData.errors.titulo && <p className="text-red-600 text-sm mb-2">{formData.errors.titulo}</p>}
                {formData.errors.contenido && <p className="text-red-600 text-sm mb-2">{formData.errors.contenido}</p>}

                <FormField label={t('adminNoticias', 'tituloLabel')} name="titulo" required>
                    <input type="text" id="titulo" value={formData.data.titulo}
                        onChange={(e) => formData.setData('titulo', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-sm" required />
                </FormField>

                <FormField label={t('adminNoticias', 'contenidoLabel')} name="contenido" required>
                    <textarea id="contenido" value={formData.data.contenido}
                        onChange={(e) => formData.setData('contenido', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-sm" rows="5" required />
                </FormField>

                <FormField label={t('adminNoticias', 'imagenLabel')} name="imagen">
                    <input type="file" accept="image/*" onChange={handleImagenChange}
                        className="w-full px-3 py-2 border rounded-lg text-sm file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-[#0F5132] file:text-white file:cursor-pointer" />
                    {imagenPreview && (
                        <div className="mt-2 relative inline-block">
                            <img src={imagenPreview} alt="Preview" className="w-32 h-20 object-cover rounded-lg" />
                            <button type="button" onClick={() => { setImagenPreview(null); formData.setData('imagen', null); }}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">×</button>
                        </div>
                    )}
                </FormField>

                <div className="grid grid-cols-2 gap-4">
                    <FormField label={t('adminNoticias', 'fechaLabel')} name="fecha_publicacion">
                        <input type="date" id="fecha_publicacion" value={formData.data.fecha_publicacion}
                            onChange={(e) => formData.setData('fecha_publicacion', e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg text-sm" />
                    </FormField>
                    <div className="flex items-center gap-2 pt-6">
                        <input type="checkbox" id="publicado" checked={formData.data.publicado}
                            onChange={(e) => formData.setData('publicado', e.target.checked)} className="rounded" />
                        <label htmlFor="publicado" className="text-sm text-gray-700">{t('adminNoticias', 'publishLabel')}</label>
                    </div>
                </div>
            </FormModal>
        </AdminLayout>
    );
}
