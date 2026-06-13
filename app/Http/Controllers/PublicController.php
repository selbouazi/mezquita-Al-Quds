<?php

namespace App\Http\Controllers;

use App\Models\ImamSetting;
use App\Models\Notification;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class PublicController extends Controller
{
    /**
     * Muestra la página de ubicación.
     */
    public function ubicacion(): Response
    {
        return Inertia::render('Ubicacion');
    }

    /**
     * Muestra la página del imam.
     */
    public function imam(): Response
    {
        $imam = ImamSetting::first();

        return Inertia::render('Imam', ['imam' => $imam]);
    }

    /**
     * Muestra las notificaciones públicas.
     */
    public function notifications(): Response
    {
        $notificaciones = Notification::activas()
            ->ordenadas()
            ->paginate(10);

        return Inertia::render('Public/Notifications', [
            'notificaciones' => $notificaciones,
        ]);
    }

    /**
     * Cambia el idioma de la sesión.
     *
     * @param Request $request
     * @param string $lang
     * @return RedirectResponse
     */
    public function switchLang(Request $request, string $lang): RedirectResponse
    {
        if (in_array($lang, ['es', 'ca', 'ar', 'en'])) {
            $request->session()->put('locale', $lang);
        }

        return back();
    }

    /**
     * Devuelve los datos del imam en JSON.
     *
     * @return JsonResponse
     */
    public function apiImam(): JsonResponse
    {
        $imam = ImamSetting::first();
        if ($imam && $imam->foto) {
            $imam->foto = Storage::url($imam->foto);
        }

        return response()->json($imam);
    }

    /**
     * Devuelve las notificaciones activas en JSON.
     *
     * @return JsonResponse
     */
    public function apiNotificaciones(): JsonResponse
    {
        $notificaciones = Notification::activas()
            ->ordenadas()
            ->take(10)
            ->get();

        return response()->json($notificaciones);
    }
}
