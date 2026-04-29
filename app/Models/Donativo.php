<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Donativo extends Model
{
    protected $table = 'donativos';

    protected $fillable = [
        'nombre_arabe',
        'nombre',
        'cantidad',
        'pagado',
        'año',
        'notas',
    ];

    protected $casts = [
        'cantidad' => 'decimal:2',
        'pagado' => 'boolean',
        'año' => 'integer',
    ];

    public function scopeByYear($query, $year = null)
    {
        return $query->where('año', $year ?? date('Y'));
    }

    public function scopePaid($query)
    {
        return $query->where('pagado', true);
    }

    public function scopePending($query)
    {
        return $query->where('pagado', false);
    }
}
