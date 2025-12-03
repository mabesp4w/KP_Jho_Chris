import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Card, { CardBody, CardHeader, CardTitle } from '@/Components/ui/Card';
import Badge from '@/Components/ui/Badge';
import Button from '@/Components/ui/Button';
import { Calendar, ExternalLink, Eye, FileText, Heart, Monitor, Tag, TrendingUp } from 'lucide-react';

export default function UserDashboard({ auth, stats, kontenTerbaru, kontenPopuler, platforms }) {
    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="text-xl font-semibold leading-tight text-base-content">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Welcome Message */}
                    <div className="mb-6">
                        <div className="alert alert-info">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 shrink-0 stroke-current"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span>Selamat datang, <strong>{auth.user.name}</strong>! Jelajahi konten media sosial Kanwil Kemenag Prov. Papua.</span>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
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

                    {/* Quick Actions */}
                    <div className="mb-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Akses Cepat</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <div className="flex flex-wrap gap-4">
                                    <Link href="/konten" className="btn btn-primary">
                                        <FileText className="mr-2 h-4 w-4" />
                                        Lihat Semua Konten
                                    </Link>
                                    <Link href={route('profile.edit')} className="btn btn-outline">
                                        Profil Saya
                                    </Link>
                                </div>
                            </CardBody>
                        </Card>
                    </div>

                    {/* Konten Terbaru */}
                    <div className="mb-8">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-2xl font-bold text-base-content">Konten Terbaru</h3>
                            <Link href="/konten" className="btn btn-sm btn-ghost">
                                Lihat Semua
                            </Link>
                        </div>
                        {kontenTerbaru && kontenTerbaru.length > 0 ? (
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {kontenTerbaru.map((konten) => {
                                    const totalEngagement =
                                        (konten.jml_views || 0) + (konten.jml_likes || 0) + (konten.jml_komentar || 0) + (konten.jml_share || 0);
                                    return (
                                        <Card key={konten.id} className="transition-all hover:shadow-lg">
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
                                                <h4 className="mb-2 line-clamp-2 font-semibold text-base-content">{konten.judul_konten}</h4>
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
                                    <p className="text-base-content/60">Belum ada konten yang dipublikasi</p>
                                </CardBody>
                            </Card>
                        )}
                    </div>

                    {/* Konten Populer */}
                    {kontenPopuler && kontenPopuler.length > 0 && (
                        <div>
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="flex items-center gap-2 text-2xl font-bold text-base-content">
                                    <TrendingUp className="h-6 w-6 text-primary" />
                                    Konten Populer
                                </h3>
                            </div>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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
                                                        <h4 className="mb-2 line-clamp-2 font-semibold text-base-content">{konten.judul_konten}</h4>
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
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

