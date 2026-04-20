<?php

namespace App\Services;

use App\Models\TiempoEspera;
use Illuminate\Support\Facades\Cache;

class TiempoEsperaService
{
    /**
     * Obtener tiempos de espera con caching.
     */
    public static function getTiemposEspera(): array
    {
        $key = 'tiempos_espera_all';
        
        return Cache::remember($key, now()->addDay(), function () {
            return TiempoEspera::all()
                ->pluck('minutos', 'rezo')
                ->toArray();
        });
    }
    
    /**
     * Limpiar caché de tiempos de espera.
     */
    public static function clearCache(): void
    {
        Cache::forget('tiempos_espera_all');
    }
}