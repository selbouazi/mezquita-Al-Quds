import { Link } from '@inertiajs/react';
import MainLayout from '../../Layouts/MainLayout';
import { useTranslation } from '../../hooks/useTranslation';

export default function NotFound() {
    const { t } = useTranslation();
    const err = t('errors', '404');
    return (
        <MainLayout title={err.title} noindex simpleNav hideFooter>
            <section className="pt-28 pb-16 max-w-md mx-auto px-6 relative">
                <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <defs><pattern id="g404" width="40" height="40" patternUnits="userSpaceOnUse"><polygon points="20,0 40,20 20,40 0,20" fill="none" stroke="#0F3B2E" strokeWidth="0.5"/></pattern></defs>
                    <rect width="100%" height="100%" fill="url(#g404)"/>
                </svg>
                <div className="bg-white rounded-2xl shadow-sm border p-8 text-center relative">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl font-bold text-gray-500">404</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">{err.title}</h1>
                    <p className="text-gray-600 mb-6">{err.message}</p>
                    <Link href="/" className="inline-block bg-[#0F3B2E] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#0a2d22] transition">
                        {t('errors', 'goHome')}
                    </Link>
                </div>
            </section>
        </MainLayout>
    );
}
