import { useEffect, useState, useCallback } from 'react';
import { languages, getInitialLang, STORAGE_KEY } from './index.js';

// useI18n - returns the current language dictionary and a setter
// IMPORTANT: No fallback mixing. Selected language = ONLY that language shown.
// If externalLang is provided, use it (controlled mode). Otherwise use internal state.
export function useI18n(externalLang) {
  const [internalLang, setInternalLang] = useState(getInitialLang);

  // When externalLang changes, sync internalLang too (so the event listener approach stays in sync)
  useEffect(() => {
    if (externalLang !== undefined) {
      setInternalLang(externalLang);
    }
  }, [externalLang]);

  const lang = externalLang !== undefined ? externalLang : internalLang;

  // Persist on change
  const setLang = useCallback((next) => {
    if (!languages[next]) return;
    setInternalLang(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  }, []);

  // Listen for language changes from LanguageSwitcher (event-based, works across components)
  useEffect(() => {
    const handler = (e) => {
      setInternalLang(e.detail);
    };
    window.addEventListener('chefv:langChange', handler);
    return () => window.removeEventListener('chefv:langChange', handler);
  }, []);

  // Also listen for our own setLang calls to sync
  useEffect(() => {
    const handler = (e) => {
      setInternalLang(e.detail);
    };
    window.addEventListener('chefv:setLang', handler);
    return () => window.removeEventListener('chefv:setLang', handler);
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
