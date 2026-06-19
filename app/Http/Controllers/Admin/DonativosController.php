<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Donativo;
use Illuminate\Http\Request;

class DonativosController extends Controller
{
    public function index(Request $request): \Inertia\Response
    {
        $year = $request->get('año', date('Y'));
        $search = $request->get('search', '');

        $donativos = Donativo::where('año', $year)
            ->when($search, function ($query, $search) {
                return $query->where(function ($q) use ($search) {
                    $q->where('nombre', 'like', "%{$search}%")
                      ->orWhere('nombre_arabe', 'like', "%{$search}%");
                });
            })
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        $años = Donativo::select('año')
            ->distinct()
            ->orderBy('año', 'desc')
            ->pluck('año');

        $queryStats = Donativo::where('año', $year);
        if ($search) {
            $queryStats->where(function ($q) use ($search) {
                $q->where('nombre', 'like', "%{$search}%")
                  ->orWhere('nombre_arabe', 'like', "%{$search}%");
            });
        }

        $stats = [
            'total' => (clone $queryStats)->count(),
            'pagados' => (clone $queryStats)->where('pagado', true)->count(),
            'pendientes' => (clone $queryStats)->where('pagado', false)->count(),
            'totalCantidad' => (clone $queryStats)->where('pagado', true)->sum('cantidad'),
        ];

        return inertia('Admin/Donativos', [
            'donativos' => $donativos,
            'años' => $años,
            'filtros' => [
                'año' => $year,
                'search' => $search,
            ],
            'stats' => $stats,
        ]);
    }

    public function store(Request $request): \Illuminate\Http\RedirectResponse
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

    public function update(Request $request, Donativo $donativo): \Illuminate\Http\RedirectResponse
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

    public function destroy(Donativo $donativo): \Illuminate\Http\RedirectResponse
    {
        $donativo->delete();

        return redirect()->back()->with('success', 'Donativo eliminado');
    }

    public function togglePagado(Donativo $donativo): \Illuminate\Http\RedirectResponse
    {
        $nuevoEstado = !$donativo->pagado;
        $donativo->update(['pagado' => $nuevoEstado]);

        return redirect()->back()->with('success', $nuevoEstado ? 'Marcado como pagado' : 'Marcado como pendiente');
    }
}
