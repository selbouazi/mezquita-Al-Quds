import MainLayout from '../../Layouts/MainLayout';
import { useTranslation } from '../../hooks/useTranslation';

export default function Dashboard() {
    const { t } = useTranslation();

    return (
        <MainLayout title="Admin Dashboard">
            <section className="pt-28 pb-16 max-w-7xl mx-auto px-6">
                <h1 className="text-3xl font-bold text-[#0F5132] mb-8">Panel de Administración</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-[#C9A227]/20 p-6">
                        <h2 className="text-xl font-semibold text-[#0F5132] mb-4">Gestión de Horarios</h2>
                        <p className="text-gray-600 mb-4">Administrar horarios de oración</p>
                        <button className="bg-[#0F5132] text-white px-4 py-2 rounded-lg hover:bg-[#0c3f27] transition">
                            Ver Horarios
                        </button>
                    </div>
                    
                    <div className="bg-white rounded-2xl shadow-sm border border-[#C9A227]/20 p-6">
                        <h2 className="text-xl font-semibold text-[#0F5132] mb-4">Noticias</h2>
                        <p className="text-gray-600 mb-4">Publicar noticias y anuncios</p>
                        <button className="bg-[#0F5132] text-white px-4 py-2 rounded-lg hover:bg-[#0c3f27] transition">
                            Gestionar Noticias
                        </button>
                    </div>
                    
                    <div className="bg-white rounded-2xl shadow-sm border border-[#C9A227]/20 p-6">
                        <h2 className="text-xl font-semibold text-[#0F5132] mb-4">Configuración</h2>
                        <p className="text-gray-600 mb-4">Ajustes del sistema</p>
                        <button className="bg-[#0F5132] text-white px-4 py-2 rounded-lg hover:bg-[#0c3f27] transition">
                            Configurar
                        </button>
                    </div>
                </div>
                
                <div className="mt-10 bg-white rounded-2xl shadow-sm border border-[#C9A227]/20 p-6">
                    <h2 className="text-xl font-semibold text-[#0F5132] mb-4">Estadísticas</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-[#F8F8F8] rounded-lg">
                            <p className="text-2xl font-bold text-[#0F5132]">365</p>
                            <p className="text-sm text-gray-600">Horarios en BD</p>
                        </div>
                        <div className="text-center p-4 bg-[#F8F8F8] rounded-lg">
                            <p className="text-2xl font-bold text-[#0F5132]">3</p>
                            <p className="text-sm text-gray-600">Idiomas</p>
                        </div>
                        <div className="text-center p-4 bg-[#F8F8F8] rounded-lg">
                            <p className="text-2xl font-bold text-[#0F5132]">6</p>
                            <p className="text-sm text-gray-600">Oraciones/día</p>
                        </div>
                        <div className="text-center p-4 bg-[#F8F8F8] rounded-lg">
                            <p className="text-2xl font-bold text-[#0F5132]">✓</p>
                            <p className="text-sm text-gray-600">Sistema activo</p>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}