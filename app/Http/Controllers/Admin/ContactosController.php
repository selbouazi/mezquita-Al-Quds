<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contacto;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class ContactosController extends Controller
{
    /**
     * Muestra el listado de mensajes de contacto.
     *
     * @return Response
     */
    public function index(): Response
    {
        $contactos = Contacto::orderBy('created_at', 'desc')->paginate(20);
        $sinLeer = Contacto::noLeidos()->count();

        return inertia('Admin/Contactos', [
            'contactos' => $contactos,
            'sinLeer' => $sinLeer,
        ]);
    }

    /**
     * Marca un mensaje como leído.
     *
     * @param Contacto $contacto
     * @return RedirectResponse
     */
    public function marcarLeido(Contacto $contacto): RedirectResponse
    {
        $contacto->update(['leido' => true]);

        return redirect()->back();
    }

    /**
     * Elimina un mensaje de contacto.
     *
     * @param Contacto $contacto
     * @return RedirectResponse
     */
    public function destroy(Contacto $contacto): RedirectResponse
    {
        $contacto->delete();

        return redirect()->back()->with('success', 'Mensaje eliminado');
    }
}
