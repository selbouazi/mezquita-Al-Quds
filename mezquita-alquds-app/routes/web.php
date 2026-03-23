<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn () => Inertia::render('Home', [
    'prayerTimes' => [
        'Fajr'    => '04:30',
        'Sunrise' => '07:30',
        'Dhuhr'   => '10:25',
        'Asr'     => '16:30',
        'Maghrib' => '19:00',
        'Isha'    => '23:30',
    ],
]));

Route::get('/horarios',  fn () => Inertia::render('Horarios'));
Route::get('/noticias',  fn () => Inertia::render('Noticias'));
Route::get('/contacto',  fn () => Inertia::render('Contacto'));
Route::get('/ubicacion', fn () => Inertia::render('Ubicacion'));

Route::get('/lang/{lang}', function ($lang) {
    session(['locale' => $lang]);
    return back();
})->name('lang.switch');