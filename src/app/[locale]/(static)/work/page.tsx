import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRightIcon, GridIcon } from '@/components/icons';
import { ProjectCard } from '@/components/project-card';
import { TechList } from '@/components/tech-list';
import { pageTitleClass, SectionHeading } from '@/components/typography';
import { earlierProjects, experiments, projects } from '@/content/projects';
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
      <h1 className={pageTitleClass}>{t.work.title}</h1>
      <p className="mt-6 max-w-[60ch] text-lg leading-relaxed sm:text-xl">{t.work.intro}</p>

      <section aria-labelledby="projects-title" className="mt-20">
        <SectionHeading id="projects-title" eyebrow={t.work.projectsEyebrow} title={t.work.projectsTitle} />
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <li key={project.slug}>
              <ProjectCard project={project} locale={locale} copy={t.work} priority={index === 0} />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="lab-title" className="mt-28">
        <SectionHeading id="lab-title" eyebrow={t.work.labEyebrow} title={t.work.labTitle} />
        <p className="mt-4 max-w-[60ch] leading-relaxed text-muted">{t.work.labIntro}</p>
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {experiments.map((experiment) => (
            <li key={experiment.slug}>
              <article className="group relative flex h-full flex-col rounded-2xl border border-border p-6 transition-colors hover:border-control sm:p-8">
                <span className="inline-flex size-11 items-center justify-center rounded-full bg-surface text-accent">
                  <GridIcon />
                </span>
                <h3 className="mt-5 text-xl font-semibold tracking-tight">
                  <Link
                    href={localizedPath(locale, `/lab/${experiment.slug}`)}
                    className="outline-none after:absolute after:inset-0 after:rounded-2xl focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent"
                  >
                    {experiment.name[locale]}
                  </Link>
                </h3>
                <p className="mt-3 leading-relaxed text-muted">{experiment.summary[locale]}</p>
                <TechList items={experiment.tech} label={t.work.stackLabel} />
                <span aria-hidden="true" className="mt-auto inline-flex items-center gap-2 pt-6 font-medium">
                  {t.work.tryDemo}
                  <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
                </span>
              </article>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="earlier-title" className="mt-28">
        <SectionHeading id="earlier-title" eyebrow={t.work.earlierEyebrow} title={t.work.earlierTitle} />
        <p className="mt-4 max-w-[60ch] leading-relaxed text-muted">{t.work.earlierIntro}</p>
        <ul className="mt-8 divide-y divide-border border-y border-border">
          {earlierProjects.map((project) => (
            <li
              key={project.name}
              className="grid gap-x-6 gap-y-1 py-4 sm:grid-cols-[12rem_1fr_auto] sm:items-baseline"
            >
              <a href={project.url} className="link font-mono text-sm font-medium" lang="en">
                {project.name}
              </a>
              <p className="text-muted">{project.summary[locale]}</p>
              <span className="text-sm text-muted tabular-nums">{project.year}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
