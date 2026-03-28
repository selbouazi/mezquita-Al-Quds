import { Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';

const ADMIN_MODULES = [
    { key: 'dashboard', label: 'Inicio', icon: '🏠', href: '/admin' },
    { key: 'horarios', label: 'Horarios', icon: '📅', href: '/admin/horarios' },
    { key: 'donativos', label: 'Donativos', icon: '💰', href: '/admin/donativos' },
    { key: 'facturas', label: 'Facturas', icon: '📄', href: '/admin/facturas' },
    { key: 'noticias', label: 'Noticias', icon: '📰', href: '/admin/noticias' },
    { key: 'notificaciones', label: 'Notificaciones', icon: '🔔', href: '/admin/notificaciones' },
    { key: 'imam', label: 'Imán', icon: '👤', href: '/admin/imam' },
    { key: 'clases', label: 'Clases', icon: '📚', href: '/admin/clases' },
    { key: 'ubicacion', label: 'Ubicación', icon: '📍', href: '/admin/ubicacion' },
    { key: 'contactos', label: 'Contactos', icon: '📧', href: '/admin/contactos' },
    { key: 'codigos', label: 'Códigos', icon: '🔑', href: '/admin/codigos' },
];

export default function AdminLayout({ title, children }) {
    const { auth } = usePage().props;

    return (
        <div className="min-h-screen bg-[#F8F8F8]">
            {/* Header */}
            <header className="bg-[#0F5132] text-white py-4 px-6 shadow-md">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <img src="/img/mezquitaAlquds_logo2.png" className="h-10" alt="Logo" />
                        <div>
                            <h1 className="text-xl font-bold">Panel de Administración</h1>
                            <p className="text-sm text-white/80">Mezquita Al-Quds</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm">{auth?.user?.name}</span>
                        <Link href="/" className="text-sm text-white/80 hover:text-white">
                            Ver sitio
                        </Link>
                        <Link href="/logout" method="post" as="button"
                              className="text-sm bg-[#C9A227] text-[#0F5132] px-3 py-1 rounded hover:bg-[#b8921f]">
                            Salir
                        </Link>
                    </div>
                </div>
            </header>

            <div className="flex">
                {/* Sidebar */}
                <aside className="w-64 bg-white shadow-lg min-h-screen hidden md:block">
                    <nav className="p-4">
                        <ul className="space-y-2">
                            {ADMIN_MODULES.map(module => (
                                <li key={module.key}>
                                    <Link href={module.href}
                                          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-[#0F5132]/10 hover:text-[#0F5132] transition">
                                        <span className="text-xl">{module.icon}</span>
                                        <span className="font-medium">{module.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>

                {/* Contenido principal */}
                <main className="flex-1 p-6">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}