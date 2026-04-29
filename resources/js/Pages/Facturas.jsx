import { usePage } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import { useTranslation } from '../hooks/useTranslation';

export default function Facturas() {
    const { t } = useTranslation();
    const { props } = usePage();
    const { facturas } = props;

    return (
        <MainLayout title={t('facturas', 'title')}>
            <section className="py-20 fade">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-[#0F5132] mb-4">
                            {t('facturas', 'title')}
                        </h1>
                        <p className="text-gray-600 text-lg">
                            {t('facturas', 'subtitle')}
                        </p>
                    </div>

                    {facturas && facturas.length > 0 ? (
                        <div className="bg-white rounded-3xl shadow-lg border border-[#C9A227]/20 overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-[#F8F8F8]">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F5132]">
                                            {t('facturas', 'title')}
                                        </th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold text-[#0F5132]">
                                            {t('facturas', 'date')}
                                        </th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold text-[#0F5132]">
                                            {t('facturas', 'download')}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {facturas.map((factura, index) => (
                                        <tr key={factura.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                                            <td className="px-6 py-4">
                                                <p className="font-medium text-gray-900">{factura.titulo}</p>
                                                {factura.notas && (
                                                    <p className="text-sm text-gray-500">{factura.notas}</p>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-center text-gray-600">
                                                {new Date(factura.fecha).toLocaleDateString('es')}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {factura.archivo_pdf ? (
                                                    <a
                                                        href={`/facturas/${factura.id}/download`}
                                                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#0F5132] text-white rounded-lg hover:bg-[#0c3f27] transition text-sm"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                        </svg>
                                                        PDF
                                                    </a>
                                                ) : (
                                                    <span className="text-gray-400 text-sm">Sin archivo</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="bg-white rounded-3xl shadow-lg border border-[#C9A227]/20 p-12 text-center">
                            <div className="text-6xl mb-4">📄</div>
                            <p className="text-gray-600 text-lg">
                                {t('facturas', 'noData')}
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </MainLayout>
    );
}