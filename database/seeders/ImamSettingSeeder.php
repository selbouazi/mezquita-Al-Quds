<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ImamSettingSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('imam_settings')->updateOrInsert(
            ['id' => 1],
            [
                'nombre' => 'Sulayman Al-Bouzi',
                'descripcion' => 'Imam de la Mezquita Al‑Quds de El Vendrell. Graduado en estudios islámicos, lleva más de una década al servicio de la comunidad, impartiendo clases de árabe, Corán y liderando las oraciones diarias y del viernes.',
                'foto' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );

        $this->command->info('✔ Información del imam insertada.');
    }
}
