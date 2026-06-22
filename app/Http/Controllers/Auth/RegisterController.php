<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Mail\VerificationCode;
use App\Models\ActivationCode;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rules\Password;
use Inertia\Response;

class RegisterController extends Controller
{
    public function showRegistrationForm(): Response
    {
        return inertia('Auth/Register');
    }

    public function register(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', Password::defaults(), 'confirmed'],
            'codigo_activacion' => ['required', 'string', 'max:100'],
        ]);

        if (!ActivationCode::validar($request->codigo_activacion)) {
            return back()->withErrors([
                'codigo_activacion' => 'El código de activación no es válido o está inactivo.',
            ])->withInput();
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'rol' => 'user',
        ]);

        $code = $user->generateVerificationCode();

        Mail::to($user->email)->queue(new VerificationCode($user, $code));

        session(['pending_verification_user_id' => $user->id]);

        return redirect('/verify-email')->with('success', 'Te hemos enviado un código de verificación a tu correo.');
    }
}
