<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\JumuahConfigRequest;
use App\Models\JumuahConfig;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class JumuahConfigController extends Controller
{
    public function index(): Response
    {
        $configs = JumuahConfig::orderBy('fecha_inicio', 'desc')->get();

        $configs->transform(function ($c) {
            $c->hora_jumuah = substr($c->hora_jumuah, 0, 5);
            return $c;
        });

        return inertia('Admin/Jumuah', [
            'configs' => $configs,
        ]);
    }

    public function store(JumuahConfigRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $validated['activo'] = $validated['activo'] ?? true;

        JumuahConfig::create($validated);

        return redirect()->route('admin.jumuah.index')
            ->with('success', 'Jumu\'ah config created');
    }

    public function update(JumuahConfigRequest $request, JumuahConfig $jumuahConfig): RedirectResponse
    {
        $jumuahConfig->update($request->validated());

        return redirect()->route('admin.jumuah.index')
            ->with('success', 'Jumu\'ah config updated');
    }

    public function destroy(JumuahConfig $jumuahConfig): RedirectResponse
    {
        $jumuahConfig->delete();

        return redirect()->route('admin.jumuah.index')
            ->with('success', 'Jumu\'ah config deleted');
    }

    public function toggle(JumuahConfig $jumuahConfig): RedirectResponse
    {
        $nuevoEstado = !$jumuahConfig->activo;
        $jumuahConfig->update(['activo' => $nuevoEstado]);

        return redirect()->route('admin.jumuah.index')
            ->with('success', $nuevoEstado ? 'Jumu\'ah config activated' : 'Jumu\'ah config deactivated');
    }
}
