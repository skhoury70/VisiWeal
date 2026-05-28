<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Goal
Complete all audit findings and enhance the Visiweal booking system with email notifications, custom calendar date/time picker, Supabase slot blocking, and Google Calendar/Meet integration.

## Setup Needed (one-time)
1. **Supabase** (free, no credit card):
   - Go to https://supabase.com, sign up, create a project
   - In SQL Editor, run the SQL from `docs/schema.sql` to create the `bookings` table
   - Go to Project Settings → API → copy `Project URL` and `service_role key`
   - Paste them in `.env.local` as `SUPABASE_URL` and `SUPABASE_SERVICE_KEY`

2. **Google Calendar + Meet** (free):
   - Go to https://console.cloud.google.com, create a project
   - Enable "Google Calendar API"
   - Go to "Credentials" → "Create Credentials" → "Service Account"
   - Give it a name, then click "Keys" → "Add Key" → "JSON" → download
   - Copy the `client_email` from the JSON → set as `GOOGLE_SERVICE_ACCOUNT_EMAIL` in `.env.local`
   - Copy the entire JSON → set as `GOOGLE_SERVICE_ACCOUNT_KEY` in `.env.local`
   - Share your Google Calendar (sleiman.elkhoury@visiweal.com) with the service account email, give "Make changes to events" permissions
   - Set `GOOGLE_CALENDAR_ID=sleiman.elkhoury@visiweal.com` in `.env.local`

## Files Created/Modified
- `lib/supabase.ts` — Supabase client (lazy, no crash if env vars missing)
- `lib/google-calendar.ts` — Creates Calendar events with Google Meet links
- `app/api/slots/route.ts` — GET /api/slots?date=YYYY-MM-DD → returns taken time slots
- `app/api/book/route.ts` — Updated: saves to Supabase, creates Calendar event, sends email
- `docs/schema.sql` — SQL to run in Supabase SQL Editor
- `.env.local` — New env var placeholders added
- `app/[locale]/book-consultation/book-consultation-form.tsx` — Step 3 fetches real-time slot availability

## How It Works
- When a user picks a date, the form calls `/api/slots?date=...` to check which slots are taken
- Taken slots show "(taken)" and are disabled
- On submit, the API checks Supabase for double-booking (409 if taken), inserts the booking, creates a Google Calendar event with a Meet link, and sends the email notification
- If Supabase/Google env vars aren't set, the system gracefully falls back to email-only mode

## Build Status
- Lint: 0 errors, 0 warnings
- Build: 20 routes + 2 API routes, all passing
