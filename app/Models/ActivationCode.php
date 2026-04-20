<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ActivationCode extends Model
{
    protected $fillable = [
        'codigo', 'activo', 'expira_en',
    ];

    protected $casts = [
        'expira_en' => 'datetime',
        'activo' => 'boolean',
    ];
}