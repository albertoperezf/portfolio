import type { Localized } from './profile';

export interface Screenshot {
  src: string;
  width: number;
  height: number;
  alt: Localized;
  caption: Localized;
}

export interface CaseStudySection {
  heading: Localized;
  body?: Localized;
  items?: Localized<string[]>;
}

export interface Project {
  slug: string;
  name: string;
  kind: Localized;
  summary: Localized;
  tech: string[];
  liveUrl?: string;
  sourceUrl?: string;
  /** Projects without a case study are listed but not linked. */
  caseStudy?: { intro: Localized; sections: CaseStudySection[]; screenshots: Screenshot[] };
}

export const projects: Project[] = [
  {
    slug: 'convocatoria',
    name: 'Blancolores · Convocatoria',
    kind: { en: 'Personal project · Live', es: 'Proyecto personal · En producción' },
    summary: {
      en: 'A mobile-first web app that organises a weekly football match: who is playing, who is in doubt and who is out, split into two teams.',
      es: 'Una web app mobile-first que organiza un partido de fútbol semanal: quién juega, quién duda y quién no va, repartidos en dos equipos.',
    },
    tech: ['Next.js 16', 'TypeScript', 'Tailwind CSS 4', 'PostgreSQL', 'Drizzle ORM', 'next-intl', 'Playwright', 'axe'],
    liveUrl: 'https://blancolorconvocatoriseitor.vercel.app',
    sourceUrl: 'https://github.com/albertoperezf/blancolorconvocatoriseitor',
    caseStudy: {
      intro: {
        en: 'Every Thursday a group of friends plays football. For years, knowing who was coming meant an old web tool and long WhatsApp threads. I rebuilt it from scratch as a fast, accessible app that every player can answer from their phone in a couple of seconds.',
        es: 'Cada jueves un grupo de amigos juega al fútbol. Durante años, saber quién venía dependía de una herramienta web antigua y de largos hilos de WhatsApp. La rehice desde cero como una app rápida y accesible que cada jugador puede responder desde el móvil en un par de segundos.',
      },
      sections: [
        {
          heading: { en: 'What it does', es: 'Qué hace' },
          items: {
            en: [
              'Players log in and answer “I’m in”, “Maybe” or “I’m out” for this week’s match, and can bring guests.',
              'Anyone can see the squad grouped by team, guests, maybes, players who are out and long-term absences, with each player’s position.',
              'One tap to add the match to the calendar, share it on WhatsApp or open the venue in the maps app.',
              'Results history, and answers reset automatically two hours after kick-off.',
              'Admin area to edit the weekly match and players, and to send one-time invitation links.',
            ],
            es: [
              'Los jugadores inician sesión y responden «Voy», «Duda» o «No voy» al partido de la semana, y pueden traer invitados.',
              'Cualquiera puede ver la convocatoria agrupada por equipo, invitados, dudas, bajas y bajas de larga duración, con la posición de cada jugador.',
              'Un toque para añadir el partido al calendario, compartirlo por WhatsApp o abrir el campo en la app de mapas.',
              'Historial de resultados; las respuestas se reinician solas dos horas después del inicio del partido.',
              'Área de administración para editar el partido semanal y los jugadores, y enviar enlaces de invitación de un solo uso.',
            ],
          },
        },
        {
          heading: { en: 'Under the hood', es: 'Por dentro' },
          items: {
            en: [
              'Next.js 16 App Router with Server Components and Server Actions, TypeScript in strict mode and Tailwind CSS 4.',
              'PostgreSQL with Drizzle ORM: Neon in production, PGlite locally and in tests, so no database has to be installed.',
              'Own session handling: hashed tokens in a __Host- cookie with sliding expiry, Argon2id passwords and login rate limiting.',
              'Nonce-based Content Security Policy and hardened security headers.',
              'Spanish-first internationalisation with next-intl.',
            ],
            es: [
              'Next.js 16 App Router con Server Components y Server Actions, TypeScript en modo estricto y Tailwind CSS 4.',
              'PostgreSQL con Drizzle ORM: Neon en producción y PGlite en local y en los tests, sin instalar ninguna base de datos.',
              'Sesiones propias: tokens hasheados en una cookie __Host- con caducidad deslizante, contraseñas con Argon2id y límite de intentos de login.',
              'Content Security Policy con nonces y cabeceras de seguridad reforzadas.',
              'Internacionalización con next-intl, en español por defecto.',
            ],
          },
        },
        {
          heading: { en: 'Quality as a feature', es: 'La calidad como funcionalidad' },
          items: {
            en: [
              'WCAG 2.2 AA, checked with axe in Playwright end-to-end tests on mobile and desktop.',
              'Vitest unit, database-integration and component tests against an in-memory PostgreSQL.',
              'Lighthouse CI budgets on every change: accessibility 100, performance ≥ 90, LCP < 2 s, TBT < 200 ms and less than 250 KB of JavaScript.',
            ],
            es: [
              'WCAG 2.2 AA, comprobado con axe en tests end-to-end de Playwright en móvil y escritorio.',
              'Tests unitarios, de integración con base de datos y de componentes con Vitest sobre un PostgreSQL en memoria.',
              'Presupuestos de Lighthouse CI en cada cambio: accesibilidad 100, rendimiento ≥ 90, LCP < 2 s, TBT < 200 ms y menos de 250 KB de JavaScript.',
            ],
          },
        },
      ],
      screenshots: [
        {
          src: '/work/convocatoria-light.png',
          width: 780,
          height: 1688,
          alt: {
            en: 'Convocatoria on a phone in light mode: match date, venue, add-to-calendar and share actions, and the squad split into Blancos, Color and Guests. Player names are blurred.',
            es: 'Convocatoria en un móvil en modo claro: fecha y lugar del partido, acciones de añadir al calendario y compartir, y la convocatoria dividida en Blancos, Color e Invitados. Los nombres de los jugadores están difuminados.',
          },
          caption: {
            en: 'Light mode on mobile. Names blurred for privacy.',
            es: 'Modo claro en móvil. Nombres difuminados por privacidad.',
          },
        },
        {
          src: '/work/convocatoria-dark.png',
          width: 780,
          height: 1688,
          alt: {
            en: 'The same Convocatoria screen in dark mode. Player names are blurred.',
            es: 'La misma pantalla de Convocatoria en modo oscuro. Los nombres de los jugadores están difuminados.',
          },
          caption: {
            en: 'Dark mode follows the system setting.',
            es: 'El modo oscuro sigue la preferencia del sistema.',
          },
        },
      ],
    },
  },
  {
    slug: 'ranking',
    name: 'Ranking · Inditex',
    kind: { en: 'Professional work · Internal tool', es: 'Trabajo profesional · Herramienta interna' },
    summary: {
      en: 'Internal web application of the Inditex Group. At Cognizant I build features and fixes in a large React, Redux and TypeScript codebase with dense data views, complex filters and exports, with a focus on performance and accessibility.',
      es: 'Aplicación web interna del Grupo Inditex. Desde Cognizant desarrollo funcionalidades y correcciones en una gran base de código React, Redux y TypeScript con vistas densas de datos, filtros complejos y exportaciones, cuidando el rendimiento y la accesibilidad.',
    },
    tech: ['TypeScript', 'React', 'Redux', 'Sass', 'Jest', 'React Testing Library', 'Webpack'],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
