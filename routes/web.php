<?php

use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\ComentarioController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DonativoController;
use App\Http\Controllers\FacturaController;
use App\Http\Controllers\HorarioController;
use App\Http\Controllers\NoticiasController;
use App\Http\Controllers\PublicController;
use App\Http\Controllers\SitemapController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Fortify;

Fortify::loginView(function () {
    return Inertia::render('Auth/Login');
});

Fortify::registerView(function () {
    return Inertia::render('Auth/Register');
});

Route::get('/register', [RegisterController::class, 'showRegistrationForm']);
Route::post('/register', [RegisterController::class, 'register'])
    ->middleware('throttle:5,1');

Route::get('/', [HorarioController::class, 'home']);
Route::get('/horarios', [HorarioController::class, 'horarios']);

Route::get('/noticias', [NoticiasController::class, 'index']);
Route::get('/noticias/{noticia}', [NoticiasController::class, 'show']);
Route::post('/comentarios', [ComentarioController::class, 'store'])->middleware('throttle:10,1');

Route::get('/contacto', [ContactController::class, 'create']);
Route::post('/contacto', [ContactController::class, 'store'])
    ->middleware('throttle:5,1');

Route::get('/ubicacion', [PublicController::class, 'ubicacion']);
Route::get('/imam', [PublicController::class, 'imam']);
Route::get('/notifications', [PublicController::class, 'notifications']);

Route::get('/api/imam', [PublicController::class, 'apiImam']);
Route::get('/api/notificaciones', [PublicController::class, 'apiNotificaciones']);

Route::get('/sitemap.xml', [SitemapController::class, 'index']);
Route::get('/robots.txt', function () {
    return response("User-agent: *\nAllow: /\nSitemap: " . url('/sitemap.xml') . "\n", 200, ['Content-Type' => 'text/plain']);
});

Route::get('/lang/{lang}', [PublicController::class, 'switchLang'])->name('lang.switch');

Route::middleware(['auth'])->group(function () {
    Route::get('/facturas', [FacturaController::class, 'index']);
    Route::get('/facturas/{factura}/download', [FacturaController::class, 'download']);
    Route::get('/donativos', [DonativoController::class, 'index']);
});

require __DIR__.'/admin.php';
