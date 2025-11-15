<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('konten', function (Blueprint $table) {
            // Drop index yang menggunakan tahun dan bulan
            $table->dropIndex(['tahun', 'bulan']);
        });
        
        // Drop columns tahun dan bulan
        Schema::table('konten', function (Blueprint $table) {
            $table->dropColumn(['tahun', 'bulan']);
        });
        
        // Change tgl_publikasi from smallInteger to date
        // Using raw SQL to avoid doctrine/dbal dependency
        DB::statement('ALTER TABLE konten MODIFY tgl_publikasi DATE');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Change tgl_publikasi back to smallInteger
        DB::statement('ALTER TABLE konten MODIFY tgl_publikasi SMALLINT');
        
        // Add back tahun and bulan columns
        Schema::table('konten', function (Blueprint $table) {
            $table->year('tahun')->after('tgl_publikasi');
            $table->tinyInteger('bulan')->after('tahun');
        });
        
        // Add back index
        Schema::table('konten', function (Blueprint $table) {
            $table->index(['tahun', 'bulan']);
        });
    }
};
