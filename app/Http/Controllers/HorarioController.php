<?php

namespace App\Http\Controllers;

use App\Services\HorarioService;
use App\Services\TiempoEsperaService;
use App\Models\TiempoEspera;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HorarioController extends Controller
{
    /**
     * Página de inicio con horario de hoy.
     */
    public function home()
    {
        $tiemposEspera = TiempoEsperaService::getTiemposEspera();
        
        return Inertia::render('Home', [
            'prayerTimes' => HorarioService::getHorarioHoy(),
            'tiemposEspera' => $tiemposEspera,
        ]);
    }

    /**
     * Página de horarios mensual con parámetros de año y mes.
     */
    public function horarios(Request $request)
    {
        $year  = $request->input('year', now()->year);
        $month = $request->input('month', now()->month);

        $horarios = HorarioService::getHorariosMes($year, $month);

        return Inertia::render('Horarios', [
            'horariosMes' => $horarios,
            'year'        => (int) $year,
            'month'       => (int) $month,
            'prayerTimes' => HorarioService::getHorarioHoy(),
        ]);
    }

    /**
     * Página de noticias (placeholder).
     */
    public function noticias()
    {
        return Inertia::render('Noticias');
    }

    /**
     * Página de contacto (placeholder).
     */
    public function contacto()
    {
        return Inertia::render('Contacto');
    }

    /**
     * Página de ubicación (placeholder).
     */
    public function ubicacion()
    {
        return Inertia::render('Ubicacion');
    }

    /**
     * Cambiar idioma.
     */
    public function switchLang(Request $request, $lang)
    {
        if (in_array($lang, ['es', 'ca', 'ar'])) {
            $request->session()->put('locale', $lang);
        }
        return back();
    }
}