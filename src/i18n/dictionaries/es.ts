import type { Dictionary } from './en';

export const es: Dictionary = {
  meta: {
    siteTitle: 'Alberto Pérez Faria · Senior Frontend Developer',
    description:
      'Senior Frontend Developer en Madrid. Construyo interfaces web rápidas, accesibles y multilingües con React, TypeScript y Next.js.',
  },
  a11y: {
    skipToContent: 'Saltar al contenido',
    mainNav: 'Principal',
    languageSwitcher: 'Idioma',
    darkTheme: 'Tema oscuro',
    socialLinks: 'En otros sitios',
  },
  nav: { home: 'Inicio', work: 'Proyectos', about: 'Sobre mí', contact: 'Contacto' },
  footer: {
    builtWith: 'Hecho con Next.js y desplegado en Vercel. Renderizado estático, en español e inglés.',
  },
  home: {
    eyebrow: 'Senior Frontend Developer · Madrid',
    title: 'Construyo interfaces web rápidas y accesibles.',
    intro:
      'Soy Alberto, desarrollador frontend con más de {years} años de experiencia convirtiendo productos complejos en interfaces claras, rápidas e inclusivas con React, TypeScript y Next.js. Actualmente trabajo en Cognizant en Ranking, una aplicación web interna del Grupo Inditex.',
    ctaWork: 'Ver mis proyectos',
    ctaContact: 'Contactar',
    capabilitiesTitle: 'Qué puedo construir para ti',
    capabilities: [
      {
        title: 'Interfaces con muchos datos',
        body: 'Tablas, filtros y dashboards que siguen siendo fluidos con miles de filas, como las herramientas de análisis que desarrollo para retail.',
      },
      {
        title: 'Accesibles desde el principio',
        body: 'WCAG 2.2 AA desde el primer componente: HTML semántico, teclado y lectores de pantalla, y comprobaciones automáticas con axe.',
      },
      {
        title: 'Rendimiento medible',
        body: 'Presupuestos de Core Web Vitals, división de código y estrategias de renderizado elegidas por página, verificadas en CI y no supuestas.',
      },
      {
        title: 'Full-stack con Next.js',
        body: 'Server Components, Server Actions, PostgreSQL, autenticación y cabeceras de seguridad, desplegado en Vercel.',
      },
      {
        title: 'Productos multilingües',
        body: 'Rutas, contenidos y formatos localizados para que cada persona use el producto en su idioma.',
      },
      {
        title: 'Ingeniería asistida por IA',
        body: 'Uso herramientas de IA como Claude para avanzar más rápido, con tests, comprobaciones de accesibilidad y revisión humana para mantener la calidad.',
      },
    ],
    featuredTitle: 'Proyecto destacado',
    featuredCta: 'Leer el caso de estudio',
    thisSiteTitle: 'Esta web también es una demo',
    thisSiteBody:
      'Está prerenderizada de forma estática en dos idiomas, sigue el tema de tu sistema (o el que elijas), funciona con teclado y lector de pantalla, y pasa comprobaciones de accesibilidad y rendimiento en cada cambio.',
  },
  about: {
    title: 'Sobre mí',
    bio: [
      'Soy Ingeniero de Computación por la Universidad Rafael Urdaneta (Venezuela) y desarrollador frontend con más de {years} años de experiencia creando aplicaciones web y móviles híbridas en equipos Scrum y Kanban. También soy Scrum Manager certificado.',
      'Actualmente soy Senior Frontend Developer en Cognizant y trabajo para el Grupo Inditex en Ranking. Antes pasé más de cuatro años en GFT desarrollando aplicaciones con React y Redux para clientes de banca e inmobiliarios en España, Singapur y Estados Unidos, y dos años en MedLab Media Group, donde también me encargué del proceso Scrum del equipo.',
      'Me gusta aprender en público: cursos, conferencias y meetups, y responder preguntas en Stack Overflow.',
    ],
    experienceTitle: 'Experiencia',
    earlierTitle: 'Experiencia anterior',
    present: 'Actualidad',
    educationTitle: 'Formación',
    certificationsTitle: 'Certificaciones y cursos',
    languagesTitle: 'Idiomas',
    communityTitle: 'Comunidad',
    stackOverflow: '{reputation} de reputación en Stack Overflow',
    badges: '{gold} medallas de oro, {silver} de plata y {bronze} de bronce',
    stackOverflowFallback: 'Respondiendo preguntas en Stack Overflow',
    github: 'Proyectos personales y experimentos en GitHub',
    linkedin: 'Trayectoria completa en LinkedIn',
  },
  work: {
    title: 'Proyectos',
    intro:
      'Una selección de cosas que he construido. Los proyectos personales incluyen un caso de estudio y una demo en vivo.',
    caseStudy: 'Leer el caso de estudio',
    live: 'App en vivo',
    source: 'Código fuente',
    noDemo: 'Herramienta interna, sin demo pública.',
    stackLabel: 'Tecnologías',
    backToWork: 'Volver a proyectos',
    screenshotsTitle: 'Capturas',
    linksTitle: 'Enlaces',
  },
  contact: {
    title: 'Hablemos',
    intro:
      '¿Quieres hablar sobre mi trabajo, una idea o un proyecto? Puedes encontrarme en estos sitios. LinkedIn es la forma más rápida de contactarme.',
    linkedin: 'La forma más rápida de contactarme: envíame un mensaje.',
    github: 'El código fuente de esta web y mis proyectos personales.',
    stackOverflow: '{reputation} de reputación respondiendo preguntas.',
    stackOverflowFallback: 'Respondiendo preguntas de frontend.',
  },
  notFound: {
    title: 'Página no encontrada',
    body: 'La página que buscas no existe o se ha movido.',
    home: 'Ir a la página de inicio',
  },
};
