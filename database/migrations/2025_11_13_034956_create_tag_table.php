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
        Schema::create('tag', function (Blueprint $table) {
            $table->id();
            $table->string('nm_tag', 50)->unique(); // Nama tag
            $table->string('slug_tag', 50)->unique(); // Slug untuk URL
            $table->timestamps();
        });

        // Tabel pivot untuk relasi many-to-many
        Schema::create('konten_tag', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_konten')->constrained('konten')->onDelete('cascade');
            $table->foreignId('id_tag')->constrained('tag')->onDelete('cascade');
            $table->timestamps();

            // Composite unique constraint untuk menghindari duplikasi kombinasi konten dan tag
            // Ini memungkinkan satu konten memiliki banyak tag, dan satu tag bisa dimiliki banyak konten
            $table->unique(['id_konten', 'id_tag'], 'konten_tag_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('konten_tag');
        Schema::dropIfExists('tag');
    }
};
