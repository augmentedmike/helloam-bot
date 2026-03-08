import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import nodemailer from "nodemailer";

const rateLimitMap = new Map<string, { count: number; windowStart: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 3;

function getClientIP(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS waitlist (
      id              SERIAL PRIMARY KEY,
      preorder_number INTEGER,
      type            VARCHAR(10)  NOT NULL CHECK (type IN ('preorder','list')),
      name            VARCHAR(100) NOT NULL,
      email           VARCHAR(254) NOT NULL UNIQUE,
      color           VARCHAR(50),
      ip              VARCHAR(64),
      joined_at       TIMESTAMPTZ  NOT NULL DEFAULT NOW()
    )
  `;
}

async function sendEmailNotification(entry: {
  name: string; email: string; type: string;
  color?: string; ip: string; preorderNumber?: number;
}): Promise<void> {
  const gmailPass = process.env.GMAIL_APP_PASSWORD;
  if (!gmailPass) return;
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", port: 587, secure: false,
    auth: { user: "augmentedmike@gmail.com", pass: gmailPass },
  });
  await transporter.sendMail({
    from: '"helloam.bot" <augmentedmike@gmail.com>',
    to: "augmentedmike@gmail.com",
    subject: `New ${entry.type} signup: ${entry.name}`,
    text: [
      `New ${entry.type} on helloam.bot`,
      `Name: ${entry.name}`,
      `Email: ${entry.email}`,
      entry.color ? `Color: ${entry.color}` : "",
      `IP: ${entry.ip}`,
      entry.preorderNumber ? `Pre-order #${entry.preorderNumber}` : "",
    ].filter(Boolean).join("\n"),
  });
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIP(req);
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
    }

    const body = await req.json();
    const { name, email, type = "list", color } = body;

    if (!name || typeof name !== "string" || name.trim().length < 2)
      return NextResponse.json({ error: "Please enter your name (at least 2 characters)." }, { status: 400 });
    if (!email || typeof email !== "string" || !isValidEmail(email.trim()))
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });

    const cleanName  = name.trim().slice(0, 100);
    const cleanEmail = email.trim().toLowerCase().slice(0, 254);
    const cleanType  = type === "preorder" ? "preorder" : "list";
    const cleanColor = typeof color === "string" ? color.trim().slice(0, 50) : null;

    await ensureTable();

    // Duplicate check
    const existing = await sql`SELECT id FROM waitlist WHERE email = ${cleanEmail}`;
    if (existing.rowCount && existing.rowCount > 0) {
      return NextResponse.json({ error: "This email is already registered." }, { status: 409 });
    }

    // Assign pre-order number
    let preorderNumber: number | undefined;
    if (cleanType === "preorder") {
      const countRow = await sql`SELECT COUNT(*) AS cnt FROM waitlist WHERE type = 'preorder'`;
      preorderNumber = Number(countRow.rows[0].cnt) + 1;
    }

    await sql`
      INSERT INTO waitlist (preorder_number, type, name, email, color, ip)
      VALUES (${preorderNumber ?? null}, ${cleanType}, ${cleanName}, ${cleanEmail}, ${cleanColor}, ${ip})
    `;

    sendEmailNotification({ name: cleanName, email: cleanEmail, type: cleanType, color: cleanColor ?? undefined, ip, preorderNumber }).catch(
      (err) => console.error("[waitlist] email failed:", err)
    );

    return NextResponse.json({
      success: true,
      type: cleanType,
      ...(preorderNumber !== undefined ? { preorderNumber } : {}),
    });
  } catch (err: unknown) {
    // If DB not configured, surface a clear error in logs but return generic to user
    console.error("[waitlist] Error:", err);
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes("POSTGRES_URL") || msg.includes("connect")) {
      return NextResponse.json({ error: "Database not configured. Please contact hello@helloam.bot." }, { status: 503 });
    }
    return NextResponse.json({ error: "Server error. Please try again." }, { status: 500 });
  }
}
