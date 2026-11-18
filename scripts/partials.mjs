// Shared markup for the Hermix website. `base` is the relative path back to the site root.
export const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

const markImg = (base = "") =>
  `<img class="mark mark-art" src="${base}media/landing/mascot/default.webp" width="28" height="28" alt="" decoding="async" />`;
export const mark = markImg("");

export const LEGAL_LINKS = [
  ["legal/privacy.html", "Privacy Policy"],
  ["legal/terms.html", "Terms of Service"],
  ["legal/cookies.html", "Cookie Policy"],
  ["legal/acceptable-use.html", "Acceptable Use Policy"],
  ["legal/copyright.html", "Copyright Policy"],
  ["legal/security.html", "Security"],
];

// Static nav for sub-pages (the home page keeps its own nav with the pop-up menus).
export function header(base) {
  return `  <header class="nav" id="nav">
    <a class="brand" href="${base}index.html" aria-label="Hermix home">
      ${markImg(base)}
      <span>Hermix</span>
    </a>
    <nav class="nav-links" aria-label="Main">
      <a class="nav-btn" href="${base}index.html#how">Features</a>
      <a class="nav-btn" href="${base}pricing.html">Pricing</a>
      <a class="nav-btn" href="${base}faq.html">FAQ</a>
    </nav>
  </header>`;
}

export function waitlist(base) {
  return `    <section class="waitlist" id="waitlist" aria-labelledby="waitlist-title">
      <img class="waitlist-bot" src="${base}media/landing/mascot/hero.webp" alt="" width="900" height="721" loading="lazy" />
      <h2 id="waitlist-title">Meet a clearer kind of workday.</h2>
      <p class="waitlist-lede">Join the waitlist for Hermix on Windows 11. We’ll let you know as soon as it is ready for you.</p>
      <form class="wl-form" data-waitlist novalidate>
        <div class="wl-row">
          <label class="sr-only" for="wl-email">Email address</label>
          <input id="wl-email" name="email" type="email" inputmode="email" autocomplete="email" maxlength="254"
            placeholder="Enter your email address" required aria-describedby="wl-status wl-note" />
          <button class="btn btn-ink" type="submit">Join the waitlist</button>
        </div>
        <div class="hp" aria-hidden="true"><label>Leave this empty <input type="text" name="website" tabindex="-1" autocomplete="off" /></label></div>
        <p class="form-status" id="wl-status" role="status" aria-live="polite"></p>
        <p class="wl-note" id="wl-note">Only updates about Hermix. You can ask to be removed at any time. <a href="${base}legal/privacy.html">Privacy Policy</a></p>
      </form>
    </section>`;
}

// The sign-off: HERMIX stamped across the page with a few Hermix figures living on the letters.
function footStage(base) {
  const WORD = "HERMIX";
  const CREW = {
    0: ["top", "thinking", "Still reading. Nearly done."],
    2: ["front", "success", "All of it is handled."],
    4: ["behind", "curious", "Want to know what changed?"],
  };
  const letters = Array.from(WORD)
    .map((ch, i) => {
      const c = CREW[i];
      const crew = c
        ? `<button type="button" class="fw-crew fw-${c[0]}" style="--d:${900 + i * 120}ms" data-says="${c[2]}" aria-label="Hermix says: ${c[2]}"><img src="${base}media/landing/mascot/${c[1]}.webp" alt="" width="300" height="240" loading="lazy" /></button>`
        : "";
      return `<span class="fw-l" style="--i:${i}">${crew}<span class="fw-ch">${ch}</span></span>`;
    })
    .join("");
  const tag = "Your work and your life."
    .split(" ")
    .map((w, k) => `<span class="fw-w" style="--d:${1500 + k * 70}ms">${w} </span>`)
    .join("");
  return `  <div class="foot-stage" id="foot-stage">
      <div class="foot-sky" aria-hidden="true"></div>
      <div class="foot-word" aria-hidden="true">${letters}</div>
      <h2 class="sr-only">Hermix</h2>
      <svg class="foot-ground" viewBox="0 0 1200 26" preserveAspectRatio="none" aria-hidden="true">
        <defs><pattern id="foot-mea" width="48" height="26" patternUnits="userSpaceOnUse">
          <path d="M6 20V6h30v10H16v-4h14" fill="none" stroke="currentColor" stroke-width="2.6" />
        </pattern></defs>
        <rect class="foot-mea-fill" width="1200" height="26" fill="url(#foot-mea)" />
        <path class="foot-rule" d="M0 25h1200" pathLength="1" fill="none" stroke="currentColor" stroke-width="2" />
      </svg>
      <p class="foot-tag">${tag}</p>
      <div class="foot-acts">
        <a class="btn btn-cream fw-act" style="--d:1800ms" href="${base}index.html#waitlist">Join the waitlist</a>
        <a class="btn btn-dark-line fw-act" style="--d:1900ms" href="${base}pricing.html">See the plans</a>
      </div>
      <div class="foot-bubbles" aria-live="polite"></div>
    </div>`;
}

