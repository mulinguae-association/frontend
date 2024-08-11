import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import logError from "../utils/logError";

const customBackend = {
	loadPath: function (lng, ns) {
		const pagesPrefix = "pages/";
		const pagesFolder = ns.indexOf(pagesPrefix) === 0 ? "pages/" : "";

		return `/locales/${lng}/${pagesFolder}${ns}.json`;
	},
};

i18n
	.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: "en",
		debug: false,
		interpolation: {
			escapeValue: false
		},
		detection: {
			order: ["localstorage", "navigator"],
			lookupFromPathIndex: 0,
			checkWhitelist: true,
			caches: ["localstorage"]
		},
		suspense: false,
		backend: customBackend,
		ns: [
			"home",
			"about",
			"pages/multilingualism",
			"pages/linguicide",
			"pages/pagesLinks",
			"pages/teachers",
			"pages/students",
			"notFound",
			"header",
			"footer",
			"global"
		], // Specify the namespaces
		defaultNS: "home", // Set the default namespace
		parse: function (data) {
			try {
				return JSON.parse(data);
			} catch (error) {
				logError("Error parsing translation file:", error);
				return {}; // Return an empty object as a fallback
			}
		},
	});

export default i18n;
