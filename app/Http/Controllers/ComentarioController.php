<?php

namespace App\Http\Controllers;

use App\Http\Requests\Admin\ComentarioRequest;
use App\Mail\NuevoComentario;
use App\Models\Comentario;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;
use OpenApi\Attributes as OA;

class ComentarioController extends Controller
{
    #[OA\Post(path: '/comentarios', summary: 'Enviar comentario en noticia', tags: ['Público'], parameters: [new OA\Parameter(name: 'noticia_id', in: 'query', required: true, schema: new OA\Schema(type: 'integer')), new OA\Parameter(name: 'contenido', in: 'query', required: true, schema: new OA\Schema(type: 'string')), new OA\Parameter(name: 'nombre', in: 'query', schema: new OA\Schema(type: 'string')), new OA\Parameter(name: 'anonimo', in: 'query', schema: new OA\Schema(type: 'boolean'))], responses: [new OA\Response(response: 302, description: 'Redirección con mensaje'), new OA\Response(response: 422, description: 'Validación fallida')])]
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

        $comentario = Comentario::create($data);

        User::where('rol', 'admin')->get()->each(function ($admin) use ($comentario) {
            Mail::to($admin->email)->queue(new NuevoComentario($comentario));
        });

        return redirect()->back()->with('success', 'Comentario enviado para revisión.');
    }
}
