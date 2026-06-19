import { Link } from '@inertiajs/react';
import MainLayout from '../../Layouts/MainLayout';
import { useTranslation } from '../../hooks/useTranslation';

export default function Forbidden() {
    const { t } = useTranslation();
    const err = t('errors', '403');
    return (
        <MainLayout title={err.title} noindex simpleNav hideFooter>
            <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <svg className="w-full h-full opacity-[0.04]" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <pattern id="g403bg" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                                <polygon points="40,4 76,40 40,76 4,40" fill="none" stroke="#DC2626" strokeWidth="0.8" />
                                <polygon points="40,12 68,40 40,68 12,40" fill="none" stroke="#C9A646" strokeWidth="0.4" />
                                <circle cx="40" cy="40" r="2" fill="#DC2626" opacity="0.2" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#g403bg)" />
                    </svg>
                    <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full border-[40px] border-[#DC2626]/5" />
                    <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full border-[30px] border-[#C9A646]/5" />
                </div>

                <div className="relative bg-white/75 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/40 p-10 sm:p-14 w-full max-w-lg text-center"
                    style={{ boxShadow: '0 25px 80px rgba(0,0,0,0.08), 0 0 0 1px rgba(220,38,38,0.08)' }}>
                    <div className="relative mx-auto mb-8 w-28 h-28 flex items-center justify-center">
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 112 112" fill="none">
                            <polygon points="56,2 110,56 56,110 2,56" stroke="#DC2626" strokeWidth="1.5" opacity="0.15" />
                            <polygon points="56,10 102,56 56,102 10,56" stroke="#C9A646" strokeWidth="0.8" opacity="0.2" />
                            <polygon points="56,18 94,56 56,94 18,56" stroke="#DC2626" strokeWidth="0.6" opacity="0.1" />
                        </svg>
                        <span className="relative text-5xl sm:text-6xl font-bold bg-gradient-to-br from-[#DC2626] to-[#991b1b] bg-clip-text text-transparent">403</span>
                    </div>

                    <svg className="mx-auto mb-6 w-12 h-12 text-red-400/50" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2">
                        <circle cx="24" cy="18" r="8" />
                        <path d="M8 44c0-8.837 7.163-16 16-16s16 7.163 16 16" />
                        <line x1="36" y1="4" x2="44" y2="12" strokeWidth="1.5" />
                        <line x1="44" y1="4" x2="36" y2="12" strokeWidth="1.5" />
                    </svg>

                    <h1 className="text-2xl sm:text-3xl font-bold text-[#DC2626] mb-3">{err.title}</h1>
                    <p className="text-gray-500 text-base sm:text-lg leading-relaxed mb-10 max-w-sm mx-auto">{err.message}</p>

                    <Link href="/"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0F3B2E] to-[#1a6b50] text-white px-8 py-4 rounded-2xl text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 min-h-[52px]">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        {t('errors', 'goHome')}
                    </Link>
                </div>
            </div>
        </MainLayout>
    );
}
