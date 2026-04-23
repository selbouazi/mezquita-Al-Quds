<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Donativo;
use Illuminate\Http\Request;

class DonativosController extends Controller
{
    public function index(Request $request)
    {
        $year = $request->get('año', date('Y'));

        $donativos = Donativo::where('año', $year)
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        $años = Donativo::select('año')
            ->distinct()
            ->orderBy('año', 'desc')
            ->pluck('año');

        $stats = [
            'total' => Donativo::where('año', $year)->count(),
            'pagados' => Donativo::where('año', $year)->where('pagado', true)->count(),
            'pendientes' => Donativo::where('año', $year)->where('pagado', false)->count(),
            'totalCantidad' => Donativo::where('año', $year)->where('pagado', true)->sum('cantidad'),
        ];

        return inertia('Admin/Donativos', [
            'donativos' => $donativos,
            'años' => $años,
            'filtros' => [
                'año' => $year,
            ],
            'stats' => $stats,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre_arabe' => 'nullable|string|max:255',
            'nombre' => 'required|string|max:255',
            'cantidad' => 'required|numeric|min:0',
            'pagado' => 'boolean',
            'año' => 'required|integer|min:2000|max:2100',
            'notas' => 'nullable|string',
        ]);

        Donativo::create($validated);

        return redirect()->back()->with('success', 'Donativo creado correctamente');
    }

    public function update(Request $request, Donativo $donativo)
    {
        $validated = $request->validate([
            'nombre_arabe' => 'nullable|string|max:255',
            'nombre' => 'required|string|max:255',
            'cantidad' => 'required|numeric|min:0',
            'pagado' => 'boolean',
            'año' => 'required|integer|min:2000|max:2100',
            'notas' => 'nullable|string',
        ]);

        $donativo->update($validated);

        return redirect()->back()->with('success', 'Donativo actualizado');
    }

    public function destroy(Donativo $donativo)
    {
        $donativo->delete();

        return redirect()->back()->with('success', 'Donativo eliminado');
    }

    public function togglePagado(Donativo $donativo)
    {
        $donativo->update(['pagado' => ! $donativo->pagado]);

        return redirect()->back()->with('success', $donativo->pagado ? 'Marcado como pagado' : 'Marcado como pendiente');
    }
}
