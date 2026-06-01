import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { Resend } from "resend";

/**
 * Waitlist capture endpoint.
 *
 * Production (Vercel): RESEND_API_KEY env var must be set.
 *   → Every signup sends a notification email to NOTIFY_EMAIL (founders).
 *
 * Local dev (no RESEND_API_KEY): falls back to the file-based store at
 *   .data/waitlist.json so the form works without any API key.
 *
 * Phase 0: swap notifyViaEmail() for a Postgres write once the DB is up.
 *   The validation + honeypot logic above that seam stays unchanged.
 */

export const runtime = "nodejs";

// ─── config ────────────────────────────────────────────────────────────────
// Set these in Vercel → Project → Settings → Environment Variables.
const RESEND_API_KEY = process.env.RESEND_API_KEY ?? "";
const NOTIFY_EMAIL   = process.env.NOTIFY_EMAIL   ?? "himanshitomar@icloud.com"; // who gets pinged
const FROM_EMAIL     = process.env.FROM_EMAIL      ?? "waitlist@datasiftai.ai";   // must be verified in Resend

// ─── validation ────────────────────────────────────────────────────────────
const EMAIL_RE     = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_ROLES = new Set(["researcher","public-health","education","nonprofit","other"]);

type Signup = { email: string; role: string; note: string; createdAt: string };

const ROLE_LABELS: Record<string, string> = {
  "researcher":    "Researcher / academic",
  "public-health": "Public health / gov",
  "education":     "School / district",
  "nonprofit":     "Nonprofit / policy",
  "other":         "Other",
};

// ─── delivery: email via Resend ────────────────────────────────────────────
async function notifyViaEmail(signup: Signup): Promise<void> {
  if (!RESEND_API_KEY) {
    // Local dev fallback — persist to file
    await persistToFile(signup);
    return;
  }

  const resend = new Resend(RESEND_API_KEY);
  await resend.emails.send({
    from: FROM_EMAIL,
    to:   NOTIFY_EMAIL,
    subject: `New DataSift AI waitlist signup — ${signup.email}`,
    text: [
      "New early-access request:",
      "",
      `Email:   ${signup.email}`,
      `Role:    ${ROLE_LABELS[signup.role] ?? signup.role}`,
      `Note:    ${signup.note || "(none)"}`,
      `Time:    ${signup.createdAt}`,
    ].join("\n"),
    html: `
      <h2 style="font-family:sans-serif;margin-bottom:16px">New DataSift AI waitlist signup</h2>
      <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
        <tr><td style="padding:6px 16px 6px 0;color:#666;font-weight:600">Email</td>
            <td style="padding:6px 0">${signup.email}</td></tr>
        <tr><td style="padding:6px 16px 6px 0;color:#666;font-weight:600">Role</td>
            <td style="padding:6px 0">${ROLE_LABELS[signup.role] ?? signup.role}</td></tr>
        <tr><td style="padding:6px 16px 6px 0;color:#666;font-weight:600">Note</td>
            <td style="padding:6px 0">${signup.note || "<em>—</em>"}</td></tr>
        <tr><td style="padding:6px 16px 6px 0;color:#666;font-weight:600">Time</td>
            <td style="padding:6px 0">${signup.createdAt}</td></tr>
      </table>
    `,
  });
}

// ─── local dev fallback: file store ────────────────────────────────────────
const DATA_DIR = path.join(process.cwd(), ".data");
const STORE    = path.join(DATA_DIR, "waitlist.json");

async function persistToFile(signup: Signup): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  let existing: Signup[] = [];
  try { existing = JSON.parse(await fs.readFile(STORE, "utf8")); } catch { /* new file */ }
  if (existing.some((s) => s.email === signup.email)) return; // dedupe
  existing.push(signup);
  await fs.writeFile(STORE, JSON.stringify(existing, null, 2), "utf8");
}

// ─── route handler ─────────────────────────────────────────────────────────
export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields; silently accept so they think they succeeded
  if (typeof payload.company_url === "string" && payload.company_url.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const email = String(payload.email ?? "").trim().toLowerCase();
  const role  = String(payload.role  ?? "").trim();
  const note  = String(payload.note  ?? "").trim().slice(0, 500);

  if (!EMAIL_RE.test(email))     return NextResponse.json({ error: "Please enter a valid email address." }, { status: 422 });
  if (!ALLOWED_ROLES.has(role))  return NextResponse.json({ error: "Please select a role." },               { status: 422 });

  try {
    await notifyViaEmail({ email, role, note, createdAt: new Date().toISOString() });
  } catch (err) {
    console.error("[waitlist] delivery failed:", err);
    // Don't surface internal details to the client
    return NextResponse.json({ error: "Could not save signup. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
