import type { Locale } from '@/i18n/config';

export type Localized<T = string> = Record<Locale, T>;

export const profile = {
  name: 'Alberto Pérez Faria',
  fullName: 'Alberto José Pérez Faria',
  initials: 'AP',
  location: { city: 'Madrid', country: 'ES' },
  // First professional frontend work (freelance); drives the "years of experience" figure.
  careerStart: '2015-01-01',
  links: {
    github: 'https://github.com/albertoperezf',
    linkedin: 'https://www.linkedin.com/in/albertojpf',
    stackOverflow: 'https://stackoverflow.com/users/6450931/alberto-perez',
  },
  sourceUrl: 'https://github.com/albertoperezf/portfolio',
  stackOverflowUserId: 6450931,
} as const;

/** Public path of the CV generated from this content (see src/app/cv). */
export function cvPath(locale: Locale): string {
  return `/cv/alberto-perez-faria-cv-${locale}.pdf`;
}

export interface Role {
  title: Localized;
  start: string;
  end?: string;
}

export interface Experience {
  id: string;
  company: string;
  url?: string;
  location: Localized;
  roles: Role[];
  description: Localized;
  tech?: string[];
}

export const experience: Experience[] = [
  {
    id: 'cognizant',
    company: 'Cognizant',
    url: 'https://www.cognizant.com',
    location: { en: 'Madrid, Spain (remote)', es: 'Madrid, España (remoto)' },
    roles: [{ title: { en: 'Senior Frontend Developer', es: 'Senior Frontend Developer' }, start: '2023-12' }],
    description: {
      en: 'New features and maintenance for Ranking, a data-heavy internal web application of the Inditex Group: dense data views, complex filters, exports, and performance and accessibility improvements.',
      es: 'Nuevas funcionalidades y mantenimiento de Ranking, una aplicación web interna del Grupo Inditex con gran volumen de datos: vistas densas, filtros complejos, exportaciones y mejoras de rendimiento y accesibilidad.',
    },
    tech: ['TypeScript', 'React', 'Redux', 'Sass', 'Jest', 'React Testing Library', 'GraphQL', 'REST', 'Webpack'],
  },
  {
    id: 'gft',
    company: 'GFT Group',
    url: 'https://www.gft.com',
    location: { en: 'Madrid, Spain', es: 'Madrid, España' },
    roles: [
      { title: { en: 'Senior Frontend Developer', es: 'Senior Frontend Developer' }, start: '2020-04', end: '2023-12' },
      { title: { en: 'Frontend Developer', es: 'Frontend Developer' }, start: '2019-05', end: '2020-03' },
    ],
    description: {
      en: 'React and Redux web applications for banking (Bankia, DBS, JP Morgan Chase) and real estate (FirstKey Homes) clients in Spain, Singapore and the USA, helping them through their digital transformation.',
      es: 'Aplicaciones web con React y Redux para clientes de banca (Bankia, DBS, JP Morgan Chase) e inmobiliarios (FirstKey Homes) en España, Singapur y Estados Unidos, acompañando su transformación digital.',
    },
    tech: ['TypeScript', 'React', 'Redux', 'Zustand', 'Next.js', 'Express', 'Ant Design', 'Styled Components', 'Jest'],
  },
  {
    id: 'medlab',
    company: 'MedLab Media Group',
    location: { en: 'Las Rozas, Madrid, Spain', es: 'Las Rozas, Madrid, España' },
    roles: [
      {
        title: { en: 'Project Manager & Scrum lead', es: 'Gestor de proyecto y responsable de Scrum' },
        start: '2017-08',
        end: '2019-04',
      },
      { title: { en: 'Frontend Developer', es: 'Frontend Developer' }, start: '2017-03', end: '2019-04' },
    ],
    description: {
      en: 'New features and maintenance for medlab.email, a platform for the healthcare sector. I also ran the team’s Scrum process: dailies, retrospectives and demos.',
      es: 'Nuevas funcionalidades y mantenimiento de medlab.email, una plataforma para el sector sanitario. También me encargué del proceso Scrum del equipo: dailies, retrospectivas y demos.',
    },
    tech: ['React', 'Redux', 'Flow', 'Meteor', 'GraphQL', 'PostCSS', 'Jest', 'Webpack'],
  },
  {
    id: 'easylife',
    company: 'Easylife',
    location: { en: 'Remote', es: 'Remoto' },
    roles: [{ title: { en: 'Frontend Developer', es: 'Frontend Developer' }, start: '2016-10', end: '2017-03' }],
    description: {
      en: 'Interfaces and features for “Easylife”, a hybrid mobile app for the commerce sector in the Colombian market.',
      es: 'Interfaces y funcionalidades para «Easylife», una app móvil híbrida para el sector comercio en el mercado colombiano.',
    },
    tech: ['Ionic', 'AngularJS', 'Sass'],
  },
  {
    id: 'tsserapp',
    company: 'Tsserapp',
    location: { en: 'Cabimas, Venezuela', es: 'Cabimas, Venezuela' },
    roles: [{ title: { en: 'Frontend Developer', es: 'Frontend Developer' }, start: '2016-04', end: '2016-09' }],
    description: {
      en: 'On-demand web projects built with AngularJS in a Scrum team.',
      es: 'Proyectos web a medida con AngularJS en un equipo Scrum.',
    },
    tech: ['AngularJS', 'Sass', 'Bootstrap', 'Grunt'],
  },
  {
    id: 'freelance',
    company: 'Freelance',
    location: { en: 'Venezuela', es: 'Venezuela' },
    roles: [{ title: { en: 'Frontend Developer', es: 'Frontend Developer' }, start: '2015-01', end: '2017-03' }],
    description: {
      en: 'Web (AngularJS, Bootstrap) and hybrid mobile (Ionic) applications for different clients.',
      es: 'Aplicaciones web (AngularJS, Bootstrap) y móviles híbridas (Ionic) para distintos clientes.',
    },
  },
];

