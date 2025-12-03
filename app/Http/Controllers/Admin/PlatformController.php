<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Platform;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class PlatformController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $platforms = Platform::orderBy('created_at', 'desc')->get();

        return Inertia::render('Admin/Platform/Index', [
            'platforms' => $platforms,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Platform/Form', [
            'platform' => null,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nm_platform' => 'required|string|max:50|unique:platform,nm_platform',
            'icon_platform' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'status_aktif' => 'boolean',
        ]);

        if ($validator->fails()) {
            return redirect()
                ->back()
                ->withErrors($validator)
                ->withInput();
        }

        // Upload gambar
        $iconPath = $request->file('icon_platform')->store('platforms', 'public');

        Platform::create([
            'nm_platform' => $request->nm_platform,
            'icon_platform' => $iconPath,
            'status_aktif' => $request->has('status_aktif') ? $request->status_aktif : true,
        ]);

        return redirect()
            ->route('admin.platform.index')
            ->with('success', 'Platform berhasil ditambahkan.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Platform $platform)
    {
        return Inertia::render('Admin/Platform/Form', [
            'platform' => $platform,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Platform $platform)
    {
        $validator = Validator::make($request->all(), [
            'nm_platform' => 'required|string|max:50|unique:platform,nm_platform,' . $platform->id,
            'icon_platform' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'status_aktif' => 'boolean',
        ]);

        if ($validator->fails()) {
            return redirect()
                ->back()
                ->withErrors($validator)
                ->withInput();
        }

        // Hapus gambar lama jika ada
        if ($platform->icon_platform && Storage::disk('public')->exists($platform->icon_platform)) {
            Storage::disk('public')->delete($platform->icon_platform);
        }

        // Upload gambar baru
        $iconPath = $request->file('icon_platform')->store('platforms', 'public');

        $platform->update([
            'nm_platform' => $request->nm_platform,
            'icon_platform' => $iconPath,
            'status_aktif' => $request->has('status_aktif') ? $request->status_aktif : true,
        ]);

        return redirect()
            ->route('admin.platform.index')
            ->with('success', 'Platform berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Platform $platform)
    {
        $platform->delete();

        return redirect()
            ->route('admin.platform.index')
            ->with('success', 'Platform berhasil dihapus.');
    }
}

