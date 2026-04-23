<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        if (! auth()->check()) {
            return redirect('/login')->with('error', 'Debes iniciar sesión para acceder.');
        }

        if (auth()->user()->rol !== 'admin') {
            return Inertia::render('Auth/AccessDenied', [
                'title' => 'Acceso denegado',
                'message' => 'No tienes suficientes privilegios para acceder a esta sección.',
            ])->toResponse($request);
        }

        return $next($request);
    }
}
