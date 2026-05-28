import { google } from "googleapis";

function getHasOAuthCreds() {
  return !!(
    process.env.GOOGLE_OAUTH_CLIENT_ID &&
    process.env.GOOGLE_OAUTH_CLIENT_SECRET &&
    process.env.GOOGLE_REFRESH_TOKEN
  );
}

function getHasServiceAccountCreds() {
  return !!(
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
    process.env.GOOGLE_SERVICE_ACCOUNT_KEY &&
    process.env.GOOGLE_CALENDAR_ID
  );
}

export function hasAnyCalendarCreds() {
  return getHasOAuthCreds() || getHasServiceAccountCreds();
}

async function getAuth() {
  if (getHasOAuthCreds()) {
    const auth = new google.auth.OAuth2(
      process.env.GOOGLE_OAUTH_CLIENT_ID,
      process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    );
    auth.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
    return auth;
  }

  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_KEY!;
  const creds = JSON.parse(raw);
  return new google.auth.JWT({
    email: creds.client_email,
    key: creds.private_key,
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });
}

export async function createCalendarEvent(params: {
  fullName: string;
  email: string;
  phone: string;
  date: string;
  timeSlot: string;
  services: string[];
  notes: string;
}) {
  const auth = await getAuth();
  const calendarId = process.env.GOOGLE_CALENDAR_ID || "primary";
  const calendar = google.calendar({ version: "v3", auth });

  const [startHour] = params.timeSlot.split(" - ")[0].split(":").map(Number);
  const start = new Date(`${params.date}T${String(startHour).padStart(2, "0")}:00:00`);
  const end = new Date(start.getTime() + 60 * 60 * 1000);

  const canCreateMeet = getHasOAuthCreds();

  if (canCreateMeet) {
    const response = await calendar.events.insert({
      calendarId,
      requestBody: {
        summary: `Consultation — ${params.fullName}`,
        description: `Name: ${params.fullName}\nEmail: ${params.email}\nPhone: ${params.phone}\n\nServices: ${params.services.join(", ")}\nNotes: ${params.notes || "None"}`,
        start: { dateTime: start.toISOString(), timeZone: "Asia/Beirut" },
        end: { dateTime: end.toISOString(), timeZone: "Asia/Beirut" },
        conferenceData: {
          createRequest: {
            requestId: `visiweal-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            conferenceSolutionKey: { type: "hangoutsMeet" },
          },
        },
      },
      conferenceDataVersion: 1,
    });
    return response.data;
  }

  const eventBody = {
    summary: `Consultation — ${params.fullName}`,
    description: `Name: ${params.fullName}\nEmail: ${params.email}\nPhone: ${params.phone}\n\nServices: ${params.services.join(", ")}\nNotes: ${params.notes || "None"}`,
    start: { dateTime: start.toISOString(), timeZone: "Asia/Beirut" },
    end: { dateTime: end.toISOString(), timeZone: "Asia/Beirut" },
  };

  let event;
  try {
    event = await calendar.events.insert({
      calendarId,
      requestBody: {
        ...eventBody,
        conferenceData: {
          createRequest: {
            requestId: `visiweal-${Date.now()}`,
            conferenceSolutionKey: { type: "hangoutsMeet" },
          },
        },
      },
      conferenceDataVersion: 1,
    });
  } catch {
    event = await calendar.events.insert({
      calendarId,
      requestBody: eventBody,
    });
  }

  return event.data;
}
