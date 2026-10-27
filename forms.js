/* Hermix website: waitlist + contact forms, footer year, sub-page nav. Loaded on every page. */
(() => {
  "use strict";
  const SCRIPT_SRC = (document.currentScript && document.currentScript.src) || "";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  $$("[data-year]").forEach((el) => (el.textContent = String(new Date().getFullYear())));

  // Sub-pages: nav shadow on scroll (the home page's app.js does this itself).
  const nav = $("#nav");
  if (nav && document.body.classList.contains("subpage")) {
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Same rules the server applies (api/_lib.js). The server check is the real one.
  const normalize = (v) => String(v || "").trim().toLowerCase();
  const looksLikeEmail = (e) =>
    e.length <= 254 && /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*\.(?:[a-z]{2,63}|xn--[a-z0-9-]+)$/.test(e) && !/\.\./.test(e) && !/^\.|\.@/.test(e);

  const MESSAGES = {
    invalid_email: "That doesn’t look like a full email address. Check it looks like name@example.com.",
    rate_limited: "Too many tries from this connection. Please wait a few minutes and try again.",
    unavailable: "This form isn’t switched on yet. Please try again a little later.",
    server_error: "Something went wrong on our side. Your details are still here, so please try again.",
    network: "We couldn’t reach Hermix. Check your connection and try again. Your details are still here.",
  };

  async function post(url, data) {
    let r;
    try {
      r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data), credentials: "omit" });
    } catch {
      return { ok: false, code: "network" };
    }
    let body = {};
    try { body = await r.json(); } catch {}
    if (r.ok && body.ok) return { ok: true };
    if (r.status === 429) return { ok: false, code: "rate_limited" };
    if (r.status === 503) return { ok: false, code: "unavailable" };
    if (r.status === 400) return { ok: false, code: body.error === "invalid_email" ? "invalid_email" : "invalid", fields: body.fields || {} };
    if (r.status === 404 || r.status === 405) return { ok: false, code: "unavailable" };
    return { ok: false, code: "server_error" };
  }

  function setStatus(el, text, kind) {
    el.textContent = text;
    el.dataset.kind = kind || "";
  }

  function busy(btn, on, label) {
    btn.disabled = on;
    btn.setAttribute("aria-busy", String(on));
    if (on) { btn.dataset.label = btn.textContent; btn.textContent = label; }
    else if (btn.dataset.label) btn.textContent = btn.dataset.label;
  }

  function retryButton(status, onRetry) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "link-btn";
    b.textContent = "Try again";
    b.addEventListener("click", onRetry);
    status.append(" ", b);
  }

  // ---------- waitlist ----------
  $$("form[data-waitlist]").forEach((form) => {
    const input = $("input[name=email]", form);
    const status = $(".form-status", form);
    const btn = $("button[type=submit]", form);
    const started = Date.now();
    let inFlight = false;

    input.addEventListener("input", () => { if (status.dataset.kind === "error") { setStatus(status, ""); input.removeAttribute("aria-invalid"); } });

    async function submit() {
      if (inFlight) return;
      const email = normalize(input.value);
      if (!looksLikeEmail(email)) {
        input.setAttribute("aria-invalid", "true");
        setStatus(status, email ? MESSAGES.invalid_email : "Please enter your email address.", "error");
        input.focus();
        return;
      }
      input.removeAttribute("aria-invalid");
      inFlight = true;
      busy(btn, true, "Joining…");
      setStatus(status, "Adding you to the list…", "pending");
      const res = await post(apiUrl("waitlist"), { email, website: $("input[name=website]", form).value, elapsedMs: Date.now() - started });
      inFlight = false;
      busy(btn, false);
      if (res.ok) {
        form.classList.add("done");
        input.value = "";
        input.disabled = true;
        btn.disabled = true;
        setStatus(status, "You’re on the list. We’ll email you when there’s news.", "success");
        return;
      }
      if (res.code === "invalid_email") { input.setAttribute("aria-invalid", "true"); input.focus(); }
      setStatus(status, MESSAGES[res.code] || MESSAGES.server_error, "error");
      if (res.code === "network" || res.code === "server_error" || res.code === "unavailable") retryButton(status, submit);
    }
    form.addEventListener("submit", (e) => { e.preventDefault(); submit(); });
  });

  // ---------- contact ----------
  const HINTS = {
    general: "Tell us what you need.",
    privacy: "Tell us what you’d like: a copy of your data, a correction, or deletion. Use the email address you signed up with.",
    remove_waitlist: "Use the email address you signed up with. A short note is enough, like “Please remove me”.",
    security: "What you found, where, steps to reproduce, and the impact. Please don’t include other people’s data.",
    copyright: "The work, where our copy is, your contact details, and the statements listed in our Copyright Policy.",
    misuse: "What happened, where, and when.",
  };
  $$("form[data-contact]").forEach((form) => {
    const topic = $("select[name=topic]", form);
    const email = $("input[name=email]", form);
    const name = $("input[name=name]", form);
    const message = $("textarea[name=message]", form);
    const hint = $("[data-topic-hint]", form);
    const status = $(".form-status", form);
    const btn = $("button[type=submit]", form);
    const started = Date.now();
    let inFlight = false;

    const q = new URLSearchParams(location.search).get("topic");
    if (q && HINTS[q]) topic.value = q;
    const syncHint = () => { hint.textContent = HINTS[topic.value] || HINTS.general; };
    topic.addEventListener("change", syncHint);
    syncHint();

    const fieldError = (el, on) => (on ? el.setAttribute("aria-invalid", "true") : el.removeAttribute("aria-invalid"));
    [email, message].forEach((el) => el.addEventListener("input", () => fieldError(el, false)));

    async function submit() {
      if (inFlight) return;
      const e = normalize(email.value);
      const m = message.value.trim();
      const badEmail = !looksLikeEmail(e);
      const badMsg = m.length < 10 || m.length > 4000;
      fieldError(email, badEmail);
      fieldError(message, badMsg);
      if (badEmail || badMsg) {
        setStatus(status, badEmail ? "Please enter a full email address, like name@example.com." : m.length > 4000 ? "Please keep your message under 4,000 characters." : "Please write a little more, at least 10 characters.", "error");
        (badEmail ? email : message).focus();
        return;
      }
      inFlight = true;
      busy(btn, true, "Sending…");
      setStatus(status, "Sending your message…", "pending");
      const res = await post(apiUrl("contact"), { topic: topic.value, email: e, name: name.value.trim(), message: m, website: $("input[name=website]", form).value, elapsedMs: Date.now() - started });
      inFlight = false;
      busy(btn, false);
      if (res.ok) {
        form.reset();
        syncHint();
        setStatus(status, "Thanks, your message is with us. We’ll reply to the email you gave.", "success");
        return;
      }
      if (res.code === "invalid") {
        fieldError(email, !!res.fields.email);
        fieldError(message, !!res.fields.message);
        setStatus(status, "Please check the highlighted fields and try again.", "error");
        return;
      }
      setStatus(status, MESSAGES[res.code] || MESSAGES.server_error, "error");
      if (res.code === "network" || res.code === "server_error" || res.code === "unavailable") retryButton(status, submit);
    }
    form.addEventListener("submit", (ev) => { ev.preventDefault(); submit(); });
  });

  // The API lives at the site root (/api/...). Works from sub-folders too.
  function apiUrl(name) {
    const root = SCRIPT_SRC ? new URL(".", SCRIPT_SRC) : new URL("/", location.href);
    return new URL(`api/${name}`, root).toString();
  }
})();
