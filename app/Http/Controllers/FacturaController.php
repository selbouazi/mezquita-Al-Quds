<?php

namespace App\Http\Controllers;

use App\Models\Factura;
use Illuminate\Support\Facades\Storage;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class FacturaController extends Controller
{
    /**
     * Muestra el listado de facturas.
     *
     * @return Response
     */
    public function index(): Response
    {
        if (!\moduleIsActive('facturas')) {
            return inertia('ModuleDisabled');
        }

        $facturas = Factura::orderBy('fecha', 'desc')->get();

        return inertia('Facturas', ['facturas' => $facturas]);
    }

    /**
     * Descarga el PDF de una factura.
     *
     * @param Factura $factura
     * @return StreamedResponse
     */
    public function download(Factura $factura): StreamedResponse
    {
        if (! $factura->archivo_pdf) {
            abort(404);
        }

        return Storage::disk('public')->download($factura->archivo_pdf);
    }
}
