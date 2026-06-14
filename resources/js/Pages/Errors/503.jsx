import MainLayout from '../../Layouts/MainLayout';
import { useTranslation } from '../../hooks/useTranslation';

export default function Maintenance() {
    const { t } = useTranslation();
    const err = t('errors', '503');
    return (
        <MainLayout title={err.title} noindex>
            <section className="pt-28 pb-16 max-w-md mx-auto px-6 relative">
                <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <defs><pattern id="g503" width="40" height="40" patternUnits="userSpaceOnUse"><polygon points="20,0 40,20 20,40 0,20" fill="none" stroke="#0F3B2E" strokeWidth="0.5"/></pattern></defs>
                    <rect width="100%" height="100%" fill="url(#g503)"/>
                </svg>
                <div className="bg-white rounded-2xl shadow-sm border border-[#C9A227]/30 p-8 text-center relative">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl font-bold text-yellow-600">503</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">{err.title}</h1>
                    <p className="text-gray-600 mb-6">{err.message}</p>
                </div>
            </section>
        </MainLayout>
    );
}
