import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import { useTranslation } from '../../hooks/useTranslation';

export default function Imam({ imam }) {
    const { t } = useTranslation();
    const [preview, setPreview] = useState(imam?.foto || null);

    const form = useForm({
        nombre: imam?.nombre || '',
        descripcion: imam?.descripcion || '',
        foto: null,
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            form.setData('foto', file);
            const reader = new FileReader();
            reader.onload = (e) => setPreview(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        form.post('/admin/imam/guardar', {
            onSuccess: () => {},
        });
    };

    return (
        <AdminLayout title={t('imam', 'title')}>
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl shadow-sm border p-6 sm:p-8">
                    <h1 className="text-2xl font-bold text-[#0F5132] mb-2">{t('imam', 'title')}</h1>
                    <p className="text-gray-600 mb-8">{t('imam', 'subtitle')}</p>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('imam', 'photo')}</label>
                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-[#F8F8F8] border-2 border-dashed border-[#C9A227]/30 flex items-center justify-center overflow-hidden shrink-0">
                                {preview ? (
                                    <img src={preview} alt="Imam" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-4xl sm:text-5xl">👤</span>
                                )}
                            </div>
                            <div className="text-center sm:text-left">
                                <label className="inline-flex items-center px-4 py-2 bg-white border border-[#C9A227] text-[#C9A227] rounded-lg cursor-pointer hover:bg-[#C9A227]/10 transition">
                                    <span>{t('imam', 'selectPhoto')}</span>
                                    <input
                                        type="file"
                                        name="foto"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('imam', 'name')}</label>
                        <input
                            type="text"
                            value={form.data.nombre}
                            onChange={(e) => form.setData('nombre', e.target.value)}
                            placeholder={t('imam', 'namePlaceholder')}
                            className="w-full px-4 py-3 border rounded-xl"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('imam', 'description')}</label>
                        <textarea
                            value={form.data.descripcion}
                            onChange={(e) => form.setData('descripcion', e.target.value)}
                            placeholder={t('imam', 'descriptionPlaceholder')}
                            className="w-full px-4 py-3 border rounded-xl"
                            rows={5}
                        />
                    </div>

                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={form.processing}
                        className="w-full sm:w-auto px-6 py-3 bg-[#0F5132] text-white rounded-xl font-medium hover:bg-[#0c3f27] transition disabled:opacity-50"
                    >
                        {t('imam', 'save')}
                    </button>
                </div>
            </div>
        </AdminLayout>
    );
}