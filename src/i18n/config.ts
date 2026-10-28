export const locales = ["es", "en", "de", "it"] as const;
export type Locale = (typeof locales)[number];
export type InternationalLocale = Exclude<Locale, "es">;
export const internationalLocales = ["en", "de", "it"] as const;
export const languageKey = "jaiax-language";
export const languageNames: Record<Locale, string> = { es: "Español", en: "English", de: "Deutsch", it: "Italiano" };
export const ogLocales: Record<Locale, string> = { es: "es_PE", en: "en_US", de: "de_DE", it: "it_IT" };
export function isLocale(value: unknown): value is Locale { return typeof value === "string" && locales.includes(value as Locale); }
export function isInternationalLocale(value: unknown): value is InternationalLocale { return isLocale(value) && value !== "es"; }
export function preferredLocale(languages: readonly string[], saved?: string | null): Locale {
  if (isLocale(saved)) return saved;
  for (const language of languages) { const base = language.toLowerCase().split(/[-_]/)[0]; if (isLocale(base)) return base; }
  return "en";
}
export function localePath(locale: Locale, path = "/"): string {
  const clean = path.replace(/^\/(?:es|en|de|it)(?=\/|$)/, "") || "/";
  return locale === "es" && clean !== "/" ? clean : `/${locale}${clean === "/" ? "/" : clean}`;
}
export function translatedPath(path: string): boolean { return path === "/" || /^\/(planes|estudio|sistemas)\/?$/.test(path) || /^\/servicios\/[^/]+\/?$/.test(path); }
export function switchLanguagePath(path: string, locale: Locale): string {
  const clean = path.replace(/^\/(?:es|en|de|it)(?=\/|$)/, "") || "/";
  return localePath(locale, translatedPath(clean) ? clean : "/");
}
export function languageAlternates(path: string) {
  const clean = path.replace(/^\/(?:es|en|de|it)(?=\/|$)/, "") || "/";
  if (!translatedPath(clean)) return undefined;
  const origin = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3107").replace(/\/$/, "");
  return Object.fromEntries([...locales.map(locale => [locale, `${origin}${localePath(locale, clean).replace(/\/$/, "")}/`]), ["x-default", `${origin}${clean.replace(/\/$/, "")}/`]]);
}
