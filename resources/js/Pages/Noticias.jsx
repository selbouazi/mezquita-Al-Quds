import { Link } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import { useTranslation } from '../hooks/useTranslation';
import { useReveal } from '../hooks/useReveal';

export default function Noticias({ noticias }) {
    const { t, locale, isRTL } = useTranslation();
    const newsRef = useReveal();

    return (
        <MainLayout title={t('noticias', 'title')}
            description="Noticias y comunicados de la Mezquita Al‑Quds de El Vendrell. Mantente informado sobre actividades, eventos y anuncios de la comunidad."
            canonical="/noticias">

            {/* === HERO === */}
            <section className="relative pt-28 pb-16 sm:pb-20 lg:pb-24 overflow-hidden bg-gradient-to-b from-[#0F3B2E] to-[#09291e]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#C9A64615,transparent_60%)] pointer-events-none" />
                <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                    <div className="absolute top-[10%] -left-12 w-40 h-40 rounded-full border border-[#C9A646]/10 animate-float-spin" />
                    <div className="absolute bottom-[20%] -right-16 w-32 h-32 rotate-45 border border-[#C9A646]/8 animate-float-spin-reverse" style={{ animationDuration: '14s' }} />
                </div>
                <div className="relative max-w-6xl mx-auto px-5 sm:px-8 text-center">
                    <div className="inline-block px-4 py-1.5 mb-4 bg-white/10 backdrop-blur-sm rounded-full border border-white/10 text-sm sm:text-base text-[#C9A646] font-medium tracking-wider uppercase">
                        {t('noticias', 'title')}
                    </div>
                    <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.2] mb-4">
                        {t('noticias', 'title')}
                    </h1>
                    <p className="text-[#E8E8E8] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                        {t('noticias', 'subtitle')}
                    </p>
                </div>
            </section>

            {/* === NEWS GRID === */}
            <section ref={newsRef} className="reveal relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white to-[#F7F5F0] overflow-hidden">
                <div className="footer-pattern">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                        <defs>
                            <pattern id="girih-noticias" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                                <polygon points="60,0 90,30 90,70 60,100 30,70 30,30" fill="none" stroke="#C9A646" strokeWidth="0.5" opacity="0.12" />
                                <polygon points="60,20 80,40 80,60 60,80 40,60 40,40" fill="none" stroke="#C9A646" strokeWidth="0.3" opacity="0.08" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#girih-noticias)" />
                    </svg>
                </div>

                <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
                    {noticias.data.length === 0 ? (
                        <div className="home-glass-card p-8 sm:p-12 text-center">
                            <svg className="w-12 h-12 mx-auto mb-4 text-[#C9A646]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            <p className="text-gray-400 text-base sm:text-lg">{t('noticias', 'noNoticias')}</p>
                        </div>
                    ) : (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6 lg:gap-8">
                            {noticias.data.map((noticia, idx) => {
                                const dateStr = noticia.fecha_publicacion
                                    ? new Date(noticia.fecha_publicacion).toLocaleDateString(
                                        locale === 'ar' ? 'ar-EG' : locale === 'ca' ? 'ca-ES' : locale === 'en' ? 'en-US' : 'es-ES',
                                        { day: 'numeric', month: 'long', year: 'numeric' }
                                      )
                                    : '';
                                return (
                                    <Link
                                        key={noticia.id}
                                        href={`/noticias/${noticia.id}`}
                                        className="news-card-premium group block bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl"
                                        style={{ animation: `fade-in-up 0.6s ease-out ${idx * 0.08}s both` }}
                                    >
                                        <div className="relative overflow-hidden">
                                            {noticia.imagen ? (
                                                <>
                                                    <img
                                                        src={noticia.imagen}
                                                        alt={noticia.titulo}
                                                        className="w-full h-44 sm:h-48 object-cover group-hover:scale-105 transition duration-700"
                                                        loading="lazy"
                                                        style={{ filter: 'saturate(0.8)' }}
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F3B2E]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                                </>
                                            ) : (
                                                <div className="w-full h-44 sm:h-48 bg-gradient-to-br from-[#0F3B2E]/5 to-[#C9A646]/5 flex items-center justify-center">
                                                    <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#C9A646]/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                                                    </svg>
                                                </div>
                                            )}
                                            {dateStr && (
                                                <div className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} bg-white/90 backdrop-blur-sm rounded-lg px-2.5 py-1.5 text-sm sm:text-base text-gray-600 font-medium shadow-sm flex items-center gap-1.5`}>
                                                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C9A646] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                                                    </svg>
                                                    <span className="truncate">{dateStr}</span>
                                                </div>
                                            )}
                                            <div className={`absolute top-3 ${isRTL ? 'left-3' : 'right-3'} bg-[#0F3B2E]/80 backdrop-blur-sm text-white text-xs sm:text-sm font-bold px-2.5 py-1 rounded-md uppercase tracking-wider`}>
                                                {t('noticias', 'title')}
                                            </div>
                                        </div>
                                        <div className={`p-4 sm:p-5 ${isRTL ? 'text-right' : ''}`}>
                                            <h3 className="font-display text-lg sm:text-xl font-semibold text-[#0F3B2E] group-hover:text-[#C9A646] transition-colors duration-300 mb-2 leading-snug">
                                                {noticia.titulo}
                                            </h3>
                                            <p className={`text-gray-500 text-base leading-relaxed line-clamp-3 ${isRTL ? 'text-right' : ''}`}>
                                                {noticia.contenido}
                                            </p>
                                            <div className={`mt-3 sm:mt-4 flex items-center gap-1 text-base sm:text-lg text-[#C9A646] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isRTL ? 'flex-row-reverse justify-start' : ''}`}>
                                                <span>{t('common', 'read')}</span>
                                                <span className="link-arrow !opacity-100 !transform-none">→</span>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    )}

                    {/* Pagination */}
                    {noticias.last_page > 1 && (
                        <div className="flex justify-center items-center gap-3 mt-10 sm:mt-12 flex-wrap">
                            {noticias.prev_page_url && (
                                <Link href={noticias.prev_page_url}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-full border border-[#C9A646]/20 text-[#0F3B2E] text-sm sm:text-base font-medium hover:bg-[#0F3B2E] hover:text-white hover:border-[#0F3B2E] transition-all duration-300 shadow-sm">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d={isRTL ? 'M9 5l7 7-7 7' : 'M15 19l-7-7 7-7'} />
                                    </svg>
                                    {t('common', 'previous')}
                                </Link>
                            )}
                            <div className="flex items-center gap-2">
                                {Array.from({ length: noticias.last_page }, (_, i) => i + 1).map(page => (
                                    <Link
                                        key={page}
                                        href={`/noticias?page=${page}`}
                                        className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-semibold transition-all duration-200 ${
                                            page === noticias.current_page
                                                ? 'bg-[#0F3B2E] text-white shadow-md'
                                                : 'bg-white text-gray-500 border border-gray-200 hover:border-[#C9A646]/40 hover:text-[#0F3B2E]'
                                        }`}
                                    >
                                        {page}
                                    </Link>
                                ))}
                            </div>
                            {noticias.next_page_url && (
                                <Link href={noticias.next_page_url}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-full border border-[#C9A646]/20 text-[#0F3B2E] text-sm sm:text-base font-medium hover:bg-[#0F3B2E] hover:text-white hover:border-[#0F3B2E] transition-all duration-300 shadow-sm">
                                    {t('common', 'next')}
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d={isRTL ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
                                    </svg>
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </MainLayout>
    );
}
