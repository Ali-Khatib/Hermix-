/* Pricing page: switching a plan swaps the stage, the copy and the numbers. No dependencies. */
(() => {
  const root = document.getElementById("pr");
  if (!root) return;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

  const PLANS = {
    free: {
      name: "Hermix Free", word: "FREE", price: "$0", period: "to use", cta: "Join the waitlist", href: "index.html#waitlist",
      headline: "Enough to put the day in order.",
      desc: "Hermix reads what came in, tells you what matters and keeps your list straight. You stay the one who acts on it.",
      rows: [["Agent credits", "100 a month"], ["Connected apps", "3"], ["People", "1"]],
      features: [
        "A briefing each morning, in plain language",
        "Your task list, ranked and kept current",
        "Ask about anything Hermix has read",
        "Three connected apps",
        "100 agent credits a month",
        "Everything stays on your computer",
      ],
    },
    pro: {
      name: "Hermix Pro", word: "PRO", price: "$20", period: "a month", cta: "Join the waitlist", href: "index.html#waitlist",
      headline: "The agent starts doing the work.",
      desc: "Connect everything, ask for a briefing whenever you want one, and let Hermix work through the list instead of handing it to you.",
      rows: [["Agent credits", "2,000 a month"], ["Connected apps", "Unlimited"], ["People", "1"]],
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
    team: {
      name: "Hermix Team", word: "TEAM", price: "$60", period: "a month", cta: "Talk to us", href: "contact.html",
      headline: "One shared picture for five people.",
      desc: "Everything in Pro for your whole group, with shared context so nobody asks the same question twice, and one bill at the end of it.",
      rows: [["Agent credits", "10,000 pooled"], ["Connected apps", "Unlimited"], ["People", "5 included"]],
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
  };
  const order = ["free", "pro", "team"];

  const info = $(".pr-info"), stage = $(".pr-stage");
  const nameEl = $("[data-pr-name]"), headEl = $("[data-pr-headline]"), descEl = $("[data-pr-desc]");
  const featEl = $("[data-pr-features]"), wordEl = $("[data-pr-word]"), priceEl = $(".pr-price");
  const priceB = $("[data-pr-price]"), periodEl = $("[data-pr-period]"), rowsEl = $("[data-pr-rows]"), cta = $("[data-pr-cta]");
  const swatches = $$("[data-pr-plan]"), mascots = $$(".pr-mascot");
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const base = (cta && cta.getAttribute("href") || "").replace(/index\.html#waitlist$/, "");

  let current = root.dataset.plan || "free";
  let timer = 0;

  const paintFeatures = (p) => {
    featEl.innerHTML = p.features.map((f, i) => `<li style="--i:${i}">${esc(f)}</li>`).join("");
    rowsEl.innerHTML = p.rows.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("");
  };

  function select(id, focus) {
    if (!PLANS[id] || id === current) return;
    const p = PLANS[id];
    current = id;
    root.dataset.plan = id;
    swatches.forEach((b) => {
      const on = b.dataset.prPlan === id;
      b.setAttribute("aria-checked", on ? "true" : "false");
      b.tabIndex = on ? 0 : -1;
      if (on && focus) b.focus();
    });

    // stage: the one on show lifts away, the new one rises in
    mascots.forEach((m) => {
      if (m.dataset.plan === id) { m.classList.remove("leaving"); m.classList.add("on"); }
      else if (m.classList.contains("on")) { m.classList.remove("on"); m.classList.add("leaving"); setTimeout(() => m.classList.remove("leaving"), 600); }
    });

    if (reduce.matches) {
      wordEl.textContent = p.word;
      nameEl.textContent = p.name; headEl.textContent = p.headline; descEl.textContent = p.desc;
      priceB.textContent = p.price; periodEl.textContent = p.period;
      cta.textContent = p.cta; cta.setAttribute("href", base + p.href);
      paintFeatures(p);
      return;
    }

    stage.classList.add("out");
    info.classList.add("swap");
    priceEl.classList.remove("roll");
    clearTimeout(timer);
    timer = setTimeout(() => {
      wordEl.textContent = p.word;
      nameEl.textContent = p.name; headEl.textContent = p.headline; descEl.textContent = p.desc;
      priceB.textContent = p.price; periodEl.textContent = p.period;
      cta.textContent = p.cta; cta.setAttribute("href", base + p.href);
      paintFeatures(p);
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

  // ?plan=pro opens on that plan
  const want = new URLSearchParams(location.search).get("plan");
  if (want && PLANS[want]) select(want);
  paintFeatures(PLANS[current]);
})();
