import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

// Detect browser language
const getBrowserLang = () => {
  const lang = navigator.language;
  if (lang.startsWith('en')) return 'en';
  if (lang.startsWith('ja')) return 'ja';
  return 'zh'; // Default to Traditional Chinese
};

i18n
  .use(HttpBackend) // Use HTTP backend to load translations
  .use(initReactI18next)
  .init({
    lng: getBrowserLang(),
    fallbackLng: 'zh',
    backend: {
      // Load translations from public/locales directory
      loadPath: '/locales/{{lng}}.json',
    },
    interpolation: {
      escapeValue: false
    },
    // Wait for translations to load before rendering
    react: {
      useSuspense: true
    }
  });

export default i18n;