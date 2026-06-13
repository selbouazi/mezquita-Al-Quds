<?php

namespace Database\Seeders;

use App\Models\Ubicacion;
use Illuminate\Database\Seeder;

class UbicacionSeeder extends Seeder
{
    public function run(): void
    {
        Ubicacion::updateOrCreate(
            ['id' => 1],
            [
                'direccion' => 'Carrer dels Carboners, 11, 43700 El Vendrell, Tarragona, España',
                'latitud' => '41.230484',
                'longitud' => '1.532144',
                'telefono' => '+34 600 000 000',
                'email' => 'info@mezquita-alquds.cat',
                'whatsapp' => '+34 600 000 000',
            ]
        );
    }
}
