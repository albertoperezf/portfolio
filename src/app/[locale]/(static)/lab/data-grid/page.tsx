import type { Metadata } from 'next';
import Link from 'next/link';
import { DataGrid } from '@/components/data-grid';
import { pageTitleClass } from '@/components/typography';
import { getDictionary } from '@/i18n/dictionaries';
import { alternatesFor, localizedPath } from '@/lib/site';

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getDictionary();
  return { title: t.lab.title, description: t.lab.intro, alternates: alternatesFor(locale, '/lab/data-grid') };
}

export default async function DataGridPage() {
  const { locale, t } = await getDictionary();

  return (
    <article>
      <Link href={localizedPath(locale, '/work')} className="link text-sm text-muted">
        <span aria-hidden="true">← </span>
        {t.work.backToWork}
      </Link>
      <p className="mt-10 font-mono text-sm text-muted">{t.lab.eyebrow}</p>
      <h1 className={`mt-3 ${pageTitleClass}`}>{t.lab.title}</h1>
      <p className="mt-6 max-w-[62ch] text-lg leading-relaxed sm:text-xl">{t.lab.intro}</p>
      <p className="mt-4 max-w-[62ch] leading-relaxed text-muted">{t.lab.instructions}</p>

      <div className="mt-12">
        <DataGrid copy={t.lab} locale={locale} />
      </div>

      <section aria-labelledby="how-title" className="mt-20 max-w-3xl">
        <h2 id="how-title" className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {t.lab.howTitle}
        </h2>
        <ul className="mt-6 list-disc space-y-3 pl-5 leading-relaxed marker:text-accent">
          {t.lab.how.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </article>
  );
}
