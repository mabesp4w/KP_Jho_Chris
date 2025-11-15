<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('konten', function (Blueprint $table) {
            $table->id();
            // Relasi ke tabel lain
            $table->foreignId('id_platform')->constrained('platform')->onDelete('cascade');
            $table->foreignId('id_kategori')->nullable()->constrained('kategori_konten')->onDelete('cascade');

            // Data konten
            $table->string('judul_konten'); // Judul konten
            $table->text('link_konten'); // Link/URL konten

            // Tanggal publikasi
            $table->smallInteger('tgl_publikasi'); // Tanggal publikasi
            $table->year('tahun'); // Tahun (untuk rekap tahunan)
            $table->tinyInteger('bulan'); // Bulan (1-12)

            // Informasi tambahan
            $table->text('catatan')->nullable(); // Catatan/keterangan tambahan

            // Status dan promosi
            $table->enum('status_konten', ['draft', 'publikasi', 'arsip'])->default('publikasi');
            $table->boolean('perlu_promosi')->default(false); // Perlu dipromosikan ulang
            $table->boolean('kolaborasi')->default(false); // Apakah kolaborasi
            $table->string('kolaborasi_dengan')->nullable(); // Kolaborasi dengan siapa

            // Metrik engagement (opsional, bisa diisi manual atau via API)
            $table->integer('jml_views')->nullable(); // Jumlah views/tayangan
            $table->integer('jml_likes')->nullable(); // Jumlah likes/suka
            $table->integer('jml_komentar')->nullable(); // Jumlah komentar
            $table->integer('jml_share')->nullable(); // Jumlah share/bagikan

            // Timestamps
            $table->timestamps();
            $table->softDeletes(); // Untuk soft delete

            // Index untuk performa query
            $table->index('tgl_publikasi');
            $table->index(['tahun', 'bulan']);
            $table->index('status_konten');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('konten');
    }
};
