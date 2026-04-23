<?php

namespace App\Http\Controllers;

use App\Models\Noticia;

class NoticiasController extends Controller
{
    public function index()
    {
        $noticias = Noticia::publicado()
            ->orderBy('fecha_publicacion', 'desc')
            ->paginate(10);

        return inertia('Noticias', [
            'noticias' => $noticias,
        ]);
    }
}
