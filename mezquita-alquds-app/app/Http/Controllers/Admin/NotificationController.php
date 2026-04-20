<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        $query = Notification::query()->orderBy('created_at', 'desc');

        if ($request->filled('busqueda')) {
            $query->where(function ($q) use ($request) {
                $q->where('titulo', 'like', "%{$request->busqueda}%")
                  ->orWhere('mensaje', 'like', "%{$request->busqueda}%");
            });
        }

        if ($request->filled('estado')) {
            $query->where('activa', $request->estado === 'activas');
        }

        if ($request->filled('prioridad')) {
            $query->where('prioridad', $request->prioridad);
        }

        $notificaciones = $query->paginate(10);

        return Inertia::render('Admin/Notificaciones', [
            'notificaciones' => $notificaciones,
            'filtros' => $request->only(['busqueda', 'estado', 'prioridad']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'titulo' => 'nullable|string|max:255',
            'mensaje' => 'required|string',
            'prioridad' => 'nullable|in:muy_alta,alta,normal,baja',
            'activa' => 'nullable|boolean',
            'fecha_publicacion' => 'nullable|date',
            'fecha_expiracion' => 'nullable|date|after:fecha_publicacion',
        ]);

        $validated['prioridad'] = $validated['prioridad'] ?? 'normal';
        $validated['activa'] = $validated['activa'] ?? true;
        $validated['fecha_publicacion'] = $validated['fecha_publicacion'] ?? now();

        Notification::create($validated);

        return redirect()->route('notificaciones.index')
            ->with('success', 'Notificación creada correctamente');
    }

    public function update(Request $request, Notification $notification)
    {
        $validated = $request->validate([
            'titulo' => 'nullable|string|max:255',
            'mensaje' => 'required|string',
            'prioridad' => 'nullable|in:muy_alta,alta,normal,baja',
            'activa' => 'nullable|boolean',
            'fecha_publicacion' => 'nullable|date',
            'fecha_expiracion' => 'nullable|date',
        ]);

        $notification->update($validated);

        return redirect()->route('notificaciones.index')
            ->with('success', 'Notificación actualizada correctamente');
    }

    public function destroy(Notification $notification)
    {
        $notification->delete();

        return redirect()->route('notificaciones.index')
            ->with('success', 'Notificación eliminada correctamente');
    }

    public function toggle(Notification $notification)
    {
        $notification->update(['activa' => !$notification->activa]);

        $estado = $notification->activa ? 'activada' : 'desactivada';

        return back()->with('success', "Notificación {$estado}");
    }
}