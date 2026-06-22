<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class VerificationController extends Controller
{
    public function showForm(): Response
    {
        $userId = session('pending_verification_user_id');

        if (!$userId) {
            return Inertia::render('Auth/Login', [
                'flash' => ['error' => 'No hay una cuenta pendiente de verificación. Regístrate primero.'],
            ]);
        }

        $user = User::find($userId);

        if (!$user || $user->hasVerifiedEmail()) {
            return Inertia::render('Auth/Login', [
                'flash' => ['info' => 'Tu cuenta ya está verificada. Inicia sesión.'],
            ]);
        }

        $email = $user->email;

        return Inertia::render('Auth/VerifyEmail', [
            'email' => $email,
        ]);
    }

    public function verify(Request $request): RedirectResponse
    {
        $userId = session('pending_verification_user_id');

        if (!$userId) {
            return redirect('/login')->with('error', 'No hay una cuenta pendiente de verificación.');
        }

        $user = User::find($userId);

        if (!$user) {
            return redirect('/register')->with('error', 'Usuario no encontrado. Regístrate de nuevo.');
        }

        if ($user->hasVerifiedEmail()) {
            Auth::login($user);
            session()->forget('pending_verification_user_id');

            return redirect('/')->with('success', 'Cuenta verificada correctamente.');
        }

        $request->validate([
            'code' => ['required', 'string', 'size:6'],
        ]);

        if ($user->verifyCode($request->code)) {
            Auth::login($user);
            session()->forget('pending_verification_user_id');

            return redirect('/')->with('success', 'Cuenta verificada correctamente. ¡Bienvenido!');
        }

        return back()->with('error', 'El código introducido no es válido. Inténtalo de nuevo.');
    }

    public function resend(): RedirectResponse
    {
        $userId = session('pending_verification_user_id');

        if (!$userId) {
            return redirect('/login')->with('error', 'No hay una cuenta pendiente de verificación.');
        }

        $user = User::find($userId);

        if (!$user || $user->hasVerifiedEmail()) {
            return redirect('/login')->with('info', 'Tu cuenta ya está verificada.');
        }

        $code = $user->generateVerificationCode();
        \Illuminate\Support\Facades\Mail::to($user->email)->queue(new \App\Mail\VerificationCode($user, $code));

        return back()->with('success', 'Se ha enviado un nuevo código a tu correo.');
    }
}
