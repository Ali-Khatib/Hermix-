/* The footer sign-off: drifting Greek charms, a wordmark that stamps itself in, and figures you can poke. */
(() => {
  const stage = document.getElementById("foot-stage");
  if (!stage) return;
  const sky = stage.querySelector(".foot-sky");
  const bubbles = stage.querySelector(".foot-bubbles");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

  // ---------- the charms that drift down ----------
  const ART = {
    leaf: '<path d="M-11 7C-6-5 4-11 12-11c1 9-6 18-23 18Z" fill="currentColor" opacity=".55"/><path d="M-11 7C-5 1 3-5 11-9" fill="none" stroke="currentColor" stroke-width="1.6"/>',
    laurel: '<path d="M-1 13C-3 2 2-8 11-13" fill="none" stroke="currentColor" stroke-width="2"/><path d="M-1 7c-5 1-8-2-8-6 4-1 8 1 8 6ZM2 1c-5 0-8-3-7-7 4 0 7 3 7 7ZM5-5c-4-1-6-5-4-8 3 1 5 5 4 8Z" fill="currentColor" opacity=".6"/>',
    sandal: '<path d="M-13 3C-7-5 3-9 13-7 7-1-2 4-13 3Z" fill="currentColor" opacity=".5"/><path d="M-9 2c4-4 10-6 16-6M-6 5c4-4 9-6 14-6" fill="none" stroke="currentColor" stroke-width="1.4"/>',
    amphora: '<path d="M-5-11h10M-4-8c-4 3-6 7-6 11 0 5 4 8 10 8s10-3 10-8c0-4-2-8-6-11Z" fill="currentColor" opacity=".5"/><path d="M-5-7c-5 0-7 3-6 6M5-7c5 0 7 3 6 6" fill="none" stroke="currentColor" stroke-width="1.6"/>',
    lyre: '<path d="M-9 12C-13 2-12-8-8-12M9 12c4-10 3-20-1-24" fill="none" stroke="currentColor" stroke-width="2"/><path d="M-10 9h20" stroke="currentColor" stroke-width="2"/><path d="M-4-5v13M0-6v14M4-5v13" stroke="currentColor" stroke-width="1.2"/>',
    spark: '<path d="M0-13c1 9 4 12 13 13-9 1-12 4-13 13-1-9-4-12-13-13 9-1 12-4 13-13Z" fill="currentColor" opacity=".7"/>',
  };
  const KINDS = ["leaf", "laurel", "sandal", "amphora", "lyre", "spark", "leaf", "spark"];
  const hash = (n) => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };
  const COUNT = window.innerWidth < 700 ? 7 : 13;

  const dots = [];
  if (!reduce.matches) {
    for (let i = 0; i < COUNT; i++) {
      const size = 20 + hash(i * 4.7) * 16;
      const el = document.createElement("span");
      el.className = "foot-dot";
      el.style.width = el.style.height = size + "px";
      el.style.marginLeft = el.style.marginTop = -size / 2 + "px";
      el.innerHTML = `<svg viewBox="-16 -16 32 32">${ART[KINDS[i % KINDS.length]]}</svg>`;
      sky.appendChild(el);
      dots.push({ el, x: 0, y: 0, vx: 0, vy: 0, rot: (hash(i * 1.7) - 0.5) * 60, vr: (hash(i * 6.1) - 0.5) * 24, fall: 8 + hash(i * 2.9) * 14, phase: hash(i * 8.3) * 6.28, pop: 0, seed: i });
    }
  }

  let W = 0, H = 0, px = NaN, py = NaN, inside = false, visible = false, playing = false, raf = 0, last = 0;
  const measure = () => { const r = sky.getBoundingClientRect(); W = r.width; H = r.height; };
  const place = () => {
    measure();
    dots.forEach((d, i) => { d.x = (0.05 + 0.9 * ((i + hash(i * 9.1) * 0.7) / Math.max(1, dots.length))) * W; d.y = hash(i * 3.3) * H; });
  };
  place();
  if (typeof ResizeObserver !== "undefined") new ResizeObserver(measure).observe(sky);

  const paint = () => {
    for (const d of dots) {
      d.el.style.transform = `translate3d(${d.x.toFixed(1)}px,${d.y.toFixed(1)}px,0) rotate(${d.rot.toFixed(1)}deg)`;
    }
  };

  const frame = (now) => {
    raf = requestAnimationFrame(frame);
    if (!visible || document.hidden) { last = now; return; }
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    const t = now / 1000;
    for (const d of dots) {
      if (d.pop > 0) { d.pop -= dt; if (d.pop <= 0) { d.el.classList.remove("pop"); d.x = hash(t + d.seed) * W; d.y = -30; d.vx = 0; d.vy = d.fall; } continue; }
      const sway = Math.sin(t * 0.7 + d.phase) * 12;
      if (inside) {
        const dx = d.x - px, dy = d.y - py, dist = Math.hypot(dx, dy);
        if (dist < 110 && dist > 0.01) {
          const k = (1 - dist / 110) ** 2 * 2000;
          d.vx += (dx / dist) * k * dt; d.vy += (dy / dist) * k * dt; d.vr += (dx > 0 ? 1 : -1) * k * 0.004 * dt;
        }
      }
      const ease = Math.min(1, dt * 2.4);
      d.vx += (sway - d.vx) * ease;
      d.vy += (d.fall - d.vy) * ease;
      d.vr += (Math.sin(d.phase * 3) * 14 - d.vr) * Math.min(1, dt * 0.8);
      d.x += d.vx * dt; d.y += d.vy * dt; d.rot = (d.rot + d.vr * dt) % 360;
      if (d.y > H + 36) { d.y = -30; d.x = hash(t * 7 + d.seed) * W; }
      else if (d.y < -90) d.y = H + 30;
      if (d.x < -36) d.x = W + 30; else if (d.x > W + 36) d.x = -30;
    }
    paint();
  };

  stage.addEventListener("pointermove", (e) => {
    const r = sky.getBoundingClientRect();
    px = e.clientX - r.left; py = e.clientY - r.top; inside = true;
  });
  stage.addEventListener("pointerleave", () => { inside = false; });
  dots.forEach((d) => d.el.addEventListener("pointerdown", () => { if (d.pop <= 0) { d.pop = 1.1; d.el.classList.add("pop"); } }));

  // ---------- the storyboard starts when the footer is reached ----------
  const start = () => {
    if (playing) return;
    playing = true;
    stage.classList.add("play");
    place(); paint();
  };
  if (typeof IntersectionObserver === "undefined") { start(); visible = true; }
  else {
    new IntersectionObserver((es) => es.forEach((e) => {
      visible = e.isIntersecting;
      if (e.isIntersecting && e.intersectionRatio > 0.1) start();
    }), { threshold: [0, 0.1, 0.4] }).observe(stage);
  }
  if (dots.length) { last = performance.now(); raf = requestAnimationFrame(frame); }

  // ---------- poke a figure, it hops and says something ----------
  let bubbleTimer = 0;
  stage.querySelectorAll(".fw-crew").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.remove("hop");
      void btn.offsetWidth;
      btn.classList.add("hop");
      const r = btn.getBoundingClientRect(), s = stage.getBoundingClientRect();
      bubbles.innerHTML = "";
      const b = document.createElement("div");
      b.className = "foot-bubble";
      b.textContent = btn.dataset.says;
      b.style.left = Math.min(Math.max(r.left - s.left + r.width / 2, 90), s.width - 90) + "px";
      b.style.top = Math.max(r.top - s.top - 8, 34) + "px";
      bubbles.appendChild(b);
      clearTimeout(bubbleTimer);
      bubbleTimer = setTimeout(() => { bubbles.innerHTML = ""; }, 2800);
    });
  });
})();
