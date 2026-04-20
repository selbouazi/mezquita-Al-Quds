import { useState, useRef, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { useTranslation } from '../hooks/useTranslation';

export default function NotificationBell({ notifications = [] }) {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    const unreadCount = notifications.filter(n => !n.leida).length;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('es', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setOpen(!open)}
                className="relative p-2 text-gray-600 hover:text-[#C9A227] transition"
                aria-label={t('notifications', 'title')}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                    />
                </svg>
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {open && (
                <div className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-[calc(100vw-2rem)] sm:w-80 bg-white border border-[#C9A227]/20 rounded-xl shadow-lg overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-[#C9A227]/20 bg-[#F8F8F8]">
                        <h3 className="font-semibold text-[#0F5132]">
                            {t('notifications', 'title')}
                        </h3>
                    </div>

                    <div className="max-h-80 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="px-4 py-6 text-center text-gray-500">
                                {t('notifications', 'noNotifications')}
                            </div>
                        ) : (
                            notifications.slice(0, 5).map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition ${
                                        !notification.leida ? 'bg-[#C9A227]/5' : ''
                                    }`}
                                >
                                    <p className="font-medium text-sm text-gray-800 line-clamp-2">
                                        {notification.titulo}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {formatDate(notification.fecha_publicacion)}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>

                    {notifications.length > 0 && (
                        <div className="px-4 py-3 bg-[#F8F8F8] border-t border-[#C9A227]/20">
                            <Link
                                href="/notifications"
                                onClick={() => setOpen(false)}
                                className="block text-center text-sm font-medium text-[#0F5132] hover:text-[#C9A227] transition"
                            >
                                {t('notifications', 'seeAll')}
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
