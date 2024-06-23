import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import home_en from '@/locales/en/home_en.json'
import home_vn from '@/locales/vn/home_vn.json'
import login_en from '@/locales/en/login_en.json'
import login_vn from '@/locales/vn/login_vn.json'
import sign_up_en from '@/locales/en/sign_up_en.json'
import sign_up_vn from '@/locales/vn/sign_up_vn.json'
import product_detail_en from '@/locales/en/product_detail_en.json'
import product_detail_vn from '@/locales/vn/product_detail_vn.json'
import products_en from '@/locales/en/products_en.json'
import products_vn from '@/locales/vn/products_vn.json'

export const languages = {
  en: 'English',
  vn: 'VietNam',
}

export const resources = {
  en: {
    translation: {
      home: home_en,
      login: login_en,
      sign_up: sign_up_en,
      product_detail: product_detail_en,
      products: products_en,
    },
  },
  vn: {
    translation: {
      home: home_vn,
      login: login_vn,
      sign_up: sign_up_vn,
      product_detail: product_detail_vn,
      products: products_vn,
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
