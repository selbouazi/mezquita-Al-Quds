<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    /**
     * Store a newly created contact message.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email|max:255',
            'message' => 'required|string|max:5000',
            'type'    => 'required|in:web,phone',
            'phone'   => 'required_if:type,phone|nullable|string|max:20',
        ]);

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