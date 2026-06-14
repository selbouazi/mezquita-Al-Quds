<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

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

    public function comentarios(): HasMany
    {
        return $this->hasMany(Comentario::class);
    }

    public function comentariosAprobados(): HasMany
    {
        return $this->hasMany(Comentario::class)->where('aprobado', true);
    }

    public function getImagenAttribute($value)
    {
        if (empty($value)) {
            return null;
        }
        if (str_starts_with($value, 'http')) {
            return $value;
        }

        return asset('storage/'.$value);
    }
}
