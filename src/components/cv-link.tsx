import { cvPath } from '@/content/profile';
import type { Locale } from '@/i18n/config';
import { DownloadIcon } from './icons';

const variants = {
  primary: 'bg-fg text-bg hover:opacity-90',
  secondary: 'border border-control hover:bg-surface',
} as const;

export function CvLink({
  locale,
  label,
  format,
  variant = 'secondary',
}: {
  locale: Locale;
  label: string;
  format: string;
  variant?: keyof typeof variants;
}) {
  return (
    <a
      href={cvPath(locale)}
      download
      type="application/pdf"
      hrefLang={locale}
      className={`inline-flex min-h-11 items-center gap-2 rounded-full px-6 font-medium ${variants[variant]}`}
    >
      <DownloadIcon className="size-4" />
      {label}
      <span className="text-sm opacity-70">({format})</span>
    </a>
  );
}
