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

export default function PlatformIndex({ auth, platforms }) {
    const { flash } = usePage().props;
    const [deleteModal, setDeleteModal] = useState({ open: false, platform: null });
    const [formModal, setFormModal] = useState({ open: false, platform: null });
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
        });
        // Refresh AOS when platforms change
        AOS.refresh();
    }, [platforms]);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        nm_platform: '',
        icon_platform: null,
        status_aktif: true,
    });

    const [iconPreview, setIconPreview] = useState(null);

    // Filter platforms based on search query
    const filteredPlatforms = platforms.filter((platform) => {
        const query = searchQuery.toLowerCase();
        return (
            platform.nm_platform.toLowerCase().includes(query) ||
            (platform.status_aktif ? 'aktif' : 'nonaktif').includes(query)
        );
    });

    const handleDelete = (platform) => {
        setDeleteModal({ open: true, platform });
    };

    const confirmDelete = () => {
        if (deleteModal.platform) {
            // Use router.post with _method: DELETE for delete
            router.post(`/admin/platform/${deleteModal.platform.id}`, {
                _method: 'DELETE',
            }, {
                preserveScroll: true,
                onSuccess: () => {
                    setDeleteModal({ open: false, platform: null });
                },
            });
        }
    };

    const openCreateModal = () => {
        reset();
        setIconPreview(null);
        setFormModal({ open: true, platform: null });
    };

    const openEditModal = (platform) => {
        setData({
            nm_platform: platform.nm_platform,
            icon_platform: null,
            status_aktif: platform.status_aktif ?? true,
        });
        setIconPreview(platform.icon_platform ? `/storage/${platform.icon_platform}` : null);
        setFormModal({ open: true, platform });
    };

    const closeFormModal = () => {
        setFormModal({ open: false, platform: null });
        setIconPreview(null);
        reset();
    };

    const handleIconChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('icon_platform', file);
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setIconPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formModal.platform) {
            // Edit - create FormData with _method: PUT for file uploads
            const formData = new FormData();
            formData.append('_method', 'PUT');
            formData.append('nm_platform', data.nm_platform);
            if (data.icon_platform) {
                formData.append('icon_platform', data.icon_platform);
            }
            formData.append('status_aktif', data.status_aktif ? '1' : '0');

            // Use router.post with FormData directly
            router.post(`/admin/platform/${formModal.platform.id}`, formData, {
                preserveScroll: true,
                onSuccess: () => {
                    closeFormModal();
                },
            });
        } else {
            // Create
            post(route('admin.platform.store'), {
                preserveScroll: true,
                forceFormData: true,
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
                        Kelola Platform
                    </h2>
                    <Button variant="primary" onClick={openCreateModal}>
                        Tambah Platform
                    </Button>
                </div>
            }
        >
            <Head title="Kelola Platform" />

            <div className="mx-auto max-w-7xl">
                {/* Search Bar */}
                <div className="mb-6" data-aos="fade-down">
                    <SearchInput
                        placeholder="Cari platform..."
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

                    {filteredPlatforms.length === 0 ? (
                        <div data-aos="fade-up">
                            <Card>
                                <CardBody>
                                    <div className="text-center py-8">
                                        <p className="text-base-content/60 mb-4">
                                            {searchQuery ? 'Tidak ada platform yang sesuai dengan pencarian' : 'Belum ada data platform'}
                                        </p>
                                        {!searchQuery && (
                                            <Button variant="primary" onClick={openCreateModal}>
                                                Tambah Platform Pertama
                                            </Button>
                                        )}
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {filteredPlatforms.map((platform, index) => (
                                <div
                                    key={platform.id}
                                    data-aos="fade-up"
                                    data-aos-delay={index * 100}
                                >
                                    <Card className="h-full">
                                        <CardHeader>
                                            <div className="flex items-center justify-between">
                                                <CardTitle className="text-lg">{platform.nm_platform}</CardTitle>
                                                <Badge
                                                    variant={platform.status_aktif ? 'success' : 'error'}
                                                >
                                                    {platform.status_aktif ? 'Aktif' : 'Nonaktif'}
                                                </Badge>
                                            </div>
                                        </CardHeader>
                                        <CardBody>
                                            <div className="space-y-2">
                                                {platform.icon_platform && (
                                                    <div>
                                                        <span className="text-sm font-medium text-base-content/60">
                                                            Icon:
                                                        </span>
                                                        <div className="mt-1">
                                                            <img
                                                                src={`/storage/${platform.icon_platform}`}
                                                                alt={platform.nm_platform}
                                                                className="w-16 h-16 object-contain"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                                <div>
                                                    <span className="text-sm font-medium text-base-content/60">
                                                        Dibuat:
                                                    </span>
                                                    <p className="text-sm text-base-content">
                                                        {new Date(platform.created_at).toLocaleDateString('id-ID')}
                                                    </p>
                                                </div>
                                            </div>
                                        </CardBody>
                                        <CardActions>
                                            <button
                                                className="btn btn-warning btn-sm"
                                                onClick={() => openEditModal(platform)}
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
                                                onClick={() => handleDelete(platform)}
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
                id="delete-platform-modal"
                isOpen={deleteModal.open}
                onClose={() => setDeleteModal({ open: false, platform: null })}
                onConfirm={confirmDelete}
                title="Hapus Platform"
                message={`Apakah Anda yakin ingin menghapus platform "${deleteModal.platform?.nm_platform}"?`}
            />

            {/* Form Modal */}
            <Modal
                id="platform-form-modal"
                isOpen={formModal.open}
                onClose={closeFormModal}
                title={formModal.platform ? 'Edit Platform' : 'Tambah Platform'}
                size="lg"
            >
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">
                                    Nama Platform <span className="text-error">*</span>
                                </span>
                            </label>
                            <input
                                type="text"
                                placeholder="Contoh: YouTube, Instagram, TikTok"
                                className={`input input-bordered w-full ${errors.nm_platform ? 'input-error' : ''}`.trim()}
                                value={data.nm_platform}
                                onChange={(e) => setData('nm_platform', e.target.value)}
                                required
                                maxLength={50}
                            />
                            {errors.nm_platform && (
                                <label className="label">
                                    <span className="label-text-alt text-error">{errors.nm_platform}</span>
                                </label>
                            )}
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">
                                    Icon Platform <span className="text-error">*</span>
                                </span>
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                className={`file-input file-input-bordered w-full ${errors.icon_platform ? 'file-input-error' : ''}`.trim()}
                                onChange={handleIconChange}
                                required
                            />
                            {formModal.platform && iconPreview && !iconPreview.startsWith('data:') && (
                                <label className="label">
                                    <span className="label-text-alt text-info">
                                        Icon saat ini akan diganti dengan gambar baru
                                    </span>
                                </label>
                            )}
                            {errors.icon_platform && (
                                <label className="label">
                                    <span className="label-text-alt text-error">{errors.icon_platform}</span>
                                </label>
                            )}
                            {iconPreview && (
                                <div className="mt-2">
                                    <img
                                        src={iconPreview}
                                        alt="Preview"
                                        className="w-24 h-24 object-contain border border-base-300 rounded-lg"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="form-control">
                            <label className="label cursor-pointer justify-start gap-2">
                                <input
                                    type="checkbox"
                                    className="checkbox checkbox-primary"
                                    checked={data.status_aktif}
                                    onChange={(e) => setData('status_aktif', e.target.checked)}
                                />
                                <span className="label-text">Status Aktif</span>
                            </label>
                        </div>

                        <div className="modal-action">
                            <Button type="button" variant="ghost" onClick={closeFormModal} disabled={processing}>
                                Batal
                            </Button>
                            <Button type="submit" variant="primary" loading={processing}>
                                {formModal.platform ? 'Update Platform' : 'Simpan Platform'}
                            </Button>
                        </div>
                    </div>
                </form>
            </Modal>
        </AdminLayout>
    );
}

