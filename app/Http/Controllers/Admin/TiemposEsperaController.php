<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TiempoEspera;
use Illuminate\Http\Request;

class TiemposEsperaController extends Controller
{
    public function index()
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

    public function update(Request $request, $rezo)
    {
        $validated = $request->validate([
            'minutos' => 'required|integer|min:0',
        ]);

        TiempoEspera::updateOrCreate(
            ['rezo' => $rezo],
            ['minutos' => $validated['minutos']]
        );

        return redirect()->back()->with('success', 'Tiempo actualizado');
    }
}
