import { locales, defaultLocale } from '@/i18n/config';

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  'http://localhost:3000'
).replace(/\/$/, '');

/** Routes shared by both locales (without the locale prefix). */
export const staticRoutes = [
  '/',
  '/work',
  '/work/convocatoria',
  '/work/portfolio',
  '/lab/data-grid',
  '/about',
  '/contact',
  '/accessibility',
] as const;

/** ISO timestamp of the build, inlined by next.config.ts. */
export const buildDate = process.env.BUILD_DATE ?? '2026-01-01T00:00:00.000Z';

export function localizedPath(locale: string, path: string): string {
  return path === '/' ? `/${locale}` : `/${locale}${path}`;
}

/** `alternates` for the Metadata API: canonical plus hreflang links (x-default points to English). */
export function alternatesFor(locale: string, path: string) {
  return {
    canonical: localizedPath(locale, path),
    languages: {
      ...Object.fromEntries(locales.map((l) => [l, localizedPath(l, path)])),
      'x-default': localizedPath(defaultLocale, path),
    },
  };
}
