import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

const customBackend = {
  loadPath: function (lng, ns) {
    const pagesPrefix = 'pages/';
    const pagesFolder = ns.indexOf(pagesPrefix) === 0 ? 'pages/' : '';

    return `/locales/${lng}/${pagesFolder}${ns}.json`;
  },
};

const otherMethods = ['cookie', 'localStorage'];

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['path', ...otherMethods],
      lookupFromPathIndex: 0,
      checkWhitelist: true
    },
    suspense: false,
    backend: customBackend,
    ns: ['home', 'about', 'pages/multilingualism', "pages/pagesLinks", 'notFound', 'header', 'footer'], // Specify the namespaces
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
