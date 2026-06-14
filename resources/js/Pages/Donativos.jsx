import { usePage, router } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import { useTranslation } from '../hooks/useTranslation';

export default function Donativos() {
    const { t, isRTL } = useTranslation();
    const { props } = usePage();
    const { donativos, añoActual } = props;

    const añosDisponibles = [...new Set(donativos.map(d => d.año))].sort((a, b) => b - a);

    const stats = {
        total: donativos.length,
        pagados: donativos.filter(d => d.pagado).length,
        pendientes: donativos.filter(d => !d.pagado).length,
        totalCantidad: donativos.filter(d => d.pagado).reduce((sum, d) => sum + parseFloat(d.cantidad), 0),
    };

    return (
        <MainLayout
            title={t('navbar', 'donations')}
            description="Consulta los donativos de la Mezquita Al‑Quds de El Vendrell. Estado de aportaciones y colaboraciones."
            canonical="/donativos"
            noindex
        >
            <section className="relative min-h-[50vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0F3B2E] via-[#0a2b20] to-[#0F3B2E]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#C9A64612,transparent_60%)] pointer-events-none" />
                <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                    <div className="absolute -top-40 -right-40 w-80 h-80 border border-[#C9A646]/10 rounded-full" />
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 border border-[#C9A646]/10 rounded-full" />
                </div>
                <div className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4">
                            <span className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-[#C9A646]/60" />
                            <span className="w-2 h-2 bg-[#C9A646] rotate-45" />
                            <span className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-[#C9A646]/60" />
                        </div>
                        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.2] mb-4">
                            {t('donativos', 'title')}
                        </h1>
                        <p className="text-[#E8E8E8]/80 text-base sm:text-lg max-w-xl mx-auto">
                            {t('donativos', 'subtitle')}
                        </p>
                    </div>
                </div>
            </section>

            <section className="relative py-16 sm:py-20 bg-gradient-to-b from-white to-[#F7F5F0] overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" aria-hidden="true">
                    <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("/img/FONDOIMAGEN.png")', backgroundSize: '200px', backgroundRepeat: 'repeat' }} />
                </div>
                <div className="relative max-w-5xl mx-auto px-5 sm:px-8">
                    {donativos.length > 0 ? (
                        <>
                            <div className="flex justify-center mb-10">
                                <div className="relative">
                                    <select
                                        value={añoActual}
                                        onChange={(e) => router.get('/donativos', { año: e.target.value })}
                                        className="appearance-none px-5 py-3 pr-10 border border-[#C9A646]/30 rounded-xl text-[#0F3B2E] font-medium bg-white/80 backdrop-blur-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C9A646]/40 text-sm min-h-[48px]"
                                    >
                                        {añosDisponibles.map(año => (
                                            <option key={año} value={año}>{año}</option>
                                        ))}
                                    </select>
                                    <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C9A646] pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10">
                                <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#C9A646]/20 p-5 sm:p-6 text-center shadow-sm hover:shadow-md hover:border-[#C9A646]/30 transition-all duration-300">
                                    <p className="text-2xl sm:text-3xl font-bold text-[#0F3B2E]">{stats.total}</p>
                                    <p className="text-sm text-gray-500 mt-1">{t('donativos', 'total')}</p>
                                </div>
                                <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-green-200 p-5 sm:p-6 text-center shadow-sm hover:shadow-md hover:border-green-300 transition-all duration-300">
                                    <p className="text-2xl sm:text-3xl font-bold text-green-600">{stats.pagados}</p>
                                    <p className="text-sm text-gray-500 mt-1">{t('donativos', 'paid')}</p>
                                </div>
                                <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#C9A646]/20 p-5 sm:p-6 text-center shadow-sm hover:shadow-md hover:border-[#C9A646]/30 transition-all duration-300">
                                    <p className="text-2xl sm:text-3xl font-bold text-[#C9A646]">{stats.totalCantidad.toFixed(2)} €</p>
                                    <p className="text-sm text-gray-500 mt-1">{t('donativos', 'collected')}</p>
                                </div>
                            </div>

                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#C9A646]/20 overflow-hidden shadow-sm">
                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-[400px]">
                                        <thead>
                                            <tr className="border-b border-[#C9A646]/10">
                                                <th className={`px-5 sm:px-6 py-4 text-xs font-semibold text-[#0F3B2E] uppercase tracking-wider ${isRTL ? 'text-right' : 'text-left'}`}>
                                                    {t('donativos', 'name')}
                                                </th>
                                                <th className="px-5 sm:px-6 py-4 text-center text-xs font-semibold text-[#0F3B2E] uppercase tracking-wider">
                                                    {t('donativos', 'amount')}
                                                </th>
                                                <th className="px-5 sm:px-6 py-4 text-center text-xs font-semibold text-[#0F3B2E] uppercase tracking-wider">
                                                    {t('donativos', 'status')}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[#C9A646]/8">
                                            {donativos.map((donativo, idx) => (
                                                <tr key={donativo.id} className="hover:bg-[#C9A646]/5 transition-colors duration-200" style={{ animation: `fade-in-up 0.4s ease-out ${idx * 0.05}s both` }}>
                                                    <td className={`px-5 sm:px-6 py-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                                                        <p className="font-medium text-gray-900 text-sm sm:text-base">{donativo.nombre}</p>
                                                        {donativo.nombre_arabe && (
                                                            <p className="text-xs sm:text-sm text-gray-500 mt-0.5" dir="rtl">{donativo.nombre_arabe}</p>
                                                        )}
                                                    </td>
                                                    <td className="px-5 sm:px-6 py-4 text-center">
                                                        <span className="font-semibold text-[#0F3B2E] text-sm sm:text-base">
                                                            {parseFloat(donativo.cantidad).toFixed(2)} €
                                                        </span>
                                                    </td>
                                                    <td className="px-5 sm:px-6 py-4 text-center">
                                                        <span className={`inline-block px-3 py-1.5 rounded-full text-xs font-medium ${
                                                            donativo.pagado
                                                                ? 'bg-green-100 text-green-700'
                                                                : 'bg-yellow-100 text-yellow-700'
                                                        }`}>
                                                            {donativo.pagado ? t('donativos', 'paid') : t('donativos', 'pending')}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#C9A646]/20 p-12 sm:p-16 text-center">
                            <svg className="w-16 h-16 mx-auto text-[#C9A646]/30 mb-4" viewBox="0 0 48 48" fill="none">
                                <path d="M24 8a16 16 0 100 32 16 16 0 000-32z" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M28 20l-4 4-4-4M20 28l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                            <p className="text-gray-500 text-lg">{t('donativos', 'noData')}</p>
                        </div>
                    )}
                </div>
            </section>
        </MainLayout>
    );
}
