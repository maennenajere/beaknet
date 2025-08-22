import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './locales/en/translation.json';
import fiTranslation from './locales/fi/translation.json';
import svTranslation from './locales/sv/traslation.json';


i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      fi: { translation: fiTranslation },
      sv: { translation: svTranslation }
    },
    lng: 'fi',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;