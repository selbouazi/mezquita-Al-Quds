<?php

namespace App\Services;

use App\Models\IntegrationLog;
use Illuminate\Support\Facades\Request;

class IntegrationLogger
{
    public function log(
        string $service,
        string $event,
        mixed $requestBody = null,
        mixed $responseBody = null,
        ?int $statusCode = null,
        bool $success = false,
        int $retries = 0,
    ): IntegrationLog {
        return IntegrationLog::create([
            'service' => $service,
            'event' => $event,
            'request_body' => $requestBody ? (is_string($requestBody) ? $requestBody : json_encode($requestBody)) : null,
            'response_body' => $responseBody ? (is_string($responseBody) ? $responseBody : json_encode($responseBody)) : null,
            'status_code' => $statusCode,
            'retries' => $retries,
            'success' => $success,
            'ip_address' => Request::ip(),
        ]);
    }

    public function success(
        string $service,
        string $event,
        mixed $requestBody = null,
        mixed $responseBody = null,
        ?int $statusCode = null,
    ): IntegrationLog {
        return $this->log($service, $event, $requestBody, $responseBody, $statusCode, true);
    }

    public function failure(
        string $service,
        string $event,
        mixed $requestBody = null,
        mixed $responseBody = null,
        ?int $statusCode = null,
        int $retries = 0,
    ): IntegrationLog {
        return $this->log($service, $event, $requestBody, $responseBody, $statusCode, false, $retries);
    }
}
