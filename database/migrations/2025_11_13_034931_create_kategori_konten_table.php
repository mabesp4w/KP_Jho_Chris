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
        Schema::create('kategori_konten', function (Blueprint $table) {
            $table->id();
            $table->string('nm_kategori', 100); // Nama kategori: Tutorial, Review Produk, Dance, dll
            $table->string('slug_kategori', 100)->unique(); // Slug untuk URL
            $table->text('desk_kategori')->nullable(); // Deskripsi kategori
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kategori_konten');
    }
};
