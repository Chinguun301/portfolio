# 🚀 Deployment Checklist

## Pre-deploy
- [x] Build passes (`npm run build`)
- [x] Lint passes (`npm run lint`)
- [x] TypeScript compilation clean
- [x] All 12 routes generated
- [x] Middleware configured (admin auth)
- [x] Design system applied (Dark Minimal)
- [x] Supabase schema ready (migration files in artifacts/db/)
- [x] @vercel/analytics configured
- [x] @vercel/speed-insights configured
- [x] JSON-LD structured data added
- [x] Security headers configured (X-Content-Type-Options, X-Frame-Options, etc.)
- [x] Image optimization configured (WebP/AVIF, device sizes, caching)

## Before Production Deploy
- [ ] Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Vercel
- [ ] Set `NEXT_PUBLIC_SITE_URL` to custom domain
- [ ] Run Supabase migrations on production database
- [ ] Configure custom domain in Vercel dashboard
- [ ] Connect GitHub repository for auto-deploy
- [ ] Run Lighthouse audit (target: 95+ all categories)

## Environment Variables Needed
- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anonymous key
- `NEXT_PUBLIC_SITE_URL` — Production site URL
