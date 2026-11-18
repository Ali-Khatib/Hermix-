export default {
  file: "faq.html",
  title: "FAQ", kicker: "FAQ", heading: "Questions, answered.",
  description: "Answers about Hermix: what it is, what it does, where your data lives, pricing, and how to get it.",
  lede: "Straight answers about what Hermix does and what is coming.",
  body: (cfg, b) => {
    const qa = [
      ["What is Hermix?", `Hermix is an AI coworker for Windows. It takes in the notifications and messages coming at you from all your apps, reads them for you, highlights what matters, and gives you a briefing in plain words. It then builds a task list and works through it with you. See <a href="${b}index.html#how">a day with Hermix</a>.`],
      ["Is Hermix available yet?", "Not yet. Hermix is in development. Join the waitlist and we will tell you as soon as it is ready."],
      ["Which apps will it work with?", `Hermix is being built to work with the apps you already use for email, calendars, chat, and code. We will share details as connections open. See what is <a href="${b}index.html#soon">on the way</a>.`],
      ["Will Hermix send emails or post messages for me?", "Only if you let it. Hermix is built around clear permissions, so you decide what it can do. Nothing is sent without your say."],
      ["Can Hermix join my meetings?", "Hermix helps you prepare before a conversation and follow up after it. Joining calls is planned."],
      ["Where is my data stored?", `Right now, everything you save stays on your computer. Hermix doesn’t send it to us or to an AI service. Read the <a href="${b}legal/privacy.html">Privacy Policy</a> for details.`],
      ["What do I need to run it?", "Windows 11. Hermix uses Microsoft Edge WebView2, which Windows 11 already includes."],
      ["How much does it cost?", `Hermix is built to cost less than most AI assistants. There is a free plan, and Pro gives you more credits and an agent that does more for you. See <a href="${b}pricing.html">Pricing</a>.`],
      ["How do I get Hermix?", `Join the <a href="#waitlist">waitlist</a> and we’ll email you when it’s ready to download.`],
      ["Can I turn off the mascot or the animations?", "Yes. In Settings you can hide Hermix, turn off eye tracking, and reduce motion. Hermix also follows your system’s reduced motion setting."],
      ["How do I leave the waitlist?", `Use the <a href="${b}contact.html?topic=remove_waitlist">contact form</a> and choose “Remove me from the waitlist”.`],
    ];
    return `<div class="faq">${qa.map(([q, a], i) => `
  <details${i === 0 ? " open" : ""}>
    <summary><h2>${q}</h2></summary>
    <p>${a}</p>
  </details>`).join("")}
</div>`;
  },
};
