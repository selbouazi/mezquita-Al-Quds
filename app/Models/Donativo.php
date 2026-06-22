<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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
        'user_id',
        'stripe_session_id',
        'email_donante',
        'stripe_payment_intent',
    ];

    protected $casts = [
        'cantidad' => 'decimal:2',
        'pagado' => 'boolean',
        'año' => 'integer',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

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
