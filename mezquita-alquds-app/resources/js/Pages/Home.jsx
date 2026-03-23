import { Link } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import PrayerHeader from '../Components/PrayerHeader';
import PrayerClock from '../Components/PrayerClock';
import { useTranslation } from '../hooks/useTranslation';

export default function Home({ prayerTimes }) {
    const { t } = useTranslation();

    return (
        <MainLayout title={t('navbar', 'home')}>

            {/* HERO */}
            <section className="relative pt-24 pb-20 fade bg-white/70 backdrop-blur-sm shadow-sm rounded-b-3xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#C9A22715,_transparent_70%)]" />
                <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
                    <div>
                        <h1 className="text-5xl font-bold text-[#0F5132] leading-tight mb-4">
                            {t('home', 'hero_title_1')}{' '}
                            <span className="text-[#C9A227]">{t('home', 'hero_title_2')}</span><br />
                            {t('home', 'hero_title_3')}
                        </h1>
                        <p className="text-gray-600 text-lg mb-10">{t('home', 'hero_subtitle')}</p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/horarios"
                                  className="bg-[#0F5132] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#0c3f27] hover:-translate-y-1 hover:shadow-lg transition">
                                {t('home', 'btn_prayer_times')}
                            </Link>
                            <Link href="/contacto"
                                  className="border border-[#C9A227] text-[#C9A227] px-8 py-3 rounded-full font-semibold hover:bg-[#C9A227]/10 hover:-translate-y-1 transition">
                                {t('home', 'btn_contact')}
                            </Link>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="bg-white border border-[#C9A227]/40 shadow-xl rounded-3xl p-10 w-full max-w-sm text-center hover:shadow-2xl hover:-translate-y-1 transition">
                            <img src="/img/mezquitaAlquds_logo.png" className="h-32 mx-auto mb-4" alt="Logo" />
                            <p className="text-2xl text-[#0F5132] font-semibold mb-1">مسجد القدس</p>
                            <p className="text-xs text-gray-500">{t('home', 'card_subtitle')}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* PRÓXIMO REZO */}
            <PrayerHeader prayerTimes={prayerTimes} />

            {/* RELOJ */}
            <section className="relative pt-20 pb-28 bg-gradient-to-b from-[#F8F8F8] to-[#ECECEC] fade">
                <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
                    <div className="p-10 rounded-3xl bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-[#C9A227]/20 hover:shadow-[0_15px_50px_rgba(0,0,0,0.12)] transition">
                        <PrayerClock prayerTimes={prayerTimes} />
                    </div>
                </div>
            </section>

            {/* INFO */}
            <section className="py-20 bg-[#F8F8F8] fade">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
                    {[
                        { title: t('home','info_community_title'),  text: t('home','info_community_text') },
                        { title: t('home','info_activities_title'), text: t('home','info_activities_text') },
                        { title: t('home','info_visit_title'),      text: t('home','info_visit_text') },
                    ].map(({ title, text }) => (
                        <div key={title} className="p-8 bg-white rounded-3xl shadow-md border border-[#C9A227]/20 hover:-translate-y-1 hover:shadow-xl transition">
                            <h3 className="text-xl font-semibold text-[#0F5132] mb-3">{title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-[#0F5132] text-white text-center fade">
                <h2 className="text-3xl font-bold mb-4">{t('home', 'cta_title')}</h2>
                <p className="text-white/80 mb-8">{t('home', 'cta_subtitle')}</p>
                <Link href="/contacto"
                      className="inline-block bg-[#C9A227] text-[#0F5132] px-10 py-3 rounded-full font-semibold hover:bg-[#b8921f] hover:-translate-y-1 hover:shadow-xl transition">
                    {t('home', 'cta_button')}
                </Link>
            </section>

        </MainLayout>
    );
}