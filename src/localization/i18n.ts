import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import en from "./en.json";
import mr from "./mr.json";

const LANGUAGE_KEY = "appLanguage"; // key for async storage

// Load preferred language from AsyncStorage
async function getStoredLanguage() {
  const storedLang = await AsyncStorage.getItem(LANGUAGE_KEY);
  console.log("Stored language:", storedLang);
  return storedLang || "en";
}

(async () => {
  const initialLang = await getStoredLanguage();
  i18n
    .use(initReactI18next)
    .init({
      resources: { en: { translation: en }, mr: { translation: mr } },
      lng: initialLang,
      fallbackLng: "en",
      interpolation: { escapeValue: false },
    });
})();

export async function setAppLanguage(lang: string) {
  await AsyncStorage.setItem(LANGUAGE_KEY, lang);
  i18n.changeLanguage(lang);
}

export default i18n;