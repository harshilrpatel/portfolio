# Harshil Patel — Portfolio

Personal portfolio site built with Next.js, TypeScript, and Tailwind CSS v4.
Dark, dashboard/observability-inspired design reflecting an SRE-to-Agentic-AI background.

## Sections
- **Hero** — status-dashboard-style readout (uptime/years/migrations as "metrics")
- **About** — narrative + skills grouped by domain
- **Experience** — timeline (currently: TCS / Citibank role)
- **Projects** — ChatWithMyAI featured, plus 5 other projects
- **Contact** — email / LinkedIn / GitHub

## Run locally

```bash
npm install
npm run dev
```

Visit http://localhost:3000

## Build for production

```bash
npm run build
npm run start
```

## Deploy to Vercel (free)

1. Push this folder to a new GitHub repo
2. Go to https://vercel.com → "Add New Project" → import the repo
3. Vercel auto-detects Next.js, no config needed → Deploy
4. You'll get a free `your-project.vercel.app` domain immediately
5. (Optional) Add a custom domain later in Vercel project settings

## Things to customize before going live

- [ ] Add your resume PDF to `public/resume.pdf` (Nav links to it)
- [ ] Double check Experience dates/bullet points are accurate
- [ ] Update GitHub project links in `src/components/Projects.tsx` (some point to your
      profile root as placeholders — swap in exact repo URLs)
- [ ] Add a favicon (`src/app/favicon.ico` is currently the Next.js default)
- [ ] Optional: add an OpenGraph image for link previews

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4 (CSS-based theme config in `src/app/globals.css`)
- Self-hosted fonts via `@fontsource` (Space Grotesk, Inter, JetBrains Mono)

## Next step

This is built to support a floating "Chat with my AI" widget (powered by the
ChatWithMyAI Hugging Face Space) as a follow-up phase — UI scaffolding is
intentionally simple right now so that addition stays clean.
