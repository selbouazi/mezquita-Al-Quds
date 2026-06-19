import { useState, useRef } from 'react';
import MainLayout from '../Layouts/MainLayout';
import { useTranslation } from '../hooks/useTranslation';
import { useReveal } from '../hooks/useReveal';

const FORMSPREE_URL = 'https://formspree.io/f/mpqevzpw';

export default function Contacto() {
    const { t, isRTL } = useTranslation();
    const sectionRef = useReveal();
    const formRef = useRef(null);

    const [contactType, setContactType] = useState('web');
    const [modal, setModal] = useState(null); // 'success' | 'error' | 'sending'
    const [errorMsg, setErrorMsg] = useState('');
    const [sending, setSending] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (sending) return;
        setSending(true);
        setModal('sending');

        const form = formRef.current;
        const data = new FormData(form);

        try {
            const res = await fetch(FORMSPREE_URL, {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' },
            });
            if (res.ok) {
                setModal('success');
                form.reset();
            } else {
                const json = await res.json().catch(() => ({}));
                setErrorMsg(json?.error || 'Error al enviar el mensaje.');
                setModal('error');
            }
        } catch {
            setErrorMsg('Error de conexión. Inténtalo de nuevo.');
            setModal('error');
        } finally {
            setSending(false);
        }
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
                            onClick={() => setContactType('web')}
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
                            onClick={() => setContactType('phone')}
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
                            <a href="https://wa.me/34644428283" target="_blank" rel="noopener noreferrer"
                               className="inline-flex items-center gap-3 text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F3B2E] hover:text-[#C9A646] transition-colors duration-300">
                                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                </svg>
                                +34 644 428 283
                            </a>
                        </div>
                    ) : (
                        <form ref={formRef} onSubmit={handleSubmit}
                              className="home-glass-card p-6 sm:p-8 lg:p-10">
                            <div className="space-y-5">
                                <div className={`grid sm:grid-cols-2 gap-5 ${isRTL ? 'sm:direction-rtl' : ''}`}>
                                    <div>
                                        <label htmlFor="contact-name" className="block text-sm font-semibold text-gray-600 mb-1.5">{t('contacto', 'name')}</label>
                                        <input id="contact-name" type="text" name="name" required
                                            placeholder={t('contacto', 'name')}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A646]/40 focus:border-[#C9A646]/60 transition-all bg-white/80" />
                                    </div>
                                    <div>
                                        <label htmlFor="contact-email" className="block text-sm font-semibold text-gray-600 mb-1.5">{t('contacto', 'email')}</label>
                                        <input id="contact-email" type="email" name="email" required
                                            placeholder={t('contacto', 'email')}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A646]/40 focus:border-[#C9A646]/60 transition-all bg-white/80" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="contact-message" className="block text-sm font-semibold text-gray-600 mb-1.5">{t('contacto', 'message')}</label>
                                    <textarea id="contact-message" name="message" required
                                        placeholder={t('contacto', 'message')}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm h-36 focus:outline-none focus:ring-2 focus:ring-[#C9A646]/40 focus:border-[#C9A646]/60 transition-all bg-white/80 resize-none" />
                                </div>
                                <div className={`flex ${isRTL ? 'justify-start' : 'justify-end'}`}>
                                    <button
                                        type="submit"
                                        disabled={sending}
                                        className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0F3B2E] to-[#09291e] text-white px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-lg hover:shadow-[#0F3B2E]/30 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50"
                                    >
                                        {sending ? (
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

            {/* MODAL */}
            {modal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4"
                     onClick={() => { if (modal !== 'sending') setModal(null); }}>
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
                    <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center"
                         onClick={e => e.stopPropagation()}>
                        {modal === 'sending' ? (
                            <>
                                <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#0F3B2E]/10 flex items-center justify-center">
                                    <svg className="w-8 h-8 text-[#0F3B2E] animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                </div>
                                <p className="text-lg font-semibold text-gray-800">Enviando mensaje...</p>
                            </>
                        ) : modal === 'success' ? (
                            <>
                                <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-green-100 flex items-center justify-center">
                                    <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                </div>
                                <p className="text-lg font-semibold text-gray-800 mb-2">¡Mensaje enviado!</p>
                                <p className="text-sm text-gray-500 mb-6">Gracias por contactarnos. Te responderemos pronto.</p>
                                <button onClick={() => setModal(null)}
                                        className="px-6 py-2.5 bg-[#0F3B2E] text-white rounded-xl font-semibold text-sm hover:bg-[#09291e] transition">
                                    Cerrar
                                </button>
                            </>
                        ) : (
                            <>
                                <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-red-100 flex items-center justify-center">
                                    <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                                <p className="text-lg font-semibold text-gray-800 mb-2">Error al enviar</p>
                                <p className="text-sm text-gray-500 mb-6">{errorMsg || 'Inténtalo de nuevo más tarde.'}</p>
                                <button onClick={() => setModal(null)}
                                        className="px-6 py-2.5 bg-[#0F3B2E] text-white rounded-xl font-semibold text-sm hover:bg-[#09291e] transition">
                                    Cerrar
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </MainLayout>
    );
}
