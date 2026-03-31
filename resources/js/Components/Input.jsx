// resources/js/Components/Input.jsx
import { forwardRef } from 'react';

const Input = forwardRef(function Input(
    { label, error, id, className = '', type = 'text', ...props },
    ref,
) {
    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={id}
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                >
                    {label}
                </label>
            )}
            {type === 'textarea' ? (
                <textarea
                    ref={ref}
                    id={id}
                    className={`
                        w-full bg-white dark:bg-slate-900 border border-gray-200
                        dark:border-slate-700 focus:ring-2 focus:ring-indigo-500
                        focus:border-transparent rounded-xl px-4 py-3 text-sm
                        text-gray-900 dark:text-white placeholder-gray-400
                        dark:placeholder-gray-500 transition-all duration-200
                        resize-none ${error ? 'border-red-500 focus:ring-red-500' : ''}
                        ${className}
                    `}
                    rows={4}
                    {...props}
                />
            ) : (
                <input
                    ref={ref}
                    id={id}
                    type={type}
                    className={`
                        w-full bg-white dark:bg-slate-900 border border-gray-200
                        dark:border-slate-700 focus:ring-2 focus:ring-indigo-500
                        focus:border-transparent rounded-xl px-4 py-3 text-sm
                        text-gray-900 dark:text-white placeholder-gray-400
                        dark:placeholder-gray-500 transition-all duration-200
                        ${error ? 'border-red-500 focus:ring-red-500' : ''}
                        ${className}
                    `}
                    {...props}
                />
            )}
            {error && (
                <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
        </div>
    );
});

export default Input;
