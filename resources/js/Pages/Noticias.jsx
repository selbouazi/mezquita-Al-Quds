import { Link } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import { useTranslation } from '../hooks/useTranslation';

export default function Noticias({ noticias }) {
    const { t } = useTranslation();

    return (
        <MainLayout title={t('noticias', 'title')}>
            <section className="pt-28 pb-16 max-w-7xl mx-auto px-6">
                <h1 className="text-3xl font-bold text-[#0F5132] mb-4">{t('noticias', 'title')}</h1>
                <p className="text-gray-600 mb-8">{t('noticias', 'subtitle')}</p>

                {noticias.data.length === 0 ? (
                    <div className="p-6 bg-[#F5F5F5] border border-[#C9A227]/20 rounded-2xl text-gray-500 text-sm">
                        No hay noticias publicadas actualmente.
                    </div>
                ) : (
                    <div className="space-y-6">
                        {noticias.data.map((noticia) => (
                            <article key={noticia.id} className="bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-md transition">
                                {noticia.imagen && (
                                    <img 
                                        src={`/storage/${noticia.imagen}`} 
                                        alt={noticia.titulo}
                                        className="w-full h-48 sm:h-64 object-cover"
                                    />
                                )}
                                <div className="p-6">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-sm text-gray-500">
                                            {noticia.fecha_publicacion ? new Date(noticia.fecha_publicacion).toLocaleDateString('es', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}
                                        </span>
                                    </div>
                                    <h2 className="text-xl sm:text-2xl font-bold text-[#0F5132] mb-3">
                                        {noticia.titulo}
                                    </h2>
                                    <p className="text-gray-600 line-clamp-3">
                                        {noticia.contenido}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>
                )}

                {noticias.last_page > 1 && (
                    <div className="flex justify-center gap-2 mt-8">
                        {noticias.prev_page_url && (
                            <Link href={noticias.prev_page_url} className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 text-sm">
                                ← Anterior
                            </Link>
                        )}
                        <span className="px-4 py-2 text-gray-600 text-sm">
                            {noticias.current_page} / {noticias.last_page}
                        </span>
                        {noticias.next_page_url && (
                            <Link href={noticias.next_page_url} className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 text-sm">
                                Siguiente →
                            </Link>
                        )}
                    </div>
                )}
            </section>
        </MainLayout>
    );
}