export const earlierExperience: Experience[] = [
  {
    id: 'catabre',
    company: 'El Catabre',
    location: { en: 'Maracaibo, Venezuela', es: 'Maracaibo, Venezuela' },
    roles: [{ title: { en: 'Systems Analyst', es: 'Analista de sistemas' }, start: '2016-02', end: '2016-03' }],
    description: {
      en: 'Software development with PHP, SQL, JavaScript and Bootstrap.',
      es: 'Desarrollo de software con PHP, SQL, JavaScript y Bootstrap.',
    },
  },
  {
    id: 'energing',
    company: 'Energing Gas y Electricidad C.A.',
    location: { en: 'Maracaibo, Venezuela', es: 'Maracaibo, Venezuela' },
    roles: [
      { title: { en: 'Support Engineer', es: 'Ingeniero de soporte' }, start: '2015-05', end: '2016-02' },
      {
        title: { en: 'Health & Safety Delegate', es: 'Delegado de Prevención' },
        start: '2015-07',
        end: '2016-02',
      },
    ],
    description: {
      en: 'Administration of the Microsoft platform, SQL Server and Oracle databases and local networks. Elected workers’ representative on the health and safety committee.',
      es: 'Administración de la plataforma Microsoft, bases de datos SQL Server y Oracle y redes locales. Representante electo de los trabajadores en el comité de seguridad y salud.',
    },
  },
  {
    id: 'mandear',
    company: 'Mandear C.A.',
    location: { en: 'Venezuela', es: 'Venezuela' },
    roles: [{ title: { en: 'Web Developer', es: 'Desarrollador web' }, start: '2015-03', end: '2015-05' }],
    description: {
      en: 'Backend development with Python and Django.',
      es: 'Desarrollo backend con Python y Django.',
    },
  },
  {
    id: 'corpoelec',
    company: 'CORPOELEC',
    location: { en: 'Maracaibo, Venezuela', es: 'Maracaibo, Venezuela' },
    roles: [{ title: { en: 'Intern', es: 'Pasante' }, start: '2014-08', end: '2014-11' }],
    description: {
      en: 'Installation and maintenance of CCTV, motion sensors and attendance-control systems.',
      es: 'Instalación y mantenimiento de sistemas de televigilancia, sensores de movimiento y control de asistencia.',
    },
  },
];

