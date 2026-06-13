<?php

namespace App\Http\Controllers;

use App\Models\ImamSetting;
use App\Models\Notification;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
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
        if (!\moduleIsActive('ubicacion')) {
            return Inertia::render('ModuleDisabled');
        }

        return Inertia::render('Ubicacion');
    }

    /**
     * Muestra la página del imam.
     */
    public function imam(): Response
    {
        if (!\moduleIsActive('imam')) {
            return Inertia::render('ModuleDisabled');
        }

        $imam = Cache::remember('imam_data', 86400, function () {
            return ImamSetting::first();
        });

        return Inertia::render('Imam', ['imam' => $imam]);
    }

    /**
     * Muestra las notificaciones públicas.
     */
    public function notifications(): Response
    {
        $page = request('page', 1);
        $version = Cache::remember('notificaciones_version', 86400 * 30, fn() => 1);
        $notificaciones = Cache::remember('notificaciones_v' . $version . '_p' . $page, 3600, function () {
            return Notification::activas()
                ->ordenadas()
                ->paginate(10);
        });

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
        $imam = Cache::remember('api_imam_data', 86400, function () {
            $imam = ImamSetting::first();
            if ($imam && $imam->foto) {
                $imam->foto = Storage::url($imam->foto);
            }
            return $imam;
        });

        return response()->json($imam);
    }

    /**
     * Devuelve las notificaciones activas en JSON.
     *
     * @return JsonResponse
     */
    public function apiNotificaciones(): JsonResponse
    {
        $notificaciones = Cache::remember('api_notificaciones_v' . Cache::remember('notificaciones_version', 86400 * 30, fn() => 1), 3600, function () {
            return Notification::activas()
                ->ordenadas()
                ->take(10)
                ->get();
        });

        return response()->json($notificaciones);
    }
}
