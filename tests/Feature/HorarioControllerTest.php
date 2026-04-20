<?php

namespace Tests\Feature;

use App\Models\Horario;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class HorarioControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_load_home_page()
    {
        // Crear un horario para hoy
        Horario::create([
            'fecha' => now()->format('Y-m-d'),
            'fecha_hijri' => 'Test Hijri',
            'fajr' => '05:00',
            'sunrise' => '06:00',
            'dhuhr' => '12:00',
            'asr' => '15:00',
            'maghrib' => '18:00',
            'isha' => '20:00',
        ]);

        $response = $this->get('/');
        $response->assertStatus(200);
        $response->assertInertia(fn ($assert) => $assert->component('Home'));
    }

    /** @test */
    public function it_can_load_horarios_page()
    {
        // Crear algunos horarios
        Horario::create([
            'fecha' => '2026-03-24',
            'fecha_hijri' => '05 Shawwal 1447',
            'fajr' => '05:34',
            'sunrise' => '06:51',
            'dhuhr' => '13:00',
            'asr' => '16:27',
            'maghrib' => '19:10',
            'isha' => '20:27',
        ]);

        $response = $this->get('/horarios?year=2026&month=3');
        $response->assertStatus(200);
        $response->assertInertia(fn ($assert) => $assert->component('Horarios'));
    }

    /** @test */
    public function it_returns_empty_times_when_no_horario_today()
    {
        // No crear horario para hoy
        $response = $this->get('/');
        $response->assertStatus(200);
        $response->assertInertia(fn ($assert) => $assert->component('Home')
            ->has('prayerTimes', function ($assert) {
                $assert->where('fajr', '--:--')
                       ->where('sunrise', '--:--')
                       ->where('dhuhr', '--:--')
                       ->where('asr', '--:--')
                       ->where('maghrib', '--:--')
                       ->where('isha', '--:--');
            })
        );
    }

    /** @test */
    public function it_switches_language()
    {
        $response = $this->get('/lang/es');
        $response->assertRedirect();
        $this->assertEquals('es', session('locale'));
    }
}