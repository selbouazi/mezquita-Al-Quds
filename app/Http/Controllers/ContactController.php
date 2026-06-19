<?php

namespace App\Http\Controllers;

use Inertia\Response;

class ContactController extends Controller
{
    public function create(): Response
    {
        if (!\moduleIsActive('contacto')) {
            return inertia('ModuleDisabled');
        }
        return inertia('Contacto');
    }
}
