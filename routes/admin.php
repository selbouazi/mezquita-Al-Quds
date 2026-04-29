<?php

use App\Http\Controllers\Admin\ActivationCodeController;
use App\Http\Controllers\Admin\ClasesController;
use App\Http\Controllers\Admin\ContactosController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\DonativosController;
use App\Http\Controllers\Admin\FacturasController;
use App\Http\Controllers\Admin\ImamController;
use App\Http\Controllers\Admin\NoticiasController;
use App\Http\Controllers\Admin\NotificationController;
use App\Http\Controllers\Admin\TiemposEsperaController;
use App\Http\Controllers\Admin\UbicacionController;
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', AdminMiddleware::class])->prefix('admin')->group(function () {
    // Dashboard
    Route::get('/', [DashboardController::class, 'index'])->name('admin.dashboard');

    // Notificaciones
    Route::get('/notificaciones', [NotificationController::class, 'index']);
    Route::post('/notificaciones', [NotificationController::class, 'store']);
    Route::put('/notificaciones/{notification}', [NotificationController::class, 'update']);
    Route::delete('/notificaciones/{notification}', [NotificationController::class, 'destroy']);
    Route::post('/notificaciones/{notification}/toggle', [NotificationController::class, 'toggle']);

    // Codigos de activación
    Route::get('/codigos', [ActivationCodeController::class, 'index']);
    Route::post('/codigos/generar', [ActivationCodeController::class, 'generar']);
    Route::post('/codigos/actualizar', [ActivationCodeController::class, 'actualizar']);

    // Imam
    Route::get('/imam', [ImamController::class, 'index']);
    Route::post('/imam/guardar', [ImamController::class, 'guardar']);

    // Donativos
    Route::get('/donativos', [DonativosController::class, 'index']);
    Route::post('/donativos', [DonativosController::class, 'store']);
    Route::put('/donativos/{donativo}', [DonativosController::class, 'update']);
    Route::delete('/donativos/{donativo}', [DonativosController::class, 'destroy']);
    Route::post('/donativos/{donativo}/toggle', [DonativosController::class, 'togglePagado']);

    // Facturas
    Route::get('/facturas', [FacturasController::class, 'index']);
    Route::post('/facturas', [FacturasController::class, 'store']);
    Route::post('/facturas/{factura}', [FacturasController::class, 'update']);
    Route::delete('/facturas/{factura}', [FacturasController::class, 'destroy']);
    Route::get('/facturas/{factura}/download', [FacturasController::class, 'download']);

    // Clases
    Route::get('/clases', [ClasesController::class, 'index']);
    Route::post('/clases', [ClasesController::class, 'store']);
    Route::post('/clases/{clase}', [ClasesController::class, 'update']);
    Route::delete('/clases/{clase}', [ClasesController::class, 'destroy']);

    // Contactos
    Route::get('/contactos', [ContactosController::class, 'index']);
    Route::post('/contactos/{contacto}/leido', [ContactosController::class, 'marcarLeido']);
    Route::delete('/contactos/{contacto}', [ContactosController::class, 'destroy']);

    // Noticias
    Route::get('/noticias', [NoticiasController::class, 'index']);
    Route::post('/noticias', [NoticiasController::class, 'store']);
    Route::post('/noticias/{noticia}', [NoticiasController::class, 'update']);
    Route::delete('/noticias/{noticia}', [NoticiasController::class, 'destroy']);

    // Ubicación
    Route::get('/ubicacion', [UbicacionController::class, 'index']);
    Route::post('/ubicacion/guardar', [UbicacionController::class, 'guardar']);

    // Horarios (tiempos de espera)
    Route::get('/horarios', [TiemposEsperaController::class, 'index']);
    Route::post('/horarios/{rezo}', [TiemposEsperaController::class, 'update']);
});
