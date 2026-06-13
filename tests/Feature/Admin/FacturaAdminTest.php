<?php

namespace Tests\Feature\Admin;

use App\Models\Factura;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
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

    /** @test */
    public function it_creates_factura()
    {
        Storage::fake('public');
        $file = UploadedFile::fake()->create('document.pdf', 1024);

        $response = $this->actingAs($this->admin())->post('/admin/facturas', [
            'titulo' => 'New Invoice',
            'fecha' => now()->format('Y-m-d'),
            'archivo_pdf' => $file,
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('facturas', ['titulo' => 'New Invoice']);
    }

    /** @test */
    public function it_updates_factura()
    {
        Storage::fake('public');
        $factura = Factura::create(['titulo' => 'Old', 'fecha' => now()]);

        $response = $this->actingAs($this->admin())->post('/admin/facturas/'.$factura->id, [
            'titulo' => 'Updated',
            'fecha' => now()->format('Y-m-d'),
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('facturas', ['titulo' => 'Updated']);
    }

    /** @test */
    public function it_validates_factura_on_create()
    {
        $response = $this->actingAs($this->admin())->post('/admin/facturas', []);

        $response->assertSessionHasErrors(['titulo', 'fecha', 'archivo_pdf']);
    }
}
