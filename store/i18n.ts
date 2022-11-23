import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
// Importing translation files
import translationEN from '@util/translate/en.json'
import translationFA from '@util/translate/fa.json'

// i18N Initialization
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: { ...translationEN, lang: false },
    },
    fa: {
      translation: { ...translationFA, lang: true },
    },
  },
  lng: 'fa',
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
