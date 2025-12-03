<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Konten extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'konten';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'id_platform',
        'id_kategori',
        'judul_konten',
        'link_konten',
        'tgl_publikasi',
        'catatan',
        'status_konten',
        'perlu_promosi',
        'kolaborasi',
        'kolaborasi_dengan',
        'jml_views',
        'jml_likes',
        'jml_komentar',
        'jml_share',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'tgl_publikasi' => 'date',
            'status_konten' => 'string',
            'perlu_promosi' => 'boolean',
            'kolaborasi' => 'boolean',
            'jml_views' => 'integer',
            'jml_likes' => 'integer',
            'jml_komentar' => 'integer',
            'jml_share' => 'integer',
        ];
    }

    /**
     * Get the platform that owns the konten.
     */
    public function platform(): BelongsTo
    {
        return $this->belongsTo(Platform::class, 'id_platform');
    }

    /**
     * Get the kategori that owns the konten.
     */
    public function kategori(): BelongsTo
    {
        return $this->belongsTo(KategoriKonten::class, 'id_kategori');
    }

    /**
     * The tags that belong to the konten.
     */
    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class, 'konten_tag', 'id_konten', 'id_tag')
            ->withTimestamps();
    }
}

