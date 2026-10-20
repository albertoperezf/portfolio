import { defaultLocale, isLocale, locales, type Locale } from './config';

/** Picks a supported locale from an `Accept-Language` header, honouring q-values. */
export function negotiateLocale(acceptLanguage: string | null | undefined): Locale {
  if (!acceptLanguage) return defaultLocale;

  const ranked = acceptLanguage
    .split(',')
    .map((part, index) => {
      const [tag, ...params] = part.trim().split(';');
      const q = params.map((p) => p.trim()).find((p) => p.startsWith('q='));
      const quality = q ? Number.parseFloat(q.slice(2)) : 1;
      return { tag: tag.toLowerCase(), quality: Number.isNaN(quality) ? 0 : quality, index };
    })
    .filter(({ tag, quality }) => tag && quality > 0)
    .sort((a, b) => b.quality - a.quality || a.index - b.index);

  for (const { tag } of ranked) {
    const primary = tag.split('-')[0];
    if (isLocale(primary)) return primary;
  }
  return defaultLocale;
}

/** A locale chosen explicitly in the language switcher wins over the browser preference. */
export function resolveLocale(cookieValue: string | undefined, acceptLanguage: string | null): Locale {
  return isLocale(cookieValue) ? cookieValue : negotiateLocale(acceptLanguage);
}

export function stripLocale(pathname: string): string {
  const [, first, ...rest] = pathname.split('/');
  if (!locales.includes(first as Locale)) return pathname;
  return rest.length ? `/${rest.join('/')}` : '/';
}
