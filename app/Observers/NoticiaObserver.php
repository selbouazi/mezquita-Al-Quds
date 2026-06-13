<?php

namespace App\Observers;

use App\Models\Noticia;
use Illuminate\Support\Facades\Cache;

class NoticiaObserver
{
    public function saved(Noticia $noticia): void
    {
        Cache::increment('noticias_version');
    }

    public function deleted(Noticia $noticia): void
    {
        Cache::increment('noticias_version');
    }
}
