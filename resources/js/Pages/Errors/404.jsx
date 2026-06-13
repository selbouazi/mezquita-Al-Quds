import { Link } from '@inertiajs/react';
import MainLayout from '../../Layouts/MainLayout';

export default function NotFound() {
    return (
        <MainLayout title="Página no encontrada" noindex>
            <section className="pt-28 pb-16 max-w-md mx-auto px-6">
                <div className="bg-white rounded-2xl shadow-sm border p-8 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl font-bold text-gray-500">404</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Página no encontrada</h1>
                    <p className="text-gray-600 mb-6">La página que buscas no existe o ha sido movida.</p>
                    <Link href="/" className="inline-block bg-[#0F5132] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#0c3f27] transition">
                        Volver al inicio
                    </Link>
                </div>
            </section>
        </MainLayout>
    );
}
