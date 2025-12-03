<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [\App\Http\Controllers\WelcomeController::class, 'index']);
Route::get('/konten', [\App\Http\Controllers\WelcomeController::class, 'konten'])->name('public.konten.index');
Route::get('/tentang', [\App\Http\Controllers\WelcomeController::class, 'tentang'])->name('public.tentang.index');

// User Routes - Untuk user yang sudah login (bukan admin/petugas)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [\App\Http\Controllers\UserController::class, 'dashboard'])->name('dashboard');
    // User konten menggunakan route publik yang sama, tapi dengan fitur tambahan jika perlu
    Route::get('/user/konten', [\App\Http\Controllers\UserController::class, 'konten'])->name('user.konten.index');
});

// Admin Routes - Hanya bisa diakses oleh admin
Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [\App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('dashboard');

    // Platform Routes
    Route::resource('platform', \App\Http\Controllers\Admin\PlatformController::class);

    // Kategori Konten Routes
    Route::get('/kategori-konten', [\App\Http\Controllers\Admin\KategoriKontenController::class, 'index'])->name('kategori-konten.index');
    Route::post('/kategori-konten', [\App\Http\Controllers\Admin\KategoriKontenController::class, 'store'])->name('kategori-konten.store');
    Route::put('/kategori-konten/{kategoriKonten:id}', [\App\Http\Controllers\Admin\KategoriKontenController::class, 'update'])->name('kategori-konten.update');
    Route::delete('/kategori-konten/{kategoriKonten:id}', [\App\Http\Controllers\Admin\KategoriKontenController::class, 'destroy'])->name('kategori-konten.destroy');

    // Konten Routes
    Route::get('/konten', [\App\Http\Controllers\Admin\KontenController::class, 'index'])->name('konten.index');
    Route::post('/konten', [\App\Http\Controllers\Admin\KontenController::class, 'store'])->name('konten.store');
    Route::put('/konten/{konten}', [\App\Http\Controllers\Admin\KontenController::class, 'update'])->name('konten.update');
    Route::delete('/konten/{konten}', [\App\Http\Controllers\Admin\KontenController::class, 'destroy'])->name('konten.destroy');

    // Tag Routes
    Route::get('/tag', [\App\Http\Controllers\Admin\TagController::class, 'index'])->name('tag.index');
    Route::post('/tag', [\App\Http\Controllers\Admin\TagController::class, 'store'])->name('tag.store');
    Route::put('/tag/{tag}', [\App\Http\Controllers\Admin\TagController::class, 'update'])->name('tag.update');
    Route::delete('/tag/{tag}', [\App\Http\Controllers\Admin\TagController::class, 'destroy'])->name('tag.destroy');

    // Pengguna Routes (placeholder - akan dibuat controller nanti)
    Route::get('/pengguna', function () {
        return Inertia::render('Admin/Pengguna/Index', [
            'users' => [],
        ]);
    })->name('pengguna.index');

    // Laporan Routes
    Route::get('/laporan', [\App\Http\Controllers\Admin\LaporanController::class, 'index'])->name('laporan.index');
    Route::get('/laporan/export/excel', [\App\Http\Controllers\Admin\LaporanController::class, 'exportExcel'])->name('laporan.export.excel');
    Route::get('/laporan/export/pdf', [\App\Http\Controllers\Admin\LaporanController::class, 'exportPdf'])->name('laporan.export.pdf');
});

// Petugas Routes - Hanya bisa diakses oleh petugas
Route::middleware(['auth', 'verified', 'role:petugas'])->prefix('petugas')->name('petugas.')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Petugas/Dashboard');
    })->name('dashboard');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
