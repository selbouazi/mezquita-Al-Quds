import MainLayout from '../Layouts/MainLayout';
import PrayerClock from '../Components/PrayerClock';
import { useTranslation } from '../hooks/useTranslation';

export default function Horarios({ prayerTimes }) {
    const { t } = useTranslation();

    return (
        <MainLayout title={t('navbar', 'prayers')}>
            <section className="pt-28 pb-16 max-w-7xl mx-auto px-6 flex flex-col items-center">
                <h1 className="text-3xl font-bold text-[#0F5132] mb-10">{t('navbar', 'prayers')}</h1>
                <div className="p-10 rounded-3xl bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-[#C9A227]/20 hover:shadow-[0_15px_50px_rgba(0,0,0,0.12)] transition">
                    <PrayerClock prayerTimes={prayerTimes} />
                </div>
            </section>
        </MainLayout>
    );
}