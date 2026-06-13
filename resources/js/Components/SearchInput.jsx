import { useState, useEffect, useRef } from 'react';
import { useTranslation } from '../hooks/useTranslation';

export default function SearchInput({
    value: externalValue,
    onChange,
    placeholder,
    debounceMs = 300,
    className = '',
}) {
    const { t } = useTranslation();
    const [localValue, setLocalValue] = useState(externalValue || '');
    const timeoutRef = useRef(null);

    useEffect(() => {
        setLocalValue(externalValue || '');
    }, [externalValue]);

    const handleChange = (e) => {
        const val = e.target.value;
        setLocalValue(val);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            onChange(val);
        }, debounceMs);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    return (
        <div className={`relative ${className}`}>
            <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
                type="text"
                value={localValue}
                onChange={handleChange}
                placeholder={placeholder || t('common', 'search')}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0F5132] focus:border-[#0F5132]"
            />
            {localValue && (
                <button
                    type="button"
                    onClick={() => { setLocalValue(''); onChange(''); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label={t('common', 'clear')}
                >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            )}
        </div>
    );
}
