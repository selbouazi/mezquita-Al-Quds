import { usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';

export default function ModuleToggle({ module: moduleKey }) {
    const { t } = useTranslation();
    const { modules, csrf_token } = usePage().props;
    const [activo, setActivo] = useState(modules?.[moduleKey] ?? true);

    const handleToggle = () => {
        const newValue = !activo;
        setActivo(newValue);

        router.post(`/admin/modules/${moduleKey}/toggle`, {
            _token: csrf_token,
            activo: newValue,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <button
            onClick={handleToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${activo ? 'bg-[#0F5132]' : 'bg-gray-300'}`}
            title={activo ? t('admin', 'deactivate') : t('admin', 'activate')}
        >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${activo ? 'translate-x-6' : 'translate-x-1'}`} />
            <span className={`ml-3 text-xs font-medium ${activo ? 'text-[#0F5132]' : 'text-gray-500'}`}>
                {activo ? t('common', 'active') : t('common', 'inactive')}
            </span>
        </button>
    );
}
