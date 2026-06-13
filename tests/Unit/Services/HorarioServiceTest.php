<?php

namespace Tests\Unit\Services;

use App\Models\Horario;
use App\Services\HorarioService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Tests\TestCase;

class HorarioServiceTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_returns_empty_times_when_no_horario()
    {
        $times = HorarioService::getHorarioHoy();

        $this->assertEquals([
            'fajr' => '--:--',
            'sunrise' => '--:--',
            'dhuhr' => '--:--',
            'asr' => '--:--',
            'maghrib' => '--:--',
            'isha' => '--:--',
        ], $times);
    }

    /** @test */
    public function it_returns_formatted_times_for_today()
    {
        Cache::forget('horario_hoy_' . now()->toDateString());

        Horario::create([
            'fecha' => now()->format('Y-m-d'),
            'fecha_hijri' => 'Test',
            'fajr' => '05:00:00',
            'sunrise' => '06:30:00',
            'dhuhr' => '12:00:00',
            'asr' => '15:45:00',
            'maghrib' => '18:00:00',
            'isha' => '20:15:00',
        ]);

        $times = HorarioService::getHorarioHoy();

        $this->assertEquals('05:00', $times['fajr']);
        $this->assertEquals('06:30', $times['sunrise']);
        $this->assertEquals('20:15', $times['isha']);
    }

    /** @test */
    public function it_returns_horarios_for_month()
    {
        Horario::create([
            'fecha' => '2026-06-15',
            'fecha_hijri' => 'Test',
            'fajr' => '04:00',
            'sunrise' => '05:30',
            'dhuhr' => '13:00',
            'asr' => '17:00',
            'maghrib' => '20:00',
            'isha' => '21:30',
        ]);

        $monthly = HorarioService::getHorariosMes(2026, 6);

        $this->assertCount(1, $monthly);
        $this->assertArrayHasKey('2026-06-15', $monthly->toArray());
    }
}
