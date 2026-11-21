"use strict";
// Run: node --test tests/
const test = require("node:test");
const assert = require("node:assert");
const { isValidEmail, createLimiter, guard } = require("../api/_lib");

function fakeRes() { const r = { headers: {}, setHeader(k, v) { r.headers[k] = v; }, end(b) { r.body = b; } }; return r; }
const goodReq = (over = {}) => ({ method: "POST", headers: { "content-type": "application/json" }, body: { email: "a@b.co", website: "", elapsedMs: 5000 }, ...over });

test("rejects non-POST", async () => { const res = fakeRes(); assert.strictEqual(await guard(goodReq({ method: "GET" }), res, () => true), null); assert.strictEqual(res.statusCode, 405); });
test("rejects non-JSON content type", async () => { const res = fakeRes(); assert.strictEqual(await guard(goodReq({ headers: { "content-type": "text/plain" } }), res, () => true), null); assert.strictEqual(res.statusCode, 415); });
test("honeypot is answered like success and not stored", async () => { const res = fakeRes(); assert.strictEqual(await guard(goodReq({ body: { website: "x", elapsedMs: 5000 } }), res, () => true), null); assert.strictEqual(res.statusCode, 200); });
test("too-fast submit treated as bot", async () => { const res = fakeRes(); assert.strictEqual(await guard(goodReq({ body: { elapsedMs: 10 } }), res, () => true), null); });
test("rate limit returns 429", async () => { const res = fakeRes(); assert.strictEqual(await guard(goodReq(), res, () => false), null); assert.strictEqual(res.statusCode, 429); });
test("valid request passes", async () => { const res = fakeRes(); assert.ok(await guard(goodReq(), res, () => true)); });
test("limiter blocks after limit", () => { const l = createLimiter({ limit: 2, windowMs: 1000 }); assert.ok(l("k")); assert.ok(l("k")); assert.ok(!l("k")); });
test("email validation rejects header injection and junk", () => { for (const e of ["a@b.co\r\nBcc: x@y.com", "a b@c.co", "a@b", "..a@b.co", "a@@b.co", ""]) assert.ok(!isValidEmail(e), e); assert.ok(isValidEmail("a@b.co")); });
