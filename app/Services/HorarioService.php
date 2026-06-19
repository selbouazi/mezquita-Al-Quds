<?php

namespace App\Services;

use App\Models\Horario;
use App\Models\JumuahConfig;
use Illuminate\Support\Facades\Cache;

class HorarioService
{
    public static function getJumuahForDate(\Carbon\Carbon $date): ?JumuahConfig
    {
        if (!$date->isFriday()) {
            return null;
        }

        $key = 'jumuah_' . $date->toDateString();

        return Cache::remember($key, now()->addDay(), function () use ($date) {
            return JumuahConfig::activo()
                ->where('fecha_inicio', '<=', $date->toDateString())
                ->where('fecha_fin', '>=', $date->toDateString())
                ->first();
        });
    }

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

            $jumuah = self::getJumuahForDate(now());
            if ($jumuah) {
                $formatted['dhuhr'] = substr($jumuah->hora_jumuah, 0, 5);
            }
            if (now()->isFriday()) {
                $formatted['jumuah'] = true;
                $formatted['khutbah_minutos'] = $jumuah?->khutbah_minutos ?? 0;
            }

            return $formatted;
        });
    }

    public static function getHorariosMes(int $year, int $month): \Illuminate\Support\Collection
    {
        $key = "horarios_mes_{$year}_{$month}";

        return Cache::remember($key, now()->endOfDay(), function () use ($year, $month) {
            return Horario::whereYear('fecha', $year)
                ->whereMonth('fecha', $month)
                ->orderBy('fecha')
                ->get(['fecha', 'fecha_hijri', 'fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'])
                ->keyBy(fn($h) => $h->fecha->format('Y-m-d'))
                ->map(function ($h) {
                    $formatted = self::formatHorario($h);

                    $jumuah = self::getJumuahForDate($h->fecha);
                    if ($jumuah) {
                        $formatted['dhuhr'] = substr($jumuah->hora_jumuah, 0, 5);
                    }
                    if ($h->fecha->isFriday()) {
                        $formatted['jumuah'] = true;
                        $formatted['khutbah_minutos'] = $jumuah?->khutbah_minutos ?? 0;
                    }

                    return $formatted;
                });
        });
    }

    public static function clearCache(?int $year = null): void
    {
        $today = now()->toDateString();
        Cache::forget('horario_hoy_' . $today);
        Cache::forget('jumuah_' . $today);

        $year = $year ?? now()->year;

        for ($y = $year - 1; $y <= $year + 1; $y++) {
            for ($m = 1; $m <= 12; $m++) {
                Cache::forget("horarios_mes_{$y}_{$m}");
            }
        }
    }

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

    private static function emptyTimes(): array
    {
        return ['fajr'=>'--:--','sunrise'=>'--:--','dhuhr'=>'--:--','asr'=>'--:--','maghrib'=>'--:--','isha'=>'--:--'];
    }
}
