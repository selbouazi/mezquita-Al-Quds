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
    public function ubicacion(): Response
    {
        return Inertia::render('Ubicacion');
    }

    public function imam(): Response
    {
        $imam = ImamSetting::first();

        return Inertia::render('Imam', ['imam' => $imam]);
    }

    public function notifications(): Response
    {
        $notificaciones = Notification::activas()
            ->ordenadas()
            ->paginate(10);

        return Inertia::render('Public/Notifications', [
            'notificaciones' => $notificaciones,
        ]);
    }

    public function switchLang(Request $request, string $lang): RedirectResponse
    {
        if (in_array($lang, ['es', 'ca', 'ar', 'en'])) {
            $request->session()->put('locale', $lang);
        }

        return back();
    }

    public function apiImam(): JsonResponse
    {
        $imam = ImamSetting::first();
        if ($imam && $imam->foto) {
            $imam->foto = Storage::url($imam->foto);
        }

        return response()->json($imam);
    }

    public function apiNotificaciones(): JsonResponse
    {
        $notificaciones = Notification::activas()
            ->ordenadas()
            ->take(10)
            ->get();

        return response()->json($notificaciones);
    }
}
