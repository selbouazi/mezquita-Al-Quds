import { usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '../../Layouts/AdminLayout';
import { useTranslation } from '../../hooks/useTranslation';
import ConfirmDialog from '../../Components/ConfirmDialog';

export default function Jumuah() {
    const { t } = useTranslation();
    const { props } = usePage();
    const { configs } = props;

    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [form, setForm] = useState({
        fecha_inicio: '',
        fecha_fin: '',
        hora_jumuah: '',
        khutbah_minutos: 15,
    });

    const openCreate = () => {
        setEditing(null);
        setForm({ fecha_inicio: '', fecha_fin: '', hora_jumuah: '', khutbah_minutos: 15 });
        setShowModal(true);
    };

    const openEdit = (cfg) => {
        setEditing(cfg);
        setForm({
            fecha_inicio: cfg.fecha_inicio,
            fecha_fin: cfg.fecha_fin,
            hora_jumuah: cfg.hora_jumuah,
            khutbah_minutos: cfg.khutbah_minutos,
        });
        setShowModal(true);
    };

    const handleSave = () => {
        if (editing) {
            router.put(`/admin/horarios/jumuah/${editing.id}`, form, {
                preserveScroll: true,
                onSuccess: () => setShowModal(false),
            });
        } else {
            router.post('/admin/horarios/jumuah', form, {
                preserveScroll: true,
                onSuccess: () => setShowModal(false),
            });
        }
    };

    const handleDelete = (cfg) => {
        setConfirmDelete(cfg);
    };

    const handleToggle = (cfg) => {
        router.post(`/admin/horarios/jumuah/${cfg.id}/toggle`, {}, { preserveScroll: true });
    };

    return (
        <AdminLayout title="Jumu'ah">
            <div className="px-2 sm:px-0">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <p className="text-gray-600 text-sm">Date ranges where Jumu'ah replaces Dhuhr on Fridays</p>
                    <button
                        onClick={openCreate}
                        className="px-4 py-2 bg-[#C9A646] text-white rounded-lg hover:bg-[#b89330] text-sm font-medium"
                    >
                        + Add range
                    </button>
                </div>

                {configs.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
                        <p className="text-gray-500 text-lg">No Jumu'ah configurations yet.</p>
                        <p className="text-gray-400 text-sm mt-1">Add a date range to set the Jumu'ah time for those months.</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b bg-gray-50 text-left">
                                    <th className="px-4 py-3 font-medium text-gray-700">Date range</th>
                                    <th className="px-4 py-3 font-medium text-gray-700">Jumu'ah time</th>
                                    <th className="px-4 py-3 font-medium text-gray-700">Khutbah</th>
                                    <th className="px-4 py-3 font-medium text-gray-700">Status</th>
                                    <th className="px-4 py-3 font-medium text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {configs.map((cfg) => (
                                    <tr key={cfg.id} className="border-b last:border-0 hover:bg-gray-50">
                                        <td className="px-4 py-3">
                                            <span className="font-medium">{cfg.fecha_inicio}</span>
                                            <span className="text-gray-400 mx-1">→</span>
                                            <span className="font-medium">{cfg.fecha_fin}</span>
                                        </td>
                                        <td className="px-4 py-3 font-mono">{cfg.hora_jumuah}</td>
                                        <td className="px-4 py-3">{cfg.khutbah_minutos} min</td>
                                        <td className="px-4 py-3">
                                            <span
                                                onClick={() => handleToggle(cfg)}
                                                className={`cursor-pointer inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    cfg.activo
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-gray-100 text-gray-500'
                                                }`}
                                            >
                                                {cfg.activo ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => openEdit(cfg)}
                                                    className="px-2 py-1 text-xs bg-[#0F5132] text-white rounded hover:bg-[#0c3f27]"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(cfg)}
                                                    className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowModal(false)}>
                        <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
                            <h2 className="text-lg font-bold text-[#0F5132] mb-4">
                                {editing ? 'Edit range' : 'New range'}
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Start date</label>
                                    <input
                                        type="date"
                                        value={form.fecha_inicio}
                                        onChange={(e) => setForm(p => ({ ...p, fecha_inicio: e.target.value }))}
                                        className="w-full px-3 py-2 border rounded-lg text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">End date</label>
                                    <input
                                        type="date"
                                        value={form.fecha_fin}
                                        onChange={(e) => setForm(p => ({ ...p, fecha_fin: e.target.value }))}
                                        className="w-full px-3 py-2 border rounded-lg text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Jumu'ah time</label>
                                    <input
                                        type="time"
                                        value={form.hora_jumuah}
                                        onChange={(e) => setForm(p => ({ ...p, hora_jumuah: e.target.value }))}
                                        className="w-full px-3 py-2 border rounded-lg text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Khutbah duration (minutes)</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="60"
                                        value={form.khutbah_minutos}
                                        onChange={(e) => setForm(p => ({ ...p, khutbah_minutos: parseInt(e.target.value) || 15 }))}
                                        className="w-full px-3 py-2 border rounded-lg text-sm"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50"
                                >
                                    {t('common', 'cancel')}
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="px-4 py-2 text-sm bg-[#C9A646] text-white rounded-lg hover:bg-[#b89330]"
                                >
                                    {t('common', 'save')}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {confirmDelete && (
                    <ConfirmDialog
                        variant="danger"
                        title={t('common', 'confirm')}
                        message={t('common', 'confirmMessage')}
                        confirmLabel={t('common', 'delete')}
                        cancelLabel={t('common', 'cancel')}
                        onConfirm={() => {
                            router.delete(`/admin/horarios/jumuah/${confirmDelete.id}`, { preserveScroll: true });
                            setConfirmDelete(null);
                        }}
                        onCancel={() => setConfirmDelete(null)}
                    />
                )}
            </div>
        </AdminLayout>
    );
}
