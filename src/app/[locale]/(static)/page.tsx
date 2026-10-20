import type { Metadata } from 'next';
import Link from 'next/link';
import { CvLink } from '@/components/cv-link';
import { AccessibilityIcon, ArrowRightIcon, GaugeIcon, GridIcon, LayersIcon } from '@/components/icons';
import { ProjectCard } from '@/components/project-card';
import { Highlight, SectionHeading } from '@/components/typography';
import { profile } from '@/content/profile';
import { getProject } from '@/content/projects';
import { getDictionary } from '@/i18n/dictionaries';
import { formatNumber, interpolate } from '@/lib/format';
import { alternatesFor, localizedPath, siteUrl } from '@/lib/site';
import { getStackOverflowStats, getYearsOfExperience } from '@/lib/stats';

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getDictionary();
  return { alternates: alternatesFor(locale, '/') };
}

export default async function HomePage() {
  const { locale, t } = await getDictionary();
  const [years, so] = await Promise.all([getYearsOfExperience(), getStackOverflowStats()]);
  const featured = [getProject('convocatoria')!, getProject('portfolio')!];

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.fullName,
    jobTitle: 'Senior Frontend Developer',
    worksFor: { '@type': 'Organization', name: 'Cognizant' },
    address: {
      '@type': 'PostalAddress',
      addressLocality: profile.location.city,
      addressCountry: profile.location.country,
    },
    url: `${siteUrl}/${locale}`,
    sameAs: Object.values(profile.links),
    knowsLanguage: ['es', 'en', 'it'],
  };

  const facts = [
    { value: interpolate(t.home.facts.years, { years }), label: t.home.facts.yearsLabel },
    { value: t.home.facts.stack, label: t.home.facts.stackLabel },
    { value: t.home.facts.clients, label: t.home.facts.clientsLabel },
    ...(so
      ? [
          {
            value: interpolate(t.home.facts.stackOverflow, { reputation: formatNumber(so.reputation, locale) }),
            label: t.home.facts.stackOverflowLabel,
          },
        ]
      : []),
  ];

  const { capabilities } = t.home;
  const capabilityCards = [
    { ...capabilities.grid, Icon: GridIcon, href: localizedPath(locale, '/lab/data-grid') },
    { ...capabilities.a11y, Icon: AccessibilityIcon, href: localizedPath(locale, '/accessibility') },
    { ...capabilities.perf, Icon: GaugeIcon, href: localizedPath(locale, '/work/portfolio') },
    { ...capabilities.fullstack, Icon: LayersIcon, href: localizedPath(locale, '/work/convocatoria') },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, '\\u003c') }}
      />

      <section aria-labelledby="hero-title">
        <p className="font-mono text-sm text-muted">{t.home.eyebrow}</p>
        <h1
          id="hero-title"
          className="mt-5 max-w-4xl text-[clamp(2.75rem,8vw,5rem)] leading-[1] font-semibold tracking-tighter text-balance"
        >
          <Highlight text={t.home.title} />
        </h1>
        <p className="mt-8 max-w-[60ch] text-lg leading-relaxed text-pretty sm:text-xl">
          {interpolate(t.home.intro, { years })}
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href={localizedPath(locale, '/work')}
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-fg px-6 font-medium text-bg hover:opacity-90"
          >
            {t.home.ctaWork}
            <ArrowRightIcon className="size-4" />
          </Link>
          <CvLink locale={locale} label={t.cv.download} format={t.cv.format} />
        </div>

        <dl
          aria-label={t.home.facts.label}
          className="mt-16 grid gap-x-8 gap-y-6 border-t border-border pt-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {facts.map((fact) => (
            <div key={fact.label} className="flex flex-col-reverse gap-1">
              <dt className="text-sm text-muted">{fact.label}</dt>
              <dd className="font-semibold tracking-tight">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="capabilities-title" className="mt-32">
        <SectionHeading id="capabilities-title" eyebrow={t.home.capabilitiesEyebrow} title={t.home.capabilitiesTitle} />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2">
          {capabilityCards.map(({ Icon, ...item }) => (
            <li key={item.title} className="flex flex-col rounded-2xl border border-border p-6 sm:p-8">
              <span className="inline-flex size-11 items-center justify-center rounded-full bg-surface text-accent">
                <Icon />
              </span>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{item.body}</p>
              <p className="mt-auto pt-5">
                <Link href={item.href} className="link font-medium">
                  {item.proof}
                  <ArrowRightIcon className="ml-1.5 inline size-4 align-[-0.15em]" />
                </Link>
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="work-title" className="mt-32">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading id="work-title" eyebrow={t.home.workEyebrow} title={t.home.workTitle} />
          <Link href={localizedPath(locale, '/work')} className="link inline-flex items-center gap-2 font-medium">
            {t.home.allWork}
            <ArrowRightIcon className="size-4" />
          </Link>
        </div>
        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {featured.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} locale={locale} copy={t.work} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
