<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Konten;
use App\Models\Platform;
use App\Models\KategoriKonten;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    /**
     * Display the admin dashboard.
     */
    public function index()
    {
        // Statistik umum
        $totalKonten = Konten::count();
        $totalPlatform = Platform::where('status_aktif', true)->count();
        $totalKategori = KategoriKonten::count();
        $totalTag = Tag::count();
        $totalUsers = User::count();
        $totalAdmin = User::where('role', 'admin')->count();
        $totalPetugas = User::where('role', 'petugas')->count();

        // Statistik konten berdasarkan status
        $kontenDraft = Konten::where('status_konten', 'draft')->count();
        $kontenPublikasi = Konten::where('status_konten', 'publikasi')->count();
        $kontenArsip = Konten::where('status_konten', 'arsip')->count();

        // Statistik konten bulan ini
        $kontenBulanIni = Konten::whereYear('tgl_publikasi', now()->year)
            ->whereMonth('tgl_publikasi', now()->month)
            ->count();

        // Konten terbaru (5 terakhir)
        $kontenTerbaru = Konten::with(['platform', 'kategori', 'tags'])
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        // Statistik konten per platform
        $kontenPerPlatform = Platform::withCount('kontens')
            ->orderBy('kontens_count', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($platform) {
                return [
                    'name' => $platform->nm_platform,
                    'count' => $platform->kontens_count,
                ];
            });

        // Total engagement
        $totalViews = Konten::sum('jml_views') ?? 0;
        $totalLikes = Konten::sum('jml_likes') ?? 0;
        $totalKomentar = Konten::sum('jml_komentar') ?? 0;
        $totalShare = Konten::sum('jml_share') ?? 0;

        // Konten dengan engagement tertinggi
        $topKonten = Konten::select('id', 'judul_konten', 'jml_views', 'jml_likes', 'jml_komentar', 'jml_share')
            ->orderByRaw('(jml_views + jml_likes + jml_komentar + jml_share) DESC')
            ->limit(5)
            ->get();

        // Statistik konten per bulan (6 bulan terakhir)
        $kontenPerBulan = Konten::select(
            DB::raw('YEAR(tgl_publikasi) as tahun'),
            DB::raw('MONTH(tgl_publikasi) as bulan'),
            DB::raw('COUNT(*) as jumlah')
        )
            ->whereNotNull('tgl_publikasi')
            ->where('tgl_publikasi', '>=', now()->subMonths(5)->startOfMonth())
            ->groupBy(DB::raw('YEAR(tgl_publikasi)'), DB::raw('MONTH(tgl_publikasi)'))
            ->orderBy('tahun', 'asc')
            ->orderBy('bulan', 'asc')
            ->get()
            ->map(function ($item) {
                return [
                    'label' => date('M Y', mktime(0, 0, 0, $item->bulan, 1, $item->tahun)),
                    'value' => $item->jumlah,
                ];
            });

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalKonten' => $totalKonten,
                'totalPlatform' => $totalPlatform,
                'totalKategori' => $totalKategori,
                'totalTag' => $totalTag,
                'totalUsers' => $totalUsers,
                'totalAdmin' => $totalAdmin,
                'totalPetugas' => $totalPetugas,
                'kontenDraft' => $kontenDraft,
                'kontenPublikasi' => $kontenPublikasi,
                'kontenArsip' => $kontenArsip,
                'kontenBulanIni' => $kontenBulanIni,
                'totalViews' => $totalViews,
                'totalLikes' => $totalLikes,
                'totalKomentar' => $totalKomentar,
                'totalShare' => $totalShare,
            ],
            'kontenTerbaru' => $kontenTerbaru,
            'kontenPerPlatform' => $kontenPerPlatform,
            'topKonten' => $topKonten,
            'kontenPerBulan' => $kontenPerBulan,
        ]);
    }
}

