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
                <div className="absolute inset-0 bg-[url('/img/Todas.png')] bg-cover bg-center bg-no-repeat" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(15,59,46,0.75), rgba(15,59,46,0.4))' }} />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#C9A64612,transparent_60%)] pointer-events-none" />
                <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                    <div className="absolute -top-40 -right-40 w-80 h-80 border border-[#C9A646]/10 rounded-full" />
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 border border-[#C9A646]/10 rounded-full" />
                    <svg className="absolute top-[15%] left-[8%] w-9 h-9 text-[#C9A646]/10 animate-float-drift" viewBox="0 0 48 48" fill="none">
                        <path d="M24 2L30 18L46 24L30 30L24 46L18 30L2 24L18 18Z" stroke="currentColor" strokeWidth="0.6" />
                    </svg>
                    <svg className="absolute bottom-[25%] right-[10%] w-8 h-8 text-white/[0.06] animate-glow-spin-reverse" style={{ animationDuration: '22s' }} viewBox="0 0 48 48" fill="none">
                        <path d="M24 2L30 18L46 24L30 30L24 46L18 30L2 24L18 18Z" stroke="currentColor" strokeWidth="0.5" />
                    </svg>
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

            {/* ——— Separador ——— */}
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
                <div className="relative max-w-5xl mx-auto px-5 sm:px-8">
                    {donativos.length > 0 ? (
                        <>
                            <div className="flex justify-center mb-10">
                                <div className="relative group/select">
                                    <select
                                        value={añoActual}
                                        onChange={(e) => router.get('/donativos', { año: e.target.value })}
                                        className="appearance-none px-5 py-3 pr-10 border border-[#C9A646]/30 rounded-xl text-[#0F3B2E] font-medium bg-white/80 backdrop-blur-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C9A646]/40 text-sm min-h-[48px] hover:border-[#C9A646]/50 transition-colors"
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
                                <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#C9A646]/20 p-5 sm:p-6 text-center shadow-sm hover:shadow-lg hover:shadow-[#C9A646]/10 hover:-translate-y-0.5 hover:border-[#C9A646]/30 transition-all duration-300 group/stats">
                                    <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-[#C9A646]/10 flex items-center justify-center group-hover/stats:bg-[#C9A646]/20 group-hover/stats:scale-110 transition-all duration-300">
                                        <svg className="w-5 h-5 text-[#C9A646]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                                        </svg>
                                    </div>
                                    <p className="text-2xl sm:text-3xl font-bold text-[#0F3B2E]">{stats.total}</p>
                                    <p className="text-sm text-gray-500 mt-1">{t('donativos', 'total')}</p>
                                </div>
                                <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-green-200 p-5 sm:p-6 text-center shadow-sm hover:shadow-lg hover:shadow-green-200/50 hover:-translate-y-0.5 hover:border-green-300 transition-all duration-300 group/stats">
                                    <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-green-100 flex items-center justify-center group-hover/stats:bg-green-200 group-hover/stats:scale-110 transition-all duration-300">
                                        <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                    </div>
                                    <p className="text-2xl sm:text-3xl font-bold text-green-600">{stats.pagados}</p>
                                    <p className="text-sm text-gray-500 mt-1">{t('donativos', 'paid')}</p>
                                </div>
                                <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#C9A646]/20 p-5 sm:p-6 text-center shadow-sm hover:shadow-lg hover:shadow-[#C9A646]/10 hover:-translate-y-0.5 hover:border-[#C9A646]/30 transition-all duration-300 group/stats">
                                    <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-[#C9A646]/10 flex items-center justify-center group-hover/stats:bg-[#C9A646]/20 group-hover/stats:scale-110 transition-all duration-300">
                                        <svg className="w-5 h-5 text-[#C9A646]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                    </div>
                                    <p className="text-2xl sm:text-3xl font-bold text-[#C9A646]">{stats.totalCantidad.toFixed(2)} €</p>
                                    <p className="text-sm text-gray-500 mt-1">{t('donativos', 'collected')}</p>
                                </div>
                            </div>

                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#C9A646]/20 overflow-hidden shadow-sm">
                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-[400px]">
                                        <thead>
                                            <tr className="bg-gradient-to-r from-[#0F3B2E] to-[#1a5a43]">
                                                <th className={`px-5 sm:px-6 py-4 text-xs font-semibold text-white uppercase tracking-wider ${isRTL ? 'text-right' : 'text-left'}`}>
                                                    {t('donativos', 'name')}
                                                </th>
                                                <th className="px-5 sm:px-6 py-4 text-center text-xs font-semibold text-white uppercase tracking-wider">
                                                    {t('donativos', 'amount')}
                                                </th>
                                                <th className="px-5 sm:px-6 py-4 text-center text-xs font-semibold text-white uppercase tracking-wider">
                                                    {t('donativos', 'status')}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[#C9A646]/8">
                                            {donativos.map((donativo, idx) => (
                                                <tr key={donativo.id} className="hover:bg-[#C9A646]/5 transition-colors duration-200 even:bg-[#C9A646]/[0.02]" style={{ animation: `fade-in-up 0.4s ease-out ${idx * 0.05}s both` }}>
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
                                                        <span className={`inline-block px-3 py-1.5 rounded-full text-xs font-medium shadow-sm ${
                                                            donativo.pagado
                                                                ? 'bg-gradient-to-r from-green-50 to-green-100 text-green-700 border border-green-200'
                                                                : 'bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-700 border border-yellow-200'
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
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#C9A646]/20 p-12 sm:p-16 text-center relative overflow-hidden">
                            <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
                                <svg className="w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
                                    <defs>
                                        <pattern id="donativos-empty-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                                            <polygon points="20,1 39,20 20,39 1,20" fill="none" stroke="#C9A646" strokeWidth="0.5" />
                                        </pattern>
                                    </defs>
                                    <rect width="100%" height="100%" fill="url(#donativos-empty-pattern)" />
                                </svg>
                            </div>
                            <div className="relative">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#C9A646]/10 flex items-center justify-center">
                                    <svg className="w-8 h-8 text-[#C9A646]/40" viewBox="0 0 48 48" fill="none">
                                        <path d="M24 8a16 16 0 100 32 16 16 0 000-32z" stroke="currentColor" strokeWidth="1.5" />
                                        <path d="M28 20l-4 4-4-4M20 28l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                </div>
                                <p className="text-gray-500 text-lg">{t('donativos', 'noData')}</p>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </MainLayout>
    );
}
