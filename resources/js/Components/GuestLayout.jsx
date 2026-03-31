// resources/js/Components/GuestLayout.jsx
import Navbar from '@/Components/Navbar';
import Toast from '@/Components/Toast';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
            <Toast />
            <Navbar />
            <main>{children}</main>
        </div>
    );
}
