import { useState } from 'react';
import { usePage, router, Link } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import { useTranslation } from '../../hooks/useTranslation';

export default function Facturas() {
    const { t } = useTranslation();
    const { props } = usePage();
    const { facturas } = props;

    const [showModal, setShowModal] = useState(false);
    const [editando, setEditando] = useState(null);
    const [formData, setFormData] = useState({
        titulo: '',
        fecha: '',
        archivo_pdf: null,
        notas: '',
    });

    const openCreate = () => {
        setFormData({
            titulo: '',
            fecha: new Date().toISOString().split('T')[0],
            archivo_pdf: null,
            notas: '',
        });
        setEditando(null);
        setShowModal(true);
    };

    const openEdit = (factura) => {
        setFormData({
            titulo: factura.titulo || '',
            fecha: factura.fecha || '',
            archivo_pdf: null,
            notas: factura.notas || '',
        });
        setEditando(factura.id);
        setShowModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const form = e.target;
        const data = new FormData(form);
        
        if (editando) {
            router.post(`/admin/facturas/${editando}`, data, {
                forceFormData: true,
                onSuccess: () => setShowModal(false),
            });
        } else {
            router.post('/admin/facturas', data, {
                forceFormData: true,
                onSuccess: () => setShowModal(false),
            });
        }
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, archivo_pdf: e.target.files[0] });
    };

    return (
        <AdminLayout title={t('adminModules', 'invoices')}>
            <div className="px-2 sm:px-0">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-[#0F5132]">{t('adminModules', 'invoices')}</h1>
                        <p className="text-gray-600 text-sm hidden sm:block">Gestionar facturas y documentos PDF</p>
                    </div>
                    <button
                        onClick={openCreate}
                        className="w-full sm:w-auto px-4 py-2 bg-[#0F5132] text-white rounded-lg hover:bg-[#0c3f27] transition text-sm"
                    >
                        + Subir Factura
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Título</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Archivo</th>
                                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {facturas.data.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="px-4 py-8 text-center text-gray-500">
                                            No hay facturas para mostrar
                                        </td>
                                    </tr>
                                ) : (
                                    facturas.data.map((factura) => (
                                        <tr key={factura.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3">
                                                <p className="font-medium text-gray-900">{factura.titulo}</p>
                                                {factura.notas && (
                                                    <p className="text-xs text-gray-500 truncate max-w-xs">{factura.notas}</p>
                                                )}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-600">
                                                {new Date(factura.fecha).toLocaleDateString('es')}
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                {factura.archivo_pdf ? (
                                                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">
                                                        PDF ✓
                                                    </span>
                                                ) : (
                                                    <span className="text-gray-400 text-sm">Sin archivo</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex justify-end gap-2">
                                                    {factura.archivo_pdf && (
                                                        <a
                                                            href={`/admin/facturas/${factura.id}/download`}
                                                            className="px-2 py-1 text-xs text-blue-600 rounded hover:bg-blue-50"
                                                        >
                                                            Descargar
                                                        </a>
                                                    )}
                                                    <button
                                                        onClick={() => openEdit(factura)}
                                                        className="px-2 py-1 text-xs text-blue-600 rounded hover:bg-blue-50"
                                                    >
                                                        Editar
                                                    </button>
                                                    <Link
                                                        href={`/admin/facturas/${factura.id}`}
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

                    {facturas.last_page > 1 && (
                        <div className="flex justify-center gap-2 py-4 border-t">
                            {facturas.prev_page_url && (
                                <Link href={facturas.prev_page_url} className="px-3 py-2 bg-white border rounded-lg hover:bg-gray-50 text-sm">
                                    ← Anterior
                                </Link>
                            )}
                            <span className="px-3 py-2 text-gray-600 text-sm">
                                {facturas.current_page} / {facturas.last_page}
                            </span>
                            {facturas.next_page_url && (
                                <Link href={facturas.next_page_url} className="px-3 py-2 bg-white border rounded-lg hover:bg-gray-50 text-sm">
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
                            {editando ? 'Editar Factura' : 'Subir Factura'}
                        </h2>

                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
                                    <input
                                        type="text"
                                        name="titulo"
                                        value={formData.titulo}
                                        onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-lg text-sm"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha *</label>
                                    <input
                                        type="date"
                                        name="fecha"
                                        value={formData.fecha}
                                        onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-lg text-sm"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Archivo PDF {editando ? '(opcional)' : '*'}
                                    </label>
                                    <input
                                        type="file"
                                        name="archivo_pdf"
                                        accept=".pdf"
                                        onChange={handleFileChange}
                                        className="w-full px-3 py-2 border rounded-lg text-sm"
                                        required={!editando}
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Máximo 10MB</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Notas</label>
                                    <textarea
                                        name="notas"
                                        value={formData.notas}
                                        onChange={(e) => setFormData({ ...formData, notas: e.target.value })}
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
                                    type="submit"
                                    className="w-full sm:w-auto px-4 py-2 bg-[#0F5132] text-white rounded-lg hover:bg-[#0c3f27] text-sm"
                                >
                                    {editando ? 'Actualizar' : 'Subir'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}