<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TiemposEsperaSeeder extends Seeder
{
    public function run(): void
    {
        $tiempos = [
            ['rezo' => 'fajr',    'minutos' => 20],
            ['rezo' => 'sunrise', 'minutos' => 0],
            ['rezo' => 'dhuhr',   'minutos' => 10],
            ['rezo' => 'asr',     'minutos' => 10],
            ['rezo' => 'maghrib', 'minutos' => 10],
            ['rezo' => 'isha',    'minutos' => 10],
        ];

        foreach ($tiempos as $t) {
            DB::table('tiempos_espera')->updateOrInsert(
                ['rezo' => $t['rezo']],
                array_merge($t, ['created_at' => now(), 'updated_at' => now()])
            );
        }

        $this->command->info('✔ Tiempos de espera insertados.');
    }
}