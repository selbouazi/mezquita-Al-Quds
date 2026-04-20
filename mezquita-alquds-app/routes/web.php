<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Horario;
use App\Models\Notification;
use App\Models\ImamSetting;
use Illuminate\Support\Facades\Storage;
use Laravel\Fortify\Fortify;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\NotificationController;
use App\Http\Controllers\Admin\ActivationCodeController;
use App\Http\Controllers\Admin\ImamController;

Fortify::loginView(function () {
    return Inertia::render('Auth/Login');
});

Fortify::registerView(function () {
    return Inertia::render('Auth/Register');
});

Route::get('/register', [App\Http\Controllers\Auth\RegisterController::class, 'showRegistrationForm']);
Route::post('/register', [App\Http\Controllers\Auth\RegisterController::class, 'register']);

// Rutas de Admin (protegidas por auth y rol admin)
Route::middleware(['auth', 'admin'])->prefix('admin')->group(function () {
    // Dashboard
    Route::get('/', [DashboardController::class, 'index'])->name('admin.dashboard');
    
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

    // Módulos (placeholders)
    Route::get('/horarios', fn () => inertia('Admin/Horarios'));
    Route::get('/donativos', fn () => inertia('Admin/Donativos'));
    Route::get('/facturas', fn () => inertia('Admin/Facturas'));
    Route::get('/noticias', fn () => inertia('Admin/Noticias'));
    Route::get('/clases', fn () => inertia('Admin/Clases'));
    Route::get('/ubicacion', fn () => inertia('Admin/Ubicacion'));
    Route::get('/contactos', fn () => inertia('Admin/Contactos'));
});

function getHorarioHoy(): array
{
    $horario = Horario::where('fecha', today()->toDateString())->first();

    if (!$horario) {
        return ['fajr'=>'--:--','sunrise'=>'--:--','dhuhr'=>'--:--','asr'=>'--:--','maghrib'=>'--:--','isha'=>'--:--'];
    }

    return [
        'fajr'    => substr($horario->fajr,    0, 5),
        'sunrise' => substr($horario->sunrise, 0, 5),
        'dhuhr'   => substr($horario->dhuhr,   0, 5),
        'asr'     => substr($horario->asr,     0, 5),
        'maghrib' => substr($horario->maghrib, 0, 5),
        'isha'    => substr($horario->isha,    0, 5),
    ];
}

Route::get('/', fn () => Inertia::render('Home', [
    'prayerTimes' => getHorarioHoy(),
]));

Route::get('/horarios', function () {
    $year  = request('year',  now()->year);
    $month = request('month', now()->month);

    $horarios = Horario::whereYear('fecha', $year)
        ->whereMonth('fecha', $month)
        ->orderBy('fecha')
        ->get(['fecha', 'fecha_hijri', 'fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'])
        ->keyBy(fn($h) => $h->fecha->format('Y-m-d'))
        ->map(fn($h) => [
            'fecha_hijri' => $h->fecha_hijri,
            'fajr'        => substr($h->fajr,    0, 5),
            'sunrise'     => substr($h->sunrise, 0, 5),
            'dhuhr'       => substr($h->dhuhr,   0, 5),
            'asr'         => substr($h->asr,     0, 5),
            'maghrib'     => substr($h->maghrib, 0, 5),
            'isha'        => substr($h->isha,    0, 5),
        ]);

    return Inertia::render('Horarios', [
        'horariosMes' => $horarios,
        'year'        => (int) $year,
        'month'       => (int) $month,
        'prayerTimes' => getHorarioHoy(),
    ]);
});

Route::get('/noticias',  fn () => Inertia::render('Noticias'));
Route::get('/contacto',  fn () => Inertia::render('Contacto'));
Route::get('/ubicacion', fn () => Inertia::render('Ubicacion'));
Route::get('/facturas', fn () => Inertia::render('Facturas'));
Route::get('/donativos', fn () => Inertia::render('Donativos'));

// Imam público
Route::get('/imam', function () {
    $imam = ImamSetting::first();
    if ($imam) {
        $imam->foto = $imam->foto; // Trigger accessor
    }
    return Inertia::render('Imam', ['imam' => $imam]);
});

// Notificaciones públicas
Route::get('/notifications', function () {
    $notificaciones = Notification::activas()
        ->ordenadas()
        ->paginate(10);
    return Inertia::render('Public/Notifications', ['notificaciones' => $notificaciones]);
});

// API: Imam
Route::get('/api/imam', function () {
    $imam = ImamSetting::first();
    if ($imam && $imam->foto) {
        $imam->foto = Storage::url($imam->foto);
    }
    return response()->json($imam);
});

// API: Notificaciones
Route::get('/api/notificaciones', function () {
    $notificaciones = Notification::activas()->ordenadas()->take(10)->get();
    return response()->json($notificaciones);
});

Route::get('/lang/{lang}', function ($lang) {
    if (in_array($lang, ['es', 'ca', 'ar', 'ur'])) {
        session(['locale' => $lang]);
    }
    return back();
})->name('lang.switch');
