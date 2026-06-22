<?php

namespace App\Http\Controllers;

use App\Models\IntegrationLog;
use App\Services\IntegrationLogger;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WebhookListenerController extends Controller
{
    public function handle(string $service, Request $request): JsonResponse
    {
        $logger = app(IntegrationLogger::class);

        $payload = $request->all();
        $headers = $request->headers->all();

        $logger->log(
            $service,
            'webhook.received',
            [
                'service' => $service,
                'headers' => $headers,
                'payload' => $payload,
            ],
            null,
            200,
            true,
        );

        return match ($service) {
            'github' => $this->processGithub($payload, $logger),
            default => $this->processGeneric($service, $payload, $logger),
        };
    }

    private function processGithub(array $payload, IntegrationLogger $logger): JsonResponse
    {
        $event = request()->header('X-GitHub-Event', 'push');
        $logger->success('github', "webhook.{$event}", [], null, 200);
        return response()->json(['status' => 'ok']);
    }

    private function processGeneric(string $service, array $payload, IntegrationLogger $logger): JsonResponse
    {
        $logger->success($service, 'webhook.received', [], null, 200);
        return response()->json(['status' => 'logged', 'service' => $service]);
    }
}
