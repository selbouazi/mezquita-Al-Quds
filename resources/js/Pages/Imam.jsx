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
            <section className="relative pt-28 pb-16 sm:pb-20 lg:pb-24 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/img/imam.png')] bg-cover bg-center bg-no-repeat" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(15,59,46,0.7), rgba(15,59,46,0.35))' }} />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#C9A64615,transparent_60%)] pointer-events-none" />
                <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                    <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full border border-[#C9A646]/10 animate-float-spin" />
                    <div className="absolute -bottom-16 -left-16 w-48 h-48 rotate-45 border border-[#C9A646]/8 animate-float-spin-reverse" style={{ animationDuration: '18s' }} />
                    <svg className="absolute top-[18%] right-[8%] w-9 h-9 text-[#C9A646]/10 animate-glow-spin" viewBox="0 0 48 48" fill="none">
                        <path d="M24 2L30 18L46 24L30 30L24 46L18 30L2 24L18 18Z" stroke="currentColor" strokeWidth="0.6" />
                    </svg>
                    <svg className="absolute bottom-[12%] left-[6%] w-7 h-7 text-white/[0.06] animate-float-drift" style={{ animationDuration: '15s' }} viewBox="0 0 48 48" fill="none">
                        <path d="M24 2L30 18L46 24L30 30L24 46L18 30L2 24L18 18Z" stroke="currentColor" strokeWidth="0.5" />
                    </svg>
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
                        <div className={`home-glass-card p-6 sm:p-8 lg:p-12 relative overflow-hidden ${isRTL ? 'text-right' : ''}`}>
                            {/* Geometric decorative corners */}
                            <svg className="absolute -top-6 -right-6 w-24 h-24 text-[#C9A646]/8 pointer-events-none rotate-45" viewBox="0 0 48 48" fill="none">
                                <path d="M24 2L30 18L46 24L30 30L24 46L18 30L2 24L18 18Z" stroke="currentColor" strokeWidth="0.4" />
                                <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="0.2" opacity="0.5" />
                            </svg>
                            <svg className="absolute -bottom-6 -left-6 w-24 h-24 text-[#C9A646]/8 pointer-events-none" viewBox="0 0 48 48" fill="none">
                                <path d="M24 2L30 18L46 24L30 30L24 46L18 30L2 24L18 18Z" stroke="currentColor" strokeWidth="0.4" />
                                <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="0.2" opacity="0.5" />
                            </svg>
                            <div className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12 ${isRTL ? 'lg:flex-row-reverse' : ''} relative z-10`}>
                                <div className="relative flex-shrink-0">
                                    {/* Geometric decorative frame */}
                                    <svg className="absolute -inset-4 w-[calc(100%+2rem)] h-[calc(100%+2rem)] pointer-events-none" viewBox="0 0 110 110" fill="none">
                                        <polygon points="55,2 108,55 55,108 2,55" fill="none" stroke="#C9A646" strokeWidth="1" opacity="0.2" />
                                        <polygon points="55,12 98,55 55,98 12,55" fill="none" stroke="#C9A646" strokeWidth="0.5" opacity="0.15" />
                                        <circle cx="55" cy="55" r="22" fill="none" stroke="#C9A646" strokeWidth="0.4" opacity="0.1" strokeDasharray="3 3" />
                                    </svg>
                                    {imam.foto ? (
                                        <img
                                            src={imam.foto}
                                            alt={imam.nombre}
                                            className="w-48 h-48 lg:w-64 lg:h-64 rounded-full object-cover shadow-xl border-4 border-[#C9A646]/30 flex-shrink-0 relative"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="w-48 h-48 lg:w-64 lg:h-64 rounded-full bg-gradient-to-br from-[#0F3B2E]/5 to-[#C9A646]/10 flex items-center justify-center border-4 border-[#C9A646]/30 flex-shrink-0 relative">
                                            <svg className="w-24 h-24 text-[#C9A646]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                            </svg>
                                        </div>
                                    )}
                                </div>

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
                        <div className="home-glass-card p-12 sm:p-16 text-center relative overflow-hidden">
                            <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
                                <svg className="w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
                                    <defs>
                                        <pattern id="imam-empty-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                                            <polygon points="20,1 39,20 20,39 1,20" fill="none" stroke="#C9A646" strokeWidth="0.5" />
                                        </pattern>
                                    </defs>
                                    <rect width="100%" height="100%" fill="url(#imam-empty-pattern)" />
                                </svg>
                            </div>
                            <div className="relative">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#C9A646]/10 flex items-center justify-center">
                                    <svg className="w-8 h-8 text-[#C9A646]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                    </svg>
                                </div>
                                <p className="text-gray-500 text-lg">
                                    {t('imam', 'noInfo') || 'No hay información del imam disponible.'}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </MainLayout>
    );
}
