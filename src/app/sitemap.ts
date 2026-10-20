import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';
import { localizedPath, siteUrl, staticRoutes } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return staticRoutes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${siteUrl}${localizedPath(locale, route)}`,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${siteUrl}${localizedPath(l, route)}`])),
      },
    })),
  );
}
