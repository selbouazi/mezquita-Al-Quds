import { usePage } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import { useTranslation } from '../hooks/useTranslation';

export default function Facturas() {
    const { t, locale, isRTL } = useTranslation();
    const { props } = usePage();
    const { facturas } = props;

    return (
        <MainLayout
            title={t('facturas', 'title')}
            description="Descarga las facturas de la Mezquita Al‑Quds de El Vendrell. Facturas anuales y documentos oficiales de la comunidad."
            canonical="/facturas"
            noindex
        >
            <section className="relative min-h-[60vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('/img/Todas.png')] bg-cover bg-center bg-no-repeat" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(15,59,46,0.75), rgba(15,59,46,0.4))' }} />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#C9A64612,transparent_60%)] pointer-events-none" />
                <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                    <div className="absolute -top-40 -right-40 w-80 h-80 border border-[#C9A646]/10 rounded-full" />
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 border border-[#C9A646]/10 rounded-full" />
                    <svg className="absolute top-[20%] left-[10%] w-10 h-10 text-[#C9A646]/10 animate-float-drift" viewBox="0 0 48 48" fill="none">
                        <path d="M24 2L30 18L46 24L30 30L24 46L18 30L2 24L18 18Z" stroke="currentColor" strokeWidth="0.6" />
                    </svg>
                    <svg className="absolute bottom-[20%] right-[8%] w-8 h-8 text-white/[0.06] animate-glow-spin-reverse" style={{ animationDuration: '22s' }} viewBox="0 0 48 48" fill="none">
                        <path d="M24 2L30 18L46 24L30 30L24 46L18 30L2 24L18 18Z" stroke="currentColor" strokeWidth="0.5" />
                    </svg>
                </div>
                <div className="relative z-10 w-full max-w-4xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4">
                            <span className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-[#C9A646]/60" />
                            <span className="w-2 h-2 bg-[#C9A646] rotate-45" />
                            <span className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-[#C9A646]/60" />
                        </div>
                        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.2] mb-4">
                            {t('facturas', 'title')}
                        </h1>
                        <p className="text-[#E8E8E8]/80 text-base sm:text-lg max-w-xl mx-auto">
                            {t('facturas', 'subtitle')}
                        </p>
                    </div>
                </div>
            </section>

            {/* ——— Separador con diamantes conectados ——— */}
            <div className="relative py-5 bg-gradient-to-b from-[#0F3B2E] to-transparent" aria-hidden="true">
                <div className="flex items-center justify-center">
                    <svg width="180" height="20" viewBox="0 0 180 20" fill="none" className="opacity-40">
                        <line x1="0" y1="10" x2="40" y2="10" stroke="#C9A646" strokeWidth="0.5" opacity="0.3" />
                        <rect x="40" y="6" width="8" height="8" fill="#C9A646" opacity="0.3" transform="rotate(45 44 10)" />
                        <line x1="48" y1="10" x2="72" y2="10" stroke="#C9A646" strokeWidth="0.5" opacity="0.4" />
                        <rect x="72" y="4" width="12" height="12" fill="#C9A646" opacity="0.4" transform="rotate(45 78 10)" />
                        <line x1="84" y1="10" x2="96" y2="10" stroke="#C9A646" strokeWidth="0.5" opacity="0.4" />
                        <rect x="96" y="6" width="8" height="8" fill="#C9A646" opacity="0.3" transform="rotate(45 100 10)" />
                        <line x1="104" y1="10" x2="140" y2="10" stroke="#C9A646" strokeWidth="0.5" opacity="0.3" />
                    </svg>
                </div>
            </div>

            <section className="relative py-16 sm:py-20 bg-gradient-to-b from-white to-[#F7F5F0] overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" aria-hidden="true">
                    <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("/img/FONDOIMAGEN.png")', backgroundSize: '200px', backgroundRepeat: 'repeat' }} />
                </div>
                <div className="relative max-w-4xl mx-auto px-5 sm:px-8">
                    {facturas && facturas.length > 0 ? (
                        <div className="space-y-4">
                            {facturas.map((factura, idx) => (
                                <div
                                    key={factura.id}
                                    className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-[#C9A646]/20 hover:border-[#C9A646]/40 shadow-sm hover:shadow-lg hover:shadow-[#C9A646]/10 transition-all duration-500 hover:-translate-y-0.5 overflow-hidden relative"
                                    style={{ animation: `fade-in-up 0.5s ease-out ${idx * 0.08}s both` }}
                                >
                                    {/* Geometric pattern overlay on hover */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                        <svg className="w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
                                            <defs>
                                                <pattern id={`factura-pattern-${factura.id}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                                                    <polygon points="20,1 39,20 20,39 1,20" fill="none" stroke="#C9A646" strokeWidth="0.3" opacity="0.10" />
                                                </pattern>
                                            </defs>
                                            <rect width="100%" height="100%" fill={`url(#factura-pattern-${factura.id})`} />
                                        </svg>
                                    </div>
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 sm:p-6 relative z-10">
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-gray-900 text-base sm:text-lg leading-snug">
                                                {factura.titulo}
                                            </h3>
                                            {factura.notas && (
                                                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{factura.notas}</p>
                                            )}
                                            <p className="text-xs text-gray-400 mt-2">
                                                {new Date(factura.fecha).toLocaleDateString(locale)}
                                            </p>
                                        </div>
                                        <div className="shrink-0">
                                            {factura.archivo_pdf ? (
                                                <a
                                                    href={`/facturas/${factura.id}/download`}
                                                    className="group/pdf inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#0F3B2E] to-[#1a5a43] text-white rounded-xl hover:shadow-lg hover:shadow-[#0F3B2E]/20 transition-all duration-300 text-sm font-medium min-h-[44px] hover:-translate-y-0.5 active:scale-[0.97]"
                                                >
                                                    <svg className="w-4 h-4 transform group-hover/pdf:scale-110 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                    PDF
                                                </a>
                                            ) : (
                                                <span className="text-gray-400 text-sm italic">{t('facturas', 'noFile')}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#C9A646]/20 p-12 sm:p-16 text-center relative overflow-hidden">
                            <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
                                <svg className="w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
                                    <defs>
                                        <pattern id="facturas-empty-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                                            <polygon points="20,1 39,20 20,39 1,20" fill="none" stroke="#C9A646" strokeWidth="0.5" />
                                        </pattern>
                                    </defs>
                                    <rect width="100%" height="100%" fill="url(#facturas-empty-pattern)" />
                                </svg>
                            </div>
                            <div className="relative">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#C9A646]/10 flex items-center justify-center">
                                    <svg className="w-8 h-8 text-[#C9A646]/40" viewBox="0 0 48 48" fill="none">
                                        <rect x="4" y="8" width="40" height="32" rx="3" stroke="currentColor" strokeWidth="1.5" />
                                        <path d="M16 18h16M16 24h16M16 30h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                </div>
                                <p className="text-gray-500 text-lg">{t('facturas', 'noData')}</p>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </MainLayout>
    );
}
