<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UbicacionRequest;
use App\Models\Ubicacion;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Cache;
use Inertia\Response;

class UbicacionController extends Controller
{
    /**
     * Display the location settings form.
     *
     * @return Response
     */
    public function index(): Response
    {
        $ubicacion = Ubicacion::first();

        return inertia('Admin/Ubicacion', [
            'ubicacion' => $ubicacion,
        ]);
    }

    /**
     * Store or update the location.
     *
     * @param UbicacionRequest $request
     * @return RedirectResponse
     */
    public function guardar(UbicacionRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $ubicacion = Ubicacion::first();

        if ($ubicacion) {
            $ubicacion->update($validated);
        } else {
            Ubicacion::create($validated);
        }

        Cache::forget('ubicacion_public');

        return redirect()->back()->with('success', 'Ubicación guardada correctamente');
    }
}
