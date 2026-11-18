export default {
  file: "pricing.html",
  title: "Pricing", kicker: "Pricing",
  heading: "Pricing is coming soon.",
  description: "Exploring the Hermix sample preview is free. Prices for the full release haven't been set yet. Join the waitlist to hear first.",
  lede: "Exploring the sample preview on this site doesn’t cost anything. We haven’t set prices for the full release yet. When we do, they’ll be here first.",
  body: (cfg, b) => `
<div class="price-cards">
  <section class="price-card">
    <p class="kicker">Today</p>
    <h2>Sample preview</h2>
    <p class="price">Free</p>
    <p>A sample day showing the Hermix experience: Today, What’s new, Tasks, Email, Meetings, and Ask Hermix. Live connections and actions are in development.</p>
    <ul class="ticks">
      <li>No account needed to explore the sample</li>
      <li>Being built for Windows 11</li>
    </ul>
  </section>
  <section class="price-card soon">
    <p class="kicker">Coming soon</p>
    <h2>Hermix</h2>
    <p class="price">To be announced</p>
    <p>Hermix connected to your real work, with live briefings, prepared replies, and supported actions you control.</p>
    <ul class="sparks">
      <li><b>Clear prices, shown upfront</b> Before anyone is asked to pay</li>
      <li><b>No surprise upgrades</b> Nobody is moved onto a paid plan without agreeing first</li>
    </ul>
  </section>
</div>
<h2>Questions about pricing?</h2>
<p>See the <a href="${b}faq.html">FAQ</a>, or <a href="${b}contact.html">send us a message</a>.</p>`,
};
