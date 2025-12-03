<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Konten;
use App\Models\Platform;
use App\Models\KategoriKonten;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Border;
use Barryvdh\DomPDF\Facade\Pdf;

class LaporanController extends Controller
{
    /**
     * Display the report page.
     */
    public function index(Request $request)
    {
        $query = Konten::with(['platform', 'kategori', 'tags']);

        // Filter by date range
        if ($request->has('tanggal_mulai') && $request->tanggal_mulai) {
            $query->whereDate('tgl_publikasi', '>=', $request->tanggal_mulai);
        }
        if ($request->has('tanggal_akhir') && $request->tanggal_akhir) {
            $query->whereDate('tgl_publikasi', '<=', $request->tanggal_akhir);
        }

        // Filter by platform
        if ($request->has('platform') && $request->platform) {
            $query->where('id_platform', $request->platform);
        }

        // Filter by kategori
        if ($request->has('kategori') && $request->kategori) {
            $query->where('id_kategori', $request->kategori);
        }

        // Filter by status
        if ($request->has('status') && $request->status) {
            $query->where('status_konten', $request->status);
        }

        // Get filtered data
        $kontens = $query->orderBy('tgl_publikasi', 'desc')->get();

        // Calculate statistics
        $totalKonten = $kontens->count();
        $totalViews = $kontens->sum('jml_views') ?? 0;
        $totalLikes = $kontens->sum('jml_likes') ?? 0;
        $totalKomentar = $kontens->sum('jml_komentar') ?? 0;
        $totalShare = $kontens->sum('jml_share') ?? 0;
        $totalEngagement = $totalViews + $totalLikes + $totalKomentar + $totalShare;

        // Konten per platform
        $kontenPerPlatform = $kontens->groupBy('id_platform')->map(function ($items, $platformId) {
            $platform = Platform::find($platformId);
            return [
                'platform' => $platform ? $platform->nm_platform : 'Unknown',
                'count' => $items->count(),
                'views' => $items->sum('jml_views') ?? 0,
                'likes' => $items->sum('jml_likes') ?? 0,
            ];
        })->values();

        // Get filter options
        $platforms = Platform::where('status_aktif', true)->get();
        $kategoris = KategoriKonten::all();

        return Inertia::render('Admin/Laporan/Index', [
            'kontens' => $kontens,
            'platforms' => $platforms,
            'kategoris' => $kategoris,
            'stats' => [
                'totalKonten' => $totalKonten,
                'totalViews' => $totalViews,
                'totalLikes' => $totalLikes,
                'totalKomentar' => $totalKomentar,
                'totalShare' => $totalShare,
                'totalEngagement' => $totalEngagement,
            ],
            'kontenPerPlatform' => $kontenPerPlatform,
            'filters' => [
                'tanggal_mulai' => $request->tanggal_mulai ?? '',
                'tanggal_akhir' => $request->tanggal_akhir ?? '',
                'platform' => $request->platform ?? '',
                'kategori' => $request->kategori ?? '',
                'status' => $request->status ?? '',
            ],
        ]);
    }

