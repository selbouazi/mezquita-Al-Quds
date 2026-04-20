<?php

namespace Tests\Unit;

use App\Models\Horario;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class HorarioTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_create_a_horario()
    {
        $horario = Horario::create([
            'fecha' => '2026-03-24',
            'fecha_hijri' => '05 Shawwal 1447',
            'fajr' => '05:34',
            'sunrise' => '06:51',
            'dhuhr' => '13:00',
            'asr' => '16:27',
            'maghrib' => '19:10',
            'isha' => '20:27',
        ]);

        $this->assertInstanceOf(Horario::class, $horario);
        $this->assertEquals('2026-03-24', $horario->fecha->format('Y-m-d'));
        $this->assertEquals('05 Shawwal 1447', $horario->fecha_hijri);
        $this->assertEquals('05:34', $horario->fajr);
    }

    /** @test */
    public function fecha_is_cast_to_date()
    {
        $horario = Horario::create([
            'fecha' => '2026-03-24',
            'fecha_hijri' => '05 Shawwal 1447',
            'fajr' => '05:34',
            'sunrise' => '06:51',
            'dhuhr' => '13:00',
            'asr' => '16:27',
            'maghrib' => '19:10',
            'isha' => '20:27',
        ]);

        $this->assertInstanceOf(\Illuminate\Support\Carbon::class, $horario->fecha);
    }

    /** @test */
    public function it_can_find_horario_by_date()
    {
        $horario = Horario::create([
            'fecha' => '2026-03-24',
            'fecha_hijri' => '05 Shawwal 1447',
            'fajr' => '05:34',
            'sunrise' => '06:51',
            'dhuhr' => '13:00',
            'asr' => '16:27',
            'maghrib' => '19:10',
            'isha' => '20:27',
        ]);

        $found = Horario::whereDate('fecha', '2026-03-24')->first();
        $this->assertNotNull($found);
        $this->assertEquals($horario->id, $found->id);
    }
}