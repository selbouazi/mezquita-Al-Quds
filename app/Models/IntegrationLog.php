<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class IntegrationLog extends Model
{
    protected $fillable = [
        'service',
        'event',
        'request_body',
        'response_body',
        'status_code',
        'retries',
        'success',
        'ip_address',
    ];

    protected function casts(): array
    {
        return [
            'success' => 'boolean',
            'retries' => 'integer',
        ];
    }
}
