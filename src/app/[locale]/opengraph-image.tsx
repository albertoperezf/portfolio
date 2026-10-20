import { ImageResponse } from 'next/og';
import { isLocale, locales } from '@/i18n/config';
import { en } from '@/i18n/dictionaries/en';
import { es } from '@/i18n/dictionaries/es';
import { profile } from '@/content/profile';

export const alt = 'Alberto Pérez Faria · Senior Frontend Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = isLocale(locale) && locale === 'es' ? es : en;

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
      <div style={{ fontSize: 32, color: '#fb923c' }}>{t.home.eyebrow}</div>
      <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>{t.home.title}</div>
      <div style={{ fontSize: 32, color: '#a8a29e' }}>{profile.name}</div>
    </div>,
    size,
  );
}
