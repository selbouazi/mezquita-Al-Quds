<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    protected $fillable = [
        'titulo', 'mensaje', 'prioridad', 'activa',
        'fecha_publicacion', 'fecha_expiracion',
    ];

    protected $casts = [
        'fecha_publicacion' => 'datetime',
        'fecha_expiracion' => 'datetime',
        'activa' => 'boolean',
    ];

    public function scopeActivas($query)
    {
        return $query->where('activa', true)
            ->where(function ($q) {
                $q->whereNull('fecha_expiracion')
                  ->orWhere('fecha_expiracion', '>=', now());
            });
    }

    public function scopeOrdenadas($query)
    {
        return $query->orderBy('fecha_publicacion', 'desc');
    }
}