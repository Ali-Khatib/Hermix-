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
      <h2 id="waitlist-title">Be the first to meet Hermix.</h2>
      <p class="waitlist-lede">Get notified when Hermix is ready for your Windows PC. Leave your email and we’ll let you know when there’s something new to try.</p>
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
        <p>An AI coworker for Windows. It connects the work across your apps and turns it into a clear plan for your day.</p>
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
          ${li("index.html#meet", "Meet Hermix")}
          ${li("index.html#soon", "Coming soon")}
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
