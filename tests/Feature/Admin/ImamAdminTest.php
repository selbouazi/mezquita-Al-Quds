<?php

namespace Tests\Feature\Admin;

use App\Models\ImamSetting;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ImamAdminTest extends TestCase
{
    use RefreshDatabase;

    private function admin(): User
    {
        return User::factory()->create(['rol' => 'admin']);
    }

    /** @test */
    public function it_lists_imam_settings()
    {
        ImamSetting::create(['nombre' => 'Imam Name', 'descripcion' => 'Description']);

        $response = $this->actingAs($this->admin())->get('/admin/imam');

        $response->assertStatus(200);
        $response->assertInertia(fn ($assert) => $assert->component('Admin/Imam'));
    }

    /** @test */
    public function it_saves_imam_settings()
    {
        $response = $this->actingAs($this->admin())->post('/admin/imam/guardar', [
            'nombre' => 'New Imam',
            'descripcion' => 'New Description',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('imam_settings', ['nombre' => 'New Imam']);
    }

    /** @test */
    public function it_saves_imam_settings_without_optional_fields()
    {
        $response = $this->actingAs($this->admin())->post('/admin/imam/guardar', []);

        $response->assertRedirect();
    }
}
