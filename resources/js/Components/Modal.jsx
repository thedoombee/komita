// resources/js/Components/Modal.jsx
import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { modalOverlay, modalPanel } from '@/config/animations';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function Modal({ isOpen, onClose, title, children }) {
    const handleEscape = useCallback(
        (e) => {
            if (e.key === 'Escape') onClose();
        },
        [onClose],
    );

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [isOpen, handleEscape]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <motion.div
                        initial={modalOverlay.initial}
                        animate={modalOverlay.animate}
                        exit={modalOverlay.exit}
                        transition={modalOverlay.transition}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={modalPanel.initial}
                        animate={modalPanel.animate}
                        exit={modalPanel.exit}
                        transition={modalPanel.transition}
                        className="relative z-10 w-full max-w-lg mx-4 bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden"
                    >
                        {title && (
                            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-slate-700">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {title}
                                </h3>
                                <button
                                    onClick={onClose}
                                    className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                                >
                                    <XMarkIcon className="h-5 w-5" />
                                </button>
                            </div>
                        )}
                        <div className="px-6 py-5">{children}</div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
