<?php

namespace Tests\Feature\Admin;

use App\Models\Notification;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class NotificationAdminTest extends TestCase
{
    use RefreshDatabase;

    private function admin(): User
    {
        return User::factory()->create(['rol' => 'admin']);
    }

    /** @test */
    public function it_lists_notifications()
    {
        Notification::create(['titulo' => 'Test', 'mensaje' => 'Msg', 'activa' => true, 'fecha_inicio' => now()]);

        $response = $this->actingAs($this->admin())->get('/admin/notificaciones');

        $response->assertStatus(200);
        $response->assertInertia(fn ($assert) => $assert->component('Admin/Notificaciones'));
    }

    /** @test */
    public function it_creates_notification()
    {
        $response = $this->actingAs($this->admin())->post('/admin/notificaciones', [
            'titulo' => 'New Notice',
            'mensaje' => 'Notice message',
            'activa' => true,
            'fecha_inicio' => now()->format('Y-m-d'),
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('notifications', ['titulo' => 'New Notice']);
    }

    /** @test */
    public function it_updates_notification()
    {
        $notif = Notification::create(['titulo' => 'Old', 'mensaje' => 'Msg', 'activa' => true, 'fecha_inicio' => now()]);

        $response = $this->actingAs($this->admin())->put('/admin/notificaciones/'.$notif->id, [
            'titulo' => 'Updated',
            'mensaje' => 'Updated msg',
            'activa' => true,
            'fecha_inicio' => now()->format('Y-m-d'),
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('notifications', ['titulo' => 'Updated']);
    }

    /** @test */
    public function it_toggles_notification()
    {
        $notif = Notification::create(['titulo' => 'Test', 'mensaje' => 'Msg', 'activa' => true, 'fecha_inicio' => now()]);

        $response = $this->actingAs($this->admin())->post('/admin/notificaciones/'.$notif->id.'/toggle');

        $response->assertRedirect();
        $this->assertFalse($notif->fresh()->activa);
    }

    /** @test */
    public function it_deletes_notification()
    {
        $notif = Notification::create(['titulo' => 'Test', 'mensaje' => 'Msg', 'activa' => true, 'fecha_inicio' => now()]);

        $response = $this->actingAs($this->admin())->delete('/admin/notificaciones/'.$notif->id);

        $response->assertRedirect();
        $this->assertDatabaseMissing('notifications', ['id' => $notif->id]);
    }
}
