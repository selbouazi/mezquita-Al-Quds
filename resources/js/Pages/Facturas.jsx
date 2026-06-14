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
                <div className="absolute inset-0 bg-gradient-to-br from-[#0F3B2E] via-[#0a2b20] to-[#0F3B2E]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#C9A64612,transparent_60%)] pointer-events-none" />
                <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                    <div className="absolute -top-40 -right-40 w-80 h-80 border border-[#C9A646]/10 rounded-full" />
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 border border-[#C9A646]/10 rounded-full" />
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
                                    className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-[#C9A646]/20 hover:border-[#C9A646]/40 shadow-sm hover:shadow-lg hover:shadow-[#C9A646]/10 transition-all duration-500 hover:-translate-y-0.5 overflow-hidden"
                                    style={{ animation: `fade-in-up 0.5s ease-out ${idx * 0.08}s both` }}
                                >
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 sm:p-6">
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
                                                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0F3B2E] text-white rounded-xl hover:bg-[#0a2b20] transition-all text-sm font-medium shadow-sm hover:shadow-md min-h-[44px]"
                                                >
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#C9A646]/20 p-12 sm:p-16 text-center">
                            <svg className="w-16 h-16 mx-auto text-[#C9A646]/30 mb-4" viewBox="0 0 48 48" fill="none">
                                <rect x="4" y="8" width="40" height="32" rx="3" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M16 18h16M16 24h16M16 30h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                            <p className="text-gray-500 text-lg">{t('facturas', 'noData')}</p>
                        </div>
                    )}
                </div>
            </section>
        </MainLayout>
    );
}
