import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Translations
import { translationsFRA } from "./translations/translationsFRA";
import { translationsEN } from "./translations/translationsEN";
import { translationsSPA } from "./translations/translationsSPA";

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      fra: { translation: translationsFRA },
      en: { translation: translationsEN },
      spa: { translation: translationsSPA },
    },
  });

export { i18n };
