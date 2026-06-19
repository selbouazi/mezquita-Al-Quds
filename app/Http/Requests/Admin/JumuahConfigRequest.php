<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class JumuahConfigRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date|after_or_equal:fecha_inicio',
            'hora_jumuah' => 'required|date_format:H:i',
            'khutbah_minutos' => 'required|integer|min:1|max:60',
            'activo' => 'nullable|boolean',
        ];
    }
}
