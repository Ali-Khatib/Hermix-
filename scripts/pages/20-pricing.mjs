// Pricing: six proposed plans, Hermix in the middle. The selector is wired up in pricing.js,
// which holds the same PLANS data so the page works before and after the script loads.
export const PLANS = [
  {
    id: "free", name: "Hermix Free", short: "Free", word: "FREE", mascot: "default",
    price: "$0", unit: "per person / month", note: "",
    headline: "Start with work of your own.",
    desc: "Try briefings, questions and supported tasks with a small monthly allowance. Get a feel for Hermix before choosing a paid plan.",
    features: [
      "One personal workspace",
      "Briefings and questions from connected sources",
      "Supported tasks within your allowance",
      "Review and approval controls",
      "Monthly usage allowance",
    ],
    rows: [["Workspace", "One, personal"], ["Usage allowance", "To be confirmed"], ["People", "1"]],
    cta: "Join the waitlist", href: "index.html#waitlist",
  },
  {
    id: "plus", name: "Hermix Plus", short: "Plus", word: "PLUS", mascot: "curious",
    price: "$12", unit: "per person / month", note: "",
    headline: "A little more room to hand things over.",
    desc: "Keep using the same coworker with a larger allowance for questions, preparation and supported tasks.",
    features: [
      "Everything in Free",
      "A larger monthly usage allowance",
      "More capacity for connected work",
      "Usage and spending controls",
    ],
    rows: [["Workspace", "One, personal"], ["Usage allowance", "To be confirmed"], ["People", "1"]],
    cta: "Join the waitlist", href: "index.html#waitlist",
  },
  {
    id: "pro", name: "Hermix Pro", short: "Pro", word: "PRO", mascot: "success",
    price: "$24", unit: "per person / month", note: "",
    headline: "For the work you return to every day.",
    desc: "Make Hermix part of regular work, with more capacity to investigate questions, prepare material and carry tasks through connected tools.",
    features: [
      "Everything in Plus",
      "Higher monthly usage",
      "More room for multi-step tasks",
      "Meeting workflows where supported",
      "Usage and spending controls",
    ],
    rows: [["Workspace", "One, personal"], ["Usage allowance", "To be confirmed"], ["People", "1"]],
    cta: "Join the waitlist", href: "index.html#waitlist",
  },
  {
    id: "max", name: "Hermix Max", short: "Max", word: "MAX", mascot: "creating",
    price: "$59", unit: "per person / month", note: "",
    headline: "More capacity for longer work.",
    desc: "For frequent use and more demanding tasks. A larger individual allowance without the shared-workspace features you may not need.",
    features: [
      "Everything in Pro",
      "The highest individual usage allowance",
      "More capacity for longer tasks",
      "One personal workspace",
    ],
    rows: [["Workspace", "One, personal"], ["Usage allowance", "To be confirmed"], ["People", "1"]],
    cta: "Join the waitlist", href: "index.html#waitlist",
  },
  {
    id: "team", name: "Hermix Team", short: "Team", word: "TEAM", mascot: "meeting",
    price: "$30", unit: "per person / month", note: "Minimum 2 people ($60 / month).",
    headline: "Keep the work connected between people.",
    desc: "Share relevant context and hand over tasks in a workspace with managed access. Each person’s private sources stay separate unless they choose to share.",
    features: [
      "Shared workspaces",
      "Context attached to task handovers",
      "Usage pooled across paid seats",
      "Workspace access controls",
      "Central billing",
      "From two people",
    ],
    rows: [["Workspace", "Shared"], ["Usage allowance", "Pooled, to be confirmed"], ["People", "From 2"]],
    cta: "Join the waitlist", href: "index.html#waitlist",
  },
  {
    id: "enterprise", name: "Hermix Enterprise", short: "Enterprise", word: "ENTERPRISE", mascot: "thinking",
    price: "Custom", unit: "by agreement", note: "",
    headline: "Plan a rollout around your requirements.",
    desc: "Discuss expected usage, access requirements and deployment needs before agreeing a plan.",
    features: [
      "Agreed usage and seat requirements",
      "Rollout planning",
      "Review of access and data requirements",
      "Commercial terms by agreement",
    ],
    rows: [["Workspace", "Shared"], ["Usage allowance", "By agreement"], ["People", "By agreement"]],
    cta: "Discuss your requirements", href: "contact.html",
  },
];

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const P0 = PLANS[0];

