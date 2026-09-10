import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

/* ── Helpers ─────────────────────────────────────────────────────────────── */

const MAX = { name: 120, email: 254, phone: 40, project: 80, budget: 80, message: 5000 } as const;
type Field = keyof typeof MAX;

/** Escape user input before it is interpolated into e-mail HTML. */
function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function clean(input: unknown, field: Field): string {
  return typeof input === "string" ? input.trim().slice(0, MAX[field]) : "";
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ── E-mail layout (brand: deep black + blue → cyan) ─────────────────── */

const GRADIENT = "linear-gradient(135deg, #2563eb 0%, #0369a1 55%, #0e7490 100%)";

function shell(headline: string, body: string): string {
  return `
  <div style="margin:0;padding:24px;background:#05050a;">
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a12;color:#fff;border:1px solid rgba(59,130,246,0.25);border-radius:20px;overflow:hidden;">
      <div style="background:${GRADIENT};padding:32px;text-align:center;">
        <h1 style="margin:0;font-size:22px;line-height:1.3;color:#fff;">${headline}</h1>
      </div>
      <div style="padding:32px;">${body}</div>
      <div style="padding:16px 32px;background:rgba(255,255,255,0.04);text-align:center;color:#6b6b80;font-size:12px;">
        Sent via the contact form at lubech.tech
      </div>
    </div>
  </div>`;
}

function row(label: string, value: string, pre = false): string {
  return `
    <tr>
      <td style="padding:10px 0;color:#9d9db0;width:130px;vertical-align:top;font-size:14px;">${label}</td>
      <td style="padding:10px 0;color:#fff;font-size:14px;${pre ? "white-space:pre-wrap;" : ""}">${value}</td>
    </tr>`;
}

/* ── Handler ─────────────────────────────────────────────────────────────── */

export async function POST(req: NextRequest) {
  let payload: Record<string, unknown>;
  try {
    payload = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const name = clean(payload.name, "name");
  const email = clean(payload.email, "email");
  const phone = clean(payload.phone, "phone");
  const project = clean(payload.project, "project");
  const budget = clean(payload.budget, "budget");
  const message = clean(payload.message, "message");

  if (!name || !email || !project || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
  }

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error("Contact form: SMTP_* environment variables are not configured");
    return NextResponse.json(
      { error: "The contact form is temporarily unavailable. Please email us directly." },
      { status: 503 },
    );
  }

  const to = process.env.CONTACT_TO ?? process.env.SMTP_USER;

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    // 1. Notification to the team
    await transporter.sendMail({
      from: `"Lubech Contact" <${process.env.SMTP_USER}>`,
      to,
      replyTo: email,
      subject: `New project enquiry — ${project} from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        phone && `Phone: ${phone}`,
        `Project type: ${project}`,
        budget && `Budget: ${budget}`,
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
      html: shell(
        "New project enquiry",
        `<table style="width:100%;border-collapse:collapse;">
          ${row("Name", `<strong>${esc(name)}</strong>`)}
          ${row("Email", `<a href="mailto:${esc(email)}" style="color:#38bdf8;text-decoration:none;">${esc(email)}</a>`)}
          ${phone ? row("Phone", esc(phone)) : ""}
          ${row("Project type", esc(project))}
          ${budget ? row("Budget", esc(budget)) : ""}
          ${row("Message", esc(message), true)}
        </table>`,
      ),
    });

    // 2. Auto-reply to the sender
    await transporter.sendMail({
      from: `"Lubech" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "We received your message — Lubech",
      text: `Thanks, ${name}!\n\nWe've received your enquiry about ${project} and will get back to you within 24 hours.\n\nIn the meantime you can reach us directly at ${to}.\n\n— The Lubech Team`,
      html: shell(
        `Thanks, ${esc(name)}!`,
        `<p style="margin:0 0 16px;color:#c9c9d6;line-height:1.7;font-size:15px;">
          We've received your enquiry about <strong style="color:#fff;">${esc(project)}</strong> and will get back to you within 24 hours.
        </p>
        <p style="margin:0;color:#c9c9d6;line-height:1.7;font-size:15px;">
          In the meantime, feel free to browse our work at
          <a href="https://lubech.tech/#work" style="color:#38bdf8;text-decoration:none;">lubech.tech</a>
          or reach us directly at
          <a href="mailto:${esc(to)}" style="color:#38bdf8;text-decoration:none;">${esc(to)}</a>.
        </p>
        <p style="margin:32px 0 0;color:#8a8a9e;font-size:13px;">— The Lubech Team</p>`,
      ),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
  }
}
