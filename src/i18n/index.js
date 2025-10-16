import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import ChainedBackend from "i18next-chained-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import logError from "../utils/logError";

i18n
  .use(ChainedBackend) // Use ChainedBackend for multiple backends
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    lng: "en",
    debug: false,
    supportedLngs: [
      "ar",
      "en",
      "es",
      "fr",
      "hi",
      "pt",
      "qu",
      "ru",
      "ur",
      "kh",
      "mn",
      "it",
      "km",
      "ay",
      "ca",
    ],
    nonExplicitSupportedLngs: false,
    interpolation: {
      escapeValue: false,
    },
    ns: ["global", "contact", "common"],
    defaultNS: "global",
    fallbackNS: "global",
    detection: {
      order: ["path", "navigator", "localStorage", "htmlTag"],
      lookupLocalStorage: "i18nextLng",
      lookupFromPathIndex: 0,
      lookupFromSubdomainIndex: 0,
      checkWhitelist: true,
      // caches: ["localStorage"],
      convertDetectedLanguage: (lng) => lng.toLowerCase(),
    },
    backend: {
      backends: [
        // LocalStorageBackend,
        HttpBackend,
      ],
      backendOptions: [
        {
          expirationTime: 24 * 7 * 60 * 60 * 1000,
        },
        {
          loadPath: `/locales/{{lng}}/{{ns}}.json`,
        },
      ],
      defaultNS: "global", // Set the default namespace
      parse: function (data) {
        try {
          return JSON.parse(data);
        } catch (error) {
          logError("Error parsing translation file:", error);
          return {}; // Return an empty object as a fallback
        }
      },
    },
    react: {
      useSuspense: true,
    },
  });

export default i18n;
