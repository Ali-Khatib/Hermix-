export default {
  file: "pricing.html",
  title: "Pricing", kicker: "Pricing",
  heading: "Simple plans, built to cost less.",
  description: "Hermix has a free plan and a Pro plan with more credits and an agent that does more for you. Join the waitlist to hear prices first.",
  lede: "Hermix is built to be easy on your wallet. Start free, and go Pro when you want your agent to do more.",
  body: (cfg, b) => `
<div class="price-cards">
  <section class="price-card">
    <p class="kicker">Start here</p>
    <h2>Free</h2>
    <p class="price">Free</p>
    <p>Get your day in order: a briefing in plain words, a clear plan, and help with replies and preparation.</p>
    <ul class="ticks">
      <li>Notifications gathered in one place</li>
      <li>A daily briefing you can understand</li>
      <li>Built for Windows 11</li>
    </ul>
  </section>
  <section class="price-card soon">
    <p class="kicker">Hermix Pro</p>
    <h2>Pro</h2>
    <p class="price">Announced at launch</p>
    <p>More credits and an agent that does more for you, the way the paid plans of other AI assistants do, at a lower price.</p>
    <ul class="sparks">
      <li><b>More credits</b> Your agent has more room to work for you</li>
      <li><b>An agent that does more</b> Bigger jobs, handled for you</li>
      <li><b>A lower price</b> Built to cost less than the assistants you use today</li>
    </ul>
  </section>
</div>
<h2>Questions about pricing?</h2>
<p>See the <a href="${b}faq.html">FAQ</a>, or <a href="${b}contact.html">send us a message</a>.</p>`,
};
