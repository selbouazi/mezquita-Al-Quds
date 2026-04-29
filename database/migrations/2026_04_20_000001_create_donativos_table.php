<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('donativos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre_arabe')->nullable();
            $table->string('nombre');
            $table->decimal('cantidad', 10, 2);
            $table->boolean('pagado')->default(false);
            $table->integer('año');
            $table->text('notas')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('donativos');
    }
};
