import type { Metadata } from 'next';
import { CvLink } from '@/components/cv-link';
import { ExperienceList } from '@/components/experience-list';
import { pageTitleClass, SectionHeading } from '@/components/typography';
import {
  certifications,
  earlierExperience,
  education,
  experience,
  profile,
  skills,
  spokenLanguages,
} from '@/content/profile';
import { getDictionary } from '@/i18n/dictionaries';
import { formatNumber, interpolate } from '@/lib/format';
import { alternatesFor } from '@/lib/site';
import { getStackOverflowStats, getYearsOfExperience } from '@/lib/stats';

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getDictionary();
  return { title: t.about.title, alternates: alternatesFor(locale, '/about') };
}

const certRow = 'flex flex-wrap justify-between gap-x-4 py-3';

export default async function AboutPage() {
  const { locale, t } = await getDictionary();
  const [years, so] = await Promise.all([getYearsOfExperience(), getStackOverflowStats()]);
  const highlighted = certifications.filter((cert) => cert.highlight);
  const otherCerts = certifications.filter((cert) => !cert.highlight);
  const summary = [
    { label: t.about.summary.role, value: t.about.summary.roleValue },
    { label: t.about.summary.experience, value: interpolate(t.about.summary.experienceValue, { years }) },
    { label: t.about.summary.location, value: t.about.summary.locationValue },
    { label: t.about.summary.languages, value: t.about.summary.languagesValue },
  ];

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-x-16">
      <div className="lg:col-start-1">
        <h1 className={pageTitleClass}>{t.about.title}</h1>
        <div className="mt-8 max-w-[62ch] space-y-5 text-lg leading-relaxed">
          {t.about.bio.map((paragraph, index) => (
            <p key={paragraph.slice(0, 24)} className={index === 0 ? undefined : 'text-muted'}>
              {interpolate(paragraph, { years })}
            </p>
          ))}
        </div>
      </div>

      <aside
        aria-labelledby="summary-title"
        className="mt-12 rounded-2xl border border-border p-6 lg:sticky lg:top-8 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-2 lg:self-start"
      >
        <h2 id="summary-title" className="font-mono text-sm text-accent">
          {t.about.summaryTitle}
        </h2>
        <dl className="mt-4 space-y-4">
          {summary.map((item) => (
            <div key={item.label}>
              <dt className="text-sm text-muted">{item.label}</dt>
              <dd className="font-medium">{item.value}</dd>
            </div>
          ))}
        </dl>
        <div className="no-print mt-6">
          <CvLink locale={locale} label={t.cv.download} format={t.cv.format} variant="primary" />
        </div>
      </aside>

      <div className="lg:col-start-1 lg:row-start-2">
        <section aria-labelledby="skills-title" className="mt-24">
          <SectionHeading id="skills-title" eyebrow={t.about.skillsEyebrow} title={t.about.skillsTitle} />
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {skills.map((group, index) => (
              <div key={group.name.en} className={index === 0 ? 'sm:col-span-2' : undefined}>
                <h3 className="font-semibold">{group.name[locale]}</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {group.items[locale].map((skill) => (
                    <li key={skill} className="rounded-full border border-border px-3 py-1 text-sm">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="experience-title" className="mt-24">
          <SectionHeading id="experience-title" eyebrow={t.about.experienceEyebrow} title={t.about.experienceTitle} />
          <div className="mt-10">
            <ExperienceList
              items={experience}
              locale={locale}
              present={t.about.present}
              stackLabel={t.work.stackLabel}
            />
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
            <div className="px-6 pt-4 pb-8">
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
          <SectionHeading id="education-title" eyebrow={t.about.educationEyebrow} title={t.about.educationTitle} />
          <p className="mt-8 font-medium">{education.degree[locale]}</p>
          <p className="text-muted">
            {education.school} · {education.location[locale]} ·{' '}
            <span className="tabular-nums">
              {education.start}–{education.end}
            </span>
          </p>
        </section>

        <section aria-labelledby="certifications-title" className="mt-24">
          <SectionHeading
            id="certifications-title"
            eyebrow={t.about.certificationsEyebrow}
            title={t.about.certificationsTitle}
          />
          <ul className="mt-8 divide-y divide-border border-y border-border">
            {highlighted.map((cert) => (
              <li key={cert.name} className={certRow}>
                <span lang={cert.lang ?? 'en'} className="font-medium">
                  {cert.name}
                </span>
                <span className="text-sm text-muted">{[cert.issuer, cert.year].filter(Boolean).join(' · ')}</span>
              </li>
            ))}
          </ul>
          <details className="group mt-4">
            <summary className="inline-flex min-h-11 cursor-pointer items-center gap-2 font-medium">
              {interpolate(t.about.moreCertifications, { count: otherCerts.length })}
              <span
                aria-hidden="true"
                className="text-muted transition-transform group-open:rotate-45 motion-reduce:transition-none"
              >
                +
              </span>
            </summary>
            <ul className="divide-y divide-border">
              {otherCerts.map((cert) => (
                <li key={cert.name} className={certRow}>
                  <span lang={cert.lang ?? 'en'}>{cert.name}</span>
                  <span className="text-sm text-muted">{[cert.issuer, cert.year].filter(Boolean).join(' · ')}</span>
                </li>
              ))}
            </ul>
          </details>
        </section>

        <section aria-labelledby="languages-title" className="mt-24">
          <SectionHeading id="languages-title" eyebrow={t.about.languagesEyebrow} title={t.about.languagesTitle} />
          <dl className="mt-8 grid grid-cols-[auto_1fr] gap-x-8 gap-y-3">
            {spokenLanguages.map((language) => (
              <div key={language.name.en} className="contents">
                <dt className="font-medium">{language.name[locale]}</dt>
                <dd className="text-muted">{language.level[locale]}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="community-title" className="mt-24">
          <SectionHeading id="community-title" eyebrow={t.about.communityEyebrow} title={t.about.communityTitle} />
          <ul className="mt-8 space-y-4">
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
      </div>
    </div>
  );
}
