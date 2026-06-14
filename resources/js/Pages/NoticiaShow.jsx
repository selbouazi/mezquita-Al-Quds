import { Link, useForm, usePage } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import { useTranslation } from '../hooks/useTranslation';
import Alert from '../Components/Alert';
import { useState } from 'react';

export default function NoticiaShow({ noticia, comentarios = [] }) {
    const { t, locale, isRTL } = useTranslation();
    const { auth } = usePage().props;
    const [success, setSuccess] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        noticia_id: noticia.id,
        contenido: '',
        nombre: '',
        anonimo: false,
    });

    const metaTitle = `${noticia.titulo} — ${t('noticias', 'title')}`;
    const metaDescription = noticia.contenido?.substring(0, 160) || t('meta.noticias.description');

    const dateStr = noticia.fecha_publicacion
        ? new Date(noticia.fecha_publicacion).toLocaleDateString(
            locale === 'ar' ? 'ar-EG' : locale === 'ca' ? 'ca-ES' : locale === 'en' ? 'en-US' : 'es-ES',
            { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
          )
        : '';

    function handleSubmit(e) {
        e.preventDefault();
        post('/comentarios', {
            onSuccess: () => {
                setSuccess(t('comentarios', 'success'));
                reset('contenido');
            },
        });
    }

    const user = auth?.user;

    return (
        <MainLayout title={metaTitle}
            description={metaDescription}
            canonical={`/noticias/${noticia.id}`}
            image={noticia.imagen || undefined}>

            {/* === HERO === */}
            <section className="relative pt-28 pb-12 sm:pb-16 lg:pb-20 overflow-hidden bg-gradient-to-b from-[#0F3B2E] to-[#09291e]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#C9A64615,transparent_60%)] pointer-events-none" />
                <div className="relative max-w-3xl mx-auto px-5 sm:px-8">
                    <Link href="/noticias"
                        className="inline-flex items-center gap-2 text-sm sm:text-base text-[#C9A646]/80 hover:text-[#C9A646] transition mb-6 group">
                        <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d={isRTL ? 'M9 5l7 7-7 7' : 'M15 19l-7-7 7-7'} />
                        </svg>
                        {t('common', 'back')}
                    </Link>
                    <div className="flex items-center gap-3 text-[#C9A646]/60 text-sm mb-3">
                        <span>{dateStr}</span>
                        <span className="w-1 h-1 bg-[#C9A646]/40 rounded-full" />
                        <span className="text-[#C9A646]/80 font-medium">{t('noticias', 'title')}</span>
                    </div>
                    <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.2]">
                        {noticia.titulo}
                    </h1>
                </div>
            </section>

            {/* === ARTICLE CONTENT === */}
            <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white to-[#F7F5F0] overflow-hidden">
                <div className="footer-pattern">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                        <defs>
                            <pattern id="girih-noticia" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                                <polygon points="60,0 90,30 90,70 60,100 30,70 30,30" fill="none" stroke="#C9A646" strokeWidth="0.5" opacity="0.10" />
                                <polygon points="60,20 80,40 80,60 60,80 40,60 40,40" fill="none" stroke="#C9A646" strokeWidth="0.3" opacity="0.06" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#girih-noticia)" />
                    </svg>
                </div>

                <div className="relative max-w-3xl mx-auto px-5 sm:px-8">
                    <div className="home-glass-card p-0 overflow-hidden">
                        {noticia.imagen && (
                            <div className="relative overflow-hidden">
                                <img
                                    src={noticia.imagen}
                                    alt={noticia.titulo}
                                    className="w-full h-56 sm:h-72 lg:h-96 object-cover"
                                    loading="lazy"
                                    style={{ filter: 'saturate(0.85)' }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0F3B2E]/20 via-transparent to-transparent" />
                            </div>
                        )}

                        <div className={`p-6 sm:p-8 lg:p-10 ${isRTL ? 'text-right' : ''}`}>
                            <div className="flex items-center gap-3 text-sm text-gray-400 mb-6">
                                <svg className="w-4 h-4 text-[#C9A646]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                                </svg>
                                <span>{dateStr}</span>
                            </div>

                            <div className={`prose prose-green max-w-none text-gray-700 leading-relaxed whitespace-pre-line text-base sm:text-lg ${isRTL ? 'text-right' : ''}`}>
                                {noticia.contenido}
                            </div>

                            <div className={`mt-10 pt-6 border-t border-[#C9A646]/10 flex ${isRTL ? 'justify-start' : 'justify-between'} items-center`}>
                                <Link href="/noticias"
                                    className="inline-flex items-center gap-2 text-sm sm:text-base text-[#C9A646] hover:text-[#b88a36] transition font-medium group">
                                    <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d={isRTL ? 'M9 5l7 7-7 7' : 'M15 19l-7-7 7-7'} />
                                    </svg>
                                    {t('common', 'back')}
                                </Link>
                                <span className="text-xs text-gray-400">{t('noticias', 'title')}</span>
                            </div>
                        </div>
                    </div>

                    {/* === COMMENTS === */}
                    <section className="mt-10 sm:mt-12 lg:mt-14">
                        <div className="flex items-center gap-3 mb-6 sm:mb-8">
                            <span className="w-1 h-6 bg-[#C9A646] rounded-full shrink-0" />
                            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0F3B2E]">
                                {t('comentarios', 'title')}
                                {comentarios.length > 0 && (
                                    <span className="text-base sm:text-lg text-gray-400 font-normal ml-2">({comentarios.length})</span>
                                )}
                            </h2>
                        </div>

                        {/* Comments list */}
                        {comentarios.length > 0 ? (
                            <div className="space-y-4 sm:space-y-5 mb-8 sm:mb-10">
                                {comentarios.map((comentario) => (
                                    <div key={comentario.id} className="home-glass-card p-4 sm:p-6">
                                        <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                            <div className="w-8 h-8 rounded-full bg-[#C9A646]/10 flex items-center justify-center shrink-0 mt-0.5">
                                                <svg className="w-4 h-4 text-[#C9A646]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                                </svg>
                                            </div>
                                            <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : ''}`}>
                                                <div className={`flex items-center gap-2 mb-1 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                                                    <span className="font-semibold text-[#0F3B2E] text-sm">
                                                        {comentario.user ? comentario.user.name : (comentario.anonimo ? t('comentarios', 'anonymous') : comentario.nombre)}
                                                    </span>
                                                    <span className="text-xs text-gray-400">
                                                        {new Date(comentario.created_at).toLocaleDateString(
                                                            locale === 'ar' ? 'ar-EG' : locale === 'ca' ? 'ca-ES' : 'es-ES',
                                                            { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }
                                                        )}
                                                    </span>
                                                </div>
                                                <p className="text-gray-600 text-base leading-relaxed">{comentario.contenido}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="home-glass-card p-6 sm:p-8 text-center mb-8 sm:mb-10">
                                <p className="text-gray-400 text-sm sm:text-base">{t('comentarios', 'noComments')}</p>
                            </div>
                        )}

                        {/* Comment form */}
                        <div className="home-glass-card p-5 sm:p-7">
                            <h3 className="font-semibold text-base sm:text-lg text-[#0F3B2E] mb-4">{t('comentarios', 'addComment')}</h3>

                            {success && <Alert type="success" message={success} onClose={() => setSuccess(null)} />}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('comentarios', 'comment')}</label>
                                    <textarea
                                        value={data.contenido}
                                        onChange={e => setData('contenido', e.target.value)}
                                        rows={4}
                                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm sm:text-base focus:ring-2 focus:ring-[#C9A646]/30 focus:border-[#C9A646] transition outline-none resize-y"
                                        placeholder={t('comentarios', 'commentPlaceholder')}
                                    />
                                    {errors.contenido && <p className="text-red-500 text-xs mt-1">{errors.contenido}</p>}
                                </div>

                                {!user && (
                                    <div className={`flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                                        <div className="flex-1 w-full sm:w-auto">
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">{t('comentarios', 'name')}</label>
                                            <input
                                                type="text"
                                                value={data.nombre}
                                                onChange={e => setData('nombre', e.target.value)}
                                                disabled={data.anonimo}
                                                className={`w-full rounded-xl border px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#C9A646]/30 focus:border-[#C9A646] transition outline-none ${data.anonimo ? 'bg-gray-50 border-gray-200 text-gray-400' : 'border-gray-200'}`}
                                                placeholder={t('comentarios', 'namePlaceholder')}
                                            />
                                            {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
                                        </div>
                                        <div className="flex items-center gap-2 pt-5 sm:pt-0">
                                            <input
                                                type="checkbox"
                                                id="anonimo"
                                                checked={data.anonimo}
                                                onChange={e => setData('anonimo', e.target.checked)}
                                                className="w-4 h-4 rounded border-gray-300 text-[#C9A646] focus:ring-[#C9A646]/30"
                                            />
                                            <label htmlFor="anonimo" className="text-sm text-gray-600 cursor-pointer select-none">
                                                {t('comentarios', 'anonymous')}
                                            </label>
                                        </div>
                                    </div>
                                )}

                                <div className={`flex ${isRTL ? 'justify-start' : 'justify-end'}`}>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0F3B2E] to-[#09291e] text-white px-6 py-3 rounded-full text-sm sm:text-base font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
                                    >
                                        {processing ? t('common', 'saving') : t('comentarios', 'send')}
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d={isRTL ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
                                        </svg>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
            </section>
        </MainLayout>
    );
}
