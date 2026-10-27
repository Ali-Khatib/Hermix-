export default {
  file: "pricing.html",
  title: "Pricing", kicker: "Pricing",
  heading: "Pricing is coming soon.",
  description: "The Hermix preview is free. Prices for the full release haven't been set yet. Join the waitlist to hear first.",
  lede: "The Hermix preview doesn’t cost anything. We haven’t set prices for the full release yet. When we do, they’ll be here first.",
  body: (cfg, b) => `
<div class="price-cards">
  <section class="price-card">
    <p class="kicker">Available now</p>
    <h2>Preview</h2>
    <p class="price">Free</p>
    <p>The full Hermix experience on a sample day: Today, What’s new, Tasks, Email, Meetings, and Ask Hermix.</p>
    <ul class="ticks">
      <li>No account needed</li>
      <li>Everything you save stays on your computer</li>
      <li>Windows 11</li>
    </ul>
  </section>
  <section class="price-card soon">
    <p class="kicker">Coming soon</p>
    <h2>Hermix</h2>
    <p class="price">To be announced</p>
    <p>Hermix connected to your real Gmail, Calendar, Slack, and GitHub, with a live AI model behind Ask Hermix.</p>
    <ul class="sparks">
      <li><b>Clear prices, shown upfront</b> Before anyone is asked to pay</li>
      <li><b>No surprise upgrades</b> Nobody is moved onto a paid plan without agreeing first</li>
    </ul>
  </section>
</div>
<h2>Questions about pricing?</h2>
<p>See the <a href="${b}faq.html">FAQ</a>, or <a href="${b}contact.html">send us a message</a>.</p>`,
};
