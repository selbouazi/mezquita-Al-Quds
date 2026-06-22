<?php

namespace App\Http\Controllers;

use App\Models\ImamSetting;
use App\Models\Notification;
use App\Models\Ubicacion;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use OpenApi\Attributes as OA;

class PublicController extends Controller
{
    #[OA\Get(path: '/ubicacion', summary: 'Obtener ubicación', tags: ['Público'], responses: [new OA\Response(response: 200, description: 'Página de ubicación')])]
    public function ubicacion(): Response
    {
        if (!\moduleIsActive('ubicacion')) {
            return Inertia::render('ModuleDisabled');
        }

        $ubicacion = Cache::remember('ubicacion_public', 86400, function () {
            return Ubicacion::first();
        });

        return Inertia::render('Ubicacion', [
            'ubicacion' => $ubicacion,
        ]);
    }

    #[OA\Get(path: '/imam', summary: 'Obtener información del imam', tags: ['Público'], responses: [new OA\Response(response: 200, description: 'Página del imam')])]
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

    #[OA\Get(path: '/notificaciones', summary: 'Listar notificaciones públicas', tags: ['Público'], parameters: [new OA\Parameter(name: 'page', in: 'query', schema: new OA\Schema(type: 'integer'))], responses: [new OA\Response(response: 200, description: 'Lista paginada de notificaciones')])]
    public function notifications(): Response
    {
        if (!\moduleIsActive('notificaciones')) {
            return Inertia::render('ModuleDisabled');
        }
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
        if (!\moduleIsActive('imam')) {
            return response()->json(null);
        }
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
        if (!\moduleIsActive('notificaciones')) {
            return response()->json([]);
        }
        $notificaciones = Cache::remember('api_notificaciones_v' . Cache::remember('notificaciones_version', 86400 * 30, fn() => 1), 3600, function () {
            return Notification::activas()
                ->ordenadas()
                ->take(10)
                ->get();
        });

        return response()->json($notificaciones);
    }
}
