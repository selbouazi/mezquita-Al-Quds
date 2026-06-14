<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Comentario;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class ComentariosController extends Controller
{
    public function index(): Response
    {
        $comentarios = Comentario::with(['noticia', 'user'])
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return inertia('Admin/Comentarios', [
            'comentarios' => $comentarios,
        ]);
    }

    public function approve(Comentario $comentario): RedirectResponse
    {
        $comentario->update(['aprobado' => true]);

        return redirect()->back()->with('success', 'Comentario aprobado');
    }

    public function destroy(Comentario $comentario): RedirectResponse
    {
        $comentario->delete();

        return redirect()->back()->with('success', 'Comentario eliminado');
    }
}
