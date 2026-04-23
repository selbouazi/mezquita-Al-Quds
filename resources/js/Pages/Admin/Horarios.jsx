import { usePage, useForm } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import { useTranslation } from '../../hooks/useTranslation';

export default function Horarios() {
    const { t } = useTranslation();
    const { props } = usePage();
    const { tiempos } = props;

    const getPrayerLabel = (rezo) => {
        const labels = {
            'fajr': 'Fajr (Amanecer)',
            'sunrise': 'Salida del sol',
            'dhuhr': 'Dhuhr (Mediodía)',
            'asr': 'Asr (Tarde)',
            'maghrib': 'Maghrib (Atardecer)',
            'isha': 'Isha (Noche)',
        };
        return labels[rezo] || rezo;
    };

    const rezos = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'];

    return (
        <AdminLayout title={t('adminModules', 'schedules')}>
            <div className="px-2 sm:px-0">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-[#0F5132]">{t('adminModules', 'schedules')}</h1>
                        <p className="text-gray-600 text-sm hidden sm:block">Configurar tiempos de espera entre rezos</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
                    <h2 className="text-lg font-medium text-[#0F5132] mb-4">
                        Tiempos de espera por defecto
                    </h2>
                    <p className="text-sm text-gray-600 mb-6">
                        Estos tiempos se usan para calcular automáticamente las horas de los rezos en la página de horarios. 
                        Representan los minutos entre el inicio de un rezo y el siguiente.
                    </p>

                    <div className="space-y-4">
                        {rezos.map((rezo) => {
                            const tiempo = tiempos?.[rezo];
                            const minutos = tiempo?.minutos ?? 15;
                            
                            return (
                                <div key={rezo} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-gray-50 rounded-lg">
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-900">{getPrayerLabel(rezo)}</p>
                                        <p className="text-sm text-gray-500">
                                            {minutos} minutos actuales
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 w-full sm:w-auto">
                                        <input
                                            type="number"
                                            min="0"
                                            max="120"
                                            defaultValue={minutos}
                                            className="w-20 px-3 py-2 border rounded-lg text-sm"
                                            id={`minutos-${rezo}`}
                                        />
                                        <button
                                            onClick={() => {
                                                const input = document.getElementById(`minutos-${rezo}`);
                                                const formData = useForm({
                                                    minutos: input.value,
                                                });
                                                formData.post(`/admin/horarios/${rezo}`, {
                                                    onSuccess: () => window.location.reload(),
                                                });
                                            }}
                                            className="px-3 py-2 bg-[#0F5132] text-white rounded-lg hover:bg-[#0c3f27] text-sm"
                                        >
                                            Guardar
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <h3 className="font-medium text-blue-900 mb-2">Nota</h3>
                    <p className="text-sm text-blue-700">
                        Los horarios de oración se calculan automáticamente. Esta configuración solo afecta los tiempos de espera visualizados en la tabla de horarios.
                    </p>
                </div>
            </div>
        </AdminLayout>
    );
}