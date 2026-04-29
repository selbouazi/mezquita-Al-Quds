<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Factura extends Model
{
    protected $table = 'facturas';

    protected $fillable = [
        'titulo',
        'fecha',
        'archivo_pdf',
        'notas',
    ];

    protected $casts = [
        'fecha' => 'date',
    ];

    public function getArchivoUrlAttribute()
    {
        return $this->archivo_pdf ? asset('storage/'.$this->archivo_pdf) : null;
    }
}
