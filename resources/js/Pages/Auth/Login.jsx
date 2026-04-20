import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import MainLayout from '../../Layouts/MainLayout';
import { useTranslation } from '../../hooks/useTranslation';

export default function Login() {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post('/login', {
            onFinish: () => reset('password'),
        });
    };

    return (
        <MainLayout title={t('auth', 'login')}>
            <section className="pt-28 pb-16 max-w-md mx-auto px-6">
                <div className="bg-white rounded-2xl shadow-sm border border-[#C9A227]/20 p-8">
                    <h1 className="text-2xl font-bold text-[#0F5132] mb-6 text-center">{t('auth', 'login')}</h1>
                    
                    <form onSubmit={submit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                {t('auth', 'email')}
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A227]/40 transition"
                                required
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                        </div>

                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                {t('auth', 'password')}
                            </label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A227]/40 transition"
                                required
                            />
                            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                        </div>

                        <div className="flex items-center justify-between mb-6">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="rounded border-gray-300 text-[#0F5132] shadow-sm focus:ring-[#0F5132]"
                                />
                                <span className="ml-2 text-sm text-gray-600">{t('auth', 'remember')}</span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-[#0F5132] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#0c3f27] hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 disabled:opacity-50"
                        >
                            {processing ? t('auth', 'processing_login') : t('auth', 'login')}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            {t('auth', 'no_account')}{' '}
                            <a href="/register" className="text-[#0F5132] font-semibold hover:underline">
                                {t('auth', 'register')}
                            </a>
                        </p>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}