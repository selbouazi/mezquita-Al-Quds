import { useTranslation } from '../hooks/useTranslation';

function getMapsUrl(lat, lng) {
    const ua = navigator.userAgent;
    const isIOS = /iPhone|iPad|iPod/.test(ua);
    const isAndroid = /Android/.test(ua);

    const webUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

    if (isIOS) {
        return { url: `maps://maps.google.com/maps?daddr=${lat},${lng}`, fallback: webUrl };
    }

    if (isAndroid) {
        return { url: `geo:${lat},${lng}?q=${lat},${lng}`, fallback: webUrl };
    }

    return { url: webUrl, fallback: null };
}

export default function MapButton({ lat, lng, className, children }) {
    const { t } = useTranslation();
    const { url, fallback } = getMapsUrl(lat, lng);

    const handleClick = (e) => {
        const win = window.open(url, '_blank');
        if (!win || win.closed || typeof win.closed === 'undefined') {
            if (fallback) {
                window.open(fallback, '_blank');
            }
        }
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            className={className || "inline-block bg-[#0F5132] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#0c3f27] hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"}
        >
            {children || t('ubicacion', 'btn')}
        </button>
    );
}
