<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UbicacionRequest;
use App\Models\Ubicacion;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class UbicacionController extends Controller
{
    public function index(): Response
    {
        $ubicacion = Ubicacion::first();

        return inertia('Admin/Ubicacion', [
            'ubicacion' => $ubicacion,
        ]);
    }

    public function guardar(UbicacionRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $ubicacion = Ubicacion::first();

        if ($ubicacion) {
            $ubicacion->update($validated);
        } else {
            Ubicacion::create($validated);
        }

        return redirect()->back()->with('success', 'Ubicación guardada correctamente');
    }
}
