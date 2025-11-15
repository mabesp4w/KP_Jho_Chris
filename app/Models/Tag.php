<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Tag extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'tag';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nm_tag',
        'slug_tag',
    ];

    /**
     * The kontens that belong to the tag.
     */
    public function kontens(): BelongsToMany
    {
        return $this->belongsToMany(Konten::class, 'konten_tag', 'id_tag', 'id_konten')
            ->withTimestamps();
    }
}

