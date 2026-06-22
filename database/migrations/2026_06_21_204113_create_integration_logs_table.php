<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('integration_logs', function (Blueprint $table) {
            $table->id();
            $table->string('service', 100);
            $table->string('event', 100);
            $table->longText('request_body')->nullable();
            $table->longText('response_body')->nullable();
            $table->integer('status_code')->nullable();
            $table->unsignedTinyInteger('retries')->default(0);
            $table->boolean('success')->default(false);
            $table->ipAddress('ip_address')->nullable();
            $table->timestamps();

            $table->index('service');
            $table->index('success');
            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('integration_logs');
    }
};
