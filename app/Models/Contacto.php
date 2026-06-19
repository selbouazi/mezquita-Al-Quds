<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contacto extends Model
{
    protected $table = 'contact_messages';

    protected $fillable = [
        'name',
        'email',
        'phone',
        'message',
        'type',
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
