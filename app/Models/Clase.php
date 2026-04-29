<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Clase extends Model
{
    protected $table = 'clases';

    protected $fillable = [
        'titulo',
        'descripcion',
        'horarios',
        'nivel',
        'profesor',
        'requisitos',
        'activo',
    ];

    protected $casts = [
        'activo' => 'boolean',
    ];
}
