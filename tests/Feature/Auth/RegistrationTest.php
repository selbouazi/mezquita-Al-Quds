<?php

namespace Tests\Feature\Auth;

use App\Models\ActivationCode;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_shows_registration_form()
    {
        $response = $this->get('/register');

        $response->assertStatus(200);
        $response->assertInertia(fn ($assert) => $assert->component('Auth/Register'));
    }

    /** @test */
    public function it_registers_a_user_with_valid_activation_code()
    {
        $codigo = ActivationCode::create([
            'codigo' => 'TEST123',
            'activo' => true,
        ]);

        $response = $this->post('/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
            'codigo_activacion' => 'TEST123',
        ]);

        $response->assertRedirect('/');
        $this->assertAuthenticated();
        $this->assertDatabaseHas('users', [
            'email' => 'test@example.com',
            'rol' => 'user',
        ]);
    }

    /** @test */
    public function it_rejects_invalid_activation_code()
    {
        $response = $this->post('/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
            'codigo_activacion' => 'INVALID',
        ]);

        $response->assertSessionHasErrors('codigo_activacion');
        $this->assertGuest();
    }

    /** @test */
    public function it_rejects_inactive_activation_code()
    {
        ActivationCode::create([
            'codigo' => 'INACTIVE',
            'activo' => false,
        ]);

        $response = $this->post('/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
            'codigo_activacion' => 'INACTIVE',
        ]);

        $response->assertSessionHasErrors('codigo_activacion');
        $this->assertGuest();
    }

    /** @test */
    public function it_requires_all_registration_fields()
    {
        $response = $this->post('/register', []);

        $response->assertSessionHasErrors(['name', 'email', 'password', 'codigo_activacion']);
    }

    /** @test */
    public function it_rejects_duplicate_email()
    {
        User::create([
            'name' => 'Existing',
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);

        ActivationCode::create(['codigo' => 'TEST123', 'activo' => true]);

        $response = $this->post('/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
            'codigo_activacion' => 'TEST123',
        ]);

        $response->assertSessionHasErrors('email');
    }
}
