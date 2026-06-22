<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureEmailIsVerified
{
    public function handle(Request $request, Closure $next): Response
    {
        if (!$request->user() || !$request->user()->hasVerifiedEmail()) {
            return redirect('/verify-email')
                ->with('error', 'Debes verificar tu correo electrónico antes de acceder a esta sección.');
        }

        return $next($request);
    }
}