    /**
     * Export data to Excel.
     */
    public function exportExcel(Request $request)
    {
        $query = Konten::with(['platform', 'kategori', 'tags']);

        // Apply same filters as index
        if ($request->has('tanggal_mulai') && $request->tanggal_mulai) {
            $query->whereDate('tgl_publikasi', '>=', $request->tanggal_mulai);
        }
        if ($request->has('tanggal_akhir') && $request->tanggal_akhir) {
            $query->whereDate('tgl_publikasi', '<=', $request->tanggal_akhir);
        }
        if ($request->has('platform') && $request->platform) {
            $query->where('id_platform', $request->platform);
        }
        if ($request->has('kategori') && $request->kategori) {
            $query->where('id_kategori', $request->kategori);
        }
        if ($request->has('status') && $request->status) {
            $query->where('status_konten', $request->status);
        }

        $kontens = $query->orderBy('tgl_publikasi', 'desc')->get();

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        // Set title
        $sheet->setTitle('Laporan Konten');

        // Header style
        $headerStyle = [
            'font' => [
                'bold' => true,
                'color' => ['rgb' => 'FFFFFF'],
                'size' => 12,
            ],
            'fill' => [
                'fillType' => Fill::FILL_SOLID,
                'startColor' => ['rgb' => '4472C4'],
            ],
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_CENTER,
                'vertical' => Alignment::VERTICAL_CENTER,
            ],
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                ],
            ],
        ];

        // Title
        $sheet->setCellValue('A1', 'LAPORAN KONTEN MEDIA SOSIAL');
        $sheet->mergeCells('A1:J1');
        $sheet->getStyle('A1')->applyFromArray([
            'font' => ['bold' => true, 'size' => 16],
            'alignment' => ['horizontal' => Alignment::HORIZONTAL_CENTER],
        ]);
        $sheet->getRowDimension('1')->setRowHeight(30);

        // Filter info
        $row = 3;
        if ($request->tanggal_mulai || $request->tanggal_akhir) {
            $sheet->setCellValue('A' . $row, 'Periode: ' . ($request->tanggal_mulai ?? 'Awal') . ' s/d ' . ($request->tanggal_akhir ?? 'Akhir'));
            $sheet->mergeCells('A' . $row . ':J' . $row);
            $row++;
        }

        // Headers
        $headers = ['No', 'Judul Konten', 'Platform', 'Kategori', 'Tanggal Publikasi', 'Status', 'Views', 'Likes', 'Komentar', 'Share'];
        $col = 'A';
        foreach ($headers as $header) {
            $sheet->setCellValue($col . $row, $header);
            $sheet->getStyle($col . $row)->applyFromArray($headerStyle);
            $sheet->getColumnDimension($col)->setAutoSize(true);
            $col++;
        }
        $sheet->getRowDimension($row)->setRowHeight(25);

        // Data
        $row++;
        $no = 1;
        foreach ($kontens as $konten) {
            $sheet->setCellValue('A' . $row, $no++);
            $sheet->setCellValue('B' . $row, $konten->judul_konten);
            $sheet->setCellValue('C' . $row, $konten->platform->nm_platform ?? '-');
            $sheet->setCellValue('D' . $row, $konten->kategori->nm_kategori ?? '-');
            $sheet->setCellValue('E' . $row, $konten->tgl_publikasi ? date('d/m/Y', strtotime($konten->tgl_publikasi)) : '-');
            $sheet->setCellValue('F' . $row, ucfirst($konten->status_konten));
            $sheet->setCellValue('G' . $row, $konten->jml_views ?? 0);
            $sheet->setCellValue('H' . $row, $konten->jml_likes ?? 0);
            $sheet->setCellValue('I' . $row, $konten->jml_komentar ?? 0);
            $sheet->setCellValue('J' . $row, $konten->jml_share ?? 0);

            // Center align for number columns
            $sheet->getStyle('A' . $row)->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
            $sheet->getStyle('G' . $row . ':J' . $row)->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);

            // Borders
            $sheet->getStyle('A' . $row . ':J' . $row)->applyFromArray([
                'borders' => [
                    'allBorders' => [
                        'borderStyle' => Border::BORDER_THIN,
                    ],
                ],
            ]);

            $row++;
        }

        // Summary
        $row++;
        $sheet->setCellValue('A' . $row, 'TOTAL');
        $sheet->mergeCells('A' . $row . ':F' . $row);
        $sheet->setCellValue('G' . $row, $kontens->sum('jml_views') ?? 0);
        $sheet->setCellValue('H' . $row, $kontens->sum('jml_likes') ?? 0);
        $sheet->setCellValue('I' . $row, $kontens->sum('jml_komentar') ?? 0);
        $sheet->setCellValue('J' . $row, $kontens->sum('jml_share') ?? 0);
        $sheet->getStyle('A' . $row . ':J' . $row)->applyFromArray([
            'font' => ['bold' => true],
            'fill' => [
                'fillType' => Fill::FILL_SOLID,
                'startColor' => ['rgb' => 'E7E6E6'],
            ],
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                ],
            ],
        ]);
        $sheet->getStyle('A' . $row)->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
        $sheet->getStyle('G' . $row . ':J' . $row)->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);

        // Generate filename
        $filename = 'Laporan_Konten_' . date('Y-m-d_His') . '.xlsx';

        $writer = new Xlsx($spreadsheet);
        $tempFile = tempnam(sys_get_temp_dir(), 'laporan_');
        $writer->save($tempFile);

        return response()->download($tempFile, $filename)->deleteFileAfterSend(true);
    }

    /**
     * Export data to PDF.
     */
    public function exportPdf(Request $request)
    {
        $query = Konten::with(['platform', 'kategori', 'tags']);

        // Apply same filters as index
        if ($request->has('tanggal_mulai') && $request->tanggal_mulai) {
            $query->whereDate('tgl_publikasi', '>=', $request->tanggal_mulai);
        }
        if ($request->has('tanggal_akhir') && $request->tanggal_akhir) {
            $query->whereDate('tgl_publikasi', '<=', $request->tanggal_akhir);
        }
        if ($request->has('platform') && $request->platform) {
            $query->where('id_platform', $request->platform);
        }
        if ($request->has('kategori') && $request->kategori) {
            $query->where('id_kategori', $request->kategori);
        }
        if ($request->has('status') && $request->status) {
            $query->where('status_konten', $request->status);
        }

        $kontens = $query->orderBy('tgl_publikasi', 'desc')->get();

        // Calculate statistics
        $totalKonten = $kontens->count();
        $totalViews = $kontens->sum('jml_views') ?? 0;
        $totalLikes = $kontens->sum('jml_likes') ?? 0;
        $totalKomentar = $kontens->sum('jml_komentar') ?? 0;
        $totalShare = $kontens->sum('jml_share') ?? 0;
        $totalEngagement = $totalViews + $totalLikes + $totalKomentar + $totalShare;

        // Get platform and kategori names for filters
        $platformName = $request->platform ? Platform::find($request->platform)?->nm_platform : null;
        $kategoriName = $request->kategori ? KategoriKonten::find($request->kategori)?->nm_kategori : null;

        $pdf = Pdf::loadView('admin.laporan.pdf', [
            'kontens' => $kontens,
            'stats' => [
                'totalKonten' => $totalKonten,
                'totalViews' => $totalViews,
                'totalLikes' => $totalLikes,
                'totalKomentar' => $totalKomentar,
                'totalShare' => $totalShare,
                'totalEngagement' => $totalEngagement,
            ],
            'filters' => [
                'tanggal_mulai' => $request->tanggal_mulai,
                'tanggal_akhir' => $request->tanggal_akhir,
                'platform' => $platformName,
                'kategori' => $kategoriName,
                'status' => $request->status,
            ],
        ])->setPaper('a4', 'landscape');

        $filename = 'Laporan_Konten_' . date('Y-m-d_His') . '.pdf';

        return $pdf->download($filename);
    }
}

