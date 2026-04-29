import { Link } from '@inertiajs/react';
import MainLayout from '../../Layouts/MainLayout';

export default function AccessDenied({ title, message }) {
    return (
        <MainLayout title={title || 'Acceso denegado'}>
            <section className="pt-28 pb-16 max-w-md mx-auto px-6">
                <div className="bg-white rounded-2xl shadow-sm border border-red-200 p-8 text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    
                    <h1 className="text-2xl font-bold text-red-600 mb-4">{title || 'Acceso denegado'}</h1>
                    
                    <p className="text-gray-600 mb-6">
                        {message || 'No tienes suficientes privilegios para acceder a esta sección.'}
                    </p>
                    
                    <Link 
                        href="/" 
                        className="inline-block bg-[#0F5132] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#0c3f27] hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
                    >
                        Volver al inicio
                    </Link>
                </div>
            </section>
        </MainLayout>
    );
}