<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Factura;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FacturasController extends Controller
{
    public function index()
    {
        $facturas = Factura::orderBy('fecha', 'desc')
            ->paginate(20);

        return inertia('Admin/Facturas', [
            'facturas' => $facturas,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'titulo' => 'required|string|max:255',
            'fecha' => 'required|date',
            'archivo_pdf' => 'required|file|mimes:pdf|max:10240',
            'notas' => 'nullable|string',
        ]);

        if ($request->hasFile('archivo_pdf')) {
            $path = $request->file('archivo_pdf')->store('facturas', 'public');
            $validated['archivo_pdf'] = $path;
        }

        Factura::create($validated);

        return redirect()->back()->with('success', 'Factura creada correctamente');
    }

    public function update(Request $request, Factura $factura)
    {
        $validated = $request->validate([
            'titulo' => 'required|string|max:255',
            'fecha' => 'required|date',
            'archivo_pdf' => 'nullable|file|mimes:pdf|max:10240',
            'notas' => 'nullable|string',
        ]);

        if ($request->hasFile('archivo_pdf')) {
            if ($factura->archivo_pdf) {
                Storage::disk('public')->delete($factura->archivo_pdf);
            }
            $path = $request->file('archivo_pdf')->store('facturas', 'public');
            $validated['archivo_pdf'] = $path;
        }

        $factura->update($validated);

        return redirect()->back()->with('success', 'Factura actualizada');
    }

    public function destroy(Factura $factura)
    {
        if ($factura->archivo_pdf) {
            Storage::disk('public')->delete($factura->archivo_pdf);
        }

        $factura->delete();

        return redirect()->back()->with('success', 'Factura eliminada');
    }

    public function download(Factura $factura)
    {
        if (! $factura->archivo_pdf) {
            abort(404);
        }

        return Storage::disk('public')->download($factura->archivo_pdf);
    }
}
