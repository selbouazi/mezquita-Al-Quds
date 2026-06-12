<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Noticia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Response;

class NoticiasController extends Controller
{
    public function index(): Response
    {
        $noticias = Noticia::orderBy('fecha_publicacion', 'desc')->paginate(20);

        return inertia('Admin/Noticias', [
            'noticias' => $noticias,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'titulo' => 'required|string|max:255',
            'contenido' => 'required|string',
            'imagen' => 'nullable|image|max:2048',
            'fecha_publicacion' => 'required|date',
            'publicado' => 'boolean',
        ]);

        if ($request->hasFile('imagen')) {
            try {
                $path = $request->file('imagen')->store('noticias', 'public');
                $validated['imagen'] = $path;
            } catch (\Exception $e) {
                Log::error('Error al subir imagen de noticia: ' . $e->getMessage());
                return redirect()->back()->with('error', 'Error al subir la imagen. Inténtalo de nuevo.')->withInput();
            }
        }

        Noticia::create($validated);

        return redirect()->back()->with('success', 'Noticia creada correctamente');
    }

    public function update(Request $request, Noticia $noticia): RedirectResponse
    {
        $validated = $request->validate([
            'titulo' => 'required|string|max:255',
            'contenido' => 'required|string',
            'imagen' => 'nullable|image|max:2048',
            'fecha_publicacion' => 'required|date',
            'publicado' => 'boolean',
        ]);

        if ($request->hasFile('imagen')) {
            try {
                if ($noticia->imagen) {
                    Storage::disk('public')->delete($noticia->imagen);
                }
                $path = $request->file('imagen')->store('noticias', 'public');
                $validated['imagen'] = $path;
            } catch (\Exception $e) {
                Log::error('Error al subir imagen de noticia: ' . $e->getMessage());
                return redirect()->back()->with('error', 'Error al subir la imagen. Inténtalo de nuevo.')->withInput();
            }
        }

        $noticia->update($validated);

        return redirect()->back()->with('success', 'Noticia actualizada');
    }

    public function destroy(Noticia $noticia): RedirectResponse
    {
        try {
            if ($noticia->imagen) {
                Storage::disk('public')->delete($noticia->imagen);
            }
        } catch (\Exception $e) {
            Log::error('Error al eliminar imagen de noticia: ' . $e->getMessage());
        }

        $noticia->delete();

        return redirect()->back()->with('success', 'Noticia eliminada');
    }
}
