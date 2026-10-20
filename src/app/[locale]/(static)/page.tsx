import type { Metadata } from 'next';
import Link from 'next/link';
import { profile } from '@/content/profile';
import { getProject } from '@/content/projects';
import { getDictionary } from '@/i18n/dictionaries';
import { interpolate } from '@/lib/format';
import { alternatesFor, localizedPath, siteUrl } from '@/lib/site';
import { getYearsOfExperience } from '@/lib/stats';

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getDictionary();
  return { alternates: alternatesFor(locale, '/') };
}

export default async function HomePage() {
  const { locale, t } = await getDictionary();
  const years = await getYearsOfExperience();
  const featured = getProject('convocatoria')!;

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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, '\\u003c') }}
      />

      <section aria-labelledby="hero-title">
        <p className="text-sm font-medium tracking-wide text-muted">{t.home.eyebrow}</p>
        <h1
          id="hero-title"
          className="mt-4 text-[clamp(2.5rem,7vw,4.5rem)] leading-[1.02] font-semibold tracking-tighter text-balance"
        >
          {t.home.title}
        </h1>
        <p className="mt-8 max-w-[62ch] text-lg leading-relaxed text-muted text-pretty">
          {interpolate(t.home.intro, { years })}
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href={localizedPath(locale, '/work')}
            className="inline-flex min-h-11 items-center rounded-full bg-fg px-6 font-medium text-bg hover:opacity-90"
          >
            {t.home.ctaWork}
          </Link>
          <Link
            href={localizedPath(locale, '/contact')}
            className="inline-flex min-h-11 items-center rounded-full border border-control px-6 font-medium hover:bg-surface"
          >
            {t.home.ctaContact}
          </Link>
        </div>
      </section>

      <section aria-labelledby="capabilities-title" className="mt-28">
        <h2 id="capabilities-title" className="text-2xl font-semibold tracking-tight">
          {t.home.capabilitiesTitle}
        </h2>
        <ul className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {t.home.capabilities.map((item) => (
            <li key={item.title}>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="featured-title" className="mt-28">
        <h2 id="featured-title" className="text-2xl font-semibold tracking-tight">
          {t.home.featuredTitle}
        </h2>
        <article className="mt-8 rounded-2xl border border-border p-6 sm:p-8">
          <p className="text-sm text-muted">{featured.kind[locale]}</p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight">{featured.name}</h3>
          <p className="mt-3 leading-relaxed text-muted">{featured.summary[locale]}</p>
          <Link href={localizedPath(locale, `/work/${featured.slug}`)} className="link mt-6 inline-block font-medium">
            {t.home.featuredCta}
            <span className="sr-only">: {featured.name}</span>
          </Link>
        </article>
      </section>

      <section aria-labelledby="this-site-title" className="mt-28">
        <h2 id="this-site-title" className="text-2xl font-semibold tracking-tight">
          {t.home.thisSiteTitle}
        </h2>
        <p className="mt-4 max-w-[62ch] leading-relaxed text-muted">{t.home.thisSiteBody}</p>
      </section>
    </>
  );
}
