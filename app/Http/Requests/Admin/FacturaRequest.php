<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class FacturaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $rules = [
            'titulo' => 'required|string|max:255',
            'fecha' => 'required|date',
            'archivo_pdf' => 'nullable|file|mimes:pdf|max:10240',
            'notas' => 'nullable|string',
        ];

        if ($this->isMethod('POST') && $this->route()->getActionMethod() === 'store') {
            $rules['archivo_pdf'] = 'required|file|mimes:pdf|max:10240';
        }

        return $rules;
    }
}
