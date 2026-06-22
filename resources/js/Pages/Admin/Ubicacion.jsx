import { usePage, useForm } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import { useTranslation } from '../../hooks/useTranslation';
import FormField from '../../Components/FormField';
import ModuleToggle from '../../Components/ModuleToggle';

export default function Ubicacion() {
    const { t } = useTranslation();
    const { props } = usePage();
    const { ubicacion } = props;

    const formData = useForm({
        direccion: ubicacion?.direccion || '',
        latitud: ubicacion?.latitud || '',
        longitud: ubicacion?.longitud || '',
        telefono: ubicacion?.telefono || '',
        email: ubicacion?.email || '',
        whatsapp: ubicacion?.whatsapp || '',
    });

    const lat = formData.data.latitud || 41.230484;
    const lng = formData.data.longitud || 1.532144;
    const mapSrc = `https://www.google.com/maps?q=${lat},${lng}&output=embed`;

    const handleSubmit = () => {
        formData.post('/admin/ubicacion/guardar', {
            onSuccess: () => {},
        });
    };

    return (
        <AdminLayout title={t('adminModules', 'location')}>
            <div className="px-2 sm:px-0">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <p className="text-gray-600 text-sm hidden sm:block">{t('adminUbicacion', 'description')}</p>
                    <ModuleToggle module="ubicacion" />
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl shadow-sm border p-6">
                        <div className="space-y-4">
                            <FormField label={t('adminUbicacion', 'address')} name="direccion" required>
                                <textarea
                                    id="direccion"
                                    value={formData.data.direccion}
                                    onChange={(e) => formData.setData('direccion', e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg text-sm"
                                    rows="2"
                                    required
                                    placeholder="Carrer dels Carboners, 11, 43700 El Vendrell, Tarragona, España"
                                />
                            </FormField>

                            <div className="grid grid-cols-2 gap-4">
                                <FormField label={t('ubicacion', 'latitude')} name="latitud">
                                    <input
                                        type="text"
                                        id="latitud"
                                        value={formData.data.latitud}
                                        onChange={(e) => formData.setData('latitud', e.target.value)}
                                        className="w-full px-3 py-2 border rounded-lg text-sm"
                                        placeholder="41.230484"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">{t('adminUbicacion', 'coordHint')}</p>
                                </FormField>
                                <FormField label={t('ubicacion', 'longitude')} name="longitud">
                                    <input
                                        type="text"
                                        id="longitud"
                                        value={formData.data.longitud}
                                        onChange={(e) => formData.setData('longitud', e.target.value)}
                                        className="w-full px-3 py-2 border rounded-lg text-sm"
                                        placeholder="1.532144"
                                    />
                                </FormField>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <FormField label={t('ubicacion', 'phone')} name="telefono">
                                    <input
                                        type="text"
                                        id="telefono"
                                        value={formData.data.telefono}
                                        onChange={(e) => formData.setData('telefono', e.target.value)}
                                        className="w-full px-3 py-2 border rounded-lg text-sm"
                                        placeholder="+34 600 000 000"
                                    />
                                </FormField>
                                <FormField label={t('ubicacion', 'whatsapp')} name="whatsapp">
                                    <input
                                        type="text"
                                        id="whatsapp"
                                        value={formData.data.whatsapp}
                                        onChange={(e) => formData.setData('whatsapp', e.target.value)}
                                        className="w-full px-3 py-2 border rounded-lg text-sm"
                                        placeholder="+34 600 000 000"
                                    />
                                </FormField>
                            </div>

                            <FormField label={t('ubicacion', 'email')} name="email">
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.data.email}
                                    onChange={(e) => formData.setData('email', e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg text-sm"
                                    placeholder="info@mezquita-alquds.cat"
                                />
                            </FormField>
                        </div>

                        <div className="mt-6">
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={formData.processing}
                                className="w-full sm:w-auto px-6 py-2 bg-[#0F5132] text-white rounded-lg hover:bg-[#0c3f27] disabled:opacity-50 text-sm"
                            >
                                {formData.processing ? t('common', 'saving') : t('adminUbicacion', 'save')}
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border p-6">
                        <h3 className="font-medium text-gray-900 mb-3">{t('adminUbicacion', 'map')}</h3>
                        <div className="rounded-lg overflow-hidden border">
                            <iframe
                                title="Vista previa del mapa"
                                src={mapSrc}
                                width="100%"
                                height="350"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                            {t('adminUbicacion', 'coordDescription')}
                        </p>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
