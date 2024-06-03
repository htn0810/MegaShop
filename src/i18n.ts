import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import home_en from '@/locales/en/home_en.json'
import home_vn from '@/locales/vn/home_vn.json'

export const languages = {
  en: 'English',
  vn: 'VietNam',
}

export const resources = {
  en: {
    translation: {
      home: home_en,
    },
  },
  vn: {
    translation: {
      home: home_vn,
    },
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
