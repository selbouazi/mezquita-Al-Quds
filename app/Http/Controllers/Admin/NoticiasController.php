<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\NoticiaRequest;
use App\Models\Noticia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Response;

class NoticiasController extends Controller
{
    /**
     * Muestra el listado de noticias.
     *
     * @return Response
     */
    public function index(): Response
    {
        $noticias = Noticia::orderBy('fecha_publicacion', 'desc')->paginate(20);

        return inertia('Admin/Noticias', [
            'noticias' => $noticias,
        ]);
    }

    /**
     * Almacena una nueva noticia.
     *
     * @param NoticiaRequest $request
     * @return RedirectResponse
     */
    public function store(NoticiaRequest $request): RedirectResponse
    {
        $validated = $request->validated();

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

    /**
     * Actualiza una noticia existente.
     *
     * @param NoticiaRequest $request
     * @param Noticia $noticia
     * @return RedirectResponse
     */
    public function update(NoticiaRequest $request, Noticia $noticia): RedirectResponse
    {
        $validated = $request->validated();

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

    /**
     * Elimina una noticia.
     *
     * @param Noticia $noticia
     * @return RedirectResponse
     */
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
