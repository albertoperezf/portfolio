import { ImageResponse } from 'next/og';
import { isLocale } from '@/i18n/config';
import { getProject, projects } from '@/content/projects';

export const alt = 'Case study · Alberto Pérez Faria';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return projects.filter((project) => project.caseStudy).map((project) => ({ slug: project.slug }));
}

export default async function CaseStudyImage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  const lang = isLocale(locale) ? locale : 'en';

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 80,
        background: '#0c0a09',
        color: '#f5f5f4',
      }}
    >
      <div style={{ fontSize: 30, color: '#fb923c' }}>{project?.kind[lang] ?? ''}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ fontSize: 80, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>{project?.name ?? ''}</div>
        <div style={{ fontSize: 30, color: '#a8a29e', lineHeight: 1.35 }}>{project?.summary[lang] ?? ''}</div>
      </div>
      <div style={{ fontSize: 28, color: '#a8a29e' }}>Alberto Pérez Faria · Senior Frontend Developer</div>
    </div>,
    size,
  );
}
