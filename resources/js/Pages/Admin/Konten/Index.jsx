import { SearchInput } from '@/Components/forms';
import ConfirmDialog from '@/Components/modal/ConfirmDialog';
import Modal from '@/Components/modal/Modal';
import Badge from '@/Components/ui/Badge';
import Button from '@/Components/ui/Button';
import Card, { CardBody } from '@/Components/ui/Card';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';

export default function KontenIndex({ auth, kontens, platforms, kategoriKontens, tags }) {
    const { flash } = usePage().props;
    const [deleteModal, setDeleteModal] = useState({ open: false, konten: null });
    const [formModal, setFormModal] = useState({ open: false, konten: null });
    const [detailModal, setDetailModal] = useState({ open: false, konten: null });
    const [searchQuery, setSearchQuery] = useState('');
    const [filterTahun, setFilterTahun] = useState('');
    const [filterBulan, setFilterBulan] = useState('');
    const [filterKategori, setFilterKategori] = useState('');

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

    const { data, setData, post, put, processing, errors, reset } = useForm({
        id_platform: '',
        id_kategori: '',
        judul_konten: '',
        link_konten: '',
        tgl_publikasi: new Date().toISOString().split('T')[0],
        catatan: '',
        status_konten: 'publikasi',
        perlu_promosi: false,
        kolaborasi: false,
        kolaborasi_dengan: '',
        jml_views: '',
        jml_likes: '',
        jml_komentar: '',
        jml_share: '',
        tags: [],
    });

    // Get unique years from kontens
    const uniqueYears = [
        ...new Set(kontens.map((konten) => (konten.tgl_publikasi ? new Date(konten.tgl_publikasi).getFullYear() : null)).filter(Boolean)),
    ].sort((a, b) => b - a);

    // Filter kontens based on search query and filters
    const filteredKontens = kontens.filter((konten) => {
        // Search query filter
        const query = searchQuery.toLowerCase();
        const matchesSearch =
            !searchQuery ||
            konten.judul_konten.toLowerCase().includes(query) ||
            konten.link_konten.toLowerCase().includes(query) ||
            konten.platform?.nm_platform.toLowerCase().includes(query) ||
            konten.kategori?.nm_kategori.toLowerCase().includes(query) ||
            konten.status_konten.toLowerCase().includes(query) ||
            konten.tags?.some((tag) => tag.nm_tag.toLowerCase().includes(query));

        // Tahun filter
        const kontenTahun = konten.tgl_publikasi ? new Date(konten.tgl_publikasi).getFullYear() : null;
        const matchesTahun = !filterTahun || kontenTahun === parseInt(filterTahun);

        // Bulan filter
        const kontenBulan = konten.tgl_publikasi ? new Date(konten.tgl_publikasi).getMonth() + 1 : null;
        const matchesBulan = !filterBulan || kontenBulan === parseInt(filterBulan);

        // Kategori filter
        const matchesKategori = !filterKategori || konten.id_kategori === parseInt(filterKategori);

        return matchesSearch && matchesTahun && matchesBulan && matchesKategori;
    });

    const handleDelete = (konten) => {
        setDeleteModal({ open: true, konten });
    };

    const openDetailModal = (konten) => {
        setDetailModal({ open: true, konten });
    };

    const closeDetailModal = () => {
        setDetailModal({ open: false, konten: null });
    };

    const confirmDelete = () => {
        if (deleteModal.konten) {
            // Use router.post with _method: DELETE for delete
            router.post(
                `/admin/konten/${deleteModal.konten.id}`,
                {
                    _method: 'DELETE',
                },
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        setDeleteModal({ open: false, konten: null });
                    },
                },
            );
        }
    };

    const openCreateModal = () => {
        reset();
        setFormModal({ open: true, konten: null });
    };

    const openEditModal = (konten) => {
        const tglPublikasi = konten.tgl_publikasi
            ? new Date(konten.tgl_publikasi).toISOString().split('T')[0]
            : new Date().toISOString().split('T')[0];

        setData({
            id_platform: konten.id_platform,
            id_kategori: konten.id_kategori || '',
            judul_konten: konten.judul_konten,
            link_konten: konten.link_konten,
            tgl_publikasi: tglPublikasi,
            catatan: konten.catatan || '',
            status_konten: konten.status_konten || 'publikasi',
            perlu_promosi: konten.perlu_promosi || false,
            kolaborasi: konten.kolaborasi || false,
            kolaborasi_dengan: konten.kolaborasi_dengan || '',
            jml_views: konten.jml_views || '',
            jml_likes: konten.jml_likes || '',
            jml_komentar: konten.jml_komentar || '',
            jml_share: konten.jml_share || '',
            tags: konten.tags?.map((tag) => tag.id) || [],
        });
        setFormModal({ open: true, konten });
    };

    const closeFormModal = () => {
        setFormModal({ open: false, konten: null });
        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formModal.konten) {
            // Use router.post with _method: PUT for update
            router.post(
                `/admin/konten/${formModal.konten.id}`,
                {
                    _method: 'PUT',
                    ...data,
                },
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        closeFormModal();
                    },
                },
            );
        } else {
            post(
                route('admin.konten.store'),
                {
                    ...data,
                },
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        closeFormModal();
                    },
                },
            );
        }
    };

    const getStatusBadge = (status) => {
        const variants = {
            draft: 'warning',
            publikasi: 'success',
            arsip: 'error',
        };
        return variants[status] || 'info';
    };

    const handleTagToggle = (tagId) => {
        const currentTags = data.tags || [];
        // Ensure tagId is a number for consistent comparison
        const tagIdNum = Number(tagId);

        // Remove duplicates and filter out invalid values
        const cleanTags = currentTags.map((id) => Number(id)).filter((id) => !isNaN(id) && id > 0);

        if (cleanTags.includes(tagIdNum)) {
            // Remove tag
            setData(
                'tags',
                cleanTags.filter((id) => id !== tagIdNum),
            );
        } else {
            // Add tag (ensure no duplicates)
            const newTags = [...cleanTags, tagIdNum];
            setData('tags', [...new Set(newTags)]); // Remove any duplicates
        }
    };

    return (
        <AdminLayout
            auth={auth}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl leading-tight font-semibold text-base-content">Kelola Konten</h2>
                    <Button variant="primary" onClick={openCreateModal}>
                        Tambah Konten
                    </Button>
                </div>
            }
        >
            <Head title="Kelola Konten" />

            <div className="mx-auto max-w-7xl">
                {/* Search Bar */}
                <div className="mb-6" data-aos="fade-down">
                    <SearchInput
                        placeholder="Cari konten (judul, platform, kategori, status, tag)..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Filters */}
                <div className="mb-6" data-aos="fade-down">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Filter Tahun</span>
                            </label>
                            <select className="select-bordered select w-full" value={filterTahun} onChange={(e) => setFilterTahun(e.target.value)}>
                                <option value="">Semua Tahun</option>
                                {uniqueYears.map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Filter Bulan</span>
                            </label>
                            <select className="select-bordered select w-full" value={filterBulan} onChange={(e) => setFilterBulan(e.target.value)}>
                                <option value="">Semua Bulan</option>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month) => (
                                    <option key={month} value={month}>
                                        {new Date(2000, month - 1).toLocaleDateString('id-ID', { month: 'long' })}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Filter Kategori</span>
                            </label>
                            <select
                                className="select-bordered select w-full"
                                value={filterKategori}
                                onChange={(e) => setFilterKategori(e.target.value)}
                            >
                                <option value="">Semua Kategori</option>
                                {kategoriKontens.map((kategori) => (
                                    <option key={kategori.id} value={kategori.id}>
                                        {kategori.nm_kategori}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Reset Filters Button */}
                    {(filterTahun || filterBulan || filterKategori) && (
                        <div className="mt-4 flex justify-end">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                    setFilterTahun('');
                                    setFilterBulan('');
                                    setFilterKategori('');
                                }}
                            >
                                Reset Filter
                            </Button>
                        </div>
                    )}
                </div>

                {flash?.success && (
                    <div data-aos="fade-down" className="mb-6">
                        <div className="alert alert-success">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span>{flash.success}</span>
                        </div>
                    </div>
                )}

                {filteredKontens.length === 0 ? (
                    <div data-aos="fade-up">
                        <Card>
                            <CardBody>
                                <div className="py-8 text-center">
                                    <p className="mb-4 text-base-content/60">
                                        {searchQuery ? 'Tidak ada konten yang sesuai dengan pencarian' : 'Belum ada data konten'}
                                    </p>
                                    {!searchQuery && (
                                        <Button variant="primary" onClick={openCreateModal}>
                                            Tambah Konten Pertama
                                        </Button>
                                    )}
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                ) : (
                    <div data-aos="fade-up">
                        <Card>
                            <CardBody>
                                <div className="overflow-x-auto">
                                    <table className="table w-full">
                                        <thead>
                                            <tr>
                                                <th>Judul</th>
                                                <th>Platform</th>
                                                <th>Kategori</th>
                                                <th>Status</th>
                                                <th>Tanggal Publikasi</th>
                                                <th>Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredKontens.map((konten) => (
                                                <tr key={konten.id}>
                                                    <td>
                                                        <div className="font-medium">{konten.judul_konten}</div>
                                                        {konten.tags && konten.tags.length > 0 && (
                                                            <div className="mt-1 flex flex-wrap gap-1">
                                                                {konten.tags.map((tag) => (
                                                                    <Badge key={tag.id} variant="info" className="text-xs">
                                                                        {tag.nm_tag}
                                                                    </Badge>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td>{konten.platform?.nm_platform || '-'}</td>
                                                    <td>{konten.kategori?.nm_kategori || '-'}</td>
                                                    <td>
                                                        <Badge variant={getStatusBadge(konten.status_konten)}>{konten.status_konten}</Badge>
                                                    </td>
                                                    <td>
                                                        {konten.tgl_publikasi
                                                            ? new Date(konten.tgl_publikasi).toLocaleDateString('id-ID', {
                                                                  year: 'numeric',
                                                                  month: 'long',
                                                                  day: 'numeric',
                                                              })
                                                            : '-'}
                                                    </td>
                                                    <td>
                                                        <div className="flex gap-2">
                                                            <button
                                                                className="btn btn-sm btn-primary"
                                                                onClick={() => openDetailModal(konten)}
                                                                title="Detail"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="h-4 w-4"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={2}
                                                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                                    />
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={2}
                                                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                                    />
                                                                </svg>
                                                            </button>
                                                            <button
                                                                className="btn btn-sm btn-warning"
                                                                onClick={() => openEditModal(konten)}
                                                                title="Edit"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="h-4 w-4"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={2}
                                                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                                    />
                                                                </svg>
                                                            </button>
                                                            <button
                                                                className="btn btn-sm btn-error"
                                                                onClick={() => handleDelete(konten)}
                                                                title="Hapus"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="h-4 w-4"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={2}
                                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                )}
            </div>

            <ConfirmDialog
                id="delete-konten-modal"
                isOpen={deleteModal.open}
                onClose={() => setDeleteModal({ open: false, konten: null })}
                onConfirm={confirmDelete}
                title="Hapus Konten"
                message={`Apakah Anda yakin ingin menghapus konten "${deleteModal.konten?.judul_konten}"?`}
            />

            {/* Detail Modal */}
            <Modal id="konten-detail-modal" isOpen={detailModal.open} onClose={closeDetailModal} title="Detail Konten" size="3xl">
                {detailModal.konten && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <label className="text-sm font-medium text-base-content/60">Judul Konten</label>
                                <p className="font-semibold text-base-content">{detailModal.konten.judul_konten}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-base-content/60">Status</label>
                                <div className="mt-1">
                                    <Badge variant={getStatusBadge(detailModal.konten.status_konten)}>{detailModal.konten.status_konten}</Badge>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <label className="text-sm font-medium text-base-content/60">Platform</label>
                                <p className="text-base-content">{detailModal.konten.platform?.nm_platform || '-'}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-base-content/60">Kategori</label>
                                <p className="text-base-content">{detailModal.konten.kategori?.nm_kategori || '-'}</p>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-base-content/60">Link Konten</label>
                            <p className="break-all text-base-content">
                                <a href={detailModal.konten.link_konten} target="_blank" rel="noopener noreferrer" className="link link-primary">
                                    {detailModal.konten.link_konten}
                                </a>
                            </p>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-base-content/60">Tanggal Publikasi</label>
                            <p className="text-base-content">
                                {detailModal.konten.tgl_publikasi
                                    ? new Date(detailModal.konten.tgl_publikasi).toLocaleDateString('id-ID', {
                                          year: 'numeric',
                                          month: 'long',
                                          day: 'numeric',
                                      })
                                    : '-'}
                            </p>
                        </div>

                        {detailModal.konten.tags && detailModal.konten.tags.length > 0 && (
                            <div>
                                <label className="text-sm font-medium text-base-content/60">Tags</label>
                                <div className="mt-1 flex flex-wrap gap-2">
                                    {detailModal.konten.tags.map((tag) => (
                                        <Badge key={tag.id} variant="info">
                                            {tag.nm_tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        {detailModal.konten.catatan && (
                            <div>
                                <label className="text-sm font-medium text-base-content/60">Catatan</label>
                                <p className="whitespace-pre-wrap text-base-content">{detailModal.konten.catatan}</p>
                            </div>
                        )}

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <label className="text-sm font-medium text-base-content/60">Perlu Promosi</label>
                                <p className="text-base-content">
                                    {detailModal.konten.perlu_promosi ? <Badge variant="success">Ya</Badge> : <Badge variant="error">Tidak</Badge>}
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-base-content/60">Kolaborasi</label>
                                <p className="text-base-content">
                                    {detailModal.konten.kolaborasi ? <Badge variant="success">Ya</Badge> : <Badge variant="error">Tidak</Badge>}
                                </p>
                            </div>
                        </div>

                        {detailModal.konten.kolaborasi && detailModal.konten.kolaborasi_dengan && (
                            <div>
                                <label className="text-sm font-medium text-base-content/60">Kolaborasi Dengan</label>
                                <p className="text-base-content">{detailModal.konten.kolaborasi_dengan}</p>
                            </div>
                        )}

                        <div className="divider">Metrik Engagement</div>

                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                            <div>
                                <label className="text-sm font-medium text-base-content/60">Views</label>
                                <p className="text-lg font-semibold text-base-content">
                                    {detailModal.konten.jml_views?.toLocaleString('id-ID') || '0'}
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-base-content/60">Likes</label>
                                <p className="text-lg font-semibold text-base-content">
                                    {detailModal.konten.jml_likes?.toLocaleString('id-ID') || '0'}
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-base-content/60">Komentar</label>
                                <p className="text-lg font-semibold text-base-content">
                                    {detailModal.konten.jml_komentar?.toLocaleString('id-ID') || '0'}
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-base-content/60">Share</label>
                                <p className="text-lg font-semibold text-base-content">
                                    {detailModal.konten.jml_share?.toLocaleString('id-ID') || '0'}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 border-t pt-4 md:grid-cols-2">
                            <div>
                                <label className="text-sm font-medium text-base-content/60">Dibuat</label>
                                <p className="text-base-content">
                                    {new Date(detailModal.konten.created_at).toLocaleDateString('id-ID', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-base-content/60">Diperbarui</label>
                                <p className="text-base-content">
                                    {new Date(detailModal.konten.updated_at).toLocaleDateString('id-ID', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </p>
                            </div>
                        </div>

                        <div className="modal-action">
                            <Button type="button" variant="ghost" onClick={closeDetailModal}>
                                Tutup
                            </Button>
                        </div>
                    </div>
                )}
            </Modal>

            <Modal
                id="konten-form-modal"
                isOpen={formModal.open}
                onClose={closeFormModal}
                title={formModal.konten ? 'Edit Konten' : 'Tambah Konten'}
                size="3xl"
            >
                <form onSubmit={handleSubmit}>
                    <div className="max-h-[70vh] space-y-4 overflow-y-auto pr-2">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">
                                        Platform <span className="text-error">*</span>
                                    </span>
                                </label>
                                <select
                                    className={`select-bordered select w-full ${errors.id_platform ? 'select-error' : ''}`.trim()}
                                    value={data.id_platform}
                                    onChange={(e) => setData('id_platform', e.target.value)}
                                    required
                                >
                                    <option value="">Pilih Platform</option>
                                    {platforms.map((platform) => (
                                        <option key={platform.id} value={platform.id}>
                                            {platform.nm_platform}
                                        </option>
                                    ))}
                                </select>
                                {errors.id_platform && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.id_platform}</span>
                                    </label>
                                )}
                            </div>

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Kategori</span>
                                </label>
                                <select
                                    className={`select-bordered select w-full ${errors.id_kategori ? 'select-error' : ''}`.trim()}
                                    value={data.id_kategori}
                                    onChange={(e) => setData('id_kategori', e.target.value)}
                                >
                                    <option value="">Pilih Kategori</option>
                                    {kategoriKontens.map((kategori) => (
                                        <option key={kategori.id} value={kategori.id}>
                                            {kategori.nm_kategori}
                                        </option>
                                    ))}
                                </select>
                                {errors.id_kategori && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.id_kategori}</span>
                                    </label>
                                )}
                            </div>
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">
                                    Judul Konten <span className="text-error">*</span>
                                </span>
                            </label>
                            <input
                                type="text"
                                className={`input-bordered input w-full ${errors.judul_konten ? 'input-error' : ''}`.trim()}
                                value={data.judul_konten}
                                onChange={(e) => setData('judul_konten', e.target.value)}
                                required
                            />
                            {errors.judul_konten && (
                                <label className="label">
                                    <span className="label-text-alt text-error">{errors.judul_konten}</span>
                                </label>
                            )}
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">
                                    Link Konten <span className="text-error">*</span>
                                </span>
                            </label>
                            <input
                                type="url"
                                className={`input-bordered input w-full ${errors.link_konten ? 'input-error' : ''}`.trim()}
                                value={data.link_konten}
                                onChange={(e) => setData('link_konten', e.target.value)}
                                required
                            />
                            {errors.link_konten && (
                                <label className="label">
                                    <span className="label-text-alt text-error">{errors.link_konten}</span>
                                </label>
                            )}
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">
                                    Tanggal Publikasi <span className="text-error">*</span>
                                </span>
                            </label>
                            <input
                                type="date"
                                className={`input-bordered input w-full ${errors.tgl_publikasi ? 'input-error' : ''}`.trim()}
                                value={data.tgl_publikasi}
                                onChange={(e) => setData('tgl_publikasi', e.target.value)}
                                required
                            />
                            {errors.tgl_publikasi && (
                                <label className="label">
                                    <span className="label-text-alt text-error">{errors.tgl_publikasi}</span>
                                </label>
                            )}
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">
                                    Tags {tags.length > 0 && <span className="text-xs text-base-content/60">({tags.length} tersedia)</span>}
                                </span>
                            </label>
                            <div className="flex min-h-[80px] flex-wrap gap-2 rounded-lg border border-base-300 bg-base-200/50 p-3">
                                {!tags || tags.length === 0 ? (
                                    <div className="w-full py-4 text-center">
                                        <p className="mb-2 text-sm text-base-content/60">Tidak ada tag tersedia.</p>
                                        <Button
                                            type="button"
                                            variant="primary"
                                            size="sm"
                                            onClick={() => {
                                                closeFormModal();
                                                router.visit(route('admin.tag.index'));
                                            }}
                                        >
                                            Buat Tag
                                        </Button>
                                    </div>
                                ) : (
                                    tags.map((tag) => (
                                        <label
                                            key={tag.id}
                                            className="flex cursor-pointer items-center gap-2 rounded-lg bg-base-100 px-3 py-2 shadow-sm transition-colors hover:bg-base-200"
                                        >
                                            <input
                                                type="checkbox"
                                                className="checkbox checkbox-sm checkbox-primary"
                                                checked={data.tags?.includes(tag.id) || false}
                                                onChange={() => handleTagToggle(tag.id)}
                                            />
                                            <span className="text-sm font-medium">{tag.nm_tag}</span>
                                        </label>
                                    ))
                                )}
                            </div>
                            {data.tags && data.tags.length > 0 && (
                                <label className="label">
                                    <span className="label-text-alt text-info">{data.tags.length} tag dipilih</span>
                                </label>
                            )}
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">
                                    Status Konten <span className="text-error">*</span>
                                </span>
                            </label>
                            <select
                                className={`select-bordered select w-full ${errors.status_konten ? 'select-error' : ''}`.trim()}
                                value={data.status_konten}
                                onChange={(e) => setData('status_konten', e.target.value)}
                                required
                            >
                                <option value="draft">Draft</option>
                                <option value="publikasi">Publikasi</option>
                                <option value="arsip">Arsip</option>
                            </select>
                            {errors.status_konten && (
                                <label className="label">
                                    <span className="label-text-alt text-error">{errors.status_konten}</span>
                                </label>
                            )}
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Catatan</span>
                            </label>
                            <textarea
                                className={`textarea-bordered textarea ${errors.catatan ? 'textarea-error' : ''}`.trim()}
                                value={data.catatan}
                                onChange={(e) => setData('catatan', e.target.value)}
                                rows={3}
                            />
                            {errors.catatan && (
                                <label className="label">
                                    <span className="label-text-alt text-error">{errors.catatan}</span>
                                </label>
                            )}
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="form-control">
                                <label className="label cursor-pointer justify-start gap-2">
                                    <input
                                        type="checkbox"
                                        className="checkbox checkbox-primary"
                                        checked={data.perlu_promosi}
                                        onChange={(e) => setData('perlu_promosi', e.target.checked)}
                                    />
                                    <span className="label-text">Perlu Promosi</span>
                                </label>
                            </div>

                            <div className="form-control">
                                <label className="label cursor-pointer justify-start gap-2">
                                    <input
                                        type="checkbox"
                                        className="checkbox checkbox-primary"
                                        checked={data.kolaborasi}
                                        onChange={(e) => setData('kolaborasi', e.target.checked)}
                                    />
                                    <span className="label-text">Kolaborasi</span>
                                </label>
                            </div>
                        </div>

                        {data.kolaborasi && (
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Kolaborasi Dengan</span>
                                </label>
                                <input
                                    type="text"
                                    className={`input-bordered input w-full ${errors.kolaborasi_dengan ? 'input-error' : ''}`.trim()}
                                    value={data.kolaborasi_dengan}
                                    onChange={(e) => setData('kolaborasi_dengan', e.target.value)}
                                />
                                {errors.kolaborasi_dengan && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.kolaborasi_dengan}</span>
                                    </label>
                                )}
                            </div>
                        )}

                        <div className="divider">Metrik Engagement (Opsional)</div>

                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Views</span>
                                </label>
                                <input
                                    type="number"
                                    className={`input-bordered input w-full ${errors.jml_views ? 'input-error' : ''}`.trim()}
                                    value={data.jml_views}
                                    onChange={(e) => setData('jml_views', e.target.value ? parseInt(e.target.value) : '')}
                                    min="0"
                                />
                            </div>

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Likes</span>
                                </label>
                                <input
                                    type="number"
                                    className={`input-bordered input w-full ${errors.jml_likes ? 'input-error' : ''}`.trim()}
                                    value={data.jml_likes}
                                    onChange={(e) => setData('jml_likes', e.target.value ? parseInt(e.target.value) : '')}
                                    min="0"
                                />
                            </div>

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Komentar</span>
                                </label>
                                <input
                                    type="number"
                                    className={`input-bordered input w-full ${errors.jml_komentar ? 'input-error' : ''}`.trim()}
                                    value={data.jml_komentar}
                                    onChange={(e) => setData('jml_komentar', e.target.value ? parseInt(e.target.value) : '')}
                                    min="0"
                                />
                            </div>

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Share</span>
                                </label>
                                <input
                                    type="number"
                                    className={`input-bordered input w-full ${errors.jml_share ? 'input-error' : ''}`.trim()}
                                    value={data.jml_share}
                                    onChange={(e) => setData('jml_share', e.target.value ? parseInt(e.target.value) : '')}
                                    min="0"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="modal-action mt-4">
                        <Button type="button" variant="ghost" onClick={closeFormModal} disabled={processing}>
                            Batal
                        </Button>
                        <Button type="submit" variant="primary" loading={processing}>
                            {formModal.konten ? 'Update Konten' : 'Simpan Konten'}
                        </Button>
                    </div>
                </form>
            </Modal>
        </AdminLayout>
    );
}
