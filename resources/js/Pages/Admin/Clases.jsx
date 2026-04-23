import { useState } from 'react';
import { usePage, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import { useTranslation } from '../../hooks/useTranslation';

export default function Clases() {
    const { t } = useTranslation();
    const { props } = usePage();
    const { clases } = props;

    const [showModal, setShowModal] = useState(false);
    const [editando, setEditando] = useState(null);

    const formData = useForm({
        titulo: '',
        descripcion: '',
        horarios: '',
        nivel: '',
        profesor: '',
        requisitos: '',
        activo: true,
    });

    const openCreate = () => {
        formData.reset();
        formData.clearErrors();
        setEditando(null);
        setShowModal(true);
    };

    const openEdit = (clase) => {
        formData.setData({
            titulo: clase.titulo || '',
            descripcion: clase.descripcion || '',
            horarios: clase.horarios || '',
            nivel: clase.nivel || '',
            profesor: clase.profesor || '',
            requisitos: clase.requisitos || '',
            activo: clase.activo ?? true,
        });
        setEditando(clase.id);
        setShowModal(true);
    };

    const handleSubmit = () => {
        if (editando) {
            formData.put(`/admin/clases/${editando}`, {
                onSuccess: () => {
                    setShowModal(false);
                    formData.reset();
                },
            });
        } else {
            formData.post('/admin/clases', {
                onSuccess: () => {
                    setShowModal(false);
                    formData.reset();
                },
            });
        }
    };

    const activeClases = clases.filter(c => c.activo);
    const inactiveClases = clases.filter(c => !c.activo);

    return (
        <AdminLayout title={t('adminModules', 'classes')}>
            <div className="px-2 sm:px-0">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-[#0F5132]">{t('adminModules', 'classes')}</h1>
                        <p className="text-gray-600 text-sm hidden sm:block">Gestionar clases y cursos</p>
                    </div>
                    <button
                        onClick={openCreate}
                        className="w-full sm:w-auto px-4 py-2 bg-[#0F5132] text-white rounded-lg hover:bg-[#0c3f27] transition text-sm"
                    >
                        + {t('clases', 'addNew')}
                    </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-xl shadow-sm border">
                        <p className="text-2xl font-bold text-[#0F5132]">{clases.length}</p>
                        <p className="text-sm text-gray-600">Total clases</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border">
                        <p className="text-2xl font-bold text-green-600">{activeClases.length}</p>
                        <p className="text-sm text-gray-600">Activas</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border col-span-2 md:col-span-1">
                        <p className="text-2xl font-bold text-gray-400">{inactiveClases.length}</p>
                        <p className="text-sm text-gray-600">Inactivas</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Título</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nivel</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Horario</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Profesor</th>
                                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Estado</th>
                                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {clases.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                                            No hay clases para mostrar
                                        </td>
                                    </tr>
                                ) : (
                                    clases.map((clase) => (
                                        <tr key={clase.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3">
                                                <p className="font-medium text-gray-900">{clase.titulo}</p>
                                                {clase.descripcion && (
                                                    <p className="text-xs text-gray-500 line-clamp-1">{clase.descripcion}</p>
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                {clase.nivel ? (
                                                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                                        {clase.nivel}
                                                    </span>
                                                ) : (
                                                    <span className="text-gray-400">-</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-600">
                                                {clase.horarios || '-'}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-600">
                                                {clase.profesor || '-'}
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                    clase.activo 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-gray-100 text-gray-600'
                                                }`}>
                                                    {clase.activo ? 'Activa' : 'Inactiva'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => openEdit(clase)}
                                                        className="px-2 py-1 text-xs text-blue-600 rounded hover:bg-blue-50"
                                                    >
                                                        Editar
                                                    </button>
                                                    <Link
                                                        href={`/admin/clases/${clase.id}`}
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
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-4 sm:p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <h2 className="text-lg sm:text-xl font-bold text-[#0F5132] mb-4">
                            {editando ? 'Editar Clase' : t('clases', 'addNew')}
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
                                <input
                                    type="text"
                                    value={formData.data.titulo}
                                    onChange={(e) => formData.setData('titulo', e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg text-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                                <textarea
                                    value={formData.data.descripcion}
                                    onChange={(e) => formData.setData('descripcion', e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg text-sm"
                                    rows="3"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nivel</label>
                                    <input
                                        type="text"
                                        value={formData.data.nivel}
                                        onChange={(e) => formData.setData('nivel', e.target.value)}
                                        className="w-full px-3 py-2 border rounded-lg text-sm"
                                        placeholder="Ej: Principiante"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Profesor</label>
                                    <input
                                        type="text"
                                        value={formData.data.profesor}
                                        onChange={(e) => formData.setData('profesor', e.target.value)}
                                        className="w-full px-3 py-2 border rounded-lg text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Horario</label>
                                <input
                                    type="text"
                                    value={formData.data.horarios}
                                    onChange={(e) => formData.setData('horarios', e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg text-sm"
                                    placeholder="Ej: Lunes y Miércoles 18:00"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Requisitos</label>
                                <textarea
                                    value={formData.data.requisitos}
                                    onChange={(e) => formData.setData('requisitos', e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg text-sm"
                                    rows="2"
                                    placeholder=" conocimientos previos..."
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="activo"
                                    checked={formData.data.activo}
                                    onChange={(e) => formData.setData('activo', e.target.checked)}
                                    className="rounded"
                                />
                                <label htmlFor="activo" className="text-sm text-gray-700">Clase activa</label>
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