<?php

namespace App\Http\Controllers;

use App\Models\Comentario;
use App\Models\Noticia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Response;

class NoticiasController extends Controller
{
    public function index(Request $request): Response
    {
        if (!\moduleIsActive('noticias')) {
            return inertia('ModuleDisabled');
        }

        $page = $request->input('page', 1);
        $version = Cache::remember('noticias_version', 86400 * 30, fn() => 1);
        $noticias = Cache::remember('noticias_v' . $version . '_p' . $page, 3600, function () {
            return Noticia::publicado()
                ->orderBy('fecha_publicacion', 'desc')
                ->paginate(10);
        });

        return inertia('Noticias', [
            'noticias' => $noticias,
        ]);
    }

    public function show(Noticia $noticia): Response
    {
        if (!\moduleIsActive('noticias')) {
            return inertia('ModuleDisabled');
        }

        if (! $noticia->publicado) {
            abort(404);
        }

        $comentarios = Comentario::with('user')
            ->where('noticia_id', $noticia->id)
            ->where('aprobado', true)
            ->orderBy('created_at', 'desc')
            ->get();

        return inertia('NoticiaShow', [
            'noticia' => $noticia,
            'comentarios' => $comentarios,
        ]);
    }
}
