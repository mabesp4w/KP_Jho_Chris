import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import Card, { CardBody } from '@/Components/ui/Card';
import Badge from '@/Components/ui/Badge';
import Button from '@/Components/ui/Button';
import { Calendar, ExternalLink, Eye, Heart, Search, X } from 'lucide-react';
import { useState } from 'react';

export default function UserKontenIndex({ auth, kontens, platforms, kategoris, tags, filters }) {
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const [selectedPlatform, setSelectedPlatform] = useState(filters.platform || '');
    const [selectedKategori, setSelectedKategori] = useState(filters.kategori || '');
    const [selectedTag, setSelectedTag] = useState(filters.tag || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('konten.index'), {
            search: searchQuery,
            platform: selectedPlatform,
            kategori: selectedKategori,
            tag: selectedTag,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleReset = () => {
        setSearchQuery('');
        setSelectedPlatform('');
        setSelectedKategori('');
        setSelectedTag('');
        router.get(route('konten.index'), {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="text-xl font-semibold leading-tight text-base-content">
                    Daftar Konten
                </h2>
            }
        >
            <Head title="Daftar Konten" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Search & Filter Section */}
                    <Card className="mb-6">
                        <CardBody>
                            <form onSubmit={handleSearch} className="space-y-4">
                                {/* Search Input */}
                                <div className="relative">
                                    <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-base-content/40" />
                                    <input
                                        type="text"
                                        placeholder="Cari konten berdasarkan judul, platform, atau kategori..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="input-bordered input w-full pl-12"
                                    />
                                </div>

                                {/* Filters */}
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    <div>
                                        <label className="label">
                                            <span className="label-text">Platform</span>
                                        </label>
                                        <select
                                            className="select-bordered select w-full"
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
                                    </div>
                                    <div>
                                        <label className="label">
                                            <span className="label-text">Kategori</span>
                                        </label>
                                        <select
                                            className="select-bordered select w-full"
                                            value={selectedKategori}
                                            onChange={(e) => setSelectedKategori(e.target.value)}
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
                                            <span className="label-text">Tag</span>
                                        </label>
                                        <select
                                            className="select-bordered select w-full"
                                            value={selectedTag}
                                            onChange={(e) => setSelectedTag(e.target.value)}
                                        >
                                            <option value="">Semua Tag</option>
                                            {tags?.map((tag) => (
                                                <option key={tag.id} value={tag.id}>
                                                    {tag.nm_tag}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-2">
                                    <Button type="submit" className="btn-primary">
                                        <Search className="mr-2 h-4 w-4" />
                                        Cari
                                    </Button>
                                    {(searchQuery || selectedPlatform || selectedKategori || selectedTag) && (
                                        <Button type="button" onClick={handleReset} className="btn-outline">
                                            <X className="mr-2 h-4 w-4" />
                                            Reset
                                        </Button>
                                    )}
                                </div>
                            </form>
                        </CardBody>
                    </Card>

                    {/* Results Count */}
                    {kontens.data && kontens.data.length > 0 && (
                        <div className="mb-4 text-sm text-base-content/60">
                            Menampilkan {kontens.data.length} dari {kontens.total} konten
                        </div>
                    )}

                    {/* Konten List */}
                    {kontens.data && kontens.data.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {kontens.data.map((konten) => {
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
                                                        {konten.tags.map((tag) => (
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

                            {/* Pagination */}
                            {kontens.links && kontens.links.length > 3 && (
                                <div className="mt-6 flex justify-center">
                                    <div className="join">
                                        {kontens.links.map((link, index) => (
                                            <Link
                                                key={index}
                                                href={link.url || '#'}
                                                className={`join-item btn ${link.active ? 'btn-active' : ''} ${!link.url ? 'btn-disabled' : ''}`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <Card>
                            <CardBody className="py-12 text-center">
                                <Search className="mx-auto mb-4 h-12 w-12 text-base-content/30" />
                                <p className="text-base-content/60">
                                    {searchQuery || selectedPlatform || selectedKategori || selectedTag
                                        ? 'Tidak ada konten yang sesuai dengan filter'
                                        : 'Belum ada konten yang dipublikasi'}
                                </p>
                                {(searchQuery || selectedPlatform || selectedKategori || selectedTag) && (
                                    <Button onClick={handleReset} className="btn-outline btn-sm mt-4">
                                        Reset Filter
                                    </Button>
                                )}
                            </CardBody>
                        </Card>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

