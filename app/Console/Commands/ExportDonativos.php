<?php

namespace App\Console\Commands;

use App\Models\Donativo;
use Illuminate\Console\Command;

class ExportDonativos extends Command
{
    protected $signature = 'export:donativos {--year= : Filtrar por año}';
    protected $description = 'Exportar donativos a Google Sheets';

    public function handle(): int
    {
        $year = $this->option('year') ?? now()->year;

        $donativos = Donativo::where('año', $year)->where('pagado', true)->get();

        if ($donativos->isEmpty()) {
            $this->warn("No hay donativos para el año {$year}");
            return 0;
        }

        $this->info("Exportando {$donativos->count()} donativos del año {$year}...");

        // TODO: Implement Google Sheets API call
        // 1. Create service account in Google Cloud Console
        // 2. Share Google Sheet with service account email
        // 3. Store credentials JSON in storage/app/google-credentials.json
        // 4. Use Google\Client to authenticate and append rows
        //
        // Example:
        // $client = new \Google\Client();
        // $client->setAuthConfig(storage_path('app/google-credentials.json'));
        // $client->addScope(\Google\Service\Sheets::SPREADSHEETS);
        // $service = new \Google\Service\Sheets($client);
        // $range = 'Donativos!A:D';
        // $values = $donativos->map(fn($d) => [$d->created_at, $d->nombre, $d->cantidad, $d->email_donante])->toArray();
        // $body = new \Google\Service\Sheets\ValueRange(['values' => $values]);
        // $service->spreadsheets_values->append(config('services.google.sheet_id'), $range, $body, ['valueInputOption' => 'RAW']);

        $this->warn('Google Sheets integration not configured. Set GOOGLE_APPLICATION_CREDENTIALS and SHEET_ID in .env');

        return 0;
    }
}
