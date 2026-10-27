"use strict";
/*
 * Shared server-side helpers for the public form endpoints.
 * Nothing here is shipped to the browser. Secrets come from environment variables only.
 *
 *   SUPABASE_URL               e.g. https://xyzcompany.supabase.co
 *   SUPABASE_SERVICE_ROLE_KEY  service-role key (server only, never in client code)
 */

const EMAIL_MAX = 254;
const LOCAL_MAX = 64;

// Policy: trim, then lowercase the whole address. Mailbox providers treat the local
// part case-insensitively in practice, and one person should map to one row.
function normalizeEmail(raw) {
  if (typeof raw !== "string") return null;
  const email = raw.trim().toLowerCase();
  return email.length ? email : null;
}

function isValidEmail(email) {
  if (typeof email !== "string" || email.length > EMAIL_MAX) return false;
  const at = email.lastIndexOf("@");
  if (at < 1 || at !== email.indexOf("@")) return false;
  const local = email.slice(0, at);
  const domain = email.slice(at + 1);
  if (local.length > LOCAL_MAX) return false;
  if (!/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(local)) return false;
  if (local.startsWith(".") || local.endsWith(".") || local.includes("..")) return false;
  const labels = domain.split(".");
  if (labels.length < 2) return false;
  if (!labels.every((l) => /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(l))) return false;
  if (!/^[a-z]{2,63}$/.test(labels[labels.length - 1]) && !/^xn--[a-z0-9-]+$/.test(labels[labels.length - 1])) return false;
  return true;
}

// Best-effort, per-instance rate limit. Serverless instances don't share memory, so
// this slows bursts from one address; it is not a hard global quota.
function createLimiter({ limit, windowMs }) {
  const hits = new Map();
  return function allow(key, now = Date.now()) {
    const recent = (hits.get(key) || []).filter((t) => now - t < windowMs);
    if (recent.length >= limit) { hits.set(key, recent); return false; }
    recent.push(now);
    hits.set(key, recent);
    if (hits.size > 5000) for (const [k, v] of hits) if (!v.some((t) => now - t < windowMs)) hits.delete(k);
    return true;
  };
}

function clientIp(req) {
  const fwd = req.headers && (req.headers["x-forwarded-for"] || req.headers["X-Forwarded-For"]);
  if (typeof fwd === "string" && fwd.length) return fwd.split(",")[0].trim();
  return (req.socket && req.socket.remoteAddress) || "unknown";
}

async function readJson(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") { try { return JSON.parse(req.body); } catch { return null; } }
  const chunks = [];
  let size = 0;
  for await (const c of req) { size += c.length; if (size > 16 * 1024) return null; chunks.push(c); }
  try { return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}"); } catch { return null; }
}

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.end(JSON.stringify(body));
}

class NotConfigured extends Error {}

// Insert one row through Supabase's REST API with the service-role key.
// The tables have row-level security on and no public policies, so only this
// server-side call can write, and nobody can read the list through the public API.
async function insertRow(table, row, { ignoreDuplicatesOn, returnRows = false } = {}) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new NotConfigured("Supabase is not configured");
  const q = ignoreDuplicatesOn ? `?on_conflict=${encodeURIComponent(ignoreDuplicatesOn)}` : "";
  const prefer = [returnRows ? "return=representation" : "return=minimal"];
  if (ignoreDuplicatesOn) prefer.push("resolution=ignore-duplicates");
  const r = await fetch(`${url.replace(/\/+$/, "")}/rest/v1/${table}${q}`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: prefer.join(","),
    },
    body: JSON.stringify(row),
  });
  if (!r.ok) {
    const err = new Error(`Database insert failed (${r.status})`);
    err.status = r.status;
    throw err;
  }
  if (!returnRows) return [];
  try {
    const data = await r.json();
    return Array.isArray(data) ? data : data ? [data] : [];
  } catch {
    return [];
  }
}

// Shared request guard: POST + JSON only, honeypot, minimum fill time, rate limit.
// Returns { body } to continue, or null when a response has already been sent.
async function guard(req, res, limiter) {
  if (req.method !== "POST") { res.setHeader("Allow", "POST"); send(res, 405, { error: "method_not_allowed" }); return null; }
  const ct = String((req.headers && req.headers["content-type"]) || "");
  if (!ct.toLowerCase().startsWith("application/json")) { send(res, 415, { error: "unsupported_media_type" }); return null; }
  if (!limiter(clientIp(req))) { send(res, 429, { error: "rate_limited" }); return null; }
  const body = await readJson(req);
  if (!body || typeof body !== "object") { send(res, 400, { error: "bad_request" }); return null; }
  // Bots: a filled hidden field, or a form submitted faster than a person can type.
  // Answer like a success so the bot learns nothing, and store nothing.
  const elapsed = Number(body.elapsedMs);
  if ((typeof body.website === "string" && body.website.trim() !== "") || (Number.isFinite(elapsed) && elapsed < 800)) {
    send(res, 200, { ok: true });
    return null;
  }
  return { body };
}

module.exports = { normalizeEmail, isValidEmail, createLimiter, clientIp, readJson, send, insertRow, guard, NotConfigured };
