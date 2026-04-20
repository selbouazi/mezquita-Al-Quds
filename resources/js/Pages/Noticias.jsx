import MainLayout from '../Layouts/MainLayout';
import { useTranslation } from '../hooks/useTranslation';

export default function Noticias() {
    const { t } = useTranslation();

    return (
        <MainLayout title={t('noticias', 'title')}>
            <section className="pt-28 pb-16 max-w-7xl mx-auto px-6">
                <h1 className="text-3xl font-bold text-[#0F5132] mb-4">{t('noticias', 'title')}</h1>
                <p className="text-gray-600 mb-8">{t('noticias', 'subtitle')}</p>
                <div className="p-6 bg-[#F5F5F5] border border-[#C9A227]/20 rounded-2xl text-gray-500 text-sm">
                    {t('noticias', 'wip')}
                </div>
            </section>
        </MainLayout>
    );
}
