/* ============ HERO 6 — dash, collect, "I've got you" ============
   Hermix darts through 16 different app icons (badges cleared, notifications flung away), lands in the middle,
   and keeps hovering and changing faces under the line. 0-6.8 s intro, 6.8-9.8 s is a seamless 3 s cycle the page loops. */
const G6 = {
  start: { x: 1100, y: 520 }, T0: 0.8, STEP: 0.62, HOP: 0.36, land: 7.0, landEnd: 7.9, CY0: 8.0, CYP: 6.0, L: { x: 1100, y: 575 },
  tiles: [
    ["mail", 1000, 300, 99, "99+"], ["chat", 1500, 220, 64, "64"], ["cal", 1760, 520, 12, "12"], ["photos", 1380, 800, 25, "25"],
    ["docs", 900, 850, 31, "31"], ["map", 640, 260, 3, "3"], ["tasks", 1250, 140, 18, "18"],
    ["cloud", 1700, 860, 6, "6"], ["wallet", 1000, 560, 5, "5"],
  ].map(([k, x, y, n, label]) => ({ k, x, y, n, label })),
  bulge: [90, -120, 110, -90, 140, -170, 200, -130, 100, -150],
  faces: ["default", "success", "curious", "thinking", "idle", "meeting"],
};
G6.STEP = G6.STEP;
const g6Extra = {
  photos: [["#ffd166", "#ef6f6c"], `<g fill="#fff" opacity=".95"><circle cx="84" cy="58" r="22"/><circle cx="110" cy="84" r="22"/><circle cx="84" cy="110" r="22"/><circle cx="58" cy="84" r="22"/></g><circle cx="84" cy="84" r="13" fill="#ef6f6c"/>`],
  music: [["#ff6b8b", "#c42a58"], `<path d="M70 118V50l48-12v66" fill="none" stroke="#fff" stroke-width="8" stroke-linejoin="round" stroke-linecap="round"/><circle cx="60" cy="118" r="14" fill="#fff"/><circle cx="108" cy="106" r="14" fill="#fff"/>`],
  map: [["#7ad39a", "#2f9a63"], `<path d="M84 140C60 108 46 90 46 68a38 38 0 0 1 76 0c0 22-14 40-38 72z" fill="#fff"/><circle cx="84" cy="68" r="14" fill="#2f9a63"/>`],
  notes: [["#ffe26a", "#f0b429"], `<rect x="42" y="38" width="84" height="96" rx="10" fill="#fffdf2"/><path d="M58 70h52M58 90h52M58 110h32" stroke="#e0a21b" stroke-width="7" stroke-linecap="round"/>`],
  cloud: [["#8fd1ff", "#3b8fe0"], `<path d="M56 116a24 24 0 0 1 2-48 32 32 0 0 1 60 8 20 20 0 0 1-2 40z" fill="#fff"/>`],
  cart: [["#9b8cff", "#5a43c8"], `<path d="M36 50h20l14 56h52l10-38H62" fill="none" stroke="#fff" stroke-width="8" stroke-linejoin="round" stroke-linecap="round"/><circle cx="78" cy="126" r="9" fill="#fff"/><circle cx="116" cy="126" r="9" fill="#fff"/>`],
  wallet: [["#38c8a8", "#12806b"], `<rect x="34" y="54" width="100" height="70" rx="14" fill="#fff"/><path d="M34 76h100" stroke="#12806b" stroke-width="6" opacity=".4"/><circle cx="110" cy="98" r="9" fill="#12806b"/>`],
  phone: [["#5ee38b", "#1d9c4f"], `<path d="M58 44l20 6 4 22-12 8c8 16 18 26 34 34l8-12 22 4 6 20c-6 14-22 20-40 12C70 124 44 98 40 68c-2-14 6-22 18-24z" fill="#fff"/>`],
};
const g6glyph = (k) => G3_GLYPH[k] || g6Extra[k][1];
const g6bg = (k) => G3_BG[k] || g6Extra[k][0];

