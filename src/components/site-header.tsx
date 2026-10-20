import Link from 'next/link';
import { profile } from '@/content/profile';
import { getDictionary } from '@/i18n/dictionaries';
import { localizedPath } from '@/lib/site';
import { LanguageSwitcher } from './language-switcher';
import { NavLink } from './nav-link';
import { ThemeToggle } from './theme-toggle';

export async function SiteHeader() {
  const { locale, t } = await getDictionary();
  const items = [
    { href: localizedPath(locale, '/work'), label: t.nav.work },
    { href: localizedPath(locale, '/about'), label: t.nav.about },
    { href: localizedPath(locale, '/contact'), label: t.nav.contact },
  ];

  return (
    <header className="mx-auto flex w-full max-w-3xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-6 pt-6">
      <Link
        href={localizedPath(locale, '/')}
        className="inline-flex min-h-11 items-center font-semibold tracking-tight text-fg"
      >
        {profile.name}
      </Link>
      <div className="flex flex-wrap items-center gap-x-1">
        <nav aria-label={t.a11y.mainNav}>
          <ul className="flex flex-wrap items-center">
            {items.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <LanguageSwitcher current={locale} label={t.a11y.languageSwitcher} />
        <ThemeToggle label={t.a11y.darkTheme} />
      </div>
    </header>
  );
}
