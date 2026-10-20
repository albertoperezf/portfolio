export const en = {
  meta: {
    siteTitle: 'Alberto Pérez Faria · Senior Frontend Developer',
    description:
      'Senior Frontend Developer in Madrid building fast, accessible and multilingual web interfaces with React, TypeScript and Next.js.',
  },
  a11y: {
    skipToContent: 'Skip to content',
    mainNav: 'Main',
    languageSwitcher: 'Language',
    darkTheme: 'Dark theme',
    socialLinks: 'Elsewhere',
  },
  nav: { home: 'Home', work: 'Work', about: 'About', contact: 'Contact' },
  footer: {
    builtWith: 'Built with Next.js and deployed on Vercel. Statically rendered, in English and Spanish.',
  },
  home: {
    eyebrow: 'Senior Frontend Developer · Madrid',
    title: 'I build fast, accessible web interfaces.',
    intro:
      'I’m Alberto, a frontend developer with {years}+ years of experience turning complex products into clear, fast and inclusive interfaces with React, TypeScript and Next.js. Today I work at Cognizant on Ranking, an internal web application of the Inditex Group.',
    ctaWork: 'See my work',
    ctaContact: 'Get in touch',
    capabilitiesTitle: 'What I can build for you',
    capabilities: [
      {
        title: 'Data-heavy interfaces',
        body: 'Grids, filters and dashboards that stay responsive with thousands of rows, like the analytics tools I build for retail.',
      },
      {
        title: 'Accessible by default',
        body: 'WCAG 2.2 AA from the first component: semantic HTML, keyboard and screen reader support, and automated axe checks.',
      },
      {
        title: 'Performance you can measure',
        body: 'Core Web Vitals budgets, code splitting and rendering strategies chosen per page, verified in CI rather than guessed.',
      },
      {
        title: 'Full-stack with Next.js',
        body: 'Server Components, Server Actions, PostgreSQL, authentication and security headers, deployed on Vercel.',
      },
      {
        title: 'Multilingual products',
        body: 'Localised routing, content and formatting, so every user gets the product in their language.',
      },
      {
        title: 'AI-assisted engineering',
        body: 'I use AI tools such as Claude to move faster, with tests, accessibility checks and human review keeping quality high.',
      },
    ],
    featuredTitle: 'Featured project',
    featuredCta: 'Read the case study',
    thisSiteTitle: 'This site is a demo too',
    thisSiteBody:
      'It is statically prerendered in two languages, follows your system theme (or the one you pick), works with a keyboard and a screen reader, and runs accessibility and performance checks on every change.',
  },
  about: {
    title: 'About me',
    bio: [
      'I’m a Computer Engineer from Universidad Rafael Urdaneta (Venezuela) and a frontend developer with more than {years} years of experience building web and hybrid mobile applications in Scrum and Kanban teams. I’m also a certified Scrum Manager.',
      'Today I’m a Senior Frontend Developer at Cognizant, working for the Inditex Group on Ranking. Before that I spent more than four years at GFT building React and Redux applications for banking and real estate clients in Spain, Singapore and the USA, and two years at MedLab Media Group, where I also ran the team’s Scrum process.',
      'I enjoy learning in public: courses, conferences and meetups, and answering questions on Stack Overflow.',
    ],
    experienceTitle: 'Experience',
    earlierTitle: 'Earlier experience',
    present: 'Present',
    educationTitle: 'Education',
    certificationsTitle: 'Certifications & courses',
    languagesTitle: 'Languages',
    communityTitle: 'Community',
    stackOverflow: '{reputation} reputation on Stack Overflow',
    badges: '{gold} gold, {silver} silver and {bronze} bronze badges',
    stackOverflowFallback: 'Answering questions on Stack Overflow',
    github: 'Side projects and experiments on GitHub',
    linkedin: 'Full career history on LinkedIn',
  },
  work: {
    title: 'Work',
    intro: 'A selection of things I have built. Personal projects come with a case study and a live demo.',
    caseStudy: 'Read the case study',
    live: 'Live app',
    source: 'Source code',
    noDemo: 'Internal tool, no public demo.',
    stackLabel: 'Stack',
    backToWork: 'Back to work',
    screenshotsTitle: 'Screenshots',
    linksTitle: 'Links',
  },
  contact: {
    title: 'Get in touch',
    intro:
      'Have a question about my work, an idea, or just want to say hi? Send me a message and I’ll reply by email. You can also find me on LinkedIn.',
    form: {
      name: 'Name',
      email: 'Email',
      emailHint: 'I’ll only use it to reply to you.',
      message: 'Message',
      required: '(required)',
      submit: 'Send message',
      sending: 'Sending…',
      errorSummary: 'There is a problem',
      errors: {
        name: { required: 'Enter your name', tooLong: 'Your name must be 100 characters or fewer' },
        email: {
          required: 'Enter your email address',
          invalid: 'Enter an email address in the correct format, like name@example.com',
          tooLong: 'Your email address must be 254 characters or fewer',
        },
        message: {
          required: 'Enter a message',
          tooShort: 'Your message must be at least 10 characters',
          tooLong: 'Your message must be 5,000 characters or fewer',
        },
      },
      captchaError: 'We couldn’t verify you’re human. Please try again.',
      serverError: 'Your message couldn’t be sent. Please try again later or reach me on LinkedIn.',
      successTitle: 'Message sent',
      successBody: 'Thanks for writing. I’ll get back to you by email as soon as I can.',
      honeypot: 'Leave this field empty',
    },
  },
  notFound: {
    title: 'Page not found',
    body: 'The page you are looking for doesn’t exist or has moved.',
    home: 'Go to the home page',
  },
};

export type Dictionary = typeof en;
