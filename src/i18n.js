import i18n from "i18next";
import {
  initReactI18next
} from "react-i18next";
import Backend from "i18next-http-backend"
import BASEURL from "./baseURL";

const supportedLngs = ["uz", "ru", "en"]
i18n
  .use(initReactI18next)
  .use(Backend)
  .init({
    supportedLngs,
    fallbackLng: "ru",


    saveMissing: true,

    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false,
      // waiting: true
    },

    backend: {
      addPath: `${BASEURL}/translation/create`,  
      loadPath: `${BASEURL}/translation/all?_l={{lng}}`,
      // addPath: `https://api.b-invest.uz/v1/translation/create`,  
      // loadPath: `https://api.b-invest.uz/v1/translation/all?_l={{lng}}`,
      parse(data) {
        const respons = JSON.parse(data)
        return respons.data
      },
      parsePayload: (namespace, key, fallback) => ({
        message: key
      }),
      allowMultiLoading: false,
      reloadInterval: false,
    },
  });

export default i18n