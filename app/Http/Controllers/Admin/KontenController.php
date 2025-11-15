<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Konten;
use App\Models\Platform;
use App\Models\KategoriKonten;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

class KontenController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $kontens = Konten::with(['platform', 'kategori', 'tags'])
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Admin/Konten/Index', [
            'kontens' => $kontens,
            'platforms' => Platform::where('status_aktif', true)->get(),
            'kategoriKontens' => KategoriKonten::all(),
            'tags' => Tag::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id_platform' => 'required|exists:platform,id',
            'id_kategori' => 'nullable|exists:kategori_konten,id',
            'judul_konten' => 'required|string',
            'link_konten' => 'required|string',
            'tgl_publikasi' => 'required|date',
            'catatan' => 'nullable|string',
            'status_konten' => 'required|in:draft,publikasi,arsip',
            'perlu_promosi' => 'boolean',
            'kolaborasi' => 'boolean',
            'kolaborasi_dengan' => 'nullable|string',
            'jml_views' => 'nullable|integer',
            'jml_likes' => 'nullable|integer',
            'jml_komentar' => 'nullable|integer',
            'jml_share' => 'nullable|integer',
            'tags' => 'nullable|array',
            'tags.*' => 'exists:tag,id',
        ]);

        if ($validator->fails()) {
            return redirect()
                ->back()
                ->withErrors($validator)
                ->withInput();
        }

        $konten = Konten::create([
            'id_platform' => $request->id_platform,
            'id_kategori' => $request->id_kategori,
            'judul_konten' => $request->judul_konten,
            'link_konten' => $request->link_konten,
            'tgl_publikasi' => $request->tgl_publikasi,
            'catatan' => $request->catatan,
            'status_konten' => $request->status_konten,
            'perlu_promosi' => $request->has('perlu_promosi') ? $request->perlu_promosi : false,
            'kolaborasi' => $request->has('kolaborasi') ? $request->kolaborasi : false,
            'kolaborasi_dengan' => $request->kolaborasi_dengan,
            'jml_views' => $request->jml_views ? (int) $request->jml_views : null,
            'jml_likes' => $request->jml_likes ? (int) $request->jml_likes : null,
            'jml_komentar' => $request->jml_komentar ? (int) $request->jml_komentar : null,
            'jml_share' => $request->jml_share ? (int) $request->jml_share : null,
        ]);

        if ($request->has('tags') && is_array($request->tags)) {
            // Remove duplicates and ensure all values are integers
            $uniqueTags = array_unique(array_map('intval', $request->tags));
            // Filter out invalid IDs (0 or false)
            $uniqueTags = array_filter($uniqueTags, function($id) {
                return $id > 0;
            });
            $konten->tags()->sync($uniqueTags);
        }

        return redirect()
            ->route('admin.konten.index')
            ->with('success', 'Konten berhasil ditambahkan.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Konten $konten)
    {
        $validator = Validator::make($request->all(), [
            'id_platform' => 'required|exists:platform,id',
            'id_kategori' => 'nullable|exists:kategori_konten,id',
            'judul_konten' => 'required|string',
            'link_konten' => 'required|string',
            'tgl_publikasi' => 'required|date',
            'catatan' => 'nullable|string',
            'status_konten' => 'required|in:draft,publikasi,arsip',
            'perlu_promosi' => 'boolean',
            'kolaborasi' => 'boolean',
            'kolaborasi_dengan' => 'nullable|string',
            'jml_views' => 'nullable|integer',
            'jml_likes' => 'nullable|integer',
            'jml_komentar' => 'nullable|integer',
            'jml_share' => 'nullable|integer',
            'tags' => 'nullable|array',
            'tags.*' => 'exists:tag,id',
        ]);

        if ($validator->fails()) {
            return redirect()
                ->back()
                ->withErrors($validator)
                ->withInput();
        }

        $konten->update([
            'id_platform' => $request->id_platform,
            'id_kategori' => $request->id_kategori,
            'judul_konten' => $request->judul_konten,
            'link_konten' => $request->link_konten,
            'tgl_publikasi' => $request->tgl_publikasi,
            'catatan' => $request->catatan,
            'status_konten' => $request->status_konten,
            'perlu_promosi' => $request->has('perlu_promosi') ? $request->perlu_promosi : false,
            'kolaborasi' => $request->has('kolaborasi') ? $request->kolaborasi : false,
            'kolaborasi_dengan' => $request->kolaborasi_dengan,
            'jml_views' => $request->jml_views ? (int) $request->jml_views : null,
            'jml_likes' => $request->jml_likes ? (int) $request->jml_likes : null,
            'jml_komentar' => $request->jml_komentar ? (int) $request->jml_komentar : null,
            'jml_share' => $request->jml_share ? (int) $request->jml_share : null,
        ]);

        if ($request->has('tags') && is_array($request->tags)) {
            // Remove duplicates and ensure all values are integers
            $uniqueTags = array_unique(array_map('intval', $request->tags));
            // Filter out invalid IDs (0 or false)
            $uniqueTags = array_filter($uniqueTags, function($id) {
                return $id > 0;
            });
            $konten->tags()->sync($uniqueTags);
        }

        return redirect()
            ->route('admin.konten.index')
            ->with('success', 'Konten berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Konten $konten)
    {
        $konten->delete();

        return redirect()
            ->route('admin.konten.index')
            ->with('success', 'Konten berhasil dihapus.');
    }
}

