<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Clase;
use Illuminate\Http\Request;

class ClasesController extends Controller
{
    public function index()
    {
        $clases = Clase::orderBy('created_at', 'desc')->get();

        return inertia('Admin/Clases', [
            'clases' => $clases,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'titulo' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'horarios' => 'nullable|string|max:255',
            'nivel' => 'nullable|string|max:100',
            'profesor' => 'nullable|string|max:255',
            'requisitos' => 'nullable|string',
            'activo' => 'boolean',
        ]);

        Clase::create($validated);

        return redirect()->back()->with('success', 'Clase creada correctamente');
    }

    public function update(Request $request, Clase $clase)
    {
        $validated = $request->validate([
            'titulo' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'horarios' => 'nullable|string|max:255',
            'nivel' => 'nullable|string|max:100',
            'profesor' => 'nullable|string|max:255',
            'requisitos' => 'nullable|string',
            'activo' => 'boolean',
        ]);

        $clase->update($validated);

        return redirect()->back()->with('success', 'Clase actualizada');
    }

    public function destroy(Clase $clase)
    {
        $clase->delete();

        return redirect()->back()->with('success', 'Clase eliminada');
    }
}
