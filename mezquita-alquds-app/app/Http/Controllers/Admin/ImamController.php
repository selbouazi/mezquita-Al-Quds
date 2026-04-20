<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ImamSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

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
        
        $oldFoto = $imam->getOriginal('foto');
        
        if ($request->hasFile('foto')) {
            if ($oldFoto) {
                Storage::delete($oldFoto);
            }
            $validated['foto'] = $request->file('foto')->store('imam', 'public');
        } else {
            unset($validated['foto']);
        }

        $imam->fill($validated);
        $imam->save();

        return back()->with('success', 'Información del imam guardada correctamente');
    }
}