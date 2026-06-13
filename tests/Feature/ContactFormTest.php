<?php

namespace Tests\Feature;

use App\Models\ContactMessage;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ContactFormTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_shows_contact_page()
    {
        $response = $this->get('/contacto');

        $response->assertStatus(200);
        $response->assertInertia(fn ($assert) => $assert->component('Contacto'));
    }

    /** @test */
    public function it_submits_contact_form()
    {
        $response = $this->post('/contacto', [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'message' => 'This is a test message.',
            'type' => 'web',
        ]);

        $response->assertRedirect();
        $response->assertSessionHas('success');
        $this->assertDatabaseHas('contact_messages', [
            'name' => 'John Doe',
            'email' => 'john@example.com',
        ]);
    }

    /** @test */
    public function it_requires_name_email_and_message()
    {
        $response = $this->post('/contacto', []);

        $response->assertSessionHasErrors(['name', 'email', 'message', 'type']);
    }

    /** @test */
    public function it_requires_phone_when_type_is_phone()
    {
        $response = $this->post('/contacto', [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'message' => 'Test',
            'type' => 'phone',
        ]);

        $response->assertSessionHasErrors('phone');
    }

    /** @test */
    public function it_accepts_phone_when_type_is_phone()
    {
        $response = $this->post('/contacto', [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'message' => 'Test',
            'type' => 'phone',
            'phone' => '+34600123456',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('contact_messages', [
            'phone' => '+34600123456',
        ]);
    }
}
