import { projects } from '@/content/projects';
import { locales, defaultLocale } from '@/i18n/config';

const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`);

if (!configuredSiteUrl && process.env.VERCEL_ENV === 'production') {
  throw new Error('Set NEXT_PUBLIC_SITE_URL or VERCEL_PROJECT_PRODUCTION_URL for production builds.');
}

export const siteUrl = (configuredSiteUrl || 'http://localhost:3000').replace(/\/$/, '');

/** Routes shared by both locales (without the locale prefix). */
export const staticRoutes: readonly string[] = [
  '/',
  '/work',
  ...projects.filter((project) => project.caseStudy).map((project) => `/work/${project.slug}`),
  '/lab/data-grid',
  '/about',
  '/contact',
  '/accessibility',
];

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
