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

    public static function validar(string $codigo): bool
    {
        return static::where('codigo', strtoupper($codigo))
            ->where('activo', true)
            ->where(function ($query) {
                $query->whereNull('expira_en')
                    ->orWhere('expira_en', '>', now());
            })
            ->exists();
    }
}