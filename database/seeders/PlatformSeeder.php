<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PlatformSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $platforms = [
            [
                'nm_platform' => 'YouTube',
                'icon_platform' => 'youtube-icon.svg',
                'status_aktif' => true,
            ],
            [
                'nm_platform' => 'Instagram',
                'icon_platform' => 'instagram-icon.svg',
                'status_aktif' => true,
            ],
            [
                'nm_platform' => 'TikTok',
                'icon_platform' => 'tiktok-icon.svg',
                'status_aktif' => true,
            ],
            [
                'nm_platform' => 'Facebook',
                'icon_platform' => 'facebook-icon.svg',
                'status_aktif' => true,
            ],
            [
                'nm_platform' => 'Twitter',
                'icon_platform' => 'twitter-icon.svg',
                'status_aktif' => true,
            ],
            [
                'nm_platform' => 'LinkedIn',
                'icon_platform' => 'linkedin-icon.svg',
                'status_aktif' => true,
            ],
            [
                'nm_platform' => 'Pinterest',
                'icon_platform' => 'pinterest-icon.svg',
                'status_aktif' => true,
            ],
            [
                'nm_platform' => 'Snapchat',
                'icon_platform' => 'snapchat-icon.svg',
                'status_aktif' => true,
            ],
            [
                'nm_platform' => 'WhatsApp',
                'icon_platform' => 'whatsapp-icon.svg',
                'status_aktif' => true,
            ],
            [
                'nm_platform' => 'Telegram',
                'icon_platform' => 'telegram-icon.svg',
                'status_aktif' => true,
            ],
            [
                'nm_platform' => 'Discord',
                'icon_platform' => 'discord-icon.svg',
                'status_aktif' => true,
            ],
            [
                'nm_platform' => 'Reddit',
                'icon_platform' => 'reddit-icon.svg',
                'status_aktif' => true,
            ],
            [
                'nm_platform' => 'Twitch',
                'icon_platform' => 'twitch-icon.svg',
                'status_aktif' => true,
            ],
            [
                'nm_platform' => 'Spotify',
                'icon_platform' => 'spotify-icon.svg',
                'status_aktif' => false,
            ],
        ];

        foreach ($platforms as $platform) {
            DB::table('platform')->insert([
                ...$platform,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
