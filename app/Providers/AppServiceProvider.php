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

        \Illuminate\Support\Facades\RateLimiter::for('api', function (\Illuminate\Http\Request $request) {
            $user = $request->user();
            $key = $user ? 'api:' . $user->id : 'api:' . $request->ip();
            $limit = $user && $user->rol === 'admin' ? 120 : 60;
            return \Illuminate\Cache\RateLimiting\Limit::perMinute($limit)->by($key);
        });

        \Illuminate\Support\Facades\RateLimiter::for('auth', function (\Illuminate\Http\Request $request) {
            return \Illuminate\Cache\RateLimiting\Limit::perMinute(5)->by($request->ip());
        });

        Noticia::observe(NoticiaObserver::class);
        ImamSetting::observe(ImamSettingObserver::class);
        Notification::observe(NotificationObserver::class);
    }
}
