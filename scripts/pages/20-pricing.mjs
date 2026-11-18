// Pricing: one page, three plans, Hermix in the middle. The plan switch is wired up in pricing.js.
const PLANS = [
  {
    id: "free", name: "Free", price: "$0", period: "to use", word: "FREE", mascot: "default",
    headline: "Enough to put the day in order.",
    desc: "Hermix reads what came in, tells you what matters and keeps your list straight. You stay the one who acts on it.",
    rows: [["Agent credits", "100 a month"], ["Connected apps", "3"], ["People", "1"]],
    cta: "Join the waitlist",
    features: [
      "A briefing each morning, in plain language",
      "Your task list, ranked and kept current",
      "Ask about anything Hermix has read",
      "Three connected apps",
      "100 agent credits a month",
      "Everything stays on your computer",
    ],
  },
  {
    id: "pro", name: "Pro", price: "$20", period: "a month", word: "PRO", mascot: "success",
    headline: "The agent starts doing the work.",
    desc: "Connect everything, ask for a briefing whenever you want one, and let Hermix work through the list instead of handing it to you.",
    rows: [["Agent credits", "2,000 a month"], ["Connected apps", "Unlimited"], ["People", "1"]],
    cta: "Join the waitlist",
    features: [
      "Everything in Free",
      "Unlimited connected apps",
      "A new briefing whenever you want one",
      "Replies drafted and waiting for your approval",
      "Hermix works your task list on its own",
      "Meeting prep and follow ups",
      "2,000 agent credits a month",
      "New features before anyone else",
    ],
  },
  {
    id: "team", name: "Team", price: "$60", period: "a month", word: "TEAM", mascot: "meeting",
    headline: "One shared picture for five people.",
    desc: "Everything in Pro for your whole group, with shared context so nobody asks the same question twice, and one bill at the end of it.",
    rows: [["Agent credits", "10,000 pooled"], ["Connected apps", "Unlimited"], ["People", "5 included"]],
    cta: "Talk to us",
    features: [
      "Everything in Pro, for five people",
      "Shared context across the group",
      "See who is waiting on whom",
      "Hand a task to someone else with its history",
      "10,000 agent credits, pooled",
      "One bill and admin controls",
      "Extra seats at $12 a month",
    ],
  },
];

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

export default {
  file: "pricing.html",
  title: "Pricing",
  kicker: "Pricing",
  heading: "Simple plans. One of them is free.",
  description: "Hermix pricing: a free plan, Pro at $20 a month for an agent that does the work, and Team at $60 a month for five people.",
  full: true,
  script: "pricing.js",
  body: (cfg, b) => `
    <section class="pr" id="pr" data-plan="free">
      ${PLANS.map((p) => `<span class="pr-bg pr-bg-${p.id}" aria-hidden="true"></span>`).join("")}
      <div class="pr-head">
        <a class="back" href="${b}index.html">← Back to Hermix</a>
        <p class="kicker">Pricing</p>
        <h1>Simple plans.<br />One of them is free.</h1>
        <p class="pr-lede">Hermix is still being built. These are the plans it launches with, so you know what you are joining.</p>
      </div>

      <div class="pr-grid">
        <div class="pr-info">
          <p class="pr-plan-name" data-pr-name>Hermix ${PLANS[0].name}</p>
          <h2 class="pr-headline" data-pr-headline>${esc(PLANS[0].headline)}</h2>
          <p class="pr-desc" data-pr-desc>${esc(PLANS[0].desc)}</p>
          <ul class="pr-feat" data-pr-features>${PLANS[0].features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
        </div>

        <div class="pr-stage" aria-hidden="true">
          <span class="pr-word" data-pr-word>${PLANS[0].word}</span>
          <span class="pr-glow"></span>
          <div class="pr-float">
            ${PLANS.map((p, i) => `<img class="pr-mascot${i === 0 ? " on" : ""}" data-plan="${p.id}" src="${b}media/landing/mascot/${p.mascot}.webp" alt="" width="560" height="449" ${i ? 'loading="lazy"' : ""} />`).join("")}
          </div>
          <span class="pr-floor"></span>
        </div>

        <aside class="pr-buy">
          <p class="pr-label" id="pr-plan-label">Plan</p>
          <div class="pr-swatches" role="radiogroup" aria-labelledby="pr-plan-label">
            ${PLANS.map((p, i) => `<button type="button" class="pr-swatch" role="radio" data-pr-plan="${p.id}" aria-checked="${i === 0}" tabindex="${i === 0 ? 0 : -1}"><span class="pr-chip pr-chip-${p.id}" aria-hidden="true"></span>${p.name}</button>`).join("")}
          </div>
          <div class="pr-price-row">
            <p class="pr-label">Price</p>
            <p class="pr-price"><b data-pr-price>${PLANS[0].price}</b><span data-pr-period>${PLANS[0].period}</span></p>
          </div>
          <dl class="pr-rows" data-pr-rows>
            ${PLANS[0].rows.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}
          </dl>
          <a class="btn btn-ink pr-cta" href="${b}index.html#waitlist" data-pr-cta>${PLANS[0].cta}</a>
          <p class="pr-fine">No card now. Nothing is charged until Hermix ships and you choose a plan.</p>
        </aside>
      </div>
    </section>

    <section class="pr-compare" aria-labelledby="pr-compare-title">
      <h2 id="pr-compare-title">Side by side</h2>
      <div class="pr-table-wrap">
        <table class="pr-table">
          <thead><tr><th scope="col">What you get</th>${PLANS.map((p) => `<th scope="col">${p.name}</th>`).join("")}</tr></thead>
          <tbody>
            ${[
              ["Briefing of what came in", "Each morning", "Whenever you want one", "Whenever you want one"],
              ["Task list, ranked and current", "yes", "yes", "yes"],
              ["Ask about anything it read", "yes", "yes", "yes"],
              ["Connected apps", "3", "Unlimited", "Unlimited"],
              ["Replies drafted for approval", "no", "yes", "yes"],
              ["Agent works the list on its own", "no", "yes", "yes"],
              ["Meeting prep and follow ups", "no", "yes", "yes"],
              ["Agent credits a month", "100", "2,000", "10,000 pooled"],
              ["People included", "1", "1", "5"],
              ["Shared context and handovers", "no", "no", "yes"],
              ["One bill and admin controls", "no", "no", "yes"],
            ].map(([label, ...cells]) => `<tr><th scope="row">${esc(label)}</th>${cells
              .map((v) => (v === "yes" ? '<td data-v="yes"><span class="pr-yes" aria-label="Included"></span></td>' : v === "no" ? '<td data-v="no"><span class="pr-no" aria-label="Not included"></span></td>' : `<td>${esc(v)}</td>`))
              .join("")}</tr>`).join("")}
          </tbody>
        </table>
      </div>
      <p class="pr-foot-note">Prices are in US dollars. Questions about a plan? <a href="${b}faq.html">Read the FAQ</a> or <a href="${b}contact.html">send us a message</a>.</p>
    </section>
  `,
};
