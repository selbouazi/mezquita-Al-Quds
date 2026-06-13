<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class ClaseRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'titulo' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'horarios' => 'nullable|string|max:255',
            'nivel' => 'nullable|string|max:100',
            'profesor' => 'nullable|string|max:255',
            'requisitos' => 'nullable|string',
            'activo' => 'boolean',
        ];
    }
}
