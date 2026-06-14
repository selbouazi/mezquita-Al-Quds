<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class NormaRequest extends FormRequest
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
            'imagen' => 'nullable|image|mimes:jpg,jpeg,png,gif,webp|max:2048',
            'remove_imagen' => 'nullable|boolean',
            'activo' => 'boolean',
            'orden' => 'integer|min:0',
        ];
    }
}
