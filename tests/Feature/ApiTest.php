<?php

namespace Tests\Feature;

use App\Models\ImamSetting;
use App\Models\Notification;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ApiTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_returns_imam_data_as_json()
    {
        $imam = ImamSetting::create([
            'nombre' => 'Imam Test',
            'biografia' => 'Bio test',
        ]);

        $response = $this->get('/api/imam');

        $response->assertStatus(200);
        $response->assertJson(['nombre' => 'Imam Test']);
    }

    /** @test */
    public function it_returns_empty_json_when_no_imam()
    {
        $response = $this->get('/api/imam');

        $response->assertStatus(200);
        $this->assertEmpty(array_filter((array) $response->json()));
    }

    /** @test */
    public function it_returns_active_notifications_as_json()
    {
        Notification::create([
            'titulo' => 'Active Notice',
            'mensaje' => 'Test',
            'activa' => true,
            'fecha_inicio' => now(),
        ]);

        Notification::create([
            'titulo' => 'Inactive Notice',
            'mensaje' => 'Test',
            'activa' => false,
            'fecha_inicio' => now(),
        ]);

        $response = $this->get('/api/notificaciones');

        $response->assertStatus(200);
        $response->assertJsonCount(1);
        $response->assertJsonFragment(['titulo' => 'Active Notice']);
    }
}
