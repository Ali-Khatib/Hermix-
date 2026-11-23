/* Hermix landing: video loading, scroll story, menus. No dependencies. */
(() => {
  "use strict";

  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const small = () => window.innerWidth < 900 || (navigator.connection && navigator.connection.saveData);
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  // Smooth when Lenis is running, instant for reduced motion, native smooth otherwise.
  const scrollToEl = (el) => {
    if (window.hermixScroll) window.hermixScroll.scrollTo(el, { offset: -88 });
    else el.scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth", block: "start" });
  };

  // ---------- nav ----------
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Glass-nav interactivity: a sheen that follows the pointer and a pill that glides between links.
  if (!reduceMotion.matches && matchMedia("(hover: hover)").matches) {
    nav.addEventListener("pointermove", (e) => nav.style.setProperty("--mx", e.clientX - nav.getBoundingClientRect().left + "px"));
    const links = $(".nav-links", nav);
    if (links) {
      const pill = document.createElement("span");
      pill.className = "nav-pill"; pill.setAttribute("aria-hidden", "true");
      links.appendChild(pill); links.classList.add("has-pill");
      const to = (b) => { links.style.setProperty("--px", b.offsetLeft + "px"); links.style.setProperty("--pw", b.offsetWidth + "px"); pill.classList.add("on"); };
      $$(".nav-btn", links).forEach((b) => { b.addEventListener("pointerenter", () => to(b)); b.addEventListener("focus", () => to(b)); });
      links.addEventListener("pointerleave", () => pill.classList.remove("on"));
      links.addEventListener("focusout", () => pill.classList.remove("on"));
    }
  }

  // ---------- Features / Use cases pop-ups ----------
  const FEATURES = [
    ["s-today", "default", "Briefings", "Pick up where things stand."],
    ["s-new", "curious", "Updates", "See what changed and what it affects."],
    ["s-tasks", "organizing", "Tasks", "Keep the background with the next step."],
    ["s-email", "inbox", "Replies", "Prepare an answer with the context attached."],
    ["s-meetings", "meeting", "Meetings", "Carry decisions into the next conversation."],
    ["s-ask", "thinking", "Ask Hermix", "Ask a question or hand over a task."],
    ["s-context", "archivist", "AI models", "Connect your models and see their usage limits."],
    ["s-browser", "explorer", "Connect browser", "Ask Hermix about the page you are viewing."],
  ];
  const CASES = [
    ["s-today", "success", "Picking things up", "Get the background before you begin."],
    ["s-new", "detective", "A change of direction", "See which decisions affect the work ahead."],
    ["s-tasks", "creating", "Taking something forward", "Turn a request into a task with context."],
    ["s-email", "inbox", "Keeping a conversation moving", "Prepare the reply without starting from scratch."],
    ["s-meetings", "meeting", "Continuing the discussion", "Return to the decisions and open questions."],
    ["s-ask", "idle", "Following a question", "Investigate it, then work on the next step."],
  ];
  const item = ([id, mood, title, line]) =>
    `<button class="menu-item" type="button" data-go="${id}"><img src="media/landing/mascot/${mood}.webp" alt="" loading="lazy"><span><b>${title}</b><small>${line}</small></span></button>`;
  const group = (label, list) => `<div class="menu-group"><p class="kicker">${label}</p><div class="menu-grid">${list.map(item).join("")}</div></div>`;
  const menus = {
    features: group("Features", FEATURES),
    cases: group("Use cases", CASES),
    all: group("Features", FEATURES) + group("Use cases", CASES),
  };
  Object.entries(menus).forEach(([k, html]) => { const m = $("#menu-" + k); if (m) m.innerHTML = html; });

  const menuBtns = $$("[data-menu]");
  let openMenu = null;
  function closeMenu(focusBack) {
    if (!openMenu) return;
    $("#menu-" + openMenu).hidden = true;
    const btn = menuBtns.find((b) => b.dataset.menu === openMenu && b.offsetParent !== null);
    menuBtns.forEach((b) => b.setAttribute("aria-expanded", "false"));
    openMenu = null;
    if (focusBack && btn) btn.focus();
  }
  menuBtns.forEach((b) =>
    b.addEventListener("click", (ev) => {
      ev.stopPropagation();
      const k = b.dataset.menu;
      const wasOpen = openMenu === k;
      closeMenu(false);
      if (wasOpen) return;
      $("#menu-" + k).hidden = false;
      b.setAttribute("aria-expanded", "true");
      openMenu = k;
    })
  );
  $$(".menu").forEach((m) => m.addEventListener("click", (ev) => {
    ev.stopPropagation();
    const go = ev.target.closest("[data-go]");
    if (!go) return;
    closeMenu(false);
    const target = document.getElementById(go.dataset.go);
    if (target) scrollToEl(target);
  }));
  document.addEventListener("click", () => closeMenu(false));
  document.addEventListener("keydown", (ev) => { if (ev.key === "Escape") closeMenu(true); });
  addEventListener("scroll", () => { if (openMenu && Math.abs(window.scrollY - menuScrollY) > 80) closeMenu(false); }, { passive: true });
  let menuScrollY = 0;
  menuBtns.forEach((b) => b.addEventListener("click", () => (menuScrollY = window.scrollY)));

  // ---------- video helpers ----------
  function attach(video) {
    if (video.dataset.loaded) return;
    const src = (small() && video.dataset.srcSm) || video.dataset.src;
    if (!src) return;
    video.src = src;
    video.dataset.loaded = "1";
    video.addEventListener("error", () => video.closest(".film")?.classList.add("failed"), { once: true });
  }
  // ---------- opening curtain ----------
  // The sequence itself is CSS, so it still plays (and still clears) if this script never runs.
  const intro = $("#intro");
  const introPlays = intro && !document.documentElement.classList.contains("intro-seen") && !reduceMotion.matches;
  let clearIntro = () => {};
  if (introPlays) {
    document.documentElement.classList.add("intro-on");
    const scroller = window.hermixScroll;
    if (scroller && scroller.stop) scroller.stop();
    let cleared = false;
    clearIntro = () => {
      if (cleared) return;
      cleared = true;
      intro.classList.add("gone");
      document.documentElement.classList.remove("intro-on");
      if (scroller && scroller.start) scroller.start();
      setTimeout(() => intro.remove(), 900);
    };
    setTimeout(clearIntro, 2850);
    ["pointerdown", "keydown", "wheel", "touchstart"].forEach((e) =>
      window.addEventListener(e, clearIntro, { once: true, passive: true })
    );
  } else if (intro) {
    intro.remove();
  }

  // One visible video decoder at a time; no prefetch in reduced-motion/data-saving mode.
  const connection = navigator.connection;
  const restrained = () => reduceMotion.matches || !!connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType || "");
  const heroCopy = $("#hero-copy");
  setTimeout(() => heroCopy?.classList.add("in"), introPlays ? 1900 : 100);
  const media = [$("#hero-video"), ...$$(".panel .film video")].filter(Boolean);
  const visibility = new Map();
  const approved = new Set(), userPaused = new Set(), blocked = new Set();
  let current = null;
  const buttons = new Map();
  media.forEach((v) => {
    v.muted = true; v.playsInline = true; v.preload = "none";
    const hero = v.id === "hero-video";
    v.loop = !hero;
    v.addEventListener("playing", () => { if (document.hidden || current !== v || (visibility.get(v) || 0) < .2) v.pause(); else blocked.delete(v); });
    v.addEventListener("error", () => { (v.closest(hero ? ".hero-media" : ".film"))?.classList.add("failed"); });
    if (hero) v.addEventListener("ended", () => { if (current === v && !document.hidden) { v.currentTime = Math.min(8, Math.max(0, v.duration - 1)); play(v); } });
  });
  function play(v) {
    attach(v);
    v.play().catch(() => { blocked.add(v); setTimeout(() => { blocked.delete(v); chooseVideo(); }, 1500); });
  }
  function chooseVideo() {
    let best = null, ratio = .2;
    if (!document.hidden) visibility.forEach((r, v) => {
      if (r >= ratio && !blocked.has(v) && !restrained()) { best = v; ratio = r; }
    });
    media.forEach(v => { if (v !== best) v.pause(); });
    current = best;
    if (best && best.paused) play(best);
  }
  const videoIO = new IntersectionObserver(entries => {
    entries.forEach(e => { const v = e.target; visibility.set(v, e.isIntersecting ? e.intersectionRatio : 0); v.closest(".panel")?.classList.add("seen"); });
    chooseVideo();
  }, {threshold: [0, .15, .35, .5, .7, .9, 1]});
  media.forEach(v => videoIO.observe(v));
  document.addEventListener("visibilitychange", () => { document.body.classList.toggle("motion-idle", document.hidden); chooseVideo(); });
  function preferenceChanged() { approved.clear(); document.body.classList.toggle("save-data", restrained()); chooseVideo(); }
  reduceMotion.addEventListener("change", preferenceChanged);
  connection?.addEventListener("change", preferenceChanged);
  preferenceChanged();
  const seenIO = new IntersectionObserver(entries => entries.forEach(e => {
    e.target.classList.toggle("motion-visible", e.isIntersecting);
    if (e.isIntersecting) e.target.classList.add("seen");
  }), {rootMargin: "0px", threshold: 0});
  $$("main > section").forEach(s => seenIO.observe(s));
  $$(".panel").forEach(s => seenIO.observe(s));
  $("#foot-stage")?.classList.add("play");
  // The footer wordmark: letters rise and lean toward the cursor, ripple on tap, and ripple now and then on their own.
  (() => {
    const stage = $("#foot-stage"); if (!stage) return;
    const word = stage.querySelector(".foot-word"), letters = [...stage.querySelectorAll(".fw-l")];
    if (!word || !letters.length) return;
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
    let raf = 0, px = 0, py = 0, inView = false;
    const apply = () => {
      raf = 0; const wr = word.getBoundingClientRect();
      const vy = clamp(1 - Math.abs(py - (wr.top + wr.height / 2)) / (wr.height * 1.1), 0, 1);
      letters.forEach((l) => {
        const r = l.getBoundingClientRect(); const d = (px - (r.left + r.width / 2)) / (r.width * 1.7);
        const near = clamp(1 - Math.abs(d), 0, 1) * vy;
        l.style.setProperty("--py", (-near * 20).toFixed(1));
        l.style.setProperty("--pr", (clamp(d, -1, 1) * near * 5).toFixed(2));
        l.style.setProperty("--ps", (1 + near * 0.05).toFixed(3));
      });
    };
    const reset = () => letters.forEach((l) => { l.style.setProperty("--py", 0); l.style.setProperty("--pr", 0); l.style.setProperty("--ps", 1); });
    stage.addEventListener("pointermove", (e) => {
      if (e.pointerType !== "mouse" || restrained()) return;
      px = e.clientX; py = e.clientY; if (!raf) raf = requestAnimationFrame(apply);
    });
    stage.addEventListener("pointerleave", reset);
    function footWave(from = 0) {
      if (restrained()) return;
      letters.forEach((l, i) => l.animate(
        { scale: ["1 1", "1.07 .93", ".97 1.05", "1 1"], rotate: ["0deg", (i % 2 ? 3 : -3) + "deg", (i % 2 ? -2 : 2) + "deg", "0deg"] },
        { duration: 700, delay: Math.abs(i - from) * 80, easing: "cubic-bezier(.3,1.4,.5,1)" }
      ));
    }
    stage.addEventListener("pointerdown", (e) => {
      const hit = e.target.closest?.(".fw-l"); if (!hit) return;
      footWave(letters.indexOf(hit));
    });
    new IntersectionObserver((en) => { inView = en[0].isIntersecting; }, { threshold: 0.3 }).observe(stage);
    setInterval(() => { if (inView && !document.hidden) footWave(Math.floor(Math.random() * letters.length)); }, 9000);
    if (restrained()) stage.querySelectorAll("svg").forEach((s) => s.pauseAnimations?.());
  })();

  // Native button gives touch, Enter and Space the same gentle greeting.
  const poke = $(".hero-poke"), reaction = $(".hero-reaction");
  let reactionTimer;
  const lines = [
    "Right here with you.",
    "Inbox, calendar and tasks: one calm place.",
    "I only read what you connect.",
    "Hand me the busywork.",
    "Ask me what changed while you were away.",
    "Tell me the deadline. I'll watch it.",
    "Meeting in five? I'll have the context ready.",
    "Nothing leaves without your approval.",
    "Hermes carried messages. I carry context.",
    "Start caught up."
  ];
  let lineIx = Math.floor(Math.random() * lines.length);
  poke?.addEventListener("click", () => {
    poke.classList.remove("poked"); void poke.offsetWidth; poke.classList.add("poked");
    lineIx = (lineIx + 1 + Math.floor(Math.random() * (lines.length - 1))) % lines.length;
    reaction.classList.remove("show"); void reaction.offsetWidth;
    reaction.textContent = lines[lineIx]; reaction.classList.add("show");
    clearTimeout(reactionTimer);
    reactionTimer = setTimeout(() => { poke.classList.remove("poked"); reaction.classList.remove("show"); }, 3200);
  });
  poke?.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); if (!e.repeat) poke.click(); }
  });  const waitlist = $("#waitlist"), email = $("#wl-email");
  email?.addEventListener("focus", () => waitlist.classList.add("email-focused"));
  email?.addEventListener("blur", () => waitlist.classList.remove("email-focused"));

  // ---------- story rail: active step + mascot outfit ----------
  const links = $$("#rail-list a");
  const outfits = $$(".rail-mascot img");
  const mood = $("#rail-mood");
  function setStep(panel) {
    const step = panel.dataset.step;
    links.forEach((a) => a.classList.toggle("on", a.dataset.step === step));
    outfits.forEach((img) => img.classList.toggle("on", img.dataset.outfit === panel.dataset.outfit));
    if (mood) mood.textContent = panel.dataset.mood || "";
  }
  const stepIO = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) setStep(e.target); }),
    { rootMargin: "-45% 0px -45% 0px" }
  );
  $$(".panel").forEach((p) => stepIO.observe(p));
  if ($(".panel")) setStep($(".panel"));

  // ---------- rail links honour reduced motion ----------
  links.forEach((a) =>
    a.addEventListener("click", (ev) => {
      const target = document.querySelector(a.getAttribute("href"));
      if (!target) return;
      ev.preventDefault();
      scrollToEl(target);
      history.replaceState(null, "", a.getAttribute("href"));
    })
  );
})();
