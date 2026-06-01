import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";

/**
 * Waitlist capture endpoint.
 *
 * Storage is intentionally a local JSON file for now — zero infra, works in
 * local dev, and keeps the marketing site shippable before Phase 0 stands up
 * Postgres. `persistSignup()` is the single seam to replace with a real store
 * (Postgres) and/or an email service (Resend) later. Everything else stays.
 *
 * NOTE: a file-backed store does NOT persist on serverless/ephemeral hosts
 * (e.g. Vercel). Before deploying to such a host, swap persistSignup() for the
 * database write. This is tracked as a Phase 0 task.
 */

export const runtime = "nodejs"; // file system access

const DATA_DIR = path.join(process.cwd(), ".data");
const STORE = path.join(DATA_DIR, "waitlist.json");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_ROLES = new Set(["researcher", "public-health", "education", "nonprofit", "other"]);

type Signup = {
  email: string;
  role: string;
  note: string;
  createdAt: string;
};

async function readStore(): Promise<Signup[]> {
  try {
    const raw = await fs.readFile(STORE, "utf8");
    return JSON.parse(raw) as Signup[];
  } catch {
    return [];
  }
}

async function persistSignup(signup: Signup): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const existing = await readStore();
  if (existing.some((s) => s.email === signup.email)) {
    return; // idempotent: silently dedupe on email
  }
  existing.push(signup);
  await fs.writeFile(STORE, JSON.stringify(existing, null, 2), "utf8");
}

export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: silently accept bots so they think they succeeded.
  if (typeof payload.company_url === "string" && payload.company_url.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const email = String(payload.email ?? "").trim().toLowerCase();
  const role = String(payload.role ?? "").trim();
  const note = String(payload.note ?? "").trim().slice(0, 500);

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 422 });
  }
  if (!ALLOWED_ROLES.has(role)) {
    return NextResponse.json({ error: "Please select a role." }, { status: 422 });
  }

  try {
    await persistSignup({ email, role, note, createdAt: new Date().toISOString() });
  } catch (err) {
    console.error("waitlist persist failed:", err);
    return NextResponse.json({ error: "Could not save signup. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
