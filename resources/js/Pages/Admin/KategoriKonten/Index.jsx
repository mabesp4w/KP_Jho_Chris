import { useEffect, useState } from 'react';
import { Head, router, usePage, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Card, { CardBody, CardHeader, CardTitle, CardActions } from '@/Components/ui/Card';
import Button from '@/Components/ui/Button';
import Badge from '@/Components/ui/Badge';
import ConfirmDialog from '@/Components/modal/ConfirmDialog';
import Modal from '@/Components/modal/Modal';
import { SearchInput } from '@/Components/forms';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function KategoriKontenIndex({ auth, kategoriKontens }) {
    const { flash } = usePage().props;
    const [deleteModal, setDeleteModal] = useState({ open: false, kategoriKonten: null });
    const [formModal, setFormModal] = useState({ open: false, kategoriKonten: null });
    const [searchQuery, setSearchQuery] = useState('');

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
        nm_kategori: '',
        slug_kategori: '',
        desk_kategori: '',
    });

    // Function to generate slug from text
    const generateSlug = (text) => {
        return text
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '') // Remove special characters
            .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
            .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
    };

    // Auto-generate slug when nm_kategori changes
    useEffect(() => {
        if (data.nm_kategori) {
            setData('slug_kategori', generateSlug(data.nm_kategori));
        }
    }, [data.nm_kategori]);

    // Filter kategori kontens based on search query
    const filteredKategoriKontens = kategoriKontens.filter((kategori) => {
        const query = searchQuery.toLowerCase();
        return (
            kategori.nm_kategori.toLowerCase().includes(query) ||
            kategori.slug_kategori.toLowerCase().includes(query) ||
            (kategori.desk_kategori || '').toLowerCase().includes(query)
        );
    });

    const handleDelete = (kategoriKonten) => {
        setDeleteModal({ open: true, kategoriKonten });
    };

    const confirmDelete = () => {
        if (deleteModal.kategoriKonten) {
            // Use router.post with _method: DELETE for delete
            router.post(`/admin/kategori-konten/${deleteModal.kategoriKonten.id}`, {
                _method: 'DELETE',
            }, {
                preserveScroll: true,
                onSuccess: () => {
                    setDeleteModal({ open: false, kategoriKonten: null });
                },
            });
        }
    };

    const openCreateModal = () => {
        reset();
        setFormModal({ open: true, kategoriKonten: null });
    };

    const openEditModal = (kategoriKonten) => {
        setData({
            nm_kategori: kategoriKonten.nm_kategori,
            slug_kategori: kategoriKonten.slug_kategori || generateSlug(kategoriKonten.nm_kategori),
            desk_kategori: kategoriKonten.desk_kategori || '',
        });
        setFormModal({ open: true, kategoriKonten });
    };

    const closeFormModal = () => {
        setFormModal({ open: false, kategoriKonten: null });
        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formModal.kategoriKonten) {
            // Use router.post with _method: PUT for update
            router.post(`/admin/kategori-konten/${formModal.kategoriKonten.id}`, {
                _method: 'PUT',
                ...data,
            }, {
                preserveScroll: true,
                onSuccess: () => {
                    closeFormModal();
                },
            });
        } else {
            post(route('admin.kategori-konten.store'), {
                preserveScroll: true,
                onSuccess: () => {
                    closeFormModal();
                },
            });
        }
    };

    return (
        <AdminLayout
            auth={auth}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-base-content">
                        Kelola Kategori Konten
                    </h2>
                    <Button variant="primary" onClick={openCreateModal}>
                        Tambah Kategori
                    </Button>
                </div>
            }
        >
            <Head title="Kelola Kategori Konten" />

            <div className="mx-auto max-w-7xl">
                {/* Search Bar */}
                <div className="mb-6" data-aos="fade-down">
                    <SearchInput
                        placeholder="Cari kategori konten..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {flash?.success && (
                    <div data-aos="fade-down" className="mb-6">
                        <div className="alert alert-success">
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
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span>{flash.success}</span>
                        </div>
                    </div>
                )}

                {filteredKategoriKontens.length === 0 ? (
                    <div data-aos="fade-up">
                        <Card>
                            <CardBody>
                                <div className="text-center py-8">
                                    <p className="text-base-content/60 mb-4">
                                        {searchQuery ? 'Tidak ada kategori konten yang sesuai dengan pencarian' : 'Belum ada data kategori konten'}
                                    </p>
                                    {!searchQuery && (
                                        <Button variant="primary" onClick={openCreateModal}>
                                            Tambah Kategori Pertama
                                        </Button>
                                    )}
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredKategoriKontens.map((kategoriKonten, index) => (
                            <div key={kategoriKonten.id} data-aos="fade-up" data-aos-delay={index * 100}>
                                <Card className="h-full">
                                    <CardHeader>
                                        <CardTitle className="text-lg">{kategoriKonten.nm_kategori}</CardTitle>
                                    </CardHeader>
                                    <CardBody>
                                        <div className="space-y-2">
                                            <div>
                                                <span className="text-sm font-medium text-base-content/60">Slug:</span>
                                                <p className="text-sm text-base-content">{kategoriKonten.slug_kategori}</p>
                                            </div>
                                            {kategoriKonten.desk_kategori && (
                                                <div>
                                                    <span className="text-sm font-medium text-base-content/60">
                                                        Deskripsi:
                                                    </span>
                                                    <p className="text-sm text-base-content">
                                                        {kategoriKonten.desk_kategori}
                                                    </p>
                                                </div>
                                            )}
                                            <div>
                                                <span className="text-sm font-medium text-base-content/60">Dibuat:</span>
                                                <p className="text-sm text-base-content">
                                                    {new Date(kategoriKonten.created_at).toLocaleDateString('id-ID')}
                                                </p>
                                            </div>
                                        </div>
                                    </CardBody>
                                    <CardActions>
                                        <button
                                            className="btn btn-warning btn-sm"
                                            onClick={() => openEditModal(kategoriKonten)}
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
                                            className="btn btn-error btn-sm"
                                            onClick={() => handleDelete(kategoriKonten)}
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
                                    </CardActions>
                                </Card>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <ConfirmDialog
                id="delete-kategori-modal"
                isOpen={deleteModal.open}
                onClose={() => setDeleteModal({ open: false, kategoriKonten: null })}
                onConfirm={confirmDelete}
                title="Hapus Kategori Konten"
                message={`Apakah Anda yakin ingin menghapus kategori "${deleteModal.kategoriKonten?.nm_kategori}"?`}
            />

            <Modal
                id="kategori-form-modal"
                isOpen={formModal.open}
                onClose={closeFormModal}
                title={formModal.kategoriKonten ? 'Edit Kategori Konten' : 'Tambah Kategori Konten'}
                size="lg"
            >
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">
                                    Nama Kategori <span className="text-error">*</span>
                                </span>
                            </label>
                            <input
                                type="text"
                                placeholder="Contoh: Tutorial, Review Produk, Dance"
                                className={`input input-bordered w-full ${errors.nm_kategori ? 'input-error' : ''}`.trim()}
                                value={data.nm_kategori}
                                onChange={(e) => setData('nm_kategori', e.target.value)}
                                required
                                maxLength={100}
                            />
                            {errors.nm_kategori && (
                                <label className="label">
                                    <span className="label-text-alt text-error">{errors.nm_kategori}</span>
                                </label>
                            )}
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Slug Kategori</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Akan di-generate otomatis"
                                className={`input input-bordered w-full ${errors.slug_kategori ? 'input-error' : ''}`.trim()}
                                value={data.slug_kategori}
                                readOnly
                                maxLength={100}
                            />
                            {errors.slug_kategori && (
                                <label className="label">
                                    <span className="label-text-alt text-error">{errors.slug_kategori}</span>
                                </label>
                            )}
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Deskripsi</span>
                            </label>
                            <textarea
                                className={`textarea textarea-bordered ${errors.desk_kategori ? 'textarea-error' : ''}`.trim()}
                                placeholder="Deskripsi kategori..."
                                value={data.desk_kategori}
                                onChange={(e) => setData('desk_kategori', e.target.value)}
                                rows={3}
                            />
                            {errors.desk_kategori && (
                                <label className="label">
                                    <span className="label-text-alt text-error">{errors.desk_kategori}</span>
                                </label>
                            )}
                        </div>

                        <div className="modal-action">
                            <Button type="button" variant="ghost" onClick={closeFormModal} disabled={processing}>
                                Batal
                            </Button>
                            <Button type="submit" variant="primary" loading={processing}>
                                {formModal.kategoriKonten ? 'Update Kategori' : 'Simpan Kategori'}
                            </Button>
                        </div>
                    </div>
                </form>
            </Modal>
        </AdminLayout>
    );
}

