"use client";
import { Globe2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { copy } from "@/i18n/copy";
import { languageKey, languageNames, locales, preferredLocale, switchLanguagePath, type Locale } from "@/i18n/config";
import { assetPath } from "@/lib/paths";

const subscribe = () => () => {};
const browserReady = () => true;
const serverReady = () => false;
export function LanguageSelector({ locale }: { locale: Locale }) {
  const ready = useSyncExternalStore(subscribe, browserReady, serverReady);
  const pathname = usePathname();
  const auto = { es: "Automático", en: "Automatic", de: "Automatisch", it: "Automatico" }[locale];
  return <label className="language-selector">
    <Globe2 size={15} aria-hidden="true" />
    <select aria-label={copy[locale].language} value={locale} disabled={!ready} data-language-ready={ready} onChange={event => {
      const automatic = event.target.value === "auto";
      const next = automatic ? preferredLocale(navigator.languages) : event.target.value as Locale;
      try { if (automatic) localStorage.removeItem(languageKey); else localStorage.setItem(languageKey, next); } catch { /* Navigation still works when storage is unavailable. */ }
      window.location.assign(`${assetPath(switchLanguagePath(pathname, next))}${window.location.search}${window.location.hash}`);
    }}>
      {locales.map(language => <option key={language} value={language} lang={language}>{languageNames[language]}</option>)}
      <option value="auto">{auto}</option>
    </select>
  </label>;
}
