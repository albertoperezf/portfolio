import type { Localized } from './profile';

export interface Screenshot {
  src: string;
  width: number;
  height: number;
  alt: Localized;
  caption: Localized;
  /** Wide shots span the full grid width. */
  wide?: boolean;
}

export interface Thumbnail {
  light: string;
  dark: string;
  width: number;
  height: number;
  alt: Localized;
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
  thumbnail?: Thumbnail;
  /** Projects without a case study are listed but not linked. */
  caseStudy?: { intro: Localized; role: Localized; sections: CaseStudySection[]; screenshots: Screenshot[] };
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
    thumbnail: {
      light: '/work/convocatoria-desktop-light.png',
      dark: '/work/convocatoria-desktop-dark.png',
      width: 1548,
      height: 774,
      alt: {
        en: 'Convocatoria home screen: next match details and the squad split by team.',
        es: 'Pantalla principal de Convocatoria: datos del próximo partido y la convocatoria por equipos.',
      },
    },
    caseStudy: {
      intro: {
        en: 'Every Thursday a group of friends plays football. For years, knowing who was coming meant an old web tool and long WhatsApp threads. I rebuilt it from scratch as a fast, accessible app that every player can answer from their phone in a couple of seconds.',
        es: 'Cada jueves un grupo de amigos juega al fútbol. Durante años, saber quién venía dependía de una herramienta web antigua y de largos hilos de WhatsApp. La rehice desde cero como una app rápida y accesible que cada jugador puede responder desde el móvil en un par de segundos.',
      },
      role: {
        en: 'Solo project: product definition, UX and visual design, development, testing and deployment.',
        es: 'Proyecto en solitario: definición de producto, UX y diseño visual, desarrollo, testing y despliegue.',
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
          heading: { en: 'Key decisions', es: 'Decisiones clave' },
          items: {
            en: [
              'Server Components and Server Actions first: almost no JavaScript reaches the browser, so the app is quick even on older phones.',
              'Invitations instead of sign-up: admins share a one-time link on WhatsApp and players choose their password on first login. No emails, no forgotten accounts.',
              'Own session handling instead of an auth service: hashed tokens in a __Host- cookie with sliding expiry, Argon2id passwords and login rate limiting. Simple, private and free to run.',
              'PGlite locally and in tests, Neon in production: the same PostgreSQL and migrations everywhere, without installing a database.',
            ],
            es: [
              'Server Components y Server Actions primero: casi no llega JavaScript al navegador, así que la app va rápida incluso en móviles antiguos.',
              'Invitaciones en lugar de registro: los administradores comparten un enlace de un solo uso por WhatsApp y cada jugador elige su contraseña al entrar. Sin correos ni cuentas olvidadas.',
              'Sesiones propias en lugar de un servicio de autenticación: tokens hasheados en una cookie __Host- con caducidad deslizante, contraseñas con Argon2id y límite de intentos de login. Simple, privado y gratis.',
              'PGlite en local y en los tests, Neon en producción: el mismo PostgreSQL y las mismas migraciones en todas partes, sin instalar ninguna base de datos.',
            ],
          },
        },
        {
          heading: { en: 'Challenges', es: 'Retos' },
          items: {
            en: [
              'Time zones: a new week starts two hours after kick-off in Madrid time, whatever the server’s time zone is.',
              'Replacing a tool people already used: existing players were imported from the old system, so nobody had to start from zero.',
              'A public squad with real names that stays out of search engines (noindex), so the group keeps its privacy.',
            ],
            es: [
              'Zonas horarias: una nueva semana empieza dos horas después del inicio del partido en hora de Madrid, sea cual sea la zona horaria del servidor.',
              'Sustituir una herramienta que ya se usaba: los jugadores existentes se importaron del sistema antiguo, para que nadie empezara de cero.',
              'Una convocatoria pública con nombres reales que no aparece en buscadores (noindex), para mantener la privacidad del grupo.',
            ],
          },
        },
        {
          heading: { en: 'Quality as a feature', es: 'La calidad como funcionalidad' },
          items: {
            en: [
              'WCAG 2.2 AA, checked with axe in Playwright end-to-end tests on mobile and desktop.',
              'Vitest unit, database-integration and component tests against an in-memory PostgreSQL.',
              'Lighthouse CI budgets for performance, accessibility and JavaScript size on every change.',
              'Nonce-based Content Security Policy and hardened security headers.',
            ],
            es: [
              'WCAG 2.2 AA, comprobado con axe en tests end-to-end de Playwright en móvil y escritorio.',
              'Tests unitarios, de integración con base de datos y de componentes con Vitest sobre un PostgreSQL en memoria.',
              'Presupuestos de Lighthouse CI para rendimiento, accesibilidad y tamaño de JavaScript en cada cambio.',
              'Content Security Policy con nonces y cabeceras de seguridad reforzadas.',
            ],
          },
        },
      ],
      screenshots: [
        {
          src: '/work/convocatoria-desktop-light.png',
          width: 1548,
          height: 774,
          wide: true,
          alt: {
            en: 'Convocatoria on desktop in light mode: match date and venue, add-to-calendar and share actions, a sign-up button, and the squad split into Blancos, Color and Guests. Player names are blurred.',
            es: 'Convocatoria en escritorio en modo claro: fecha y lugar del partido, acciones de añadir al calendario y compartir, botón para apuntarse y la convocatoria dividida en Blancos, Color e Invitados. Los nombres están difuminados.',
          },
          caption: {
            en: 'Desktop, light mode. Names blurred for privacy.',
            es: 'Escritorio, modo claro. Nombres difuminados por privacidad.',
          },
        },
        {
          src: '/work/convocatoria-light.png',
          width: 780,
          height: 1688,
          alt: {
            en: 'Convocatoria on a phone in light mode, with the same information stacked in one column. Player names are blurred.',
            es: 'Convocatoria en un móvil en modo claro, con la misma información en una columna. Los nombres están difuminados.',
          },
          caption: { en: 'Mobile, light mode.', es: 'Móvil, modo claro.' },
        },
        {
          src: '/work/convocatoria-dark.png',
          width: 780,
          height: 1688,
          alt: {
            en: 'The same mobile screen in dark mode. Player names are blurred.',
            es: 'La misma pantalla móvil en modo oscuro. Los nombres están difuminados.',
          },
          caption: {
            en: 'Mobile, dark mode (follows the system setting).',
            es: 'Móvil, modo oscuro (sigue la preferencia del sistema).',
          },
        },
      ],
    },
  },
  {
    slug: 'portfolio',
    name: 'This portfolio',
    kind: { en: 'Personal project · Open source', es: 'Proyecto personal · Código abierto' },
    summary: {
      en: 'The site you are reading: bilingual, statically prerendered, light and dark themes, with a CV generated from the same content and quality gates on every change.',
      es: 'La web que estás leyendo: bilingüe, prerenderizada de forma estática, con tema claro y oscuro, un CV generado a partir del mismo contenido y controles de calidad en cada cambio.',
    },
    tech: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Tailwind CSS 4',
      'react-pdf',
      'Vitest',
      'Playwright',
      'axe',
      'Lighthouse CI',
    ],
    sourceUrl: 'https://github.com/albertoperezf/portfolio',
    thumbnail: {
      light: '/work/portfolio-desktop-light.png',
      dark: '/work/portfolio-desktop-dark.png',
      width: 1920,
      height: 1200,
      alt: {
        en: 'Home page of this portfolio with the headline and key facts.',
        es: 'Página de inicio de este portfolio con el titular y los datos clave.',
      },
    },
    caseStudy: {
      intro: {
        en: 'I wanted a portfolio that proves what it claims. Instead of saying “fast and accessible”, the site is built so a reviewer can check it: open the source, run the tests, or press Tab and use it without a mouse.',
        es: 'Quería un portfolio que demostrara lo que dice. En lugar de decir «rápido y accesible», la web está hecha para que cualquiera pueda comprobarlo: abrir el código, ejecutar los tests o pulsar Tab y usarla sin ratón.',
      },
      role: {
        en: 'Solo project: content, design, development and deployment.',
        es: 'Proyecto en solitario: contenido, diseño, desarrollo y despliegue.',
      },
      sections: [
        {
          heading: { en: 'Key decisions', es: 'Decisiones clave' },
          items: {
            en: [
              'Everything static: every page is prerendered at build time, and the build fails if a change would make a page render on request.',
              'Internationalisation without a runtime library: /en and /es routes, the browser language on the first visit and the visitor’s choice remembered afterwards.',
              'A theme without a flash: an inline script applies the saved or system theme before the first paint.',
              'One source of truth: the experience on the About page and the downloadable PDF CV are generated from the same typed content.',
              'No tracking cookies: privacy-friendly analytics only.',
            ],
            es: [
              'Todo estático: cada página se prerenderiza al compilar, y la compilación falla si un cambio hiciera que una página se renderizase bajo demanda.',
              'Internacionalización sin librería en el navegador: rutas /en y /es, el idioma del navegador en la primera visita y la elección del visitante recordada después.',
              'Un tema sin parpadeos: un script en línea aplica el tema guardado o el del sistema antes del primer pintado.',
              'Una única fuente de verdad: la experiencia de la página «Sobre mí» y el CV en PDF se generan a partir del mismo contenido tipado.',
              'Sin cookies de seguimiento: solo analítica respetuosa con la privacidad.',
            ],
          },
        },
        {
          heading: { en: 'Quality gates', es: 'Controles de calidad' },
          items: {
            en: [
              'Automated accessibility checks with axe on every page, in both languages, both themes, on mobile and desktop.',
              'Strict accessibility linting, plus unit and component tests for every interactive piece.',
              'Lighthouse CI budgets: the build is rejected if accessibility drops below 100 or performance, page weight or blocking time get worse than the limits.',
            ],
            es: [
              'Comprobaciones automáticas de accesibilidad con axe en cada página, en los dos idiomas, los dos temas, en móvil y escritorio.',
              'Linting estricto de accesibilidad y tests unitarios y de componentes para cada pieza interactiva.',
              'Presupuestos de Lighthouse CI: el cambio se rechaza si la accesibilidad baja de 100 o si el rendimiento, el peso de la página o el tiempo de bloqueo superan los límites.',
            ],
          },
        },
        {
          heading: { en: 'Challenges', es: 'Retos' },
          items: {
            en: [
              'Keeping pages fully static while still reading the visitor’s language and theme: the work happens in a tiny proxy and an inline script instead of on the server.',
              'An interactive data grid with 10,000 rows that stays fast and fully usable with a keyboard and a screen reader.',
            ],
            es: [
              'Mantener las páginas totalmente estáticas y aun así respetar el idioma y el tema del visitante: el trabajo se hace en un pequeño proxy y en un script en línea, no en el servidor.',
              'Una tabla de datos interactiva con 10.000 filas que sigue siendo rápida y totalmente usable con teclado y lector de pantalla.',
            ],
          },
        },
      ],
      screenshots: [
        {
          src: '/work/portfolio-desktop-light.png',
          width: 1920,
          height: 1200,
          wide: true,
          alt: {
            en: 'Home page of this portfolio in light mode.',
            es: 'Página de inicio de este portfolio en modo claro.',
          },
          caption: { en: 'Desktop, light mode.', es: 'Escritorio, modo claro.' },
        },
        {
          src: '/work/portfolio-mobile-dark.png',
          width: 780,
          height: 1688,
          alt: {
            en: 'Home page of this portfolio on a phone in dark mode.',
            es: 'Página de inicio de este portfolio en un móvil en modo oscuro.',
          },
          caption: { en: 'Mobile, dark mode.', es: 'Móvil, modo oscuro.' },
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

export interface Experiment {
  slug: string;
  name: Localized;
  summary: Localized;
  tech: string[];
}

export const experiments: Experiment[] = [
  {
    slug: 'data-grid',
    name: { en: 'Accessible data grid', es: 'Tabla de datos accesible' },
    summary: {
      en: '10,000 rows with sorting, filtering, virtual scrolling and full keyboard navigation, following the ARIA grid pattern. The kind of interface I build every day for retail analytics.',
      es: '10.000 filas con ordenación, filtros, scroll virtual y navegación completa por teclado, siguiendo el patrón ARIA grid. El tipo de interfaz que construyo a diario para analítica de retail.',
    },
    tech: ['React', 'TypeScript', 'ARIA grid'],
  },
];

export interface EarlierProject {
  name: string;
  year: string;
  url: string;
  summary: Localized;
}

export const earlierProjects: EarlierProject[] = [
  {
    name: 'react-schroders-stocks',
    year: '2021',
    url: 'https://github.com/albertoperezf/react-schroders-stocks',
    summary: {
      en: 'Stock app that charts time series for up to three stocks.',
      es: 'App de bolsa que muestra series temporales de hasta tres valores.',
    },
  },
  {
    name: 'lit-element-portfolio',
    year: '2020',
    url: 'https://github.com/albertoperezf/lit-element-portfolio',
    summary: {
      en: 'An earlier portfolio built with Web Components and LitElement.',
      es: 'Un portfolio anterior hecho con Web Components y LitElement.',
    },
  },
  {
    name: 'react-interurbanos',
    year: '2019',
    url: 'https://github.com/albertoperezf/react-interurbanos',
    summary: {
      en: 'React app to check traffic information for the Community of Madrid.',
      es: 'App en React para consultar información de tráfico de la Comunidad de Madrid.',
    },
  },
  {
    name: 'readable',
    year: '2017',
    url: 'https://github.com/albertoperezf/readable',
    summary: {
      en: 'Posts and comments app with React, Redux and Redux Thunk (Udacity React Nanodegree).',
      es: 'App de publicaciones y comentarios con React, Redux y Redux Thunk (Udacity React Nanodegree).',
    },
  },
  {
    name: 'My-Reads',
    year: '2017',
    url: 'https://github.com/albertoperezf/My-Reads',
    summary: {
      en: 'Bookshelf app built with React Router (Udacity React Nanodegree).',
      es: 'App de estanterías de libros con React Router (Udacity React Nanodegree).',
    },
  },
];
