import type { Experience } from '@/content/profile';
import type { Locale } from '@/i18n/config';
import { formatMonthYear } from '@/lib/format';
import { TechList } from './tech-list';

function Period({ start, end, locale, present }: { start: string; end?: string; locale: Locale; present: string }) {
  return (
    <>
      <time dateTime={start}>{formatMonthYear(start, locale)}</time>
      {' – '}
      {end ? <time dateTime={end}>{formatMonthYear(end, locale)}</time> : present}
    </>
  );
}

export function ExperienceList({
  items,
  locale,
  present,
  stackLabel,
}: {
  items: Experience[];
  locale: Locale;
  present: string;
  stackLabel: string;
}) {
  return (
    <ol className="space-y-12">
      {items.map((item) => (
        <li key={item.id}>
          <article>
            <h3 className="text-lg font-semibold tracking-tight">{item.company}</h3>
            <p className="text-sm text-muted">{item.location[locale]}</p>
            <ul className="mt-3 space-y-1">
              {item.roles.map((role) => (
                <li key={`${role.title.en}-${role.start}`} className="flex flex-wrap justify-between gap-x-4">
                  <span className="font-medium">{role.title[locale]}</span>
                  <span className="text-sm text-muted tabular-nums">
                    <Period start={role.start} end={role.end} locale={locale} present={present} />
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 leading-relaxed text-muted">{item.description[locale]}</p>
            {item.tech && <TechList items={item.tech} label={stackLabel} />}
          </article>
        </li>
      ))}
    </ol>
  );
}
