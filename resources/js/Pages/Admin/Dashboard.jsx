import { Link } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import { useTranslation } from '../../hooks/useTranslation';

const MODULES = [
    { key: 'horarios', label: 'schedules', desc: 'horariosDesc' },
    { key: 'donativos', label: 'donations', desc: 'donativosDesc' },
    { key: 'facturas', label: 'invoices', desc: 'facturasDesc' },
    { key: 'noticias', label: 'news', desc: 'noticiasDesc' },
    { key: 'notificaciones', label: 'notifications', desc: 'notificacionesDesc' },
    { key: 'imam', label: 'imam', desc: 'imamDesc' },
    { key: 'clases', label: 'classes', desc: 'clasesDesc' },
    { key: 'ubicacion', label: 'location', desc: 'ubicacionDesc' },
    { key: 'contactos', label: 'contacts', desc: 'contactosDesc' },
    { key: 'codigos', label: 'activation', desc: 'codigosDesc' },
];

const Icons = {
    horarios: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    donativos: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    facturas: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    noticias: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
    notificaciones: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>,
    imam: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
    clases: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13V6a2 2 0 112-2h6a2 2 0 012 2v5.5a2 2 0 01-2 2H12m0-8.5V6a2 2 0 00-2-2H7a2 2 0 00-2 2v8.5a2 2 0 002 2h5z" /></svg>,
    ubicacion: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    contactos: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    codigos: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9zm-8 5a2 2 0 100 4 2 2 0 000-4z" /></svg>,
};

export default function Dashboard() {
    const { t } = useTranslation();

    return (
        <AdminLayout title={t('adminDashboard', 'title')}>
            <h1 className="text-3xl font-bold text-[#0F5132] mb-2">{t('adminDashboard', 'title')}</h1>
            <p className="text-gray-600 mb-8">{t('adminDashboard', 'subtitle')}</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {MODULES.map(module => (
                    <Link key={module.key}
                          href={`/admin/${module.key}`}
                          className="bg-white rounded-xl shadow-sm border border-gray-200 p-4
                                     hover:shadow-lg hover:border-[#0F5132]/30 hover:-translate-y-1
                                     transition-all duration-200 group flex flex-col items-center text-center">
                        <div className="text-[#0F5132] mb-2">{Icons[module.key]}</div>
                        <h2 className="text-sm font-semibold text-gray-800 mb-1">
                            {t('adminModules', module.label)}
                        </h2>
                        <p className="text-xs text-gray-500">{t('adminDashboard', module.desc)}</p>
                    </Link>
                ))}
            </div>
        </AdminLayout>
    );
}