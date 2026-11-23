export default {
  file: "faq.html",
  title: "FAQ", kicker: "FAQ", heading: "Questions, answered.",
  description: "Answers about Hermix: what it is, what it costs, how usage is measured, where your data lives, and how to get it.",
  lede: "Straight answers about what Hermix does and what is still being built.",
  body: (cfg, b) => {
    const qa = [
      ["What is Hermix?", `Hermix is an AI coworker for your computer, built to understand the context behind your work and help carry it out. That includes briefings, research, replies, meeting follow-ups and tasks across supported tools. It is currently in development. See <a href="${b}index.html#how">how it works</a>.`],
      ["Is it available yet?", "Hermix is in development. Join the waitlist and we’ll email you when you can try it."],
      ["What does it cost?", `A free plan is planned alongside Plus, Pro and Max for individual use, Team for shared workspaces, and Enterprise for agreed requirements. The <a href="${b}pricing.html">pricing page</a> shows the proposed launch structure; final prices and allowances will be confirmed before paid plans become available.`],
      ["How is usage measured?", "Usage depends on the work involved. Longer tasks and larger inputs can use more of your allowance. We’ll publish the allowances and how they’re measured before paid plans become available."],
      ["Which apps will it connect to?", "We’ll publish the supported connections before launch. Hermix will only access sources you connect and authorise; it won’t automatically have access to every app on your computer."],
      ["Will it send things without asking?", "Hermix is being built with approval controls for actions in connected tools. The permissions for each action will be shown before you authorise it."],
      ["Where does my data live?", `The current preview stores saved items on your computer and does not connect to your accounts. Data handling for connected features will be explained before you enable them. The <a href="${b}legal/privacy.html">Privacy Policy</a> describes the current preview and website.`],
      ["What do I need to run it?", "Hermix is built for desktop computers. We’ll confirm supported systems and exact requirements before release."],
      ["Can I turn the mascot off?", "Mascot and motion controls are planned. We’ll document the available settings before release."],
      ["How do I get it?", `Join the <a href="#waitlist">waitlist</a>. We’ll email you a download link when you can try it.`],
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
