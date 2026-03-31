// resources/js/Components/AppLayout.jsx
import Navbar from '@/Components/Navbar';
import Toast from '@/Components/Toast';

export default function AppLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
            <Toast />
            <Navbar />
            <main className="pt-16 lg:pt-18">
                {children}
            </main>
        </div>
    );
}
