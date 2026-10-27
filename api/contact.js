"use strict";
// POST /api/contact  { topic, email, name?, message, website (honeypot), elapsedMs }
// Public, write-only. Messages land in the contact_messages table for the team to read.
const { normalizeEmail, isValidEmail, createLimiter, send, insertRow, guard, NotConfigured } = require("./_lib");

const TOPICS = ["general", "privacy", "remove_waitlist", "security", "copyright", "misuse"];
const limiter = createLimiter({ limit: 5, windowMs: 30 * 60 * 1000 });

const clean = (s, max) => (typeof s === "string" ? s.replace(/\u0000/g, "").trim().slice(0, max) : "");

async function handler(req, res) {
  const g = await guard(req, res, limiter);
  if (!g) return;
  const b = g.body;
  const errors = {};
  const topic = TOPICS.includes(b.topic) ? b.topic : null;
  if (!topic) errors.topic = "invalid";
  const email = normalizeEmail(b.email);
  if (!email || !isValidEmail(email)) errors.email = "invalid";
  const name = clean(b.name, 100);
  const message = clean(b.message, 4000);
  if (message.length < 10) errors.message = "too_short";
  if (typeof b.message === "string" && b.message.trim().length > 4000) errors.message = "too_long";
  if (Object.keys(errors).length) return send(res, 400, { error: "invalid", fields: errors });
  try {
    await insertRow("contact_messages", { topic, email, name: name || null, message });
    return send(res, 200, { ok: true });
  } catch (err) {
    if (err instanceof NotConfigured) return send(res, 503, { error: "unavailable" });
    console.error("contact insert failed", err && err.status);
    return send(res, 500, { error: "server_error" });
  }
}

module.exports = handler;
module.exports.TOPICS = TOPICS;
module.exports._limiter = limiter;
