<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;

class SitemapController extends Controller
{
    /**
     * Genera el sitemap XML del sitio.
     *
     * @return Response
     */
    public function index(): Response
    {
        $pages = [
            ['loc' => '/', 'changefreq' => 'daily', 'priority' => '1.0'],
            ['loc' => '/horarios', 'changefreq' => 'daily', 'priority' => '0.9'],
            ['loc' => '/noticias', 'changefreq' => 'weekly', 'priority' => '0.8'],
            ['loc' => '/imam', 'changefreq' => 'monthly', 'priority' => '0.7'],
            ['loc' => '/ubicacion', 'changefreq' => 'yearly', 'priority' => '0.6'],
            ['loc' => '/contacto', 'changefreq' => 'yearly', 'priority' => '0.6'],
        ];

        $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

        foreach ($pages as $page) {
            $xml .= "  <url>\n";
            $xml .= "    <loc>" . url($page['loc']) . "</loc>\n";
            $xml .= "    <changefreq>{$page['changefreq']}</changefreq>\n";
            $xml .= "    <priority>{$page['priority']}</priority>\n";
            $xml .= "  </url>\n";
        }

        $xml .= '</urlset>';

        return response($xml, 200, ['Content-Type' => 'application/xml']);
    }
}
