<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class KontenSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Pastikan platform dan kategori sudah ada
        $platformIds = DB::table('platform')->pluck('id')->toArray();
        $kategoriIds = DB::table('kategori_konten')->pluck('id')->toArray();

        if (empty($platformIds) || empty($kategoriIds)) {
            $this->command->error('Platform atau Kategori Konten belum di-seed. Jalankan PlatformSeeder dan KategoriKontenSeeder terlebih dahulu.');
            return;
        }

        $kontens = [
            [
                'judul_konten' => 'Tutorial Membuat Website dengan React',
                'link_konten' => 'https://youtube.com/watch?v=abc123',
                'tgl_publikasi' => '2025-11-01',
                'status_konten' => 'publikasi',
                'perlu_promosi' => false,
                'kolaborasi' => false,
                'jml_views' => 15000,
                'jml_likes' => 1200,
                'jml_komentar' => 85,
                'jml_share' => 45,
            ],
            [
                'judul_konten' => 'Review iPhone 15 Pro Max - Worth It?',
                'link_konten' => 'https://instagram.com/p/xyz789',
                'tgl_publikasi' => '2025-09-04',
                'status_konten' => 'publikasi',
                'perlu_promosi' => true,
                'kolaborasi' => false,
                'jml_views' => 25000,
                'jml_likes' => 3500,
                'jml_komentar' => 120,
                'jml_share' => 90,
            ],
            [
                'judul_konten' => 'Dance Challenge TikTok Viral',
                'link_konten' => 'https://tiktok.com/@user/video/123456',
                'tgl_publikasi' => '2025-08-20',
                'status_konten' => 'publikasi',
                'perlu_promosi' => false,
                'kolaborasi' => true,
                'kolaborasi_dengan' => 'Dancer Pro',
                'jml_views' => 500000,
                'jml_likes' => 45000,
                'jml_komentar' => 2500,
                'jml_share' => 1200,
            ],
            [
                'judul_konten' => 'Vlog: Perjalanan ke Bali',
                'link_konten' => 'https://youtube.com/watch?v=bali2024',
                'tgl_publikasi' => '2024-07-31',
                'status_konten' => 'publikasi',
                'perlu_promosi' => false,
                'kolaborasi' => false,
                'jml_views' => 8000,
                'jml_likes' => 650,
                'jml_komentar' => 42,
                'jml_share' => 28,
            ],
            [
                'judul_konten' => 'Resep Nasi Goreng Spesial',
                'link_konten' => 'https://instagram.com/reel/cooking123',
                'tgl_publikasi' => '2024-06-12',
                'status_konten' => 'publikasi',
                'perlu_promosi' => true,
                'kolaborasi' => false,
                'jml_views' => 12000,
                'jml_likes' => 980,
                'jml_komentar' => 56,
                'jml_share' => 35,
            ],
            [
                'judul_konten' => 'Gameplay GTA 6 - First Look',
                'link_konten' => 'https://youtube.com/watch?v=gta6',
                'tgl_publikasi' => '2024-06-25',
                'status_konten' => 'publikasi',
                'perlu_promosi' => false,
                'kolaborasi' => false,
                'jml_views' => 35000,
                'jml_likes' => 2800,
                'jml_komentar' => 195,
                'jml_share' => 110,
            ],
            [
                'judul_konten' => 'Cover Lagu: Perfect - Ed Sheeran',
                'link_konten' => 'https://youtube.com/watch?v=cover123',
                'tgl_publikasi' => '2024-05-18',
                'status_konten' => 'publikasi',
                'perlu_promosi' => false,
                'kolaborasi' => true,
                'kolaborasi_dengan' => 'Musician Friend',
                'jml_views' => 18000,
                'jml_likes' => 1500,
                'jml_komentar' => 95,
                'jml_share' => 52,
            ],
            [
                'judul_konten' => 'Sketsa Komedi: Kehidupan Sehari-hari',
                'link_konten' => 'https://tiktok.com/@user/video/comedy456',
                'tgl_publikasi' => '2024-04-03',
                'status_konten' => 'publikasi',
                'perlu_promosi' => false,
                'kolaborasi' => false,
                'jml_views' => 280000,
                'jml_likes' => 32000,
                'jml_komentar' => 1800,
                'jml_share' => 950,
            ],
            [
                'judul_konten' => 'Belajar Bahasa Inggris: Grammar Dasar',
                'link_konten' => 'https://youtube.com/watch?v=english101',
                'tgl_publikasi' => '2024-03-20',
                'status_konten' => 'publikasi',
                'perlu_promosi' => true,
                'kolaborasi' => false,
                'jml_views' => 22000,
                'jml_likes' => 1800,
                'jml_komentar' => 125,
                'jml_share' => 68,
            ],
            [
                'judul_konten' => 'Travel Guide: 5 Tempat Wajib di Yogyakarta',
                'link_konten' => 'https://instagram.com/p/yogyakarta',
                'tgl_publikasi' => '2024-02-06',
                'status_konten' => 'publikasi',
                'perlu_promosi' => false,
                'kolaborasi' => false,
                'jml_views' => 15000,
                'jml_likes' => 1200,
                'jml_komentar' => 78,
                'jml_share' => 45,
            ],
            [
                'judul_konten' => 'OOTD: Style Casual untuk Hangout',
                'link_konten' => 'https://tiktok.com/@user/video/fashion789',
                'tgl_publikasi' => '2024-01-04',
                'status_konten' => 'publikasi',
                'perlu_promosi' => false,
                'kolaborasi' => false,
                'jml_views' => 95000,
                'jml_likes' => 8500,
                'jml_komentar' => 420,
                'jml_share' => 210,
            ],
            [
                'judul_konten' => 'Tutorial Makeup Natural Look',
                'link_konten' => 'https://youtube.com/watch?v=makeup123',
                'tgl_publikasi' => '2024-01-09',
                'status_konten' => 'publikasi',
                'perlu_promosi' => true,
                'kolaborasi' => false,
                'jml_views' => 30000,
                'jml_likes' => 2500,
                'jml_komentar' => 165,
                'jml_share' => 92,
            ],
            [
                'judul_konten' => 'Workout Routine: 30 Menit di Rumah',
                'link_konten' => 'https://instagram.com/reel/fitness456',
                'tgl_publikasi' => '2024-01-11',
                'status_konten' => 'publikasi',
                'perlu_promosi' => false,
                'kolaborasi' => false,
                'jml_views' => 18000,
                'jml_likes' => 1400,
                'jml_komentar' => 88,
                'jml_share' => 55,
            ],
            [
                'judul_konten' => 'Review MacBook Pro M3 - Unboxing & Test',
                'link_konten' => 'https://youtube.com/watch?v=macbookm3',
                'tgl_publikasi' => '2024-01-01',
                'status_konten' => 'draft',
                'perlu_promosi' => false,
                'kolaborasi' => false,
                'jml_views' => null,
                'jml_likes' => null,
                'jml_komentar' => null,
                'jml_share' => null,
            ],
        ];

        // Mapping kategori berdasarkan judul
        $kategoriMapping = [
            'Tutorial' => 1, // Tutorial
            'Review' => 2, // Review Produk
            'Dance' => 3, // Dance
            'Vlog' => 4, // Vlog
            'Cooking' => 5, // Cooking
            'Gaming' => 6, // Gaming
            'Music' => 7, // Music
            'Comedy' => 8, // Comedy
            'Education' => 9, // Education
            'Travel' => 10, // Travel
            'Fashion' => 11, // Fashion
            'Beauty' => 12, // Beauty
            'Fitness' => 13, // Fitness
            'Tech Review' => 14, // Tech Review
        ];

        foreach ($kontens as $index => $konten) {
            // Tentukan platform secara acak atau berdasarkan index
            $platformId = $platformIds[$index % count($platformIds)];

            // Tentukan kategori berdasarkan judul atau index
            $kategoriId = null;
            foreach ($kategoriMapping as $keyword => $katId) {
                if (stripos($konten['judul_konten'], $keyword) !== false) {
                    $kategoriId = $katId;
                    break;
                }
            }

            // Jika tidak ada match, gunakan kategori berdasarkan index
            if (!$kategoriId) {
                $kategoriId = $kategoriIds[$index % count($kategoriIds)];
            }



            DB::table('konten')->insert([
                'id_platform' => $platformId,
                'id_kategori' => $kategoriId,
                'judul_konten' => $konten['judul_konten'],
                'link_konten' => $konten['link_konten'],
                'tgl_publikasi' => $konten['tgl_publikasi'],
                'status_konten' => $konten['status_konten'],
                'perlu_promosi' => $konten['perlu_promosi'],
                'kolaborasi' => $konten['kolaborasi'],
                'kolaborasi_dengan' => $konten['kolaborasi_dengan'] ?? null,
                'jml_views' => $konten['jml_views'],
                'jml_likes' => $konten['jml_likes'],
                'jml_komentar' => $konten['jml_komentar'],
                'jml_share' => $konten['jml_share'],
                'catatan' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
