<?php

namespace Tests\Feature\Admin;

use App\Models\Noticia;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class NoticiaAdminTest extends TestCase
{
    use RefreshDatabase;

    private function admin(): User
    {
        return User::factory()->create(['rol' => 'admin']);
    }

    /** @test */
    public function it_lists_noticias()
    {
        Noticia::create(['titulo' => 'News', 'contenido' => 'Content', 'publicado' => true, 'fecha_publicacion' => now()]);

        $response = $this->actingAs($this->admin())->get('/admin/noticias');

        $response->assertStatus(200);
        $response->assertInertia(fn ($assert) => $assert->component('Admin/Noticias'));
    }

    /** @test */
    public function it_creates_noticia()
    {
        $response = $this->actingAs($this->admin())->post('/admin/noticias', [
            'titulo' => 'New News',
            'contenido' => 'Content here',
            'publicado' => true,
            'fecha_publicacion' => now()->format('Y-m-d'),
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('noticias', ['titulo' => 'New News']);
    }

    /** @test */
    public function it_validates_noticia_on_create()
    {
        $response = $this->actingAs($this->admin())->post('/admin/noticias', []);

        $response->assertSessionHasErrors(['titulo', 'contenido', 'fecha_publicacion']);
    }

    /** @test */
    public function it_deletes_noticia()
    {
        $noticia = Noticia::create(['titulo' => 'Test', 'contenido' => 'Content', 'publicado' => true, 'fecha_publicacion' => now()]);

        $response = $this->actingAs($this->admin())->delete('/admin/noticias/'.$noticia->id);

        $response->assertRedirect();
        $this->assertDatabaseMissing('noticias', ['id' => $noticia->id]);
    }
}
