"use strict";
// POST /api/waitlist  { email, website (honeypot), elapsedMs }
// Public, write-only. Never reveals whether an address was already on the list.
const { normalizeEmail, isValidEmail, createLimiter, send, insertRow, guard, NotConfigured } = require("./_lib");
const { sendWaitlistWelcome } = require("./email");

const CONSENT_VERSION = "waitlist-2026-10-27"; // bump when the notice under the form changes
const limiter = createLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });

async function handler(req, res) {
  const g = await guard(req, res, limiter);
  if (!g) return;
  const email = normalizeEmail(g.body.email);
  if (!email || !isValidEmail(email)) return send(res, 400, { error: "invalid_email" });
  try {
    const rows = await insertRow(
      "waitlist_signups",
      { email, source: "landing", consent_version: CONSENT_VERSION },
      { ignoreDuplicatesOn: "email", returnRows: true },
    );
    // Only mail brand-new signups (ignored duplicates return no rows).
    if (rows.length) await sendWaitlistWelcome(email);
    return send(res, 200, { ok: true });
  } catch (err) {
    if (err instanceof NotConfigured) return send(res, 503, { error: "unavailable" });
    console.error("waitlist insert failed", err && err.status);
    return send(res, 500, { error: "server_error" });
  }
}

module.exports = handler;
module.exports._limiter = limiter;
