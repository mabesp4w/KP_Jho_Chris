# Dokumentasi Fungsi Halaman Aplikasi
## Aplikasi Rekap Tahunan Link Konten Media Sosial - Kanwil Kemenag Prov. Papua

---

## 📋 DAFTAR ISI
1. [Halaman Publik (Tanpa Login)](#halaman-publik)
2. [Halaman User Terautentikasi](#halaman-user-terautentikasi)
3. [Halaman Admin](#halaman-admin)
4. [Halaman Petugas](#halaman-petugas)

---

## 🌐 Halaman Publik (Tanpa Login)

### 1. Welcome/Home Page (`/`)
**Fungsi Utama:**
- Menampilkan halaman utama aplikasi yang dapat diakses oleh semua pengunjung
- Menampilkan konten media sosial yang telah dipublikasi secara publik
- Menyediakan fitur pencarian dan filter konten berdasarkan platform dan kategori

**Fitur:**
- **Hero Section**: Menampilkan judul aplikasi dan deskripsi singkat
- **Statistik Publik**: Menampilkan total konten, platform aktif, dan kategori
- **Pencarian Konten**: Fitur search untuk mencari konten berdasarkan judul, platform, atau kategori
- **Filter Konten**: Filter berdasarkan platform dan kategori konten
- **Konten Terbaru**: Menampilkan 12 konten terbaru yang sudah dipublikasi dengan informasi:
  - Judul konten
  - Platform (YouTube, Instagram, TikTok, dll)
  - Kategori konten
  - Tags
  - Tanggal publikasi
  - Metrik engagement (views, likes)
  - Link ke konten asli
- **Konten Populer**: Menampilkan 6 konten dengan engagement tertinggi
- **Navigasi**: Link ke halaman login atau dashboard sesuai role pengguna

**Akses:** Publik (tidak perlu login)

---

### 2. Login Page (`/login`)
**Fungsi Utama:**
- Halaman autentikasi untuk masuk ke sistem
- Validasi kredensial pengguna (email dan password)

**Fitur:**
- **Form Login**: Input email dan password
- **Show/Hide Password**: Toggle untuk menampilkan atau menyembunyikan password
- **Remember Me**: Opsi untuk menyimpan session login
- **Forgot Password**: Link untuk reset password (jika tersedia)
- **Validasi Form**: Validasi input dan menampilkan pesan error jika ada
- **Redirect**: Setelah login berhasil, redirect ke dashboard sesuai role (admin/petugas)

**Akses:** Publik (tidak perlu login)

---

## 👤 Halaman User Terautentikasi

### 3. Profile Page (`/profile`)
**Fungsi Utama:**
- Mengelola informasi profil pengguna yang sedang login
- Update data profil (nama, email)
- Hapus akun pengguna

**Fitur:**
- **Edit Profil**: Update nama dan email pengguna
- **Update Password**: Mengubah password akun
- **Delete Account**: Menghapus akun pengguna (dengan konfirmasi password)
- **Validasi**: Validasi form dan email verification status

**Akses:** Semua user yang sudah login (admin dan petugas)

---

## 🔐 Halaman Admin

### 4. Admin Dashboard (`/admin/dashboard`)
**Fungsi Utama:**
- Dashboard utama untuk administrator sistem
- Menampilkan ringkasan statistik dan aktivitas sistem secara keseluruhan

**Fitur:**
- **Statistik Utama**:
  - Total Konten (dengan link ke halaman konten)
  - Platform Aktif (dengan link ke halaman platform)
  - Total Kategori (dengan link ke halaman kategori)
  - Total Pengguna
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
- **Top Konten**: Menampilkan 5 konten dengan engagement tertinggi
- **Konten Per Platform**: Grafik distribusi konten berdasarkan platform
- **Quick Actions**: Tombol cepat untuk akses ke:
  - Platform Management
  - Konten Management
  - Tag Management
  - Laporan

**Akses:** Hanya admin (role: admin)

---

### 5. Kelola Platform (`/admin/platform`)
**Fungsi Utama:**
- Manajemen platform media sosial (YouTube, Instagram, TikTok, dll)
- CRUD (Create, Read, Update, Delete) untuk data platform

**Fitur:**
- **Daftar Platform**: Menampilkan semua platform dalam bentuk card grid
- **Pencarian**: Fitur search untuk mencari platform berdasarkan nama atau status
- **Tambah Platform**: Form untuk menambah platform baru dengan:
  - Nama Platform (wajib)
  - Icon Platform (upload gambar, wajib)
  - Status Aktif (checkbox)
- **Edit Platform**: Update informasi platform yang sudah ada
- **Hapus Platform**: Menghapus platform dengan konfirmasi
- **Preview Icon**: Preview icon platform sebelum disimpan
- **Status Badge**: Menampilkan status aktif/nonaktif platform

**Akses:** Hanya admin (role: admin)

---

### 6. Kelola Kategori Konten (`/admin/kategori-konten`)
**Fungsi Utama:**
- Manajemen kategori konten untuk mengorganisir konten media sosial
- CRUD untuk kategori konten

**Fitur:**
- **Daftar Kategori**: Menampilkan semua kategori dalam bentuk card grid
- **Pencarian**: Fitur search berdasarkan nama kategori, slug, atau deskripsi
- **Tambah Kategori**: Form untuk menambah kategori baru dengan:
  - Nama Kategori (wajib)
  - Slug Kategori (auto-generate dari nama)
  - Deskripsi (opsional)
- **Edit Kategori**: Update informasi kategori
- **Hapus Kategori**: Menghapus kategori dengan konfirmasi
- **Auto Slug**: Slug otomatis di-generate dari nama kategori

**Akses:** Hanya admin (role: admin)

---

### 7. Kelola Konten (`/admin/konten`)
**Fungsi Utama:**
- Manajemen konten media sosial secara lengkap
- CRUD untuk konten dengan fitur lengkap

**Fitur:**
- **Daftar Konten**: Menampilkan semua konten dalam bentuk tabel dengan kolom:
  - Judul Konten
  - Platform
  - Kategori
  - Status
  - Tanggal Publikasi
  - Tags
  - Aksi (Detail, Edit, Hapus)
- **Pencarian**: Search berdasarkan judul, link, platform, kategori, status, atau tags
- **Filter Lanjutan**:
  - Filter berdasarkan Tahun
  - Filter berdasarkan Bulan
  - Filter berdasarkan Kategori
  - Reset Filter
- **Tambah Konten**: Form lengkap untuk menambah konten baru dengan:
  - Platform (wajib, dropdown)
  - Kategori (opsional, dropdown)
  - Judul Konten (wajib)
  - Link Konten (wajib, URL)
  - Tanggal Publikasi (wajib, date picker)
  - Tags (multi-select checkbox)
  - Status Konten (wajib: Draft/Publikasi/Arsip)
  - Catatan (opsional, textarea)
  - Perlu Promosi (checkbox)
  - Kolaborasi (checkbox)
  - Kolaborasi Dengan (text, muncul jika kolaborasi = true)
  - Metrik Engagement (opsional):
    - Views (number)
    - Likes (number)
    - Komentar (number)
    - Share (number)
- **Edit Konten**: Update semua informasi konten
- **Detail Konten**: Modal untuk melihat detail lengkap konten termasuk:
  - Semua informasi konten
  - Metrik engagement lengkap
  - Timestamp created/updated
- **Hapus Konten**: Menghapus konten dengan konfirmasi
- **Status Badge**: Badge warna berbeda untuk status (Draft=warning, Publikasi=success, Arsip=error)

**Akses:** Hanya admin (role: admin)

---

### 8. Kelola Tag (`/admin/tag`)
**Fungsi Utama:**
- Manajemen tag untuk labeling dan kategorisasi konten
- CRUD untuk tag

**Fitur:**
- **Daftar Tag**: Menampilkan semua tag dalam bentuk card grid
- **Pencarian**: Fitur search berdasarkan nama tag atau slug
- **Tambah Tag**: Form untuk menambah tag baru dengan:
  - Nama Tag (wajib)
  - Slug Tag (auto-generate dari nama)
- **Edit Tag**: Update informasi tag
- **Hapus Tag**: Menghapus tag dengan konfirmasi
- **Auto Slug**: Slug otomatis di-generate dari nama tag

**Akses:** Hanya admin (role: admin)

---

### 9. Kelola Pengguna (`/admin/pengguna`)
**Fungsi Utama:**
- Manajemen pengguna sistem (placeholder - akan dikembangkan)

**Fitur:**
- **Status**: Halaman placeholder, belum sepenuhnya diimplementasikan
- **Rencana**: Akan digunakan untuk mengelola user (admin dan petugas)

**Akses:** Hanya admin (role: admin)

---

### 10. Laporan (`/admin/laporan`)
**Fungsi Utama:**
- Halaman laporan dan analitik (placeholder - akan dikembangkan)

**Fitur:**
- **Status**: Halaman placeholder, belum sepenuhnya diimplementasikan
- **Rencana**: Akan digunakan untuk menampilkan laporan dan analitik konten

**Akses:** Hanya admin (role: admin)

---

## 👨‍💼 Halaman Petugas

### 11. Petugas Dashboard (`/petugas/dashboard`)
**Fungsi Utama:**
- Dashboard untuk role petugas
- Menampilkan ringkasan tugas dan aktivitas petugas

**Fitur:**
- **Welcome Message**: Pesan selamat datang dengan nama petugas
- **Statistik Tugas**:
  - Tugas Saya (dengan badge "Baru")
  - Selesai (dengan badge "Hari ini")
  - Pending (dengan badge "Menunggu")
- **Quick Actions**: Tombol cepat untuk:
  - Tugas Baru
  - Lihat Tugas
  - Riwayat

**Catatan:** Halaman ini masih dalam tahap pengembangan awal dan fitur-fiturnya akan dikembangkan lebih lanjut.

**Akses:** Hanya petugas (role: petugas)

---

## 📝 Catatan Penting

### Keamanan & Akses
- Semua halaman admin dilindungi dengan middleware `role:admin`
- Semua halaman petugas dilindungi dengan middleware `role:petugas`
- Halaman profil dapat diakses oleh semua user yang sudah login
- Halaman welcome dan login dapat diakses publik

### Status Pengembangan
- ✅ **Selesai**: Welcome, Login, Profile, Admin Dashboard, Platform, Kategori Konten, Konten, Tag, Petugas Dashboard
- 🚧 **Dalam Pengembangan**: Pengguna Management, Laporan
- 📋 **Rencana**: Fitur tambahan untuk petugas, ekspor laporan, dll

### Teknologi yang Digunakan
- **Backend**: Laravel (PHP)
- **Frontend**: React (Inertia.js)
- **UI Framework**: DaisyUI (Tailwind CSS)
- **Icons**: Lucide React

---

**Dokumen ini dibuat untuk keperluan dokumentasi sistem.**
**Terakhir diperbarui:** 2025

