import React from 'react';
import { Link } from '@inertiajs/react';
import { useTranslation } from '../hooks/useTranslation';

export default function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="bg-[#0F5132] text-white pt-16 pb-10 mt-20 border-t border-[#C9A227]/30 fade">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">

                {/* LOGO + IDENTIDAD */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
                    <img src="/img/mezquitaAlquds_logo3.png" className="h-20 brightness-0 invert" alt="Logo" />
                    <div>
                        <p className="text-lg font-semibold tracking-wide">{t('footer', 'title')}</p>
                        <p className="text-sm text-[#C9A227]">{t('footer', 'subtitle')}</p>
                    </div>
                    <p className="text-sm text-white/80 max-w-xs">{t('footer', 'description')}</p>
                </div>

                {/* ENLACES */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3">
                    <p className="text-lg font-semibold mb-2">{t('footer', 'links_title')}</p>
                    <Link href="/"          className="text-white/80 hover:text-[#C9A227] transition">{t('navbar', 'home')}</Link>
                    <Link href="/horarios"  className="text-white/80 hover:text-[#C9A227] transition">{t('navbar', 'prayers')}</Link>
                    <Link href="/ubicacion" className="text-white/80 hover:text-[#C9A227] transition">{t('navbar', 'location')}</Link>
                    <Link href="/contacto"  className="text-white/80 hover:text-[#C9A227] transition">{t('navbar', 'contact')}</Link>
                </div>

                {/* CONTACTO */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3">
                    <p className="text-lg font-semibold mb-2">{t('footer', 'contact_title')}</p>
                    <p className="text-white/80 text-sm">{t('footer', 'address')}</p>
                    <p className="text-white/80 text-sm">{t('footer', 'email')}</p>
                    <a href="https://maps.google.com"
                       className="inline-block mt-3 bg-[#C9A227] text-[#0F5132] px-6 py-2 rounded-full font-semibold shadow-md hover:bg-[#b8921f] transition">
                        {t('footer', 'google_maps')}
                    </a>
                </div>
            </div>

            <div className="mt-16 border-t border-white/10 pt-6 text-center text-white/60 text-sm">
                © {new Date().getFullYear()} Mezquita Al‑Quds — {t('footer', 'rights')}
            </div>
        </footer>
    );
}