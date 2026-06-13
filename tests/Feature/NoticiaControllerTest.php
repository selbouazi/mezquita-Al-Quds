<?php

namespace Tests\Feature;

use App\Models\Noticia;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class NoticiaControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_lists_published_noticias()
    {
        Noticia::create(['titulo' => 'Visible', 'contenido' => 'Content', 'publicado' => true, 'fecha_publicacion' => now()]);
        Noticia::create(['titulo' => 'Hidden', 'contenido' => 'Content', 'publicado' => false, 'fecha_publicacion' => now()]);

        $response = $this->get('/noticias');

        $response->assertStatus(200);
        $response->assertInertia(fn ($assert) => $assert->component('Noticias')
            ->has('noticias.data', 1)
        );
    }

    /** @test */
    public function it_shows_published_noticia()
    {
        $noticia = Noticia::create(['titulo' => 'Test Article', 'contenido' => 'Full content here', 'publicado' => true, 'fecha_publicacion' => now()]);

        $response = $this->get('/noticias/'.$noticia->id);

        $response->assertStatus(200);
        $response->assertInertia(fn ($assert) => $assert->component('NoticiaShow')
            ->where('noticia.titulo', 'Test Article')
            ->where('noticia.contenido', 'Full content here')
        );
    }

    /** @test */
    public function it_returns_404_for_unpublished_noticia()
    {
        $noticia = Noticia::create(['titulo' => 'Draft', 'contenido' => 'Content', 'publicado' => false, 'fecha_publicacion' => now()]);

        $response = $this->get('/noticias/'.$noticia->id);

        $response->assertStatus(404);
    }

    /** @test */
    public function it_returns_404_for_nonexistent_noticia()
    {
        $response = $this->get('/noticias/999');

        $response->assertStatus(404);
    }
}
