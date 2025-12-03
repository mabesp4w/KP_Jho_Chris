<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laporan Konten Media Sosial</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 10px;
            margin: 0;
            padding: 10px;
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .header h1 {
            margin: 0;
            font-size: 18px;
            font-weight: bold;
        }
        .header p {
            margin: 5px 0;
            font-size: 12px;
        }
        .filter-info {
            margin-bottom: 15px;
            font-size: 9px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        th, td {
            border: 1px solid #000;
            padding: 6px;
            text-align: left;
        }
        th {
            background-color: #4472C4;
            color: #fff;
            font-weight: bold;
            text-align: center;
        }
        tr:nth-child(even) {
            background-color: #f2f2f2;
        }
        .text-center {
            text-align: center;
        }
        .text-right {
            text-align: right;
        }
        .summary {
            margin-top: 20px;
            font-weight: bold;
        }
        .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 9px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>LAPORAN KONTEN MEDIA SOSIAL</h1>
        <p>Kanwil Kemenag Prov. Papua</p>
        <p>Periode: {{ $filters['tanggal_mulai'] ? date('d/m/Y', strtotime($filters['tanggal_mulai'])) : 'Semua' }} 
           @if($filters['tanggal_akhir']) s/d {{ date('d/m/Y', strtotime($filters['tanggal_akhir'])) }} @endif</p>
    </div>

    @if($filters['platform'] || $filters['kategori'] || $filters['status'])
    <div class="filter-info">
        <strong>Filter:</strong>
        @if($filters['platform']) Platform: {{ $filters['platform'] }} | @endif
        @if($filters['kategori']) Kategori: {{ $filters['kategori'] }} | @endif
        @if($filters['status']) Status: {{ ucfirst($filters['status']) }} @endif
    </div>
    @endif

    <table>
        <thead>
            <tr>
                <th style="width: 3%;">No</th>
                <th style="width: 25%;">Judul Konten</th>
                <th style="width: 10%;">Platform</th>
                <th style="width: 12%;">Kategori</th>
                <th style="width: 10%;">Tanggal Publikasi</th>
                <th style="width: 8%;">Status</th>
                <th style="width: 8%;" class="text-center">Views</th>
                <th style="width: 8%;" class="text-center">Likes</th>
                <th style="width: 8%;" class="text-center">Komentar</th>
                <th style="width: 8%;" class="text-center">Share</th>
            </tr>
        </thead>
        <tbody>
            @forelse($kontens as $index => $konten)
            <tr>
                <td class="text-center">{{ $index + 1 }}</td>
                <td>{{ $konten->judul_konten }}</td>
                <td>{{ $konten->platform->nm_platform ?? '-' }}</td>
                <td>{{ $konten->kategori->nm_kategori ?? '-' }}</td>
                <td class="text-center">{{ $konten->tgl_publikasi ? date('d/m/Y', strtotime($konten->tgl_publikasi)) : '-' }}</td>
                <td class="text-center">{{ ucfirst($konten->status_konten) }}</td>
                <td class="text-center">{{ number_format($konten->jml_views ?? 0, 0, ',', '.') }}</td>
                <td class="text-center">{{ number_format($konten->jml_likes ?? 0, 0, ',', '.') }}</td>
                <td class="text-center">{{ number_format($konten->jml_komentar ?? 0, 0, ',', '.') }}</td>
                <td class="text-center">{{ number_format($konten->jml_share ?? 0, 0, ',', '.') }}</td>
            </tr>
            @empty
            <tr>
                <td colspan="10" class="text-center">Tidak ada data</td>
            </tr>
            @endforelse
        </tbody>
        <tfoot>
            <tr style="background-color: #E7E6E6; font-weight: bold;">
                <td colspan="6" class="text-center">TOTAL</td>
                <td class="text-center">{{ number_format($stats['totalViews'], 0, ',', '.') }}</td>
                <td class="text-center">{{ number_format($stats['totalLikes'], 0, ',', '.') }}</td>
                <td class="text-center">{{ number_format($stats['totalKomentar'], 0, ',', '.') }}</td>
                <td class="text-center">{{ number_format($stats['totalShare'], 0, ',', '.') }}</td>
            </tr>
        </tfoot>
    </table>

    <div class="summary">
        <p>Total Konten: {{ $stats['totalKonten'] }}</p>
        <p>Total Engagement: {{ number_format($stats['totalEngagement'], 0, ',', '.') }} 
           (Views: {{ number_format($stats['totalViews'], 0, ',', '.') }}, 
           Likes: {{ number_format($stats['totalLikes'], 0, ',', '.') }}, 
           Komentar: {{ number_format($stats['totalKomentar'], 0, ',', '.') }}, 
           Share: {{ number_format($stats['totalShare'], 0, ',', '.') }})</p>
    </div>

    <div class="footer">
        <p>Dicetak pada: {{ date('d/m/Y H:i:s') }}</p>
        <p>Kanwil Kemenag Prov. Papua</p>
    </div>
</body>
</html>

