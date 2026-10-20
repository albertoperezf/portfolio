import Link from 'next/link';
import { cvPath, profile } from '@/content/profile';
import { getDictionary } from '@/i18n/dictionaries';
import { interpolate } from '@/lib/format';
import { buildDate, localizedPath } from '@/lib/site';

export async function SiteFooter() {
  const { locale, t } = await getDictionary();
  const profiles = [
    { href: profile.links.linkedin, label: 'LinkedIn' },
    { href: profile.links.github, label: 'GitHub' },
    { href: profile.links.stackOverflow, label: 'Stack Overflow' },
  ];
  const updated = new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(buildDate));
  const linkClass = 'link inline-flex min-h-6 items-center text-fg';

  return (
    <footer className="mx-auto mt-32 w-full max-w-5xl border-t border-border px-6 py-10 text-sm text-muted">
      <div className="flex flex-wrap justify-between gap-x-12 gap-y-6">
        <nav aria-label={t.a11y.socialLinks}>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {profiles.map((link) => (
              <li key={link.href}>
                <a href={link.href} rel="me" className={linkClass}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          <li>
            <a href={cvPath(locale)} download type="application/pdf" className={linkClass}>
              {t.cv.download}
            </a>
          </li>
          <li>
            <Link href={localizedPath(locale, '/accessibility')} className={linkClass}>
              {t.nav.accessibility}
            </Link>
          </li>
          <li>
            <a href={profile.sourceUrl} className={linkClass}>
              {t.footer.source}
            </a>
          </li>
        </ul>
      </div>
      <p className="mt-6">
        {t.footer.builtWith}{' '}
        <time dateTime={buildDate.slice(0, 10)}>{interpolate(t.footer.updated, { date: updated })}</time>
      </p>
    </footer>
  );
}
