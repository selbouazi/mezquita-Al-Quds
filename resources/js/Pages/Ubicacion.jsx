import MainLayout from '../Layouts/MainLayout';
import { useTranslation } from '../hooks/useTranslation';

export default function Ubicacion() {
    const { t } = useTranslation();

    return (
        <MainLayout title={t('ubicacion', 'title')}>
            <section className="pt-28 pb-16 max-w-7xl mx-auto px-6 text-center">
                <h1 className="text-3xl font-bold text-[#0F5132] mb-4">{t('ubicacion', 'title')}</h1>
                <p className="text-gray-600 mb-8">{t('ubicacion', 'subtitle')}</p>
                <a href="https://maps.google.com"
                   className="inline-block bg-[#0F5132] text-white px-8 py-3 rounded-full font-semibold
                              hover:bg-[#0c3f27] hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
                    {t('ubicacion', 'btn')}
                </a>
            </section>
        </MainLayout>
    );
}
