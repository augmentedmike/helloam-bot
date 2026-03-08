import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import os from "os";
import nodemailer from "nodemailer";

const rateLimitMap = new Map<string, { count: number; windowStart: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 3;

interface WaitlistEntry {
  number?: number;         // pre-order number (preorders only)
  type: "preorder" | "list";
  name: string;
  email: string;
  color?: string;
  ip: string;
  joinedAt: string;
}

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

async function sendEmailNotification(entry: WaitlistEntry): Promise<void> {
  const gmailPass = process.env.GMAIL_APP_PASSWORD;
  if (!gmailPass) return;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "augmentedmike@gmail.com",
      pass: gmailPass,
    },
  });

  await transporter.sendMail({
    from: '"helloam.bot waitlist" <augmentedmike@gmail.com>',
    to: "augmentedmike@gmail.com",
    subject: `New waitlist signup: ${entry.name}`,
    text: [
      `New ${entry.type} signup on helloam.bot`,
      `Name: ${entry.name}`,
      `Email: ${entry.email}`,
      `Type: ${entry.type}`,
      entry.color ? `Color: ${entry.color}` : "",
      `IP: ${entry.ip}`,
      `Time: ${entry.joinedAt}`,
      entry.number ? `Pre-order #${entry.number}` : "",
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

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "Please enter your name (at least 2 characters)." }, { status: 400 });
    }
    if (!email || typeof email !== "string" || !isValidEmail(email.trim())) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const cleanName = name.trim().slice(0, 100);
    const cleanEmail = email.trim().toLowerCase().slice(0, 254);
    const cleanType = type === "preorder" ? "preorder" : "list";
    const cleanColor = typeof color === "string" ? color.trim().slice(0, 50) : undefined;

    const waitlistDir = path.join(os.homedir(), "am", "user", "augmentedmike_bot");
    const waitlistPath = path.join(waitlistDir, "waitlist.json");

    let entries: WaitlistEntry[] = [];
    let fsAvailable = false;

    try {
      await fs.mkdir(waitlistDir, { recursive: true });
      try {
        const raw = await fs.readFile(waitlistPath, "utf-8");
        entries = JSON.parse(raw);
        if (!Array.isArray(entries)) entries = [];
      } catch {
        entries = [];
      }
      fsAvailable = true;
    } catch {
      // Filesystem not available (e.g., Vercel serverless) — email fallback
      fsAvailable = false;
    }

    // Check for duplicate if fs available
    if (fsAvailable) {
      const duplicate = entries.find((e) => e.email.toLowerCase() === cleanEmail);
      if (duplicate) {
        return NextResponse.json({ error: "This email is already registered." }, { status: 409 });
      }
    }

    // Assign pre-order number
    const preorderCount = entries.filter((e) => e.type === "preorder").length;
    const preorderNumber = cleanType === "preorder" ? preorderCount + 1 : undefined;

    const newEntry: WaitlistEntry = {
      ...(preorderNumber !== undefined ? { number: preorderNumber } : {}),
      type: cleanType,
      name: cleanName,
      email: cleanEmail,
      ...(cleanColor ? { color: cleanColor } : {}),
      ip,
      joinedAt: new Date().toISOString(),
    };

    if (fsAvailable) {
      entries.push(newEntry);
      await fs.writeFile(waitlistPath, JSON.stringify(entries, null, 2), "utf-8");
    }

    // Always send email notification (fire and forget)
    sendEmailNotification(newEntry).catch((err) =>
      console.error("[waitlist] Email notification failed:", err)
    );

    return NextResponse.json({
      success: true,
      type: cleanType,
      ...(preorderNumber !== undefined ? { preorderNumber } : {}),
    }, { status: 200 });
  } catch (err) {
    console.error("[waitlist] Error:", err);
    return NextResponse.json({ error: "Server error. Please try again." }, { status: 500 });
  }
}
