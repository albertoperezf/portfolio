import Link from 'next/link';
import { ViewTransition } from 'react';
import type { Project } from '@/content/projects';
import type { Locale } from '@/i18n/config';
import { localizedPath } from '@/lib/site';
import { ArrowRightIcon } from './icons';
import { TechList } from './tech-list';
import { ThemedImage } from './themed-image';

export interface ProjectCardCopy {
  caseStudy: string;
  live: string;
  source: string;
  noDemo: string;
  stackLabel: string;
}

/** The whole card is clickable through a stretched primary link; secondary links sit above it. */
export function ProjectCard({
  project,
  locale,
  copy,
  headingLevel: Heading = 'h3',
  priority = false,
}: {
  project: Project;
  locale: Locale;
  copy: ProjectCardCopy;
  headingLevel?: 'h2' | 'h3';
  priority?: boolean;
}) {
  const href = project.caseStudy ? localizedPath(locale, `/work/${project.slug}`) : undefined;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border transition-colors hover:border-control has-[a:focus-visible]:border-control">
      {project.thumbnail && (
        <ViewTransition name={`project-${project.slug}`} share="morph" default="none">
          <div className="aspect-[2/1] overflow-hidden border-b border-border bg-surface">
            <ThemedImage
              {...project.thumbnail}
              alt=""
              eager={priority}
              sizes="(min-width: 1024px) 480px, (min-width: 640px) 50vw, 100vw"
              className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none"
            />
          </div>
        </ViewTransition>
      )}
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <p className="text-sm text-muted">{project.kind[locale]}</p>
        <Heading className="mt-2 text-xl font-semibold tracking-tight">
          {href ? (
            <Link
              href={href}
              className="outline-none after:absolute after:inset-0 after:rounded-2xl focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent"
            >
              {project.name}
            </Link>
          ) : (
            project.name
          )}
        </Heading>
        <p className="mt-3 leading-relaxed text-muted">{project.summary[locale]}</p>
        <TechList items={project.tech} label={copy.stackLabel} />
        <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 font-medium">
          {href && (
            <span aria-hidden="true" className="inline-flex items-center gap-2 text-fg">
              {copy.caseStudy}
              <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
            </span>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} className="link relative z-10">
              {copy.live}
              <span className="sr-only">: {project.name}</span>
            </a>
          )}
          {project.sourceUrl && (
            <a href={project.sourceUrl} className="link relative z-10">
              {copy.source}
              <span className="sr-only">: {project.name}</span>
            </a>
          )}
          {!href && !project.liveUrl && !project.sourceUrl && <p className="font-normal text-muted">{copy.noDemo}</p>}
        </div>
      </div>
    </article>
  );
}
