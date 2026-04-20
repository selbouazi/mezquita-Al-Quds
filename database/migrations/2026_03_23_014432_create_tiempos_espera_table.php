<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tiempos_espera', function (Blueprint $table) {
            $table->id();
            $table->string('rezo'); // fajr, sunrise, dhuhr, asr, maghrib, isha
            $table->unsignedTinyInteger('minutos');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tiempos_espera');
    }
};