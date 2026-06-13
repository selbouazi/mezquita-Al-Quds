<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\DonativoRequest;
use App\Models\Donativo;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class DonativosController extends Controller
{
    /**
     * Muestra el listado de donativos.
     *
     * @param Request $request
     * @return Response
     */
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

    /**
     * Almacena un nuevo donativo.
     *
     * @param DonativoRequest $request
     * @return RedirectResponse
     */
    public function store(DonativoRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        Donativo::create($validated);

        return redirect()->back()->with('success', 'Donativo creado correctamente');
    }

    /**
     * Actualiza un donativo existente.
     *
     * @param DonativoRequest $request
     * @param Donativo $donativo
     * @return RedirectResponse
     */
    public function update(DonativoRequest $request, Donativo $donativo): RedirectResponse
    {
        $validated = $request->validated();

        $donativo->update($validated);

        return redirect()->back()->with('success', 'Donativo actualizado');
    }

    /**
     * Elimina un donativo.
     *
     * @param Donativo $donativo
     * @return RedirectResponse
     */
    public function destroy(Donativo $donativo): RedirectResponse
    {
        $donativo->delete();

        return redirect()->back()->with('success', 'Donativo eliminado');
    }

    /**
     * Alterna el estado de pago de un donativo.
     *
     * @param Donativo $donativo
     * @return RedirectResponse
     */
    public function togglePagado(Donativo $donativo): RedirectResponse
    {
        $donativo->update(['pagado' => ! $donativo->pagado]);

        return redirect()->back()->with('success', $donativo->pagado ? 'Marcado como pagado' : 'Marcado como pendiente');
    }
}
