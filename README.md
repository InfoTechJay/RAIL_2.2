# RAIL

RAIL, short for Real Asset Information Ledger, is a Next.js MVP for researching tokenized real-world assets.

## Local Development

```powershell
pnpm install
pnpm db:reset
pnpm dev
```

## SQLite

RAIL is configured for local SQLite through Prisma.

- SQLite CLI: `tools/sqlite/sqlite3.exe`
- SQLite version: `3.53.3`
- Prisma database URL: `DATABASE_URL="file:./dev.db"`
- Local database file: `prisma/dev.db`

Useful commands:

```powershell
pnpm prisma:push
pnpm prisma:seed
pnpm sqlite
pnpm db:reset
```

## Live Data Sync

RAIL now reads application data from Prisma instead of rendering asset/platform/source pages from mock data. The first live connector is RWA.xyz.

Required environment variables for live ingestion:

```powershell
DATABASE_URL="file:./dev.db"
RWA_API_KEY="your-rwa-xyz-api-key"
CRON_SECRET="random-string-at-least-16-characters"
SYNC_BATCH_LIMIT="100"
```

Routes:

- `GET /api/sync` runs the live sync job.
- `POST /api/sync` runs the same job for manual/admin triggers.
- `/admin/data-readiness` shows missing API keys, source gaps, low-confidence assets, missing contract references, and sync history.

Vercel runs `/api/sync` daily at `08:00 UTC` through `vercel.json`. Set `CRON_SECRET` in Vercel so cron requests are authenticated with `Authorization: Bearer <CRON_SECRET>`.

## Vercel Deployment

Use these project settings in Vercel:

- Framework Preset: `Next.js`
- Root Directory: repository root, the folder containing `package.json`
- Install Command: `pnpm install`
- Build Command: `pnpm build`
- Output Directory: leave blank

Local Prisma-backed data uses SQLite. For production writes on Vercel, use a hosted persistent database because local SQLite files are not durable in serverless deployments.
