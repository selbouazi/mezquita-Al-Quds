<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Factura;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class FacturasController extends Controller
{
    public function index(): Response
    {
        $facturas = Factura::orderBy('fecha', 'desc')
            ->paginate(20);

        return inertia('Admin/Facturas', [
            'facturas' => $facturas,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'titulo' => 'required|string|max:255',
            'fecha' => 'required|date',
            'archivo_pdf' => 'required|file|mimes:pdf|max:10240',
            'notas' => 'nullable|string',
        ]);

        if ($request->hasFile('archivo_pdf')) {
            try {
                $path = $request->file('archivo_pdf')->store('facturas', 'public');
                $validated['archivo_pdf'] = $path;
            } catch (\Exception $e) {
                Log::error('Error al subir PDF de factura: ' . $e->getMessage());
                return redirect()->back()->with('error', 'Error al subir el archivo PDF. Inténtalo de nuevo.')->withInput();
            }
        }

        Factura::create($validated);

        return redirect()->back()->with('success', 'Factura creada correctamente');
    }

    public function update(Request $request, Factura $factura): RedirectResponse
    {
        $validated = $request->validate([
            'titulo' => 'required|string|max:255',
            'fecha' => 'required|date',
            'archivo_pdf' => 'nullable|file|mimes:pdf|max:10240',
            'notas' => 'nullable|string',
        ]);

        if ($request->hasFile('archivo_pdf')) {
            try {
                if ($factura->archivo_pdf) {
                    Storage::disk('public')->delete($factura->archivo_pdf);
                }
                $path = $request->file('archivo_pdf')->store('facturas', 'public');
                $validated['archivo_pdf'] = $path;
            } catch (\Exception $e) {
                Log::error('Error al subir PDF de factura: ' . $e->getMessage());
                return redirect()->back()->with('error', 'Error al subir el archivo PDF. Inténtalo de nuevo.')->withInput();
            }
        }

        $factura->update($validated);

        return redirect()->back()->with('success', 'Factura actualizada');
    }

    public function destroy(Factura $factura): RedirectResponse
    {
        try {
            if ($factura->archivo_pdf) {
                Storage::disk('public')->delete($factura->archivo_pdf);
            }
        } catch (\Exception $e) {
            Log::error('Error al eliminar PDF de factura: ' . $e->getMessage());
        }

        $factura->delete();

        return redirect()->back()->with('success', 'Factura eliminada');
    }

    public function download(Factura $factura): StreamedResponse|RedirectResponse
    {
        if (! $factura->archivo_pdf) {
            abort(404);
        }

        try {
            return Storage::disk('public')->download($factura->archivo_pdf);
        } catch (\Exception $e) {
            Log::error('Error al descargar PDF de factura: ' . $e->getMessage());
            return redirect()->back()->with('error', 'El archivo no está disponible en este momento.');
        }
    }
}
