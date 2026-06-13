import { Link } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import { useTranslation } from '../hooks/useTranslation';

export default function NoticiaShow({ noticia }) {
    const { t, locale } = useTranslation();

    const metaTitle = `${noticia.titulo} — ${t('noticias', 'title')}`;
    const metaDescription = noticia.contenido?.substring(0, 160) || t('meta.noticias.description');

    return (
        <MainLayout title={metaTitle}
            description={metaDescription}
            canonical={`/noticias/${noticia.id}`}
            image={noticia.imagen || undefined}>
            <section className="pt-28 pb-16 max-w-3xl mx-auto px-4 sm:px-6">
                <Link href="/noticias" className="inline-flex items-center gap-1 text-sm text-[#C9A227] hover:text-[#b8921f] transition mb-6">
                    ← {t('common', 'back')}
                </Link>

                {noticia.imagen && (
                    <img
                        src={noticia.imagen}
                        alt={noticia.titulo}
                        className="w-full h-64 sm:h-80 object-cover rounded-2xl mb-6"
                        loading="lazy"
                    />
                )}

                <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="text-sm text-gray-500">
                        {noticia.fecha_publicacion ? new Date(noticia.fecha_publicacion).toLocaleDateString(locale === 'ar' ? 'ar-EG' : locale === 'ca' ? 'ca-ES' : locale === 'en' ? 'en-US' : 'es-ES', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}
                    </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold text-[#0F5132] mb-6">{noticia.titulo}</h1>

                <div className="prose prose-green max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                    {noticia.contenido}
                </div>

                <div className="mt-10 pt-6 border-t border-gray-200">
                    <Link href="/noticias" className="inline-flex items-center gap-1 text-sm text-[#C9A227] hover:text-[#b8921f] transition">
                        ← {t('common', 'back')}
                    </Link>
                </div>
            </section>
        </MainLayout>
    );
}
