<?php

namespace Tests\Feature\Admin;

use App\Models\Donativo;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DonativoAdminTest extends TestCase
{
    use RefreshDatabase;

    private function admin(): User
    {
        return User::factory()->create(['rol' => 'admin']);
    }

    /** @test */
    public function it_lists_donativos()
    {
        Donativo::create(['nombre' => 'Test', 'cantidad' => 100, 'año' => date('Y')]);

        $response = $this->actingAs($this->admin())->get('/admin/donativos');

        $response->assertStatus(200);
        $response->assertInertia(fn ($assert) => $assert->component('Admin/Donativos'));
    }

    /** @test */
    public function it_creates_donativo()
    {
        $response = $this->actingAs($this->admin())->post('/admin/donativos', [
            'nombre' => 'Donor',
            'cantidad' => 50,
            'año' => date('Y'),
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('donativos', ['nombre' => 'Donor']);
    }

    /** @test */
    public function it_toggles_pagado()
    {
        $donativo = Donativo::create(['nombre' => 'Test', 'cantidad' => 100, 'año' => date('Y'), 'pagado' => false]);

        $response = $this->actingAs($this->admin())->post('/admin/donativos/'.$donativo->id.'/toggle');

        $response->assertRedirect();
        $this->assertTrue((bool) $donativo->fresh()->pagado);
    }

    /** @test */
    public function it_deletes_donativo()
    {
        $donativo = Donativo::create(['nombre' => 'Test', 'cantidad' => 100, 'año' => date('Y')]);

        $response = $this->actingAs($this->admin())->delete('/admin/donativos/'.$donativo->id);

        $response->assertRedirect();
        $this->assertDatabaseMissing('donativos', ['id' => $donativo->id]);
    }

    /** @test */
    public function it_updates_donativo()
    {
        $donativo = Donativo::create(['nombre' => 'Old', 'cantidad' => 100, 'año' => date('Y')]);

        $response = $this->actingAs($this->admin())->put('/admin/donativos/'.$donativo->id, [
            'nombre' => 'Updated',
            'cantidad' => 200,
            'año' => date('Y'),
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('donativos', ['nombre' => 'Updated']);
    }

    /** @test */
    public function it_validates_donativo_on_create()
    {
        $response = $this->actingAs($this->admin())->post('/admin/donativos', []);

        $response->assertSessionHasErrors(['nombre', 'cantidad', 'año']);
    }
}
