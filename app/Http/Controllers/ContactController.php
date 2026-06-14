<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use App\Models\ContactMessage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class ContactController extends Controller
{
    /**
     * Muestra el formulario de contacto.
     *
     * @return Response
     */
    public function create(): Response
    {
        if (!\moduleIsActive('contacto')) {
            return inertia('ModuleDisabled');
        }
        return inertia('Contacto');
    }

    /**
     * Procesa el envío del formulario de contacto.
     *
     * @param ContactRequest $request
     * @return RedirectResponse
     */
    public function store(ContactRequest $request): RedirectResponse
    {
        if (!\moduleIsActive('contacto')) {
            return back()->with('error', 'Módulo desactivado.');
        }
        $validated = $request->validated();

        ContactMessage::create([
            'name'       => $validated['name'],
            'email'      => $validated['email'],
            'message'    => $validated['message'],
            'type'       => $validated['type'],
            'phone'      => $validated['phone'] ?? null,
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return back()->with('success', 'Mensaje enviado correctamente.');
    }
}