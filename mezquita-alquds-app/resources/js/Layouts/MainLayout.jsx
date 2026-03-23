import { useEffect } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { useTranslation } from '../hooks/useTranslation';

export default function MainLayout({ title, children }) {
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

    return (
        <>
            <Head title={title ?? 'Mezquita Al‑Quds'} />
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
                <main className="pt-24">
                    {children}
                </main>
                <Footer />
            </div>
        </>
    );
}