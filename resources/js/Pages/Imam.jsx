import { Link } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import { useTranslation } from '../hooks/useTranslation';
import { useReveal } from '../hooks/useReveal';

export default function Imam({ imam }) {
    const { t, isRTL } = useTranslation();
    const sectionRef = useReveal();

    return (
        <MainLayout title={t('navbar', 'imam')} meta={{ title: t('meta.imam.title'), description: t('meta.imam.description') }} canonical="/imam"
            image={imam?.foto || undefined}>
            {/* === HERO === */}
            <section className="relative pt-28 pb-16 sm:pb-20 lg:pb-24 overflow-hidden bg-gradient-to-b from-[#0F3B2E] to-[#09291e]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#C9A64615,transparent_60%)] pointer-events-none" />
                <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                    <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full border border-[#C9A646]/10 animate-float-spin" />
                    <div className="absolute -bottom-16 -left-16 w-48 h-48 rotate-45 border border-[#C9A646]/8 animate-float-spin-reverse" style={{ animationDuration: '18s' }} />
                </div>
                <div className="relative max-w-3xl mx-auto px-5 sm:px-8 text-center">
                    <div className="inline-block px-4 py-1.5 mb-4 bg-white/10 backdrop-blur-sm rounded-full border border-white/10 text-sm sm:text-base text-[#C9A646] font-medium tracking-wider uppercase">
                        {t('navbar', 'imam')}
                    </div>
                    <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.2] mb-4">
                        {t('navbar', 'imam')}
                    </h1>
                    <p className="text-[#E8E8E8] text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
                        {t('meta.imam.description')}
                    </p>
                </div>
            </section>

            {/* === IMAM CONTENT === */}
            <section ref={sectionRef} className="reveal relative py-16 sm:py-20 lg:py-24 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/img/allahakbar.png')] bg-cover bg-center" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(200, 160, 60, 0.35), rgba(170, 130, 40, 0.3))' }} />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#C9A64612,transparent_60%)] pointer-events-none" />
                <div className="footer-pattern">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                        <defs>
                            <pattern id="girih-imam" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                                <polygon points="60,0 90,30 90,70 60,100 30,70 30,30" fill="none" stroke="#C9A646" strokeWidth="0.5" opacity="0.1" />
                                <polygon points="60,20 80,40 80,60 60,80 40,60 40,40" fill="none" stroke="#C9A646" strokeWidth="0.3" opacity="0.06" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#girih-imam)" />
                    </svg>
                </div>

                <div className="relative max-w-4xl mx-auto px-5 sm:px-8">
                    {imam ? (
                        <div className={`home-glass-card p-6 sm:p-8 lg:p-12 ${isRTL ? 'text-right' : ''}`}>
                            <div className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
                                {imam.foto ? (
                                    <img
                                        src={imam.foto}
                                        alt={imam.nombre}
                                        className="w-48 h-48 lg:w-64 lg:h-64 rounded-full object-cover shadow-xl border-4 border-[#C9A646]/30 flex-shrink-0"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="w-48 h-48 lg:w-64 lg:h-64 rounded-full bg-[#0F3B2E]/5 flex items-center justify-center border-4 border-[#C9A646]/30 flex-shrink-0">
                                        <svg className="w-24 h-24 text-[#C9A646]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                        </svg>
                                    </div>
                                )}

                                <div className="flex-1">
                                    {imam.nombre && (
                                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F3B2E] mb-4 leading-[1.3]">
                                            {imam.nombre}
                                        </h2>
                                    )}
                                    <div className="w-16 h-1 bg-gradient-to-r from-[#C9A646] to-[#d4b44c] rounded-full mb-6" />
                                    {imam.descripcion && (
                                        <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                                            {imam.descripcion}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="home-glass-card p-12 sm:p-16 text-center">
                            <svg className="w-16 h-16 mx-auto mb-4 text-[#C9A646]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
                            <p className="text-gray-500 text-lg">
                                {t('imam', 'noInfo') || 'No hay información del imam disponible.'}
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </MainLayout>
    );
}