export function footer(base) {
  const year = new Date().getFullYear();
  const li = (href, label, extra = "") => `<li><a href="${base}${href}"${extra}>${label}</a></li>`;
  return `  <footer class="site-foot">
    <div class="foot-grid">
      <div class="foot-brand">
        <a class="brand" href="${base}index.html" aria-label="Hermix home">
          ${markImg(base)}
          <span>Hermix</span>
        </a>
        <p>Hermix is an AI coworker for Windows. It takes in the notifications from all your apps, reads them for you, and gives you a clear plan for your day.</p>
        <div class="foot-ctas">
          <a class="btn btn-cream" href="${base}index.html#waitlist">Join the waitlist</a>
          <a class="btn btn-dark-line" href="${base}index.html#how">See a day with Hermix</a>
        </div>
      </div>
      <nav class="foot-col" aria-labelledby="foot-product">
        <h2 id="foot-product">Product</h2>
        <ul>
          ${li("index.html", "Home")}
          ${li("index.html#how", "Features")}
          ${li("index.html#plans", "Plans")}
          ${li("pricing.html", "Pricing")}
          ${li("faq.html", "FAQ")}
        </ul>
      </nav>
      <nav class="foot-col" aria-labelledby="foot-legal">
        <h2 id="foot-legal">Legal</h2>
        <ul>
          ${LEGAL_LINKS.map(([h, l]) => li(h, l)).join("\n          ")}
        </ul>
      </nav>
      <nav class="foot-col" aria-labelledby="foot-support">
        <h2 id="foot-support">Support</h2>
        <ul>
          ${li("contact.html", "Contact")}
          ${li("contact.html?topic=remove_waitlist", "Leave the waitlist")}
          ${li("contact.html?topic=privacy", "Privacy requests")}
          ${li("legal/security.html#report", "Report a security issue")}
        </ul>
      </nav>
    </div>
    ${footStage(base)}
  <div class="foot-bar">
      <p>© <span data-year>${year}</span> Hermix. All rights reserved.</p>
      <nav aria-label="Legal shortcuts">
        <a href="${base}legal/privacy.html">Privacy</a>
        <a href="${base}legal/terms.html">Terms</a>
        <a href="${base}legal/cookies.html">Cookies</a>
      </nav>
    </div>
  </footer>`;
}

// "How to reach us" sentence used across policies. Uses the contact form, and the
// configured email address too once one is set in site.config.json.
export function reach(cfg, base, topic) {
  const form = `<a href="${base}contact.html${topic ? `?topic=${topic}` : ""}">contact form</a>`;
  return cfg.contactEmail
    ? `our ${form} or email <a href="mailto:${esc(cfg.contactEmail)}">${esc(cfg.contactEmail)}</a>`
    : `our ${form}`;
}
