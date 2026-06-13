<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ImamRequest;
use App\Models\ImamSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ImamController extends Controller
{
    /**
     * Display the imam settings form.
     *
     * @return Response
     */
    public function index(): Response
    {
        $imam = ImamSetting::first();

        return Inertia::render('Admin/Imam', [
            'imam' => $imam,
        ]);
    }

    /**
     * Store or update the imam information.
     *
     * @param ImamRequest $request
     * @return RedirectResponse
     */
    public function guardar(ImamRequest $request): RedirectResponse
    {
        $validated = $request->validated();

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
