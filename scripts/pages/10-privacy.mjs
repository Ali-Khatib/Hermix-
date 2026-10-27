import { reach } from "../partials.mjs";
export default {
  file: "legal/privacy.html", legal: true, short: "Privacy Policy",
  title: "Privacy Policy", kicker: "Legal",
  description: "What information Hermix collects through its website, waitlist, contact form, and Windows preview, why, and the choices you have.",
  lede: "The short version: the Hermix preview keeps your data on your computer, the website doesn’t track you, and we only keep the email you give us for the waitlist or a message you send.",
  body: (cfg, b) => `
<h2 id="scope">What this policy covers</h2>
<p>This policy explains how Hermix (“Hermix”, “we”, “us”) handles personal information when you visit this website, join the waitlist, use the contact form, or use the Hermix preview app for Windows.</p>

<h2 id="you-give">Information you give us</h2>
<ul>
  <li><strong>Waitlist.</strong> Your email address, the date you joined, and which version of the waitlist notice you saw.</li>
  <li><strong>Contact form.</strong> Your email address, the topic you pick, your message, and your name if you choose to add it.</li>
</ul>
<p>We don’t ask for anything else, and you don’t need an account to do either.</p>

<h2 id="automatic">Information collected automatically</h2>
<p>This website doesn’t use analytics, advertising, tracking pixels, or cookies, and it doesn’t load fonts or scripts from other companies.</p>
<p>Like any website, the company that hosts it receives technical details when your browser asks for a page, such as your IP address, browser type, the page requested, and the time. That information is used to deliver the site and keep it secure, under the host’s own log retention.</p>
<p>When you submit a form, our server briefly uses your IP address in memory to limit repeated submissions. We don’t store it with your signup or message.</p>

<h2 id="app">The Hermix preview app</h2>
<p>The current Windows preview runs on a built-in sample day. It does not connect to Gmail, Google Calendar, Slack, GitHub, or any other account, and it doesn’t send what you type to an AI service or to us.</p>
<p>Your settings and anything you save in the app, such as requests, meeting briefs, and reminders, are stored on your computer only. Clearing the app’s data or uninstalling Hermix removes them.</p>
<p>Before Hermix connects to real accounts, we’ll update this policy to explain exactly what is read, why, and where it goes, and the app will ask for your permission first.</p>

<h2 id="use">How we use information</h2>
<ul>
  <li><strong>Waitlist email:</strong> to tell you when Hermix is available and to share news about Hermix. Nothing unrelated.</li>
  <li><strong>Contact messages:</strong> to read and answer your message and handle your request.</li>
  <li><strong>Technical data:</strong> to run the website, prevent abuse, and fix problems.</li>
</ul>
<p>We don’t sell personal information, we don’t share it for advertising, and we don’t use it to build profiles about you.</p>

<h2 id="legal-bases">Legal bases</h2>
<p>Where laws such as the EU or UK General Data Protection Regulation apply, we rely on:</p>
<ul>
  <li><strong>Consent</strong> for the waitlist, which you can withdraw at any time.</li>
  <li><strong>Legitimate interests</strong> for answering messages and keeping the website secure.</li>
  <li><strong>Legal obligations</strong> where we have to keep or disclose information by law.</li>
</ul>

<h2 id="sharing">Who processes it for us</h2>
<p>We use a small number of service providers who handle information only on our instructions:</p>
<ul>
  <li><strong>Supabase</strong> stores waitlist signups and contact messages in a database that can’t be read from the public internet.</li>
  <li><strong>Our website host</strong> serves the website and runs the form endpoints.</li>
</ul>
<p>We may also disclose information if the law requires it, or to protect the rights and safety of our users or others.</p>

<h2 id="transfers">International transfers</h2>
<p>Our providers may store or process information in countries other than yours. Where the law requires it, we rely on appropriate safeguards for those transfers, such as standard contractual clauses.</p>

<h2 id="retention">How long we keep it</h2>
<ul>
  <li><strong>Waitlist emails</strong> stay until you ask to be removed, or until we no longer need the waitlist, whichever comes first.</li>
  <li><strong>Contact messages</strong> are kept for as long as we need to handle your request and any follow-up, and then deleted.</li>
  <li><strong>Server logs</strong> are kept by our host under its own retention settings.</li>
</ul>

<h2 id="security">Security</h2>
<p>The forms send information over an encrypted connection to our server. Only that server, using credentials that never reach your browser, can write to the database, and the database doesn’t allow public reading. No system is perfectly secure, so we can’t promise that information will never be accessed without permission. See our <a href="${b}legal/security.html">Security</a> page for more.</p>

<h2 id="rights">Your choices and rights</h2>
<p>You can leave the waitlist at any time by using ${reach(cfg, b, "remove_waitlist")} and choosing “Remove me from the waitlist”. Once we start sending emails, each one will include a way to unsubscribe.</p>
<p>Depending on where you live, you may have the right to:</p>
<ul>
  <li>Access the personal information we hold about you.</li>
  <li>Correct it or have it deleted.</li>
  <li>Object to or restrict how we use it.</li>
  <li>Receive a copy of it.</li>
  <li>Withdraw consent at any time.</li>
  <li>Complain to your local data protection authority.</li>
</ul>
<p>To make a request, use ${reach(cfg, b, "privacy")} and choose “Privacy request”. We may need to confirm the request came from the owner of the email address.</p>

<h2 id="children">Children</h2>
<p>Hermix isn’t directed at children under 16, and we don’t knowingly collect their information. If you think a child has given us their information, contact us and we’ll delete it.</p>

<h2 id="changes">Changes to this policy</h2>
<p>When we change this policy, we’ll update the date at the top of this page. If a change is significant, we’ll also say so on this website and, where appropriate, email people on the waitlist.</p>

<h2 id="contact">Contact</h2>
<p>Questions about privacy? Use ${reach(cfg, b, "privacy")}.</p>`,
};
