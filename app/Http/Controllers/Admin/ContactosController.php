<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
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
        $contactos = ContactMessage::orderBy('created_at', 'desc')->paginate(20);
        $sinLeer = ContactMessage::noLeidos()->count();

        return inertia('Admin/Contactos', [
            'contactos' => $contactos,
            'sinLeer' => $sinLeer,
        ]);
    }

    /**
     * Marca un mensaje como leído.
     *
     * @param ContactMessage $contacto
     * @return RedirectResponse
     */
    public function marcarLeido(ContactMessage $contacto): RedirectResponse
    {
        $contacto->update(['leido' => true]);

        return redirect()->back();
    }

    /**
     * Elimina un mensaje de contacto.
     *
     * @param ContactMessage $contacto
     * @return RedirectResponse
     */
    public function destroy(ContactMessage $contacto): RedirectResponse
    {
        $contacto->delete();

        return redirect()->back()->with('success', 'Mensaje eliminado');
    }
}
