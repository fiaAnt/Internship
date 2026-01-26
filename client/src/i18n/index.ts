import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ru from './locales/ru.json';
import eng from './locales/eng.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            ru: { translation: ru },
            eng: { translation: eng },
        },
        lng: 'eng',
        fallbackLng: 'ru',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
