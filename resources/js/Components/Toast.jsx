// resources/js/Components/Toast.jsx
import { Toaster } from 'react-hot-toast';

export default function Toast() {
    return (
        <Toaster
            position="top-right"
            toastOptions={{
                duration: 4000,
                className:
                    'bg-white dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700 shadow-sm rounded-xl text-sm font-medium',
                success: {
                    iconTheme: {
                        primary: '#4F46E5',
                        secondary: '#ffffff',
                    },
                },
                error: {
                    iconTheme: {
                        primary: '#EF4444',
                        secondary: '#ffffff',
                    },
                },
            }}
        />
    );
}