// What each plan gives you. "planned" marks work that is not built yet.
const COMPARE = [
  ["Personal workspace", "yes", "yes", "yes", "yes", "yes", "yes"],
  ["Briefings and questions from connected sources", "yes", "yes", "yes", "yes", "yes", "yes"],
  ["Supported task execution, with approval", "yes", "yes", "yes", "yes", "yes", "yes"],
  ["Monthly usage allowance", "Smallest", "Larger", "Higher", "Highest", "Pooled per seat", "By agreement"],
  ["Capacity for longer, multi-step tasks", "no", "yes", "yes", "Most", "yes", "By agreement"],
  ["Usage and spending controls", "no", "yes", "yes", "yes", "yes", "yes"],
  ["Meeting workflows where supported", "planned", "planned", "planned", "planned", "planned", "planned"],
  ["Shared workspaces", "no", "no", "no", "no", "planned", "planned"],
  ["Task handovers with context", "no", "no", "no", "no", "planned", "planned"],
  ["Pooled usage across paid seats", "no", "no", "no", "no", "planned", "planned"],
  ["Workspace access controls", "no", "no", "no", "no", "planned", "planned"],
  ["Central billing", "no", "no", "no", "no", "yes", "yes"],
  ["Rollout planning", "no", "no", "no", "no", "no", "yes"],
];
const cell = (v) =>
  v === "yes" ? '<td data-v="yes"><span class="pr-yes" aria-label="Included"></span></td>'
  : v === "no" ? '<td data-v="no"><span class="pr-no" aria-label="Not included"></span></td>'
  : v === "planned" ? '<td data-v="planned"><span class="pr-planned">Planned</span></td>'
  : `<td>${esc(v)}</td>`;

export default {
  file: "pricing.html",
  title: "Pricing",
  kicker: "Pricing",
  heading: "Find the right amount of Hermix.",
  description: "Explore Hermix’s proposed Free, Plus, Pro, Max, Team and Enterprise plans for individual and shared work.",
  full: true,
  script: "pricing.js",
  body: (cfg, b) => `
    <section class="pr" id="pr" data-plan="free">
      ${PLANS.map((p) => `<span class="pr-bg pr-bg-${p.id}" aria-hidden="true"></span>`).join("")}
      <div class="pr-head">
        <a class="back" href="${b}index.html">← Back to Hermix</a>
        <p class="kicker">Pricing</p>
        <h1>Find the right<br />amount of Hermix.</h1>
        <p class="pr-lede">Start free, choose more room for your own work, or bring Hermix into a shared workspace.</p>
        <p class="pr-status">Proposed launch plans. Hermix is in development; prices, allowances and availability may change before release.</p>
      </div>

      <div class="pr-grid">
        <div class="pr-info">
          <p class="pr-plan-name" data-pr-name>${esc(P0.name)}</p>
          <h2 class="pr-headline" data-pr-headline>${esc(P0.headline)}</h2>
          <p class="pr-desc" data-pr-desc>${esc(P0.desc)}</p>
          <ul class="pr-feat" data-pr-features>${P0.features.map((f, i) => `<li style="--i:${i}">${esc(f)}</li>`).join("")}</ul>
        </div>

        <div class="pr-stage" aria-hidden="true">
          <span class="pr-word" data-pr-word>${P0.word}</span>
          <span class="pr-glow"></span>
          <div class="pr-float">
            ${PLANS.map((p, i) => `<img class="pr-mascot${i === 0 ? " on" : ""}" data-plan="${p.id}" src="${b}media/landing/mascot/${p.mascot}.webp" alt="" width="560" height="449" ${i ? 'loading="lazy"' : ""} />`).join("")}
          </div>
          <span class="pr-floor"></span>
        </div>

        <aside class="pr-buy">
          <p class="pr-label" id="pr-plan-label">Plan</p>
          <div class="pr-swatches" role="radiogroup" aria-labelledby="pr-plan-label">
            ${PLANS.map((p, i) => `<button type="button" class="pr-swatch" role="radio" data-pr-plan="${p.id}" aria-checked="${i === 0}" tabindex="${i === 0 ? 0 : -1}"><span class="pr-chip pr-chip-${p.id}" aria-hidden="true"></span>${p.short}</button>`).join("")}
          </div>
          <div class="pr-price-row">
            <p class="pr-label">Price</p>
            <p class="pr-price"><b data-pr-price>${P0.price}</b><span data-pr-period>${P0.unit}</span></p>
            <p class="pr-min" data-pr-note hidden></p>
          </div>
          <dl class="pr-rows" data-pr-rows>
            ${P0.rows.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}
          </dl>
          <a class="btn btn-ink pr-cta" href="${b}${P0.href}" data-pr-cta>${esc(P0.cta)}</a>
          <p class="pr-fine">Joining the waitlist is free. It does not start a subscription.</p>
        </aside>
      </div>
    </section>

    <section class="pr-compare" aria-labelledby="pr-compare-title">
      <h2 id="pr-compare-title">Compare the plans.</h2>
      <p class="pr-usage">Usage depends on the work involved. Longer tasks and larger inputs can use more of your allowance. We’ll publish the allowances and how they’re measured before paid plans become available.</p>
      <div class="pr-table-wrap">
        <table class="pr-table">
          <thead><tr><th scope="col">What you get</th>${PLANS.map((p) => `<th scope="col">${p.short}</th>`).join("")}</tr></thead>
          <tbody>
            ${COMPARE.map(([label, ...cells]) => `<tr><th scope="row">${esc(label)}</th>${cells.map(cell).join("")}</tr>`).join("")}
          </tbody>
        </table>
      </div>
      <p class="pr-foot-note">Prices are proposed and shown in US dollars. Questions about a plan? <a href="${b}faq.html">Read the FAQ</a> or <a href="${b}contact.html">send us a message</a>.</p>
    </section>
  `,
};
