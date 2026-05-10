import { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { useTranslation } from '../hooks/useTranslation';

const IQAMA_WINDOW = 30;

export default function PrayerHeader({ prayerTimes }) {
    const { t } = useTranslation();
    const { tiemposEspera } = usePage().props;

    const [display, setDisplay] = useState({
        title: '',
        waiting: ''
    });

    function toMinutes(str) {
        const [h, m] = str.split(':').map(Number);
        return h * 60 + m;
    }

    function getWaitingTime(prayerName) {
        return Number(tiemposEspera?.[prayerName?.toLowerCase()]) || 10;
    }

    useEffect(() => {
        function update() {
            const now = new Date();
            const nowMin = now.getHours() * 60 + now.getMinutes();
            const nowSec = now.getSeconds();

            const entries = Object.entries(prayerTimes);

            let nextName = null, nextTime = null;
            let lastName = null, lastTime = null;

            for (const [name, time] of entries) {
                const tMin = toMinutes(time);

                if (tMin <= nowMin) {
                    if (lastTime === null || tMin > lastTime) {
                        lastName = name;
                        lastTime = tMin;
                    }
                }

                if (tMin > nowMin) {
                    if (nextTime === null || tMin < nextTime) {
                        nextName = name;
                        nextTime = tMin;
                    }
                }
            }

            if (!nextName) {
                nextName = entries[0][0];
                nextTime = toMinutes(entries[0][1]) + 1440;
            }

            if (!lastName) {
                lastName = entries[entries.length - 1][0];
                lastTime = toMinutes(entries[entries.length - 1][1]) - 1440;
            }

            const lastWaiting = getWaitingTime(lastName);
            const nextWaiting = getWaitingTime(nextName);

            const diffFuture = nextTime * 60 - (nowMin * 60 + nowSec);
            const diffPast = (nowMin * 60 + nowSec) - (lastTime * 60);

            const ago = t('time', 'ago');
            const inWord = t('time', 'in');
            const wait = t('time', 'wait');
            const mins = t('time', 'mins');
            const remaining = t('time', 'remaining');
            const iqama = t('time', 'iqama');

            if (diffPast < lastWaiting * 60) {
                const m = Math.floor(diffPast / 60);
                const s = diffPast % 60;

                setDisplay({
                    title: locale === 'en'
                        ? `${lastName} · ${m}:${String(s).padStart(2,'0')} ${mins} ${ago}`
                        : `${lastName} · ${ago} ${m}:${String(s).padStart(2,'0')} ${mins}`,
                    waiting: `${wait} ${remaining}: ${lastWaiting - m} ${mins}`,
                });
                return;
            }

            if (diffPast < (lastWaiting + IQAMA_WINDOW) * 60) {
                const m = Math.floor(diffPast / 60);
                const s = diffPast % 60;

                const iqamaM = m - lastWaiting;

                setDisplay({
                    title: locale === 'en'
                        ? `${lastName} · ${m} ${mins} ${ago}`
                        : `${lastName} · ${ago} ${m} ${mins}`,
                    waiting: locale === 'en'
                        ? `${iqama} · ${iqamaM}:${String(s).padStart(2,'0')} ${mins} ${ago}`
                        : `${iqama} · ${ago} ${iqamaM}:${String(s).padStart(2,'0')} ${mins}`,
                });
                return;
            }

            const h = Math.floor(diffFuture / 3600);
            const m = Math.floor((diffFuture % 3600) / 60);
            const s = diffFuture % 60;

            setDisplay({
                title: `${nextName} ${inWord} ${h}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`,
                waiting: `${wait}: ${nextWaiting} ${mins}`,
            });
        }

        update();
        const interval = setInterval(update, 1000);
        return () => clearInterval(interval);
    }, [tiemposEspera, prayerTimes]);

    return (
        <section className="flex justify-center mt-0 fade">
            <div className="bg-white border border-[#C9A227]/40 shadow-xl rounded-3xl p-8 w-full max-w-md text-center hover:shadow-2xl transition">
                <div className="text-4xl font-semibold text-[#0F5132] tracking-tight mb-3 drop-shadow-sm">
                    {display.title}
                </div>
                <div className="inline-block px-7 py-3 bg-white border border-[#E5C76B] rounded-xl text-[#8A6D00] font-semibold text-base shadow-[0_2px_8px_rgba(0,0,0,0.08)] tracking-wide">
                    {display.waiting}
                </div>
            </div>
        </section>
    );
}