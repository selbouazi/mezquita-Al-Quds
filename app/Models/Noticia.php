<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Noticia extends Model
{
    protected $table = 'noticias';

    protected $fillable = [
        'titulo',
        'contenido',
        'imagen',
        'fecha_publicacion',
        'publicado',
    ];

    protected $casts = [
        'publicado' => 'boolean',
        'fecha_publicacion' => 'date',
    ];

    public function scopePublicado($query)
    {
        return $query->where('publicado', true);
    }
}
