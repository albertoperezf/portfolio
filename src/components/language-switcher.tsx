'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LOCALE_COOKIE, localeNames, locales, type Locale } from '@/i18n/config';
import { stripLocale } from '@/i18n/negotiate';

export function LanguageSwitcher({ current, label }: { current: Locale; label: string }) {
  const rest = stripLocale(usePathname());

  return (
    <nav aria-label={label}>
      <ul className="flex items-center">
        {locales
          .filter((locale) => locale !== current)
          .map((locale) => (
            <li key={locale}>
              <Link
                href={rest === '/' ? `/${locale}` : `/${locale}${rest}`}
                hrefLang={locale}
                lang={locale}
                onClick={() => {
                  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; SameSite=Lax`;
                }}
                className="inline-flex min-h-11 items-center px-2 text-muted hover:text-fg"
              >
                {localeNames[locale]}
              </Link>
            </li>
          ))}
      </ul>
    </nav>
  );
}
