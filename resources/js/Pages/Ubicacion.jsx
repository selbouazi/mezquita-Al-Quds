import MainLayout from '../Layouts/MainLayout';
import { useTranslation } from '../hooks/useTranslation';
import MapButton from '../Components/MapButton';

export default function Ubicacion({ ubicacion }) {
    const { t } = useTranslation();

    const lat = ubicacion?.latitud || 41.230484;
    const lng = ubicacion?.longitud || 1.532144;
    const address = ubicacion?.direccion || 'Carrer dels Carboners, 11, 43700 El Vendrell, Tarragona, España';
    const mapSrc = `https://www.google.com/maps?q=${lat},${lng}&output=embed`;

    return (
        <MainLayout title={t('ubicacion', 'title')}
            description="Cómo llegar a la Mezquita Al‑Quds en El Vendrell, Tarragona. Dirección, mapa y coordenadas."
            canonical="/ubicacion">
            <section className="pt-28 pb-16 max-w-7xl mx-auto px-6">
                <div className="text-center mb-10">
                    <h1 className="text-2xl sm:text-3xl font-bold text-[#0F5132] mb-4">{t('ubicacion', 'title')}</h1>
                    <p className="text-gray-600">{t('ubicacion', 'subtitle')}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-start">
                    <div className="rounded-xl overflow-hidden shadow-lg border">
                        <iframe
                            title="Ubicación Mezquita Al-Quds"
                            src={mapSrc}
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
                            <div>
                                <p className="text-sm text-gray-500">{t('ubicacion', 'address')}</p>
                                <p className="text-[#0F5132] font-medium">{address}</p>
                            </div>
                            {ubicacion?.telefono && (
                                <div>
                                    <p className="text-sm text-gray-500">{t('ubicacion', 'phone')}</p>
                                    <p className="text-[#0F5132] font-medium">{ubicacion.telefono}</p>
                                </div>
                            )}
                            {ubicacion?.email && (
                                <div>
                                    <p className="text-sm text-gray-500">{t('ubicacion', 'email')}</p>
                                    <p className="text-[#0F5132] font-medium">{ubicacion.email}</p>
                                </div>
                            )}
                        </div>

                        <MapButton lat={lat} lng={lng} />
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
