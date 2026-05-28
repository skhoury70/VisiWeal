import http from "http";
import { randomBytes } from "crypto";
import { exec } from "child_process";
import { readFileSync } from "fs";
import { resolve } from "path";

const envPath = resolve(import.meta.dirname, "..", ".env.local");
try {
  const envContent = readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const value = trimmed.slice(eqIdx + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
} catch {}

const CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_OAUTH_CLIENT_SECRET;

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("Missing GOOGLE_OAUTH_CLIENT_ID or GOOGLE_OAUTH_CLIENT_SECRET");
  console.error("Set them as environment variables or create .env file.");
  process.exit(1);
}

const PORT = 3456;
const state = randomBytes(16).toString("hex");
const SCOPES = ["https://www.googleapis.com/auth/calendar"];

const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=http://localhost:${PORT}&response_type=code&scope=${encodeURIComponent(SCOPES.join(" "))}&access_type=offline&state=${state}&prompt=consent`;

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);

  if (url.pathname !== "/" || !url.searchParams.has("code")) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Waiting for authorization...</h1>");
    return;
  }

  if (url.searchParams.get("state") !== state) {
    res.writeHead(400);
    res.end("State mismatch");
    return;
  }

  const code = url.searchParams.get("code");

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: `http://localhost:${PORT}`,
      grant_type: "authorization_code",
    }),
  });

  const tokens = await tokenResponse.json();

  if (!tokens.refresh_token) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`<h1>Error</h1><pre>${JSON.stringify(tokens, null, 2)}</pre><p>No refresh_token received. Make sure you used 'prompt=consent' in the auth URL.</p>`);
    console.error("Response:", tokens);
    return;
  }

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(`<h1>Success!</h1><p>Copy this refresh token and add it to your .env.local:</p><pre style="background:#f4f4f4;padding:16px;font-size:14px">GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}</pre><p>Also make sure you have these in .env.local:</p><pre style="background:#f4f4f4;padding:16px;font-size:14px">GOOGLE_OAUTH_CLIENT_ID=${CLIENT_ID}
GOOGLE_OAUTH_CLIENT_SECRET=${CLIENT_SECRET}</pre>`);

  console.log("\n=== Refresh Token ===");
  console.log(tokens.refresh_token);
  console.log("\nAdd to .env.local:");
  console.log(`GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`);
  console.log(`GOOGLE_OAUTH_CLIENT_ID=${CLIENT_ID}`);
  console.log(`GOOGLE_OAUTH_CLIENT_SECRET=${CLIENT_SECRET}`);

  server.close();
});

server.listen(PORT, () => {
  console.log(`Open this URL in your browser:\n${authUrl}\n`);
  try { exec(`start "" "${authUrl}"`); } catch {}
});
