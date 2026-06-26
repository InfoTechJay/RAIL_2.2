# RAIL

RAIL, short for Real Asset Information Ledger, is a Next.js MVP for researching tokenized real-world assets.

## Local Development

```powershell
pnpm install
pnpm dev
```

## Vercel Deployment

Use these project settings in Vercel:

- Framework Preset: `Next.js`
- Root Directory: repository root, the folder containing `package.json`
- Install Command: `pnpm install`
- Build Command: `pnpm build`
- Output Directory: leave blank

The current MVP uses mock data from `lib/mock-data.ts`, so a database is not required for the first deployment.
When enabling Prisma-backed data later, add `DATABASE_URL` in Vercel environment variables.
