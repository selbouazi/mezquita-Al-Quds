<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\TiempoEsperaRequest;
use App\Models\Horario;
use App\Models\TiempoEspera;
use App\Services\HorarioService;
use App\Services\TiempoEsperaService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class TiemposEsperaController extends Controller
{
    /**
     * Display the waiting times & today's horario settings form.
     */
    public function index(): Response
    {
        $tiemposDb = TiempoEspera::all()->keyBy('rezo');

        $tiempos = [];
        foreach (['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'] as $rezo) {
            $tiempos[$rezo] = [
                'id' => $tiemposDb[$rezo]->id ?? null,
                'rezo' => $rezo,
                'minutos' => $tiemposDb[$rezo]->minutos ?? 15,
            ];
        }

        $todayHorario = Horario::whereDate('fecha', today())->first();

        return inertia('Admin/Horarios', [
            'tiempos' => $tiempos,
            'todayHorario' => $todayHorario,
        ]);
    }

    /**
     * Update the waiting time for a specific prayer.
     */
    public function update(TiempoEsperaRequest $request, string $rezo): RedirectResponse
    {
        $validated = $request->validated();

        TiempoEspera::updateOrCreate(
            ['rezo' => $rezo],
            ['minutos' => $validated['minutos']]
        );

        TiempoEsperaService::clearCache();

        return redirect()->back()->with('success', 'Tiempo actualizado');
    }

    /**
     * Update today's prayer times.
     */
    public function updateToday(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'fajr'    => 'required|date_format:H:i',
            'sunrise' => 'required|date_format:H:i',
            'dhuhr'   => 'required|date_format:H:i',
            'asr'     => 'required|date_format:H:i',
            'maghrib' => 'required|date_format:H:i',
            'isha'    => 'required|date_format:H:i',
        ]);

        Horario::updateOrCreate(
            ['fecha' => today()->toDateString()],
            $validated
        );

        HorarioService::clearCache();

        return redirect()->back()->with('success', 'Horario actualizado');
    }
}
