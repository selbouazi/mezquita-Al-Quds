<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\NotificationRequest;
use App\Models\Notification;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class NotificationController extends Controller
{
    /**
     * Display a listing of notifications.
     *
     * @param Request $request
     * @return Response
     */
    public function index(Request $request): Response
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

    /**
     * Store a newly created notification.
     *
     * @param NotificationRequest $request
     * @return RedirectResponse
     */
    public function store(NotificationRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $validated['prioridad'] = $validated['prioridad'] ?? 'normal';
        $validated['activa'] = $validated['activa'] ?? true;
        $validated['fecha_publicacion'] = $validated['fecha_publicacion'] ?? now();

        Notification::create($validated);

        return redirect()->route('admin.notificaciones.index')
            ->with('success', 'Notificación creada correctamente');
    }

    /**
     * Update the specified notification.
     *
     * @param NotificationRequest $request
     * @param Notification $notification
     * @return RedirectResponse
     */
    public function update(NotificationRequest $request, Notification $notification): RedirectResponse
    {
        $validated = $request->validated();

        $notification->update($validated);

        return redirect()->route('admin.notificaciones.index')
            ->with('success', 'Notificación actualizada correctamente');
    }

    /**
     * Remove the specified notification.
     *
     * @param Notification $notification
     * @return RedirectResponse
     */
    public function destroy(Notification $notification): RedirectResponse
    {
        $notification->delete();

        return redirect()->route('admin.notificaciones.index')
            ->with('success', 'Notificación eliminada correctamente');
    }

    /**
     * Toggle notification active status.
     *
     * @param Notification $notification
     * @return RedirectResponse
     */
    public function toggle(Notification $notification): RedirectResponse
    {
        $notification->update(['activa' => !$notification->activa]);

        $estado = $notification->activa ? 'activada' : 'desactivada';

        return back()->with('success', "Notificación {$estado}");
    }
}