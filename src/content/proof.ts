import type { BrandName } from '@/components/brand-icons';

export interface Company {
  name: string;
  logo: string;
  /** Intrinsic size of the SVG. */
  width: number;
  height: number;
  /** Rendered height in px, tuned so every mark has a similar visual weight. */
  display: number;
}

export const employers: Company[] = [
  { name: 'Cognizant', logo: '/logos/cognizant.svg', width: 246, height: 44, display: 30 },
  { name: 'GFT', logo: '/logos/gft.svg', width: 1024, height: 197, display: 34 },
];

export const clients: Company[] = [
  { name: 'Inditex', logo: '/logos/inditex.svg', width: 1021, height: 211, display: 18 },
  { name: 'J.P. Morgan Chase', logo: '/logos/jpmorgan.svg', width: 1000, height: 142, display: 20 },
  { name: 'DBS', logo: '/logos/dbs.svg', width: 579, height: 173, display: 26 },
  { name: 'Bankia', logo: '/logos/bankia.svg', width: 300, height: 108, display: 30 },
];

export interface StackItem {
  name: string;
  icon: BrandName;
}

/** The technologies I work with every day. */
export const coreStack: StackItem[] = [
  { name: 'React', icon: 'react' },
  { name: 'TypeScript', icon: 'typescript' },
  { name: 'Next.js', icon: 'nextdotjs' },
];

/** The modern stack behind this site and my side projects. */
export const modernStack: (StackItem & { version?: string })[] = [
  { name: 'Next.js', version: '16', icon: 'nextdotjs' },
  { name: 'React', version: '19', icon: 'react' },
  { name: 'TypeScript', version: '5', icon: 'typescript' },
  { name: 'Tailwind CSS', version: '4', icon: 'tailwindcss' },
  { name: 'PostgreSQL', icon: 'postgresql' },
  { name: 'Vercel', icon: 'vercel' },
  { name: 'Vitest', icon: 'vitest' },
  { name: 'Lighthouse CI', icon: 'lighthouse' },
];

/** Lighthouse (mobile) scores of this site, measured against the production build. */
export const lighthouse = {
  measured: '2026-11-27',
  scores: { performance: 95, accessibility: 100, bestPractices: 100, seo: 100 },
};
