<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contacto extends Model
{
    protected $table = 'contactos';

    protected $fillable = [
        'nombre',
        'email',
        'telefono',
        'mensaje',
        'tipo',
        'leido',
    ];

    protected $casts = [
        'leido' => 'boolean',
    ];

    public function scopeNoLeidos($query)
    {
        return $query->where('leido', false);
    }
}
