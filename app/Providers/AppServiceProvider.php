<?php

namespace App\Providers;

use App\Models\ImamSetting;
use App\Models\Noticia;
use App\Models\Notification;
use App\Observers\ImamSettingObserver;
use App\Observers\NoticiaObserver;
use App\Observers\NotificationObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if ($this->app->environment('production')) {
            \Illuminate\Support\Facades\URL::forceScheme('https');
        }

        Noticia::observe(NoticiaObserver::class);
        ImamSetting::observe(ImamSettingObserver::class);
        Notification::observe(NotificationObserver::class);
    }
}
