import { useState } from 'react';
import { usePage, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
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

    return (
        <AdminLayout title={t('adminModules', 'news')}>
            <div className="px-2 sm:px-0">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-[#0F5132]">{t('adminModules', 'news')}</h1>
                        <p className="text-gray-600 text-sm hidden sm:block">Gestionar noticias y anuncios</p>
                    </div>
                    <button
                        onClick={openCreate}
                        className="w-full sm:w-auto px-4 py-2 bg-[#0F5132] text-white rounded-lg hover:bg-[#0c3f27] transition text-sm"
                    >
                        + {t('noticias', 'addNew')}
                    </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-xl shadow-sm border">
                        <p className="text-2xl font-bold text-[#0F5132]">{noticiasList.length}</p>
                        <p className="text-sm text-gray-600">Total noticias</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border">
                        <p className="text-2xl font-bold text-green-600">{publishedNews.length}</p>
                        <p className="text-sm text-gray-600">Publicadas</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border col-span-2 md:col-span-1">
                        <p className="text-2xl font-bold text-gray-400">{draftNews.length}</p>
                        <p className="text-sm text-gray-600">Borradores</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Imagen</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Título</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Estado</th>
                                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {noticiasList.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                                            No hay noticias para mostrar
                                        </td>
                                    </tr>
                                ) : (
                                    noticiasList.map((noticia) => (
                                        <tr key={noticia.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3">
                                                {noticia.imagen ? (
                                                    <img 
                                                        src={`/storage/${noticia.imagen}`} 
                                                        alt={noticia.titulo}
                                                        className="w-16 h-12 object-cover rounded-lg"
                                                    />
                                                ) : (
                                                    <div className="w-16 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                                                        <span className="text-gray-400 text-xs">Sin img</span>
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
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                    noticia.publicado 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-gray-100 text-gray-600'
                                                }`}>
                                                    {noticia.publicado ? 'Publicada' : 'Borrador'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => openEdit(noticia)}
                                                        className="px-2 py-1 text-xs text-blue-600 rounded hover:bg-blue-50"
                                                    >
                                                        Editar
                                                    </button>
                                                    <Link
                                                        href={`/admin/noticias/${noticia.id}`}
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

                    {noticias.last_page > 1 && (
                        <div className="flex justify-center gap-2 py-4 border-t">
                            {noticias.prev_page_url && (
                                <Link href={noticias.prev_page_url} className="px-3 py-2 bg-white border rounded-lg hover:bg-gray-50 text-sm">
                                    ← Anterior
                                </Link>
                            )}
                            <span className="px-3 py-2 text-gray-600 text-sm">
                                {noticias.current_page} / {noticias.last_page}
                            </span>
                            {noticias.next_page_url && (
                                <Link href={noticias.next_page_url} className="px-3 py-2 bg-white border rounded-lg hover:bg-gray-50 text-sm">
                                    Siguiente →
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-4 sm:p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <h2 className="text-lg sm:text-xl font-bold text-[#0F5132] mb-4">
                            {editando ? 'Editar Noticia' : t('noticias', 'addNew')}
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
                                <input
                                    type="text"
                                    value={formData.data.titulo}
                                    onChange={(e) => formData.setData('titulo', e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg text-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Contenido *</label>
                                <textarea
                                    value={formData.data.contenido}
                                    onChange={(e) => formData.setData('contenido', e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg text-sm"
                                    rows="5"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Imagen</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImagenChange}
                                    className="w-full px-3 py-2 border rounded-lg text-sm file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-[#0F5132] file:text-white file:cursor-pointer"
                                />
                                {imagenPreview && (
                                    <div className="mt-2 relative inline-block">
                                        <img src={imagenPreview} alt="Preview" className="w-32 h-20 object-cover rounded-lg" />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setImagenPreview(null);
                                                formData.setData('imagen', null);
                                            }}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                        >
                                            ×
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de publicación</label>
                                <input
                                    type="date"
                                    value={formData.data.fecha_publicacion}
                                    onChange={(e) => formData.setData('fecha_publicacion', e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg text-sm"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="publicado"
                                    checked={formData.data.publicado}
                                    onChange={(e) => formData.setData('publicado', e.target.checked)}
                                    className="rounded"
                                />
                                <label htmlFor="publicado" className="text-sm text-gray-700">Publicar inmediatamente</label>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
                            <button
                                type="button"
                                onClick={() => setShowModal(false)}
                                className="w-full sm:w-auto px-4 py-2 border rounded-lg hover:bg-gray-50 text-sm"
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={formData.processing}
                                className="w-full sm:w-auto px-4 py-2 bg-[#0F5132] text-white rounded-lg hover:bg-[#0c3f27] disabled:opacity-50 text-sm"
                            >
                                {editando ? 'Actualizar' : 'Crear'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}