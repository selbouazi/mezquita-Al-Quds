import { Link } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import { useTranslation } from '../hooks/useTranslation';

export default function Imam({ imam }) {
    const { t } = useTranslation();

    return (
        <MainLayout title={t('navbar', 'imam')}>
            <section className="py-20 fade">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-[#0F5132] mb-4">
                            {t('navbar', 'imam')}
                        </h1>
                    </div>

                    {imam ? (
                        <div className="bg-white rounded-3xl shadow-lg border border-[#C9A227]/20 p-8 md:p-12">
                            <div className="flex flex-col md:flex-row items-center gap-8">
                                {imam.foto ? (
                                    <img 
                                        src={imam.foto} 
                                        alt={imam.nombre} 
                                        className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover shadow-lg border-4 border-[#C9A227]/30"
                                    />
                                ) : (
                                    <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-[#F8F8F8] flex items-center justify-center border-4 border-[#C9A227]/30 text-6xl">
                                        👤
                                    </div>
                                )}
                                
                                <div className="text-center md:text-right">
                                    {imam.nombre && (
                                        <h2 className="text-3xl font-bold text-[#0F5132] mb-4">
                                            {imam.nombre}
                                        </h2>
                                    )}
                                    {imam.descripcion && (
                                        <p className="text-gray-600 leading-relaxed text-lg">
                                            {imam.descripcion}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-white rounded-3xl shadow-md">
                            <p className="text-gray-500 text-lg">
                                {t('imam', 'noInfo') || 'No hay información del imam disponible.'}
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </MainLayout>
    );
}