<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\App;

class SetLocale
{
    public function handle($request, Closure $next)
    {
        // Si hay idioma en sesión, úsalo. Si no, español por defecto.
        $locale = session('locale', 'es');

        App::setLocale($locale);

        return $next($request);
    }
}
