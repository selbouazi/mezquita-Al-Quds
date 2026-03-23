<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TiempoEspera extends Model
{
    protected $table    = 'tiempos_espera';
    protected $fillable = ['rezo', 'minutos'];
}