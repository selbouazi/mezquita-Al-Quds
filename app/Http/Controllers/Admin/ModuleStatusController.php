<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ModuleStatus;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class ModuleStatusController extends Controller
{
    public function toggle(Request $request, string $module): RedirectResponse
    {
        $validModules = ['horarios', 'donativos', 'facturas', 'noticias', 'imam', 'clases', 'ubicacion'];

        if (!in_array($module, $validModules)) {
            return back()->with('error', 'Módulo no válido.');
        }

        $status = ModuleStatus::updateOrCreate(
            ['module' => $module],
            ['activo' => $request->boolean('activo')]
        );

        Cache::forget('module_status_all');

        return back()->with('success', "Módulo {$module} " . ($status->activo ? 'activado' : 'desactivado') . " correctamente.");
    }
}
