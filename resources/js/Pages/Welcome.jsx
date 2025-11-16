import Badge from '@/Components/ui/Badge';
import Card, { CardBody } from '@/Components/ui/Card';
import { Head, Link } from '@inertiajs/react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Calendar, ExternalLink, Eye, FileText, Heart, Monitor, Search, Tag, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Welcome({ auth, kontenPublikasi, kontenPopuler, platforms, kategoriPopuler, stats }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPlatform, setSelectedPlatform] = useState('');
    const [selectedKategori, setSelectedKategori] = useState('');

    useEffect(() => {
        if (!window.aosInitialized) {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true,
            });
            window.aosInitialized = true;
        }
    }, []);

    // Filter konten berdasarkan search, platform, dan kategori
    const filteredKonten =
        kontenPublikasi?.filter((konten) => {
            const matchesSearch =
                !searchQuery ||
                konten.judul_konten.toLowerCase().includes(searchQuery.toLowerCase()) ||
                konten.platform?.nm_platform.toLowerCase().includes(searchQuery.toLowerCase()) ||
                konten.kategori?.nm_kategori.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesPlatform = !selectedPlatform || konten.id_platform === parseInt(selectedPlatform);
            const matchesKategori = !selectedKategori || konten.id_kategori === parseInt(selectedKategori);

            return matchesSearch && matchesPlatform && matchesKategori;
        }) || [];

    return (
        <>
            <Head title="Aplikasi Rekap Tahunan Link Konten Media Sosial Kanwil Kemenag Prov. Papua" />

            <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200">
                {/* Header/Navbar */}
                <header className="sticky top-0 z-50 border-b border-base-300 bg-base-100/80 shadow-sm backdrop-blur-md">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center gap-3">
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
                            </div>
                            <nav className="flex items-center gap-4">
                                {auth?.user ? (
                                    <>
                                        {auth.user.role === 'admin' && (
                                            <Link href="/admin/dashboard" className="btn btn-sm btn-primary">
                                                Dashboard Admin
                                            </Link>
                                        )}
                                        {auth.user.role === 'petugas' && (
                                            <Link href={route('petugas.dashboard')} className="btn btn-sm btn-primary">
                                                Dashboard Petugas
                                            </Link>
                                        )}
                                    </>
                                ) : (
                                    <Link href={route('login')} className="btn btn-sm btn-primary">
                                        Masuk
                                    </Link>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="relative overflow-hidden py-20 sm:py-32">
                    <div className="absolute inset-0 -z-10">
                        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl"></div>
                        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary/20 blur-3xl"></div>
                    </div>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center" data-aos="fade-up">
                            <h1 className="text-3xl font-bold tracking-tight text-base-content sm:text-5xl">
                                Aplikasi Rekap Tahunan
                                <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                    Link Konten Media Sosial
                                </span>
                                <span className="mt-2 block text-2xl text-base-content/80 sm:text-3xl">Kanwil Kemenag Prov. Papua</span>
                            </h1>
                            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-base-content/70">
                                Sistem manajemen dan rekapitulasi konten media sosial untuk mengorganisir, melacak, dan menganalisis konten media
                                sosial Kanwil Kemenag Provinsi Papua di berbagai platform.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-4">
                                {!auth?.user && (
                                    <Link href={route('login')} className="btn btn-lg btn-primary">
                                        Masuk ke Sistem
                                    </Link>
                                )}
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3" data-aos="fade-up" data-aos-delay="200">
                            <Card>
                                <CardBody className="text-center">
                                    <FileText className="mx-auto mb-2 h-8 w-8 text-primary" />
                                    <p className="text-3xl font-bold text-base-content">{stats?.totalKonten || 0}</p>
                                    <p className="text-sm text-base-content/60">Total Konten</p>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody className="text-center">
                                    <Monitor className="mx-auto mb-2 h-8 w-8 text-info" />
                                    <p className="text-3xl font-bold text-base-content">{stats?.totalPlatform || 0}</p>
                                    <p className="text-sm text-base-content/60">Platform Aktif</p>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody className="text-center">
                                    <Tag className="mx-auto mb-2 h-8 w-8 text-success" />
                                    <p className="text-3xl font-bold text-base-content">{stats?.totalKategori || 0}</p>
                                    <p className="text-sm text-base-content/60">Kategori</p>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Search & Filter Section */}
                <section className="bg-base-100/50 py-8">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col gap-4 md:flex-row" data-aos="fade-up">
                            <div className="relative flex-1">
                                <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-base-content/40" />
                                <input
                                    type="text"
                                    placeholder="Cari konten..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="input-bordered input w-full pl-12"
                                />
                            </div>
                            <div className="flex gap-2">
                                <select
                                    className="select-bordered select"
                                    value={selectedPlatform}
                                    onChange={(e) => setSelectedPlatform(e.target.value)}
                                >
                                    <option value="">Semua Platform</option>
                                    {platforms?.map((platform) => (
                                        <option key={platform.id} value={platform.id}>
                                            {platform.nm_platform}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    className="select-bordered select"
                                    value={selectedKategori}
                                    onChange={(e) => setSelectedKategori(e.target.value)}
                                >
                                    <option value="">Semua Kategori</option>
                                    {kategoriPopuler?.map((kategori) => (
                                        <option key={kategori.id} value={kategori.id}>
                                            {kategori.nm_kategori}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Konten Section */}
                <section className="py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-8" data-aos="fade-up">
                            <h2 className="text-3xl font-bold text-base-content">Konten Terbaru</h2>
                            <p className="mt-2 text-base-content/60">Jelajahi konten terbaru yang telah dipublikasi</p>
                        </div>

                        {filteredKonten.length > 0 ? (
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" data-aos="fade-up" data-aos-delay="100">
                                {filteredKonten.map((konten) => {
                                    const totalEngagement =
                                        (konten.jml_views || 0) + (konten.jml_likes || 0) + (konten.jml_komentar || 0) + (konten.jml_share || 0);
                                    return (
                                        <Card key={konten.id} className="transition-all hover:shadow-xl">
                                            <CardBody>
                                                <div className="mb-3 flex items-start justify-between">
                                                    <Badge variant="info" className="text-xs">
                                                        {konten.platform?.nm_platform || '-'}
                                                    </Badge>
                                                    {konten.kategori && (
                                                        <Badge variant="success" className="text-xs">
                                                            {konten.kategori.nm_kategori}
                                                        </Badge>
                                                    )}
                                                </div>
                                                <h3 className="mb-2 line-clamp-2 font-semibold text-base-content">{konten.judul_konten}</h3>
                                                {konten.tags && konten.tags.length > 0 && (
                                                    <div className="mb-3 flex flex-wrap gap-1">
                                                        {konten.tags.slice(0, 3).map((tag) => (
                                                            <Badge key={tag.id} variant="outline" className="text-xs">
                                                                {tag.nm_tag}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                )}
                                                <div className="mb-3 flex items-center gap-4 text-xs text-base-content/60">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="h-3 w-3" />
                                                        {konten.tgl_publikasi ? new Date(konten.tgl_publikasi).toLocaleDateString('id-ID') : '-'}
                                                    </span>
                                                </div>
                                                {totalEngagement > 0 && (
                                                    <div className="mb-3 flex items-center gap-4 border-t border-base-300 pt-2 text-xs text-base-content/60">
                                                        <span className="flex items-center gap-1">
                                                            <Eye className="h-3 w-3" /> {konten.jml_views?.toLocaleString('id-ID') || 0}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Heart className="h-3 w-3" /> {konten.jml_likes?.toLocaleString('id-ID') || 0}
                                                        </span>
                                                    </div>
                                                )}
                                                <a
                                                    href={konten.link_konten}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn w-full btn-sm btn-primary"
                                                >
                                                    Lihat Konten <ExternalLink className="ml-1 h-3 w-3" />
                                                </a>
                                            </CardBody>
                                        </Card>
                                    );
                                })}
                            </div>
                        ) : (
                            <Card>
                                <CardBody className="py-12 text-center">
                                    <FileText className="mx-auto mb-4 h-12 w-12 text-base-content/30" />
                                    <p className="text-base-content/60">
                                        {searchQuery || selectedPlatform || selectedKategori
                                            ? 'Tidak ada konten yang sesuai dengan filter'
                                            : 'Belum ada konten yang dipublikasi'}
                                    </p>
                                </CardBody>
                            </Card>
                        )}
                    </div>
                </section>

                {/* Konten Populer Section */}
                {kontenPopuler && kontenPopuler.length > 0 && (
                    <section className="bg-base-100/50 py-16">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="mb-8" data-aos="fade-up">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="flex items-center gap-2 text-3xl font-bold text-base-content">
                                            <TrendingUp className="h-8 w-8 text-primary" />
                                            Konten Populer
                                        </h2>
                                        <p className="mt-2 text-base-content/60">Konten dengan engagement tertinggi</p>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3" data-aos="fade-up" data-aos-delay="100">
                                {kontenPopuler.map((konten, index) => {
                                    const totalEngagement =
                                        (konten.jml_views || 0) + (konten.jml_likes || 0) + (konten.jml_komentar || 0) + (konten.jml_share || 0);
                                    return (
                                        <Card key={konten.id} className="transition-all hover:shadow-lg">
                                            <CardBody>
                                                <div className="flex items-start gap-3">
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                                                        {index + 1}
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="mb-2 line-clamp-2 font-semibold text-base-content">{konten.judul_konten}</h3>
                                                        <div className="mb-3 flex items-center gap-4 text-xs text-base-content/60">
                                                            <span className="flex items-center gap-1">
                                                                <Eye className="h-3 w-3" /> {konten.jml_views?.toLocaleString('id-ID') || 0}
                                                            </span>
                                                            <span className="flex items-center gap-1">
                                                                <Heart className="h-3 w-3" /> {konten.jml_likes?.toLocaleString('id-ID') || 0}
                                                            </span>
                                                        </div>
                                                        <Badge variant="success" className="text-xs">
                                                            {totalEngagement.toLocaleString('id-ID')} engagement
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                )}

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
                                {!auth?.user && (
                                    <Link href={route('login')} className="link text-sm link-primary">
                                        Masuk ke Sistem
                                    </Link>
                                )}
                            </div>
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
