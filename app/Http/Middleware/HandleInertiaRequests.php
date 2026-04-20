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
        $tiemposEspera = TiempoEspera::all()
            ->pluck('minutos', 'rezo')
            ->toArray();

        return array_merge(parent::share($request), [
            'locale'        => app()->getLocale(),
            'tiemposEspera' => $tiemposEspera,
            'auth' => [
                'user' => $request->user() ? [
                    'id' => $request->user()->id,
                    'name' => $request->user()->name,
                    'email' => $request->user()->email,
                    'is_admin' => $request->user()->isAdmin(),
                ] : null,
            ],
            'flash' => [
                'success' => $request->session()->get('success'),
                'error'   => $request->session()->get('error'),
            ],
        ]);
    }
}