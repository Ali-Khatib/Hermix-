import { reach } from "../partials.mjs";
export default {
  file: "legal/acceptable-use.html", legal: true, short: "Acceptable Use",
  title: "Acceptable Use Policy", kicker: "Legal",
  description: "What you can't do with Hermix, its website, waitlist, and contact form, and how to report misuse.",
  lede: "Hermix is meant to make work calmer. These rules keep it that way for everyone, and they apply alongside our Terms of Service.",
  body: (cfg, b) => `
<h2 id="dont">Please don’t use Hermix, this website, or our forms to:</h2>
<ul>
  <li><strong>Break the law</strong>, or help anyone else break it.</li>
  <li><strong>Harass, threaten, or abuse</strong> anyone, including our team.</li>
  <li><strong>Pretend to be someone else</strong>, or sign other people up for the waitlist without their permission.</li>
  <li><strong>Get in where you shouldn’t</strong>. That includes guessing passwords, stealing credentials, probing for weaknesses outside our <a href="${b}legal/security.html#report">responsible disclosure</a> guidelines, or trying to read data that isn’t yours.</li>
  <li><strong>Spread malware</strong> or other harmful code, or send us malicious files or links.</li>
  <li><strong>Automate abuse</strong>, such as bulk or scripted submissions to our forms, scraping, or anything that overloads or disrupts our services.</li>
  <li><strong>Send spam</strong> or unsolicited bulk messages.</li>
  <li><strong>Infringe other people’s rights</strong>, including copyright, trademarks, or privacy.</li>
  <li><strong>Get around limits</strong> we put in place, such as rate limits or access controls.</li>
</ul>

<h2 id="report">Reporting misuse</h2>
<p>If you see something that breaks these rules, use ${reach(cfg, b, "misuse")} and choose “Report misuse”. Include as much detail as you can. For security problems, please follow the <a href="${b}legal/security.html#report">security reporting steps</a> instead.</p>

<h2 id="enforcement">What we may do</h2>
<p>If someone breaks these rules, we may take proportionate steps, depending on how serious it is. These include ignoring or deleting submissions, blocking further submissions, removing an address from the waitlist, or stopping someone’s access to the preview. Where the law requires it, we may report illegal activity to the authorities.</p>`,
};
