import en from './en.js';
import cn from './cn.js';
import ms from './ms.js';

export const languages = {
  en: { ...en, code: 'en' },
  cn: { ...cn, code: 'cn' },
  ms: { ...ms, code: 'ms' },
};

export const languageList = [
  { code: 'en', label: 'English', flag: 'EN' },
  { code: 'cn', label: '中文',   flag: 'CN' },
  { code: 'ms', label: 'Bahasa', flag: 'MY' },
];

export const STORAGE_KEY = 'chefv_lang';

export function getInitialLang() {
  if (typeof window === 'undefined') return 'en';
  const saved = window.localStorage?.getItem(STORAGE_KEY);
  if (saved && languages[saved]) return saved;
  // Default to English for first-time visitors
  return 'en';
}
