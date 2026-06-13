import { useState, useEffect } from 'react';

const ALERT_STYLES = {
    success: {
        bg: 'bg-green-50 border-green-200',
        text: 'text-green-800',
        icon: (
            <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
    error: {
        bg: 'bg-red-50 border-red-200',
        text: 'text-red-800',
        icon: (
            <svg className="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
    warning: {
        bg: 'bg-yellow-50 border-yellow-200',
        text: 'text-yellow-800',
        icon: (
            <svg className="h-5 w-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
        ),
    },
    info: {
        bg: 'bg-blue-50 border-blue-200',
        text: 'text-blue-800',
        icon: (
            <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
};

export default function Alert({
    type = 'info',
    message,
    onClose,
    dismissible = true,
    autoDismiss = true,
    autoDismissTimeout = 5000,
}) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (!autoDismiss || !visible) return;
        const timer = setTimeout(() => {
            setVisible(false);
            onClose?.();
        }, autoDismissTimeout);
        return () => clearTimeout(timer);
    }, [autoDismiss, visible, autoDismissTimeout, onClose]);

    if (!visible || !message) return null;

    const style = ALERT_STYLES[type] || ALERT_STYLES.info;

    return (
        <div className={`fixed top-4 right-4 z-[60] max-w-sm w-full border rounded-xl shadow-lg ${style.bg} ${style.text} animate-slide-down`}>
            <div className="flex items-start gap-3 p-4">
                <div className="flex-shrink-0 mt-0.5">{style.icon}</div>
                <p className="text-sm font-medium flex-1">{message}</p>
                {dismissible && (
                    <button
                        type="button"
                        onClick={() => { setVisible(false); onClose?.(); }}
                        className="flex-shrink-0 p-1 rounded-lg hover:bg-black/5 transition"
                        aria-label="Close"
                    >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
}
