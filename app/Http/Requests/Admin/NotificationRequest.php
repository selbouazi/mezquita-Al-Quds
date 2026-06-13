<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class NotificationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $rules = [
            'titulo' => 'nullable|string|max:255',
            'mensaje' => 'required|string',
            'prioridad' => 'nullable|in:muy_alta,alta,normal,baja',
            'activa' => 'nullable|boolean',
            'fecha_publicacion' => 'nullable|date',
            'fecha_expiracion' => 'nullable|date',
        ];

        if ($this->isMethod('POST')) {
            $rules['fecha_expiracion'] = 'nullable|date|after:fecha_publicacion';
        }

        return $rules;
    }
}
