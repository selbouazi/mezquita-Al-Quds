<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthorizationTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function guest_is_redirected_to_login_for_admin()
    {
        $response = $this->get('/admin');

        $response->assertRedirect('/login');
    }

    /** @test */
    public function non_admin_user_sees_access_denied()
    {
        $user = User::factory()->create(['rol' => 'user']);

        $response = $this->actingAs($user)->get('/admin');

        $response->assertInertia(fn ($assert) => $assert->component('Auth/AccessDenied'));
    }

    /** @test */
    public function admin_user_can_access_admin_dashboard()
    {
        $admin = User::factory()->create(['rol' => 'admin']);

        $response = $this->actingAs($admin)->get('/admin');

        $response->assertStatus(200);
        $response->assertInertia(fn ($assert) => $assert->component('Admin/Dashboard'));
    }

    /** @test */
    public function guest_is_redirected_to_login_for_facturas()
    {
        $response = $this->get('/facturas');

        $response->assertRedirect('/login');
    }

    /** @test */
    public function guest_is_redirected_to_login_for_donativos()
    {
        $response = $this->get('/donativos');

        $response->assertRedirect('/login');
    }

    /** @test */
    public function authenticated_user_can_access_facturas()
    {
        $user = User::factory()->create(['rol' => 'user']);

        $response = $this->actingAs($user)->get('/facturas');

        $response->assertStatus(200);
    }

    /** @test */
    public function user_is_admin_returns_true_for_admin()
    {
        $admin = User::factory()->create(['rol' => 'admin']);

        $this->assertTrue($admin->isAdmin());
        $this->assertFalse($admin->isUser());
    }

    /** @test */
    public function user_is_admin_returns_false_for_regular_user()
    {
        $user = User::factory()->create(['rol' => 'user']);

        $this->assertFalse($user->isAdmin());
        $this->assertTrue($user->isUser());
    }
}
