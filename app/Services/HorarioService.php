<?php

namespace App\Services;

use App\Models\Horario;
use Illuminate\Support\Facades\Cache;

class HorarioService
{
    /**
     * Obtener horario de hoy con caching.
     */
    public static function getHorarioHoy(): array
    {
        $key = 'horario_hoy_' . now()->toDateString();
        
        return Cache::remember($key, now()->endOfDay(), function () {
            $horario = Horario::whereDate('fecha', today())->first();
            
            if (!$horario) {
                return self::emptyTimes();
            }
            
            $formatted = self::formatHorario($horario);
            unset($formatted['fecha_hijri']);
            return $formatted;
        });
    }
    
    /**
     * Obtener horarios de un mes específico.
     */
    public static function getHorariosMes(int $year, int $month): \Illuminate\Support\Collection
    {
        $key = "horarios_mes_{$year}_{$month}";
        
        return Cache::remember($key, now()->endOfDay(), function () use ($year, $month) {
            return Horario::whereYear('fecha', $year)
                ->whereMonth('fecha', $month)
                ->orderBy('fecha')
                ->get(['fecha', 'fecha_hijri', 'fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'])
                ->keyBy(fn($h) => $h->fecha->format('Y-m-d'))
                ->map(fn($h) => self::formatHorario($h));
        });
    }
    
    /**
     * Limpiar caché de horarios.
     */
    public static function clearCache(?int $year = null): void
    {
        Cache::forget('horario_hoy_' . now()->toDateString());

        $year = $year ?? now()->year;

        for ($y = $year - 1; $y <= $year + 1; $y++) {
            for ($m = 1; $m <= 12; $m++) {
                Cache::forget("horarios_mes_{$y}_{$m}");
            }
        }
    }
    
    /**
     * Formatear un modelo Horario a array.
     */
    private static function formatHorario(Horario $horario): array
    {
        return [
            'fecha_hijri' => $horario->fecha_hijri,
            'fajr'        => substr($horario->fajr,    0, 5),
            'sunrise'     => substr($horario->sunrise, 0, 5),
            'dhuhr'       => substr($horario->dhuhr,   0, 5),
            'asr'         => substr($horario->asr,     0, 5),
            'maghrib'     => substr($horario->maghrib, 0, 5),
            'isha'        => substr($horario->isha,    0, 5),
        ];
    }
    
    /**
     * Array de horarios vacíos.
     */
    private static function emptyTimes(): array
    {
        return ['fajr'=>'--:--','sunrise'=>'--:--','dhuhr'=>'--:--','asr'=>'--:--','maghrib'=>'--:--','isha'=>'--:--'];
    }
}