# Deploying The Strategist to Vercel

## What was breaking

Your build log showed this, many times over:

```
error: Environment variable not found: DATABASE_URL
Error occurred prerendering page "/about"
```

Two root causes:

1. **The pages were being pre-rendered at build time**, which ran Prisma
   database queries during the build — but there was no database available,
   so the build crashed.
2. **The database was SQLite (`file:./dev.db`)**. SQLite cannot run on Vercel:
   the serverless filesystem is read-only and temporary, and `*.db` is in
   `.gitignore` so the file never even ships. A CMS with an admin panel needs a
   real hosted database.

## What I fixed in the code (already pushed to `main`)

- `src/app/layout.tsx` → added `export const dynamic = "force-dynamic"` so pages
  render **per request** instead of at build time. The build no longer needs the
  database, and content edits from the admin panel appear instantly.
- `prisma/schema.prisma` → switched the datasource from `sqlite` to
  **`postgresql`** (Postgres runs perfectly on Vercel/serverless).
- `package.json` → the build now runs `prisma generate` first, and a
  `postinstall` hook keeps the Prisma client in sync.

After my push, the **build will succeed**. To make the live site actually work,
finish the 3 steps below — they take about 5 minutes and only need doing once.

---

## Step 1 — Create a free Postgres database

Pick either option (both are Postgres — the code is identical):

**Option A — Vercel Postgres (simplest):**
Vercel Dashboard → your project → **Storage** → **Create Database** → **Postgres**.
Once created, open it and copy the connection string labelled
**`POSTGRES_PRISMA_URL`** (the pooled one).

**Option B — Neon (neon.tech, generous free tier):**
Create a project → copy the **pooled connection string** (looks like
`postgresql://user:pass@ep-xxxx-pooler.region.aws.neon.tech/neondb?sslmode=require`).

## Step 2 — Add environment variables in Vercel

Vercel Dashboard → your project → **Settings → Environment Variables**. Add:

| Name | Value | Environments |
|------|-------|--------------|
| `DATABASE_URL` | your Postgres connection string from Step 1 | Production, Preview, Development |
| `SITE_URL` | `https://your-project.vercel.app` (your live URL) | Production, Preview, Development |

> Env vars only apply to **new** deployments. After saving, do
> **Deployments → ⋯ → Redeploy** (or just push again).

## Step 3 — Create the tables and load your content

Run this **once** from your computer, using the **same** connection string:

```bash
# in the project folder
# 1. point your local .env at the Postgres DB (replace with your string)
echo 'DATABASE_URL="postgresql://...your pooled string..."' > .env
echo 'SITE_URL="https://your-project.vercel.app"' >> .env

# 2. install deps (if you haven't) and create the tables
npm install
npx prisma db push

# 3. load all the starter content (pages, services, blog, admin user)
npm run db:seed
```

`prisma db push` creates every table in your new Postgres database, and
`db:seed` fills it with the site content.

---

## Log in to the admin panel

After Step 3, go to **`https://your-project.vercel.app/admin`**

- **Email:** `admin@thestrategist.com`
- **Password:** `Strategist@2026`

Change this password after your first login.

---

## Quick checklist

- [ ] Postgres database created (Vercel Postgres or Neon)
- [ ] `DATABASE_URL` added to Vercel env vars (all environments)
- [ ] `SITE_URL` added to Vercel env vars
- [ ] `npx prisma db push` run against the Postgres URL
- [ ] `npm run db:seed` run to load content
- [ ] Redeployed after adding the env vars
- [ ] Able to log in at `/admin`

## Local development note

Because the provider is now Postgres, local `npm run dev` also needs a Postgres
`DATABASE_URL` (you can reuse the same one, or make a second free Neon branch for
dev). The old `file:./dev.db` SQLite value will no longer work.
