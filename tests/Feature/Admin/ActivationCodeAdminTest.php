<?php

namespace Tests\Feature\Admin;

use App\Models\ActivationCode;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ActivationCodeAdminTest extends TestCase
{
    use RefreshDatabase;

    private function admin(): User
    {
        return User::factory()->create(['rol' => 'admin']);
    }

    /** @test */
    public function it_lists_codes()
    {
        ActivationCode::create(['codigo' => 'ABC123', 'activo' => true]);

        $response = $this->actingAs($this->admin())->get('/admin/codigos');

        $response->assertStatus(200);
        $response->assertInertia(fn ($assert) => $assert->component('Admin/Codigos'));
    }

    /** @test */
    public function it_generates_code()
    {
        $response = $this->actingAs($this->admin())->post('/admin/codigos/generar');

        $response->assertRedirect();
        $this->assertGreaterThan(0, ActivationCode::count());
    }

    /** @test */
    public function it_toggles_code_active_status()
    {
        $oldCode = ActivationCode::create(['codigo' => 'OLDCODE', 'activo' => true]);

        $response = $this->actingAs($this->admin())->post('/admin/codigos/actualizar', [
            'codigo' => 'NEWCODE88',
        ]);

        $response->assertRedirect();
        $this->assertFalse((bool) $oldCode->fresh()->activo);
        $this->assertDatabaseHas('activation_codes', ['codigo' => 'NEWCODE88', 'activo' => true]);
    }
}
