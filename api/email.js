"use strict";
/*
 * Waitlist confirmation email.
 * Prefer Gmail (hermixwaitlist@gmail.com) when WAITLIST_GMAIL_APP_PASSWORD is set.
 * Optional fallback: RESEND_API_KEY (from must be a verified Resend domain).
 * Failures are logged only — a signup should never fail because mail failed.
 */

const FROM = () => process.env.WAITLIST_FROM_EMAIL || "hermixwaitlist@gmail.com";

function welcomeCopy(email) {
  const subject = "You're on the Hermix waitlist";
  const text = [
    "Hi,",
    "",
    "Thanks for joining the Hermix waitlist. You're on the list.",
    "We'll email you at this address when there's something new to try.",
    "",
    "If this wasn't you, reply to this message and we'll remove you.",
    "",
    "— Hermix",
    `(signed up as ${email})`,
  ].join("\n");
  const html = `<!DOCTYPE html>
<html><body style="margin:0;padding:32px;background:#f6f1e8;color:#1a1714;font-family:Georgia,'Times New Roman',serif;line-height:1.5">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:520px;margin:0 auto;background:#fffdf8;border:1px solid #e4ddd2;border-radius:12px">
    <tr><td style="padding:28px 28px 8px;font-size:22px;font-weight:700">You're on the Hermix waitlist</td></tr>
    <tr><td style="padding:8px 28px 8px;font-size:16px;color:#4a453f">Thanks for joining. We'll email you when there's something new to try on your Windows PC.</td></tr>
    <tr><td style="padding:8px 28px 28px;font-size:14px;color:#7a736a">If this wasn't you, reply to this message and we'll remove you.<br/><br/>— Hermix</td></tr>
  </table>
</body></html>`;
  return { subject, text, html };
}

async function sendViaGmail({ to, subject, text, html }) {
  const user = FROM();
  const pass = process.env.WAITLIST_GMAIL_APP_PASSWORD;
  if (!pass) return false;
  let nodemailer;
  try {
    nodemailer = require("nodemailer");
  } catch {
    console.error("nodemailer missing; cannot send Gmail waitlist mail");
    return false;
  }
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });
  await transport.sendMail({
    from: `"Hermix" <${user}>`,
    to,
    bcc: user,
    replyTo: user,
    subject,
    text,
    html,
  });
  return true;
}

async function sendViaResend({ to, subject, text, html }) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;
  const from = process.env.RESEND_FROM_EMAIL || `Hermix <${FROM()}>`;
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      bcc: [FROM()],
      reply_to: FROM(),
      subject,
      text,
      html,
    }),
  });
  if (!r.ok) {
    console.error("resend waitlist mail failed", r.status);
    return false;
  }
  return true;
}

async function sendWaitlistWelcome(email) {
  const msg = welcomeCopy(email);
  try {
    if (await sendViaGmail({ to: email, ...msg })) return true;
    if (await sendViaResend({ to: email, ...msg })) return true;
    console.warn("waitlist welcome not sent: set WAITLIST_GMAIL_APP_PASSWORD (or RESEND_API_KEY)");
    return false;
  } catch (err) {
    console.error("waitlist welcome failed", err && err.message);
    return false;
  }
}

module.exports = { sendWaitlistWelcome, FROM };
