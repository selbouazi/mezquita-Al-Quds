<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Ubicacion;
use Illuminate\Http\Request;

class UbicacionController extends Controller
{
    public function index()
    {
        $ubicacion = Ubicacion::first();

        return inertia('Admin/Ubicacion', [
            'ubicacion' => $ubicacion,
        ]);
    }

    public function guardar(Request $request)
    {
        $validated = $request->validate([
            'direccion' => 'required|string|max:500',
            'latitud' => 'nullable|string|max:50',
            'longitud' => 'nullable|string|max:50',
            'telefono' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:255',
            'whatsapp' => 'nullable|string|max:50',
        ]);

        $ubicacion = Ubicacion::first();

        if ($ubicacion) {
            $ubicacion->update($validated);
        } else {
            Ubicacion::create($validated);
        }

        return redirect()->back()->with('success', 'Ubicación guardada correctamente');
    }
}
