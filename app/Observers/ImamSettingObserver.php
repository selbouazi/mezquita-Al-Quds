<?php

namespace App\Observers;

use App\Models\ImamSetting;
use Illuminate\Support\Facades\Cache;

class ImamSettingObserver
{
    public function saved(ImamSetting $imam): void
    {
        Cache::forget('imam_data');
        Cache::forget('api_imam_data');
    }

    public function deleted(ImamSetting $imam): void
    {
        Cache::forget('imam_data');
        Cache::forget('api_imam_data');
    }
}
