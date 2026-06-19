<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class ComentarioRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'noticia_id' => 'required|exists:noticias,id',
            'contenido' => 'required|string|min:2|max:2000',
            'nombre' => 'required_if:anonimo,false|string|max:255',
            'anonimo' => 'boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'nombre.required_if' => 'Debes proporcionar un nombre o marcar como anónimo.',
        ];
    }
}
