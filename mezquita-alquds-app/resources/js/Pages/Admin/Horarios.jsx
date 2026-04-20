import AdminLayout from '../../Layouts/AdminLayout';
import { useTranslation } from '../../hooks/useTranslation';

export default function Horarios() {
    const { t } = useTranslation();

    return (
        <AdminLayout title={t('adminModules', 'schedules')}>
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-[#0F5132] mb-4">Módulo en construcción</h2>
                <p className="text-gray-600">Esta sección estará disponible pronto.</p>
            </div>
        </AdminLayout>
    );
}