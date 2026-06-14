import { useEffect, useState, useCallback } from 'react';
import { languages, getInitialLang, STORAGE_KEY } from './index.js';

// useI18n - returns the current language dictionary and a setter
// IMPORTANT: No fallback mixing. Selected language = ONLY that language shown.
export function useI18n() {
  const [lang, setLangState] = useState(getInitialLang);

  // Persist on change
  const setLang = useCallback((next) => {
    if (!languages[next]) return;
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  }, []);

  // Persist to <html lang=".."> so screen readers / browser pick the right lang
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  // Always return the EXACT dictionary for the selected language.
  // No merging, no fallback to other languages. This ensures clean single-language display.
  return { lang, setLang, t: languages[lang] };
}
