import { router } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import AdminTable from '../../Components/AdminTable';
import ConfirmDialog from '../../Components/ConfirmDialog';
import Alert from '../../Components/Alert';
import { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';

export default function Comentarios({ comentarios }) {
    const { t, locale } = useTranslation();
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [success, setSuccess] = useState(null);

    function handleApprove(comentario) {
        router.post(`/admin/comentarios/${comentario.id}/approve`, {}, {
            onSuccess: () => setSuccess(t('adminComentarios', 'approved')),
        });
    }

    function handleDelete(comentario) {
        router.delete(`/admin/comentarios/${comentario.id}`, {
            onSuccess: () => setSuccess(t('adminComentarios', 'deleted')),
        });
        setConfirmDelete(null);
    }

    const approvedCount = comentarios.data.filter(c => c.aprobado).length;
    const pendingCount = comentarios.data.filter(c => !c.aprobado).length;

    const columns = [
        { label: t('adminComentarios', 'author') },
        { label: t('adminComentarios', 'news') },
        { label: t('adminComentarios', 'comment') },
        { label: t('adminComentarios', 'date') },
        { label: t('adminComentarios', 'status'), align: 'center' },
        { label: t('common', 'actions'), align: 'right' },
    ];

    const renderRow = (comentario) => (
        <>
            <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#C9A646]/10 flex items-center justify-center shrink-0">
                        <svg className="w-3.5 h-3.5 text-[#C9A646]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                    </div>
                    <span className="font-medium text-gray-800 truncate max-w-[120px]">
                        {comentario.user ? comentario.user.name : (comentario.anonimo ? 'Anónimo' : comentario.nombre)}
                    </span>
                </div>
            </td>
            <td className="px-4 py-3">
                <a href={`/noticias/${comentario.noticia_id}`} target="_blank" rel="noopener noreferrer"
                    className="text-[#C9A646] hover:text-[#b88a36] transition text-xs underline underline-offset-2 truncate block max-w-[160px]">
                    {comentario.noticia?.titulo || `#${comentario.noticia_id}`}
                </a>
            </td>
            <td className="px-4 py-3 max-w-xs">
                <p className="text-gray-600 line-clamp-3 text-xs leading-relaxed">{comentario.contenido}</p>
            </td>
            <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-400">
                {new Date(comentario.created_at).toLocaleDateString(
                    locale === 'ar' ? 'ar-EG' : locale === 'ca' ? 'ca-ES' : 'es-ES',
                    { day: 'numeric', month: 'short', year: 'numeric' }
                )}
            </td>
            <td className="px-4 py-3 text-center">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                    comentario.aprobado
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${comentario.aprobado ? 'bg-green-500' : 'bg-yellow-500'}`} />
                    {comentario.aprobado ? t('adminComentarios', 'approved') : t('adminComentarios', 'pending')}
                </span>
            </td>
            <td className="px-4 py-3 text-right">
                <div className="flex items-center justify-end gap-1">
                    {!comentario.aprobado && (
                        <button onClick={() => handleApprove(comentario)}
                            className="p-1.5 rounded-lg text-green-600 hover:bg-green-50 transition"
                            title={t('adminComentarios', 'approve')}>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </button>
                    )}
                    <button onClick={() => setConfirmDelete(comentario)}
                        className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition"
                        title={t('common', 'delete')}>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </button>
                </div>
            </td>
        </>
    );

    const renderMobileCard = (comentario) => (
        <>
            <div className="flex items-start justify-between mb-2">
                <div className="min-w-0 flex-1 mr-2">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 rounded-full bg-[#C9A646]/10 flex items-center justify-center shrink-0">
                            <svg className="w-3 h-3 text-[#C9A646]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>
                        </div>
                        <p className="font-semibold text-gray-900 text-sm truncate">
                            {comentario.user ? comentario.user.name : (comentario.anonimo ? 'Anónimo' : comentario.nombre)}
                        </p>
                    </div>
                    <a href={`/noticias/${comentario.noticia_id}`} target="_blank" rel="noopener noreferrer"
                        className="text-[#C9A646] text-xs underline underline-offset-2 truncate block">
                        {comentario.noticia?.titulo || `#${comentario.noticia_id}`}
                    </a>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{comentario.contenido}</p>
                    <p className="text-xs text-gray-400 mt-1">
                        {new Date(comentario.created_at).toLocaleDateString(
                            locale === 'ar' ? 'ar-EG' : locale === 'ca' ? 'ca-ES' : 'es-ES',
                            { day: 'numeric', month: 'short' }
                        )}
                    </p>
                </div>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${
                    comentario.aprobado
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${comentario.aprobado ? 'bg-green-500' : 'bg-yellow-500'}`} />
                    {comentario.aprobado ? t('adminComentarios', 'approved') : t('adminComentarios', 'pending')}
                </span>
            </div>
            <div className="flex gap-2 pt-3 border-t border-gray-100">
                {!comentario.aprobado && (
                    <button onClick={() => handleApprove(comentario)}
                        className="flex-1 px-3 py-3 text-sm font-medium text-green-700 border border-green-200 rounded-xl hover:bg-green-50 min-h-[44px]">
                        {t('adminComentarios', 'approve')}
                    </button>
                )}
                <button onClick={() => setConfirmDelete(comentario)}
                    className="flex-1 px-3 py-3 text-sm font-medium text-red-700 border border-red-200 rounded-xl hover:bg-red-50 min-h-[44px]">
                    {t('common', 'delete')}
                </button>
            </div>
        </>
    );

    return (
        <AdminLayout title={t('adminModules', 'comments')}>
            <div className="px-2 sm:px-0">
                {success && <Alert type="success" message={success} onClose={() => setSuccess(null)} />}

                <p className="text-gray-600 text-sm mb-6">{t('adminComentarios', 'subtitle') || ''}</p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-xl shadow-sm border">
                        <p className="text-2xl font-bold text-[#0F5132]">{comentarios.total || comentarios.data.length}</p>
                        <p className="text-sm text-gray-600">{t('adminComentarios', 'total') || t('common', 'total')}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border">
                        <p className="text-2xl font-bold text-green-600">{approvedCount}</p>
                        <p className="text-sm text-gray-600">{t('adminComentarios', 'approved')}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border">
                        <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
                        <p className="text-sm text-gray-600">{t('adminComentarios', 'pending')}</p>
                    </div>
                </div>

                <AdminTable
                    columns={columns}
                    rows={comentarios.data}
                    renderRow={renderRow}
                    renderMobileCard={renderMobileCard}
                    emptyMessage={t('common', 'noData')}
                    emptyColspan={6}
                />

                {comentarios.last_page > 1 && (
                    <div className="flex justify-center gap-2 py-6">
                        {Array.from({ length: comentarios.last_page }, (_, i) => i + 1).map(page => (
                            <a key={page}
                                href={`/admin/comentarios?page=${page}`}
                                className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200 min-w-[44px] min-h-[44px] ${
                                    page === comentarios.current_page
                                        ? 'bg-[#0F3B2E] text-white shadow-md'
                                        : 'bg-white text-gray-500 border border-gray-200 hover:border-[#C9A646]/40 hover:text-[#0F3B2E] shadow-sm'
                                }`}>
                                {page}
                            </a>
                        ))}
                    </div>
                )}
            </div>

            {confirmDelete && (
                <ConfirmDialog
                    title={t('common', 'confirm')}
                    message={t('adminComentarios', 'confirmDelete')}
                    onConfirm={() => handleDelete(confirmDelete)}
                    onCancel={() => setConfirmDelete(null)}
                />
            )}
        </AdminLayout>
    );
}
