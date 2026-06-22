import { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { useTranslation } from '../hooks/useTranslation';

export default function MainLayout({ title, meta: pageMeta, description: directDesc, noindex, image, canonical: directCanonical, hideFooter, simpleNav, children }) {
    const { t, locale, isRTL } = useTranslation();
    const [loaded, setLoaded] = useState(false);

    const metaTitle = pageMeta?.title || title || t('meta.home.title');
    const metaDescription = pageMeta?.description || directDesc || t('meta', 'description');
    const canonical = (pageMeta?.canonical || directCanonical || window.location.pathname).replace(/\/+$/, '') || '/';
    const metaImage = image || '/img/mezquitaAlquds_logo.png';

    useEffect(() => {
        const stored = localStorage.getItem('theme');
        if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        }
        setLoaded(true);
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
                {/* Fixed geometric background pattern */}
                <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
                    <svg className="w-full h-full opacity-[0.015]" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <pattern id="globalBg" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                                <polygon points="40,3 77,40 40,77 3,40" fill="none" stroke="#0F3B2E" strokeWidth="0.5" />
                                <polygon points="40,15 65,40 40,65 15,40" fill="none" stroke="#C9A646" strokeWidth="0.3" opacity="0.5" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#globalBg)" />
                    </svg>
                </div>

                <Navbar simple={simpleNav} />
                <div aria-live="polite" aria-atomic="true" className="sr-only" id="announcements" />
                <main className={`pt-24 relative z-10 ${loaded ? 'animate-page-enter' : 'opacity-0'}`}>
                    {children}
                </main>
                {!hideFooter && <Footer />}
            </div>
        </>
    );
}