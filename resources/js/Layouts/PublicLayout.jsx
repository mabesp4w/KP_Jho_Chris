import { Link, router } from '@inertiajs/react';
import { Head } from '@inertiajs/react';

export default function PublicLayout({ auth, title, children, activeMenu = '' }) {
    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route('logout'));
    };

    const isActiveMobile = (menu) => {
        if (activeMenu === menu) {
            return 'active bg-primary text-primary-content font-semibold';
        }
        return '';
    };

    return (
        <>
            <Head title={title} />
            <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200">
                {/* Header/Navbar */}
                <header className="sticky top-0 z-50 border-b border-base-300 bg-base-100 shadow-lg backdrop-blur-sm">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="navbar">
                            <div className="navbar-start">
                                {/* Mobile Menu */}
                                <div className="dropdown lg:hidden">
                                    <div tabIndex={0} role="button" className="btn btn-ghost">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                                        </svg>
                                    </div>
                                    <ul
                                        tabIndex={0}
                                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg"
                                    >
                                        <li>
                                            <Link href="/" className={isActiveMobile('beranda')}>
                                                Beranda
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/konten" className={isActiveMobile('konten')}>
                                                Konten
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/tentang" className={isActiveMobile('tentang')}>
                                                Tentang
                                            </Link>
                                        </li>
                                        {auth?.user && (
                                            <>
                                                <li>
                                                    <Link href={route('dashboard')}>Dashboard</Link>
                                                </li>
                                                <li>
                                                    <Link href={route('profile.edit')}>Profil</Link>
                                                </li>
                                            </>
                                        )}
                                    </ul>
                                </div>
                                {/* Logo */}
                                <Link href="/" className="flex items-center gap-3">
                                    <img 
                                        src="/images/logo.png" 
                                        alt="Logo Kanwil Kemenag Prov. Papua" 
                                        className="h-12 w-12 object-contain"
                                    />
                                    <div className="flex flex-col">
                                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-sm leading-tight font-bold text-transparent">
                                            Rekap Konten Media Sosial
                                        </span>
                                        <span className="text-xs leading-tight text-base-content/60">Kanwil Kemenag Prov. Papua</span>
                                    </div>
                                </Link>
                            </div>
                            <div className="navbar-center hidden lg:flex">
                                <ul className="menu menu-horizontal px-1 gap-2">
                                    <li>
                                        <Link 
                                            href="/" 
                                            className={`btn btn-sm transition-all duration-200 ${
                                                activeMenu === 'beranda' 
                                                    ? 'btn-primary text-primary-content font-semibold shadow-md scale-105' 
                                                    : 'btn-ghost hover:bg-primary/10'
                                            }`}
                                        >
                                            Beranda
                                        </Link>
                                    </li>
                                    <li>
                                        <Link 
                                            href="/konten" 
                                            className={`btn btn-sm transition-all duration-200 ${
                                                activeMenu === 'konten' 
                                                    ? 'btn-primary text-primary-content font-semibold shadow-md scale-105' 
                                                    : 'btn-ghost hover:bg-primary/10'
                                            }`}
                                        >
                                            Konten
                                        </Link>
                                    </li>
                                    <li>
                                        <Link 
                                            href="/tentang" 
                                            className={`btn btn-sm transition-all duration-200 ${
                                                activeMenu === 'tentang' 
                                                    ? 'btn-primary text-primary-content font-semibold shadow-md scale-105' 
                                                    : 'btn-ghost hover:bg-primary/10'
                                            }`}
                                        >
                                            Tentang
                                        </Link>
                                    </li>
                                    {auth?.user && (
                                        <li>
                                            <Link href={route('dashboard')} className="btn btn-ghost btn-sm">
                                                Dashboard
                                            </Link>
                                        </li>
                                    )}
                                </ul>
                            </div>
                            <div className="navbar-end">
                                {auth?.user ? (
                                    <div className="flex items-center gap-2">
                                        {auth.user.role === 'admin' && (
                                            <Link href={route('admin.dashboard')} className="btn btn-sm btn-primary">
                                                Admin Panel
                                            </Link>
                                        )}
                                        {auth.user.role === 'petugas' && (
                                            <Link href={route('petugas.dashboard')} className="btn btn-sm btn-primary">
                                                Petugas
                                            </Link>
                                        )}
                                        {(auth.user.role !== 'admin' && auth.user.role !== 'petugas') && (
                                            <Link href={route('dashboard')} className="btn btn-sm btn-primary">
                                                Dashboard
                                            </Link>
                                        )}
                                        <Link href={route('profile.edit')} className="btn btn-sm btn-ghost">
                                            Profil
                                        </Link>
                                    </div>
                                ) : (
                                    <Link href={route('login')} className="btn btn-sm btn-primary">
                                        Masuk
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main>{children}</main>

                {/* Footer */}
                <footer className="bg-base-200 py-12">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <div className="mb-4 flex flex-col items-center justify-center gap-2">
                                <img 
                                    src="/images/logo.png" 
                                    alt="Logo Kanwil Kemenag Prov. Papua" 
                                    className="h-16 w-16 object-contain mb-2"
                                />
                                <div className="flex items-center gap-2">
                                    <span className="text-lg font-bold">Rekap Konten Media Sosial</span>
                                </div>
                                <p className="text-sm text-base-content/60">Kanwil Kemenag Prov. Papua</p>
                            </div>
                            <p className="text-sm text-base-content/60">Aplikasi Rekap Tahunan Link Konten Media Sosial</p>
                            <div className="mt-6 flex items-center justify-center gap-4">
                                <Link href="/" className="link text-sm link-primary">
                                    Beranda
                                </Link>
                                <span className="text-base-content/40">•</span>
                                <Link href="/konten" className="link text-sm link-primary">
                                    Konten
                                </Link>
                                <span className="text-base-content/40">•</span>
                                <Link href="/tentang" className="link text-sm link-primary">
                                    Tentang
                                </Link>
                            </div>
                            {!auth?.user && (
                                <div className="mt-4">
                                    <Link href={route('login')} className="link text-sm link-primary">
                                        Masuk ke Sistem
                                    </Link>
                                </div>
                            )}
                            <p className="mt-8 text-xs text-base-content/40">
                                © {new Date().getFullYear()} Kanwil Kemenag Prov. Papua. All rights reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}

