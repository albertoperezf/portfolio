import { renderToBuffer } from '@react-pdf/renderer';
import { cacheLife } from 'next/cache';
import { isLocale, locales, type Locale } from '@/i18n/config';
import { en } from '@/i18n/dictionaries/en';
import { es } from '@/i18n/dictionaries/es';
import { cvPath } from '@/content/profile';
import { CvDocument } from '@/lib/cv/cv-document';
import { siteUrl } from '@/lib/site';
import { getYearsOfExperience } from '@/lib/stats';

const fileName = (locale: Locale) => cvPath(locale).split('/').pop()!;

export function generateStaticParams() {
  return locales.map((locale) => ({ file: fileName(locale) }));
}

// Cached so the PDF (and react-pdf's creation timestamp) is produced once at build time.
async function renderCv(locale: Locale): Promise<Uint8Array> {
  'use cache';
  cacheLife('weeks');
  const years = await getYearsOfExperience();
  const buffer = await renderToBuffer(
    <CvDocument locale={locale} t={locale === 'es' ? es : en} years={years} siteUrl={siteUrl} />,
  );
  return new Uint8Array(buffer);
}

export async function GET(_request: Request, { params }: RouteContext<'/cv/[file]'>) {
  const { file } = await params;
  const locale = locales.find((l) => fileName(l) === file);
  if (!isLocale(locale)) return new Response('Not found', { status: 404 });

  const pdf = await renderCv(locale);
  return new Response(pdf as BodyInit, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="${file}"`,
    },
  });
}
