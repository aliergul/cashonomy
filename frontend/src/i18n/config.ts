import { initReactI18next } from "react-i18next";
import i18next from "i18next";
import en from "./en.json";
import tr from "./tr.json";

i18next.use(initReactI18next).init({
  lng: localStorage.getItem("lang") || "tr",
  debug: true,
  resources: {
    en,
    tr,
  },
});
