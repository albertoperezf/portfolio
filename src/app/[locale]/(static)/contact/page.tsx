import type { Metadata } from 'next';
import { profile } from '@/content/profile';
import { getDictionary } from '@/i18n/dictionaries';
import { formatNumber, interpolate } from '@/lib/format';
import { alternatesFor } from '@/lib/site';
import { getStackOverflowStats } from '@/lib/stats';

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getDictionary();
  return { title: t.contact.title, alternates: alternatesFor(locale, '/contact') };
}

export default async function ContactPage() {
  const { locale, t } = await getDictionary();
  const so = await getStackOverflowStats();

  const channels = [
    { name: 'LinkedIn', handle: 'in/albertojpf', href: profile.links.linkedin, description: t.contact.linkedin },
    { name: 'GitHub', handle: 'albertoperezf', href: profile.links.github, description: t.contact.github },
    {
      name: 'Stack Overflow',
      handle: 'alberto-perez',
      href: profile.links.stackOverflow,
      description: so
        ? interpolate(t.contact.stackOverflow, { reputation: formatNumber(so.reputation, locale) })
        : t.contact.stackOverflowFallback,
    },
  ];

  return (
    <>
      <h1 className="text-[clamp(2.25rem,6vw,3.5rem)] leading-tight font-semibold tracking-tighter">
        {t.contact.title}
      </h1>
      <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-muted">{t.contact.intro}</p>
      <ul className="mt-12 space-y-4">
        {channels.map((channel) => (
          <li key={channel.name}>
            <a
              href={channel.href}
              rel="me"
              className="group flex items-center justify-between gap-6 rounded-2xl border border-border p-6 hover:border-control hover:bg-surface sm:p-8"
            >
              <span>
                <span className="block text-xl font-semibold tracking-tight">{channel.name}</span>
                <span className="mt-1 block font-mono text-sm text-muted">{channel.handle}</span>
                <span className="mt-3 block leading-relaxed text-muted">{channel.description}</span>
              </span>
              <span
                aria-hidden="true"
                className="text-2xl text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent motion-reduce:transition-none"
              >
                →
              </span>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
