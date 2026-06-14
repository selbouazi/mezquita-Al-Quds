<?php

namespace App\Observers;

use App\Models\Notification;
use Illuminate\Support\Facades\Cache;

class NotificationObserver
{
    public function saved(Notification $notification): void
    {
        Cache::increment('notificaciones_version');
        Cache::forget('home_notificaciones');
    }

    public function deleted(Notification $notification): void
    {
        Cache::increment('notificaciones_version');
        Cache::forget('home_notificaciones');
    }
}
