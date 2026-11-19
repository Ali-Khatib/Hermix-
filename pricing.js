/* Pricing page: switching a plan swaps the stage, the copy and the numbers. No dependencies.
   The plan data mirrors scripts/pages/20-pricing.mjs, which renders the same markup server side. */
(() => {
  const root = document.getElementById("pr");
  if (!root) return;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

  const PLANS = {
    free: {
      name: "Hermix Free", word: "FREE", price: "$0", unit: "per person / month", note: "",
      cta: "Join the waitlist", href: "index.html#waitlist",
      headline: "Start with work of your own.",
      desc: "Try briefings, questions and supported tasks with a small monthly allowance. Get a feel for Hermix before choosing a paid plan.",
      rows: [["Workspace", "One, personal"], ["Usage allowance", "To be confirmed"], ["People", "1"]],
      features: [
        "One personal workspace",
        "Briefings and questions from connected sources",
        "Supported tasks within your allowance",
        "Review and approval controls",
        "Monthly usage allowance",
      ],
    },
    plus: {
      name: "Hermix Plus", word: "PLUS", price: "$12", unit: "per person / month", note: "",
      cta: "Join the waitlist", href: "index.html#waitlist",
      headline: "A little more room to hand things over.",
      desc: "Keep using the same coworker with a larger allowance for questions, preparation and supported tasks.",
      rows: [["Workspace", "One, personal"], ["Usage allowance", "To be confirmed"], ["People", "1"]],
      features: [
        "Everything in Free",
        "A larger monthly usage allowance",
        "More capacity for connected work",
        "Usage and spending controls",
      ],
    },
    pro: {
      name: "Hermix Pro", word: "PRO", price: "$24", unit: "per person / month", note: "",
      cta: "Join the waitlist", href: "index.html#waitlist",
      headline: "For the work you return to every day.",
      desc: "Make Hermix part of regular work, with more capacity to investigate questions, prepare material and carry tasks through connected tools.",
      rows: [["Workspace", "One, personal"], ["Usage allowance", "To be confirmed"], ["People", "1"]],
      features: [
        "Everything in Plus",
        "Higher monthly usage",
        "More room for multi-step tasks",
        "Meeting workflows where supported",
        "Usage and spending controls",
      ],
    },
    max: {
      name: "Hermix Max", word: "MAX", price: "$59", unit: "per person / month", note: "",
      cta: "Join the waitlist", href: "index.html#waitlist",
      headline: "More capacity for longer work.",
      desc: "For frequent use and more demanding tasks. A larger individual allowance without the shared-workspace features you may not need.",
      rows: [["Workspace", "One, personal"], ["Usage allowance", "To be confirmed"], ["People", "1"]],
      features: [
        "Everything in Pro",
        "The highest individual usage allowance",
        "More capacity for longer tasks",
        "One personal workspace",
      ],
    },
    team: {
      name: "Hermix Team", word: "TEAM", price: "$30", unit: "per person / month",
      note: "Minimum 2 people ($60 / month).",
      cta: "Join the waitlist", href: "index.html#waitlist",
      headline: "Keep the work connected between people.",
      desc: "Share relevant context and hand over tasks in a workspace with managed access. Each person’s private sources stay separate unless they choose to share.",
      rows: [["Workspace", "Shared"], ["Usage allowance", "Pooled, to be confirmed"], ["People", "From 2"]],
      features: [
        "Shared workspaces",
        "Context attached to task handovers",
        "Usage pooled across paid seats",
        "Workspace access controls",
        "Central billing",
        "From two people",
      ],
    },
    enterprise: {
      name: "Hermix Enterprise", word: "ENTERPRISE", price: "Custom", unit: "by agreement", note: "",
      cta: "Discuss your requirements", href: "contact.html",
      headline: "Plan a rollout around your requirements.",
      desc: "Discuss expected usage, access requirements and deployment needs before agreeing a plan.",
      rows: [["Workspace", "Shared"], ["Usage allowance", "By agreement"], ["People", "By agreement"]],
      features: [
        "Agreed usage and seat requirements",
        "Rollout planning",
        "Review of access and data requirements",
        "Commercial terms by agreement",
      ],
    },
  };
  const order = ["free", "plus", "pro", "max", "team", "enterprise"];

  const info = $(".pr-info"), stage = $(".pr-stage");
  const nameEl = $("[data-pr-name]"), headEl = $("[data-pr-headline]"), descEl = $("[data-pr-desc]");
  const featEl = $("[data-pr-features]"), wordEl = $("[data-pr-word]"), priceEl = $(".pr-price");
  const priceB = $("[data-pr-price]"), periodEl = $("[data-pr-period]"), noteEl = $("[data-pr-note]");
  const rowsEl = $("[data-pr-rows]"), cta = $("[data-pr-cta]");
  const swatches = $$("[data-pr-plan]"), mascots = $$(".pr-mascot");
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  // The page may sit at a sub path, so keep whatever prefix the server rendered.
  const base = (cta.getAttribute("href") || "").replace(/index\.html#waitlist$/, "");

  let current = root.dataset.plan || "free";
  let timer = 0;
  let leaveTimers = [];

  function paint(p) {
    wordEl.textContent = p.word;
    nameEl.textContent = p.name;
    headEl.textContent = p.headline;
    descEl.textContent = p.desc;
    priceB.textContent = p.price;
    periodEl.textContent = p.unit;
    noteEl.textContent = p.note || "";
    noteEl.hidden = !p.note;
    cta.textContent = p.cta;
    cta.setAttribute("href", base + p.href);
    featEl.innerHTML = p.features.map((f, i) => `<li style="--i:${i}">${esc(f)}</li>`).join("");
    rowsEl.innerHTML = p.rows.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("");
  }

  function select(id, focus) {
    const p = PLANS[id];
    if (!p || id === current) return;
    current = id;
    root.dataset.plan = id;
    swatches.forEach((b) => {
      const on = b.dataset.prPlan === id;
      b.setAttribute("aria-checked", on ? "true" : "false");
      b.tabIndex = on ? 0 : -1;
      if (on && focus) b.focus();
    });

    // the one on show lifts away, the new one rises in
    leaveTimers.forEach(clearTimeout);
    leaveTimers = [];
    mascots.forEach((m) => {
      if (m.dataset.plan === id) {
        m.classList.remove("leaving");
        m.classList.add("on");
      } else if (m.classList.contains("on")) {
        m.classList.remove("on");
        m.classList.add("leaving");
        leaveTimers.push(setTimeout(() => m.classList.remove("leaving"), 600));
      }
    });

    // a quick second click must not let an older swap land after the newer one
    clearTimeout(timer);
    if (reduce.matches) {
      stage.classList.remove("out");
      info.classList.remove("swap");
      paint(p);
      return;
    }
    stage.classList.add("out");
    info.classList.add("swap");
    priceEl.classList.remove("roll");
    timer = setTimeout(() => {
      paint(PLANS[current]);
      stage.classList.remove("out");
      info.classList.remove("swap");
      void priceEl.offsetWidth;
      priceEl.classList.add("roll");
    }, 230);
  }

  swatches.forEach((b, i) => {
    b.addEventListener("click", () => select(b.dataset.prPlan));
    b.addEventListener("keydown", (e) => {
      const d = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
      if (!d) return;
      e.preventDefault();
      select(order[(i + d + order.length) % order.length], true);
    });
  });

  // ?plan=max opens on that plan
  const want = new URLSearchParams(location.search).get("plan");
  if (want && PLANS[want]) select(want);
})();
