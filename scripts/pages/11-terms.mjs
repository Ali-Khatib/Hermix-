import { reach } from "../partials.mjs";
export default {
  file: "legal/terms.html", legal: true, short: "Terms of Service",
  title: "Terms of Service", kicker: "Legal",
  description: "The terms for using the Hermix website, waitlist, and Windows preview.",
  lede: "These terms apply when you use the Hermix website, join the waitlist, or use the Hermix preview app.",
  body: (cfg, b) => `
<h2 id="agreement">Agreeing to these terms</h2>
<p>By using the Hermix website, joining the waitlist, or installing and using the Hermix preview, you agree to these terms. If you don’t agree, please don’t use them.</p>
<p>You must be old enough to form a binding agreement where you live. If you aren’t, you need a parent or guardian’s permission.</p>

<h2 id="preview">The Hermix preview</h2>
<p>Hermix is early software. The current preview:</p>
<ul>
  <li>Runs on built-in sample data.</li>
  <li>Doesn’t connect to your real accounts.</li>
  <li>Doesn’t send email, post messages, or join meetings.</li>
</ul>
<p>Features may change, appear, or disappear, and the preview may contain bugs. Please don’t rely on it for anything important.</p>
<p>The preview is currently provided free of charge.</p>

<h2 id="waitlist">The waitlist</h2>
<p>Joining the waitlist means we’ll email you about Hermix. It doesn’t guarantee access to Hermix, a release date, or any particular feature. You can leave the waitlist at any time; see the <a href="${b}legal/privacy.html#rights">Privacy Policy</a>.</p>

<h2 id="license">Using Hermix</h2>
<p>We give you a personal, limited, non-exclusive, non-transferable, revocable permission to install and use the Hermix preview for your own work.</p>
<p>Except where the law allows it, please don’t:</p>
<ul>
  <li>Copy, sell, rent, or redistribute Hermix.</li>
  <li>Reverse engineer it.</li>
  <li>Remove notices from it.</li>
</ul>

<h2 id="your-content">Your content</h2>
<p>What you type or save in the preview stays on your computer, and it’s yours. When you send us a message, you keep ownership of it and allow us to use it to reply, handle your request, and improve Hermix support.</p>

<h2 id="conduct">Acceptable use</h2>
<p>You agree to follow our <a href="${b}legal/acceptable-use.html">Acceptable Use Policy</a>. In short:</p>
<ul>
  <li>No illegal activity.</li>
  <li>No abuse, impersonation, or spam.</li>
  <li>No attempts to break into or overload our services.</li>
</ul>

<h2 id="ours">Our rights</h2>
<p>The Hermix name, logo, mascot, software, and website content belong to Hermix or its licensors and are protected by intellectual property laws. These terms don’t give you any rights to them beyond the permission to use the preview described above.</p>

<h2 id="third-party">Other companies’ products</h2>
<p>Gmail, Google Calendar, Slack, GitHub, Windows, and other names mentioned on this site are trademarks of their owners. Hermix isn’t endorsed by them. When Hermix connects to those services in the future, their own terms will also apply to your use of them.</p>

<h2 id="pricing">Pricing</h2>
<p>Nothing is charged today. If we introduce paid plans, we’ll show the price and terms clearly before you’re asked to pay, and you won’t be moved onto a paid plan without agreeing first. See <a href="${b}pricing.html">Pricing</a>.</p>

<h2 id="changes">Changes and availability</h2>
<p>We may update, pause, or stop offering the preview, the waitlist, or this website. We may also update these terms. If a change is significant, we’ll update the date at the top of this page and say so on this website.</p>

<h2 id="ending">Ending</h2>
<p>You can stop using Hermix at any time by uninstalling it. We may stop providing the preview to you, or remove you from the waitlist, if you seriously or repeatedly break these terms.</p>

<h2 id="disclaimer">The preview is provided as it is</h2>
<p>To the extent the law allows, the preview is provided “as is” and “as available”, without warranties of any kind, including fitness for a particular purpose or that it will be error-free.</p>
<p>Some places don’t allow these exclusions. Nothing in these terms takes away rights you have under consumer protection laws that can’t be waived.</p>

<h2 id="liability">Limits on liability</h2>
<p>To the extent the law allows, Hermix isn’t liable for indirect or consequential losses, or for loss of data, profits, or business, arising from your use of the free preview or this website.</p>
<p>Nothing in these terms limits liability that can’t be limited by law, such as liability for fraud, or for death or personal injury caused by negligence.</p>

<h2 id="contact">Contact</h2>
<p>Questions about these terms? Use ${reach(cfg, b, "general")}.</p>`,
};
