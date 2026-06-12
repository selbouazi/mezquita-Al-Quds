<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ActivationCode;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

class ActivationCodeController extends Controller
{
    public function index(): Response
    {
        $codigo = ActivationCode::where('activo', true)
            ->orderBy('created_at', 'desc')
            ->first();

        return Inertia::render('Admin/Codigos', [
            'codigo' => $codigo,
        ]);
    }

    public function generar(Request $request): RedirectResponse
    {
        $codigo = strtoupper(Str::random(8));
        
        ActivationCode::create([
            'codigo' => $codigo,
            'activo' => true,
        ]);

        return back()->with('success', 'Código generado correctamente');
    }

    public function actualizar(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'codigo' => 'required|string|min:8|max:100',
        ]);

        $validated['codigo'] = strtoupper($validated['codigo']);

        ActivationCode::where('activo', true)->update(['activo' => false]);
        
        $existingCode = ActivationCode::where('codigo', $validated['codigo'])->first();
        
        if ($existingCode) {
            $existingCode->update(['activo' => true]);
        } else {
            ActivationCode::create([
                'codigo' => $validated['codigo'],
                'activo' => true,
            ]);
        }

        return back()->with('success', 'Código actualizado correctamente');
    }
}