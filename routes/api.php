<?php

use App\Http\Controllers\NoticiasController;
use App\Http\Controllers\PublicController;
use App\Http\Controllers\WebhookListenerController;
use Illuminate\Support\Facades\Route;

Route::post('/webhooks/{service}', [WebhookListenerController::class, 'handle']);

Route::prefix('v1')->middleware('throttle:api')->group(function () {
    Route::get('/imam', [PublicController::class, 'apiImam']);
    Route::get('/notificaciones', [PublicController::class, 'apiNotificaciones']);
    Route::get('/noticias', [NoticiasController::class, 'index']);
    Route::get('/noticias/{noticia}', [NoticiasController::class, 'show']);
});
