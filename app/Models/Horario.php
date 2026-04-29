<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Horario extends Model
{
    protected $fillable = [
        'fecha', 'fecha_hijri',
        'fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha',
    ];

    protected $casts = [
        'fecha' => 'date',
    ];
}