import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import { useTranslation } from '../hooks/useTranslation';
import { useReveal } from '../hooks/useReveal';

export default function Contacto() {
    const { t, isRTL } = useTranslation();
    const sectionRef = useReveal();
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        message: '',
        type: 'web',
        phone: '',
    });

    const [contactType, setContactType] = useState('web');

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/contacto', {
            onSuccess: () => reset(),
        });
    };

    return (
        <MainLayout title={t('navbar', 'contact')}
            description="Ponte en contacto con la Mezquita Al‑Quds de El Vendrell. Envíanos un mensaje o llama al imán directamente."
            canonical="/contacto">
            {/* === HERO === */}
            <section className="relative pt-28 pb-16 sm:pb-20 lg:pb-24 overflow-hidden bg-gradient-to-b from-[#0F3B2E] to-[#09291e]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#C9A64615,transparent_60%)] pointer-events-none" />
                <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                    <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full border border-[#C9A646]/10 animate-float-spin" />
                    <div className="absolute -bottom-16 -left-16 w-48 h-48 rotate-45 border border-[#C9A646]/8 animate-float-spin-reverse" style={{ animationDuration: '18s' }} />
                </div>
                <div className="relative max-w-3xl mx-auto px-5 sm:px-8 text-center">
                    <div className="inline-block px-4 py-1.5 mb-4 bg-white/10 backdrop-blur-sm rounded-full border border-white/10 text-sm sm:text-base text-[#C9A646] font-medium tracking-wider uppercase">
                        {t('navbar', 'contact')}
                    </div>
                    <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.2] mb-4">
                        {t('contacto', 'title')}
                    </h1>
                    <p className="text-[#E8E8E8] text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
                        {t('contacto', 'subtitle')}
                    </p>
                </div>
            </section>

            {/* === CONTACT CONTENT === */}
            <section ref={sectionRef} className="reveal relative py-16 sm:py-20 lg:py-24 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/img/allahakbar.png')] bg-cover bg-center" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(200, 160, 60, 0.35), rgba(170, 130, 40, 0.3))' }} />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#C9A64612,transparent_60%)] pointer-events-none" />
                <div className="footer-pattern">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                        <defs>
                            <pattern id="girih-contacto" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                                <polygon points="60,0 90,30 90,70 60,100 30,70 30,30" fill="none" stroke="#C9A646" strokeWidth="0.5" opacity="0.1" />
                                <polygon points="60,20 80,40 80,60 60,80 40,60 40,40" fill="none" stroke="#C9A646" strokeWidth="0.3" opacity="0.06" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#girih-contacto)" />
                    </svg>
                </div>

                <div className="relative max-w-3xl mx-auto px-5 sm:px-8">
                    {/* Selector de tipo de contacto */}
                    <div className={`flex gap-3 sm:gap-4 mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <button
                            onClick={() => { setContactType('web'); setData('type', 'web'); }}
                            className={`px-5 sm:px-6 py-3 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 flex items-center gap-2 ${
                                contactType === 'web'
                                    ? 'bg-[#0F3B2E] text-white shadow-lg shadow-[#0F3B2E]/20'
                                    : 'bg-white/80 backdrop-blur-sm text-gray-500 border border-gray-200 hover:border-[#C9A646]/30 hover:text-[#0F3B2E]'
                            }`}
                        >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                            </svg>
                            {t('contacto', 'webForm')}
                        </button>
                        <button
                            onClick={() => { setContactType('phone'); setData('type', 'phone'); }}
                            className={`px-5 sm:px-6 py-3 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 flex items-center gap-2 ${
                                contactType === 'phone'
                                    ? 'bg-[#0F3B2E] text-white shadow-lg shadow-[#0F3B2E]/20'
                                    : 'bg-white/80 backdrop-blur-sm text-gray-500 border border-gray-200 hover:border-[#C9A646]/30 hover:text-[#0F3B2E]'
                            }`}
                        >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                            </svg>
                            {t('contacto', 'phoneForm')}
                        </button>
                    </div>

                    {contactType === 'phone' ? (
                        <div className="home-glass-card p-8 sm:p-10 text-center">
                            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#C9A646]/10 flex items-center justify-center">
                                <svg className="w-8 h-8 text-[#C9A646]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                                </svg>
                            </div>
                            <p className="text-gray-500 mb-4 text-base sm:text-lg">{t('contacto', 'contactImam')}</p>
                            <a href="tel:+34644428283" className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F3B2E] hover:text-[#C9A646] transition-colors duration-300">
                                +34 644 428 283
                            </a>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="home-glass-card p-6 sm:p-8 lg:p-10">
                            <div className="space-y-5">
                                <div className={`grid sm:grid-cols-2 gap-5 ${isRTL ? 'sm:direction-rtl' : ''}`}>
                                    <div>
                                        <label htmlFor="contact-name" className="block text-sm font-semibold text-gray-600 mb-1.5">{t('contacto', 'name')}</label>
                                        <input id="contact-name" type="text" name="name" value={data.name} onChange={e => setData('name', e.target.value)}
                                            placeholder={t('contacto', 'name')}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A646]/40 focus:border-[#C9A646]/60 transition-all bg-white/80" />
                                        {errors.name && <p className="text-red-500 text-xs mt-1.5">{errors.name}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="contact-email" className="block text-sm font-semibold text-gray-600 mb-1.5">{t('contacto', 'email')}</label>
                                        <input id="contact-email" type="email" name="email" value={data.email} onChange={e => setData('email', e.target.value)}
                                            placeholder={t('contacto', 'email')}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A646]/40 focus:border-[#C9A646]/60 transition-all bg-white/80" />
                                        {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="contact-message" className="block text-sm font-semibold text-gray-600 mb-1.5">{t('contacto', 'message')}</label>
                                    <textarea id="contact-message" name="message" value={data.message} onChange={e => setData('message', e.target.value)}
                                        placeholder={t('contacto', 'message')}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm h-36 focus:outline-none focus:ring-2 focus:ring-[#C9A646]/40 focus:border-[#C9A646]/60 transition-all bg-white/80 resize-none" />
                                    {errors.message && <p className="text-red-500 text-xs mt-1.5">{errors.message}</p>}
                                </div>
                                <div className={`flex ${isRTL ? 'justify-start' : 'justify-end'}`}>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0F3B2E] to-[#09291e] text-white px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-lg hover:shadow-[#0F3B2E]/30 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50"
                                    >
                                        {processing ? (
                                            <>
                                                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                </svg>
                                                {t('common', 'saving')}
                                            </>
                                        ) : (
                                            <>
                                                {t('contacto', 'send')}
                                                <svg className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12h12m0 0-3-3m3 3-3 3" />
                                                </svg>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            </section>
        </MainLayout>
    );
}
