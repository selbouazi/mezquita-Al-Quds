<?php

namespace Tests\Feature\Admin;

use App\Models\Factura;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FacturaAdminTest extends TestCase
{
    use RefreshDatabase;

    private function admin(): User
    {
        return User::factory()->create(['rol' => 'admin']);
    }

    /** @test */
    public function it_lists_facturas()
    {
        Factura::create(['titulo' => 'Test', 'fecha' => now()]);

        $response = $this->actingAs($this->admin())->get('/admin/facturas');

        $response->assertStatus(200);
        $response->assertInertia(fn ($assert) => $assert->component('Admin/Facturas'));
    }

    /** @test */
    public function it_deletes_factura()
    {
        $factura = Factura::create(['titulo' => 'Test', 'fecha' => now()]);

        $response = $this->actingAs($this->admin())->delete('/admin/facturas/'.$factura->id);

        $response->assertRedirect();
        $this->assertDatabaseMissing('facturas', ['id' => $factura->id]);
    }
}
