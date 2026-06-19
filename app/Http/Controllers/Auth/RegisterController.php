<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\ActivationCode;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Response;

class RegisterController extends Controller
{
    /**
     * Muestra el formulario de registro.
     *
     * @return Response
     */
    public function showRegistrationForm(): Response
    {
        return inertia('Auth/Register');
    }

    /**
     * Maneja la solicitud de registro de usuario.
     *
     * @param Request $request
     * @return RedirectResponse
     */
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

        Auth::login($user);

        return redirect('/');
    }
}