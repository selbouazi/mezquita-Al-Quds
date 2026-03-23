import { useState } from 'react';
import MainLayout from '../Layouts/MainLayout';
import { useTranslation } from '../hooks/useTranslation';

export default function Contacto() {
    const { t } = useTranslation();
    const [form, setForm] = useState({ name: '', email: '', message: '' });

    const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    return (
        <MainLayout title={t('navbar', 'contact')}>
            <section className="pt-28 pb-16 max-w-4xl mx-auto px-6">
                <h1 className="text-3xl font-bold text-[#0F5132] mb-4">{t('contacto', 'title')}</h1>
                <p className="text-gray-600 mb-8">{t('contacto', 'subtitle')}</p>
                <div className="bg-white rounded-2xl shadow-sm border border-[#C9A227]/20 p-6 sm:p-8">
                    <div className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <input type="text" name="name" value={form.name} onChange={handleChange}
                                   placeholder={t('contacto', 'name')}
                                   className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A227]/40 transition" />
                            <input type="email" name="email" value={form.email} onChange={handleChange}
                                   placeholder={t('contacto', 'email')}
                                   className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A227]/40 transition" />
                        </div>
                        <textarea name="message" value={form.message} onChange={handleChange}
                                  placeholder={t('contacto', 'message')}
                                  className="w-full p-3 border border-gray-200 rounded-xl text-sm h-32 focus:outline-none focus:ring-2 focus:ring-[#C9A227]/40 transition resize-none" />
                        <button className="bg-[#0F5132] text-white px-7 py-3 rounded-full font-semibold hover:bg-[#0c3f27] hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
                            {t('contacto', 'send')}
                        </button>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
