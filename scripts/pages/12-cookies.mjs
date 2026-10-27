import { reach } from "../partials.mjs";
export default {
  file: "legal/cookies.html", legal: true, short: "Cookie Policy",
  title: "Cookie Policy", kicker: "Legal",
  description: "Hermix's website doesn't set cookies or use tracking. Here's exactly what it does store, and what the preview app keeps on your computer.",
  lede: "The Hermix website doesn’t set any cookies, and it doesn’t use analytics or advertising trackers. That’s why there’s no cookie banner.",
  body: (cfg, b) => `
<h2 id="website">On this website</h2>
<table>
  <thead><tr><th scope="col">Technology</th><th scope="col">Used?</th><th scope="col">Details</th></tr></thead>
  <tbody>
    <tr><td>Cookies</td><td>No</td><td>No first-party or third-party cookies are set by this website.</td></tr>
    <tr><td>Analytics</td><td>No</td><td>No analytics or session recording.</td></tr>
    <tr><td>Advertising</td><td>No</td><td>No advertising pixels or trackers.</td></tr>
    <tr><td>Browser storage</td><td>No</td><td>The website doesn’t use local storage, session storage, or similar.</td></tr>
    <tr><td>Third-party content</td><td>No</td><td>Fonts, images, and videos are served from this website, not from other companies.</td></tr>
  </tbody>
</table>
<p>When you submit a form, your browser sends the details to our own server. That request doesn’t create a cookie. See the <a href="${b}legal/privacy.html#automatic">Privacy Policy</a> for what servers receive with every request.</p>

<h2 id="app">In the Hermix preview app</h2>
<p>The Windows app stores your settings and saved items on your computer so they’re there next time. This storage never leaves your device and isn’t used for tracking. Clearing the app’s data or uninstalling Hermix removes it.</p>
<table>
  <thead><tr><th scope="col">Name</th><th scope="col">Purpose</th><th scope="col">Kept</th></tr></thead>
  <tbody>
    <tr><td><code>hermix.v1</code> (app storage)</td><td>Your settings, such as theme, motion, and mascot, plus your saved requests, meeting briefs, and reminders.</td><td>Until you clear it or uninstall the app</td></tr>
  </tbody>
</table>

<h2 id="future">If this changes</h2>
<p>If we ever add analytics or anything else that isn’t strictly necessary, we’ll update this page first. Where the law requires it, we’ll also ask for your consent before turning it on, and give you a way to change your mind.</p>

<h2 id="contact">Questions</h2>
<p>Use ${reach(cfg, b, "privacy")}.</p>`,
};