export const education = {
  degree: { en: 'B.Eng. in Computer Engineering', es: 'Ingeniería de Computación' } satisfies Localized,
  school: 'Universidad Rafael Urdaneta',
  location: { en: 'Maracaibo, Venezuela', es: 'Maracaibo, Venezuela' } satisfies Localized,
  start: '2009',
  end: '2015',
};

export interface Certification {
  name: string;
  issuer?: string;
  year?: string;
  /** Language of the name, when it differs from the page language. */
  lang?: string;
  /** Shown up front; the rest are folded away. */
  highlight?: boolean;
}

export const certifications: Certification[] = [
  { name: 'Scrum Manager (#20288)', issuer: 'Scrum Manager', year: '2017', highlight: true },
  { name: 'EF SET English Certificate 80/100 (C2 Proficient)', issuer: 'EF', year: '2023', highlight: true },
  { name: 'AI Fluency: Framework & Foundations', issuer: 'Anthropic', highlight: true },
  { name: 'React Advanced Workshop', issuer: 'React Amsterdam', year: '2018', highlight: true },
  { name: 'React JS Web Development – The Essentials Bootcamp', issuer: 'Udemy' },
  { name: 'JavaScript – The Complete Guide (Beginner + Advanced)', issuer: 'Udemy', year: '2023' },
  { name: 'Next.js & React – The Complete Guide', issuer: 'Udemy', year: '2023' },
  { name: 'Understanding TypeScript', issuer: 'Udemy', year: '2023' },
  { name: 'Diseñando servicios y modelos de datos', lang: 'es' },
];

export interface SkillGroup {
  name: Localized;
  items: Localized<string[]>;
}

const same = (items: string[]): Localized<string[]> => ({ en: items, es: items });

export const skills: SkillGroup[] = [
  {
    name: { en: 'Languages & frameworks', es: 'Lenguajes y frameworks' },
    items: same([
      'TypeScript',
      'JavaScript',
      'React',
      'Next.js',
      'Redux',
      'Zustand',
      'Node.js',
      'Express',
      'HTML',
      'CSS',
      'Sass',
      'Tailwind CSS',
      'Styled Components',
    ]),
  },
  {
    name: { en: 'Data', es: 'Datos' },
    items: same(['REST', 'GraphQL', 'PostgreSQL', 'Drizzle ORM']),
  },
  {
    name: { en: 'Testing & quality', es: 'Testing y calidad' },
    items: same([
      'Jest',
      'Vitest',
      'React Testing Library',
      'Playwright',
      'axe',
      'Lighthouse CI',
      'ESLint',
      'Prettier',
    ]),
  },
  {
    name: { en: 'Tooling', es: 'Herramientas' },
    items: same(['Git', 'GitHub Actions', 'Jenkins', 'Webpack', 'Turbopack', 'npm', 'Vercel']),
  },
  {
    name: { en: 'Practices', es: 'Prácticas' },
    items: {
      en: [
        'Accessibility (WCAG 2.2)',
        'Web performance',
        'Internationalisation',
        'Scrum & Kanban',
        'AI-assisted development (Claude)',
      ],
      es: [
        'Accesibilidad (WCAG 2.2)',
        'Rendimiento web',
        'Internacionalización',
        'Scrum y Kanban',
        'Desarrollo asistido por IA (Claude)',
      ],
    },
  },
];

export const spokenLanguages: { name: Localized; level: Localized }[] = [
  { name: { en: 'Spanish', es: 'Español' }, level: { en: 'Native', es: 'Nativo' } },
  { name: { en: 'English', es: 'Inglés' }, level: { en: 'Full professional (C2)', es: 'Profesional completo (C2)' } },
  { name: { en: 'Italian', es: 'Italiano' }, level: { en: 'Limited working', es: 'Competencia básica profesional' } },
];
