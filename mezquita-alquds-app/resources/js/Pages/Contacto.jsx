import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import { useTranslation } from '../hooks/useTranslation';

export default function Contacto() {
    const { t } = useTranslation();
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
        <MainLayout title={t('navbar', 'contact')}>
            <section className="pt-28 pb-16 max-w-4xl mx-auto px-6">
                <h1 className="text-3xl font-bold text-[#0F5132] mb-4">{t('contacto', 'title')}</h1>
                <p className="text-gray-600 mb-8">{t('contacto', 'subtitle')}</p>
                
                {/* Selector de tipo de contacto */}
                <div className="flex gap-4 mb-6">
                    <button
                        onClick={() => { setContactType('web'); setData('type', 'web'); }}
                        className={`px-4 py-2 rounded-lg font-semibold transition ${contactType === 'web' ? 'bg-[#0F5132] text-white' : 'bg-white text-gray-600 border border-gray-200'}`}
                    >
                        Contacto Web
                    </button>
                    <button
                        onClick={() => { setContactType('phone'); setData('type', 'phone'); }}
                        className={`px-4 py-2 rounded-lg font-semibold transition ${contactType === 'phone' ? 'bg-[#0F5132] text-white' : 'bg-white text-gray-600 border border-gray-200'}`}
                    >
                        Contacto Teléfono
                    </button>
                </div>

                {contactType === 'phone' ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-[#C9A227]/20 p-6 sm:p-8">
                        <p className="text-gray-600 mb-4">Contacta directamente con el imán:</p>
                        <a href="tel:+34644428283" className="text-3xl font-bold text-[#0F5132]">
                            +34 644 428 283
                        </a>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-[#C9A227]/20 p-6 sm:p-8">
                        <div className="space-y-4">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <input type="text" name="name" value={data.name} onChange={e => setData('name', e.target.value)}
                                           placeholder={t('contacto', 'name')}
                                           className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A227]/40 transition" />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>
                                <div>
                                    <input type="email" name="email" value={data.email} onChange={e => setData('email', e.target.value)}
                                           placeholder={t('contacto', 'email')}
                                           className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A227]/40 transition" />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                </div>
                            </div>
                            <div>
                                <textarea name="message" value={data.message} onChange={e => setData('message', e.target.value)}
                                          placeholder={t('contacto', 'message')}
                                          className="w-full p-3 border border-gray-200 rounded-xl text-sm h-32 focus:outline-none focus:ring-2 focus:ring-[#C9A227]/40 transition resize-none" />
                                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                            </div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-[#0F5132] text-white px-7 py-3 rounded-full font-semibold hover:bg-[#0c3f27] hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 disabled:opacity-50"
                            >
                                {processing ? 'Enviando...' : t('contacto', 'send')}
                            </button>
                        </div>
                    </form>
                )}
            </section>
        </MainLayout>
    );
}