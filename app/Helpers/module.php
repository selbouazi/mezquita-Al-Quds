<?php

use App\Models\ModuleStatus;
use Illuminate\Support\Facades\Cache;

if (!function_exists('moduleIsActive')) {
    function moduleIsActive(string $module): bool
    {
        $modules = Cache::remember('module_status_all', 3600, function () {
            return ModuleStatus::pluck('activo', 'module');
        });

        return (bool) ($modules[$module] ?? true);
    }
}
