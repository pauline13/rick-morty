import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import ru from './locales/ru.json';

const STORAGE_KEY = 'i18n-language';
const SUPPORTED_LANGUAGES = ['en', 'ru'] as const;

type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

function isSupportedLanguage(lang: string): lang is SupportedLanguage {
  return (SUPPORTED_LANGUAGES as readonly string[]).includes(lang);
}

function detectLanguage(): SupportedLanguage {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && isSupportedLanguage(saved)) return saved;

  const browserLang = navigator.language.split('-')[0];
  if (isSupportedLanguage(browserLang)) return browserLang;

  return 'en';
}

const lng = detectLanguage();
document.documentElement.lang = lng;

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
  },
  lng,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

i18n.on('languageChanged', (lang: string) => {
  localStorage.setItem(STORAGE_KEY, lang);
  document.documentElement.lang = lang;
});

export default i18n;
