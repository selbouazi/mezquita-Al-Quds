<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\NotificationController;
use App\Http\Controllers\Admin\ActivationCodeController;
use App\Http\Controllers\Admin\ImamController;

Route::middleware(['auth'])->prefix('admin')->group(function () {
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

    // Módulos (placeholders)
    Route::get('/horarios', fn () => inertia('Admin/Horarios'));
    Route::get('/donativos', fn () => inertia('Admin/Donativos'));
    Route::get('/facturas', fn () => inertia('Admin/Facturas'));
    Route::get('/noticias', fn () => inertia('Admin/Noticias'));
    Route::get('/clases', fn () => inertia('Admin/Clases'));
    Route::get('/ubicacion', fn () => inertia('Admin/Ubicacion'));
    Route::get('/contactos', fn () => inertia('Admin/Contactos'));
});
