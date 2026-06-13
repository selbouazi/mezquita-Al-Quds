import MainLayout from '../Layouts/MainLayout';
import { useTranslation } from '../hooks/useTranslation';

export default function ModuleDisabled() {
    const { t } = useTranslation();

    return (
        <MainLayout title={t('common', 'noData')} noindex>
            <section className="pt-28 pb-16 max-w-3xl mx-auto px-6 text-center">
                <div className="bg-white rounded-3xl shadow-lg border border-[#C9A227]/20 p-12">
                    <div className="text-6xl mb-6">🔧</div>
                    <h1 className="text-3xl font-bold text-[#0F5132] mb-4">
                        {t('modules', 'disabledTitle')}
                    </h1>
                    <p className="text-gray-600 text-lg">
                        {t('modules', 'disabledMessage')}
                    </p>
                </div>
            </section>
        </MainLayout>
    );
}
