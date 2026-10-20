import type { Metadata } from 'next';
import { pageTitleClass } from '@/components/typography';
import { getDictionary } from '@/i18n/dictionaries';
import { interpolate } from '@/lib/format';
import { alternatesFor, buildDate } from '@/lib/site';

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getDictionary();
  return { title: t.accessibility.title, alternates: alternatesFor(locale, '/accessibility') };
}

export default async function AccessibilityPage() {
  const { locale, t } = await getDictionary();
  const reviewed = new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(buildDate));

  return (
    <article className="max-w-3xl">
      <h1 className={pageTitleClass}>{t.accessibility.title}</h1>
      <p className="mt-6 text-lg leading-relaxed sm:text-xl">{t.accessibility.intro}</p>
      {t.accessibility.sections.map((section, index) => (
        <section key={section.heading} aria-labelledby={`a11y-${index}`} className="mt-14">
          <h2 id={`a11y-${index}`} className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {section.heading}
          </h2>
          {section.body && <p className="mt-4 leading-relaxed text-muted">{section.body}</p>}
          {section.items && (
            <ul className="mt-6 list-disc space-y-3 pl-5 leading-relaxed marker:text-accent">
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
      <p className="mt-14 text-sm text-muted">
        <time dateTime={buildDate.slice(0, 10)}>{interpolate(t.accessibility.reviewed, { date: reviewed })}</time>
      </p>
    </article>
  );
}
