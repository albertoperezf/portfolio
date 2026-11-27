import type { Metadata } from 'next';
import Link from 'next/link';
import { BrandIcon, brandColor } from '@/components/brand-icons';
import { CompanyLogos } from '@/components/company-logos';
import { CvLink } from '@/components/cv-link';
import { FootballRain } from '@/components/football-rain';
import {
  AccessibilityIcon,
  ArrowRightIcon,
  BallIcon,
  CodeIcon,
  ExternalIcon,
  GamepadIcon,
  GaugeIcon,
  GridIcon,
  HeartIcon,
  TrophyIcon,
} from '@/components/icons';
import { PaletteHint } from '@/components/palette-hint';
import { PhoneShowcase, type PhoneSlide } from '@/components/phone-showcase';
import { ProjectCard } from '@/components/project-card';
import { ScoreGauge } from '@/components/score-gauge';
import { Highlight, SectionHeading } from '@/components/typography';
import { profile } from '@/content/profile';
import { clients, coreStack, employers, lighthouse, modernStack } from '@/content/proof';
import { getProject } from '@/content/projects';
import { getDictionary } from '@/i18n/dictionaries';
import { formatNumber, interpolate } from '@/lib/format';
import { alternatesFor, localizedPath, siteUrl } from '@/lib/site';
import { getStackOverflowStats, getYearsOfExperience } from '@/lib/stats';

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getDictionary();
  return { alternates: alternatesFor(locale, '/') };
}

/** Sets the stagger index used by the `rise` entrance animation. */
const stagger = (index: number) => ({ '--i': index }) as React.CSSProperties;

