# Deployment Protocol

## When You Want to Publish Changes

Just say: *"Deploy the changes"* or *"Push the updates"*

The AI will handle:

### 1. Review what changed
- Check `git status` and `git diff` for modified/new/deleted files

### 2. Commit checklist

**Include in commit:**
- Source code changes (components, pages, API routes, styles)
- New files you created
- Configuration files (next.config.ts, tailwind.config, etc.)
- package.json and package-lock.json (when deps change)

**Exclude from commit:**
- `.env.local` — contains secrets. Never committed.
- `node_modules/` — gitignored.
- `.next/`, `.open-next/`, `out/` — build artifacts, gitignored.
- `docs/*.json` — credential files, gitignored (except `docs/schema.sql`).
- `*.tsbuildinfo`, `next-env.d.ts` — auto-generated.

### 3. Commit and push
```
git add <files>
git commit -m "description of changes"
git push origin main
```

### 4. After push
Vercel auto-deploys. Check https://vercel.com/skhoury70/visiweal for status.

---

## Environment Variables (⚠️ Important)

If new environment variables were added in `.env.local` during the work, they must also be added to Vercel:

1. Go to **Vercel Dashboard** → **visiweal** → **Settings** → **Environment Variables**
2. Add the new key-value pair for **Production** (and Preview if needed)
3. Redeploy or wait for next push

### Current env vars used in this project:

| Variable | Where Used |
|---|---|
| `SUPABASE_URL` | `lib/supabase.ts` |
| `SUPABASE_SERVICE_KEY` | `lib/supabase.ts` |
| `GOOGLE_CLIENT_EMAIL` | `lib/google-calendar.ts` |
| `GOOGLE_PRIVATE_KEY` | `lib/google-calendar.ts` |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | `lib/google-calendar.ts` |
| `GOOGLE_SERVICE_ACCOUNT_KEY` | `lib/google-calendar.ts` |
| `GOOGLE_CALENDAR_ID` | `lib/google-calendar.ts` |
| `ZOHO_SMTP_HOST` | `lib/email.ts` |
| `ZOHO_SMTP_PORT` | `lib/email.ts` |
| `ZOHO_EMAIL` | `lib/email.ts` (SMTP auth user + default from) |
| `ZOHO_PASSWORD` | `lib/email.ts` (SMTP auth pass) |
| `CRON_SECRET` | `app/api/newsletter/cron/route.ts` |
