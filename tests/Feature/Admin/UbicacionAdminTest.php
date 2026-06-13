<?php

namespace Tests\Feature\Admin;

use App\Models\Ubicacion;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UbicacionAdminTest extends TestCase
{
    use RefreshDatabase;

    private function admin(): User
    {
        return User::factory()->create(['rol' => 'admin']);
    }

    /** @test */
    public function it_lists_ubicacion()
    {
        Ubicacion::create(['direccion' => '123 Main St']);

        $response = $this->actingAs($this->admin())->get('/admin/ubicacion');

        $response->assertStatus(200);
        $response->assertInertia(fn ($assert) => $assert->component('Admin/Ubicacion'));
    }

    /** @test */
    public function it_saves_ubicacion()
    {
        $response = $this->actingAs($this->admin())->post('/admin/ubicacion/guardar', [
            'direccion' => '456 Oak Ave',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('ubicaciones', ['direccion' => '456 Oak Ave']);
    }

    /** @test */
    public function it_validates_ubicacion_on_save()
    {
        $response = $this->actingAs($this->admin())->post('/admin/ubicacion/guardar', []);

        $response->assertSessionHasErrors(['direccion']);
    }
}
