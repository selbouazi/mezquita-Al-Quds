<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('horarios_modificados', function (Blueprint $table) {
            $table->id();
            $table->date('fecha');
            $table->string('rezo'); // fajr, sunrise, dhuhr, asr, maghrib, isha
            $table->time('hora');
            $table->timestamps();

            $table->unique(['fecha', 'rezo']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('horarios_modificados');
    }
};