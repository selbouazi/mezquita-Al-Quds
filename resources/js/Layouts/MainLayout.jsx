import { useEffect } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { useTranslation } from '../hooks/useTranslation';

export default function MainLayout({ title, meta: pageMeta, description: directDesc, noindex, image, canonical: directCanonical, hideFooter, simpleNav, children }) {
    const { t, locale, isRTL } = useTranslation();

    const metaTitle = pageMeta?.title || title || t('meta.home.title');
    const metaDescription = pageMeta?.description || directDesc || t('meta', 'description');
    const canonical = (pageMeta?.canonical || directCanonical || window.location.pathname).replace(/\/+$/, '') || '/';
    const metaImage = image || '/img/mezquitaAlquds_logo.png';

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('show');
            });
        }, { threshold: 0.15 });

        document.querySelectorAll('.fade').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <Head title={metaTitle}>
                <meta name="description" content={metaDescription} />
                <link rel="canonical" href={canonical} />
                {noindex && <meta name="robots" content="noindex, nofollow" />}
                <meta property="og:title" content={metaTitle} />
                <meta property="og:description" content={metaDescription} />
                <meta property="og:url" content={canonical} />
                <meta property="og:image" content={metaImage} />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content={locale === 'ar' ? 'ar_ES' : locale === 'ca' ? 'ca_ES' : locale === 'en' ? 'en_GB' : 'es_ES'} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={metaTitle} />
                <meta name="twitter:description" content={metaDescription} />
                <meta name="twitter:image" content={metaImage} />
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
                <Navbar simple={simpleNav} />
                <main className="pt-24">
                    {children}
                </main>
                {!hideFooter && <Footer />}
            </div>
        </>
    );
}