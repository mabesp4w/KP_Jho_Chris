<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class KategoriKonten extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'kategori_konten';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nm_kategori',
        'slug_kategori',
        'desk_kategori',
    ];

    /**
     * Get the konten for the kategori.
     */
    public function kontens(): HasMany
    {
        return $this->hasMany(Konten::class, 'id_kategori');
    }
}

