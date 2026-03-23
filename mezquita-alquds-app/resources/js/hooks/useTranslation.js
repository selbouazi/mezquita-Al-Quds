import { usePage } from '@inertiajs/react';
import es from '../lang/es';
import ca from '../lang/ca';
import ar from '../lang/ar';

const langs = { es, ca, ar };

export function useTranslation() {
    const { locale = 'es' } = usePage().props;
    const dict = langs[locale] ?? langs['es'];

    function t(section, key) {
        return dict[section]?.[key] ?? `${section}.${key}`;
    }

    return { t, locale, isRTL: locale === 'ar' };
}