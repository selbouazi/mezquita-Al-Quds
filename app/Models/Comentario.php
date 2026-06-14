<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comentario extends Model
{
    protected $table = 'comentarios';

    protected $fillable = [
        'noticia_id',
        'user_id',
        'nombre',
        'contenido',
        'anonimo',
        'aprobado',
    ];

    protected $casts = [
        'anonimo' => 'boolean',
        'aprobado' => 'boolean',
    ];

    public function noticia()
    {
        return $this->belongsTo(Noticia::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function autorNombre(): string
    {
        if ($this->anonimo) {
            return 'Anónimo';
        }
        if ($this->user) {
            return $this->user->name;
        }
        return $this->nombre ?? 'Anónimo';
    }
}
