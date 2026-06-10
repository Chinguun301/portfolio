# Portfolio — Personal Portfolio Website

A modern personal portfolio website built with Next.js 16, Tailwind CSS 4, and Framer Motion.

## Tech Stack

- **Framework**: Next.js 16 (App Router) with Turbopack
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4 (PostCSS plugin)
- **Animation**: Framer Motion ^12.40.0
- **Analytics**: @vercel/analytics
- **Deployment**: Vercel

## Project Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── about/        # About page (experience, skills)
│   ├── contact/      # Contact page (info + form)
│   ├── projects/     # Projects listing + [slug]/ detail
│   ├── layout.tsx    # Root layout (Geist fonts, Header, Footer)
│   ├── page.tsx      # Home page (hero, stats, featured projects)
│   ├── not-found.tsx # Custom 404
│   └── providers.tsx # App providers (i18n, animations, analytics)
├── components/
│   ├── animations/   # PageTransition (AnimatePresence)
│   ├── layout/       # Header, Footer, LanguageSwitcher
│   ├── sections/     # FeaturedProjects, ProjectGallery
│   └── ui/           # Section, SectionTitle, Button
├── content/          # Project data (3 entries)
└── lib/
    ├── i18n/         # i18n config, provider, EN/MN translations
    ├── animations.ts # Framer Motion variants
    └── projects.ts   # Project types & categories
```

## Development

```bash
npm run dev    # Start dev server with Turbopack
npm run build  # Production build
npm run start  # Preview production build
npm run lint   # Run ESLint
```

## Conventions

- **Commits**: Conventional Commits (`feat:`, `fix:`, `chore:`)
- **Branching**: Trunk-based (direct to main)
- **Releases**: Manual, via Vercel
- **Naming**: Files kebab-case, components PascalCase, functions camelCase
- **Imports**: External packages first, then `@/` internal aliases, then relative
- **Quotes**: Double quotes throughout
- **Aliases**: `@/*` maps to `./src/*`

## Babysitter

This project uses [babysitter](https://github.com/a5c-ai/babysitter) for AI orchestration.

### Project Profile

- **Workflow**: Trunk-based, manual releases, Conventional Commits
- **Autonomy**: Semi-autonomous
- **Pain Point**: Design & polish — making the portfolio premium

### Commands

| Command | Description |
|---------|-------------|
| `babysitter run:create ... --harness pi` | Start a new orchestration run |
| `babysitter run:iterate .a5c/runs/<runId>` | Continue a run |
| `babysitter task:post <runDir> <effectId> --status ok --value <file>` | Post task result |

### Recommended Skills

- `rpiv-pi:frontend-design` — UI/UX design analysis
- `rpiv-pi:design` — Feature design with vertical slices
- `rpiv-pi:commit` — Structured git commits
- `rpiv-pi:research` — Research patterns & solutions

### Methodology

**iterative-convergence**: Iterate with quality gates, converge toward goals.
