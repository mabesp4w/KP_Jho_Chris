import Button from '@/Components/ui/Button';
import Card, { CardBody, CardHeader, CardTitle } from '@/Components/ui/Card';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, useForm } from '@inertiajs/react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';

export default function PlatformForm({ auth, platform }) {
    const isEdit = !!platform;

    const { data, setData, post, put, processing, errors } = useForm({
        nm_platform: platform?.nm_platform || '',
        icon_platform: null,
        status_aktif: platform?.status_aktif ?? true,
    });

    const [iconPreview, setIconPreview] = useState(platform?.icon_platform ? `/storage/${platform.icon_platform}` : null);

    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
        });
    }, []);

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

    const onSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            // Use router.post with _method: PUT for file uploads
            const formData = new FormData();
            formData.append('_method', 'PUT');
            formData.append('nm_platform', data.nm_platform);
            if (data.icon_platform) {
                formData.append('icon_platform', data.icon_platform);
            }
            formData.append('status_aktif', data.status_aktif ? '1' : '0');

            router.post(`/admin/platform/${platform.id}`, formData, {
                preserveScroll: true,
            });
        } else {
            post(route('admin.platform.store'), {
                preserveScroll: true,
                forceFormData: true,
            });
        }
    };

    return (
        <AdminLayout
            auth={auth}
            header={<h2 className="text-xl leading-tight font-semibold text-base-content">{isEdit ? 'Edit Platform' : 'Tambah Platform'}</h2>}
        >
            <Head title={isEdit ? 'Edit Platform' : 'Tambah Platform'} />

            <div className="mx-auto max-w-4xl">
                <div data-aos="fade-up">
                    <Card>
                        <CardHeader>
                            <CardTitle>{isEdit ? 'Edit Data Platform' : 'Tambah Data Platform'}</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <form onSubmit={onSubmit}>
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
                                            className={`input-bordered input w-full ${errors.nm_platform ? 'input-error' : ''}`.trim()}
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
                                        {isEdit && iconPreview && !iconPreview.startsWith('data:') && (
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

                                    <div className="flex gap-4 pt-4">
                                        <Button type="submit" variant="primary" loading={processing} className="flex-1">
                                            {isEdit ? 'Update Platform' : 'Simpan Platform'}
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => router.visit(route('admin.platform.index'))}
                                            disabled={processing}
                                        >
                                            Batal
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}
