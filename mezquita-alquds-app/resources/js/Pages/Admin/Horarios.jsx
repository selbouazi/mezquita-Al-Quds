import AdminLayout from '../../Layouts/AdminLayout';

export default function Horarios() {
    return (
        <AdminLayout title="Admin - Horarios">
            <h1 className="text-2xl font-bold text-[#0F5132] mb-6">Gestión de Horarios</h1>
            <div className="bg-white rounded-2xl shadow-sm border border-[#C9A227]/20 p-8 text-center">
                <p className="text-6xl mb-4">🚧</p>
                <p className="text-xl text-gray-600">Módulo en construcción</p>
                <p className="text-sm text-gray-500 mt-2">Aquí podrás gestionar los horarios de oración</p>
            </div>
        </AdminLayout>
    );
}