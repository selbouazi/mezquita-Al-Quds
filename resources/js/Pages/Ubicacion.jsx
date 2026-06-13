import MainLayout from '../Layouts/MainLayout';
import { useTranslation } from '../hooks/useTranslation';
import MapButton from '../Components/MapButton';

export default function Ubicacion({ ubicacion }) {
    const { t } = useTranslation();

    const lat = ubicacion?.latitud || 41.230468;
    const lng = ubicacion?.longitud || 1.532069;
    const mapSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwMTMnNDkuNyJOIDHCsDMxJzU1LjUiRQ!5e0!3m2!1ses!2ses!4v1`;

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
                            height="400"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
                            {ubicacion?.direccion && (
                                <div>
                                    <p className="text-sm text-gray-500">{t('ubicacion', 'address')}</p>
                                    <p className="text-[#0F5132] font-medium">{ubicacion.direccion}</p>
                                </div>
                            )}
                            <div>
                                <p className="text-sm text-gray-500">{t('ubicacion', 'latitude')}</p>
                                <p className="text-[#0F5132] font-medium">{lat}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">{t('ubicacion', 'longitude')}</p>
                                <p className="text-[#0F5132] font-medium">{lng}</p>
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
