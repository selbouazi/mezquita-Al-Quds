import { useEffect, useRef } from 'react';
import { useTranslation } from '../hooks/useTranslation';

export default function FormModal({
    open,
    onClose,
    title,
    children,
    onSubmit,
    submitText,
    processing = false,
    maxWidth = 'max-w-lg',
}) {
    const { t } = useTranslation();
    const modalRef = useRef(null);

    useEffect(() => {
        if (!open) return;
        const handler = (e) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, [open, onClose]);

    useEffect(() => {
        if (!open) return;
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    if (!open) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit?.(e);
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="form-modal-title"
        >
            <div className="absolute inset-0 backdrop-blur-sm" style={{ background: 'rgba(15,59,46,0.3)' }} />

            <div
                ref={modalRef}
                className={`relative w-full ${maxWidth} max-h-[90vh] overflow-y-auto rounded-2xl backdrop-blur-xl border shadow-2xl transition-all duration-300 animate-in`}
                style={{
                    background: 'rgba(255,255,255,0.92)',
                    borderColor: 'rgba(201,166,70,0.15)',
                    boxShadow: '0 25px 80px rgba(0,0,0,0.15)',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Decorative top bar */}
                <div className="h-1 rounded-t-2xl" style={{ background: 'linear-gradient(90deg, #C9A646, #0F3B2E, #C9A646)' }} />

                {/* Decorative geometric pattern */}
                <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none">
                    <svg width="120" height="120" viewBox="0 0 120 120">
                        <polygon points="60,5 115,60 60,115 5,60" fill="none" stroke="#0F3B2E" strokeWidth="1" />
                        <polygon points="60,20 100,60 60,100 20,60" fill="none" stroke="#0F3B2E" strokeWidth="0.5" />
                    </svg>
                </div>

                <div className="p-5 sm:p-7">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-8 rounded-full" style={{ background: 'linear-gradient(180deg, #C9A646, #0F3B2E)' }} />
                            <h2 id="form-modal-title" className="text-lg sm:text-xl font-bold text-[#0F3B2E]">
                                {title}
                            </h2>
                        </div>
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={processing}
                            className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition disabled:opacity-50"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="space-y-5">
                            {children}
                        </div>

                        <div className="flex flex-col sm:flex-row justify-end gap-2 mt-7">
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={processing}
                                className="w-full sm:w-auto min-h-[48px] px-5 py-2.5 border rounded-xl text-sm font-medium transition-all duration-200 disabled:opacity-50"
                                style={{ borderColor: 'rgba(15,59,46,0.15)', color: '#4a4a4a', background: 'rgba(255,255,255,0.5)' }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = '#f5f0e6'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.5)'; }}
                            >
                                {t('common', 'cancel')}
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full sm:w-auto min-h-[48px] px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 disabled:opacity-50 shadow-sm hover:shadow-md active:scale-[0.98]"
                                style={{ background: 'linear-gradient(135deg, #0F3B2E, #1a6b50)' }}
                            >
                                {processing ? (
                                    <span className="flex items-center justify-center gap-2 min-w-[100px]">
                                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        {t('common', 'processing')}
                                    </span>
                                ) : (
                                    submitText || t('common', 'save')
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
