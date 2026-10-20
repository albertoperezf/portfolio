import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { TechList } from '@/components/tech-list';
import { getProject, projects } from '@/content/projects';
import { getDictionary } from '@/i18n/dictionaries';
import { alternatesFor, localizedPath } from '@/lib/site';

export async function generateStaticParams() {
  return projects.filter((project) => project.caseStudy).map((project) => ({ slug: project.slug }));
}

async function loadCaseStudy(params: PageProps<'/[locale]/work/[slug]'>['params']) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project?.caseStudy) notFound();
  return { project, caseStudy: project.caseStudy };
}

export async function generateMetadata({ params }: PageProps<'/[locale]/work/[slug]'>): Promise<Metadata> {
  const { locale } = await getDictionary();
  const { project } = await loadCaseStudy(params);
  return {
    title: project.name,
    description: project.summary[locale],
    alternates: alternatesFor(locale, `/work/${project.slug}`),
  };
}

export default async function CaseStudyPage({ params }: PageProps<'/[locale]/work/[slug]'>) {
  const { locale, t } = await getDictionary();
  const { project, caseStudy } = await loadCaseStudy(params);

  return (
    <article>
      <Link href={localizedPath(locale, '/work')} className="link text-sm text-muted">
        <span aria-hidden="true">← </span>
        {t.work.backToWork}
      </Link>
      <p className="mt-10 text-sm text-muted">{project.kind[locale]}</p>
      <h1 className="mt-2 text-[clamp(2.25rem,6vw,3.5rem)] leading-tight font-semibold tracking-tighter text-balance">
        {project.name}
      </h1>
      <p className="mt-6 max-w-[65ch] text-lg leading-relaxed text-muted">{caseStudy.intro[locale]}</p>
      <TechList items={project.tech} label={t.work.stackLabel} />

      {caseStudy.sections.map((section, index) => (
        <section key={section.heading.en} aria-labelledby={`section-${index}`} className="mt-16">
          <h2 id={`section-${index}`} className="text-2xl font-semibold tracking-tight">
            {section.heading[locale]}
          </h2>
          {section.body && <p className="mt-4 max-w-[65ch] leading-relaxed text-muted">{section.body[locale]}</p>}
          {section.items && (
            <ul className="mt-6 max-w-[65ch] list-disc space-y-3 pl-5 leading-relaxed text-muted marker:text-accent">
              {section.items[locale].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </section>
      ))}

      {caseStudy.screenshots.length > 0 && (
        <section aria-labelledby="screenshots-title" className="mt-16">
          <h2 id="screenshots-title" className="text-2xl font-semibold tracking-tight">
            {t.work.screenshotsTitle}
          </h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            {caseStudy.screenshots.map((shot) => (
              <figure key={shot.src}>
                <Image
                  src={shot.src}
                  width={shot.width}
                  height={shot.height}
                  alt={shot.alt[locale]}
                  sizes="(min-width: 640px) 336px, 100vw"
                  className="rounded-xl border border-border"
                />
                <figcaption className="mt-3 text-sm text-muted">{shot.caption[locale]}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      <section aria-labelledby="links-title" className="mt-16">
        <h2 id="links-title" className="text-2xl font-semibold tracking-tight">
          {t.work.linksTitle}
        </h2>
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-medium">
          {project.liveUrl && (
            <li>
              <a href={project.liveUrl} className="link">
                {t.work.live}
              </a>
            </li>
          )}
          {project.sourceUrl && (
            <li>
              <a href={project.sourceUrl} className="link">
                {t.work.source}
              </a>
            </li>
          )}
        </ul>
      </section>
    </article>
  );
}
