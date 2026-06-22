import { useState } from 'react';
import { router } from '@inertiajs/react';
import MainLayout from '../../Layouts/MainLayout';
import { useTranslation } from '../../hooks/useTranslation';

export default function VerifyEmail({ email }) {
    const { t } = useTranslation();
    const [code, setCode] = useState('');
    const [sending, setSending] = useState(false);
    const [resending, setResending] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (sending || code.length !== 6) return;
        setSending(true);
        router.post('/verify-email', { code }, {
            onFinish: () => setSending(false),
        });
    };

    const handleResend = () => {
        if (resending) return;
        setResending(true);
        router.post('/verify-email/resend', {}, {
            onFinish: () => setResending(false),
        });
    };

    const handleCodeChange = (e) => {
        const val = e.target.value.replace(/\D/g, '').slice(0, 6);
        setCode(val);
    };

    return (
        <MainLayout title="Verificar correo" noindex>
            <section className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden bg-gradient-to-b from-[#0F3B2E] to-[#09291e]">
                <div className="absolute inset-0 bg-[url('/img/Todas.png')] bg-cover bg-center opacity-[0.04] pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#C9A64612,transparent_60%)] pointer-events-none" />

                <div className="relative max-w-md mx-auto px-5 w-full">
                    <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 sm:p-10 text-center">
                        <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-gradient-to-br from-[#C9A646]/20 to-[#C9A646]/5 flex items-center justify-center ring-2 ring-[#C9A646]/20">
                            <svg className="w-8 h-8 text-[#C9A646]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                            </svg>
                        </div>

                        <h1 className="text-2xl font-bold text-[#0F3B2E] mb-2">
                            {t('auth', 'verifyTitle') || 'Verifica tu correo'}
                        </h1>
                        <p className="text-sm text-gray-500 mb-2">
                            {t('auth', 'verifySent') || 'Hemos enviado un código de 6 dígitos a:'}
                        </p>
                        <p className="text-base font-semibold text-[#0F3B2E] mb-6">{email}</p>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">
                                    {t('auth', 'verifyCode') || 'Código de verificación'}
                                </label>
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    value={code}
                                    onChange={handleCodeChange}
                                    placeholder="000000"
                                    maxLength={6}
                                    className="w-full text-center text-2xl sm:text-3xl font-bold tracking-[0.5em] px-4 py-4 border border-gray-200 rounded-xl text-[#0F3B2E] focus:outline-none focus:ring-2 focus:ring-[#C9A646]/40 focus:border-[#C9A646]/60 transition-all"
                                    autoFocus
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={sending || code.length !== 6}
                                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#0F3B2E] to-[#09291e] text-white px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-lg hover:shadow-[#0F3B2E]/30 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 min-h-[48px]"
                            >
                                {sending ? (
                                    <>
                                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        {t('common', 'saving') || 'Verificando...'}
                                    </>
                                ) : (
                                    t('auth', 'verifyBtn') || 'Verificar cuenta'
                                )}
                            </button>
                        </form>

                        <div className="mt-6 pt-5 border-t border-gray-100">
                            <p className="text-sm text-gray-500 mb-3">
                                {t('auth', 'notReceived') || '¿No has recibido el código?'}
                            </p>
                            <button
                                onClick={handleResend}
                                disabled={resending}
                                className="text-sm font-medium text-[#C9A646] hover:text-[#b38a2e] transition-colors disabled:opacity-50"
                            >
                                {resending ? 'Enviando...' : (t('auth', 'resend') || 'Reenviar código')}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
