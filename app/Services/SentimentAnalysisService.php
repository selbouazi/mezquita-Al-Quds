<?php

namespace App\Services;

class SentimentAnalysisService
{
    private array $urgentKeywords = [
        'urge', 'urgente', 'emergencia', 'grave', 'crítico', ' crítica',
        'urgent', 'emergency', 'critical', 'important',
        'طارئ', 'عاجل', 'خطير', 'مهم',
    ];

    private array $positiveKeywords = [
        'gracias', 'agradezco', 'excelente', 'buen', 'bien', 'mejor',
        'thanks', 'thank you', 'great', 'excellent', 'good', 'wonderful',
        'شكرا', 'جزاك الله', 'أحسن', 'ممتاز',
    ];

    private array $negativeKeywords = [
        'mal', 'peor', 'queja', 'problema', 'error', 'fallo', 'malo',
        'bad', 'worst', 'complaint', 'problem', 'error', 'failure',
        'سيء', 'مشكلة', 'خطأ', 'شكوى',
    ];

    public function analyze(string $text): array
    {
        $lower = mb_strtolower($text);

        $urgent = $this->countMatches($lower, $this->urgentKeywords);
        $positive = $this->countMatches($lower, $this->positiveKeywords);
        $negative = $this->countMatches($lower, $this->negativeKeywords);

        if ($urgent > 0) {
            $priority = 'muy_alta';
        } elseif ($negative > $positive) {
            $priority = 'alta';
        } elseif ($positive > $negative) {
            $priority = 'normal';
        } else {
            $priority = 'baja';
        }

        $sentimiento = match (true) {
            $urgent > 0 => 'urgente',
            $positive > $negative => 'positivo',
            $negative > $positive => 'negativo',
            default => 'neutral',
        };

        return [
            'priority' => $priority,
            'sentimiento' => $sentimiento,
            'score' => $positive - $negative,
        ];
    }

    private function countMatches(string $text, array $keywords): int
    {
        $count = 0;
        foreach ($keywords as $kw) {
            $count += substr_count($text, $kw);
        }
        return $count;
    }
}
