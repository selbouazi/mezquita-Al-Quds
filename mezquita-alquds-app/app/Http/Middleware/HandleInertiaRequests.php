<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use App\Models\TiempoEspera;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function share(Request $request): array
    {
        // Carga los tiempos de espera como { fajr: 20, dhuhr: 10, ... }
        $tiemposEspera = TiempoEspera::all()
            ->pluck('minutos', 'rezo')
            ->toArray();

        return array_merge(parent::share($request), [
            'locale'        => app()->getLocale(),
            'tiemposEspera' => $tiemposEspera,
            'flash' => [
                'success' => $request->session()->get('success'),
                'error'   => $request->session()->get('error'),
            ],
        ]);
    }
}