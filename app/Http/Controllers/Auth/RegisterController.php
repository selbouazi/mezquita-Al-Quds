<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\ActivationCode;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class RegisterController extends Controller
{
    public function showRegistrationForm()
    {
        return inertia('Auth/Register');
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', Password::defaults(), 'confirmed'],
            'codigo_activacion' => ['required', 'string', 'max:100'],
        ]);

        $codigo = ActivationCode::where('codigo', strtoupper($request->codigo_activacion))
            ->where('activo', true)
            ->first();

        if (!$codigo) {
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