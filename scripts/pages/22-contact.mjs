import { esc } from "../partials.mjs";
export default {
  file: "contact.html", waitlist: false,
  title: "Contact", kicker: "Contact", heading: "Get in touch.",
  description: "Send Hermix a question, a privacy request, a security report, or a copyright notice, or ask to leave the waitlist.",
  lede: "Questions, privacy requests, security reports, copyright notices, or leaving the waitlist all come here, and a person reads every message.",
  body: (cfg, b) => `
<form class="contact-form" data-contact novalidate>
  <div class="field">
    <label for="c-topic">What’s this about?</label>
    <select id="c-topic" name="topic" required>
      <option value="general">General question</option>
      <option value="privacy">Privacy request</option>
      <option value="remove_waitlist">Remove me from the waitlist</option>
      <option value="security">Security report</option>
      <option value="copyright">Copyright notice</option>
      <option value="misuse">Report misuse</option>
    </select>
  </div>
  <div class="field-row">
    <div class="field">
      <label for="c-email">Your email</label>
      <input id="c-email" name="email" type="email" inputmode="email" autocomplete="email" maxlength="254" required aria-describedby="c-email-hint" />
      <p class="hint" id="c-email-hint">We’ll only use it to reply.</p>
    </div>
    <div class="field">
      <label for="c-name">Name <span class="opt">(optional)</span></label>
      <input id="c-name" name="name" type="text" autocomplete="name" maxlength="100" />
    </div>
  </div>
  <div class="field">
    <label for="c-message">Message</label>
    <textarea id="c-message" name="message" rows="7" minlength="10" maxlength="4000" required aria-describedby="c-msg-hint"></textarea>
    <p class="hint" id="c-msg-hint" data-topic-hint>Tell us what you need.</p>
  </div>
  <div class="hp" aria-hidden="true"><label>Leave this empty <input type="text" name="website" tabindex="-1" autocomplete="off" /></label></div>
  <div class="contact-actions">
    <button class="btn btn-ink" type="submit">Send message</button>
    <p class="form-status" role="status" aria-live="polite"></p>
  </div>
  <p class="wl-note">We use what you send only to handle your message. See the <a href="${b}legal/privacy.html">Privacy Policy</a>.</p>
</form>
${cfg.contactEmail ? `<p class="contact-alt">Prefer email? Write to <a href="mailto:${esc(cfg.contactEmail)}">${esc(cfg.contactEmail)}</a>.</p>` : ""}`,
};
