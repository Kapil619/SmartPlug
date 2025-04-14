import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import mr from "./mr.json";
import en from "./en.json";

// Initialize i18n
i18n.use(initReactI18next).init({
  compatibilityJSON: "v3", // Required for React Native
  resources: {
    en: { translation: en },
    mr: { translation: mr },
  },
  lng: "en", // Default language
  fallbackLng: "en", // Fallback language
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

export default i18n;