import { useEffect, useState } from 'react';
import { Head, router, usePage, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Card, { CardBody, CardHeader, CardTitle, CardActions } from '@/Components/ui/Card';
import Button from '@/Components/ui/Button';
import ConfirmDialog from '@/Components/modal/ConfirmDialog';
import Modal from '@/Components/modal/Modal';
import { SearchInput } from '@/Components/forms';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function TagIndex({ auth, tags }) {
    const { flash } = usePage().props;
    const [deleteModal, setDeleteModal] = useState({ open: false, tag: null });
    const [formModal, setFormModal] = useState({ open: false, tag: null });
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
        nm_tag: '',
        slug_tag: '',
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

    // Auto-generate slug when nm_tag changes
    useEffect(() => {
        if (data.nm_tag) {
            setData('slug_tag', generateSlug(data.nm_tag));
        }
    }, [data.nm_tag]);

    // Filter tags based on search query
    const filteredTags = tags.filter((tag) => {
        const query = searchQuery.toLowerCase();
        return (
            tag.nm_tag.toLowerCase().includes(query) ||
            tag.slug_tag.toLowerCase().includes(query)
        );
    });

    const handleDelete = (tag) => {
        setDeleteModal({ open: true, tag });
    };

    const confirmDelete = () => {
        if (deleteModal.tag) {
            // Use router.post with _method: DELETE for delete
            router.post(`/admin/tag/${deleteModal.tag.id}`, {
                _method: 'DELETE',
            }, {
                preserveScroll: true,
                onSuccess: () => {
                    setDeleteModal({ open: false, tag: null });
                },
            });
        }
    };

    const openCreateModal = () => {
        reset();
        setFormModal({ open: true, tag: null });
    };

    const openEditModal = (tag) => {
        setData({
            nm_tag: tag.nm_tag,
            slug_tag: tag.slug_tag || generateSlug(tag.nm_tag),
        });
        setFormModal({ open: true, tag });
    };

    const closeFormModal = () => {
        setFormModal({ open: false, tag: null });
        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formModal.tag) {
            // Use router.post with _method: PUT for update
            router.post(`/admin/tag/${formModal.tag.id}`, {
                _method: 'PUT',
                ...data,
            }, {
                preserveScroll: true,
                onSuccess: () => {
                    closeFormModal();
                },
            });
        } else {
            post(route('admin.tag.store'), {
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
                    <h2 className="text-xl font-semibold leading-tight text-base-content">Kelola Tag</h2>
                    <Button variant="primary" onClick={openCreateModal}>
                        Tambah Tag
                    </Button>
                </div>
            }
        >
            <Head title="Kelola Tag" />

            <div className="mx-auto max-w-7xl">
                {/* Search Bar */}
                <div className="mb-6" data-aos="fade-down">
                    <SearchInput
                        placeholder="Cari tag..."
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

                {filteredTags.length === 0 ? (
                    <div data-aos="fade-up">
                        <Card>
                            <CardBody>
                                <div className="text-center py-8">
                                    <p className="text-base-content/60 mb-4">
                                        {searchQuery ? 'Tidak ada tag yang sesuai dengan pencarian' : 'Belum ada data tag'}
                                    </p>
                                    {!searchQuery && (
                                        <Button variant="primary" onClick={openCreateModal}>
                                            Tambah Tag Pertama
                                        </Button>
                                    )}
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredTags.map((tag, index) => (
                            <div key={tag.id} data-aos="fade-up" data-aos-delay={index * 100}>
                                <Card className="h-full">
                                    <CardHeader>
                                        <CardTitle className="text-lg">{tag.nm_tag}</CardTitle>
                                    </CardHeader>
                                    <CardBody>
                                        <div className="space-y-2">
                                            <div>
                                                <span className="text-sm font-medium text-base-content/60">Slug:</span>
                                                <p className="text-sm text-base-content">{tag.slug_tag}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm font-medium text-base-content/60">Dibuat:</span>
                                                <p className="text-sm text-base-content">
                                                    {new Date(tag.created_at).toLocaleDateString('id-ID')}
                                                </p>
                                            </div>
                                        </div>
                                    </CardBody>
                                    <CardActions>
                                        <button
                                            className="btn btn-warning btn-sm"
                                            onClick={() => openEditModal(tag)}
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
                                            onClick={() => handleDelete(tag)}
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
                id="delete-tag-modal"
                isOpen={deleteModal.open}
                onClose={() => setDeleteModal({ open: false, tag: null })}
                onConfirm={confirmDelete}
                title="Hapus Tag"
                message={`Apakah Anda yakin ingin menghapus tag "${deleteModal.tag?.nm_tag}"?`}
            />

            <Modal
                id="tag-form-modal"
                isOpen={formModal.open}
                onClose={closeFormModal}
                title={formModal.tag ? 'Edit Tag' : 'Tambah Tag'}
                size="md"
            >
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">
                                    Nama Tag <span className="text-error">*</span>
                                </span>
                            </label>
                            <input
                                type="text"
                                placeholder="Contoh: tutorial, review, dance"
                                className={`input input-bordered w-full ${errors.nm_tag ? 'input-error' : ''}`.trim()}
                                value={data.nm_tag}
                                onChange={(e) => setData('nm_tag', e.target.value)}
                                required
                                maxLength={50}
                            />
                            {errors.nm_tag && (
                                <label className="label">
                                    <span className="label-text-alt text-error">{errors.nm_tag}</span>
                                </label>
                            )}
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Slug Tag</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Akan di-generate otomatis"
                                className={`input input-bordered w-full ${errors.slug_tag ? 'input-error' : ''}`.trim()}
                                value={data.slug_tag}
                                readOnly
                                maxLength={50}
                            />
                            {errors.slug_tag && (
                                <label className="label">
                                    <span className="label-text-alt text-error">{errors.slug_tag}</span>
                                </label>
                            )}
                        </div>

                        <div className="modal-action">
                            <Button type="button" variant="ghost" onClick={closeFormModal} disabled={processing}>
                                Batal
                            </Button>
                            <Button type="submit" variant="primary" loading={processing}>
                                {formModal.tag ? 'Update Tag' : 'Simpan Tag'}
                            </Button>
                        </div>
                    </div>
                </form>
            </Modal>
        </AdminLayout>
    );
}

