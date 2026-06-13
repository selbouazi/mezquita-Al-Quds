<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ClaseRequest;
use App\Models\Clase;
use Illuminate\Http\RedirectResponse;
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

    public function store(ClaseRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        Clase::create($validated);

        return redirect()->back()->with('success', 'Clase creada correctamente');
    }

    public function update(ClaseRequest $request, Clase $clase): RedirectResponse
    {
        $validated = $request->validated();

        $clase->update($validated);

        return redirect()->back()->with('success', 'Clase actualizada');
    }

    public function destroy(Clase $clase): RedirectResponse
    {
        $clase->delete();

        return redirect()->back()->with('success', 'Clase eliminada');
    }
}
