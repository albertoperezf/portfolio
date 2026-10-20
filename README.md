# Alberto Pérez Faria · Portfolio

Personal portfolio in English and Spanish: statically prerendered, light and dark themes, WCAG 2.2 AA, with a contact form.

- Next.js 16 (App Router, Cache Components, Server Actions), React 19, TypeScript strict, Tailwind CSS 4
- i18n without a runtime library: `/en` and `/es` routes, `next/root-params`, `Accept-Language` detection in `src/proxy.ts`
  (English by default; the language switcher choice is remembered in the `NEXT_LOCALE` cookie)
- Theme: system preference by default, toggle stored in a `theme` cookie, applied by an inline script before first paint
- Contact: Server Action + Zod, Resend (free tier), Cloudflare Turnstile (optional) and a honeypot; works without JavaScript
- Quality gates: ESLint (strict jsx-a11y), Vitest + Testing Library, Playwright + axe (both languages, both themes,
  mobile and desktop), Lighthouse CI budgets

## Getting started

```bash
cp .env.example .env.local   # optional: everything works locally without keys (contact messages are logged)
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
2. Environment variables (Production and Preview):
   - `NEXT_PUBLIC_SITE_URL` = `https://albertojpf.vercel.app`
   - `RESEND_API_KEY`: create a free account at resend.com **with the same email that should receive the messages**
     (without a custom domain Resend only delivers to the account owner), then create an API key.
   - `CONTACT_TO_EMAIL` = that same email.
   - Optional: `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` from Cloudflare → Turnstile → Add widget
     (mode "Managed", hostnames `albertojpf.vercel.app` and `localhost`).
3. Enable Web Analytics and Speed Insights in the Vercel project (free, cookieless).
