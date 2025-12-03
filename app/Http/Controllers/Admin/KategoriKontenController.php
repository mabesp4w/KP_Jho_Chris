<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\KategoriKonten;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class KategoriKontenController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $kategoriKontens = KategoriKonten::orderBy('created_at', 'desc')->get();

        return Inertia::render('Admin/KategoriKonten/Index', [
            'kategoriKontens' => $kategoriKontens,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nm_kategori' => 'required|string|max:100',
            'slug_kategori' => 'nullable|string|max:100|unique:kategori_konten,slug_kategori',
            'desk_kategori' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return redirect()
                ->back()
                ->withErrors($validator)
                ->withInput();
        }

        $slug = $request->slug_kategori ?: Str::slug($request->nm_kategori);

        KategoriKonten::create([
            'nm_kategori' => $request->nm_kategori,
            'slug_kategori' => $slug,
            'desk_kategori' => $request->desk_kategori,
        ]);

        return redirect()
            ->route('admin.kategori-konten.index')
            ->with('success', 'Kategori konten berhasil ditambahkan.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, KategoriKonten $kategoriKonten)
    {
        $validator = Validator::make($request->all(), [
            'nm_kategori' => 'required|string|max:100',
            'slug_kategori' => 'nullable|string|max:100|unique:kategori_konten,slug_kategori,' . $kategoriKonten->id,
            'desk_kategori' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return redirect()
                ->back()
                ->withErrors($validator)
                ->withInput();
        }

        $slug = $request->slug_kategori ?: Str::slug($request->nm_kategori);

        $kategoriKonten->update([
            'nm_kategori' => $request->nm_kategori,
            'slug_kategori' => $slug,
            'desk_kategori' => $request->desk_kategori,
        ]);

        return redirect()
            ->route('admin.kategori-konten.index')
            ->with('success', 'Kategori konten berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(KategoriKonten $kategoriKonten)
    {
        $kategoriKonten->delete();

        return redirect()
            ->route('admin.kategori-konten.index')
            ->with('success', 'Kategori konten berhasil dihapus.');
    }
}

