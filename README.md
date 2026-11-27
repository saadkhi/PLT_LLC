# PLT LLC

Website and admin panel for Primeline IT Services LLC, built with Next.js 15 (App Router), Prisma and Tailwind CSS.

## Setup

1. Install dependencies (this also runs `prisma generate`):

   ```bash
   npm ci
   ```

2. Copy `.env.example` to `.env` and fill it in. Local development uses SQLite (`DATABASE_URL="file:./dev.db"`).

3. Create the database tables and seed sample content:

   ```bash
   npx prisma db push
   node prisma/seed.js
   ```

4. Create the admin user (password at least 10 characters):

   ```bash
   ADMIN_USERNAME=admin ADMIN_PASSWORD='choose-a-long-password' node prisma/seed_admin.js
   ```

5. Start the dev server and open http://localhost:3000 (admin panel at `/admin`):

   ```bash
   npm run dev
   ```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build (needs `DATABASE_URL`) |
| `npm run vercel-build` | Vercel build: switches the Prisma schema to PostgreSQL, then builds |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |

## Deploying on Vercel

Set `DATABASE_URL` and `DIRECT_URL` (PostgreSQL), `ADMIN_USERNAME`, `ADMIN_PASSWORD` and `BLOB_READ_WRITE_TOKEN` in the project's environment variables. The build only runs `prisma generate`, so apply schema changes to the production database yourself (for example `npx prisma db push` against it).

## Admin security

Every admin page and admin API route checks the session token against the `AdminSession` table. The middleware only redirects visitors with no cookie at all, so new admin pages must call `requireAdminPage()` from `src/lib/adminAuth.ts` before reading data, and new admin API routes must call `validateAdminSession()`.
