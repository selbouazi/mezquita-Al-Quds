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
    noticias: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h10" /></svg>,
    notificaciones: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>,
    imam: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
    clases: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v16a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H6a2 2 0 00-2 2z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16" /></svg>,
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