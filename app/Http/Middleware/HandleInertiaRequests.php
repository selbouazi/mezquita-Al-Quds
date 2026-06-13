<?php

namespace App\Http\Middleware;

use App\Models\ModuleStatus;
use App\Services\TiempoEsperaService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function share(Request $request): array
    {
        $tiemposEspera = TiempoEsperaService::getTiemposEspera();

        $modules = Cache::remember('module_status_all', 3600, function () {
            return ModuleStatus::pluck('activo', 'module');
        });

        return array_merge(parent::share($request), [
            'locale' => app()->getLocale(),
            'modules' => $modules,
            'tiemposEspera' => $tiemposEspera,
            'auth' => [
                'user' => $request->user() ? [
                    'id' => $request->user()->id,
                    'name' => $request->user()->name,
                    'email' => $request->user()->email,
                    'is_admin' => $request->user()->rol === 'admin',
                ] : null,
            ],
            'flash' => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
            ],
        ]);
    }
}
