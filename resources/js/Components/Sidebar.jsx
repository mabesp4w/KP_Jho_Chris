import Avatar from '@/Components/ui/Avatar';
import { Link, router, usePage } from '@inertiajs/react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { BarChart3, ChevronRight, FileText, FolderTree, LayoutDashboard, LogOut, Monitor, Tag } from 'lucide-react';
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
            icon: <LayoutDashboard className="h-5 w-5" />,
        },
        {
            name: 'Platform',
            route: 'admin.platform.index',
            icon: <Monitor className="h-5 w-5" />,
        },
        {
            name: 'Konten',
            route: 'admin.konten.index',
            icon: <FileText className="h-5 w-5" />,
        },
        {
            name: 'Kategori',
            route: 'admin.kategori-konten.index',
            icon: <FolderTree className="h-5 w-5" />,
        },
        {
            name: 'Tag',
            route: 'admin.tag.index',
            icon: <Tag className="h-5 w-5" />,
        },
        {
            name: 'Laporan',
            route: 'admin.laporan.index',
            icon: <BarChart3 className="h-5 w-5" />,
        },
    ];

    const isActive = (routeName) => {
        if (!routeName || routeName === '#') return false;

        // Route URL mapping - same as used in menu items
        const routeMap = {
            'admin.dashboard': '/admin/dashboard',
            'admin.platform.index': '/admin/platform',
            'admin.konten.index': '/admin/konten',
            'admin.kategori-konten.index': '/admin/kategori-konten',
            'admin.tag.index': '/admin/tag',
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
                    {/* Logo */}
                    <div className="border-b border-base-300 p-4">
                        <div className="flex items-center justify-center">
                            <img 
                                src="/images/logo.png" 
                                alt="Logo Kanwil Kemenag Prov. Papua" 
                                className="h-12 w-12 object-contain"
                            />
                        </div>
                        <p className="mt-2 text-center text-xs font-semibold text-base-content">Kanwil Kemenag Prov. Papua</p>
                    </div>
                    
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
                                    'admin.kategori-konten.index': '/admin/kategori-konten',
                                    'admin.tag.index': '/admin/tag',
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
                                                    <ChevronRight className="h-4 w-4 text-primary-content" />
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
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                router.post(route('logout'));
                            }}
                            className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-4 py-3 text-base-content transition-all hover:bg-error/10 hover:text-error"
                        >
                            <LogOut className="h-5 w-5" />
                            <span className="font-medium">Keluar</span>
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
