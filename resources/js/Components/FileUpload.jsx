// resources/js/Components/FileUpload.jsx
import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUpTrayIcon, DocumentIcon, XMarkIcon } from '@heroicons/react/24/outline';

const ACCEPTED_TYPES = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'text/plain',
];
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

export default function FileUpload({ onFileSelect, error: externalError, className = '' }) {
    const { t } = useTranslation();
    const inputRef = useRef(null);
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [isDragging, setIsDragging] = useState(false);

    const validateFile = (f) => {
        if (!ACCEPTED_TYPES.includes(f.type)) {
            setError(t('errors.invalidFileType'));
            return false;
        }
        if (f.size > MAX_SIZE) {
            setError(t('errors.fileTooLarge'));
            return false;
        }
        setError('');
        return true;
    };

    const handleFile = (f) => {
        if (validateFile(f)) {
            setFile(f);
            onFileSelect?.(f);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) handleFile(droppedFile);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => setIsDragging(false);

    const handleChange = (e) => {
        const selected = e.target.files[0];
        if (selected) handleFile(selected);
    };

    const handleRemove = () => {
        setFile(null);
        setError('');
        onFileSelect?.(null);
        if (inputRef.current) inputRef.current.value = '';
    };

    const displayError = externalError || error;

    return (
        <div className={className}>
            <input
                ref={inputRef}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.txt"
                onChange={handleChange}
                className="hidden"
                id="file-upload-input"
            />

            {!file ? (
                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={() => inputRef.current?.click()}
                    className={`
                        flex flex-col items-center justify-center gap-3 p-8
                        border-2 border-dashed rounded-2xl cursor-pointer
                        transition-all duration-200
                        ${isDragging
                            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30'
                            : 'border-gray-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 bg-gray-50 dark:bg-slate-900/50'
                        }
                    `}
                >
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/50">
                        <ArrowUpTrayIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t('fileUpload.dragDrop')}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {t('fileUpload.or')}{' '}
                            <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                                {t('fileUpload.browse')}
                            </span>
                        </p>
                    </div>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                        {t('fileUpload.accepted')}
                    </p>
                </div>
            ) : (
                <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-700 rounded-xl">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 flex-shrink-0">
                        <DocumentIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {file.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {(file.size / 1024).toFixed(1)} KB
                        </p>
                    </div>
                    <button
                        onClick={handleRemove}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors flex-shrink-0"
                    >
                        <XMarkIcon className="h-4 w-4" />
                    </button>
                </div>
            )}

            {displayError && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">{displayError}</p>
            )}
        </div>
    );
}
