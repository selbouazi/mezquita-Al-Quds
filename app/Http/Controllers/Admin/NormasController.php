<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\NormaRequest;
use App\Models\Norma;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Response;

class NormasController extends Controller
{
    public function index(): Response
    {
        $normas = Norma::ordenado()->get();

        return inertia('Admin/Normas', [
            'normas' => $normas,
        ]);
    }

    public function store(NormaRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        if ($request->hasFile('imagen')) {
            $path = $request->file('imagen')->store('normas', 'public');
            $validated['imagen'] = $path;
        }

        Norma::create($validated);

        Cache::forget('home_normas');

        return redirect()->back()->with('success', 'Norma creada correctamente');
    }

    public function update(NormaRequest $request, Norma $norma): RedirectResponse
    {
        $validated = $request->validated();

        if ($request->hasFile('imagen')) {
            try {
                $original = $norma->getRawOriginal('imagen');
                if ($original && !str_starts_with($original, '/')) {
                    Storage::disk('public')->delete($original);
                }
                $path = $request->file('imagen')->store('normas', 'public');
                $validated['imagen'] = $path;
            } catch (\Exception $e) {
                Log::error('Error al subir imagen de norma: ' . $e->getMessage());
                return redirect()->back()->with('error', 'Error al subir la imagen. Inténtalo de nuevo.')->withInput();
            }
        } elseif ($request->boolean('remove_imagen')) {
            $original = $norma->getRawOriginal('imagen');
            if ($original && !str_starts_with($original, '/')) {
                Storage::disk('public')->delete($original);
            }
            $validated['imagen'] = null;
        }

        $norma->update($validated);

        Cache::forget('home_normas');

        return redirect()->back()->with('success', 'Norma actualizada');
    }

    public function destroy(Norma $norma): RedirectResponse
    {
        try {
            $original = $norma->getRawOriginal('imagen');
            if ($original && !str_starts_with($original, '/')) {
                Storage::disk('public')->delete($original);
            }
        } catch (\Exception $e) {
            Log::error('Error al eliminar imagen de norma: ' . $e->getMessage());
        }

        $norma->delete();

        Cache::forget('home_normas');

        return redirect()->back()->with('success', 'Norma eliminada');
    }
}
