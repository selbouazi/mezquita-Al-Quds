import { usePage, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '../../Layouts/AdminLayout';
import { useTranslation } from '../../hooks/useTranslation';

export default function Horarios() {
    const { t } = useTranslation();
    const { props } = usePage();
    const { tiempos } = props;

    const [values, setValues] = useState(() => {
        const initial = {};
        ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'].forEach(rezo => {
            initial[rezo] = tiempos?.[rezo]?.minutos ?? 15;
        });
        return initial;
    });

    const form = useForm({});

    const rezos = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'];

    const handleSave = (rezo) => {
        form.post(`/admin/horarios/${rezo}`, {
            data: { minutos: values[rezo] },
            onSuccess: () => window.location.reload(),
        });
    };

    return (
        <AdminLayout title={t('adminModules', 'schedules')}>
            <div className="px-2 sm:px-0">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-[#0F5132]">{t('adminModules', 'schedules')}</h1>
                        <p className="text-gray-600 text-sm hidden sm:block">{t('adminHorarios', 'waitTimes')}</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
                    <h2 className="text-lg font-medium text-[#0F5132] mb-4">
                        {t('adminHorarios', 'defaultTimes')}
                    </h2>
                    <p className="text-sm text-gray-600 mb-6">
                        {t('adminHorarios', 'waitTimesDesc')}
                    </p>

                    <div className="space-y-4">
                        {rezos.map((rezo) => (
                            <div key={rezo} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-gray-50 rounded-lg">
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900">{t('prayers', rezo.charAt(0).toUpperCase() + rezo.slice(1))}</p>
                                    <p className="text-sm text-gray-500">
                                        {values[rezo]} {t('adminHorarios', 'currentMinutes')}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 w-full sm:w-auto">
                                    <input
                                        type="number"
                                        min="0"
                                        max="120"
                                        value={values[rezo]}
                                        onChange={(e) => setValues(prev => ({ ...prev, [rezo]: parseInt(e.target.value) || 0 }))}
                                        className="w-20 px-3 py-2 border rounded-lg text-sm"
                                    />
                                    <button
                                        onClick={() => handleSave(rezo)}
                                        className="px-3 py-2 bg-[#0F5132] text-white rounded-lg hover:bg-[#0c3f27] text-sm"
                                    >
                                        {t('common', 'save')}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <h3 className="font-medium text-blue-900 mb-2">{t('adminHorarios', 'note')}</h3>
                    <p className="text-sm text-blue-700">
                        {t('adminHorarios', 'noteDesc')}
                    </p>
                </div>
            </div>
        </AdminLayout>
    );
}