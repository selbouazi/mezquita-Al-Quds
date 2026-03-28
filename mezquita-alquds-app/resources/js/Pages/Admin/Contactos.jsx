import AdminLayout from '../../Layouts/AdminLayout';

export default function Contactos() {
    return (
        <AdminLayout title="Admin - Mensajes de Contacto">
            <h1 className="text-2xl font-bold text-[#0F5132] mb-6">Mensajes de Contacto</h1>
            <div className="bg-white rounded-2xl shadow-sm border border-[#C9A227]/20 p-8 text-center">
                <p className="text-6xl mb-4">🚧</p>
                <p className="text-xl text-gray-600">Módulo en construcción</p>
                <p className="text-sm text-gray-500 mt-2">Aquí podrás ver los mensajes recibidos</p>
            </div>
        </AdminLayout>
    );
}