<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UbicacionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'direccion' => 'required|string|max:500',
            'latitud' => 'nullable|string|max:50',
            'longitud' => 'nullable|string|max:50',
            'telefono' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:255',
            'whatsapp' => 'nullable|string|max:50',
        ];
    }
}
