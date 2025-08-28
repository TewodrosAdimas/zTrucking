// src/i18n/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import am from './am.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      am: { translation: am },
    },
    lng: 'en',       // default language
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
