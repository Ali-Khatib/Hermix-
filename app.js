/* Hermix landing — video loading, scroll story, wardrobe sync. No dependencies. */
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

  // ---------- Features / Use cases pop-ups ----------
  const FEATURES = [
    ["s-today", "default", "Today", "Your day in one plain sentence."],
    ["s-new", "curious", "What’s new", "Catch up on every app at once."],
    ["s-tasks", "organizing", "Tasks", "A short list of what needs you."],
    ["s-email", "inbox", "Email", "Replies drafted, waiting for you."],
    ["s-meetings", "meeting", "Meetings", "Prep notes before every call."],
    ["s-ask", "thinking", "Ask Hermix", "Ask anything about your day."],
  ];
  const CASES = [
    ["s-today", "success", "Busy mornings", "Start with one sentence, not five apps."],
    ["s-new", "detective", "Back from time off", "See what changed without the scroll."],
    ["s-tasks", "creating", "Too many threads", "Turn mentions into a clear to-do list."],
    ["s-email", "inbox", "A full inbox", "Know what needs a reply, and reply faster."],
    ["s-meetings", "meeting", "Back-to-back calls", "Walk into each one already briefed."],
    ["s-ask", "idle", "Quick questions", "Ask, get the answer, jump to the right place."],
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

  // ---------- hero ----------
  const heroVideo = $("#hero-video");
  const heroCopy = $("#hero-copy");
  const revealHero = () => heroCopy.classList.add("in");
  if (reduceMotion.matches || !heroVideo) {
    revealHero();
  } else {
    attach(heroVideo);
    safePlay(heroVideo);
    // Copy enters as the product window settles into the frame.
    const fallback = setTimeout(revealHero, 3600);
    heroVideo.addEventListener("timeupdate", function onT() {
      if (heroVideo.currentTime >= 3.2) { clearTimeout(fallback); revealHero(); heroVideo.removeEventListener("timeupdate", onT); }
    });
    heroVideo.addEventListener("error", () => { clearTimeout(fallback); revealHero(); });
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
    safePlay(v);
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
      film.classList.remove("ended", "paused-rm");
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

  // ---------- wardrobe ----------
  // Must match WARDROBE / HOLD / SWAP in scripts/motion/scenes/brand.js.
  const SEG = 2.4;        // seconds per mood in mascot-outfit-transition.webm
  const SWITCH_AT = 2.2;  // moment inside a segment when the crossfade is half-way
  const wardrobe = $("#meet");
  const wv = $("#wardrobe-video");
  const chips = $$("#outfits button");
  const names = ["default", "thinking", "detective", "organizing", "inbox", "meeting", "idle"];
  const N = names.length;
  // Highlight follows what's actually on screen, and the bar fills at the same pace as the mood.
  // Only touch the DOM when something visible changes (this runs every frame while playing).
  let shownI = -1, shownF = -1;
  const fills = chips.map((c) => $(".fill", c));
  const show = (i, frac) => {
    if (i !== shownI) {
      chips.forEach((c, j) => c.classList.toggle("on", j === i));
      if (fills[shownI]) fills[shownI].style.transform = "scaleX(0)";
      shownI = i; shownF = -1;
    }
    const f = Math.round(frac * 200) / 200;
    if (f !== shownF && fills[i]) { fills[i].style.transform = `scaleX(${f})`; shownF = f; }
  };
  const fromTime = (t) => {
    const shifted = t + (SEG - SWITCH_AT);
    return [Math.floor(shifted / SEG) % N, (shifted % SEG) / SEG];
  };
  show(0, 0);

  // VP9 alpha is reliable in Chromium and Firefox. Elsewhere, cycle the stills at the same pace.
  const ua = navigator.userAgent;
  const isSafari = /Safari\//.test(ua) && !/Chrome|Chromium|Edg|OPR|Firefox/.test(ua);
  const alphaOK = !isSafari && wv && wv.canPlayType('video/webm; codecs="vp9"') !== "";
  const fb = $("#wardrobe-fallback");

  function startFallback() {
    wardrobe.classList.add("no-alpha");
    if (!fb.children.length) fb.innerHTML = names.map((n, i) => `<img src="media/landing/mascot/${n}.webp" alt="" class="${i === 0 ? "on" : ""}">`).join("");
    let t0 = performance.now(), offset = 0, raf = 0, last = -1;
    const frame = (now) => {
      const t = offset + (now - t0) / 1000;
      const i = Math.floor(t / SEG) % N;
      if (i !== last) { $$("img", fb).forEach((im, j) => im.classList.toggle("on", j === i)); last = i; }
      show(i, (t % SEG) / SEG);
      raf = requestAnimationFrame(frame);
    };
    chips.forEach((c) => c.addEventListener("click", () => { offset = +c.dataset.i * SEG; t0 = performance.now(); last = -1; if (reduceMotion.matches) { $$("img", fb).forEach((im, j) => im.classList.toggle("on", j === +c.dataset.i)); show(+c.dataset.i, 1); } }));
    return {
      play() { if (reduceMotion.matches) return; cancelAnimationFrame(raf); t0 = performance.now() - 0; raf = requestAnimationFrame(frame); },
      pause() { cancelAnimationFrame(raf); },
    };
  }

  let wardrobeCtl;
  if (alphaOK) {
    let raf = 0;
    const tick = () => { show(...fromTime(wv.currentTime)); raf = requestAnimationFrame(tick); };
    wv.addEventListener("play", () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(tick); });
    wv.addEventListener("pause", () => cancelAnimationFrame(raf));
    wv.addEventListener("error", () => { wardrobeCtl = startFallback(); wardrobeCtl.play(); });
    chips.forEach((c) => c.addEventListener("click", () => {
      attach(wv);
      // Land just after the previous crossfade so the chosen mood is fully on screen.
      const seek = () => { wv.currentTime = Math.max(0, +c.dataset.i * SEG - (SEG - SWITCH_AT) + 0.25); show(...fromTime(wv.currentTime)); };
      if (wv.readyState >= 1) seek(); else wv.addEventListener("loadedmetadata", seek, { once: true });
      if (!reduceMotion.matches) safePlay(wv);
    }));
    wardrobeCtl = {
      play() { attach(wv); if (!reduceMotion.matches) safePlay(wv); },
      pause() { wv.pause(); },
    };
  } else {
    wardrobeCtl = startFallback();
  }

  new IntersectionObserver(
    (entries) => entries.forEach((e) => (e.isIntersecting ? wardrobeCtl.play() : wardrobeCtl.pause())),
    { threshold: 0.35 }
  ).observe(wardrobe);

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
