<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'suli@gmail.com'],
            [
                'name' => 'Suli',
                'password' => Hash::make('11111111'),
                'email_verified_at' => now(),
                'rol' => 'admin',
            ]
        );

        $this->command->info('✔ Usuario administrador creado: suli@gmail.com / 11111111');
    }
}