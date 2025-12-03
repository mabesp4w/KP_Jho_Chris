import Badge from '@/Components/ui/Badge';
import Button from '@/Components/ui/Button';
import Card, { CardBody, CardHeader, CardTitle } from '@/Components/ui/Card';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import {
    LayoutDashboard,
    Monitor,
    FileText,
    Tag,
    Users,
    TrendingUp,
    Eye,
    Heart,
    MessageCircle,
    Share2,
    Calendar,
    BarChart3,
    ArrowRight,
} from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

export default function AdminDashboard({ auth, stats, kontenTerbaru, kontenPerPlatform, topKonten, kontenPerBulan }) {
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

    const statCards = [
        {
            title: 'Total Konten',
            value: stats?.totalKonten || 0,
            icon: <FileText className="h-6 w-6" />,
            variant: 'primary',
            link: route('admin.konten.index'),
        },
        {
            title: 'Platform Aktif',
            value: stats?.totalPlatform || 0,
            icon: <Monitor className="h-6 w-6" />,
            variant: 'info',
            link: route('admin.platform.index'),
        },
        {
            title: 'Kategori',
            value: stats?.totalKategori || 0,
            icon: <Tag className="h-6 w-6" />,
            variant: 'success',
            link: route('admin.kategori-konten.index'),
        },
        {
            title: 'Total Pengguna',
            value: stats?.totalUsers || 0,
            icon: <Users className="h-6 w-6" />,
            variant: 'warning',
        },
    ];

    const engagementCards = [
        {
            title: 'Total Views',
            value: stats?.totalViews?.toLocaleString('id-ID') || '0',
            icon: <Eye className="h-5 w-5" />,
            color: 'text-blue-500',
        },
        {
            title: 'Total Likes',
            value: stats?.totalLikes?.toLocaleString('id-ID') || '0',
            icon: <Heart className="h-5 w-5" />,
            color: 'text-red-500',
        },
        {
            title: 'Total Komentar',
            value: stats?.totalKomentar?.toLocaleString('id-ID') || '0',
            icon: <MessageCircle className="h-5 w-5" />,
            color: 'text-green-500',
        },
        {
            title: 'Total Share',
            value: stats?.totalShare?.toLocaleString('id-ID') || '0',
            icon: <Share2 className="h-5 w-5" />,
            color: 'text-purple-500',
        },
    ];

    const statusCards = [
        {
            title: 'Draft',
            value: stats?.kontenDraft || 0,
            variant: 'warning',
        },
        {
            title: 'Publikasi',
            value: stats?.kontenPublikasi || 0,
            variant: 'success',
        },
        {
            title: 'Arsip',
            value: stats?.kontenArsip || 0,
            variant: 'error',
        },
    ];

    return (
        <AdminLayout
            auth={auth}
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-semibold text-base-content">Dashboard</h2>
                        <p className="text-sm text-base-content/60">Selamat datang, {auth.user.name}!</p>
                    </div>
                </div>
            }
        >
            <Head title="Dashboard Admin" />

            <div className="mx-auto max-w-7xl space-y-6">
                {/* Welcome Alert */}
                <div data-aos="fade-down" className="alert alert-info">
                    <LayoutDashboard className="h-6 w-6 shrink-0" />
                    <span>
                        Selamat datang kembali, <strong>{auth.user.name}</strong>! Berikut ringkasan aktivitas sistem Anda.
                    </span>
                </div>

                {/* Statistik Utama */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4" data-aos="fade-up">
                    {statCards.map((card, index) => {
                        const iconColorClass = {
                            primary: 'text-primary',
                            info: 'text-info',
                            success: 'text-success',
                            warning: 'text-warning',
                        }[card.variant] || 'text-primary';
                        
                        return (
                            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => card.link && router.visit(card.link)}>
                                <CardBody>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-base-content/60 mb-1">{card.title}</p>
                                            <p className="text-3xl font-bold text-base-content">{card.value}</p>
                                        </div>
                                        <div className={`${iconColorClass} opacity-80`}>{card.icon}</div>
                                    </div>
                                    {card.link && (
                                        <Link href={card.link} className="mt-3 text-xs link link-primary flex items-center gap-1">
                                            Lihat detail <ArrowRight className="h-3 w-3" />
                                        </Link>
                                    )}
                                </CardBody>
                            </Card>
                        );
                    })}
                </div>

                {/* Engagement Stats */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4" data-aos="fade-up" data-aos-delay="100">
                    {engagementCards.map((card, index) => (
                        <Card key={index}>
                            <CardBody className="p-4">
                                <div className="flex items-center gap-3">
                                    <div className={card.color}>{card.icon}</div>
                                    <div>
                                        <p className="text-xs text-base-content/60">{card.title}</p>
                                        <p className="text-xl font-bold text-base-content">{card.value}</p>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                </div>

                {/* Status Konten & Konten Bulan Ini */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4" data-aos="fade-up" data-aos-delay="200">
                    {statusCards.map((card, index) => (
                        <Card key={index}>
                            <CardBody>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-base-content/60 mb-1">Konten {card.title}</p>
                                        <p className="text-2xl font-bold text-base-content">{card.value}</p>
                                    </div>
                                    <Badge variant={card.variant}>{card.title}</Badge>
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                    <Card>
                        <CardBody>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-base-content/60 mb-1">Konten Bulan Ini</p>
                                    <p className="text-2xl font-bold text-base-content">{stats?.kontenBulanIni || 0}</p>
                                </div>
                                <Calendar className="h-6 w-6 text-primary" />
                            </div>
                        </CardBody>
                    </Card>
                </div>

                {/* Konten Terbaru & Top Konten */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2" data-aos="fade-up" data-aos-delay="300">
                    {/* Konten Terbaru */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5" />
                                Konten Terbaru
                            </CardTitle>
                        </CardHeader>
                        <CardBody>
                            {kontenTerbaru && kontenTerbaru.length > 0 ? (
                                <div className="space-y-3">
                                    {kontenTerbaru.map((konten) => (
                                        <div key={konten.id} className="flex items-start justify-between p-3 rounded-lg hover:bg-base-200 transition-colors">
                                            <div className="flex-1">
                                                <p className="font-medium text-base-content line-clamp-1">{konten.judul_konten}</p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <Badge variant="info" className="text-xs">
                                                        {konten.platform?.nm_platform || '-'}
                                                    </Badge>
                                                    <Badge variant={konten.status_konten === 'publikasi' ? 'success' : konten.status_konten === 'draft' ? 'warning' : 'error'} className="text-xs">
                                                        {konten.status_konten}
                                                    </Badge>
                                                </div>
                                            </div>
                                            <Link
                                                href={route('admin.konten.index')}
                                                className="ml-2 text-primary hover:text-primary-focus"
                                            >
                                                <ArrowRight className="h-4 w-4" />
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-base-content/60 py-4">Belum ada konten</p>
                            )}
                            <div className="mt-4">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full"
                                    onClick={() => router.visit(route('admin.konten.index'))}
                                >
                                    Lihat Semua Konten
                                </Button>
                            </div>
                        </CardBody>
                    </Card>

                    {/* Top Konten */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5" />
                                Top Konten (Engagement)
                            </CardTitle>
                        </CardHeader>
                        <CardBody>
                            {topKonten && topKonten.length > 0 ? (
                                <div className="space-y-3">
                                    {topKonten.map((konten, index) => {
                                        const totalEngagement = (konten.jml_views || 0) + (konten.jml_likes || 0) + (konten.jml_komentar || 0) + (konten.jml_share || 0);
                                        return (
                                            <div key={konten.id} className="flex items-start justify-between p-3 rounded-lg hover:bg-base-200 transition-colors">
                                                <div className="flex items-start gap-3 flex-1">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm">
                                                        {index + 1}
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="font-medium text-base-content line-clamp-1">{konten.judul_konten}</p>
                                                        <div className="flex items-center gap-3 mt-1 text-xs text-base-content/60">
                                                            <span className="flex items-center gap-1">
                                                                <Eye className="h-3 w-3" /> {konten.jml_views?.toLocaleString('id-ID') || 0}
                                                            </span>
                                                            <span className="flex items-center gap-1">
                                                                <Heart className="h-3 w-3" /> {konten.jml_likes?.toLocaleString('id-ID') || 0}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Badge variant="success" className="text-xs">
                                                    {totalEngagement.toLocaleString('id-ID')}
                                                </Badge>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <p className="text-center text-base-content/60 py-4">Belum ada data engagement</p>
                            )}
                        </CardBody>
                    </Card>
                </div>

                {/* Konten Per Platform & Quick Actions */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2" data-aos="fade-up" data-aos-delay="400">
                    {/* Konten Per Platform */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BarChart3 className="h-5 w-5" />
                                Konten Per Platform
                            </CardTitle>
                        </CardHeader>
                        <CardBody>
                            {kontenPerPlatform && kontenPerPlatform.length > 0 ? (
                                <div className="space-y-3">
                                    {kontenPerPlatform.map((platform, index) => {
                                        const maxCount = Math.max(...kontenPerPlatform.map((p) => p.count));
                                        const percentage = maxCount > 0 ? (platform.count / maxCount) * 100 : 0;
                                        return (
                                            <div key={index}>
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="text-sm font-medium text-base-content">{platform.name}</span>
                                                    <span className="text-sm font-bold text-base-content">{platform.count}</span>
                                                </div>
                                                <div className="w-full bg-base-200 rounded-full h-2">
                                                    <div
                                                        className="bg-primary h-2 rounded-full transition-all"
                                                        style={{ width: `${percentage}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <p className="text-center text-base-content/60 py-4">Belum ada data platform</p>
                            )}
                            <div className="mt-4">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full"
                                    onClick={() => router.visit(route('admin.platform.index'))}
                                >
                                    Kelola Platform
                                </Button>
                            </div>
                        </CardBody>
                    </Card>

                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <div className="grid grid-cols-2 gap-3">
                                <Button
                                    variant="primary"
                                    size="sm"
                                    className="w-full"
                                    onClick={() => router.visit(route('admin.platform.index'))}
                                >
                                    <Monitor className="h-4 w-4 mr-2" />
                                    Platform
                                </Button>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    className="w-full"
                                    onClick={() => router.visit(route('admin.konten.index'))}
                                >
                                    <FileText className="h-4 w-4 mr-2" />
                                    Konten
                                </Button>
                                <Button
                                    variant="accent"
                                    size="sm"
                                    className="w-full"
                                    onClick={() => router.visit(route('admin.tag.index'))}
                                >
                                    <Tag className="h-4 w-4 mr-2" />
                                    Tag
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full"
                                    onClick={() => router.visit(route('admin.laporan.index'))}
                                >
                                    <BarChart3 className="h-4 w-4 mr-2" />
                                    Laporan
                                </Button>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}

