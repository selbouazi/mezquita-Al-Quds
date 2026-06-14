<?php

namespace App\Http\Controllers;

use App\Http\Requests\Admin\ComentarioRequest;
use App\Models\Comentario;
use Illuminate\Http\RedirectResponse;

class ComentarioController extends Controller
{
    public function store(ComentarioRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $data = [
            'noticia_id' => $validated['noticia_id'],
            'contenido' => $validated['contenido'],
            'anonimo' => $request->boolean('anonimo'),
            'aprobado' => false,
        ];

        if ($request->user()) {
            $data['user_id'] = $request->user()->id;
            $data['nombre'] = $request->user()->name;
        } elseif (!$request->boolean('anonimo')) {
            $data['nombre'] = $validated['nombre'];
        }

        Comentario::create($data);

        return redirect()->back()->with('success', 'Comentario enviado para revisión.');
    }
}
