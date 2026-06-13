import { useTranslation } from '../hooks/useTranslation';

export default function AdminTable({
    columns,
    rows,
    renderRow,
    renderMobileCard,
    emptyMessage,
    emptyColspan,
}) {
    const { t } = useTranslation();
    const colspan = emptyColspan || columns?.length || 1;

    return (
        <>
            <div className="hidden md:block bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        {columns && (
                            <thead className="bg-gray-50">
                                <tr>
                                    {columns.map((col, i) => (
                                        <th
                                            key={i}
                                            className={`px-4 py-3 text-xs font-medium text-gray-500 uppercase ${
                                                col.align === 'right' ? 'text-right' :
                                                col.align === 'center' ? 'text-center' :
                                                'text-left'
                                            }`}
                                        >
                                            {col.label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                        )}
                        <tbody className="divide-y divide-gray-200">
                            {rows.length === 0 ? (
                                <tr>
                                    <td colSpan={colspan} className="px-4 py-8 text-center text-gray-500">
                                        {emptyMessage || t('common', 'noData')}
                                    </td>
                                </tr>
                            ) : (
                                rows.map((row, i) => (
                                    <tr key={row.id || i} className="hover:bg-gray-50">
                                        {renderRow(row, i)}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {rows.length === 0 ? (
                <div className="md:hidden bg-white rounded-xl shadow-sm border p-8 text-center text-gray-500">
                    {emptyMessage || t('common', 'noData')}
                </div>
            ) : (
                <div className="md:hidden space-y-3">
                    {rows.map((row, i) => (
                        <div key={row.id || i} className="bg-white rounded-xl shadow-sm border p-4">
                            {renderMobileCard(row, i)}
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
