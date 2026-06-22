<?php

namespace App\Http\Controllers;

use App\Models\Norma;
use App\Models\Noticia;
use App\Models\Notification;
use App\Services\HorarioService;
use App\Services\TiempoEsperaService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use OpenApi\Attributes as OA;

class HorarioController extends Controller
{
    #[OA\Get(path: '/', summary: 'Página principal con horario de hoy', tags: ['Público'], responses: [new OA\Response(response: 200, description: 'Home page')])]
    public function home()
    {
        $tiemposEspera = TiempoEsperaService::getTiemposEspera();

        $latestNews = Cache::remember('home_latest_news', 3600, function () {
            return Noticia::publicado()
                ->orderBy('fecha_publicacion', 'desc')
                ->take(3)
                ->get(['id', 'titulo', 'contenido', 'imagen', 'fecha_publicacion']);
        });

        $notificaciones = Cache::remember('home_notificaciones', 3600, function () {
            return Notification::activas()
                ->ordenadas()
                ->take(5)
                ->get(['id', 'titulo', 'mensaje', 'prioridad']);
        });

        $normas = Cache::remember('home_normas', 3600, function () {
            return Norma::activo()->ordenado()->get(['id', 'titulo', 'descripcion', 'imagen', 'orden']);
        });

        return Inertia::render('Home', [
            'prayerTimes' => HorarioService::getHorarioHoy(),
            'tiemposEspera' => $tiemposEspera,
            'latestNews' => $latestNews,
            'notificaciones' => $notificaciones,
            'normas' => $normas,
        ]);
    }

    #[OA\Get(path: '/horarios', summary: 'Calendario mensual de horarios', tags: ['Público'], parameters: [new OA\Parameter(name: 'year', in: 'query', schema: new OA\Schema(type: 'integer')), new OA\Parameter(name: 'month', in: 'query', schema: new OA\Schema(type: 'integer'))], responses: [new OA\Response(response: 200, description: 'Calendario de horarios')])]
    public function horarios(Request $request)
    {
        if (!\moduleIsActive('horarios')) {
            return inertia('ModuleDisabled');
        }

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
