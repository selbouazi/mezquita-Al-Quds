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

    if (!open) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit?.(e);
    };

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="form-modal-title"
        >
            <div
                ref={modalRef}
                className={`bg-white rounded-2xl p-4 sm:p-6 w-full ${maxWidth} max-h-[90vh] overflow-y-auto`}
                onClick={(e) => e.stopPropagation()}
            >
                <h2 id="form-modal-title" className="text-lg sm:text-xl font-bold text-[#0F5132] mb-4">
                    {title}
                </h2>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        {children}
                    </div>

                    <div className="flex flex-col sm:flex-row justify-end gap-2 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={processing}
                            className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm disabled:opacity-50"
                        >
                            {t('common', 'cancel')}
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full sm:w-auto px-4 py-2 bg-[#0F5132] text-white rounded-lg hover:bg-[#0c3f27] disabled:opacity-50 text-sm"
                        >
                            {processing ? (
                                <span className="flex items-center justify-center gap-2">
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
    );
}
