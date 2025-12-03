<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class KategoriKontenSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $kategoris = [
            [
                'nm_kategori' => 'Tutorial',
                'slug_kategori' => 'tutorial',
                'desk_kategori' => 'Konten tutorial dan panduan lengkap untuk berbagai topik',
            ],
            [
                'nm_kategori' => 'Review Produk',
                'slug_kategori' => 'review-produk',
                'desk_kategori' => 'Ulasan dan review produk terbaru',
            ],
            [
                'nm_kategori' => 'Dance',
                'slug_kategori' => 'dance',
                'desk_kategori' => 'Konten dance dan koreografi',
            ],
            [
                'nm_kategori' => 'Vlog',
                'slug_kategori' => 'vlog',
                'desk_kategori' => 'Video blog tentang kehidupan sehari-hari',
            ],
            [
                'nm_kategori' => 'Cooking',
                'slug_kategori' => 'cooking',
                'desk_kategori' => 'Resep masakan dan tutorial memasak',
            ],
            [
                'nm_kategori' => 'Gaming',
                'slug_kategori' => 'gaming',
                'desk_kategori' => 'Konten game dan gameplay',
            ],
            [
                'nm_kategori' => 'Music',
                'slug_kategori' => 'music',
                'desk_kategori' => 'Konten musik dan cover lagu',
            ],
            [
                'nm_kategori' => 'Comedy',
                'slug_kategori' => 'comedy',
                'desk_kategori' => 'Konten komedi dan hiburan',
            ],
            [
                'nm_kategori' => 'Education',
                'slug_kategori' => 'education',
                'desk_kategori' => 'Konten edukasi dan pembelajaran',
            ],
            [
                'nm_kategori' => 'Travel',
                'slug_kategori' => 'travel',
                'desk_kategori' => 'Konten traveling dan wisata',
            ],
            [
                'nm_kategori' => 'Fashion',
                'slug_kategori' => 'fashion',
                'desk_kategori' => 'Konten fashion dan style',
            ],
            [
                'nm_kategori' => 'Beauty',
                'slug_kategori' => 'beauty',
                'desk_kategori' => 'Konten kecantikan dan makeup',
            ],
            [
                'nm_kategori' => 'Fitness',
                'slug_kategori' => 'fitness',
                'desk_kategori' => 'Konten olahraga dan fitness',
            ],
            [
                'nm_kategori' => 'Tech Review',
                'slug_kategori' => 'tech-review',
                'desk_kategori' => 'Review teknologi dan gadget terbaru',
            ],
        ];

        foreach ($kategoris as $kategori) {
            DB::table('kategori_konten')->insert([
                ...$kategori,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}

