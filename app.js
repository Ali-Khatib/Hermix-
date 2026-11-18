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
    ["s-today", "default", "Your day", "One briefing, not forty notifications."],
    ["s-new", "curious", "What changed", "Where a long thread actually landed."],
    ["s-tasks", "organizing", "Your plan", "Every promise you made, in one list."],
    ["s-email", "inbox", "Replies", "Drafted, waiting for your approval."],
    ["s-meetings", "meeting", "Prep", "What was decided last time."],
    ["s-ask", "thinking", "Ask", "Answers from your own work."],
  ];
  const CASES = [
    ["s-today", "success", "Busy mornings", "Open one page instead of nine apps."],
    ["s-new", "detective", "Back from time off", "Four hundred messages, one read."],
    ["s-tasks", "creating", "Too many threads", "Turn requests into a plan."],
    ["s-email", "inbox", "A full inbox", "Know what needs you first."],
    ["s-meetings", "meeting", "Packed days", "Prepared for every one of them."],
    ["s-ask", "idle", "Quick questions", "Ask, then act on the answer."],
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
  const safePlay = (v) => { const p = v.play(); if (p && p.catch) p.catch(() => {}); };
  // Phones in Low Power Mode (and some data savers) refuse to autoplay. Instead of leaving a frozen frame,
  // the caller shows a clear tap to play button, and a tap (a real gesture) always works.
  function guardPlay(v, onBlocked, onOk) {
    let ok = false;
    v.addEventListener("playing", () => { ok = true; if (onOk) onOk(); }, { once: true });
    const p = v.play();
    if (p && p.catch) p.catch(() => onBlocked());
    setTimeout(() => { if (!ok && v.paused) onBlocked(); }, 1800);
  }

  // ---------- hero ----------
  const heroVideo = $("#hero-video");
  const heroCopy = $("#hero-copy");
  const heroMedia = $(".hero-media");
  const revealHero = () => heroCopy.classList.add("in");
  if (reduceMotion.matches || !heroVideo) {
    revealHero();
  } else {
    attach(heroVideo);
    // Copy enters a moment after the film starts.
    const fallback = setTimeout(revealHero, 3600);
    heroVideo.addEventListener("timeupdate", function onT() {
      if (heroVideo.currentTime >= 3.2) { clearTimeout(fallback); revealHero(); heroVideo.removeEventListener("timeupdate", onT); }
    });
    heroVideo.addEventListener("error", () => { clearTimeout(fallback); revealHero(); });
    // The film loops by itself (loop attribute), so it never rests on a frozen frame.
    const playBtn = document.createElement("button");
    playBtn.type = "button"; playBtn.className = "hero-play"; playBtn.setAttribute("aria-label", "Play the intro"); playBtn.innerHTML = "<span></span>";
    heroMedia.appendChild(playBtn);
    const unblock = () => heroMedia.classList.remove("blocked");
    playBtn.addEventListener("click", () => { const p = heroVideo.play(); if (p && p.then) p.then(unblock).catch(() => {}); });
    heroVideo.addEventListener("playing", unblock);
    guardPlay(heroVideo, () => { heroMedia.classList.add("blocked"); revealHero(); });
    // Pause when off screen, and pick up again when it comes back.
    new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { if (heroVideo.paused && !heroMedia.classList.contains("blocked")) safePlay(heroVideo); } else heroVideo.pause(); }), { threshold: 0.1 }).observe(heroMedia);
    document.addEventListener("visibilitychange", () => { if (!document.hidden && heroVideo.paused && !heroMedia.classList.contains("blocked")) safePlay(heroVideo); });
  }

  // ---------- feature films: lazy load, play the most visible one, one at a time ----------
  const films = $$(".panel .film");
  const ratios = new Map();
  let current = null; // the film element currently allowed to play

  // A film that stops before its end rests on its finished frame (never a blank
  // opening frame) and replays from the top on the next visit.
  function rest(film) {
    const v = $("video", film);
    v.pause();
    if (v.currentTime > 0 && !v.ended && v.duration) {
      v.currentTime = Math.max(0, v.duration - 0.05);
      film.classList.add("ended");
    }
  }

  function start(film) {
    const v = $("video", film);
    film.closest(".panel").classList.add("seen");
    attach(v);
    if (reduceMotion.matches) { film.classList.add("paused-rm"); return; }
    if (v.ended || film.classList.contains("ended")) { v.currentTime = 0; film.classList.remove("ended"); }
    const rb = $(".replay", film);
    guardPlay(v, () => { film.classList.add("ended", "blocked"); rb.textContent = "Play demo"; }, () => { film.classList.remove("ended", "blocked"); rb.textContent = "Replay"; });
  }

  function choose() {
    let best = null, bestR = 0.5;
    ratios.forEach((r, film) => { if (r >= bestR) { best = film; bestR = r; } });
    if (best === current) return;
    if (current) rest(current);
    current = best;
    if (best) start(best);
  }

  films.forEach((film) => {
    const v = $("video", film);
    if (reduceMotion.matches) $(".replay", film).textContent = "Play demo";
    v.addEventListener("ended", () => film.classList.add("ended"));
    $(".replay", film).addEventListener("click", () => {
      if (current && current !== film) rest(current);
      current = film;
      attach(v);
      film.classList.remove("ended", "paused-rm", "blocked");
      v.currentTime = 0;
      safePlay(v);
    });
  });

  // Load a little before a film arrives; preload="none" keeps first load light.
  const nearIO = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const v = $("video", e.target);
      attach(v);
      if (!reduceMotion.matches) v.preload = "auto";
      nearIO.unobserve(e.target);
    }),
    { rootMargin: "600px 0px" }
  );
  films.forEach((f) => nearIO.observe(f));

  const playIO = new IntersectionObserver(
    (entries) => { entries.forEach((e) => ratios.set(e.target, e.isIntersecting ? e.intersectionRatio : 0)); choose(); },
    { threshold: [0, 0.25, 0.5, 0.6, 0.75, 0.9, 1] }
  );
  films.forEach((f) => playIO.observe(f));

  // Panels fade their film in a bit earlier than playback starts.
  const seenIO = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("seen"); seenIO.unobserve(e.target); } }),
    { rootMargin: "0px 0px -15% 0px" }
  );
  $$(".panel").forEach((p) => seenIO.observe(p));

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
