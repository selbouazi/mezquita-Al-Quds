<?php

namespace Database\Seeders;

use App\Models\Norma;
use Illuminate\Database\Seeder;

class NormaSeeder extends Seeder
{
    public function run(): void
    {
        $normas = [
            [
                'titulo' => 'Mantener el respeto y silencio',
                'descripcion' => 'Durante las oraciones y actividades en la mezquita, se debe guardar silencio y mantener una actitud respetuosa.',
                'imagen' => '/img/allahakbar.png',
                'orden' => 1,
            ],
            [
                'titulo' => 'Vestimenta adecuada',
                'descripcion' => 'Se requiere vestimenta modesta y adecuada dentro de las instalaciones de la mezquita.',
                'imagen' => '/img/allahakbar.png',
                'orden' => 2,
            ],
            [
                'titulo' => 'Prohibido fumar',
                'descripcion' => 'No está permitido fumar dentro de las instalaciones de la mezquita en ningún momento.',
                'imagen' => '/img/allahakbar.png',
                'orden' => 3,
            ],
            [
                'titulo' => 'Uso del calzado',
                'descripcion' => 'Por favor, retire el calzado antes de ingresar a la sala de oración.',
                'imagen' => '/img/allahakbar.png',
                'orden' => 4,
            ],
            [
                'titulo' => 'Puntualidad',
                'descripcion' => 'Se recomienda llegar puntual a las oraciones y actividades programadas.',
                'imagen' => '/img/allahakbar.png',
                'orden' => 5,
            ],
        ];

        foreach ($normas as $norma) {
            Norma::updateOrCreate(
                ['titulo' => $norma['titulo']],
                $norma
            );
        }

        $this->command->info('✔ Normas de la mezquita creadas correctamente');
    }
}
