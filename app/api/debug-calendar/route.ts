import { NextResponse } from "next/server";

export async function GET() {
  const { google } = await import("googleapis");
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_KEY!;
  const creds = JSON.parse(raw);
  const auth = new google.auth.JWT({
    email: creds.client_email,
    key: creds.private_key,
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });
  const calendar = google.calendar({ version: "v3", auth });
  const calId = process.env.GOOGLE_CALENDAR_ID!;
  const r = await calendar.events.list({
    calendarId: calId,
    maxResults: 20,
    orderBy: "startTime",
    singleEvents: true,
    timeMin: "2026-06-01T00:00:00Z",
  });
  const events = (r.data.items || []).map((e) => ({
    summary: e.summary,
    start: e.start?.dateTime,
    hasMeet: !!e.hangoutLink,
    meetLink: e.hangoutLink || null,
  }));
  return NextResponse.json({ count: events.length, events });
}