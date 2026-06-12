<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ImamSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ImamController extends Controller
{
    public function index()
    {
        $imam = ImamSetting::first();

        return Inertia::render('Admin/Imam', [
            'imam' => $imam,
        ]);
    }

    public function guardar(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'nullable|string|max:255',
            'descripcion' => 'nullable|string',
            'foto' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
        ]);

        $imam = ImamSetting::firstOrNew([]);

        if ($request->hasFile('foto')) {
            try {
                if ($imam->foto) {
                    Storage::disk('public')->delete($imam->foto);
                }
                $validated['foto'] = $request->file('foto')->store('imam', 'public');
            } catch (\Exception $e) {
                Log::error('Error al subir foto del imam: ' . $e->getMessage());
                return back()->with('error', 'Error al subir la foto. Inténtalo de nuevo.');
            }
        } else {
            unset($validated['foto']);
        }

        $imam->fill($validated);
        $imam->save();

        return back()->with('success', 'Información del imam guardada correctamente');
    }
}
