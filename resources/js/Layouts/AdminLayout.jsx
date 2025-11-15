import Sidebar from '@/Components/Sidebar';
import { router } from '@inertiajs/react';
import { useState } from 'react';

export default function AdminLayout({ auth, header, children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route('logout'));
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="min-h-screen bg-base-200">
            {/* Sidebar */}
            <Sidebar auth={auth} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Main Content */}
            <div className="lg:pl-64">
                {/* Top Navbar */}

                {/* Page Heading */}
                {header && (
                    <header className="bg-base-100 shadow">
                        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">{header}</div>
                    </header>
                )}

                {/* Page Content */}
                <main className="p-4 sm:p-6 lg:p-8">{children}</main>
            </div>
        </div>
    );
}
