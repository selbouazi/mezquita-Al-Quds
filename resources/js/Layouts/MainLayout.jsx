import { useEffect } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { useTranslation } from '../hooks/useTranslation';

const SITE_NAME = 'Mezquita Al‑Quds';
const DEFAULT_DESC = 'Un espacio de espiritualidad, comunidad y conocimiento para todos. Mezquita Al‑Quds, El Vendrell, Tarragona.';
const DEFAULT_IMAGE = '/img/og-image.jpg';
const BASE_URL = 'https://mezquita-alquds.cat';

export default function MainLayout({ title, description, image, ogType, jsonLd, canonical, noindex, children }) {
    const { locale, isRTL } = useTranslation();

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('show');
            });
        }, { threshold: 0.15 });

        document.querySelectorAll('.fade').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const pageTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    const pageDesc = description || DEFAULT_DESC;
    const pageImage = image || DEFAULT_IMAGE;
    const pageUrl = canonical ? `${BASE_URL}${canonical}` : BASE_URL;
    const ogTypeValue = ogType || 'website';

    const organizationJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: SITE_NAME,
        url: BASE_URL,
        logo: `${BASE_URL}/img/mezquitaAlquds_logo2.png`,
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'El Vendrell',
            addressRegion: 'Tarragona',
            addressCountry: 'ES',
        },
    };

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDesc} />
                <link rel="canonical" href={pageUrl} />
                {noindex && <meta name="robots" content="noindex, nofollow" />}

                <meta property="og:type" content={ogTypeValue} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDesc} />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:image" content={`${BASE_URL}${pageImage}`} />
                <meta property="og:site_name" content={SITE_NAME} />
                <meta property="og:locale" content={locale === 'ca' ? 'ca_ES' : locale === 'en' ? 'en_US' : locale === 'ar' ? 'ar_SA' : 'es_ES'} />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={pageDesc} />
                <meta name="twitter:image" content={`${BASE_URL}${pageImage}`} />

                <script type="application/ld+json">
                    {JSON.stringify(jsonLd || organizationJsonLd)}
                </script>
            </Head>
            <div
                lang={locale}
                dir={isRTL ? 'rtl' : 'ltr'}
                style={{
                    fontFamily: isRTL ? "'Cairo', sans-serif" : "'Inter', sans-serif",
                    background: '#faf7e8',
                    color: '#1a1a1a',
                }}
            >
                <Navbar />
                <main id="main-content" className="pt-24">
                    {children}
                </main>
                <Footer />
            </div>
        </>
    );
}