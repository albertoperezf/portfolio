import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { en } from '@/i18n/dictionaries/en';
import { es } from '@/i18n/dictionaries/es';
import { earlierProjects, experiments, projects } from '@/content/projects';
import { experience, earlierExperience, skills } from '@/content/profile';

function leaves(value: unknown, path = ''): [string, unknown][] {
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, child]) => leaves(child, path ? `${path}.${key}` : key));
  }
  return [[path, value]];
}

describe('dictionaries', () => {
  it('have the same keys in both languages', () => {
    expect(leaves(es).map(([key]) => key)).toEqual(leaves(en).map(([key]) => key));
  });

  it.each([
    ['en', en],
    ['es', es],
  ])('%s has no empty strings', (_, dictionary) => {
    for (const [key, value] of leaves(dictionary)) {
      expect(value, key).toEqual(expect.stringMatching(/\S/));
    }
  });
});

describe('content', () => {
  it('translates every localized field', () => {
    const localized = [
      ...experience,
      ...earlierExperience,
      ...projects,
      ...skills,
      ...experiments,
      ...earlierProjects,
    ].flatMap((item) => leaves(item));
    const enKeys = localized.filter(([key]) => key.endsWith('.en') || key.includes('.en.')).map(([key]) => key);
    for (const key of enKeys) {
      const esKey = key.replace(/\.en(\.|$)/, '.es$1');
      expect(
        localized.some(([k]) => k === esKey),
        esKey,
      ).toBe(true);
    }
  });

  it('references images that exist in /public', () => {
    const paths = projects.flatMap((project) => [
      ...(project.thumbnail ? [project.thumbnail.light, project.thumbnail.dark] : []),
      ...(project.caseStudy?.screenshots.map((shot) => shot.src) ?? []),
    ]);
    for (const path of paths) {
      expect(existsSync(join(process.cwd(), 'public', path)), path).toBe(true);
    }
  });
});
