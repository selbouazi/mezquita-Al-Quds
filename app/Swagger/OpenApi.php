<?php

namespace App\Swagger;

use OpenApi\Attributes as OA;

#[OA\Info(
    title: 'Mezquita Al-Quds API',
    version: '1.0.0',
    description: 'API pública y administrativa de la Mezquita Al-Quds. Horarios de oración, noticias, eventos y donativos.',
    contact: new OA\Contact(email: 'info@mezquita-alquds.cat')
)]
#[OA\Server(
    url: 'https://mezquita-alquds.cat/api/v1',
    description: 'API Server'
)]
#[OA\SecurityScheme(
    securityScheme: 'bearerAuth',
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    description: 'Enter Bearer token'
)]
class OpenApi
{
}
