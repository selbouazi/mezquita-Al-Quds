<?php

namespace Tests\Feature\Admin;

use App\Models\Contacto;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ContactoAdminTest extends TestCase
{
    use RefreshDatabase;

    private function admin(): User
    {
        return User::factory()->create(['rol' => 'admin']);
    }

    /** @test */
    public function it_lists_contact_messages()
    {
        Contacto::create(['nombre' => 'Sender', 'email' => 'a@b.com', 'mensaje' => 'Hello', 'tipo' => 'web']);

        $response = $this->actingAs($this->admin())->get('/admin/contactos');

        $response->assertStatus(200);
        $response->assertInertia(fn ($assert) => $assert->component('Admin/Contactos'));
    }

    /** @test */
    public function it_marks_message_as_read()
    {
        $msg = Contacto::create(['nombre' => 'Sender', 'email' => 'a@b.com', 'mensaje' => 'Hello', 'tipo' => 'web']);

        $response = $this->actingAs($this->admin())->post('/admin/contactos/'.$msg->id.'/leido');

        $response->assertRedirect();
        $this->assertTrue((bool) $msg->fresh()->leido);
    }

    /** @test */
    public function it_deletes_contact_message()
    {
        $msg = Contacto::create(['nombre' => 'Sender', 'email' => 'a@b.com', 'mensaje' => 'Hello', 'tipo' => 'web']);

        $response = $this->actingAs($this->admin())->delete('/admin/contactos/'.$msg->id);

        $response->assertRedirect();
        $this->assertDatabaseMissing('contactos', ['id' => $msg->id]);
    }
}
