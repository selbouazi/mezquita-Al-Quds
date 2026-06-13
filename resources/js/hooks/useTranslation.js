import { usePage } from '@inertiajs/react';
import es from '../lang/es';
import ca from '../lang/ca';
import ar from '../lang/ar';
import en from '../lang/en';

const langs = { es, ca, ar, en };

export function useTranslation() {
    const { locale = 'es' } = usePage().props;
    const dict = langs[locale] ?? langs['es'];

    function t(section, key) {
        const resolve = (obj, path) => path.split('.').reduce((acc, part) => acc?.[part], obj);
        return key
            ? resolve(dict[section], key) ?? `${section}.${key}`
            : resolve(dict, section) ?? section;
    }

    return { t, locale, isRTL: locale === 'ar' };
}
