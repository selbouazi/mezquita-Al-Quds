import { useEffect, useRef } from 'react';
import { useTranslation } from '../hooks/useTranslation';

export default function ConfirmDialog({
    open,
    onClose,
    onConfirm,
    title,
    message,
    confirmText,
    cancelText,
    variant = 'danger',
    processing = false,
}) {
    const { t } = useTranslation();
    const confirmBtnRef = useRef(null);

    useEffect(() => {
        if (!open) return;
        const handler = (e) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, [open, onClose]);

    useEffect(() => {
        if (open && confirmBtnRef.current) {
            confirmBtnRef.current.focus();
        }
    }, [open]);

    if (!open) return null;

    const confirmStyles = {
        danger: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
        warning: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500',
        primary: 'bg-[#0F5132] hover:bg-[#0c3f27] focus:ring-[#0F5132]',
    };

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-dialog-title"
            aria-describedby="confirm-dialog-message"
        >
            <div
                className="bg-white rounded-2xl p-6 w-full max-w-sm mx-auto shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                        <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <h3 id="confirm-dialog-title" className="text-lg font-semibold text-gray-900 mb-2">
                        {title || t('common', 'confirm')}
                    </h3>
                    <p id="confirm-dialog-message" className="text-sm text-gray-500 mb-6">
                        {message || t('common', 'confirmMessage')}
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={processing}
                        className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                    >
                        {cancelText || t('common', 'cancel')}
                    </button>
                    <button
                        ref={confirmBtnRef}
                        type="button"
                        onClick={onConfirm}
                        disabled={processing}
                        className={`w-full sm:w-auto px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 ${confirmStyles[variant] || confirmStyles.danger}`}
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
                            confirmText || t('common', 'delete')
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
