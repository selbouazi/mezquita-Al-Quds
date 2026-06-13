<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\TiempoEsperaRequest;
use App\Models\TiempoEspera;
use App\Services\TiempoEsperaService;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class TiemposEsperaController extends Controller
{
    /**
     * Display the waiting times settings form.
     *
     * @return Response
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

        return inertia('Admin/Horarios', [
            'tiempos' => $tiempos,
        ]);
    }

    /**
     * Update the waiting time for a specific prayer.
     *
     * @param TiempoEsperaRequest $request
     * @param string $rezo
     * @return RedirectResponse
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
}
