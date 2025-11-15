<?php

namespace App\Http\Controllers;

use App\Models\Konten;
use App\Models\Platform;
use App\Models\KategoriKonten;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    /**
     * Display the welcome page with public content.
     */
    public function index()
    {
        // Konten yang dipublikasi (terbaru)
        $kontenPublikasi = Konten::with(['platform', 'kategori', 'tags'])
            ->where('status_konten', 'publikasi')
            ->orderBy('tgl_publikasi', 'desc')
            ->limit(12)
            ->get();

        // Statistik publik
        $totalKonten = Konten::where('status_konten', 'publikasi')->count();
        $totalPlatform = Platform::where('status_aktif', true)->count();
        $totalKategori = KategoriKonten::count();

        // Konten populer (berdasarkan engagement)
        $kontenPopuler = Konten::where('status_konten', 'publikasi')
            ->select('id', 'judul_konten', 'link_konten', 'jml_views', 'jml_likes', 'jml_komentar', 'jml_share', 'tgl_publikasi')
            ->orderByRaw('(jml_views + jml_likes + jml_komentar + jml_share) DESC')
            ->limit(6)
            ->get();

        // Platform aktif
        $platforms = Platform::where('status_aktif', true)
            ->withCount('kontens')
            ->orderBy('kontens_count', 'desc')
            ->limit(6)
            ->get();

        // Kategori dengan konten terbanyak
        $kategoriPopuler = KategoriKonten::withCount('kontens')
            ->having('kontens_count', '>', 0)
            ->orderBy('kontens_count', 'desc')
            ->limit(6)
            ->get();

        return Inertia::render('Welcome', [
            'kontenPublikasi' => $kontenPublikasi,
            'kontenPopuler' => $kontenPopuler,
            'platforms' => $platforms,
            'kategoriPopuler' => $kategoriPopuler,
            'stats' => [
                'totalKonten' => $totalKonten,
                'totalPlatform' => $totalPlatform,
                'totalKategori' => $totalKategori,
            ],
        ]);
    }
}

