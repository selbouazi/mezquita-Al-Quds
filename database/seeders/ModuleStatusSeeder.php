<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ModuleStatusSeeder extends Seeder
{
    public function run(): void
    {
        $modules = ['horarios', 'donativos', 'facturas', 'noticias', 'imam', 'clases', 'ubicacion'];

        foreach ($modules as $module) {
            DB::table('module_status')->updateOrInsert(
                ['module' => $module],
                ['activo' => true, 'created_at' => now(), 'updated_at' => now()]
            );
        }

        $this->command->info('✔ Estado de módulos insertado.');
    }
}
