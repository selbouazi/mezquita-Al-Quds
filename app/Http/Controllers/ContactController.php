<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use App\Models\ContactMessage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class ContactController extends Controller
{
    public function create(): Response
    {
        return inertia('Contacto');
    }

    public function store(ContactRequest $request): RedirectResponse
    {
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