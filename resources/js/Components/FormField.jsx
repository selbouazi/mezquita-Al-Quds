export default function FormField({
    label,
    name,
    error,
    required,
    children,
    labelClassName,
}) {
    return (
        <div>
            {label && (
                <label
                    htmlFor={name}
                    className={`block text-sm font-medium text-gray-700 mb-1 ${labelClassName || ''}`}
                >
                    {label}
                    {required && <span className="text-red-500 ml-0.5">*</span>}
                </label>
            )}
            {children}
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
}
