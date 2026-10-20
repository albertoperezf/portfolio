import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { locales } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { alternatesFor, siteUrl } from '@/lib/site';
import { themeScript } from '@/lib/theme';
import '../globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getDictionary();
  return {
    metadataBase: new URL(siteUrl),
    title: { default: t.meta.siteTitle, template: `%s · ${t.meta.siteTitle.split(' · ')[0]}` },
    description: t.meta.description,
    alternates: alternatesFor(locale, '/'),
    openGraph: {
      type: 'website',
      siteName: t.meta.siteTitle,
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      alternateLocale: locale === 'es' ? 'en_US' : 'es_ES',
    },
    twitter: { card: 'summary_large_image' },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafaf9' },
    { media: '(prefers-color-scheme: dark)', color: '#0c0a09' },
  ],
};

export default async function LocaleLayout({ children }: LayoutProps<'/[locale]'>) {
  const { locale, t } = await getDictionary();

  return (
    <html lang={locale} className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-dvh flex-col antialiased">
        <a
          href="#main"
          className="sr-only z-50 rounded bg-fg px-4 py-3 text-bg focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          {t.a11y.skipToContent}
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="mx-auto w-full max-w-3xl flex-1 px-6 pt-16 outline-none sm:pt-24">
          {children}
        </main>
        <SiteFooter />
        {/* The analytics scripts are served by Vercel only; skip them locally and in CI. */}
        {process.env.VERCEL && (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        )}
      </body>
    </html>
  );
}
