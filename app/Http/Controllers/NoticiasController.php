<?php

namespace App\Http\Controllers;

use App\Models\Noticia;
use Inertia\Response;

class NoticiasController extends Controller
{
    public function index(): Response
    {
        $noticias = Noticia::publicado()
            ->orderBy('fecha_publicacion', 'desc')
            ->paginate(10);

        return inertia('Noticias', [
            'noticias' => $noticias,
        ]);
    }

    public function show(Noticia $noticia): Response
    {
        if (! $noticia->publicado) {
            abort(404);
        }

        return inertia('NoticiaShow', [
            'noticia' => $noticia,
        ]);
    }
}
