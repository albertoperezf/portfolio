# Alberto Pérez Faria · Portfolio

Personal portfolio in English and Spanish: statically prerendered, light and dark themes, WCAG 2.2 AA.

- Next.js 16 (App Router, Cache Components), React 19, TypeScript strict, Tailwind CSS 4
- i18n without a runtime library: `/en` and `/es` routes, `next/root-params`, `Accept-Language` detection in `src/proxy.ts`
  (English by default; the language switcher choice is remembered in the `NEXT_LOCALE` cookie)
- Theme: system preference by default, toggle stored in a `theme` cookie, applied by an inline script before first paint
- Contact: links to LinkedIn, GitHub and Stack Overflow (reputation fetched daily from the Stack Exchange API)
- Quality gates: ESLint (strict jsx-a11y), Vitest + Testing Library, Playwright + axe (both languages, both themes,
  mobile and desktop), Lighthouse CI budgets

## Getting started

```bash
npm install
npm run dev
```

## Scripts

| Script                               | What it does                                                      |
| ------------------------------------ | ----------------------------------------------------------------- |
| `npm run dev`                        | Dev server                                                        |
| `npm run build` / `npm start`        | Production build / server                                         |
| `npm run lint` / `npm run typecheck` | ESLint / route types + `tsc`                                      |
| `npm test`                           | Vitest unit and component tests                                   |
| `npm run test:e2e`                   | Playwright + axe against the production build (run `build` first) |
| `npm run format`                     | Prettier                                                          |

If Playwright can't download its browser (corporate proxy), use the installed Chrome: `PW_CHANNEL=chrome npm run test:e2e`.

## Content

- Profile, experience, education, certifications: `src/content/profile.ts`
- Projects and case studies: `src/content/projects.ts` (screenshots in `public/work/`)
- UI copy: `src/i18n/dictionaries/{en,es}.ts` (`es` is typed against `en`, so a missing key fails `tsc`)

## Deploying to Vercel

1. Import the GitHub repository in Vercel and name the project `albertojpf` (URL: `https://albertojpf.vercel.app`).
2. Environment variable (Production and Preview): `NEXT_PUBLIC_SITE_URL` = `https://albertojpf.vercel.app`.
3. Enable Web Analytics and Speed Insights in the Vercel project (free, cookieless).
