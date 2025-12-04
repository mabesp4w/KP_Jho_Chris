# Dokumentasi Fungsi Halaman Aplikasi

## Aplikasi Rekap Tahunan Link Konten Media Sosial - Kanwil Kemenag Prov. Papua

---

## 📋 DAFTAR ISI

1. [Halaman Publik (Tanpa Login)](#halaman-publik-tanpa-login)
2. [Halaman User Terautentikasi](#halaman-user-terautentikasi)
3. [Halaman Admin](#halaman-admin)
4. [Halaman Petugas](#halaman-petugas)

---

## 🌐 Halaman Publik (Tanpa Login)

### 1. Welcome/Home Page (`/`)

**Fungsi Utama:**

- Menampilkan halaman utama aplikasi yang dapat diakses oleh semua pengunjung
- Menampilkan preview konten media sosial yang telah dipublikasi secara publik
- Menyediakan navigasi ke halaman-halaman penting lainnya

**Fitur:**

- **Hero Section**: Menampilkan judul aplikasi dan deskripsi singkat dengan animasi
- **Statistik Publik**: Menampilkan total konten, platform aktif, dan kategori dalam bentuk card
- **Pencarian Konten**: Fitur search untuk mencari konten berdasarkan judul, platform, atau kategori (filter client-side)
- **Filter Konten**: Filter berdasarkan platform dan kategori konten
- **Konten Terbaru**: Menampilkan **3 konten terbaru** yang sudah dipublikasi dengan informasi:
    - Judul konten
    - Platform (YouTube, Instagram, TikTok, dll) dengan badge
    - Kategori konten
    - Tags
    - Tanggal publikasi
    - Metrik engagement (views, likes, komentar, share)
    - Link ke konten asli (external link)
- **Konten Populer**: Menampilkan konten dengan engagement tertinggi
- **Link "Lihat Semua Konten"**: Navigasi ke halaman konten lengkap (`/konten`)
- **Navigasi**: Navbar dengan menu Beranda, Konten, Tentang, dan link login/dashboard sesuai role pengguna
- **Footer**: Informasi aplikasi dan link penting

**Akses:** Publik (tidak perlu login)

**Layout:** PublicLayout (navbar dan footer konsisten)

---

### 2. Halaman Konten Publik (`/konten`)

**Fungsi Utama:**

- Menampilkan semua konten yang telah dipublikasi untuk akses publik
- Menyediakan fitur pencarian dan filter lengkap untuk menemukan konten spesifik

**Fitur:**

- **Pencarian**: Search berdasarkan judul konten, platform, kategori, atau tags
- **Filter Multi-Level**:
    - Filter berdasarkan Platform (dropdown)
    - Filter berdasarkan Kategori (dropdown)
    - Filter berdasarkan Tag (dropdown)
- **Statistik**: Menampilkan total konten yang sesuai dengan filter
- **Daftar Konten**: Menampilkan semua konten dalam bentuk card grid dengan informasi:
    - Judul konten
    - Platform dengan badge dan icon
    - Kategori
    - Tags (multiple badges)
    - Tanggal publikasi
    - Metrik engagement lengkap (views, likes, komentar, share)
    - Link ke konten asli (button dengan icon external link)
- **Pagination**: Navigasi halaman untuk konten yang banyak
- **Reset Filter**: Tombol untuk mengembalikan filter ke default
- **Empty State**: Pesan informatif jika tidak ada konten yang sesuai filter

**Akses:** Publik (tidak perlu login)

**Layout:** PublicLayout (navbar dan footer konsisten)

---

### 3. Halaman Tentang (`/tentang`)

**Fungsi Utama:**

- Menampilkan informasi tentang aplikasi dan Kanwil Kemenag Provinsi Papua
- Memberikan konteks dan latar belakang organisasi

**Fitur:**

- **Tentang Aplikasi**: Deskripsi aplikasi rekap konten media sosial
- **Tentang Kanwil Kemenag Prov. Papua**:
    - Sejarah dan latar belakang
    - Visi dan Misi
    - Struktur Organisasi
    - Program dan Kegiatan
    - Informasi Kontak
- **Layout Informasi**: Disajikan dalam section-section yang rapi dengan card dan styling menarik
- **Navigasi**: Link kembali ke beranda dan halaman lainnya

**Akses:** Publik (tidak perlu login)

**Layout:** PublicLayout (navbar dan footer konsisten)

---

### 4. Login Page (`/login`)

**Fungsi Utama:**

- Halaman autentikasi untuk masuk ke sistem
- Validasi kredensial pengguna (email dan password)

**Fitur:**

- **Form Login**: Input email dan password
- **Show/Hide Password**: Toggle untuk menampilkan atau menyembunyikan password
- **Remember Me**: Opsi untuk menyimpan session login
- **Forgot Password**: Link untuk reset password (jika tersedia)
- **Validasi Form**: Validasi input dan menampilkan pesan error jika ada
- **Redirect Berdasarkan Role**: Setelah login berhasil, redirect otomatis ke:
    - `/admin/dashboard` untuk role admin
    - `/petugas/dashboard` untuk role petugas
    - `/dashboard` untuk user biasa

**Akses:** Publik (tidak perlu login)

## 🔐 Halaman Admin

### 8. Admin Dashboard (`/admin/dashboard`)

**Fungsi Utama:**

- Dashboard utama untuk administrator sistem
- Menampilkan ringkasan statistik dan aktivitas sistem secara keseluruhan

**Fitur:**

- **Statistik Utama**:
    - Total Konten (dengan link ke halaman konten)
    - Platform Aktif (dengan link ke halaman platform)
    - Total Kategori (dengan link ke halaman kategori)
    - Total Tag
    - Total Pengguna (admin dan petugas)
- **Statistik Engagement**:
    - Total Views
    - Total Likes
    - Total Komentar
    - Total Share
- **Status Konten**:
    - Konten Draft
    - Konten Publikasi
    - Konten Arsip
    - Konten Bulan Ini
- **Konten Terbaru**: Menampilkan 5 konten terbaru dengan status dan platform
- **Top Konten**: Menampilkan 5 konten dengan engagement tertinggi (views + likes + komentar + share)
- **Konten Per Platform**: Grafik/chart distribusi konten berdasarkan platform (6 bulan terakhir)
- **Quick Actions**: Tombol cepat untuk akses ke:
    - Platform Management
    - Konten Management
    - Tag Management
    - Laporan

**Akses:** Hanya admin (role: admin)

**Layout:** AdminLayout dengan Sidebar

---

### 9. Kelola Platform (`/admin/platform`)

**Fungsi Utama:**

- Manajemen platform media sosial (YouTube, Instagram, TikTok, dll)
- CRUD (Create, Read, Update, Delete) untuk data platform

**Fitur:**

- **Daftar Platform**: Menampilkan semua platform dalam bentuk card grid dengan:
    - Icon platform (gambar)
    - Nama platform
    - Status aktif/nonaktif (badge)
    - Jumlah konten terkait
- **Pencarian**: Fitur search untuk mencari platform berdasarkan nama atau status
- **Tambah Platform**: Modal/form untuk menambah platform baru dengan:
    - Nama Platform (wajib, text input)
    - Icon Platform (upload gambar, wajib, preview sebelum simpan)
    - Status Aktif (checkbox)
    - Validasi form
- **Edit Platform**: Update informasi platform yang sudah ada (modal/form)
- **Hapus Platform**: Menghapus platform dengan konfirmasi dialog
- **Preview Icon**: Preview icon platform sebelum disimpan
- **Status Badge**: Menampilkan status aktif (success) / nonaktif (error) platform
- **Responsive**: Grid layout yang responsive

**Akses:** Hanya admin (role: admin)

**Layout:** AdminLayout dengan Sidebar

---

### 10. Kelola Kategori Konten (`/admin/kategori-konten`)

**Fungsi Utama:**

- Manajemen kategori konten untuk mengorganisir konten media sosial
- CRUD untuk kategori konten

**Fitur:**

- **Daftar Kategori**: Menampilkan semua kategori dalam bentuk card grid dengan:
    - Nama kategori
    - Slug kategori
    - Deskripsi (jika ada)
    - Jumlah konten terkait
- **Pencarian**: Fitur search berdasarkan nama kategori, slug, atau deskripsi
- **Tambah Kategori**: Modal/form untuk menambah kategori baru dengan:
    - Nama Kategori (wajib, text input)
    - Slug Kategori (auto-generate dari nama, bisa di-edit manual)
    - Deskripsi (opsional, textarea)
    - Validasi form
- **Edit Kategori**: Update informasi kategori (modal/form)
- **Hapus Kategori**: Menghapus kategori dengan konfirmasi dialog
- **Auto Slug**: Slug otomatis di-generate dari nama kategori (lowercase, replace spasi dengan dash)
- **Validation**: Validasi nama dan slug unik

**Akses:** Hanya admin (role: admin)

**Layout:** AdminLayout dengan Sidebar

---

### 11. Kelola Konten (`/admin/konten`)

**Fungsi Utama:**

- Manajemen konten media sosial secara lengkap
- CRUD untuk konten dengan fitur lengkap

**Fitur:**

- **Daftar Konten**: Menampilkan semua konten dalam bentuk tabel dengan kolom:
    - Judul Konten
    - Platform (badge)
    - Kategori
    - Status (badge dengan warna: Draft=warning, Publikasi=success, Arsip=error)
    - Tanggal Publikasi
    - Tags (multiple badges)
    - Metrik engagement (views, likes)
    - Aksi (Detail, Edit, Hapus)
- **Pencarian**: Search berdasarkan judul, link, platform, kategori, status, atau tags
- **Filter Lanjutan**:
    - Filter berdasarkan Platform
    - Filter berdasarkan Kategori
    - Filter berdasarkan Status
    - Filter berdasarkan Tag
    - Reset Filter
- **Tambah Konten**: Modal/form lengkap untuk menambah konten baru dengan:
    - Platform (wajib, dropdown/select)
    - Kategori (opsional, dropdown/select)
    - Judul Konten (wajib, text input)
    - Link Konten (wajib, URL input dengan validasi)
    - Tanggal Publikasi (wajib, date picker)
    - Tags (multi-select checkbox dari daftar tag yang ada)
    - Status Konten (wajib: Draft/Publikasi/Arsip, radio atau select)
    - Catatan (opsional, textarea)
    - Perlu Promosi (checkbox)
    - Kolaborasi (checkbox)
    - Kolaborasi Dengan (text input, muncul jika kolaborasi = true)
    - Metrik Engagement (opsional):
        - Views (number input)
        - Likes (number input)
        - Komentar (number input)
        - Share (number input)
    - Validasi form lengkap
- **Edit Konten**: Update semua informasi konten (modal/form sama dengan tambah)
- **Detail Konten**: Modal untuk melihat detail lengkap konten termasuk:
    - Semua informasi konten
    - Metrik engagement lengkap
    - Timestamp created/updated
    - Tags lengkap
- **Hapus Konten**: Menghapus konten dengan konfirmasi dialog
- **Status Badge**: Badge warna berbeda untuk status
- **Pagination**: Navigasi halaman untuk konten yang banyak

**Akses:** Hanya admin (role: admin)

**Layout:** AdminLayout dengan Sidebar

---

### 12. Kelola Tag (`/admin/tag`)

**Fungsi Utama:**

- Manajemen tag untuk labeling dan kategorisasi konten
- CRUD untuk tag

**Fitur:**

- **Daftar Tag**: Menampilkan semua tag dalam bentuk card grid dengan:
    - Nama tag
    - Slug tag
    - Jumlah konten yang menggunakan tag tersebut
- **Pencarian**: Fitur search berdasarkan nama tag atau slug
- **Tambah Tag**: Modal/form untuk menambah tag baru dengan:
    - Nama Tag (wajib, text input)
    - Slug Tag (auto-generate dari nama, bisa di-edit manual)
    - Validasi form
- **Edit Tag**: Update informasi tag (modal/form)
- **Hapus Tag**: Menghapus tag dengan konfirmasi dialog
- **Auto Slug**: Slug otomatis di-generate dari nama tag
- **Validation**: Validasi nama dan slug unik

**Akses:** Hanya admin (role: admin)

**Layout:** AdminLayout dengan Sidebar

---

### 13. Laporan (`/admin/laporan`)

**Fungsi Utama:**

- Halaman laporan dan analitik konten media sosial
- Menampilkan data konten dengan filter lengkap
- Export data ke Excel dan PDF

**Fitur:**

- **Filter Laporan**:
    - Tanggal Mulai (date picker)
    - Tanggal Akhir (date picker)
    - Platform (dropdown)
    - Kategori (dropdown)
    - Status (dropdown: Draft/Publikasi/Arsip/Semua)
    - Tombol Filter dan Reset
- **Statistik Ringkasan**:
    - Total Konten (sesuai filter)
    - Total Views
    - Total Likes
    - Total Engagement (views + likes + komentar + share)
- **Konten Per Platform**: Tabel ringkasan konten berdasarkan platform dengan:
    - Nama platform
    - Jumlah konten
    - Total views
    - Total likes
- **Tabel Data Konten**: Menampilkan semua konten sesuai filter dalam tabel dengan kolom:
    - No
    - Judul Konten
    - Platform
    - Kategori
    - Tanggal Publikasi
    - Status (badge)
    - Views (number format)
    - Likes (number format)
    - Komentar (number format)
    - Share (number format)
    - Row summary dengan total
- **Export Excel**:
    - Format file: `.xlsx`
    - Styling lengkap dengan header berwarna
    - Auto-size columns
    - Summary row dengan total
    - Nama file: `Laporan_Konten_YYYY-MM-DD_HHMMSS.xlsx`
    - Export sesuai dengan filter yang aktif
- **Export PDF**:
    - Format file: `.pdf`
    - Layout landscape A4
    - Template dengan styling profesional
    - Tabel data lengkap
    - Summary statistics
    - Header dan footer dengan informasi aplikasi
    - Nama file: `Laporan_Konten_YYYY-MM-DD_HHMMSS.pdf`
    - Export sesuai dengan filter yang aktif
- **Tombol Export**: Tersedia di header dan di dalam card tabel
- **Empty State**: Pesan jika tidak ada data sesuai filter

**Akses:** Hanya admin (role: admin)

**Layout:** AdminLayout dengan Sidebar
