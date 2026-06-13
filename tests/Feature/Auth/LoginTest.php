<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LoginTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_shows_login_form()
    {
        $response = $this->get('/login');

        $response->assertStatus(200);
        $response->assertInertia(fn ($assert) => $assert->component('Auth/Login'));
    }

    /** @test */
    public function it_logs_in_with_valid_credentials()
    {
        $user = User::factory()->create([
            'email' => 'user@test.com',
            'password' => bcrypt('password'),
        ]);

        $response = $this->post('/login', [
            'email' => 'user@test.com',
            'password' => 'password',
        ]);

        $response->assertRedirect('/');
        $this->assertAuthenticated();
    }

    /** @test */
    public function it_rejects_invalid_credentials()
    {
        $user = User::factory()->create([
            'email' => 'user@test.com',
            'password' => bcrypt('password'),
        ]);

        $response = $this->post('/login', [
            'email' => 'user@test.com',
            'password' => 'wrong-password',
        ]);

        $response->assertSessionHasErrors('email');
        $this->assertGuest();
    }

    /** @test */
    public function it_logs_out_authenticated_user()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/logout');

        $response->assertRedirect('/');
        $this->assertGuest();
    }
}
