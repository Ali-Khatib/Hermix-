export default {
  file: "faq.html",
  title: "FAQ", kicker: "FAQ", heading: "Questions, answered.",
  description: "Answers about Hermix: what it does, what it costs, which apps it connects to, where your data lives, and how to get it.",
  lede: "Straight answers about what Hermix does and what is coming.",
  body: (cfg, b) => {
    const qa = [
      ["What is Hermix?", `Hermix is an AI coworker for Windows. It reads the notifications, messages and updates arriving from every app you use, then gives you one briefing in plain language, a task list ranked by what is late and who is waiting, and an agent that works through it with you. See <a href="${b}index.html#how">a day with Hermix</a>.`],
      ["Is it available yet?", "Not yet. Hermix is in development. Join the waitlist and you will get one email the day it is ready to download."],
      ["What does it cost?", `There is a free plan. Pro is $20 a month and adds unlimited connected apps, 2,000 agent credits and an agent that drafts replies and works your task list on its own. Team is $60 a month for five people. See <a href="${b}pricing.html">Pricing</a>.`],
      ["What is an agent credit?", "One credit covers one piece of work Hermix does for you: reading a thread and summarising it, drafting a reply, preparing for a meeting. Reading your notifications and keeping your briefing current does not spend credits."],
      ["Which apps will it connect to?", "The ones you already use for email, calendars, chat and code. Free connects three of them, Pro connects as many as you like. The full list goes up before launch."],
      ["Will it send things without asking?", "No. Hermix drafts and waits. You decide what it is allowed to do, and anything that leaves your computer needs your approval first."],
      ["Where does my data live?", `On your computer. Hermix keeps what it reads locally and does not upload it to us. Read the <a href="${b}legal/privacy.html">Privacy Policy</a> for the detail.`],
      ["What do I need to run it?", "Windows 11. Hermix uses Microsoft Edge WebView2, which Windows 11 already includes."],
      ["Can I turn the mascot off?", "Yes. In Settings you can hide Hermix, turn off eye tracking and reduce motion. It also follows your system setting for reduced motion."],
      ["How do I get it?", `Join the <a href="#waitlist">waitlist</a>. We will email you a download link when it ships.`],
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
