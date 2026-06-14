import MainLayout from '../Layouts/MainLayout';
import { useTranslation } from '../hooks/useTranslation';

export default function ModuleDisabled() {
    const { t } = useTranslation();

    return (
        <MainLayout title={t('common', 'noData')} noindex>
            <section className="pt-28 pb-16 max-w-lg mx-auto px-6 relative">
                <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="gmd" width="50" height="50" patternUnits="userSpaceOnUse">
                            <polygon points="25,0 50,12.5 50,37.5 25,50 0,37.5 0,12.5" fill="none" stroke="#C9A646" strokeWidth="0.5"/>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#gmd)"/>
                </svg>
                <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-lg border border-[#C9A646]/30 p-12 text-center relative overflow-hidden">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#0F3B2E]/5 flex items-center justify-center">
                        <svg viewBox="0 0 48 48" className="w-10 h-10 text-[#C9A646]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M24 4L6 14v20l18 10 18-10V14L24 4z"/>
                            <path d="M24 4v44"/>
                            <path d="M6 14l18 10 18-10"/>
                            <path d="M24 24l18-10"/>
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-[#0F3B2E] mb-3">
                        {t('modules', 'disabledTitle')}
                    </h1>
                    <p className="text-gray-500 text-base leading-relaxed">
                        {t('modules', 'disabledMessage')}
                    </p>
                </div>
            </section>
        </MainLayout>
    );
}
