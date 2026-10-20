import { renderToBuffer } from '@react-pdf/renderer';
import { describe, expect, it } from 'vitest';
import { cvPath } from '@/content/profile';
import { CvDocument } from '@/lib/cv/cv-document';
import { en } from '@/i18n/dictionaries/en';
import { es } from '@/i18n/dictionaries/es';

describe('CV', () => {
  it('has one file per language', () => {
    expect(cvPath('en')).toBe('/cv/alberto-perez-faria-cv-en.pdf');
    expect(cvPath('es')).toBe('/cv/alberto-perez-faria-cv-es.pdf');
  });

  it.each([
    ['en', en],
    ['es', es],
  ] as const)('renders a %s PDF from the site content', async (locale, t) => {
    const pdf = await renderToBuffer(<CvDocument locale={locale} t={t} years={11} siteUrl="https://example.com" />);
    expect(pdf.subarray(0, 5).toString()).toBe('%PDF-');
    expect(pdf.length).toBeGreaterThan(5000);
  });
});
