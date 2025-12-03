<?php

namespace App\Http\Controllers;

use App\Models\Konten;
use App\Models\Platform;
use App\Models\KategoriKonten;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display the user dashboard.
     */
    public function dashboard()
    {
        // Statistik untuk user
        $totalKonten = Konten::where('status_konten', 'publikasi')->count();
        $totalPlatform = Platform::where('status_aktif', true)->count();
        $totalKategori = KategoriKonten::count();

        // Konten terbaru
        $kontenTerbaru = Konten::with(['platform', 'kategori', 'tags'])
            ->where('status_konten', 'publikasi')
            ->orderBy('tgl_publikasi', 'desc')
            ->limit(6)
            ->get();

        // Konten populer
        $kontenPopuler = Konten::with(['platform', 'kategori'])
            ->where('status_konten', 'publikasi')
            ->orderByRaw('(COALESCE(jml_views, 0) + COALESCE(jml_likes, 0) + COALESCE(jml_komentar, 0) + COALESCE(jml_share, 0)) DESC')
            ->limit(5)
            ->get();

        // Platform aktif
        $platforms = Platform::where('status_aktif', true)
            ->withCount('kontens')
            ->orderBy('kontens_count', 'desc')
            ->limit(6)
            ->get();

        return Inertia::render('User/Dashboard', [
            'stats' => [
                'totalKonten' => $totalKonten,
                'totalPlatform' => $totalPlatform,
                'totalKategori' => $totalKategori,
            ],
            'kontenTerbaru' => $kontenTerbaru,
            'kontenPopuler' => $kontenPopuler,
            'platforms' => $platforms,
        ]);
    }

    /**
     * Display a listing of konten for user.
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

        return Inertia::render('User/Konten/Index', [
            'kontens' => $kontens,
            'platforms' => $platforms,
            'kategoris' => $kategoris,
            'tags' => $tags,
            'filters' => [
                'search' => $request->search ?? '',
                'platform' => $request->platform ?? '',
                'kategori' => $request->kategori ?? '',
                'tag' => $request->tag ?? '',
            ],
        ]);
    }
}

