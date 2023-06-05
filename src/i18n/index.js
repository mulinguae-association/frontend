import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';


i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    ns: ['home', 'about'], // Specify the namespaces
    defaultNS: 'home', // Set the default namespace
    parse: function (data) {
      try {
        return JSON.parse(data);
      } catch (error) {
        console.error('Error parsing translation file:', error);
        return {}; // Return an empty object as a fallback
      }
    },
  });

export default i18n;
