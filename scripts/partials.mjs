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

export function waitlist(base, cfg, { landing = false } = {}) {
  return `    <section class="waitlist" id="waitlist" aria-labelledby="waitlist-title">
      ${landing ? '<div class="landing-air" aria-hidden="true"><span></span><span></span></div>' : ""}
      ${landing ? "" : `<img class="waitlist-bot" src="${base}media/landing/mascot/${landing ? "default" : "hero"}.webp" alt="" width="${landing ? 420 : 900}" height="${landing ? 336 : 721}" loading="lazy" />`}
      <h2 id="waitlist-title">Bring Hermix into your work.</h2>
      <p class="waitlist-lede">Join the waitlist for Hermix. We’ll email you when you can try it.</p>
      <form class="wl-form" data-waitlist novalidate>
        ${landing ? `<img class="waitlist-bot" src="${base}media/landing/mascot/courier.webp" alt="" width="603" height="553" loading="lazy" />` : ""}
        <div class="wl-row">
          <label class="sr-only" for="wl-email">Email address</label>
          <input id="wl-email" name="email" type="email" inputmode="email" autocomplete="email" maxlength="254"
            placeholder="Enter your email address" required aria-describedby="wl-status wl-note" />
          <button class="btn btn-ink" type="submit">Join the waitlist</button>
        </div>
        <div class="hp" aria-hidden="true"><label>Leave this empty <input type="text" name="website" tabindex="-1" autocomplete="off" /></label></div>
        <p class="form-status" id="wl-status" role="status" aria-live="polite"></p>
        <p class="wl-note" id="wl-note">Updates about Hermix only. Ask to leave at any time. <a href="${base}legal/privacy.html">Privacy Policy</a></p>
      </form>
    </section>`;
}

// Hermix as a flat little drawing: one head, two wings, a visor and whatever face the moment calls for.
function toon(mood) {
  const eyes = {
    happy: `<path d="M57 61 Q62 52 67 61" /><path d="M73 61 Q78 52 83 61" stroke-linecap="round" />`,
    wide: `<ellipse cx="62" cy="59" rx="6" ry="7" fill="#fffdf8" stroke="none" /><ellipse cx="79" cy="59" rx="6" ry="7" fill="#fffdf8" stroke="none" /><circle cx="64" cy="56.5" r="1.9" fill="#16130f" stroke="none" /><circle cx="81" cy="56.5" r="1.9" fill="#16130f" stroke="none" />`,
    look: `<ellipse cx="63" cy="56" rx="5.6" ry="6.6" fill="#fffdf8" stroke="none" /><ellipse cx="80" cy="55" rx="4.6" ry="5.6" fill="#fffdf8" stroke="none" />`,
  }[mood] || "";
  return `<svg class="fw-toon" viewBox="0 0 140 108" width="140" height="108" aria-hidden="true" focusable="false">
      <g class="t-wing">
        <path d="M45 54 C34 43 20 39 8 44 C10 50 13 54 18 56 C16 51 16 48 15 45 C19 50 24 54 29 57 C27 53 27 50 26 47 C31 52 38 56 45 60 Z" />
        <path d="M95 54 C106 43 120 39 132 44 C130 50 127 54 122 56 C124 51 124 48 125 45 C121 50 116 54 111 57 C113 53 113 50 114 47 C109 52 102 56 95 60 Z" />
      </g>
      <path class="t-sprig" d="M70 27 C70 19 74 12 81 9 C82 18 78 25 70 27 Z M70 27 C70 21 67 16 61 14 C60 20 63 25 70 27 Z" />
      <circle class="t-head" cx="70" cy="60" r="31" />
      <circle class="t-disc" cx="41" cy="63" r="7" /><circle class="t-disc" cx="99" cy="63" r="7" />
      <circle class="t-pin" cx="41" cy="63" r="2.6" /><circle class="t-pin" cx="99" cy="63" r="2.6" />
      <ellipse class="t-visor" cx="70" cy="60" rx="22" ry="19" />
      <g class="t-eyes">${eyes}</g>
    </svg>`;
}

// The sign-off: HERMIX stamped across the page with a few Hermix figures living on the letters.
function footStage(base, landing = false) {
  const WORD = "HERMIX";
  const CREW = landing ? {} : {
    0: ["top", "look", "Still reading. Nearly done."],
    2: ["front", "happy", "Ready for the next step."],
    4: ["behind", "wide", "Want to know what changed?"],
  };
  const letters = Array.from(WORD)
    .map((ch, i) => {
      const c = CREW[i];
      const crew = c
        ? `<button type="button" class="fw-crew fw-${c[0]}" style="--d:${900 + i * 120}ms" data-says="${c[2]}" aria-label="Hermix says: ${c[2]}">${toon(c[1])}</button>`
        : "";
      return `<span class="fw-l" style="--i:${i}">${crew}<span class="fw-ch">${ch}</span></span>`;
    })
    .join("");
  const tag = "Your work understood, your life easier."
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
          <animateTransform attributeName="patternTransform" type="translate" from="0 0" to="48 0" dur="16s" repeatCount="indefinite" />
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

export function footer(base, cfg, { landing = false } = {}) {
  const year = new Date().getFullYear();
  const li = (href, label, extra = "") => `<li><a href="${base}${href}"${extra}>${label}</a></li>`;
  return `  <footer class="site-foot">
    <div class="foot-grid">
      <div class="foot-brand">
        <a class="brand" href="${base}index.html" aria-label="Hermix home">
          ${markImg(base)}
          <span>Hermix</span>
        </a>
        <p>An AI coworker for your computer, built to keep track of the context and help carry the work through.</p>
        <div class="foot-ctas">
          <a class="btn btn-cream" href="${base}index.html#waitlist">Join the waitlist</a>
          <a class="btn btn-dark-line" href="${base}index.html#how">See how it works</a>
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
    ${footStage(base, landing)}
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
