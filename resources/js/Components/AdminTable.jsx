import { useTranslation } from '../hooks/useTranslation';

export default function AdminTable({
    columns,
    rows,
    renderRow,
    renderMobileCard,
    emptyMessage,
    emptyColspan,
    title,
}) {
    const { t } = useTranslation();
    const colspan = emptyColspan || columns?.length || 1;

    return (
        <>
            {title && (
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-1.5 h-6 rounded-full" style={{ background: 'linear-gradient(180deg, #C9A646, #0F3B2E)' }} />
                    <h3 className="text-base font-bold text-[#0F3B2E]">{title}</h3>
                </div>
            )}
            <div className="hidden md:block rounded-2xl overflow-hidden backdrop-blur-sm border shadow-sm"
                style={{ background: 'rgba(255,255,255,0.85)', borderColor: 'rgba(201,166,70,0.1)' }}>
                <div className="relative overflow-x-auto">
                    <table className="w-full">
                        {columns && (
                            <thead>
                                <tr className="relative" style={{ background: 'linear-gradient(135deg, #0F3B2E 0%, #1a5a43 100%)' }}>
                                    {columns.map((col, i) => (
                                        <th key={i}
                                            className={`px-5 py-4 text-xs font-semibold uppercase tracking-wider ${
                                                col.align === 'right' ? 'text-right' :
                                                col.align === 'center' ? 'text-center' :
                                                'text-left'
                                            }`}
                                            style={{ color: 'rgba(255,255,255,0.85)' }}
                                        >
                                            <span className="flex items-center gap-2">
                                                {col.label}
                                            </span>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                        )}
                        <tbody className="divide-y" style={{ borderColor: 'rgba(201,166,70,0.08)' }}>
                            {rows.length === 0 ? (
                                <tr>
                                    <td colSpan={colspan} className="px-6 py-10 text-center">
                                        <div className="flex flex-col items-center gap-2">
                                            <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                            </svg>
                                            <span className="text-gray-400 text-sm">{emptyMessage || t('common', 'noData')}</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                rows.map((row, i) => (
                                    <tr key={row.id || i}
                                        className="transition-all duration-150"
                                        style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.5)' : 'rgba(201,166,70,0.02)' }}
                                        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(201,166,70,0.06)'; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.background = i % 2 === 0 ? 'rgba(255,255,255,0.5)' : 'rgba(201,166,70,0.02)'; }}
                                    >
                                        {renderRow(row, i)}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {rows.length === 0 ? (
                <div className="md:hidden rounded-2xl p-10 text-center backdrop-blur-sm border shadow-sm"
                    style={{ background: 'rgba(255,255,255,0.85)', borderColor: 'rgba(201,166,70,0.1)' }}>
                    <div className="flex flex-col items-center gap-2">
                        <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <span className="text-gray-400 text-sm">{emptyMessage || t('common', 'noData')}</span>
                    </div>
                </div>
            ) : (
                <div className="md:hidden space-y-3">
                    {rows.map((row, i) => (
                        <div key={row.id || i} className="rounded-2xl overflow-hidden backdrop-blur-sm border shadow-sm transition-all duration-200 hover:shadow-md"
                            style={{ background: 'rgba(255,255,255,0.85)', borderColor: 'rgba(201,166,70,0.1)' }}>
                            <div className="p-4">
                                {renderMobileCard(row, i)}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
