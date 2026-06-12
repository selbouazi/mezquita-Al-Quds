<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Donativo;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class DonativosController extends Controller
{
    public function index(Request $request): Response
    {
        $year = $request->get('año', date('Y'));

        $donativos = Donativo::where('año', $year)
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        $años = Donativo::select('año')
            ->distinct()
            ->orderBy('año', 'desc')
            ->pluck('año');

        $agg = Donativo::where('año', $year)
            ->selectRaw('COUNT(*) as total')
            ->selectRaw('SUM(CASE WHEN pagado = 1 THEN 1 ELSE 0 END) as pagados')
            ->selectRaw('SUM(CASE WHEN pagado = 1 THEN cantidad ELSE 0 END) as totalCantidad')
            ->first();

        $stats = [
            'total' => (int) $agg->total,
            'pagados' => (int) $agg->pagados,
            'pendientes' => (int) $agg->total - (int) $agg->pagados,
            'totalCantidad' => (float) $agg->totalCantidad,
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

    public function store(Request $request): RedirectResponse
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

    public function update(Request $request, Donativo $donativo): RedirectResponse
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

    public function destroy(Donativo $donativo): RedirectResponse
    {
        $donativo->delete();

        return redirect()->back()->with('success', 'Donativo eliminado');
    }

    public function togglePagado(Donativo $donativo): RedirectResponse
    {
        $donativo->update(['pagado' => ! $donativo->pagado]);

        return redirect()->back()->with('success', $donativo->pagado ? 'Marcado como pagado' : 'Marcado como pendiente');
    }
}
