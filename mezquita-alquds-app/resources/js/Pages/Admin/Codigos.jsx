import { useState } from 'react';
import { useForm, usePage, router } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import { useTranslation } from '../../hooks/useTranslation';

export default function Codigos({ codigo }) {
    const { t } = useTranslation();
    const { props } = usePage();
    const [modoEdicion, setModoEdicion] = useState(false);
    const [nuevoCodigo, setNuevoCodigo] = useState('');
    const [copiado, setCopiado] = useState(false);
    const [error, setError] = useState(null);

    const handleGenerar = () => {
        setError(null);
        
        router.post('/admin/codigos/generar', {
            _token: props.csrf_token,
        }, {
            onSuccess: () => {
                // Success - page will reload automatically
            },
            onError: (errors) => {
                setError('Error al generar código');
                console.error(errors);
            },
        });
    };

    const handleActualizar = (e) => {
        e.preventDefault();
        if (nuevoCodigo.length < 8) return;
        
        setError(null);
        
        router.post('/admin/codigos/actualizar', {
            _token: props.csrf_token,
            codigo: nuevoCodigo.toUpperCase(),
        }, {
            onSuccess: () => {
                setModoEdicion(false);
                setNuevoCodigo('');
            },
            onError: (errors) => {
                setError('Error al actualizar código');
                console.error(errors);
            },
        });
    };

    const handleCopiar = async () => {
        if (codigo?.codigo) {
            try {
                await navigator.clipboard.writeText(codigo.codigo);
                setCopiado(true);
                setTimeout(() => setCopiado(false), 2000);
            } catch (err) {
                console.error('Error al copiar:', err);
            }
        }
    };

    return (
        <AdminLayout title={t('activation', 'title')}>
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl shadow-sm border p-6 sm:p-8">
                    <h1 className="text-2xl font-bold text-[#0F5132] mb-2">{t('activation', 'title')}</h1>
                    <p className="text-gray-600 mb-8">{t('activation', 'subtitle')}</p>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                            {error}
                        </div>
                    )}

                    <div className="mb-8">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('activation', 'currentCode')}
                        </label>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1 flex items-center gap-2 px-4 sm:px-6 py-4 bg-[#F8F8F8] rounded-xl border border-[#C9A227]/20">
                                <p className="text-xl sm:text-3xl font-mono font-bold text-[#0F5132] tracking-widest text-center sm:text-left overflow-x-auto flex-1">
                                    {codigo?.codigo || '---'}
                                </p>
                                <button
                                    type="button"
                                    onClick={handleCopiar}
                                    className="shrink-0 p-2 text-gray-500 hover:text-[#0F5132] transition"
                                    title={t('activation', 'copy')}
                                >
                                    {copiado ? (
                                        <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            <button
                                type="button"
                                onClick={handleGenerar}
                                className="w-full sm:w-auto px-6 py-3 bg-[#C9A227] text-white rounded-xl font-medium hover:bg-[#9a7b1c] transition"
                            >
                                {t('activation', 'generate')}
                            </button>
                        </div>
                    </div>

                    <div className="border-t pt-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">{t('activation', 'custom')}</h2>
                        {modoEdicion ? (
                            <form onSubmit={handleActualizar} className="flex flex-col sm:flex-row gap-4">
                                <input
                                    type="text"
                                    value={nuevoCodigo}
                                    onChange={(e) => setNuevoCodigo(e.target.value.toUpperCase())}
                                    placeholder={t('activation', 'enterCode')}
                                    className="flex-1 px-4 py-3 border rounded-xl font-mono uppercase w-full"
                                    minLength={8}
                                    required
                                />
                                <button
                                    type="submit"
                                    disabled={nuevoCodigo.length < 8}
                                    className="w-full sm:w-auto px-6 py-3 bg-[#0F5132] text-white rounded-xl font-medium hover:bg-[#0c3f27] disabled:opacity-50 transition"
                                >
                                    {t('activation', 'save')}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => { setModoEdicion(false); setNuevoCodigo(''); }}
                                    className="w-full sm:w-auto px-6 py-3 border rounded-xl hover:bg-gray-50"
                                >
                                    {t('activation', 'cancel')}
                                </button>
                            </form>
                        ) : (
                            <button
                                type="button"
                                onClick={() => setModoEdicion(true)}
                                className="text-[#0F5132] hover:text-[#C9A227] font-medium"
                            >
                                → {t('activation', 'custom')}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}