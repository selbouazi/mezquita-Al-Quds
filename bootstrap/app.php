<?php

use App\Http\Middleware\AdminMiddleware;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\RedirectIfAuthenticated;
use App\Http\Middleware\SecurityHeaders;
use App\Http\Middleware\SetLocale;
use App\Providers\FortifyServiceProvider;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Inertia\Inertia;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\HttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withProviders([
        FortifyServiceProvider::class,
    ])
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            SecurityHeaders::class,
            SetLocale::class,
            HandleInertiaRequests::class,
        ]);
        $middleware->alias([
            'guest' => RedirectIfAuthenticated::class,
            'admin' => AdminMiddleware::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->render(function (NotFoundHttpException $e) {
            return Inertia::render('Errors/404')->toResponse(request())->setStatusCode(404);
        });

        $exceptions->render(function (AccessDeniedHttpException $e) {
            return Inertia::render('Errors/403')->toResponse(request())->setStatusCode(403);
        });

        $exceptions->render(function (HttpException $e) {
            $status = $e->getStatusCode();
            if (in_array($status, [500, 503])) {
                return Inertia::render("Errors/{$status}")->toResponse(request())->setStatusCode($status);
            }
            if ($status === 403) {
                return Inertia::render('Errors/403')->toResponse(request())->setStatusCode(403);
            }
            if ($status === 404) {
                return Inertia::render('Errors/404')->toResponse(request())->setStatusCode(404);
            }
        });
    })->create();
