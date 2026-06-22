<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reservas', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('email');
            $table->string('telefono', 20)->nullable();
            $table->date('fecha');
            $table->time('hora')->nullable();
            $table->string('tipo', 50)->default('visita')->comment('visita, clase, evento');
            $table->text('notas')->nullable();
            $table->string('estado', 20)->default('pendiente')->comment('pendiente, confirmada, cancelada');
            $table->boolean('asistio')->default(false);
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reservas');
    }
};
