import type { Metadata } from 'next';
import { ExperienceList } from '@/components/experience-list';
import { certifications, earlierExperience, education, experience, profile, spokenLanguages } from '@/content/profile';
import { getDictionary } from '@/i18n/dictionaries';
import { formatNumber, interpolate } from '@/lib/format';
import { alternatesFor } from '@/lib/site';
import { getStackOverflowStats, getYearsOfExperience } from '@/lib/stats';

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getDictionary();
  return { title: t.about.title, alternates: alternatesFor(locale, '/about') };
}

const sectionTitle = 'text-2xl font-semibold tracking-tight';

export default async function AboutPage() {
  const { locale, t } = await getDictionary();
  const [years, so] = await Promise.all([getYearsOfExperience(), getStackOverflowStats()]);

  return (
    <>
      <h1 className="text-[clamp(2.25rem,6vw,3.5rem)] leading-tight font-semibold tracking-tighter">{t.about.title}</h1>
      <div className="mt-8 max-w-[65ch] space-y-5 text-lg leading-relaxed text-muted">
        {t.about.bio.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{interpolate(paragraph, { years })}</p>
        ))}
      </div>

      <section aria-labelledby="experience-title" className="mt-24">
        <h2 id="experience-title" className={sectionTitle}>
          {t.about.experienceTitle}
        </h2>
        <div className="mt-10">
          <ExperienceList items={experience} locale={locale} present={t.about.present} stackLabel={t.work.stackLabel} />
        </div>
        <details className="group mt-12 rounded-2xl border border-border">
          <summary className="flex min-h-11 cursor-pointer items-center justify-between gap-4 px-6 py-4 font-semibold">
            {t.about.earlierTitle}
            <span
              aria-hidden="true"
              className="text-muted transition-transform group-open:rotate-45 motion-reduce:transition-none"
            >
              +
            </span>
          </summary>
          <div className="px-6 pt-2 pb-8">
            <ExperienceList
              items={earlierExperience}
              locale={locale}
              present={t.about.present}
              stackLabel={t.work.stackLabel}
            />
          </div>
        </details>
      </section>

      <section aria-labelledby="education-title" className="mt-24">
        <h2 id="education-title" className={sectionTitle}>
          {t.about.educationTitle}
        </h2>
        <p className="mt-6 font-medium">{education.degree[locale]}</p>
        <p className="text-muted">
          {education.school} · {education.location[locale]} ·{' '}
          <span className="tabular-nums">
            {education.start}–{education.end}
          </span>
        </p>
      </section>

      <section aria-labelledby="certifications-title" className="mt-24">
        <h2 id="certifications-title" className={sectionTitle}>
          {t.about.certificationsTitle}
        </h2>
        <ul className="mt-6 divide-y divide-border">
          {certifications.map((cert) => (
            <li key={cert.name} className="flex flex-wrap justify-between gap-x-4 py-3">
              <span lang={cert.lang ?? 'en'}>{cert.name}</span>
              <span className="text-sm text-muted">{[cert.issuer, cert.year].filter(Boolean).join(' · ')}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="languages-title" className="mt-24">
        <h2 id="languages-title" className={sectionTitle}>
          {t.about.languagesTitle}
        </h2>
        <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-8 gap-y-3">
          {spokenLanguages.map((language) => (
            <div key={language.name.en} className="contents">
              <dt className="font-medium">{language.name[locale]}</dt>
              <dd className="text-muted">{language.level[locale]}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="community-title" className="mt-24">
        <h2 id="community-title" className={sectionTitle}>
          {t.about.communityTitle}
        </h2>
        <ul className="mt-6 space-y-4">
          <li>
            <a href={profile.links.stackOverflow} className="link font-medium">
              {so
                ? interpolate(t.about.stackOverflow, { reputation: formatNumber(so.reputation, locale) })
                : t.about.stackOverflowFallback}
            </a>
            {so && (
              <p className="text-sm text-muted">
                {interpolate(t.about.badges, { gold: so.gold, silver: so.silver, bronze: so.bronze })}
              </p>
            )}
          </li>
          <li>
            <a href={profile.links.github} className="link font-medium">
              {t.about.github}
            </a>
          </li>
          <li>
            <a href={profile.links.linkedin} className="link font-medium">
              {t.about.linkedin}
            </a>
          </li>
        </ul>
      </section>
    </>
  );
}
