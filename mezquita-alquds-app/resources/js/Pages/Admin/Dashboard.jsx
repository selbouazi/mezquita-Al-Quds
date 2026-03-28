import { Link } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';

const MODULES = [
    { key: 'horarios', label: 'Horarios de rezo', icon: '📅', desc: 'Gestionar horarios de oración' },
    { key: 'donativos', label: 'Donativos', icon: '💰', desc: 'Administrar donativos' },
    { key: 'facturas', label: 'Facturas', icon: '📄', desc: 'Subir y gestionar facturas' },
    { key: 'noticias', label: 'Noticias', icon: '📰', desc: 'Publicar noticias' },
    { key: 'notificaciones', label: 'Notificaciones', icon: '🔔', desc: 'Enviar notificaciones' },
    { key: 'imam', label: 'Información del Imán', icon: '👤', desc: 'Biografía y datos' },
    { key: 'clases', label: 'Clases', icon: '📚', desc: 'Árabe y Corán' },
    { key: 'ubicacion', label: 'Ubicación', icon: '📍', desc: 'Dirección y mapa' },
    { key: 'contactos', label: 'Mensajes', icon: '📧', desc: 'Ver mensajes de contacto' },
    { key: 'codigos', label: 'Códigos de activación', icon: '🔑', desc: 'Gestionar registros' },
];

export default function Dashboard() {
    return (
        <AdminLayout title="Panel de Administración">
            <h1 className="text-3xl font-bold text-[#0F5132] mb-8">Panel de Administración</h1>
            <p className="text-gray-600 mb-8">Selecciona un módulo para administrar:</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {MODULES.map(module => (
                    <Link key={module.key}
                          href={`/admin/${module.key}`}
                          className="bg-white rounded-2xl shadow-sm border border-[#C9A227]/20 p-6
                                     hover:shadow-xl hover:border-[#C9A227]/40 hover:-translate-y-1
                                     transition-all duration-300 group">
                        <div className="text-4xl mb-4">{module.icon}</div>
                        <h2 className="text-lg font-semibold text-[#0F5132] mb-2 group-hover:text-[#0c3f27]">
                            {module.label}
                        </h2>
                        <p className="text-sm text-gray-500">{module.desc}</p>
                    </Link>
                ))}
            </div>

            <div className="mt-10 bg-white rounded-2xl shadow-sm border border-[#C9A227]/20 p-6">
                <h2 className="text-xl font-semibold text-[#0F5132] mb-4">Estado del sistema</h2>
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
        </AdminLayout>
    );
}