<?php

use App\Http\Controllers\Admin\ActivationCodeController;
use App\Http\Controllers\Admin\ClasesController;
use App\Http\Controllers\Admin\ComentariosController;
use App\Http\Controllers\Admin\ContactosController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\DonativosController;
use App\Http\Controllers\Admin\FacturasController;
use App\Http\Controllers\Admin\ImamController;
use App\Http\Controllers\Admin\JumuahConfigController;
use App\Http\Controllers\Admin\NoticiasController;
use App\Http\Controllers\Admin\NotificationController;
use App\Http\Controllers\Admin\ModuleStatusController;
use App\Http\Controllers\Admin\NormasController;
use App\Http\Controllers\Admin\TiemposEsperaController;
use App\Http\Controllers\Admin\UbicacionController;
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', AdminMiddleware::class])->prefix('admin')->group(function () {
    // Dashboard
    Route::get('/', [DashboardController::class, 'index'])->name('admin.dashboard');

    // Module status toggle
    Route::post('/modules/{module}/toggle', [ModuleStatusController::class, 'toggle']);

    // Notificaciones
    Route::get('/notificaciones', [NotificationController::class, 'index'])->name('notificaciones.index');
    Route::post('/notificaciones', [NotificationController::class, 'store']);
    Route::put('/notificaciones/{notification}', [NotificationController::class, 'update']);
    Route::delete('/notificaciones/{notification}', [NotificationController::class, 'destroy']);
    Route::post('/notificaciones/{notification}/toggle', [NotificationController::class, 'toggle']);

    // Codigos de activación
    Route::get('/codigos', [ActivationCodeController::class, 'index'])->name('codigos.index');
    Route::post('/codigos/generar', [ActivationCodeController::class, 'generar']);
    Route::post('/codigos/actualizar', [ActivationCodeController::class, 'actualizar']);

    // Imam
    Route::get('/imam', [ImamController::class, 'index'])->name('imam.index');
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
    Route::put('/facturas/{factura}', [FacturasController::class, 'update']);
    Route::delete('/facturas/{factura}', [FacturasController::class, 'destroy']);
    Route::get('/facturas/{factura}/download', [FacturasController::class, 'download']);

    // Clases
    Route::get('/clases', [ClasesController::class, 'index']);
    Route::post('/clases', [ClasesController::class, 'store']);
    Route::put('/clases/{clase}', [ClasesController::class, 'update']);
    Route::delete('/clases/{clase}', [ClasesController::class, 'destroy']);

    // Contactos
    Route::get('/contactos', [ContactosController::class, 'index']);
    Route::post('/contactos/{contacto}/leido', [ContactosController::class, 'marcarLeido']);
    Route::delete('/contactos/{contacto}', [ContactosController::class, 'destroy']);

    // Noticias
    Route::get('/noticias', [NoticiasController::class, 'index']);
    Route::post('/noticias', [NoticiasController::class, 'store']);
    Route::put('/noticias/{noticia}', [NoticiasController::class, 'update']);
    Route::delete('/noticias/{noticia}', [NoticiasController::class, 'destroy']);

    // Normas
    Route::get('/normas', [NormasController::class, 'index']);
    Route::post('/normas', [NormasController::class, 'store']);
    Route::put('/normas/{norma}', [NormasController::class, 'update']);
    Route::delete('/normas/{norma}', [NormasController::class, 'destroy']);

    // Comentarios
    Route::get('/comentarios', [ComentariosController::class, 'index']);
    Route::post('/comentarios/{comentario}/approve', [ComentariosController::class, 'approve']);
    Route::delete('/comentarios/{comentario}', [ComentariosController::class, 'destroy']);

    // Ubicación
    Route::get('/ubicacion', [UbicacionController::class, 'index']);
    Route::post('/ubicacion/guardar', [UbicacionController::class, 'guardar']);

    // Horarios (tiempos de espera + horario de hoy)
    Route::get('/horarios', [TiemposEsperaController::class, 'index']);

    // Jumu'ah config (must be before /horarios/{rezo})
    Route::get('/horarios/jumuah', [JumuahConfigController::class, 'index'])->name('admin.jumuah.index');
    Route::post('/horarios/jumuah', [JumuahConfigController::class, 'store']);
    Route::put('/horarios/jumuah/{jumuahConfig}', [JumuahConfigController::class, 'update']);
    Route::delete('/horarios/jumuah/{jumuahConfig}', [JumuahConfigController::class, 'destroy']);
    Route::post('/horarios/jumuah/{jumuahConfig}/toggle', [JumuahConfigController::class, 'toggle']);

    Route::post('/horarios/today', [TiemposEsperaController::class, 'updateToday']);
    Route::post('/horarios/{rezo}', [TiemposEsperaController::class, 'update']);
});
