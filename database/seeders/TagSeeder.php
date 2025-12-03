<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tags = [
            ['nm_tag' => 'Viral', 'slug_tag' => 'viral'],
            ['nm_tag' => 'Trending', 'slug_tag' => 'trending'],
            ['nm_tag' => 'Hot', 'slug_tag' => 'hot'],
            ['nm_tag' => 'New', 'slug_tag' => 'new'],
            ['nm_tag' => 'Popular', 'slug_tag' => 'popular'],
            ['nm_tag' => 'Best', 'slug_tag' => 'best'],
            ['nm_tag' => 'Top', 'slug_tag' => 'top'],
            ['nm_tag' => 'Latest', 'slug_tag' => 'latest'],
            ['nm_tag' => 'Featured', 'slug_tag' => 'featured'],
            ['nm_tag' => 'Recommended', 'slug_tag' => 'recommended'],
            ['nm_tag' => 'Must Watch', 'slug_tag' => 'must-watch'],
            ['nm_tag' => 'Exclusive', 'slug_tag' => 'exclusive'],
            ['nm_tag' => 'Premium', 'slug_tag' => 'premium'],
            ['nm_tag' => 'Special', 'slug_tag' => 'special'],
        ];

        foreach ($tags as $tag) {
            DB::table('tag')->insert([
                ...$tag,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}

