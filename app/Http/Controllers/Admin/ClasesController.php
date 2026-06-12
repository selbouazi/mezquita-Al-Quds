<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Clase;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class ClasesController extends Controller
{
    public function index(): Response
    {
        $clases = Clase::orderBy('created_at', 'desc')->get();

        return inertia('Admin/Clases', [
            'clases' => $clases,
        ]);
    }

    public function store(Request $request): RedirectResponse
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

    public function update(Request $request, Clase $clase): RedirectResponse
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

    public function destroy(Clase $clase): RedirectResponse
    {
        $clase->delete();

        return redirect()->back()->with('success', 'Clase eliminada');
    }
}
