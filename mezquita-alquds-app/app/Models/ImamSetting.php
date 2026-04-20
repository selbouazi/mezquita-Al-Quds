<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class ImamSetting extends Model
{
    protected $table = 'imam_settings';

    protected $fillable = [
        'nombre', 'descripcion', 'foto',
    ];

    protected $casts = [
        'foto' => 'string',
    ];

    public function getFotoAttribute($value)
    {
        if (empty($value)) {
            return null;
        }
        if (str_starts_with($value, 'http')) {
            return $value;
        }
        return asset('storage/' . $value);
    }
}