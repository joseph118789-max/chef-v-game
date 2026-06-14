import React, { useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';

// @ts-ignore
import { languageList } from '../i18n/index.js';

interface LanguageSwitcherProps {
  lang: 'en' | 'cn' | 'ms';
  onLangChange: (lang: 'en' | 'cn' | 'ms') => void;
}

const FLAG_MAP: Record<string, string> = {
  en: '🇬🇧',
  cn: '🇨🇳',
  ms: '🇲🇾',
};

export default function LanguageSwitcher({ lang, onLangChange }: LanguageSwitcherProps) {
  const [open, setOpen] = React.useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const current = languageList.find(l => l.code === lang) || languageList[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 border border-white/25 text-white text-xs font-bold px-3 py-2 rounded-full transition-all cursor-pointer"
        aria-label="Switch language"
      >
        <Globe className="w-3.5 h-3.5" />
        <span>{FLAG_MAP[lang] || '🌐'} {current.flag}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-[#FAD0D6] overflow-hidden z-50 min-w-[140px]">
          {languageList.map(l => (
            <button
              key={l.code}
              onClick={() => {
                onLangChange(l.code as 'en' | 'cn' | 'ms');
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                l.code === lang
                  ? 'bg-[#FFF5F6] text-[#F24E82]'
                  : 'text-slate-700 hover:bg-pink-50'
              }`}
            >
              <span>{FLAG_MAP[l.code] || '🌐'}</span>
              <span>{l.label}</span>
              {l.code === lang && <span className="ml-auto text-[10px] text-pink-400">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
