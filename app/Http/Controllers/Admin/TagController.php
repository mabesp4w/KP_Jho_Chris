<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tags = Tag::orderBy('created_at', 'desc')->get();

        return Inertia::render('Admin/Tag/Index', [
            'tags' => $tags,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nm_tag' => 'required|string|max:50|unique:tag,nm_tag',
            'slug_tag' => 'nullable|string|max:50|unique:tag,slug_tag',
        ]);

        if ($validator->fails()) {
            return redirect()
                ->back()
                ->withErrors($validator)
                ->withInput();
        }

        $slug = $request->slug_tag ?: Str::slug($request->nm_tag);

        Tag::create([
            'nm_tag' => $request->nm_tag,
            'slug_tag' => $slug,
        ]);

        return redirect()
            ->route('admin.tag.index')
            ->with('success', 'Tag berhasil ditambahkan.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tag $tag)
    {
        $validator = Validator::make($request->all(), [
            'nm_tag' => 'required|string|max:50|unique:tag,nm_tag,' . $tag->id,
            'slug_tag' => 'nullable|string|max:50|unique:tag,slug_tag,' . $tag->id,
        ]);

        if ($validator->fails()) {
            return redirect()
                ->back()
                ->withErrors($validator)
                ->withInput();
        }

        $slug = $request->slug_tag ?: Str::slug($request->nm_tag);

        $tag->update([
            'nm_tag' => $request->nm_tag,
            'slug_tag' => $slug,
        ]);

        return redirect()
            ->route('admin.tag.index')
            ->with('success', 'Tag berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tag $tag)
    {
        $tag->delete();

        return redirect()
            ->route('admin.tag.index')
            ->with('success', 'Tag berhasil dihapus.');
    }
}

