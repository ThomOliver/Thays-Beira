// src/i18n/client.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import commonPt from "../../public/locales/pt/common.json";
import commonEn from "../../public/locales/en/common.json";
import commonEs from "../../public/locales/es/common.json";
import commonCn from "../../public/locales/cn/common.json";

i18n.use(initReactI18next).init({
  fallbackLng: "pt",
  interpolation: { escapeValue: false },
  resources: {
    pt: { common: commonPt },
    en: { common: commonEn },
    es: { common: commonEs },
    cn: { common: commonCn },
  },
});

export default i18n;
