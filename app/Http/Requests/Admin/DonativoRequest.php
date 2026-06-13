<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class DonativoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nombre_arabe' => 'nullable|string|max:255',
            'nombre' => 'required|string|max:255',
            'cantidad' => 'required|numeric|min:0',
            'pagado' => 'boolean',
            'año' => 'required|integer|min:2000|max:2100',
            'notas' => 'nullable|string',
        ];
    }
}