export default async function HomePage() {
  const { locale, t } = await getDictionary();
  const [years, so] = await Promise.all([getYearsOfExperience(), getStackOverflowStats()]);
  const featured = [getProject('convocatoria')!, getProject('mybabylog')!, getProject('portfolio')!];

  const slideLabels: Record<string, string> = {
    mybabylog: 'MyBabyLog',
    convocatoria: 'Convocatoria',
    portfolio: t.home.showcase.thisSite,
  };
  const slides: PhoneSlide[] = ['mybabylog', 'convocatoria', 'portfolio'].map((slug) => {
    const project = getProject(slug)!;
    const preview = project.mobilePreview!;
    return {
      id: slug,
      label: slideLabels[slug],
      name: project.name,
      kind: project.kind[locale],
      light: preview.light,
      dark: preview.dark,
      width: preview.width,
      height: preview.height,
      alt: preview.alt[locale],
      href: project.caseStudy ? localizedPath(locale, `/work/${slug}`) : undefined,
    };
  });

  const scores = lighthouse.scores;
  const scoreValues = Object.values(scores);
  const lowest = Math.min(...scoreValues);
  const badgeScore = scoreValues.every((value) => value === lowest) ? String(lowest) : `${lowest}+`;
  const measuredOn = new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeZone: 'UTC' }).format(
    new Date(lighthouse.measured),
  );
  const gauges = [
    { label: t.home.proof.scores.performance, score: scores.performance },
    { label: t.home.proof.scores.accessibility, score: scores.accessibility },
    { label: t.home.proof.scores.bestPractices, score: scores.bestPractices },
    { label: t.home.proof.scores.seo, score: scores.seo },
  ];

  const hood: { title: string; body: string; Icon: typeof CodeIcon; href: string; external?: boolean }[] = [
    { ...t.home.proof.hood.source, Icon: CodeIcon, href: profile.sourceUrl, external: true },
    { ...t.home.proof.hood.build, Icon: GaugeIcon, href: localizedPath(locale, '/work/portfolio') },
    { ...t.home.proof.hood.grid, Icon: GridIcon, href: localizedPath(locale, '/lab/data-grid') },
    { ...t.home.proof.hood.a11y, Icon: AccessibilityIcon, href: localizedPath(locale, '/accessibility') },
  ];

  const interests = [
    { ...t.home.beyond.interests.family, Icon: HeartIcon },
    { ...t.home.beyond.interests.madrid, Icon: TrophyIcon },
    { ...t.home.beyond.interests.football, Icon: BallIcon },
    { ...t.home.beyond.interests.games, Icon: GamepadIcon },
  ];

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

  const panelTitle = 'text-sm text-muted';

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, '\\u003c') }}
      />

      <section aria-labelledby="hero-title" className="relative isolate">
        <div aria-hidden="true" className="hero-glow absolute -inset-x-6 -top-24 bottom-0 -z-10 sm:-top-32" />
        <div className="grid items-center gap-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-10">
          <div>
            <p className="rise font-mono text-sm text-muted" style={stagger(0)}>
              {t.home.eyebrow}
            </p>
            <h1
              id="hero-title"
              className="rise mt-5 font-display text-[clamp(2.9rem,7vw,5rem)] leading-[0.98] tracking-tight text-balance"
              style={stagger(1)}
            >
              <Highlight text={t.home.title} />
            </h1>
            <p className="rise mt-8 max-w-[56ch] text-lg leading-relaxed text-pretty sm:text-xl" style={stagger(2)}>
              {interpolate(t.home.intro, { years })}
            </p>
            <p className="rise mt-4 max-w-[56ch] leading-relaxed text-muted" style={stagger(3)}>
              {t.home.human}
            </p>
            <div className="rise mt-10 flex flex-wrap items-center gap-3" style={stagger(4)}>
              <Link
                href={localizedPath(locale, '/work')}
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-fg px-6 font-medium text-bg hover:opacity-90"
              >
                {t.home.ctaWork}
                <ArrowRightIcon className="size-4" />
              </Link>
              <CvLink locale={locale} label={t.cv.download} format={t.cv.format} />
              <Link
                href={localizedPath(locale, '/contact')}
                className="link inline-flex min-h-11 items-center px-3 font-medium"
              >
                {t.home.ctaContact}
              </Link>
            </div>
            <div className="rise mt-4 -ml-3" style={stagger(5)}>
              <PaletteHint label={t.home.paletteHint} />
            </div>
          </div>

          <div className="rise" style={stagger(3)}>
            <PhoneShowcase
              slides={slides}
              copy={t.home.showcase}
              badges={{
                top: t.home.showcase.badgeAccessibility,
                bottom: interpolate(t.home.showcase.badgeLighthouse, { score: badgeScore }),
              }}
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="credentials-title" className="mt-24 sm:mt-32">
        <h2 id="credentials-title" className="sr-only">
          {t.home.credentials.label}
        </h2>
        <div className="scroll-rise grid gap-px overflow-hidden rounded-3xl border border-border bg-border lg:grid-cols-12">
          <div className="flex flex-col justify-center bg-bg p-8 lg:col-span-3">
            <p className="font-display text-7xl leading-none tabular-nums">
              {interpolate(t.home.credentials.years, { years })}
            </p>
            <p className="mt-3 text-muted">{t.home.credentials.yearsLabel}</p>
          </div>
          <div className="bg-bg p-8 lg:col-span-4">
            <h3 className={panelTitle}>{t.home.credentials.employers}</h3>
            <div className="mt-4">
              <CompanyLogos
                companies={employers}
                label={t.home.credentials.employers}
                className="grid-cols-2 lg:grid-cols-1"
              />
            </div>
          </div>
          <div className="bg-bg p-8 lg:col-span-5">
            <h3 className={panelTitle}>{t.home.credentials.clients}</h3>
            <div className="mt-4">
              <CompanyLogos companies={clients} label={t.home.credentials.clients} />
            </div>
          </div>
          <div className="bg-bg p-8 lg:col-span-7">
            <h3 className={panelTitle}>{t.home.credentials.stack}</h3>
            <ul aria-label={t.home.credentials.stack} className="mt-4 flex flex-wrap gap-3">
              {coreStack.map((item) => (
                <li
                  key={item.name}
                  className="brand-item flex items-center gap-3 rounded-xl border border-border px-4 py-3"
                  style={{ '--brand': brandColor(item.icon) } as React.CSSProperties}
                >
                  <BrandIcon name={item.icon} className="brand-icon size-7" />
                  <span className="font-medium">{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-bg p-8 lg:col-span-5">
            <h3 className={panelTitle}>{t.home.credentials.community}</h3>
            <a
              href={profile.links.stackOverflow}
              rel="me"
              className="brand-item lift group mt-4 flex items-center gap-4 rounded-xl border border-border p-4 hover:border-control"
              style={{ '--brand': brandColor('stackoverflow') } as React.CSSProperties}
            >
              <BrandIcon name="stackoverflow" className="brand-icon size-9 shrink-0" />
              <span className="min-w-0">
                <span className="block font-medium">
                  {so
                    ? interpolate(t.about.stackOverflow, { reputation: formatNumber(so.reputation, locale) })
                    : t.home.credentials.stackOverflowFallback}
                </span>
                {so && (
                  <span className="block text-sm text-muted">
                    {interpolate(t.about.badges, { gold: so.gold, silver: so.silver, bronze: so.bronze })}
                  </span>
                )}
                <span className="mt-1 inline-flex items-center gap-1 text-sm font-medium underline decoration-control underline-offset-4 group-hover:text-accent">
                  {t.home.credentials.stackOverflowCta}
                  <ExternalIcon className="size-3.5" />
                </span>
              </span>
            </a>
          </div>
        </div>
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
          {featured.map((project, index) => (
            <li key={project.slug} className={index === 0 && featured.length % 2 === 1 ? 'md:col-span-2' : undefined}>
              <ProjectCard project={project} locale={locale} copy={t.work} />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="proof-title" className="mt-32">
        <SectionHeading id="proof-title" eyebrow={t.home.proof.eyebrow} title={t.home.proof.title} />
        <p className="mt-4 max-w-[62ch] text-lg leading-relaxed text-muted">{t.home.proof.intro}</p>

        <div className="scroll-rise mt-12 rounded-3xl border border-border p-8 sm:p-10">
          <div
            role="group"
            aria-label={t.home.proof.scoresLabel}
            className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4"
          >
            {gauges.map((gauge) => (
              <ScoreGauge
                key={gauge.label}
                label={gauge.label}
                score={gauge.score}
                description={interpolate(t.home.proof.scoreDescription, { label: gauge.label, score: gauge.score })}
              />
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-muted">
            {interpolate(t.home.proof.measured, { date: measuredOn })}
          </p>
        </div>

        <div className="mt-20 grid gap-16 lg:grid-cols-2 lg:gap-12">
          <div>
            <h3 className="font-display text-3xl tracking-tight sm:text-4xl">{t.home.proof.stackTitle}</h3>
            <p className="mt-3 max-w-[48ch] leading-relaxed text-muted">{t.home.proof.stackIntro}</p>
            <ul aria-label={t.home.proof.stackLabel} className="scroll-rise mt-8 grid grid-cols-2 gap-3">
              {modernStack.map((item) => (
                <li
                  key={item.name}
                  className="brand-item flex items-center gap-3 rounded-xl border border-border px-4 py-3"
                  style={{ '--brand': brandColor(item.icon) } as React.CSSProperties}
                >
                  <BrandIcon name={item.icon} className="brand-icon size-6 shrink-0" />
                  <span className="text-sm font-medium">
                    {item.name}
                    {item.version && <span className="ml-1.5 font-mono text-xs text-muted">{item.version}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-3xl tracking-tight sm:text-4xl">{t.home.proof.hoodTitle}</h3>
            <ul className="scroll-rise mt-8 space-y-3">
              {hood.map(({ Icon, ...item }) => {
                const content = (
                  <>
                    <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-surface text-accent">
                      <Icon />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-1.5 font-medium">
                        {item.title}
                        {item.external ? (
                          <ExternalIcon className="size-3.5 text-muted" />
                        ) : (
                          <ArrowRightIcon className="size-3.5 text-muted transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
                        )}
                      </span>
                      <span className="block text-sm text-muted">{item.body}</span>
                    </span>
                  </>
                );
                const className =
                  'lift group flex items-center gap-4 rounded-2xl border border-border p-4 hover:border-control';
                return (
                  <li key={item.title}>
                    {item.external ? (
                      <a href={item.href} className={className}>
                        {content}
                      </a>
                    ) : (
                      <Link href={item.href} className={className}>
                        {content}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
            <p className="mt-6 text-sm text-muted">{t.home.proof.easterEgg}</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="beyond-title" className="mt-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading id="beyond-title" eyebrow={t.home.beyond.eyebrow} title={t.home.beyond.title} />
            <p className="mt-6 max-w-[52ch] text-lg leading-relaxed">{t.home.beyond.body}</p>
          </div>
          <ul aria-label={t.home.beyond.interestsLabel} className="scroll-rise grid grid-cols-2 gap-4">
            {interests.map(({ Icon, ...item }) => (
              <li
                key={item.title}
                className="lift group rounded-2xl border border-border p-5 hover:border-control sm:p-6"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-full bg-surface text-accent transition-transform group-hover:-rotate-12 motion-reduce:transition-none">
                  <Icon />
                </span>
                <h3 className="mt-4 font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="cta-title" className="mt-32">
        <div className="scroll-rise rounded-3xl bg-surface px-8 py-14 text-center sm:px-16 sm:py-20">
          <h2 id="cta-title" className="font-display text-4xl tracking-tight text-balance sm:text-5xl">
            {t.home.cta.title}
          </h2>
          <p className="mx-auto mt-4 max-w-[48ch] text-lg leading-relaxed text-muted">{t.home.cta.body}</p>
          <Link
            href={localizedPath(locale, '/contact')}
            className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-fg px-6 font-medium text-bg hover:opacity-90"
          >
            {t.home.cta.button}
            <ArrowRightIcon className="size-4" />
          </Link>
        </div>
      </section>

      <FootballRain />
    </>
  );
}
