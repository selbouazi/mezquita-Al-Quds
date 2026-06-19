import MainLayout from '../../Layouts/MainLayout';
import { useTranslation } from '../../hooks/useTranslation';

export default function Maintenance() {
    const { t } = useTranslation();
    const err = t('errors', '503');
    return (
        <MainLayout title={err.title} noindex simpleNav hideFooter>
            <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <svg className="w-full h-full opacity-[0.04]" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <pattern id="g503bg" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                                <polygon points="40,4 76,40 40,76 4,40" fill="none" stroke="#C9A646" strokeWidth="0.8" />
                                <polygon points="40,12 68,40 40,68 12,40" fill="none" stroke="#0F3B2E" strokeWidth="0.4" />
                                <circle cx="40" cy="40" r="2" fill="#C9A646" opacity="0.3" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#g503bg)" />
                    </svg>
                    <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full border-[35px] border-[#C9A646]/8" />
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full border-[40px] border-[#0F3B2E]/5" />
                </div>

                <div className="relative bg-white/75 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/40 p-10 sm:p-14 w-full max-w-lg text-center"
                    style={{ boxShadow: '0 25px 80px rgba(0,0,0,0.08), 0 0 0 1px rgba(201,166,70,0.08)' }}>
                    <div className="relative mx-auto mb-8 w-28 h-28 flex items-center justify-center">
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 112 112" fill="none">
                            <polygon points="56,2 110,56 56,110 2,56" stroke="#C9A646" strokeWidth="1.5" opacity="0.2" />
                            <polygon points="56,10 102,56 56,102 10,56" stroke="#0F3B2E" strokeWidth="0.8" opacity="0.15" />
                            <polygon points="56,18 94,56 56,94 18,56" stroke="#C9A646" strokeWidth="0.6" opacity="0.1" />
                        </svg>
                        <span className="relative text-5xl sm:text-6xl font-bold bg-gradient-to-br from-[#C9A646] to-[#a3872e] bg-clip-text text-transparent">503</span>
                    </div>

                    <svg className="mx-auto mb-6 w-12 h-12 text-[#C9A646]/50" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1">
                        <circle cx="24" cy="24" r="20" />
                        <path d="M24 16v8l4 4" strokeWidth="1.5" />
                        <polygon points="24,4 28,12 20,12" opacity="0.4" />
                        <line x1="4" y1="24" x2="12" y2="24" strokeWidth="0.8" opacity="0.4" />
                        <line x1="36" y1="24" x2="44" y2="24" strokeWidth="0.8" opacity="0.4" />
                    </svg>

                    <h1 className="text-2xl sm:text-3xl font-bold text-[#0F3B2E] mb-3">{err.title}</h1>
                    <p className="text-gray-500 text-base sm:text-lg leading-relaxed mb-6 max-w-sm mx-auto">{err.message}</p>

                    <div className="flex items-center justify-center gap-3 mt-2">
                        <div className="w-2 h-2 rounded-full bg-[#C9A646] animate-pulse" />
                        <span className="text-sm text-gray-400 font-medium tracking-wide">{t('errors', 'maintenanceMsg')}</span>
                        <div className="w-2 h-2 rounded-full bg-[#C9A646] animate-pulse" style={{ animationDelay: '0.3s' }} />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
