export default {
  file: "faq.html",
  title: "FAQ", kicker: "FAQ", heading: "Questions, answered.",
  description: "Answers about Hermix: what it is, what works in the preview, where your data lives, pricing, and how to get it.",
  lede: "Straight answers about what Hermix does today and what’s coming.",
  body: (cfg, b) => {
    const qa = [
      ["What is Hermix?", `Hermix is an AI coworker for Windows. It brings your email, meetings, tasks, and team updates into one calm view, tells you what needs you next, and drafts replies for you to check. See <a href="${b}index.html#how">how it works</a>.`],
      ["Does Hermix work with my apps yet?", `Not yet. The preview runs on a built-in sample day so you can try every screen. Live Gmail, Google Calendar, Slack, and GitHub connections are <a href="${b}index.html#soon">on the way</a>.`],
      ["Will Hermix send emails or post messages for me?", "Not in the preview. Hermix writes drafts, and you decide what to do with them. Sending and posting are coming, and they’ll always need your OK."],
      ["Can Hermix join my meetings?", "Not yet. Today Hermix helps you prepare: who’s coming, what was decided last time, and what’s still open. Joining calls is planned."],
      ["Where is my data stored?", `In the preview, everything you save stays on your computer. Hermix doesn’t send it to us or to an AI service. Read the <a href="${b}legal/privacy.html">Privacy Policy</a> for details.`],
      ["What do I need to run it?", "Windows 11. Hermix uses Microsoft Edge WebView2, which Windows 11 already includes."],
      ["How much does it cost?", `The preview is free. Prices for the full release haven’t been set yet. See <a href="${b}pricing.html">Pricing</a>.`],
      ["How do I get Hermix?", `Join the <a href="#waitlist">waitlist</a> and we’ll email you when it’s ready to download.`],
      ["Can I turn off the mascot or the animations?", "Yes. In Settings you can hide Hermix, turn off eye tracking, and reduce motion. Hermix also follows your system’s reduced-motion setting."],
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
