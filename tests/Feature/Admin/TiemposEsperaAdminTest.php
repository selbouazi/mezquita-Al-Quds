<?php

namespace Tests\Feature\Admin;

use App\Models\TiempoEspera;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TiemposEsperaAdminTest extends TestCase
{
    use RefreshDatabase;

    private function admin(): User
    {
        return User::factory()->create(['rol' => 'admin']);
    }

    /** @test */
    public function it_lists_tiempos_espera()
    {
        TiempoEspera::create(['rezo' => 'fajr', 'minutos' => 20]);

        $response = $this->actingAs($this->admin())->get('/admin/horarios');

        $response->assertStatus(200);
        $response->assertInertia(fn ($assert) => $assert->component('Admin/Horarios'));
    }

    /** @test */
    public function it_updates_tiempo_espera()
    {
        $response = $this->actingAs($this->admin())->post('/admin/horarios/fajr', [
            'minutos' => 20,
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('tiempos_espera', ['rezo' => 'fajr', 'minutos' => 20]);
    }

    /** @test */
    public function it_validates_tiempo_espera_on_update()
    {
        $response = $this->actingAs($this->admin())->post('/admin/horarios/fajr', []);

        $response->assertSessionHasErrors(['minutos']);
    }
}
