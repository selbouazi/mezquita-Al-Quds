<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contacto;

class ContactosController extends Controller
{
    public function index()
    {
        $contactos = Contacto::orderBy('created_at', 'desc')->paginate(20);
        $sinLeer = Contacto::noLeidos()->count();

        return inertia('Admin/Contactos', [
            'contactos' => $contactos,
            'sinLeer' => $sinLeer,
        ]);
    }

    public function marcarLeido(Contacto $contacto)
    {
        $contacto->update(['leido' => true]);

        return redirect()->back();
    }

    public function destroy(Contacto $contacto)
    {
        $contacto->delete();

        return redirect()->back()->with('success', 'Mensaje eliminado');
    }
}
