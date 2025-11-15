# PROSEDUR USER DAN ADMIN

## Aplikasi Rekap Tahunan Link Konten Media Sosial

### Kanwil Kemenag Prov. Papua

---

## DAFTAR ISI

1. [Prosedur User (Pengunjung Publik)](#prosedur-user-pengunjung-publik)
2. [Prosedur Admin](#prosedur-admin)
3. [Fitur dan Fungsi](#fitur-dan-fungsi)

---

## PROSEDUR USER (PENGUNJUNG PUBLIK)

### 1. Akses Halaman Utama

**Langkah-langkah:**

1. Buka browser dan akses URL aplikasi (contoh: `http://localhost` atau domain aplikasi)
2. Halaman utama (Welcome) akan menampilkan:
    - Header dengan logo dan judul aplikasi
    - Tombol "Masuk" jika belum login
    - Statistik umum (Total Konten, Platform Aktif, Kategori)
    - Konten terbaru yang telah dipublikasi
    - Konten populer berdasarkan engagement

### 2. Melihat Konten

**Langkah-langkah:**

1. Di halaman utama, scroll ke bagian "Konten Terbaru"
2. Konten ditampilkan dalam bentuk card yang menampilkan:
    - Judul konten
    - Platform media sosial (Facebook, Instagram, Twitter, dll)
    - Kategori konten
    - Tag (jika ada)
    - Tanggal publikasi
    - Statistik engagement (views, likes)
    - Link ke konten asli

### 3. Mencari Konten

**Langkah-langkah:**

1. Di bagian "Search & Filter", ketikkan kata kunci di kolom pencarian
2. Pencarian akan mencari berdasarkan:
    - Judul konten
    - Nama platform
    - Nama kategori
3. Hasil pencarian akan otomatis terfilter dan ditampilkan

### 4. Memfilter Konten

**Langkah-langkah:**

1. Gunakan dropdown "Semua Platform" untuk memfilter berdasarkan platform media sosial
2. Gunakan dropdown "Semua Kategori" untuk memfilter berdasarkan kategori konten
3. Kombinasikan dengan pencarian untuk hasil yang lebih spesifik
4. Hasil filter akan otomatis diperbarui

### 5. Melihat Konten Populer

**Langkah-langkah:**

1. Scroll ke bagian "Konten Populer"
2. Konten ditampilkan berdasarkan total engagement (views + likes + komentar + share)
3. Konten dengan engagement tertinggi akan ditampilkan di urutan teratas

### 6. Mengakses Konten Asli

**Langkah-langkah:**

1. Klik tombol "Lihat Konten" pada card konten yang diinginkan
2. Konten akan dibuka di tab baru browser
3. Link mengarah ke konten asli di platform media sosial

### 7. Login ke Sistem (Opsional)

**Langkah-langkah:**

1. Klik tombol "Masuk" di header atau footer
2. Masukkan email dan password
3. Centang "Ingat saya" jika ingin tetap login
4. Klik tombol "Masuk"
5. Setelah login, akan diarahkan ke dashboard sesuai role:
    - Admin → Dashboard Admin
    - Petugas → Dashboard Petugas

---

## PROSEDUR ADMIN

### 1. Login sebagai Admin

**Langkah-langkah:**

1. Buka halaman login melalui tombol "Masuk" atau akses langsung ke `/login`
2. Masukkan email admin
3. Masukkan password admin
4. Klik tombol "Masuk"
5. Sistem akan otomatis mengarahkan ke Dashboard Admin (`/admin/dashboard`)

**Catatan:**

- Pastikan akun memiliki role "admin"
- Jika lupa password, klik "Lupa password?" untuk reset

### 2. Dashboard Admin

**Fitur yang Tersedia:**

- **Statistik Utama:**
    - Total Konten
    - Platform Aktif
    - Total Kategori
    - Total Pengguna

- **Statistik Engagement:**
    - Total Views
    - Total Likes
    - Total Komentar
    - Total Share

- **Status Konten:**
    - Konten Draft
    - Konten Publikasi
    - Konten Arsip
    - Konten Bulan Ini

- **Informasi Tambahan:**
    - Konten Terbaru (5 terakhir)
    - Top Konten (berdasarkan engagement)
    - Konten Per Platform (grafik distribusi)
    - Quick Actions (akses cepat ke fitur utama)

### 3. Mengelola Platform

**Akses:** Klik menu "Platform" di sidebar atau melalui Quick Actions

**Fitur:**

- **Melihat Daftar Platform:**
    - Semua platform yang terdaftar ditampilkan dalam tabel
    - Menampilkan nama platform, icon, dan status aktif

- **Menambah Platform Baru:**
    1. Klik tombol "Tambah Platform" atau "Create"
    2. Isi form:
        - Nama Platform (wajib, maksimal 50 karakter, harus unik)
        - Icon Platform (wajib, format: jpeg, png, jpg, gif, svg, webp, maksimal 2MB)
        - Status Aktif (centang jika aktif)
    3. Klik tombol "Simpan"
    4. Platform baru akan ditambahkan ke sistem

- **Mengedit Platform:**
    1. Klik tombol "Edit" pada platform yang ingin diubah
    2. Ubah data yang diperlukan
    3. Klik tombol "Update"
    4. Perubahan akan tersimpan

- **Menghapus Platform:**
    1. Klik tombol "Hapus" atau "Delete" pada platform yang ingin dihapus
    2. Konfirmasi penghapusan
    3. Platform akan dihapus dari sistem

**Catatan:**

- Icon platform akan disimpan di folder `storage/app/public/platforms`
- Platform yang tidak aktif tidak akan muncul di filter halaman publik

### 4. Mengelola Konten

**Akses:** Klik menu "Konten" di sidebar atau melalui Quick Actions

**Fitur:**

- **Melihat Daftar Konten:**
    - Semua konten ditampilkan dalam tabel atau card
    - Menampilkan judul, platform, kategori, status, dan tanggal publikasi
    - Dapat melihat detail konten lengkap

- **Menambah Konten Baru:**
    1. Klik tombol "Tambah Konten" atau "Create"
    2. Isi form konten:
        - Judul Konten (wajib)
        - Link Konten (wajib, URL konten di platform media sosial)
        - Platform (pilih dari dropdown)
        - Kategori Konten (pilih dari dropdown)
        - Tag (pilih satu atau lebih tag)
        - Tanggal Publikasi
        - Status Konten (Draft, Publikasi, Arsip)
        - Statistik Engagement:
            - Jumlah Views
            - Jumlah Likes
            - Jumlah Komentar
            - Jumlah Share
        - Deskripsi/Keterangan (opsional)
    3. Klik tombol "Simpan"
    4. Konten baru akan ditambahkan ke sistem

- **Mengedit Konten:**
    1. Klik tombol "Edit" pada konten yang ingin diubah
    2. Ubah data yang diperlukan
    3. Klik tombol "Update"
    4. Perubahan akan tersimpan

- **Menghapus Konten:**
    1. Klik tombol "Hapus" atau "Delete" pada konten yang ingin dihapus
    2. Konfirmasi penghapusan
    3. Konten akan dihapus dari sistem

**Catatan:**

- Konten dengan status "Publikasi" akan muncul di halaman publik
- Konten dengan status "Draft" hanya terlihat di admin
- Konten dengan status "Arsip" tidak muncul di halaman publik

### 5. Mengelola Kategori Konten

**Akses:** Klik menu "Kategori Konten" di sidebar (jika tersedia) atau melalui route `/admin/kategori-konten`

**Fitur:**

- **Melihat Daftar Kategori:**
    - Semua kategori ditampilkan dalam tabel
    - Menampilkan nama kategori, slug, dan deskripsi

- **Menambah Kategori Baru:**
    1. Klik tombol "Tambah Kategori"
    2. Isi form:
        - Nama Kategori (wajib, maksimal 100 karakter)
        - Slug Kategori (opsional, akan otomatis dibuat dari nama jika kosong)
        - Deskripsi Kategori (opsional)
    3. Klik tombol "Simpan"
    4. Kategori baru akan ditambahkan

- **Mengedit Kategori:**
    1. Klik tombol "Edit" pada kategori yang ingin diubah
    2. Ubah data yang diperlukan
    3. Klik tombol "Update"
    4. Perubahan akan tersimpan

- **Menghapus Kategori:**
    1. Klik tombol "Hapus" pada kategori yang ingin dihapus
    2. Konfirmasi penghapusan
    3. Kategori akan dihapus dari sistem

**Catatan:**

- Slug kategori harus unik
- Slug digunakan untuk URL yang lebih SEO-friendly

### 6. Mengelola Tag

**Akses:** Klik menu "Tag" di sidebar atau melalui Quick Actions

**Fitur:**

- **Melihat Daftar Tag:**
    - Semua tag ditampilkan dalam tabel atau card
    - Menampilkan nama tag dan jumlah konten yang menggunakan tag tersebut

- **Menambah Tag Baru:**
    1. Klik tombol "Tambah Tag"
    2. Isi form:
        - Nama Tag (wajib)
        - Deskripsi (opsional)
    3. Klik tombol "Simpan"
    4. Tag baru akan ditambahkan

- **Mengedit Tag:**
    1. Klik tombol "Edit" pada tag yang ingin diubah
    2. Ubah data yang diperlukan
    3. Klik tombol "Update"
    4. Perubahan akan tersimpan

- **Menghapus Tag:**
    1. Klik tombol "Hapus" pada tag yang ingin dihapus
    2. Konfirmasi penghapusan
    3. Tag akan dihapus dari sistem

**Catatan:**

- Tag dapat digunakan untuk mengelompokkan konten
- Satu konten dapat memiliki banyak tag

### 7. Melihat Laporan

**Akses:** Klik menu "Laporan" di sidebar

**Fitur:**

- Menampilkan berbagai laporan dan statistik
- Grafik dan visualisasi data
- Ekspor laporan (jika tersedia)

**Catatan:**

- Fitur laporan masih dalam pengembangan (placeholder)

### 8. Mengelola Pengguna

**Akses:** Klik menu "Pengguna" di sidebar (jika tersedia)

**Fitur:**

- Melihat daftar pengguna sistem
- Menambah pengguna baru
- Mengedit data pengguna
- Menghapus pengguna
- Mengubah role pengguna

**Catatan:**

- Fitur pengguna masih dalam pengembangan (placeholder)

### 9. Logout

**Langkah-langkah:**

1. Klik tombol "Keluar" di bagian bawah sidebar
2. Sistem akan logout dan mengarahkan ke halaman utama

---

## FITUR DAN FUNGSI

### Fitur User (Publik)

1. **Melihat Konten Publikasi**
    - Hanya konten dengan status "Publikasi" yang ditampilkan
    - Konten ditampilkan secara terbaru

2. **Pencarian Konten**
    - Pencarian berdasarkan judul, platform, atau kategori
    - Pencarian real-time (otomatis terfilter)

3. **Filter Konten**
    - Filter berdasarkan platform
    - Filter berdasarkan kategori
    - Kombinasi filter dan pencarian

4. **Konten Populer**
    - Menampilkan konten dengan engagement tertinggi
    - Diurutkan berdasarkan total engagement

5. **Statistik Publik**
    - Total konten yang dipublikasi
    - Jumlah platform aktif
    - Jumlah kategori

### Fitur Admin

1. **Dashboard**
    - Statistik lengkap sistem
    - Konten terbaru dan populer
    - Grafik distribusi konten
    - Quick actions

2. **Manajemen Platform**
    - CRUD (Create, Read, Update, Delete) platform
    - Upload icon platform
    - Aktif/nonaktif platform

3. **Manajemen Konten**
    - CRUD konten
    - Atur status konten (Draft, Publikasi, Arsip)
    - Input statistik engagement
    - Hubungkan dengan platform, kategori, dan tag

4. **Manajemen Kategori**
    - CRUD kategori konten
    - Auto-generate slug
    - Deskripsi kategori

5. **Manajemen Tag**
    - CRUD tag
    - Tagging konten
    - Filter berdasarkan tag

6. **Laporan**
    - Statistik dan analitik
    - Visualisasi data
    - Ekspor data (dalam pengembangan)

7. **Manajemen Pengguna**
    - Kelola akun pengguna
    - Atur role pengguna (dalam pengembangan)

---

## CATATAN PENTING

### Keamanan

- Pastikan password admin kuat dan tidak dibagikan
- Logout setelah selesai menggunakan sistem
- Jangan biarkan sesi login terbuka di komputer publik

### Validasi Data

- Semua form memiliki validasi
- Pastikan data yang diinput sesuai format yang diminta
- Periksa kembali sebelum menyimpan data penting

### Backup Data

- Lakukan backup database secara berkala
- Simpan file upload (icon platform) secara terpisah

### Troubleshooting

- Jika tidak bisa login, periksa email dan password
- Jika halaman error, refresh browser atau clear cache
- Hubungi administrator sistem jika ada masalah teknis

---

## KONTAK DAN DUKUNGAN

Untuk pertanyaan atau bantuan lebih lanjut, hubungi:

- **Administrator Sistem**
- **Kanwil Kemenag Prov. Papua**

---

**Dokumen ini dibuat untuk membantu pengguna dan admin dalam menggunakan aplikasi Rekap Tahunan Link Konten Media Sosial Kanwil Kemenag Prov. Papua.**

**Versi:** 1.0  
**Tanggal:** 2025
