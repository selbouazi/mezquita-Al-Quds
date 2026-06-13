<?php

namespace App\Http\Controllers;

use App\Services\HorarioService;
use App\Services\TiempoEsperaService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HorarioController extends Controller
{
    /**
     * Muestra la página principal con los horarios de hoy.
     *
     * @return Response
     */
    public function home(): Response
    {
        $tiemposEspera = TiempoEsperaService::getTiemposEspera();

        return Inertia::render('Home', [
            'prayerTimes' => HorarioService::getHorarioHoy(),
            'tiemposEspera' => $tiemposEspera,
        ]);
    }

    /**
     * Muestra los horarios de un mes específico.
     *
     * @param Request $request
     * @return Response
     */
    public function horarios(Request $request): Response
    {
        $year = $request->input('year', now()->year);
        $month = $request->input('month', now()->month);

        $horarios = HorarioService::getHorariosMes($year, $month);

        return Inertia::render('Horarios', [
            'horariosMes' => $horarios,
            'year' => (int) $year,
            'month' => (int) $month,
            'prayerTimes' => HorarioService::getHorarioHoy(),
        ]);
    }
}
