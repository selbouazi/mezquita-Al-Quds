<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        if (!Auth::check()) {
            return redirect('/login')->with('error', 'Debes iniciar sesión para acceder.');
        }

        if (!Auth::user()->isAdmin()) {
            return redirect('/')->with('error', 'No tienes acceso a esta sección.');
        }

        return $next($request);
    }
}