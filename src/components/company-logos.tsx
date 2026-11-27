import Image from 'next/image';
import type { Company } from '@/content/proof';

/** Logos sit on a light tile so the brand colours stay correct in both themes. */
export function CompanyLogos({
  companies,
  label,
  className = 'grid-cols-2',
}: {
  companies: Company[];
  label: string;
  /** Grid columns; narrow panels can stack the tiles so each logo gets more room. */
  className?: string;
}) {
  return (
    <ul aria-label={label} className={`grid gap-3 ${className}`}>
      {companies.map((company) => (
        <li
          key={company.name}
          className="lift flex h-16 items-center justify-center rounded-xl border border-border bg-tile px-4"
        >
          <Image
            src={company.logo}
            alt={company.name}
            width={company.width}
            height={company.height}
            unoptimized
            style={{ height: company.display, width: 'auto' }}
            className="max-w-full"
          />
        </li>
      ))}
    </ul>
  );
}
