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
}
