import { profile } from '@/content/profile';
import { getDictionary } from '@/i18n/dictionaries';

export async function SiteFooter() {
  const { t } = await getDictionary();
  const links = [
    { href: profile.links.github, label: 'GitHub' },
    { href: profile.links.linkedin, label: 'LinkedIn' },
    { href: profile.links.stackOverflow, label: 'Stack Overflow' },
  ];

  return (
    <footer className="mx-auto mt-24 w-full max-w-3xl border-t border-border px-6 py-10 text-sm text-muted">
      <nav aria-label={t.a11y.socialLinks}>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} rel="me" className="link inline-flex min-h-6 items-center text-fg">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <p className="mt-6">{t.footer.builtWith}</p>
    </footer>
  );
}
