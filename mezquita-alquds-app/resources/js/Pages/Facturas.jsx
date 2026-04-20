import MainLayout from '../Layouts/MainLayout';
import { useTranslation } from '../hooks/useTranslation';

export default function Facturas() {
    const { t } = useTranslation();

    return (
        <MainLayout title="Facturas">
            <section className="py-20 fade">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-[#0F5132] mb-4">Facturas</h1>
                    </div>

                    <div className="bg-white rounded-3xl shadow-lg border border-[#C9A227]/20 p-8 md:p-12">
                        <p className="text-gray-600 text-center text-lg">
                            No hay facturas disponibles actualmente.
                        </p>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}