<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Horario;

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

Route::get('/lang/{lang}', function ($lang) {
    if (in_array($lang, ['es', 'ca', 'ar'])) {
        session(['locale' => $lang]);
    }
    return back();
})->name('lang.switch');