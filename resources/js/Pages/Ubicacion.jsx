import MainLayout from '../Layouts/MainLayout';
import { useTranslation } from '../hooks/useTranslation';
import { useReveal } from '../hooks/useReveal';
import MapButton from '../Components/MapButton';

export default function Ubicacion({ ubicacion }) {
    const { t, isRTL } = useTranslation();
    const sectionRef = useReveal();

    const lat = ubicacion?.latitud || 41.230484;
    const lng = ubicacion?.longitud || 1.532144;
    const address = ubicacion?.direccion || 'Carrer dels Carboners, 11, 43700 El Vendrell, Tarragona, España';
    const mapSrc = `https://www.google.com/maps?q=${lat},${lng}&output=embed`;

    return (
        <MainLayout title={t('ubicacion', 'title')}
            description="Cómo llegar a la Mezquita Al‑Quds en El Vendrell, Tarragona. Dirección, mapa y coordenadas."
            canonical="/ubicacion">
            {/* === HERO === */}
            <section className="relative pt-28 pb-16 sm:pb-20 lg:pb-24 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/img/Ubicación.png')] bg-cover bg-center bg-no-repeat" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(15,59,46,0.75), rgba(15,59,46,0.4))' }} />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#C9A64615,transparent_60%)] pointer-events-none" />
                <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                    <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full border border-[#C9A646]/10 animate-float-spin" />
                    <div className="absolute -bottom-16 -left-16 w-48 h-48 rotate-45 border border-[#C9A646]/8 animate-float-spin-reverse" style={{ animationDuration: '18s' }} />
                    <svg className="absolute top-[10%] left-[5%] w-8 h-8 text-[#C9A646]/10 animate-float-drift" viewBox="0 0 48 48" fill="none">
                        <path d="M24 2L30 18L46 24L30 30L24 46L18 30L2 24L18 18Z" stroke="currentColor" strokeWidth="0.6" />
                    </svg>
                    <svg className="absolute bottom-[30%] right-[10%] w-9 h-9 text-white/[0.06] animate-glow-spin-reverse" style={{ animationDuration: '24s' }} viewBox="0 0 48 48" fill="none">
                        <path d="M24 2L30 18L46 24L30 30L24 46L18 30L2 24L18 18Z" stroke="currentColor" strokeWidth="0.5" />
                    </svg>
                </div>
                <div className="relative max-w-3xl mx-auto px-5 sm:px-8 text-center">
                    <div className="inline-block px-4 py-1.5 mb-4 bg-white/10 backdrop-blur-sm rounded-full border border-white/10 text-sm sm:text-base text-[#C9A646] font-medium tracking-wider uppercase">
                        {t('ubicacion', 'title')}
                    </div>
                    <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.2] mb-4">
                        {t('ubicacion', 'title')}
                    </h1>
                    <p className="text-[#E8E8E8] text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
                        {t('ubicacion', 'subtitle')}
                    </p>
                </div>
            </section>

            {/* === MAP + INFO === */}
            <section ref={sectionRef} className="reveal relative py-16 sm:py-20 lg:py-24 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/img/allahakbar.png')] bg-cover bg-center" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(200, 160, 60, 0.35), rgba(170, 130, 40, 0.3))' }} />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#C9A64612,transparent_60%)] pointer-events-none" />
                <div className="footer-pattern">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                        <defs>
                            <pattern id="girih-ubicacion" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                                <polygon points="60,0 90,30 90,70 60,100 30,70 30,30" fill="none" stroke="#C9A646" strokeWidth="0.5" opacity="0.1" />
                                <polygon points="60,20 80,40 80,60 60,80 40,60 40,40" fill="none" stroke="#C9A646" strokeWidth="0.3" opacity="0.06" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#girih-ubicacion)" />
                    </svg>
                </div>

                <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
                    <div className={`grid lg:grid-cols-5 gap-6 lg:gap-8 ${isRTL ? 'lg:direction-rtl' : ''}`}>
                        {/* Map */}
                        <div className="lg:col-span-3 home-glass-card p-2 sm:p-3 overflow-hidden relative group/map">
                            <svg className="absolute -top-4 -right-4 w-16 h-16 text-[#C9A646]/8 pointer-events-none rotate-45 opacity-0 group-hover/map:opacity-100 transition-opacity duration-500" viewBox="0 0 48 48" fill="none">
                                <path d="M24 2L30 18L46 24L30 30L24 46L18 30L2 24L18 18Z" stroke="currentColor" strokeWidth="0.4" />
                            </svg>
                            <svg className="absolute -bottom-4 -left-4 w-16 h-16 text-[#C9A646]/8 pointer-events-none opacity-0 group-hover/map:opacity-100 transition-opacity duration-500" viewBox="0 0 48 48" fill="none">
                                <path d="M24 2L30 18L46 24L30 30L24 46L18 30L2 24L18 18Z" stroke="currentColor" strokeWidth="0.4" />
                            </svg>
                            <div className="rounded-xl overflow-hidden relative z-10">
                                <iframe
                                    title="Ubicación Mezquita Al-Quds"
                                    src={mapSrc}
                                    width="100%"
                                    height="420"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="w-full"
                                />
                            </div>
                        </div>

                        {/* Info cards */}
                        <div className="lg:col-span-2 space-y-4 sm:space-y-5">
                            <div className="home-glass-card p-5 sm:p-6 group/info hover:-translate-y-0.5 transition-all duration-300">
                                <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                    <div className="w-10 h-10 rounded-full bg-[#C9A646]/10 flex items-center justify-center flex-shrink-0 group-hover/info:bg-[#C9A646]/20 group-hover/info:scale-110 transition-all duration-300">
                                        <svg className="w-5 h-5 text-[#C9A646]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                        </svg>
                                    </div>
                                    <div className={isRTL ? 'text-right' : ''}>
                                        <p className="text-xs sm:text-sm text-gray-400 font-medium uppercase tracking-wider">{t('ubicacion', 'address')}</p>
                                        <p className="text-[#0F3B2E] font-semibold mt-1 group-hover/info:text-[#C9A646] transition-colors duration-300">{address}</p>
                                    </div>
                                </div>
                            </div>

                            {ubicacion?.telefono && (
                                <div className="home-glass-card p-5 sm:p-6 group/info hover:-translate-y-0.5 transition-all duration-300">
                                    <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                        <div className="w-10 h-10 rounded-full bg-[#C9A646]/10 flex items-center justify-center flex-shrink-0 group-hover/info:bg-[#C9A646]/20 group-hover/info:scale-110 transition-all duration-300">
                                            <svg className="w-5 h-5 text-[#C9A646]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                                            </svg>
                                        </div>
                                        <div className={isRTL ? 'text-right' : ''}>
                                            <p className="text-xs sm:text-sm text-gray-400 font-medium uppercase tracking-wider">{t('ubicacion', 'phone')}</p>
                                            <p className="text-[#0F3B2E] font-semibold mt-1 group-hover/info:text-[#C9A646] transition-colors duration-300">{ubicacion.telefono}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {ubicacion?.email && (
                                <div className="home-glass-card p-5 sm:p-6 group/info hover:-translate-y-0.5 transition-all duration-300">
                                    <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                        <div className="w-10 h-10 rounded-full bg-[#C9A646]/10 flex items-center justify-center flex-shrink-0 group-hover/info:bg-[#C9A646]/20 group-hover/info:scale-110 transition-all duration-300">
                                            <svg className="w-5 h-5 text-[#C9A646]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                            </svg>
                                        </div>
                                        <div className={isRTL ? 'text-right' : ''}>
                                            <p className="text-xs sm:text-sm text-gray-400 font-medium uppercase tracking-wider">{t('ubicacion', 'email')}</p>
                                            <p className="text-[#0F3B2E] font-semibold mt-1 group-hover/info:text-[#C9A646] transition-colors duration-300">{ubicacion.email}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <MapButton lat={lat} lng={lng}
                                className="group/btn w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#0F3B2E] to-[#09291e] text-white px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-lg hover:shadow-[#0F3B2E]/30 hover:-translate-y-0.5 transition-all duration-300 active:scale-[0.97]"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