SCENES.hero6 = {
  duration: 14.0,
  html: () => `<div class="frame" id="fr6">
    <style>
      #w6{position:absolute;inset:0;transform-origin:50% 50%}
      .marble6{position:absolute;inset:0;opacity:.16;mix-blend-mode:multiply;background:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'><filter id='m' x='0' y='0' width='100%' height='100%'><feTurbulence type='fractalNoise' baseFrequency='.0016 .006' numOctaves='5' seed='7'/><feColorMatrix values='0 0 0 0 .56  0 0 0 0 .5  0 0 0 0 .4  0 0 0 -2.2 1.35'/></filter><rect width='100%' height='100%' filter='url(%23m)'/></svg>")}
      .glow6{position:absolute;inset:0;background:radial-gradient(40% 50% at 57% 52%,rgba(246,220,152,.32),transparent 70%)}
      .band6{position:absolute;left:0;width:1920px;height:44px;opacity:.5}
      .t6{position:absolute;left:0;top:0;width:172px;height:172px;margin:-86px 0 0 -86px;will-change:transform;z-index:2}
      .t6 .sh{position:absolute;left:14px;right:14px;bottom:-34px;height:26px;border-radius:50%;background:radial-gradient(closest-side,rgba(40,30,15,.30),transparent)}
      .t6 .face{position:absolute;inset:0;border-radius:42px;overflow:hidden;box-shadow:0 26px 40px -14px rgba(40,30,15,.38),0 6px 12px rgba(40,30,15,.12),inset 0 0 0 1px rgba(255,255,255,.35),inset 0 -8px 14px rgba(0,0,0,.14),inset 0 8px 10px rgba(255,255,255,.28)}
      .t6 .face svg{position:absolute;inset:0;width:100%;height:100%}
      .t6 .face::after{content:"";position:absolute;inset:0;background:linear-gradient(160deg,rgba(255,255,255,.5),rgba(255,255,255,.08) 36%,transparent 48%)}
      .b6{position:absolute;left:-22px;top:-22px;min-width:64px;height:64px;padding:0 16px;border-radius:32px;background:linear-gradient(#ff6a64,#d3262b);color:#fff;font:800 32px/64px "PJS";text-align:center;border:4px solid #f6f0e4;box-shadow:0 10px 20px rgba(170,30,30,.4),inset 0 3px 4px rgba(255,255,255,.4)}
      #fx6{position:absolute;inset:0;z-index:5;pointer-events:none}
      #hx6{position:absolute;left:0;top:0;width:380px;height:380px;margin:-190px 0 0 -190px;z-index:6}
      #hx6 img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain}
      #au6{position:absolute;left:40px;top:55px;width:300px;height:300px;border-radius:50%;background:radial-gradient(closest-side,rgba(246,220,152,.85),rgba(246,220,152,0) 72%)}
      #q6{position:absolute;z-index:8;left:800px;top:236px;height:94px;padding:0 40px;border-radius:30px 30px 30px 8px;background:linear-gradient(#fffefa,#fbf6ea);border:1.5px solid rgba(212,169,76,.7);box-shadow:0 18px 44px rgba(40,32,22,.16),inset 0 0 0 5px rgba(255,255,255,.7);display:flex;align-items:center;font:800 38px "PJS";letter-spacing:-.035em;color:#1a1a1a;white-space:nowrap}
      #q6 .w{display:inline-block;margin-right:.26em}
      #br6{position:absolute;z-index:7;left:0;top:838px;width:1100px;margin-left:-550px;text-align:center;font-family:"PJS"}
      #br6 b{display:block;font:800 92px/1 "PJS";letter-spacing:-.045em;color:#1a1a1a}
      #br6 i{display:block;margin-top:14px;font:600 32px/1.1 "PJS";font-style:normal;letter-spacing:-.01em;color:#7a6a4c}
      #br6 u{display:block;width:120px;height:3px;margin:14px auto 0;border-radius:2px;background:linear-gradient(90deg,transparent,#d4a94c,transparent);text-decoration:none}
      #sh6{position:absolute;left:0;top:0;width:240px;height:40px;margin:-20px 0 0 -120px;border-radius:50%;background:radial-gradient(closest-side,rgba(40,30,15,.28),transparent);z-index:3}
    </style>
    <div class="stage" style="background:#e9e2d5"></div>
    <div id="w6">
      ${G6.tiles.map((tl, i) => `<div class="t6" id="t6${i}"><div class="sh"></div><div class="face"><svg viewBox="0 0 168 168"><defs><linearGradient id="b6${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${g6bg(tl.k)[0]}"/><stop offset="1" stop-color="${g6bg(tl.k)[1]}"/></linearGradient></defs><rect width="168" height="168" fill="url(#b6${i})"/>${g6glyph(tl.k)}</svg></div><div class="b6" id="d6${i}">${tl.label}</div></div>`).join("")}
      <canvas id="fx6" width="1920" height="1080"></canvas>
      <div id="sh6"></div>
      <div id="q6">${"Don’t worry. I’ve got you.".split(" ").map((w) => `<span class="w">${w}</span>`).join("")}</div>
      <div id="br6"><b>Hermix</b><i>Your work understood, your life easier.</i><u></u></div>
      <div id="hx6"><div id="au6"></div>${g3wreath()}<img id="hi6" src="assets/default.png" alt=""></div>
    </div>
  </div>`,
  setup() { this.c = $("#fx6").getContext("2d"); },
  arrive(i) { return G6.T0 + i * G6.STEP; },
  tgt(i) { return { x: G6.tiles[i].x, y: G6.tiles[i].y - 40 }; },
  cyc(t) { return t >= G6.CY0 ? (t - G6.CY0) % G6.CYP : -1; },
  hpos(t) {
    const S = G6.start, T = G6.tiles;
    if (t < G6.T0 - G6.HOP) { const u = prog(t, 0, G6.T0 - G6.HOP), p = g3quad({ x: -260, y: 760 }, { x: 420, y: 140 }, S, 1 - Math.pow(1 - u, 2.4)); return { ...p, sc: 0.8 + 0.2 * eOut(u) }; }
    for (let i = 0; i < T.length; i++) {
      const prev = i === 0 ? S : this.tgt(i - 1), a = this.arrive(i), to = this.tgt(i);
      if (t < a) {
        const u = eIO(clamp((t - (a - G6.HOP)) / G6.HOP)), m = { x: (prev.x + to.x) / 2, y: (prev.y + to.y) / 2 }, dx = to.x - prev.x, dy = to.y - prev.y, len = Math.hypot(dx, dy) || 1;
        return { ...g3quad(prev, { x: m.x - (dy / len) * G6.bulge[i], y: m.y + (dx / len) * G6.bulge[i] }, to, u), sc: 1 };
      }
      if (t < a + (G6.STEP - G6.HOP)) { const d = t - a; return { x: to.x, y: to.y + Math.sin(d * 22) * 3 * Math.exp(-d * 7), sc: 1 }; }
    }
    const last = this.tgt(T.length - 1), L = G6.L;
    if (t < G6.landEnd) { const u = eIO(prog(t, G6.land, G6.landEnd)); const p = g3quad(last, { x: 520, y: 760 }, L, u); return { ...p, sc: lerp(1, 1.25, u) }; }
    const tc = this.cyc(t) >= 0 ? this.cyc(t) : t - G6.CY0 + G6.CYP, w = (tc / G6.CYP) * Math.PI * 2;
    return { x: L.x + Math.sin(w * 2) * 14, y: L.y + Math.sin(w) * 16 + Math.sin(w * 3) * 4, sc: 1.25 + 0.03 * Math.sin(w * 2) };
  },
  render(t) {
    const T = G6.tiles, hp = this.hpos(t), h1 = this.hpos(t + 0.02), h0 = this.hpos(t - 0.02);
    const vx = (h1.x - h0.x) / 0.04, vy = (h1.y - h0.y) / 0.04, sp = Math.hypot(vx, vy), th = Math.atan2(vy, vx), ca = (th * 180) / Math.PI;
    let sq = 0; for (let i = 0; i < T.length; i++) { const d = t - this.arrive(i); if (d > 0 && d < 0.4) sq += Math.exp(-d * 11) * Math.sin(d * 34); }
    const flying = t < G6.landEnd, st = flying ? Math.min(0.2, sp / 11000) : 0, rot = flying ? Math.max(-1, Math.min(1, vx / 1400)) * 14 : Math.sin(t * 2.1) * 4;
    // face changes: on landing and every 0.5 s of the seamless cycle, each with a little squash pop
    const tc = this.cyc(t); let face = "default", pop = 0;
    if (t >= G6.landEnd - 0.1) { const tt = t >= G6.CY0 ? tc : t - G6.CY0 + G6.CYP, k = Math.floor((tt + 0.0001) / 1.0) % G6.faces.length; face = G6.faces[k]; const ph = (tt % 1.0) / 1.0; pop = Math.exp(-ph * 8) * Math.sin(ph * 26) * 0.07; }
    $("#hi6").src = "assets/" + face + ".png";
    $("#hx6").style.transform = `translate(${hp.x}px,${hp.y}px) rotate(${ca}deg) scale(${hp.sc * (1 + st - 0.1 * sq + pop)}, ${hp.sc * (1 - st * 0.55 + 0.12 * sq - pop)}) rotate(${-ca + rot}deg)`;
    const land = prog(t, G6.land, G6.landEnd);
    $("#au6").style.opacity = flying ? 0.3 + 0.35 * Math.max(0, Math.sin(t * 6)) : 0.55 + 0.25 * Math.sin(t * 4);
    $("#sh6").style.opacity = land; $("#sh6").style.transform = `translate(${hp.x}px,${G6.L.y + 250}px) scale(${1 - (G6.L.y - hp.y) / 260},1)`;
    T.forEach((tl, i) => {
      const el = $("#t6" + i), a = this.arrive(i), d = t - a, inK = eBack(prog(t, a - 0.55, a - 0.12)), out = prog(d, 0.03, 0.2);
      el.style.display = t > a - 0.56 && d < 0.22 ? "block" : "none";
      const fl = Math.sin(t * 1.5 + i * 1.3) * 6, tilt = Math.sin(t * 1.1 + i) * 9;
      el.style.transform = `translate(${tl.x}px, ${tl.y + fl + (1 - inK) * 60}px) perspective(700px) rotateY(${tilt}deg) scale(${(0.15 + 0.85 * inK) * (1 + 0.5 * out) * (1 - g3eIn(out))})`;
      const bd = $("#d6" + i); bd.textContent = d > 0 ? Math.max(0, Math.round(tl.n * (1 - prog(d, 0, 0.07)))) : tl.label; bd.style.transform = `scale(${d > 0.07 ? 0 : (d < 0 ? 1 + 0.07 * Math.sin(t * 12 + i) : 1)})`;
    });
    const q = $("#q6"), qk = eOut(prog(t, G6.land + 0.15, G6.land + 0.6)); q.style.opacity = qk; q.style.transform = `translateY(${(1 - qk) * 14}px)`;
    q.style.left = hp.x - 300 + "px"; q.style.top = G6.L.y - 400 + (t >= G6.landEnd ? 0 : 0) + "px";
    { const b = $("#br6"), bk = eOut(prog(t, G6.land + 0.7, G6.land + 1.3)); b.style.opacity = bk; b.style.transform = `translateY(${(1 - bk) * 18}px)`; b.style.left = hp.x + "px"; }
    $$("#q6 .w").forEach((w, i) => rv(w, t, G6.land + 0.3 + i * 0.12, 0.3, 8));
    let k2 = 0, sx = 0, sy = 0;
    for (let i = 0; i < T.length; i++) { const d = t - this.arrive(i); if (d > 0 && d < 0.4) { const e = Math.exp(-d * 14); k2 += 0.007 * e; sx += Math.sin(d * 80 + i) * 1.8 * e; sy += Math.cos(d * 70 + i) * 1.8 * e; } }
    { const d = t - G6.landEnd; if (d > 0 && d < 0.5) { const e = Math.exp(-d * 11); k2 += 0.012 * e; sy += Math.sin(d * 60) * 2.5 * e; } }
    $("#w6").style.transform = `translate(${sx}px,${sy}px) scale(${1 + k2})`;
    this.fx(t, hp, sp, th, tc);
  },
  fx(t, hp, sp, th, tc) {
    const c = this.c, T = G6.tiles; c.clearRect(0, 0, 1920, 1080);
    const cy = t >= G6.CY0, ph = cy ? tc / G6.CYP : 0;
    for (let i = 0; i < 40; i++) { // dust (periodic in the tail so the loop is seamless)
      const dep = 0.4 + g3rnd(i * 3.1) * 1.2, x = cy ? g3rnd(i * 1.7) * 1920 + Math.sin(ph * 6.283 * 2) * 22 * dep : ((g3rnd(i * 1.7) * 1920 + Math.sin(t * 0.6 * dep + i) * 30 + t * 14 * dep) % 1920),
        y = cy ? (((g3rnd(i * 2.3) * 1080 - ph * 1080 * Math.max(1, Math.round(dep))) % 1080) + 1080) % 1080 : (((g3rnd(i * 2.3) * 1080 - t * 38 * dep) % 1080) + 1080) % 1080;
      c.globalAlpha = 0.4 * (0.4 + 0.6 * Math.abs(Math.sin(cy ? ph * 12.566 + i : t * 1.7 + i))) * clamp(prog(t, 0, 0.8)); c.fillStyle = i % 5 ? G3.gold : "#fffaf0"; c.beginPath(); c.arc(x, y, 1.4 + dep * 1.9, 0, 7); c.fill();
    }
    c.globalAlpha = 1;
    const flying = t < G6.landEnd + 0.1;
    if (flying && sp > 350) { const a = clamp((sp - 350) / 900); let prev = hp; for (let k = 1; k <= 26; k++) { const p = this.hpos(t - k * 0.011), u = k / 26; c.strokeStyle = `rgba(${246 - 40 * u},${200 - 30 * u},110,${(1 - u) * 0.6 * a})`; c.lineWidth = (1 - u) * 36 * a + 2; c.lineCap = "round"; c.beginPath(); c.moveTo(prev.x, prev.y + 24); c.lineTo(p.x, p.y + 24); c.stroke(); prev = p; } }
    if (flying && sp > 1700) { const a = 0.6 * clamp((sp - 1700) / 1800), ux = Math.cos(th), uy = Math.sin(th); c.lineCap = "round"; for (let i = 0; i < 7; i++) { const off = (g3rnd(i * 5.3 + Math.floor(t * 30)) - 0.5) * 520, len = 280 + g3rnd(i * 9.1) * 420, px = hp.x - uy * off - ux * (120 + g3rnd(i * 2.2) * 200), py = hp.y + ux * off - uy * (120 + g3rnd(i * 2.2) * 200); c.strokeStyle = `rgba(255,248,225,${0.55 * a})`; c.lineWidth = 2 + g3rnd(i * 7.7) * 3; c.beginPath(); c.moveTo(px, py); c.lineTo(px - ux * len, py - uy * len); c.stroke(); } }
    for (let j = Math.max(0, Math.floor((t - 1.1) / 0.06)); j <= Math.floor(Math.min(t, G6.landEnd) / 0.06); j++) { // feathers
      const ts = j * 0.06, age = t - ts; if (ts < 0.2 || age > 1.2 || age < 0) continue; const hs = this.hpos(ts), v = Math.hypot(this.hpos(ts + 0.02).x - this.hpos(ts - 0.02).x, this.hpos(ts + 0.02).y - this.hpos(ts - 0.02).y) / 0.04; if (v < 500 && j % 3) continue;
      const rise = 40 + g3rnd(j * 4.1) * 90, x = hs.x + (g3rnd(j * 1.3) - 0.5) * 220 * eOut(age / 1.2), y = hs.y + 30 - rise * eOut(age / 1.2) + 70 * age * age;
      c.save(); c.translate(x, y); c.rotate(g3rnd(j * 2.9) * 6 + age * 3); c.globalAlpha = (1 - age / 1.2) * 0.95; c.fillStyle = j % 2 ? "#fffdf6" : G3.goldL; c.strokeStyle = "rgba(154,116,36,.5)"; c.lineWidth = 1.2; c.beginPath(); c.moveTo(0, -17); c.quadraticCurveTo(9, -4, 0, 17); c.quadraticCurveTo(-9, -4, 0, -17); c.fill(); c.stroke(); c.restore();
    }
    c.globalAlpha = 1;
    T.forEach((tl, i) => { // swept-away notifications + rings at each tap
      const a = this.arrive(i), d = t - a; if (d < 0 || d > 0.8) return;
      for (let k = 0; k < 6; k++) { const u = (d - k * 0.02) / 0.3; if (u <= 0 || u >= 1) continue; const from = { x: tl.x, y: tl.y }, to = hp, ctl = { x: (from.x + to.x) / 2 + (k % 2 ? 80 : -80), y: Math.min(from.y, to.y) - 60 }, p = g3quad(from, ctl, to, u * u * (3 - 2 * u)); const gr = c.createRadialGradient(p.x, p.y, 0, p.x, p.y, 22); gr.addColorStop(0, "#fffbe8"); gr.addColorStop(0.4, G3.goldL); gr.addColorStop(1, "rgba(212,169,76,0)"); c.globalAlpha = Math.sin(Math.PI * u); c.fillStyle = gr; c.beginPath(); c.arc(p.x, p.y, 22, 0, 7); c.fill(); c.globalAlpha = 1; }
    });
    const ld = t - G6.landEnd; // landing burst
    if (ld > 0 && ld < 0.8) { for (let k = 0; k < 40; k++) { const ang = g3rnd(k) * 6.283, dist = (90 + g3rnd(k * 3) * 260) * eOut(clamp(ld / 0.6)); c.globalAlpha = 1 - ld / 0.8; c.fillStyle = k % 3 ? G3.goldL : "#fff"; c.beginPath(); c.arc(G6.L.x + Math.cos(ang) * dist, G6.L.y + Math.sin(ang) * dist + 60 * ld * ld, (1 - ld / 0.8) * (3 + g3rnd(k) * 5), 0, 7); c.fill(); } c.globalAlpha = 1; }
    if (t >= G6.landEnd) { // calm orbiting sparkles around him (periodic in the tail)
      const base = cy ? ph : (t - G6.landEnd) / G6.CYP;
      for (let k = 0; k < 7; k++) { const a = (k / 7) * 6.283 + base * 6.283, r = 250 + 24 * Math.sin(base * 12.566 + k), x = hp.x + Math.cos(a) * r, y = hp.y + Math.sin(a) * r * 0.62; c.globalAlpha = 0.55 + 0.4 * Math.sin(base * 18.85 + k * 1.7); c.fillStyle = k % 2 ? G3.goldL : "#fff"; c.beginPath(); c.arc(x, y, 3.5 + (k % 3), 0, 7); c.fill(); }
      c.globalAlpha = 1; }
    function th0(i) { return [-0.35, 0.25, 2.9, -2.6, 0.1, 3.3, -0.2, 2.2][i % 8]; }
  },
};
