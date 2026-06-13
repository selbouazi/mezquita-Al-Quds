import { Link } from '@inertiajs/react';
import { useTranslation } from '../hooks/useTranslation';

export default function Pagination({ meta, preserveScroll = true }) {
    const { t } = useTranslation();

    if (!meta || meta.last_page <= 1) return null;

    return (
        <div className="flex justify-center gap-2 mt-4 flex-wrap">
            {meta.prev_page_url && (
                <Link
                    href={meta.prev_page_url}
                    preserveScroll={preserveScroll}
                    className="px-4 py-3 bg-white border rounded-xl hover:bg-gray-50 text-sm min-h-[44px] flex items-center"
                >
                    ← {t('common', 'previous')}
                </Link>
            )}
            <span className="px-4 py-3 text-gray-600 text-sm flex items-center">
                {meta.current_page} / {meta.last_page}
            </span>
            {meta.next_page_url && (
                <Link
                    href={meta.next_page_url}
                    preserveScroll={preserveScroll}
                    className="px-4 py-3 bg-white border rounded-xl hover:bg-gray-50 text-sm min-h-[44px] flex items-center"
                >
                    {t('common', 'next')} →
                </Link>
            )}
        </div>
    );
}
