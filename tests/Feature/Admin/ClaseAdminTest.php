<?php

namespace Tests\Feature\Admin;

use App\Models\Clase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ClaseAdminTest extends TestCase
{
    use RefreshDatabase;

    private function admin(): User
    {
        return User::factory()->create(['rol' => 'admin']);
    }

    /** @test */
    public function it_lists_clases()
    {
        Clase::create(['titulo' => 'Quran Class', 'descripcion' => 'Desc', 'dia_semana' => 'monday', 'hora' => '10:00']);

        $response = $this->actingAs($this->admin())->get('/admin/clases');

        $response->assertStatus(200);
        $response->assertInertia(fn ($assert) => $assert->component('Admin/Clases'));
    }

    /** @test */
    public function it_creates_clase()
    {
        $response = $this->actingAs($this->admin())->post('/admin/clases', [
            'titulo' => 'Arabic Class',
            'descripcion' => 'Learn Arabic',
            'dia_semana' => 'tuesday',
            'hora' => '18:00',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('clases', ['titulo' => 'Arabic Class']);
    }

    /** @test */
    public function it_deletes_clase()
    {
        $clase = Clase::create(['titulo' => 'Test', 'descripcion' => 'Desc', 'dia_semana' => 'monday', 'hora' => '10:00']);

        $response = $this->actingAs($this->admin())->delete('/admin/clases/'.$clase->id);

        $response->assertRedirect();
        $this->assertDatabaseMissing('clases', ['id' => $clase->id]);
    }
}
