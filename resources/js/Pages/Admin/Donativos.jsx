import { useState } from 'react';
import { usePage, router, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import { useTranslation } from '../../hooks/useTranslation';

export default function Donativos() {
    const { t } = useTranslation();
    const { props } = usePage();
    const { donativos, años, filtros, stats } = props;
    
    const [showModal, setShowModal] = useState(false);
    const [editando, setEditando] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const formData = useForm({
        nombre_arabe: '',
        nombre: '',
        cantidad: '',
        pagado: false,
        año: filtros?.año || new Date().getFullYear(),
        notas: '',
    });

    const openCreate = () => {
        formData.reset();
        formData.clearErrors();
        setEditando(null);
        setShowModal(true);
    };

    const openEdit = (donativo) => {
        formData.setData({
            nombre_arabe: donativo.nombre_arabe || '',
            nombre: donativo.nombre || '',
            cantidad: donativo.cantidad || '',
            pagado: donativo.pagado || false,
            año: donativo.año || filtros?.año || new Date().getFullYear(),
            notas: donativo.notas || '',
        });
        setEditando(donativo.id);
        setShowModal(true);
    };

    const handleSubmit = () => {
        if (editando) {
            formData.put(`/admin/donativos/${editando}`, {
                onSuccess: () => {
                    setShowModal(false);
                    formData.reset();
                },
            });
        } else {
            formData.post('/admin/donativos', {
                onSuccess: () => {
                    setShowModal(false);
                    formData.reset();
                },
            });
        }
    };

    const filteredDonativos = donativos.data.filter(d => 
        d.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (d.nombre_arabe && d.nombre_arabe.includes(searchTerm))
    );

    return (
        <AdminLayout title={t('adminModules', 'donations')}>
            <div className="px-2 sm:px-0">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-[#0F5132]">{t('adminModules', 'donations')}</h1>
                        <p className="text-gray-600 text-sm hidden sm:block">Gestionar donativos de la comunidad</p>
                    </div>
                    <button
                        onClick={openCreate}
                        className="w-full sm:w-auto px-4 py-2 bg-[#0F5132] text-white rounded-lg hover:bg-[#0c3f27] transition text-sm"
                    >
                        + {t('donativos', 'addNew')}
                    </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-xl shadow-sm border">
                        <p className="text-2xl font-bold text-[#0F5132]">{stats?.total || 0}</p>
                        <p className="text-sm text-gray-600">Total donativos</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border">
                        <p className="text-2xl font-bold text-green-600">{stats?.pagados || 0}</p>
                        <p className="text-sm text-gray-600">Pagados</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border">
                        <p className="text-2xl font-bold text-yellow-600">{stats?.pendientes || 0}</p>
                        <p className="text-sm text-gray-600">Pendientes</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border">
                        <p className="text-2xl font-bold text-[#C9A227]">{stats?.totalCantidad || 0} €</p>
                        <p className="text-sm text-gray-600">Total cobrado</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <select
                            value={filtros?.año}
                            onChange={(e) => router.get('/admin/donativos', { año: e.target.value })}
                            className="flex-1 px-3 py-2 border rounded-lg text-sm"
                        >
                            <option value="">Todos los años</option>
                            {años.map(año => (
                                <option key={año} value={año}>{año}</option>
                            ))}
                        </select>
                        <input
                            type="text"
                            placeholder="Buscar por nombre..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex-1 px-3 py-2 border rounded-lg text-sm"
                        />
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cantidad</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredDonativos.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                                            No hay donativos para mostrar
                                        </td>
                                    </tr>
                                ) : (
                                    filteredDonativos.map((donativo) => (
                                        <tr key={donativo.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3">
                                                <div>
                                                    <p className="font-medium text-gray-900">{donativo.nombre}</p>
                                                    {donativo.nombre_arabe && (
                                                        <p className="text-xs text-gray-500">{donativo.nombre_arabe}</p>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 font-semibold text-[#0F5132]">
                                                {parseFloat(donativo.cantidad).toFixed(2)} €
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                    donativo.pagado 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {donativo.pagado ? 'Pagado' : 'Pendiente'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-500">
                                                {new Date(donativo.created_at).toLocaleDateString('es')}
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link
                                                        href={`/admin/donativos/${donativo.id}/toggle`}
                                                        method="post"
                                                        className="px-2 py-1 text-xs rounded hover:bg-gray-100"
                                                    >
                                                        {donativo.pagado ? '⟲' : '✓'}
                                                    </Link>
                                                    <button
                                                        onClick={() => openEdit(donativo)}
                                                        className="px-2 py-1 text-xs text-blue-600 rounded hover:bg-blue-50"
                                                    >
                                                        Editar
                                                    </button>
                                                    <Link
                                                        href={`/admin/donativos/${donativo.id}`}
                                                        method="delete"
                                                        className="px-2 py-1 text-xs text-red-600 rounded hover:bg-red-50"
                                                    >
                                                        Eliminar
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {donativos.last_page > 1 && (
                        <div className="flex justify-center gap-2 py-4 border-t">
                            {donativos.prev_page_url && (
                                <Link href={donativos.prev_page_url} className="px-3 py-2 bg-white border rounded-lg hover:bg-gray-50 text-sm">
                                    ← Anterior
                                </Link>
                            )}
                            <span className="px-3 py-2 text-gray-600 text-sm">
                                {donativos.current_page} / {donativos.last_page}
                            </span>
                            {donativos.next_page_url && (
                                <Link href={donativos.next_page_url} className="px-3 py-2 bg-white border rounded-lg hover:bg-gray-50 text-sm">
                                    Siguiente →
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-4 sm:p-6 w-full max-w-lg">
                        <h2 className="text-lg sm:text-xl font-bold text-[#0F5132] mb-4">
                            {editando ? 'Editar Donativo' : t('donativos', 'addNew')}
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                                <input
                                    type="text"
                                    value={formData.data.nombre}
                                    onChange={(e) => formData.setData('nombre', e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg text-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre en árabe</label>
                                <input
                                    type="text"
                                    value={formData.data.nombre_arabe}
                                    onChange={(e) => formData.setData('nombre_arabe', e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg text-sm"
                                    dir="rtl"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Cantidad (€) *</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={formData.data.cantidad}
                                        onChange={(e) => formData.setData('cantidad', e.target.value)}
                                        className="w-full px-3 py-2 border rounded-lg text-sm"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Año *</label>
                                    <input
                                        type="number"
                                        value={formData.data.año}
                                        onChange={(e) => formData.setData('año', e.target.value)}
                                        className="w-full px-3 py-2 border rounded-lg text-sm"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="pagado"
                                    checked={formData.data.pagado}
                                    onChange={(e) => formData.setData('pagado', e.target.checked)}
                                    className="rounded"
                                />
                                <label htmlFor="pagado" className="text-sm text-gray-700">Pagado</label>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Notas</label>
                                <textarea
                                    value={formData.data.notas}
                                    onChange={(e) => formData.setData('notas', e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg text-sm"
                                    rows="2"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
                            <button
                                type="button"
                                onClick={() => setShowModal(false)}
                                className="w-full sm:w-auto px-4 py-2 border rounded-lg hover:bg-gray-50 text-sm"
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={formData.processing}
                                className="w-full sm:w-auto px-4 py-2 bg-[#0F5132] text-white rounded-lg hover:bg-[#0c3f27] disabled:opacity-50 text-sm"
                            >
                                {editando ? 'Actualizar' : 'Crear'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}