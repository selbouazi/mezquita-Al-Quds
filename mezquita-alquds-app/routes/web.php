<?php

use Illuminate\Support\Facades\Route;

Route::view('/', 'public.home');
Route::view('/contacto', 'public.contacto');
Route::view('/noticias', 'public.noticias');
Route::view('/horarios', 'public.horarios');
Route::view('/ubicacion', 'public.ubicacion');

Route::get('/lang/{lang}', function ($lang) {
    session(['locale' => $lang]);
    return back();
})->name('lang.switch');
