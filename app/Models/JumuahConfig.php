<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JumuahConfig extends Model
{
    protected $fillable = [
        'fecha_inicio',
        'fecha_fin',
        'hora_jumuah',
        'khutbah_minutos',
        'activo',
    ];

    protected $casts = [
        'fecha_inicio' => 'date',
        'fecha_fin' => 'date',
        'activo' => 'boolean',
    ];

    public function scopeActivo($query)
    {
        return $query->where('activo', true);
    }
}
