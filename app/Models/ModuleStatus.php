<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ModuleStatus extends Model
{
    protected $fillable = ['module', 'activo'];

    protected $table = 'module_status';
}
