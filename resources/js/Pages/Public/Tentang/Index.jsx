import { Link } from '@inertiajs/react';
import Card, { CardBody, CardHeader, CardTitle } from '@/Components/ui/Card';
import PublicLayout from '@/Layouts/PublicLayout';
import { Building2, MapPin, Phone, Mail, Users, Target, Award, Heart } from 'lucide-react';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function PublicTentangIndex({ auth }) {
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

    return (
        <PublicLayout 
            auth={auth} 
            title="Tentang Kami - Aplikasi Rekap Tahunan Link Konten Media Sosial"
            activeMenu="tentang"
        >
            {/* Page Content */}
            <div className="py-12">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        {/* Page Header */}
                        <div className="mb-12 text-center" data-aos="fade-up">
                            <h1 className="text-4xl font-bold text-base-content sm:text-5xl">Tentang Kami</h1>
                            <p className="mt-4 text-lg text-base-content/70">
                                Kantor Wilayah Kementerian Agama Provinsi Papua
                            </p>
                        </div>

                        {/* Hero Section */}
                        <div className="mb-16" data-aos="fade-up" data-aos-delay="100">
                            <Card>
                                <CardBody className="text-center py-12">
                                    <div className="mb-6 flex justify-center">
                                        <img 
                                            src="/images/logo.png" 
                                            alt="Logo Kanwil Kemenag Prov. Papua" 
                                            className="h-32 w-32 object-contain"
                                        />
                                    </div>
                                    <h2 className="mb-4 text-3xl font-bold text-base-content">
                                        Aplikasi Rekap Tahunan Link Konten Media Sosial
                                    </h2>
                                    <p className="mx-auto max-w-3xl text-lg leading-relaxed text-base-content/70">
                                        Sistem manajemen dan rekapitulasi konten media sosial untuk mengorganisir, melacak, 
                                        dan menganalisis konten media sosial Kanwil Kemenag Provinsi Papua di berbagai platform. 
                                        Aplikasi ini dirancang untuk memudahkan pengelolaan, pencarian, dan analisis konten media 
                                        sosial yang telah dipublikasi.
                                    </p>
                                </CardBody>
                            </Card>
                        </div>

                        {/* Tentang Kanwil Kemenag */}
                        <div className="mb-16" data-aos="fade-up" data-aos-delay="200">
                            <h2 className="mb-8 text-center text-3xl font-bold text-base-content">
                                Tentang Kanwil Kemenag Provinsi Papua
                            </h2>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Building2 className="h-6 w-6 text-primary" />
                                            Sejarah Singkat
                                        </CardTitle>
                                    </CardHeader>
                                    <CardBody>
                                        <p className="leading-relaxed text-base-content/80">
                                            Kantor Wilayah Kementerian Agama Provinsi Papua didirikan untuk melaksanakan tugas 
                                            dan fungsi Kementerian Agama di wilayah Papua. Kantor ini berperan dalam pembinaan 
                                            kehidupan beragama, pelayanan haji dan umrah, pendidikan agama, serta urusan keagamaan 
                                            lainnya di provinsi ini.
                                        </p>
                                    </CardBody>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Target className="h-6 w-6 text-primary" />
                                            Visi & Misi
                                        </CardTitle>
                                    </CardHeader>
                                    <CardBody>
                                        <p className="mb-4 font-semibold text-base-content">Visi:</p>
                                        <p className="mb-4 leading-relaxed text-base-content/80">
                                            Mewujudkan pelayanan keagamaan yang berkualitas dan memperkuat kerukunan umat beragama 
                                            di Provinsi Papua.
                                        </p>
                                        <p className="mb-2 font-semibold text-base-content">Misi:</p>
                                        <ul className="list-inside list-disc space-y-2 text-base-content/80">
                                            <li>Meningkatkan kualitas pelayanan keagamaan</li>
                                            <li>Memperkuat kerukunan umat beragama</li>
                                            <li>Meningkatkan profesionalisme aparatur sipil negara</li>
                                            <li>Mengembangkan pendidikan agama yang berkualitas</li>
                                        </ul>
                                    </CardBody>
                                </Card>
                            </div>
                        </div>

                        {/* Struktur Organisasi */}
                        <div className="mb-16" data-aos="fade-up" data-aos-delay="300">
                            <h2 className="mb-8 text-center text-3xl font-bold text-base-content">
                                Struktur Organisasi
                            </h2>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                <Card>
                                    <CardBody>
                                        <div className="mb-3 flex items-center gap-3">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                                <Users className="h-6 w-6 text-primary" />
                                            </div>
                                            <h3 className="font-semibold text-base-content">Bidang Pendidikan Madrasah</h3>
                                        </div>
                                        <p className="text-sm text-base-content/70">
                                            Mengelola pendidikan madrasah di wilayah Papua
                                        </p>
                                    </CardBody>
                                </Card>

                                <Card>
                                    <CardBody>
                                        <div className="mb-3 flex items-center gap-3">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                                <Award className="h-6 w-6 text-primary" />
                                            </div>
                                            <h3 className="font-semibold text-base-content">Bidang Pendidikan Agama Islam</h3>
                                        </div>
                                        <p className="text-sm text-base-content/70">
                                            Mengurus pendidikan agama Islam di sekolah umum
                                        </p>
                                    </CardBody>
                                </Card>

                                <Card>
                                    <CardBody>
                                        <div className="mb-3 flex items-center gap-3">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                                <Heart className="h-6 w-6 text-primary" />
                                            </div>
                                            <h3 className="font-semibold text-base-content">Bidang Urusan Agama Islam</h3>
                                        </div>
                                        <p className="text-sm text-base-content/70">
                                            Menangani urusan pernikahan, zakat, wakaf, dan lainnya
                                        </p>
                                    </CardBody>
                                </Card>

                                <Card>
                                    <CardBody>
                                        <div className="mb-3 flex items-center gap-3">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                                <Building2 className="h-6 w-6 text-primary" />
                                            </div>
                                            <h3 className="font-semibold text-base-content">Bidang Penyelenggaraan Haji dan Umrah</h3>
                                        </div>
                                        <p className="text-sm text-base-content/70">
                                            Mengelola pelaksanaan ibadah haji dan umrah
                                        </p>
                                    </CardBody>
                                </Card>

                                <Card>
                                    <CardBody>
                                        <div className="mb-3 flex items-center gap-3">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                                <Users className="h-6 w-6 text-primary" />
                                            </div>
                                            <h3 className="font-semibold text-base-content">Bidang Bimbingan Masyarakat</h3>
                                        </div>
                                        <p className="text-sm text-base-content/70">
                                            Membina kehidupan beragama bagi Kristen, Katolik, Hindu, Buddha, dan Khonghucu
                                        </p>
                                    </CardBody>
                                </Card>
                            </div>
                        </div>

                        {/* Program & Kegiatan */}
                        <div className="mb-16" data-aos="fade-up" data-aos-delay="400">
                            <h2 className="mb-8 text-center text-3xl font-bold text-base-content">
                                Program & Kegiatan
                            </h2>
                            <Card>
                                <CardBody>
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <div>
                                            <h3 className="mb-3 font-semibold text-base-content">Peningkatan Profesionalisme ASN</h3>
                                            <p className="text-base-content/70">
                                                Mendorong aparatur sipil negara untuk meningkatkan profesionalisme dalam 
                                                melayani masyarakat dengan lebih baik dan efisien.
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="mb-3 font-semibold text-base-content">Pelantikan Pejabat</h3>
                                            <p className="text-base-content/70">
                                                Melantik kepala kantor definitif di berbagai kabupaten untuk memperkuat 
                                                kinerja pelayanan publik dan pembinaan keagamaan.
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="mb-3 font-semibold text-base-content">Pembinaan Kehidupan Beragama</h3>
                                            <p className="text-base-content/70">
                                                Melakukan pembinaan dan pengembangan kehidupan beragama yang harmonis 
                                                di seluruh wilayah Provinsi Papua.
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="mb-3 font-semibold text-base-content">Pengembangan Pendidikan Agama</h3>
                                            <p className="text-base-content/70">
                                                Mengembangkan dan meningkatkan kualitas pendidikan agama di berbagai 
                                                jenjang pendidikan di Provinsi Papua.
                                            </p>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>

                        {/* Informasi Kontak */}
                        <div className="mb-16" data-aos="fade-up" data-aos-delay="500">
                            <h2 className="mb-8 text-center text-3xl font-bold text-base-content">
                                Informasi Kontak
                            </h2>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                <Card>
                                    <CardBody className="text-center">
                                        <div className="mb-4 flex justify-center">
                                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                                                <MapPin className="h-8 w-8 text-primary" />
                                            </div>
                                        </div>
                                        <h3 className="mb-2 font-semibold text-base-content">Alamat</h3>
                                        <p className="text-sm text-base-content/70">
                                            Kelurahan Entrop, Distrik Jayapura Selatan<br />
                                            Kota Jayapura, Provinsi Papua
                                        </p>
                                    </CardBody>
                                </Card>

                                <Card>
                                    <CardBody className="text-center">
                                        <div className="mb-4 flex justify-center">
                                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                                                <Phone className="h-8 w-8 text-primary" />
                                            </div>
                                        </div>
                                        <h3 className="mb-2 font-semibold text-base-content">Telepon</h3>
                                        <p className="text-sm text-base-content/70">
                                            Hubungi kami melalui kantor untuk informasi lebih lanjut
                                        </p>
                                    </CardBody>
                                </Card>

                                <Card>
                                    <CardBody className="text-center">
                                        <div className="mb-4 flex justify-center">
                                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                                                <Mail className="h-8 w-8 text-primary" />
                                            </div>
                                        </div>
                                        <h3 className="mb-2 font-semibold text-base-content">Email</h3>
                                        <p className="text-sm text-base-content/70">
                                            Informasi kontak lengkap dapat diperoleh melalui kantor
                                        </p>
                                    </CardBody>
                                </Card>
                            </div>
                        </div>

                        {/* Komitmen */}
                        <div className="mb-12" data-aos="fade-up" data-aos-delay="600">
                            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
                                <CardBody className="py-12 text-center">
                                    <h2 className="mb-4 text-2xl font-bold text-base-content">
                                        Komitmen Kami
                                    </h2>
                                    <p className="mx-auto max-w-3xl text-lg leading-relaxed text-base-content/80">
                                        Kanwil Kemenag Provinsi Papua berkomitmen untuk meningkatkan kualitas pelayanan keagamaan 
                                        dan memperkuat kerukunan umat beragama di wilayah Papua. Melalui berbagai program dan 
                                        kegiatan yang dilaksanakan, kami terus berupaya memberikan pelayanan terbaik bagi seluruh 
                                        masyarakat di Provinsi Papua.
                                    </p>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </div>
        </PublicLayout>
    );
}

