// resources/js/Components/Button.jsx
import { motion } from 'framer-motion';
import { buttonHover } from '@/config/animations';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
};

const variantClasses = {
    primary:
        'bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium transition-all duration-200 ease-in-out',
    outline:
        'border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-xl font-medium transition-all duration-200',
    ghost:
        'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl font-medium transition-all duration-200',
};

export default function Button({
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    children,
    className = '',
    type = 'button',
    onClick,
    ...props
}) {
    return (
        <motion.button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            whileHover={!disabled && !loading ? buttonHover.whileHover : {}}
            whileTap={!disabled && !loading ? buttonHover.whileTap : {}}
            className={`
                inline-flex items-center justify-center gap-2
                ${variantClasses[variant]}
                ${sizeClasses[size]}
                ${disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                ${className}
            `}
            {...props}
        >
            {loading && (
                <ArrowPathIcon className="h-4 w-4 animate-spin" />
            )}
            {children}
        </motion.button>
    );
}
