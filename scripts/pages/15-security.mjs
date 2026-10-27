import { reach } from "../partials.mjs";
export default {
  file: "legal/security.html", legal: true, short: "Security",
  title: "Security", kicker: "Legal",
  description: "How Hermix protects the little information it handles today, how to stay safe, and how to report a security issue.",
  lede: "Hermix is early, so it handles very little: email addresses for the waitlist and messages sent through our contact form. Here’s how we look after them, and how to tell us if you find a problem.",
  body: (cfg, b) => `
<h2 id="today">How we protect things today</h2>
<ul>
  <li><strong>The preview app keeps your data on your computer.</strong> It doesn’t connect to your accounts or send what you type to us or to an AI service.</li>
  <li><strong>Forms go to our own server over an encrypted connection.</strong> The credentials for our database stay on the server and are never sent to your browser.</li>
  <li><strong>The waitlist and messages can’t be read publicly.</strong> The public endpoints can only add an entry. They can’t list, read, change, or delete anything.</li>
  <li><strong>Forms are protected against abuse</strong> with server-side validation and limits on repeated submissions.</li>
</ul>
<p>No system is perfectly secure, and we don’t claim Hermix is. We don’t currently hold security certifications or run a bug bounty program.</p>

<h2 id="stay-safe">Staying safe</h2>
<ul>
  <li>Hermix doesn’t have accounts today, so we will never ask for your password. Treat any message claiming otherwise as suspicious.</li>
  <li>When Hermix is released, download it only from this website.</li>
  <li>Keep Windows and WebView2 up to date.</li>
  <li>Be careful with emails that use the Hermix name but link to other websites.</li>
</ul>

<h2 id="report">Reporting a security issue</h2>
<p>If you believe you’ve found a vulnerability in this website, our forms, or the Hermix app, please tell us using ${reach(cfg, b, "security")} and choose “Security report”. Include:</p>
<ul>
  <li>What you found, and where.</li>
  <li>The steps to reproduce it.</li>
  <li>What impact you think it has.</li>
</ul>
<p>Please don’t include anyone else’s personal data in your report.</p>

<h3>While you investigate, please:</h3>
<ul>
  <li>Only test against your own data and submissions.</li>
  <li>Don’t access, change, or delete other people’s information.</li>
  <li>Don’t degrade the service. That means no denial-of-service attacks, spam, or high-volume automated testing.</li>
  <li>Don’t use social engineering, phishing, or physical attacks.</li>
  <li>Give us a reasonable chance to fix the problem before telling anyone else.</li>
</ul>
<p>We’ll read every report, keep you updated as we look into it, and credit you if you’d like once a fix is out. We won’t pursue legal action against people who report in good faith and follow these guidelines.</p>`,
};
