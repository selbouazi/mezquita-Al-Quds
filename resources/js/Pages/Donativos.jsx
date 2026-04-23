import { useState } from 'react';
import { usePage, router, Link } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import { useTranslation } from '../hooks/useTranslation';

export default function Donativos() {
    const { t } = useTranslation();
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
        <MainLayout title={t('navbar', 'donations')}>
            <section className="py-20 fade">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-[#0F5132] mb-4">
                            {t('donativos', 'title')}
                        </h1>
                        <p className="text-gray-600 text-lg">
                            {t('donativos', 'subtitle')}
                        </p>
                    </div>

                    {donativos.length > 0 ? (
                        <>
                            <div className="flex justify-center mb-8">
                                <select
                                    value={añoActual}
                                    onChange={(e) => router.get('/donativos', { año: e.target.value })}
                                    className="px-4 py-2 border border-[#C9A227]/40 rounded-xl text-[#0F5132] font-medium bg-white"
                                >
                                    {añosDisponibles.map(año => (
                                        <option key={año} value={año}>{año}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mb-8">
                                <div className="bg-white rounded-2xl shadow-sm border border-[#C9A227]/20 p-6 text-center">
                                    <p className="text-3xl font-bold text-[#0F5132]">{stats.total}</p>
                                    <p className="text-sm text-gray-600">{t('donativos', 'total')}</p>
                                </div>
                                <div className="bg-white rounded-2xl shadow-sm border border-[#C9A227]/20 p-6 text-center">
                                    <p className="text-3xl font-bold text-green-600">{stats.pagados}</p>
                                    <p className="text-sm text-gray-600">{t('donativos', 'paid')}</p>
                                </div>
                                <div className="bg-white rounded-2xl shadow-sm border border-[#C9A227]/20 p-6 text-center">
                                    <p className="text-3xl font-bold text-[#C9A227]">{stats.totalCantidad.toFixed(2)} €</p>
                                    <p className="text-sm text-gray-600">{t('donativos', 'collected')}</p>
                                </div>
                            </div>

                            <div className="bg-white rounded-3xl shadow-lg border border-[#C9A227]/20 overflow-hidden">
                                <table className="w-full">
                                    <thead className="bg-[#F8F8F8]">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-[#0F5132]">
                                                {t('donativos', 'name')}
                                            </th>
                                            <th className="px-6 py-4 text-center text-sm font-semibold text-[#0F5132]">
                                                {t('donativos', 'amount')}
                                            </th>
                                            <th className="px-6 py-4 text-center text-sm font-semibold text-[#0F5132]">
                                                {t('donativos', 'status')}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {donativos.map((donativo, index) => (
                                            <tr key={donativo.id} className={index % 2 === 0 ? 'bg-white' : 'bg-[#F8F8F8]/30'}>
                                                <td className="px-6 py-4">
                                                    <div>
                                                        <p className="font-medium text-gray-900">{donativo.nombre}</p>
                                                        {donativo.nombre_arabe && (
                                                            <p className="text-sm text-gray-500" dir="rtl">{donativo.nombre_arabe}</p>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className="font-semibold text-[#0F5132]">
                                                        {parseFloat(donativo.cantidad).toFixed(2)} €
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                                                        donativo.pagado 
                                                            ? 'bg-green-100 text-green-800' 
                                                            : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                        {donativo.pagado ? t('donativos', 'paid') : t('donativos', 'pending')}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    ) : (
                        <div className="bg-white rounded-3xl shadow-lg border border-[#C9A227]/20 p-12 text-center">
                            <div className="text-6xl mb-4">🤲</div>
                            <p className="text-gray-600 text-lg">
                                {t('donativos', 'noData')}
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </MainLayout>
    );
}