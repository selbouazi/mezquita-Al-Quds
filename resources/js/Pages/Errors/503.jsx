import { Link } from '@inertiajs/react';
import MainLayout from '../../Layouts/MainLayout';

export default function Maintenance() {
    return (
        <MainLayout title="Mantenimiento" noindex>
            <section className="pt-28 pb-16 max-w-md mx-auto px-6">
                <div className="bg-white rounded-2xl shadow-sm border border-[#C9A227]/30 p-8 text-center">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl font-bold text-yellow-600">503</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Mantenimiento</h1>
                    <p className="text-gray-600 mb-6">Estamos realizando tareas de mantenimiento. Vuelve pronto.</p>
                </div>
            </section>
        </MainLayout>
    );
}
