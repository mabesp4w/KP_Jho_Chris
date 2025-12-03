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
        // Konten yang dipublikasi (terbaru) - hanya 3 konten untuk preview
        $kontenPublikasi = Konten::with(['platform', 'kategori', 'tags'])
            ->where('status_konten', 'publikasi')
            ->orderBy('tgl_publikasi', 'desc')
            ->limit(3)
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

    /**
     * Display all public konten with search and filter.
     */
    public function konten(Request $request)
    {
        $query = Konten::with(['platform', 'kategori', 'tags'])
            ->where('status_konten', 'publikasi');

        // Search
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('judul_konten', 'like', "%{$search}%")
                    ->orWhere('link_konten', 'like', "%{$search}%")
                    ->orWhereHas('platform', function ($q) use ($search) {
                        $q->where('nm_platform', 'like', "%{$search}%");
                    })
                    ->orWhereHas('kategori', function ($q) use ($search) {
                        $q->where('nm_kategori', 'like', "%{$search}%");
                    });
            });
        }

        // Filter by platform
        if ($request->has('platform') && $request->platform) {
            $query->where('id_platform', $request->platform);
        }

        // Filter by kategori
        if ($request->has('kategori') && $request->kategori) {
            $query->where('id_kategori', $request->kategori);
        }

        // Filter by tag
        if ($request->has('tag') && $request->tag) {
            $query->whereHas('tags', function ($q) use ($request) {
                $q->where('tag.id', $request->tag);
            });
        }

        $kontens = $query->orderBy('tgl_publikasi', 'desc')->paginate(12);

        // Get filter options
        $platforms = Platform::where('status_aktif', true)->get();
        $kategoris = KategoriKonten::all();
        $tags = \App\Models\Tag::all();

        // Statistik
        $totalKonten = Konten::where('status_konten', 'publikasi')->count();
        $totalPlatform = Platform::where('status_aktif', true)->count();
        $totalKategori = KategoriKonten::count();

        return Inertia::render('Public/Konten/Index', [
            'kontens' => $kontens,
            'platforms' => $platforms,
            'kategoris' => $kategoris,
            'tags' => $tags,
            'stats' => [
                'totalKonten' => $totalKonten,
                'totalPlatform' => $totalPlatform,
                'totalKategori' => $totalKategori,
            ],
            'filters' => [
                'search' => $request->search ?? '',
                'platform' => $request->platform ?? '',
                'kategori' => $request->kategori ?? '',
                'tag' => $request->tag ?? '',
            ],
        ]);
    }

    /**
     * Display the about page.
     */
    public function tentang()
    {
        return Inertia::render('Public/Tentang/Index');
    }
}

