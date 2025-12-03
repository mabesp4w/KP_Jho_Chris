import { useEffect, useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Card, { CardBody, CardHeader, CardTitle } from '@/Components/ui/Card';
import Button from '@/Components/ui/Button';
import Badge from '@/Components/ui/Badge';
import { FileText, Download, FileSpreadsheet, FileType } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function LaporanIndex({ auth, kontens, platforms, kategoris, stats, kontenPerPlatform, filters }) {
    const [filterData, setFilterData] = useState({
        tanggal_mulai: filters.tanggal_mulai || '',
        tanggal_akhir: filters.tanggal_akhir || '',
        platform: filters.platform || '',
        kategori: filters.kategori || '',
        status: filters.status || '',
    });

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

    const handleFilter = (e) => {
        e.preventDefault();
        router.get(route('admin.laporan.index'), filterData, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleReset = () => {
        setFilterData({
            tanggal_mulai: '',
            tanggal_akhir: '',
            platform: '',
            kategori: '',
            status: '',
        });
        router.get(route('admin.laporan.index'), {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleExportExcel = () => {
        const params = new URLSearchParams();
        Object.keys(filterData).forEach(key => {
            if (filterData[key]) {
                params.append(key, filterData[key]);
            }
        });
        window.location.href = '/admin/laporan/export/excel?' + params.toString();
    };

    const handleExportPdf = () => {
        const params = new URLSearchParams();
        Object.keys(filterData).forEach(key => {
            if (filterData[key]) {
                params.append(key, filterData[key]);
            }
        });
        window.location.href = '/admin/laporan/export/pdf?' + params.toString();
    };

    const getStatusBadge = (status) => {
        const variants = {
            draft: 'warning',
            publikasi: 'success',
            arsip: 'error',
        };
        return <Badge variant={variants[status] || 'info'}>{ucfirst(status)}</Badge>;
    };

    const ucfirst = (str) => {
        return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
    };

    return (
        <AdminLayout
            auth={auth}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-base-content">
                        Laporan Konten
                    </h2>
                    <div className="flex gap-2">
                        <Button variant="success" onClick={handleExportExcel} className="btn-sm">
                            <FileSpreadsheet className="mr-2 h-4 w-4" />
                            Export Excel
                        </Button>
                        <Button variant="error" onClick={handleExportPdf} className="btn-sm">
                            <FileType className="mr-2 h-4 w-4" />
                            Export PDF
                        </Button>
                    </div>
                </div>
            }
        >
            <Head title="Laporan Konten" />

            <div className="mx-auto max-w-7xl">
                {/* Filter Section */}
                <Card className="mb-6" data-aos="fade-down">
                    <CardHeader>
                        <CardTitle>Filter Laporan</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <form onSubmit={handleFilter} className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                <div>
                                    <label className="label">
                                        <span className="label-text">Tanggal Mulai</span>
                                    </label>
                                    <input
                                        type="date"
                                        className="input-bordered input w-full"
                                        value={filterData.tanggal_mulai}
                                        onChange={(e) => setFilterData({ ...filterData, tanggal_mulai: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="label-text">Tanggal Akhir</span>
                                    </label>
                                    <input
                                        type="date"
                                        className="input-bordered input w-full"
                                        value={filterData.tanggal_akhir}
                                        onChange={(e) => setFilterData({ ...filterData, tanggal_akhir: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="label-text">Platform</span>
                                    </label>
                                    <select
                                        className="select-bordered select w-full"
                                        value={filterData.platform}
                                        onChange={(e) => setFilterData({ ...filterData, platform: e.target.value })}
                                    >
                                        <option value="">Semua Platform</option>
                                        {platforms?.map((platform) => (
                                            <option key={platform.id} value={platform.id}>
                                                {platform.nm_platform}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="label-text">Kategori</span>
                                    </label>
                                    <select
                                        className="select-bordered select w-full"
                                        value={filterData.kategori}
                                        onChange={(e) => setFilterData({ ...filterData, kategori: e.target.value })}
                                    >
                                        <option value="">Semua Kategori</option>
                                        {kategoris?.map((kategori) => (
                                            <option key={kategori.id} value={kategori.id}>
                                                {kategori.nm_kategori}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="label-text">Status</span>
                                    </label>
                                    <select
                                        className="select-bordered select w-full"
                                        value={filterData.status}
                                        onChange={(e) => setFilterData({ ...filterData, status: e.target.value })}
                                    >
                                        <option value="">Semua Status</option>
                                        <option value="draft">Draft</option>
                                        <option value="publikasi">Publikasi</option>
                                        <option value="arsip">Arsip</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button type="submit" variant="primary" className="btn-sm">
                                    <FileText className="mr-2 h-4 w-4" />
                                    Filter
                                </Button>
                                <Button type="button" onClick={handleReset} variant="outline" className="btn-sm">
                                    Reset
                                </Button>
                            </div>
                        </form>
                    </CardBody>
                </Card>

                {/* Statistics Cards */}
                {stats && (
                    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" data-aos="fade-up" data-aos-delay="100">
                        <Card>
                            <CardBody>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-base-content">{stats.totalKonten || 0}</p>
                                    <p className="text-sm text-base-content/60">Total Konten</p>
                                </div>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardBody>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-base-content">
                                        {stats.totalViews?.toLocaleString('id-ID') || 0}
                                    </p>
                                    <p className="text-sm text-base-content/60">Total Views</p>
                                </div>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardBody>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-base-content">
                                        {stats.totalLikes?.toLocaleString('id-ID') || 0}
                                    </p>
                                    <p className="text-sm text-base-content/60">Total Likes</p>
                                </div>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardBody>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-base-content">
                                        {stats.totalEngagement?.toLocaleString('id-ID') || 0}
                                    </p>
                                    <p className="text-sm text-base-content/60">Total Engagement</p>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                )}

                {/* Konten Per Platform */}
                {kontenPerPlatform && kontenPerPlatform.length > 0 && (
                    <Card className="mb-6" data-aos="fade-up" data-aos-delay="200">
                        <CardHeader>
                            <CardTitle>Konten Per Platform</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <div className="overflow-x-auto">
                                <table className="table table-zebra w-full">
                                    <thead>
                                        <tr>
                                            <th>Platform</th>
                                            <th className="text-center">Jumlah Konten</th>
                                            <th className="text-center">Total Views</th>
                                            <th className="text-center">Total Likes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {kontenPerPlatform.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.platform}</td>
                                                <td className="text-center">{item.count}</td>
                                                <td className="text-center">{item.views.toLocaleString('id-ID')}</td>
                                                <td className="text-center">{item.likes.toLocaleString('id-ID')}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardBody>
                    </Card>
                )}

                {/* Data Table */}
                <Card data-aos="fade-up" data-aos-delay="300">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Data Konten ({kontens?.length || 0} item)</CardTitle>
                            <div className="flex gap-2">
                                <Button variant="success" onClick={handleExportExcel} className="btn-sm">
                                    <FileSpreadsheet className="mr-2 h-4 w-4" />
                                    Excel
                                </Button>
                                <Button variant="error" onClick={handleExportPdf} className="btn-sm">
                                    <FileType className="mr-2 h-4 w-4" />
                                    PDF
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody>
                        {kontens && kontens.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="table table-zebra w-full">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Judul Konten</th>
                                            <th>Platform</th>
                                            <th>Kategori</th>
                                            <th>Tanggal Publikasi</th>
                                            <th>Status</th>
                                            <th className="text-center">Views</th>
                                            <th className="text-center">Likes</th>
                                            <th className="text-center">Komentar</th>
                                            <th className="text-center">Share</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {kontens.map((konten, index) => (
                                            <tr key={konten.id}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    <div className="max-w-xs truncate" title={konten.judul_konten}>
                                                        {konten.judul_konten}
                                                    </div>
                                                </td>
                                                <td>
                                                    <Badge variant="info">{konten.platform?.nm_platform || '-'}</Badge>
                                                </td>
                                                <td>{konten.kategori?.nm_kategori || '-'}</td>
                                                <td>
                                                    {konten.tgl_publikasi
                                                        ? new Date(konten.tgl_publikasi).toLocaleDateString('id-ID')
                                                        : '-'}
                                                </td>
                                                <td>{getStatusBadge(konten.status_konten)}</td>
                                                <td className="text-center">
                                                    {(konten.jml_views || 0).toLocaleString('id-ID')}
                                                </td>
                                                <td className="text-center">
                                                    {(konten.jml_likes || 0).toLocaleString('id-ID')}
                                                </td>
                                                <td className="text-center">
                                                    {(konten.jml_komentar || 0).toLocaleString('id-ID')}
                                                </td>
                                                <td className="text-center">
                                                    {(konten.jml_share || 0).toLocaleString('id-ID')}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr className="font-bold">
                                            <td colSpan="6" className="text-center">
                                                TOTAL
                                            </td>
                                            <td className="text-center">
                                                {(stats?.totalViews || 0).toLocaleString('id-ID')}
                                            </td>
                                            <td className="text-center">
                                                {(stats?.totalLikes || 0).toLocaleString('id-ID')}
                                            </td>
                                            <td className="text-center">
                                                {(stats?.totalKomentar || 0).toLocaleString('id-ID')}
                                            </td>
                                            <td className="text-center">
                                                {(stats?.totalShare || 0).toLocaleString('id-ID')}
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        ) : (
                            <div className="py-12 text-center">
                                <FileText className="mx-auto mb-4 h-12 w-12 text-base-content/30" />
                                <p className="text-base-content/60">Tidak ada data konten yang sesuai dengan filter</p>
                            </div>
                        )}
                    </CardBody>
                </Card>
            </div>
        </AdminLayout>
    );
}

