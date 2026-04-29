<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Por ahora solo renderiza un componente básico
        return Inertia::render('Admin/Dashboard');
    }
}