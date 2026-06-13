<?php

namespace App\Http\Controllers;

use App\Models\Donativo;
use Illuminate\Http\Request;
use Inertia\Response;

class DonativoController extends Controller
{
    /**
     * Muestra el listado de donativos filtrados por año.
     *
     * @param Request $request
     * @return Response
     */
    public function index(Request $request): Response
    {
        $año = $request->input('año', date('Y'));
        $donativos = Donativo::where('año', $año)
            ->orderBy('created_at', 'desc')
            ->get();

        return inertia('Donativos', [
            'donativos' => $donativos,
            'añoActual' => (int) $año,
        ]);
    }
}
