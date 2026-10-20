import Link from 'next/link';
import { cvPath, profile } from '@/content/profile';
import { projects } from '@/content/projects';
import { locales } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { localizedPath } from '@/lib/site';
import { CommandPalette, type PaletteItem } from './command-palette';
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
  const otherLocale = locales.find((l) => l !== locale)!;

  const paletteItems: PaletteItem[] = [
    { id: 'home', label: t.nav.home, group: t.palette.pages, href: localizedPath(locale, '/') },
    ...items.map((item) => ({ id: item.href, label: item.label, group: t.palette.pages, href: item.href })),
    ...projects
      .filter((project) => project.caseStudy)
      .map((project) => ({
        id: `case-${project.slug}`,
        label: project.name,
        group: t.palette.pages,
        href: localizedPath(locale, `/work/${project.slug}`),
      })),
    { id: 'lab', label: t.nav.lab, group: t.palette.pages, href: localizedPath(locale, '/lab/data-grid') },
    {
      id: 'accessibility',
      label: t.nav.accessibility,
      group: t.palette.pages,
      href: localizedPath(locale, '/accessibility'),
    },
    { id: 'theme', label: t.palette.toggleTheme, group: t.palette.actions, action: 'toggle-theme' },
    {
      id: 'language',
      label: t.palette.otherLanguage,
      group: t.palette.actions,
      action: 'switch-language',
      locale: otherLocale,
    },
    { id: 'cv', label: t.cv.download, group: t.palette.actions, href: cvPath(locale), download: true },
    { id: 'linkedin', label: 'LinkedIn', group: t.palette.profiles, href: profile.links.linkedin, external: true },
    { id: 'github', label: 'GitHub', group: t.palette.profiles, href: profile.links.github, external: true },
    {
      id: 'stackoverflow',
      label: 'Stack Overflow',
      group: t.palette.profiles,
      href: profile.links.stackOverflow,
      external: true,
    },
  ];

  return (
    <header
      style={{ viewTransitionName: 'site-header' }}
      className="mx-auto grid w-full max-w-5xl grid-cols-[1fr_auto] items-center gap-x-2 px-6 pt-6 sm:grid-cols-[auto_1fr_auto] sm:gap-x-4"
    >
      <Link
        href={localizedPath(locale, '/')}
        className="inline-flex min-h-11 items-center font-semibold tracking-tight text-fg"
      >
        {profile.name}
      </Link>
      <nav
        aria-label={t.a11y.mainNav}
        className="col-span-2 row-start-2 -mx-2 mt-1 sm:col-span-1 sm:col-start-2 sm:row-start-1 sm:mx-0 sm:mt-0 sm:justify-self-end"
      >
        <ul className="flex flex-wrap items-center gap-x-1">
          {items.map((item) => (
            <li key={item.href}>
              <NavLink href={item.href}>{item.label}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex items-center sm:col-start-3">
        <LanguageSwitcher current={locale} label={t.a11y.languageSwitcher} />
        <CommandPalette items={paletteItems} copy={t.palette} />
        <ThemeToggle label={t.a11y.darkTheme} />
      </div>
    </header>
  );
}
