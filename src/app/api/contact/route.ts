import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, project, budget, message } = await req.json();

    if (!name || !email || !project || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email to the team
    await transporter.sendMail({
      from: `"Lubech Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO ?? process.env.SMTP_USER,
      replyTo: email,
      subject: `New Project Enquiry — ${project} from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0f0f23; color: #fff; border-radius: 16px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #4676C2, #59C368); padding: 32px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px; color: #fff;">New Project Enquiry</h1>
          </div>
          <div style="padding: 32px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; color: #aaa; width: 130px; vertical-align: top;">Name</td>
                <td style="padding: 10px 0; color: #fff; font-weight: 600;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #aaa; vertical-align: top;">Email</td>
                <td style="padding: 10px 0; color: #fff;">${email}</td>
              </tr>
              ${
                phone
                  ? `<tr>
                <td style="padding: 10px 0; color: #aaa; vertical-align: top;">Phone</td>
                <td style="padding: 10px 0; color: #fff;">${phone}</td>
              </tr>`
                  : ""
              }
              <tr>
                <td style="padding: 10px 0; color: #aaa; vertical-align: top;">Project Type</td>
                <td style="padding: 10px 0; color: #fff;">${project}</td>
              </tr>
              ${
                budget
                  ? `<tr>
                <td style="padding: 10px 0; color: #aaa; vertical-align: top;">Budget</td>
                <td style="padding: 10px 0; color: #fff;">${budget}</td>
              </tr>`
                  : ""
              }
              <tr>
                <td style="padding: 10px 0; color: #aaa; vertical-align: top;">Message</td>
                <td style="padding: 10px 0; color: #fff; white-space: pre-wrap;">${message}</td>
              </tr>
            </table>
          </div>
          <div style="padding: 16px 32px; background: rgba(255,255,255,0.04); text-align: center; color: #666; font-size: 12px;">
            Sent via Lubech contact form
          </div>
        </div>
      `,
    });

    // Auto-reply to the sender
    await transporter.sendMail({
      from: `"Lubech" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "We received your message — Lubech",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0f0f23; color: #fff; border-radius: 16px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #4676C2, #59C368); padding: 32px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px; color: #fff;">Thanks, ${name}!</h1>
          </div>
          <div style="padding: 32px;">
            <p style="color: #ccc; line-height: 1.7;">
              We've received your enquiry about <strong style="color:#fff">${project}</strong> and will get back to you within 24 hours.
            </p>
            <p style="color: #ccc; line-height: 1.7;">
              In the meantime, feel free to browse our portfolio or reach out directly at
              <a href="mailto:${process.env.CONTACT_TO}" style="color: #59C368;">${process.env.CONTACT_TO}</a>.
            </p>
            <p style="color: #888; margin-top: 32px; font-size: 13px;">— The Lubech Team</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 },
    );
  }
}
