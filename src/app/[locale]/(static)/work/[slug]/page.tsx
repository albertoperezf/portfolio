import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ViewTransition } from 'react';
import { ArrowRightIcon } from '@/components/icons';
import { TechList } from '@/components/tech-list';
import { ThemedImage } from '@/components/themed-image';
import { pageTitleClass } from '@/components/typography';
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

const buttonClass = 'inline-flex min-h-11 items-center gap-2 rounded-full px-6 font-medium';

export default async function CaseStudyPage({ params }: PageProps<'/[locale]/work/[slug]'>) {
  const { locale, t } = await getDictionary();
  const { project, caseStudy } = await loadCaseStudy(params);
  const screenshots = caseStudy.screenshots.filter((shot) => shot.src !== project.thumbnail?.light);

  return (
    <article>
      <Link href={localizedPath(locale, '/work')} className="link text-sm text-muted">
        <span aria-hidden="true">← </span>
        {t.work.backToWork}
      </Link>
      <p className="mt-10 font-mono text-sm text-muted">{project.kind[locale]}</p>
      <h1 className={`mt-3 ${pageTitleClass}`}>{project.name}</h1>
      <p className="mt-6 max-w-[62ch] text-lg leading-relaxed sm:text-xl">{caseStudy.intro[locale]}</p>

      {(project.liveUrl || project.sourceUrl) && (
        <div className="mt-8 flex flex-wrap gap-3">
          {project.liveUrl && (
            <a href={project.liveUrl} className={`${buttonClass} bg-fg text-bg hover:opacity-90`}>
              {t.work.live}
              <ArrowRightIcon className="size-4" />
            </a>
          )}
          {project.sourceUrl && (
            <a href={project.sourceUrl} className={`${buttonClass} border border-control hover:bg-surface`}>
              {t.work.source}
            </a>
          )}
        </div>
      )}

      <dl className="mt-12 grid gap-6 border-t border-border pt-8 md:grid-cols-[1fr_2fr]">
        <div>
          <dt className="text-sm text-muted">{t.work.roleTitle}</dt>
          <dd className="mt-1 font-medium">{caseStudy.role[locale]}</dd>
        </div>
        <div>
          <dt className="text-sm text-muted">{t.work.stackLabel}</dt>
          <dd className="-mt-3">
            <TechList items={project.tech} label={t.work.stackLabel} />
          </dd>
        </div>
      </dl>

      {project.thumbnail && (
        <ViewTransition name={`project-${project.slug}`} share="morph" default="none">
          <a
            href={project.thumbnail.light}
            className="mt-12 block overflow-hidden rounded-2xl border border-border bg-surface"
          >
            <ThemedImage
              {...project.thumbnail}
              alt={project.thumbnail.alt[locale]}
              sizes="(min-width: 1024px) 976px, 100vw"
              eager
              className="h-auto w-full"
            />
            <span className="sr-only">{t.a11y.openFullSize}</span>
          </a>
        </ViewTransition>
      )}

      <div className="mt-8 max-w-3xl">
        {caseStudy.sections.map((section, index) => (
          <section key={section.heading.en} aria-labelledby={`section-${index}`} className="mt-16">
            <h2 id={`section-${index}`} className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {section.heading[locale]}
            </h2>
            {section.body && <p className="mt-4 leading-relaxed text-muted">{section.body[locale]}</p>}
            {section.items && (
              <ul className="mt-6 list-disc space-y-3 pl-5 leading-relaxed marker:text-accent">
                {section.items[locale].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      {screenshots.length > 0 && (
        <section aria-labelledby="screenshots-title" className="mt-20">
          <h2 id="screenshots-title" className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {t.work.screenshotsTitle}
          </h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {screenshots.map((shot) => (
              <figure key={shot.src} className={shot.wide ? 'sm:col-span-2 lg:col-span-3' : undefined}>
                <a href={shot.src} className="block overflow-hidden rounded-xl border border-border">
                  <Image
                    src={shot.src}
                    width={shot.width}
                    height={shot.height}
                    alt={shot.alt[locale]}
                    sizes={
                      shot.wide
                        ? '(min-width: 1024px) 976px, 100vw'
                        : '(min-width: 1024px) 310px, (min-width: 640px) 50vw, 100vw'
                    }
                    className="h-auto w-full"
                  />
                  <span className="sr-only">{t.a11y.openFullSize}</span>
                </a>
                <figcaption className="mt-3 text-sm text-muted">{shot.caption[locale]}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
