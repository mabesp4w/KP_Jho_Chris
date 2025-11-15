import Avatar from '@/Components/ui/Avatar';
import { Link, usePage } from '@inertiajs/react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

export default function Sidebar({ auth, isOpen, onClose }) {
    const { url } = usePage();

    useEffect(() => {
        // Only initialize AOS once globally, not on every navigation
        // Check if AOS is already initialized or if this is a page refresh
        if (!window.aosInitialized) {
            AOS.init({
                duration: 600,
                easing: 'ease-in-out',
                once: true,
                disable: false,
            });
            window.aosInitialized = true;
        }

        // Don't refresh AOS on navigation - only on actual page refresh
        // AOS will handle animations automatically with 'once: true' option
    }, []);

    const menuItems = [
        {
            name: 'Dashboard',
            route: 'admin.dashboard',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                </svg>
            ),
        },
        {
            name: 'Platform',
            route: 'admin.platform.index',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
        },
        {
            name: 'Konten',
            route: 'admin.konten.index',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                </svg>
            ),
        },
        {
            name: 'Tag',
            route: 'admin.tag.index',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                </svg>
            ),
        },
        {
            name: 'Pengguna',
            route: 'admin.pengguna.index',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                </svg>
            ),
        },
        {
            name: 'Laporan',
            route: 'admin.laporan.index',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                </svg>
            ),
        },
    ];

    const isActive = (routeName) => {
        if (!routeName || routeName === '#') return false;

        // Route URL mapping - same as used in menu items
        const routeMap = {
            'admin.dashboard': '/admin/dashboard',
            'admin.platform.index': '/admin/platform',
            'admin.konten.index': '/admin/konten',
            'admin.tag.index': '/admin/tag',
            'admin.pengguna.index': '/admin/pengguna',
            'admin.laporan.index': '/admin/laporan',
        };

        // Get base URL from routeMap
        const baseUrl = routeMap[routeName];
        if (!baseUrl) return false;

        // Normalize current URL
        const currentUrl = url.split('?')[0].replace(/\/$/, ''); // Remove query params and trailing slash
        const normalizedBaseUrl = baseUrl.replace(/\/$/, '');

        // Exact match for index route
        if (currentUrl === normalizedBaseUrl) return true;

        // Special handling for dashboard
        if (routeName === 'admin.dashboard') {
            return currentUrl === '/admin/dashboard' || currentUrl === '/admin';
        }

        // For resource routes, check if we're on any route of that resource
        // This includes: index, create, edit
        if (routeName.includes('.index')) {
            // Check if it's create route
            if (currentUrl === normalizedBaseUrl + '/create') return true;

            // Check if it's edit route (has ID followed by /edit)
            const editPattern = new RegExp(`^${normalizedBaseUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/\\d+/edit$`);
            if (editPattern.test(currentUrl)) return true;

            // Check if current URL starts with base URL (for nested routes)
            if (currentUrl.startsWith(normalizedBaseUrl + '/')) return true;
        }

        return false;
    };

    return (
        <>
            {/* Overlay untuk mobile */}
            {isOpen && <div className="bg-opacity-50 fixed inset-0 z-40 bg-black lg:hidden" onClick={onClose} />}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-50 h-screen w-64 transform bg-base-100 shadow-xl transition-transform duration-300 ease-in-out lg:translate-x-0 ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex h-full flex-col">
                    {/* User Info */}
                    <div className="border-b border-base-300 p-4">
                        <div className="flex items-center gap-3">
                            <Avatar src={null} alt={auth.user.name} size="md" />
                            <div className="flex-1">
                                <p className="font-semibold text-base-content">{auth.user.name}</p>
                                <p className="text-xs text-base-content/60">{auth.user.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Menu Items */}
                    <nav className="flex-1 overflow-y-auto p-4">
                        <ul className="menu space-y-1">
                            {menuItems.map((item, index) => {
                                const active = isActive(item.route);

                                // Route URL mapping - use direct URLs to ensure correct navigation
                                const routeMap = {
                                    'admin.dashboard': '/admin/dashboard',
                                    'admin.platform.index': '/admin/platform',
                                    'admin.konten.index': '/admin/konten',
                                    'admin.tag.index': '/admin/tag',
                                    'admin.pengguna.index': '/admin/pengguna',
                                    'admin.laporan.index': '/admin/laporan',
                                };

                                // Use direct URL from routeMap to ensure correct navigation
                                // This prevents issues with route helper returning wrong URLs
                                const routeUrl = routeMap[item.route] || '#';

                                return (
                                    <li key={item.name}>
                                        <Link
                                            href={routeUrl}
                                            className={`relative flex items-center gap-3 rounded-lg px-4 py-3 transition-all ${
                                                active ? 'bg-primary text-primary-content shadow-md' : 'text-base-content hover:bg-base-200'
                                            }`}
                                            onClick={() => {
                                                // Close sidebar on mobile when link is clicked
                                                if (window.innerWidth < 1024) {
                                                    onClose();
                                                }
                                            }}
                                        >
                                            {/* Active indicator bar */}
                                            {active && <span className="absolute top-0 bottom-0 left-0 w-1 rounded-r-full bg-primary-content"></span>}
                                            <span className={active ? 'text-primary-content' : 'text-base-content'}>{item.icon}</span>
                                            <span className={`font-medium ${active ? 'text-primary-content' : 'text-base-content'}`}>
                                                {item.name}
                                            </span>
                                            {active && (
                                                <span className="ml-auto">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-4 w-4 text-primary-content"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </span>
                                            )}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    {/* Footer */}
                    <div className="border-t border-base-300 p-4">
                        <Link href={route('profile.edit')} className="btn btn-block justify-start gap-2 btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                            Profile
                        </Link>
                    </div>
                </div>
            </aside>
        </>
    );
}
