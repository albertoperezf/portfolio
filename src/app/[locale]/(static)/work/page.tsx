import type { Metadata } from 'next';
import Link from 'next/link';
import { TechList } from '@/components/tech-list';
import { projects } from '@/content/projects';
import { getDictionary } from '@/i18n/dictionaries';
import { alternatesFor, localizedPath } from '@/lib/site';

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getDictionary();
  return { title: t.work.title, alternates: alternatesFor(locale, '/work') };
}

export default async function WorkPage() {
  const { locale, t } = await getDictionary();

  return (
    <>
      <h1 className="text-[clamp(2.25rem,6vw,3.5rem)] leading-tight font-semibold tracking-tighter">{t.work.title}</h1>
      <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-muted">{t.work.intro}</p>

      <ul className="mt-14 space-y-8">
        {projects.map((project) => (
          <li key={project.slug}>
            <article className="rounded-2xl border border-border p-6 sm:p-8">
              <p className="text-sm text-muted">{project.kind[locale]}</p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight">{project.name}</h2>
              <p className="mt-3 leading-relaxed text-muted">{project.summary[locale]}</p>
              <TechList items={project.tech} label={t.work.stackLabel} />
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-medium">
                {project.caseStudy && (
                  <Link href={localizedPath(locale, `/work/${project.slug}`)} className="link">
                    {t.work.caseStudy}
                    <span className="sr-only">: {project.name}</span>
                  </Link>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} className="link">
                    {t.work.live}
                    <span className="sr-only">: {project.name}</span>
                  </a>
                )}
                {!project.liveUrl && !project.caseStudy && <p className="font-normal text-muted">{t.work.noDemo}</p>}
              </div>
            </article>
          </li>
        ))}
      </ul>
    </>
  );
}
