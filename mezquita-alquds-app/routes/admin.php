<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\DashboardController;

Route::middleware(['auth'])->prefix('admin')->group(function () {
    // Dashboard
    Route::get('/', [DashboardController::class, 'index'])->name('admin.dashboard');
    
    // Módulos (placeholders)
    Route::get('/horarios', fn () => inertia('Admin/Horarios'));
    Route::get('/donativos', fn () => inertia('Admin/Donativos'));
    Route::get('/facturas', fn () => inertia('Admin/Facturas'));
    Route::get('/noticias', fn () => inertia('Admin/Noticias'));
    Route::get('/notificaciones', fn () => inertia('Admin/Notificaciones'));
    Route::get('/imam', fn () => inertia('Admin/Imam'));
    Route::get('/clases', fn () => inertia('Admin/Clases'));
    Route::get('/ubicacion', fn () => inertia('Admin/Ubicacion'));
    Route::get('/contactos', fn () => inertia('Admin/Contactos'));
    Route::get('/codigos', fn () => inertia('admin/Codigos'));
});