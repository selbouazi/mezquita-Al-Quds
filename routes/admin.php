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

Route::middleware(['auth', AdminMiddleware::class])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/notificaciones', [NotificationController::class, 'index'])->name('notificaciones.index');
    Route::post('/notificaciones', [NotificationController::class, 'store'])->name('notificaciones.store');
    Route::put('/notificaciones/{notification}', [NotificationController::class, 'update'])->name('notificaciones.update');
    Route::delete('/notificaciones/{notification}', [NotificationController::class, 'destroy'])->name('notificaciones.destroy');
    Route::post('/notificaciones/{notification}/toggle', [NotificationController::class, 'toggle'])->name('notificaciones.toggle');

    Route::get('/codigos', [ActivationCodeController::class, 'index'])->name('codigos.index');
    Route::post('/codigos/generar', [ActivationCodeController::class, 'generar'])->name('codigos.generar');
    Route::post('/codigos/actualizar', [ActivationCodeController::class, 'actualizar'])->name('codigos.actualizar');

    Route::get('/imam', [ImamController::class, 'index'])->name('imam.index');
    Route::post('/imam/guardar', [ImamController::class, 'guardar'])->name('imam.guardar');

    Route::get('/donativos', [DonativosController::class, 'index'])->name('donativos.index');
    Route::post('/donativos', [DonativosController::class, 'store'])->name('donativos.store');
    Route::put('/donativos/{donativo}', [DonativosController::class, 'update'])->name('donativos.update');
    Route::delete('/donativos/{donativo}', [DonativosController::class, 'destroy'])->name('donativos.destroy');
    Route::post('/donativos/{donativo}/toggle', [DonativosController::class, 'togglePagado'])->name('donativos.toggle');

    Route::get('/facturas', [FacturasController::class, 'index'])->name('facturas.index');
    Route::post('/facturas', [FacturasController::class, 'store'])->name('facturas.store');
    Route::post('/facturas/{factura}', [FacturasController::class, 'update'])->name('facturas.update');
    Route::delete('/facturas/{factura}', [FacturasController::class, 'destroy'])->name('facturas.destroy');
    Route::get('/facturas/{factura}/download', [FacturasController::class, 'download'])->name('facturas.download');

    Route::get('/clases', [ClasesController::class, 'index'])->name('clases.index');
    Route::post('/clases', [ClasesController::class, 'store'])->name('clases.store');
    Route::post('/clases/{clase}', [ClasesController::class, 'update'])->name('clases.update');
    Route::delete('/clases/{clase}', [ClasesController::class, 'destroy'])->name('clases.destroy');

    Route::get('/contactos', [ContactosController::class, 'index'])->name('contactos.index');
    Route::post('/contactos/{contacto}/leido', [ContactosController::class, 'marcarLeido'])->name('contactos.leido');
    Route::delete('/contactos/{contacto}', [ContactosController::class, 'destroy'])->name('contactos.destroy');

    Route::get('/noticias', [NoticiasController::class, 'index'])->name('noticias.index');
    Route::post('/noticias', [NoticiasController::class, 'store'])->name('noticias.store');
    Route::post('/noticias/{noticia}', [NoticiasController::class, 'update'])->name('noticias.update');
    Route::delete('/noticias/{noticia}', [NoticiasController::class, 'destroy'])->name('noticias.destroy');

    Route::get('/ubicacion', [UbicacionController::class, 'index'])->name('ubicacion.index');
    Route::post('/ubicacion/guardar', [UbicacionController::class, 'guardar'])->name('ubicacion.guardar');

    Route::get('/horarios', [TiemposEsperaController::class, 'index'])->name('tiempos-espera.index');
    Route::post('/horarios/{rezo}', [TiemposEsperaController::class, 'update'])->name('tiempos-espera.update');
});
