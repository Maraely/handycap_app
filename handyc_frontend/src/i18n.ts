import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import commonEN from '../public/locales/en/common.json';
import commonIT from '../public/locales/it/common.json';

const resources = {
    en: { common: commonEN },
    it: { common: commonIT },
};

if (!i18n.isInitialized) {
    i18n
        .use(initReactI18next)
        .init({
            resources,
            fallbackLng: 'en',
            supportedLngs: ['en', 'it'],
            ns: ['common'],
            defaultNS: 'common',
            interpolation: {
                escapeValue: false,
            },
            react: {
                useSuspense: false,
            },
        });
}

export default i18n;
