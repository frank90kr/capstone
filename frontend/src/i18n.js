// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(HttpApi) // Carica le traduzioni usando HTTP
  .use(LanguageDetector) // Rileva la lingua dell'utente
  .use(initReactI18next) // Passa l'istanza di i18n a react-i18next
  .init({
    supportedLngs: ["it", "en"], // Lingue supportate
    fallbackLng: "it", // Lingua di fallback
    detection: {
      order: ["path", "cookie", "localStorage", "navigator", "htmlTag", "querystring"],
      caches: ["cookie"],
    },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json", // Percorso ai file di traduzione
    },
    react: {
      useSuspense: false, // Imposta a false se non usi Suspense
    },
  });

export default i18n;
