/* Six Hermix feature demos. Each recreates the real desktop screens with the app's sample day. */

const STAGE = (inner, dark = false) =>
  `<div class="frame"><div class="stage ${dark ? "dark" : ""}"></div><div class="grain"></div><div class="camera" id="cam">${inner}</div></div>`;

/* ============ 01 TODAY — morning briefing ============ */
SCENES.today = {
  duration: 8,
  html: () => STAGE(shell("today")),
  setup() {
    $("#main").innerHTML = `
    <style>
      .td-date{font-size:13px;font-weight:700;letter-spacing:.1em;color:var(--t2);margin-top:46px}
      .td-h{font-size:46px;font-weight:800;letter-spacing:-.04em;line-height:1.2;max-width:640px;margin-top:18px}
      .td-h .w{display:inline-block}
      .td-h .chip{display:inline-flex}
      .chip{display:inline-flex;align-items:center;gap:10px;height:50px;line-height:1;padding:0 18px 0 14px;margin:3px 2px;border-radius:999px;background:#fffdf9;border:1px solid var(--b2);box-shadow:0 4px 14px rgba(26,26,26,.05);vertical-align:middle;font-size:42px;letter-spacing:-.04em}
      .chip svg{width:18px;height:18px;stroke-width:1.6}
      .td-rule{height:1px;background:var(--b2);width:632px;margin:30px 0 24px}
      .td-k{font-size:13px;font-weight:700;letter-spacing:.1em;color:var(--t2)}
      .td-row{display:flex;align-items:center;gap:10px;margin-top:14px;font-size:19px;font-weight:500;color:#2a2824}
      .pchip{display:inline-flex;align-items:center;gap:8px;height:38px;padding:0 14px;border-radius:999px;background:#fffdf9;border:1px solid var(--b2);font-size:15px;font-weight:700;color:var(--t1);position:relative}
      .pchip svg{width:16px;height:16px}
      .td-btns{margin-top:28px;display:flex;gap:12px}
      .td-btns .btn{height:48px;padding:0 22px;border-radius:14px;font-size:16px}
      .glow{position:absolute;inset:-6px;border-radius:999px;box-shadow:0 0 0 3px rgba(156,139,114,.55),0 10px 30px rgba(156,139,114,.35);opacity:0}
    </style>
    <p class="td-date" id="d">TUESDAY, OCTOBER 27</p>
    <h1 class="td-h" id="h">
      <span class="w">Good</span> <span class="w">morning.</span> <span class="w">You</span> <span class="w">have</span>
      <span class="chip w">${ico("video")}2 meetings</span> <span class="w">this</span> <span class="w">morning,</span> <span class="w">a</span> <span class="w">free</span>
      <span class="chip w">${ico("sun")}afternoon</span><span class="w">,</span> <span class="w">and</span> <span class="chip w">${ico("mail")}2 emails</span>
      <span class="w">waiting</span> <span class="w">on</span> <span class="w">you.</span>
    </h1>
    <div class="td-rule" id="rule"></div>
    <p class="td-k" id="k">WHAT’S UP</p>
    <div class="td-row r"><span class="pchip">${ico("calendar")}Product roadmap planning</span>until 12:30 with Dana, Omar, Priya.</div>
    <div class="td-row r"><span class="pchip" id="maya"><span class="glow" id="glow"></span>${ico("mail")}Maya · Thursday sync</span>wants 2:00 — draft ready.</div>
    <div class="td-row r"><span class="pchip">${ico("mail")}Security draft</span>still needs your pass.</div>
    <div class="td-row r"><span class="pchip">${ico("sun")}Focus block</span>is open after 1:30.</div>
    <div class="td-btns" id="btns"><span class="btn dark">Ask Hermix</span><span class="btn">All tasks</span></div>`;
    this.maya = at("#maya", 0.55, 0.6);
    this.cam = [
      { t: 0, s: 1.02, x: 0, y: 30, o: 0 },
      { t: 0.7, s: 1.08, x: 0, y: 0, o: 1 },
      { t: 3.2, s: 1.1, x: 20, y: 0 },
      { t: 5.0, s: 1.26, x: 120, y: -90 },
      { t: 8, s: 1.29, x: 125, y: -100 },
    ];
    const m = this.maya;
    this.cur = [
      { t: 0, x: 1250, y: 700 },
      { t: 4.6, x: 1180, y: 660 },
      { t: 5.7, x: m.x, y: m.y },
      { t: 8, x: m.x + 4, y: m.y + 2 },
    ];
  },
  render(t) {
    applyCamera(this.cam, t);
    this.content(t);
    applyCursor(this.cur, [], t, [4.4, 99]);
  },
  content(t) {
    rv("#d", t, 0.5, 0.5, 8);
    $$("#h .w").forEach((w, i) => rv(w, t, 0.75 + i * 0.075, 0.5, 18));
    const r = $("#rule"); r.style.transformOrigin = "0 0"; r.style.transform = `scaleX(${eOut(prog(t, 2.4, 3.2))})`;
    rv("#k", t, 2.7, 0.4, 8);
    $$(".r").forEach((el, i) => rv(el, t, 2.95 + i * 0.28, 0.55, 14));
    rv("#btns", t, 4.2, 0.5, 10);
    const g = eOut(prog(t, 5.9, 6.5));
    $("#glow").style.opacity = g;
    $("#maya").style.transform = `translateY(${-2 * g}px)`;
  },
};

/* ============ 02 WHAT'S NEW — catch up ============ */
SCENES.whatsnew = {
  duration: 9,
  html: () => STAGE(shell("new")),
  setup() {
    const appBtn = (id, icon, on) => `<span class="ap ${on ? "on" : ""}" id="ap-${id}">${ico(icon)}<em>3</em></span>`;
    $("#main").innerHTML = `
    <style>
      .wn-top{display:flex;align-items:flex-start;justify-content:space-between}
      .apps{display:flex;gap:4px;padding:6px;border-radius:999px;background:#f1ece3;border:1px solid var(--b1);margin-top:40px;margin-right:12px}
      .ap{width:46px;height:46px;border-radius:50%;display:flex;align-items:center;justify-content:center;position:relative}
      .ap svg{width:21px;height:21px;stroke:#333}
      .ap.on{background:#fff;box-shadow:0 2px 8px rgba(0,0,0,.08)}
      .ap em{position:absolute;right:4px;top:2px;min-width:16px;height:16px;border-radius:8px;background:#2a2825;color:#fff;font-size:10px;font-style:normal;font-weight:700;display:flex;align-items:center;justify-content:center}
      .wn-cols{display:flex;gap:48px;margin-top:20px}
      .wn-list{width:332px;border-right:1px solid var(--b1);padding-right:12px;height:560px;position:relative}
      .wn-list .grp{position:absolute;left:0;right:12px;top:0}
      .wn-list .lrow{border-radius:0;border:0;border-bottom:1px solid var(--b1);padding:18px 0 18px 0}
      .wn-list .lrow.sel{background:#ebe5db;border-radius:6px}
      .wn-list .lrow.sel::before{display:none}
      .src{font-size:14px;font-weight:700}
      .wn-list h4{font-size:16px;margin-top:4px}
      .wn-list .when{top:18px;right:12px}
      .wn-detail{flex:1;max-width:800px;position:relative}
      .msg{padding:26px 28px}
      .msg h3{font-size:20px;font-weight:800;letter-spacing:-.02em}
      .msg .meta{font-size:15px;color:var(--t2);font-weight:600;margin-top:8px}
      .msg p{font-size:17px;margin-top:14px}
      .draft{margin-top:24px;padding:22px}
      .draft-top{display:flex;justify-content:space-between;align-items:center}
      .draft-top .np{font-size:14px;font-weight:700;color:var(--t2)}
      .ta{margin-top:20px;border:2px solid #1a1a1a;border-radius:16px;height:118px;padding:16px 20px;font-size:18px;line-height:1.45}
      .dbtn{display:flex;gap:12px;margin-top:22px}
      .dbtn .btn{height:46px}
      .post{background:#8f8b86;border-color:#8f8b86;color:#fff}
      .hx-sum{display:flex;gap:12px;align-items:flex-start;margin-top:18px;padding:16px 18px;border-radius:14px;background:#f4efe7;border:1px dashed rgba(26,26,26,.22);font-size:15px;color:var(--t2);line-height:1.45}
      .hx-sum img{width:34px;height:34px;object-fit:contain;flex:none;margin-top:-2px}
    </style>
    <div class="wn-top"><h1 class="pt">What’s new</h1>
      <div class="apps" id="apps">${appBtn("mail", "mail", true)}${appBtn("cal", "calendar")}${appBtn("slack", "hash")}${appBtn("gh", "git-pull-request")}</div></div>
    <div class="wn-cols">
      <div class="wn-list">
        <div class="grp" id="g-mail">
          <div class="lrow"><span class="when">10:55 AM</span><div class="src">Email</div><h4>From Lena Ortiz</h4><p>Redlines on the vendor agreement — can you confirm retention language today?</p></div>
          <div class="lrow"><span class="when">10:42 AM</span><div class="src">Email</div><h4>From Maya Chen</h4><p>Can we move Thursday’s sync to 2?</p></div>
          <div class="lrow"><span class="when">10:05 AM</span><div class="src">Email</div><h4>From You</h4><p>Security draft for the board — waiting on your pass.</p></div>
        </div>
        <div class="grp" id="g-slack">
          <div class="lrow" id="fin"><span class="when">10:10 AM</span><div class="src">Chat</div><h4>From Finance team</h4><p>Approved. Ops can be copied when you send it.</p></div>
          <div class="lrow"><span class="when">9:40 AM</span><div class="src">Chat</div><h4>From Jordan Lee · #design</h4><p>Updated the search beta frames in the design file, need a quick look before standup.</p></div>
          <div class="lrow"><span class="when">8:20 PM</span><div class="src">Chat</div><h4>From Alex Rivera · Product</h4><p>The review can move to Thursday.</p></div>
        </div>
      </div>
      <div class="wn-detail" id="det">
        <div class="quote msg"><h3>From Finance team</h3><div class="meta">Today · 10:10 AM</div><p>Approved. Ops can be copied when you send it.</p></div>
        <div class="card draft" id="draft">
          <div class="draft-top"><span class="tag">Hermix draft</span><span class="np">Not posted yet</span></div>
          <div class="ta" id="ta"></div>
          <div class="dbtn"><span class="btn">Done editing</span><span class="btn post">Post</span></div>
        </div>
      </div>
    </div>`;
    const slack = at("#ap-slack"), fin = at("#fin", 0.4, 0.5), de = at("#draft .dbtn .btn", 0.5, 0.6);
    this.cam = [
      { t: 0, s: 1.03, x: 0, y: 20, o: 0 },
      { t: 0.6, s: 1.08, x: 0, y: 0, o: 1 },
      { t: 2.6, s: 1.08, x: 0, y: 0 },
      { t: 4.2, s: 1.26, x: -150, y: 10 },
      { t: 9, s: 1.3, x: -170, y: -20 },
    ];
    this.cur = [
      { t: 0, x: 1180, y: 380 },
      { t: 1.4, x: slack.x + 3, y: slack.y + 3 },
      { t: 2.1, x: fin.x, y: fin.y - 160 },
      { t: 2.8, x: fin.x, y: fin.y },
      { t: 4.0, x: fin.x + 300, y: fin.y + 250 },
      { t: 6.9, x: de.x + 60, y: de.y + 50 },
      { t: 7.8, x: de.x, y: de.y },
      { t: 9, x: de.x + 3, y: de.y + 2 },
    ];
  },
  render(t) {
    applyCamera(this.cam, t);
    rv(".pt", t, 0.3, 0.5, 8);
    rv("#apps", t, 0.45, 0.5, 8);
    const sw = prog(t, 1.55, 1.95);
    $("#ap-mail").classList.toggle("on", t < 1.6);
    $("#ap-slack").classList.toggle("on", t >= 1.6);
    $$("#g-mail .lrow").forEach((el, i) => { const k = eOut(prog(t, 0.55 + i * 0.12, 1.05 + i * 0.12)); el.style.opacity = k * (1 - sw); el.style.transform = `translateY(${(1 - k) * 12 - sw * 8}px)`; });
    $$("#g-slack .lrow").forEach((el, i) => rv(el, t, 1.75 + i * 0.1, 0.45, 12));
    $("#fin").classList.toggle("sel", t >= 2.85);
    rv("#det .msg", t, 3.0, 0.5, 16);
    rv("#draft", t, 3.6, 0.55, 16);
    $("#side-mascot").src = t > 3.6 && t < 6.4 ? "assets/thinking.png" : "assets/default.png";
    typeText("#ta", "Thanks — I’ll copy Ops when the board notes go out.", t, 4.3, 24);
    applyCursor(this.cur, [1.45, 2.85], t, [0.6, 99]);
  },
};

/* ============ 03 TASKS — action plan ============ */
SCENES.tasks = {
  duration: 9,
  html: () => STAGE(shell("tasks", { mascot: "organizing" })),
  setup() {
    const T = [
      ["Review the pull request in hermix/desktop", "From code", "Due today"],
      ["Send the Q3 board notes", "From Email", "Due today"],
      ["Reply to Finance", "From chat · Hermix found this", ""],
      ["Reply to Alex Rivera", "From chat · Hermix found this", ""],
      ["Respond on “Notes from the search beta”", "From code · Hermix found this", ""],
      ["Check: Docs follow-up timeline", "From code · Hermix found this", ""],
    ];
    $("#main").innerHTML = `
    <style>
      .tk-top{display:flex;justify-content:space-between;align-items:flex-start}
      .tk-top .btn{margin-top:46px;height:46px;background:#1a1a1a;color:#fff;border-color:#1a1a1a;margin-right:12px}
      .tk-cols{display:flex;gap:56px;margin-top:22px}
      .tk-list{width:400px;border-right:1px solid var(--b1);padding-right:22px;height:580px;overflow:hidden;position:relative}
      .tk-h{font-size:18px;font-weight:800;margin:6px 0 14px}
      .tk{position:relative;display:flex;gap:16px;padding:17px 18px;margin-bottom:14px;background:#fffdf9;border:1px solid var(--b1);border-radius:16px;box-shadow:0 2px 8px rgba(0,0,0,.03)}
      .tk.sel{background:#ebe5db;border-color:var(--b2)}
      .tk.sel::before{content:"";position:absolute;left:-1px;top:-1px;bottom:-1px;width:4px;border-radius:16px 0 0 16px;background:#1a1a1a}
      .ck{width:24px;height:24px;border-radius:50%;border:1.6px solid #8d877e;flex:none;margin-top:2px;display:flex;align-items:center;justify-content:center;position:relative}
      .ck .fill{position:absolute;inset:-1px;border-radius:50%;background:#2f6b45;opacity:0}
      .ck svg{position:relative;width:14px;height:14px;stroke:#fff;stroke-width:3;opacity:0}
      .tk h4{font-size:17px;font-weight:700;letter-spacing:-.01em;line-height:1.3;max-width:250px}
      .tk p{font-size:15px;color:var(--t2);margin-top:6px}
      .tk .due{position:absolute;right:18px;top:19px;font-size:15px;color:var(--t2)}
      .tk-det{flex:1;max-width:680px;position:relative}
      .tk-det h2{font-size:30px;font-weight:800;letter-spacing:-.03em}
      .tk-det .from{font-size:17px;color:var(--t2);margin-top:10px;font-weight:500}
      .brief{margin-top:26px;padding:22px 24px;position:relative}
      .brief .btn{position:absolute;right:22px;top:20px;height:44px}
      .brief p{font-size:18px;line-height:1.5;margin-top:16px}
      .brief p+p{margin-top:12px}
      .acts{display:flex;gap:14px;margin-top:30px}
      .acts .btn{height:50px;padding:0 22px;font-size:17px;border-radius:14px}
      .dpane{position:absolute;inset:0}
      .toast{position:absolute;left:50%;bottom:96px;transform:translateX(-50%);display:flex;align-items:center;gap:14px;padding:12px 14px 12px 18px;border-radius:14px;background:#1a1a1a;color:#fffdf8;font-size:15px;font-weight:600;box-shadow:0 14px 36px rgba(0,0,0,.25);opacity:0}
      .toast .u{display:flex;align-items:center;gap:6px;padding:6px 12px;border-radius:10px;background:rgba(255,255,255,.12)}
    </style>
    <div class="tk-top"><h1 class="pt">Tasks</h1><span class="btn">Add task</span></div>
    <div class="tk-cols">
      <div class="tk-list"><div class="tk-h" id="cnt">Today’s tasks · 11</div><div id="tks">
        ${T.map((x, i) => `<div class="tk" id="tk${i}"><span class="ck"><span class="fill"></span>${ico("check")}</span><div><h4>${x[0]}</h4><p>${x[1]}</p></div>${x[2] ? `<span class="due">${x[2]}</span>` : ""}</div>`).join("")}
      </div></div>
      <div class="tk-det">
        <div class="dpane" id="p0"><h2>Review the pull request in hermix/desktop</h2><div class="from">From code · Due today</div>
          <div class="card brief"><span class="tag">Hermix brief</span><span class="btn">Edit</span><p>Omar requested your review on PR #184.</p><p>Open What’s new and leave your review comments.</p></div>
          <div class="acts"><span class="btn dark">Open the thread</span><span class="btn">Delay</span><span class="btn">Cancel</span><span class="btn dark">Done</span></div></div>
        <div class="dpane" id="p1"><h2>Send the Q3 board notes</h2><div class="from">From Email · Due today</div>
          <div class="card brief"><span class="tag">Hermix brief</span><span class="btn">Edit</span><p>Finance already approved the Q3 board notes. You still need to send them and copy Ops.</p><p>Open Email, check the notes, then send them when you are ready.</p></div>
          <div class="acts"><span class="btn dark">Open Email</span><span class="btn">Delay</span><span class="btn">Cancel</span><span class="btn dark" id="done">Done</span></div></div>
        <div class="dpane" id="p2"><h2>Reply to Finance</h2><div class="from">From chat · Hermix found this</div>
          <div class="card brief"><span class="tag">Hermix brief</span><span class="btn">Edit</span><p>Finance approved the board notes and asked you to copy Ops.</p><p>Open What’s new, check the draft, then post it when you’re ready.</p></div>
          <div class="acts"><span class="btn dark">Open the thread</span><span class="btn">Delay</span><span class="btn">Cancel</span><span class="btn dark">Done</span></div></div>
      </div>
    </div>
    <div class="toast" id="toast">${ico("circle-check")}Moved to Finished<span class="u">${ico("undo-2")}Undo</span></div>`;
    const t1 = at("#tk1", 0.45, 0.5), dn = at("#done", 0.5, 0.55);
    this.cam = [
      { t: 0, s: 1.03, x: 0, y: 20, o: 0 },
      { t: 0.6, s: 1.08, x: 0, y: 0, o: 1 },
      { t: 2.0, s: 1.1, x: 20, y: 10 },
      { t: 4.2, s: 1.18, x: -60, y: 20 },
      { t: 9, s: 1.2, x: -70, y: 20 },
    ];
    this.cur = [
      { t: 0, x: 1100, y: 640 },
      { t: 1.9, x: t1.x + 60, y: t1.y + 40 },
      { t: 2.6, x: t1.x, y: t1.y },
      { t: 3.2, x: t1.x + 20, y: t1.y + 10 },
      { t: 4.7, x: dn.x, y: dn.y },
      { t: 6.0, x: dn.x + 10, y: dn.y + 8 },
      { t: 9, x: dn.x + 40, y: dn.y + 30 },
    ];
    this.rowH = $("#tk1").offsetHeight + 14;
  },
  render(t) {
    applyCamera(this.cam, t);
    rv(".pt", t, 0.3, 0.5, 8);
    rv(".tk-top .btn", t, 0.4, 0.5, 8);
    rv("#cnt", t, 0.5, 0.4, 8);
    const DONE = 5.0;
    const out = eIO(prog(t, DONE + 0.45, DONE + 0.95));
    for (let i = 0; i < 6; i++) {
      const el = $("#tk" + i);
      const k = eOut(prog(t, 0.6 + i * 0.13, 1.1 + i * 0.13));
      let dy = (1 - k) * 16, op = k, dx = 0;
      if (i === 1) { op *= 1 - out; dx = out * 40; }
      if (i > 1) dy -= out * this.rowH;
      el.style.opacity = op;
      el.style.transform = `translate(${dx}px,${dy}px)`;
      el.classList.toggle("sel", (i === 0 && t < 2.65) || (i === 1 && t >= 2.65) || (i === 2 && t >= DONE + 0.9));
    }
    const ck = eOut(prog(t, DONE, DONE + 0.3));
    $("#tk1 .fill").style.opacity = ck; $("#tk1 .ck svg").style.opacity = ck;
    $("#cnt").textContent = t >= DONE + 0.6 ? "Today’s tasks · 10" : "Today’s tasks · 11";
    // detail panes
    const a0 = eOut(prog(t, 1.0, 1.5)) * (1 - prog(t, 2.65, 2.85));
    const a1 = eOut(prog(t, 2.8, 3.25)) * (1 - prog(t, DONE + 0.7, DONE + 0.9));
    const a2 = eOut(prog(t, DONE + 0.9, DONE + 1.35));
    [[a0, "#p0"], [a1, "#p1"], [a2, "#p2"]].forEach(([a, s]) => { $(s).style.opacity = a; $(s).style.transform = `translateY(${(1 - a) * 10}px)`; });
    // done button press
    $("#done").style.transform = `scale(${1 - 0.05 * clamp(1 - Math.abs(t - DONE) / 0.12)})`;
    const ts = eOut(prog(t, DONE + 0.3, DONE + 0.7)) * (1 - eOut(prog(t, 8.2, 8.6)));
    $("#toast").style.opacity = ts;
    $("#toast").style.transform = `translate(-50%, ${(1 - ts) * 14}px)`;
    applyCursor(this.cur, [2.65, DONE], t, [0.8, 99]);
  },
};

/* ============ 04 EMAIL — inbox + draft ============ */
SCENES.email = {
  duration: 9,
  html: () => STAGE(shell("email", { mascot: "inbox" })),
  setup() {
    $("#main").innerHTML = `
    <style>
      .em-top{display:flex;justify-content:space-between;align-items:flex-start}
      .flt{display:flex;gap:10px;margin-top:46px;margin-right:12px;align-items:center}
      .flt span{height:42px;padding:0 18px;border-radius:999px;border:1px solid var(--b2);display:flex;align-items:center;font-size:15px;font-weight:600;background:#fffdf9}
      .flt span.on{background:#e7e1d7}
      .em-cols{display:flex;gap:48px;margin-top:30px}
      .em-list{width:340px;padding-right:20px;border-right:1px solid var(--b1);height:580px;position:relative;overflow:hidden}
      .em{position:relative;padding:18px 20px;margin-bottom:14px;border-radius:16px;border:1px solid var(--b1);background:#fffdf9}
      .em.sel{background:#ebe5db;border-color:var(--b2)}
      .em.sel::before{content:"";position:absolute;left:-1px;top:-1px;bottom:-1px;width:4px;border-radius:16px 0 0 16px;background:#1a1a1a}
      .em h4{font-size:17px;font-weight:700}
      .em .s{font-size:16px;margin-top:6px;line-height:1.35}
      .em .st{font-size:15px;color:var(--t2);margin-top:6px;display:flex;align-items:center;gap:8px}
      .em .when{position:absolute;right:18px;top:19px;font-size:15px;color:var(--t2)}
      .dotc{width:8px;height:8px;border-radius:50%;background:#9c8b72}
      .dotc.need{background:#9a3d3d}
      .dotc.fyi{background:#3d5a73}
      .em-det{flex:1;max-width:820px;position:relative}
      .em-pane{position:absolute;left:0;right:0;top:0}
      .em-msg{padding:26px 30px}
      .em-msg h3{font-size:20px;font-weight:800}
      .em-msg .meta{font-size:15px;color:var(--t2);font-weight:600;margin-top:8px}
      .em-msg h2{font-size:26px;font-weight:800;letter-spacing:-.02em;margin-top:14px}
      .em-msg p{font-size:17px;margin-top:12px}
      .em-pane > .btn{margin-top:26px;height:50px;padding:0 22px;font-size:16px;border-radius:14px}
      .em-draft{margin-top:22px;padding:22px 24px}
      .em-draft .head{display:flex;justify-content:space-between;align-items:center}
      .em-draft .to{font-size:14px;color:var(--t2);font-weight:600}
      .em-draft .body{margin-top:16px;font-size:18px;line-height:1.55;min-height:84px}
      .em-draft .row{display:flex;gap:12px;align-items:center;margin-top:18px}
      .em-draft .row .btn{height:46px}
      .em-draft .note{font-size:14px;color:var(--t2);margin-left:6px;display:flex;align-items:center;gap:6px}
    </style>
    <div class="em-top"><h1 class="pt">Email</h1><div class="flt" id="flt"><span class="on">Inbox</span><span>Needs reply</span><span>Drafts</span><span>FYI</span></div></div>
    <div class="em-cols">
      <div class="em-list">
        <div class="em sel" id="e0"><span class="when">10:55 AM</span><h4>From Lena Ortiz</h4><div class="s">Redlines on the vendor agreement</div><div class="st"><i class="dotc need"></i>Needs your reply</div></div>
        <div class="em" id="e1"><span class="when">10:42 AM</span><h4>From Maya Chen</h4><div class="s">Thursday sync</div><div class="st"><i class="dotc"></i>Draft ready — not sent</div></div>
        <div class="em" id="e2"><span class="when">10:05 AM</span><h4>From You</h4><div class="s">Security draft for the board</div><div class="st"><i class="dotc"></i>Your draft — not sent yet</div></div>
        <div class="em" id="e3"><span class="when">10:10 AM</span><h4>From Finance</h4><div class="s">Q3 board notes — approved to send</div><div class="st"><i class="dotc fyi"></i>For your information</div></div>
      </div>
      <div class="em-det">
        <div class="em-pane" id="pa">
          <div class="quote em-msg"><h3>From Lena Ortiz</h3><div class="meta">Today · Needs your reply</div><h2>Redlines on the vendor agreement</h2><p>Attached the latest redlines. Can you confirm retention language today?</p></div>
          <span class="btn dark">Show Hermix draft</span>
        </div>
        <div class="em-pane" id="pb">
          <div class="quote em-msg"><h3>From Maya Chen</h3><div class="meta">Today · 10:42 AM</div><h2>Thursday sync</h2><p>Can we move Thursday’s sync to 2:00? Happy to keep it short.</p></div>
          <span class="btn dark" id="show">Show Hermix draft</span>
          <div class="card em-draft" id="dr">
            <div class="head"><span class="tag">Hermix draft · for your review</span><span class="to">To Maya Chen · Not sent</span></div>
            <div class="body" id="body"></div>
            <div class="row"><span class="btn">Edit</span><span class="btn dark" id="send">Review &amp; send</span><span class="note">${ico("check")}Sample preview · nothing is sent</span></div>
          </div>
        </div>
      </div>
    </div>`;
    const e1 = at("#e1", 0.45, 0.5), sh = at("#show", 0.5, 0.55);
    $("#show").style.height = "0px"; $("#show").style.marginTop = "0px";
    const sd = at("#send", 0.5, 0.55);
    this.cam = [
      { t: 0, s: 1.03, x: 0, y: 20, o: 0 },
      { t: 0.6, s: 1.08, x: 0, y: 0, o: 1 },
      { t: 2.4, s: 1.1, x: 0, y: 0 },
      { t: 4.4, s: 1.24, x: -170, y: 30 },
      { t: 9, s: 1.26, x: -180, y: 20 },
    ];
    this.cur = [
      { t: 0, x: 1150, y: 640 },
      { t: 1.6, x: e1.x + 40, y: e1.y + 50 },
      { t: 2.2, x: e1.x, y: e1.y },
      { t: 3.0, x: sh.x, y: sh.y },
      { t: 3.7, x: sh.x + 6, y: sh.y + 3 },
      { t: 7.3, x: sd.x - 120, y: sd.y + 60 },
      { t: 8.2, x: sd.x, y: sd.y },
      { t: 9, x: sd.x + 2, y: sd.y + 1 },
    ];
  },
  render(t) {
    applyCamera(this.cam, t);
    rv(".pt", t, 0.3, 0.5, 8);
    rv("#flt", t, 0.4, 0.5, 8);
    for (let i = 0; i < 4; i++) rv("#e" + i, t, 0.55 + i * 0.12, 0.5, 14);
    $("#e0").classList.toggle("sel", t < 2.25);
    $("#e1").classList.toggle("sel", t >= 2.25);
    const a = eOut(prog(t, 1.0, 1.5)) * (1 - prog(t, 2.25, 2.45));
    $("#pa").style.opacity = a;
    const b = eOut(prog(t, 2.4, 2.85));
    $("#pb").style.opacity = b; $("#pb").style.transform = `translateY(${(1 - b) * 10}px)`;
    const shown = prog(t, 3.25, 3.45);
    $("#show").style.opacity = 1 - shown;
    $("#show").style.height = lerp(50, 0, eOut(shown)) + "px";
    $("#show").style.marginTop = lerp(26, 0, eOut(shown)) + "px";
    rv("#dr", t, 3.35, 0.55, 16);
    typeText("#body", "Hi Maya — 2:00 on Thursday works for me. I’ll update the invite once you confirm the room. Thanks!", t, 3.9, 30);
    applyCursor(this.cur, [2.25, 3.25], t, [0.7, 99]);
  },
};

/* ============ 05 MEETINGS — prep ============ */
SCENES.meetings = {
  duration: 9,
  html: () => STAGE(shell("meetings", { mascot: "meeting" })),
  setup() {
    $("#main").innerHTML = `
    <style>
      .mt-cols{display:flex;gap:48px;margin-top:22px}
      .mt-list{width:356px;padding-right:22px;border-right:1px solid var(--b1);height:600px}
      .mt{position:relative;padding:18px 20px;margin-bottom:14px;border-radius:16px;border:1px solid var(--b1);background:#fffdf9}
      .mt.sel{background:#ebe5db;border-color:var(--b2)}
      .mt.sel::before{content:"";position:absolute;left:-1px;top:-1px;bottom:-1px;width:4px;border-radius:16px 0 0 16px;background:#1a1a1a}
      .mt h4{font-size:17px;font-weight:700}
      .mt p{font-size:15px;color:var(--t2);margin-top:6px}
      .mt-det{flex:1;max-width:820px}
      .mq{padding:26px 30px}
      .mq h2{font-size:27px;font-weight:800;letter-spacing:-.025em}
      .mq .when{font-size:16px;color:var(--t2);font-weight:600;margin-top:8px}
      .ppl{display:flex;gap:10px;margin-top:16px;align-items:center}
      .av{width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#fff}
      .ppl .nm{font-size:16px;margin-left:4px}
      .mq p{font-size:17px;margin-top:14px}
      .prep{margin-top:22px;padding:22px 26px}
      .prep ul{margin:18px 0 0 22px}
      .prep li{font-size:17px;line-height:1.5;margin-top:6px}
      .prep li b{font-weight:700}
      .prep .lim{font-size:14px;color:var(--t2);font-weight:600;margin-top:18px;line-height:1.45;display:flex;gap:8px}
      .prep .src{display:flex;gap:8px;margin-top:16px}
      .prep .src span{display:inline-flex;gap:6px;align-items:center;height:28px;padding:0 10px;border-radius:8px;background:#f1ece3;font-size:13px;font-weight:600;color:var(--t2)}
      .prep .src svg{width:14px;height:14px}
      .mbtn{display:flex;gap:12px;margin-top:24px;align-items:center}
      .after{margin-top:26px;padding:18px 20px;border-radius:16px;border:1.5px dashed var(--b2);background:transparent}
      .after .tag{display:inline-block}
      .after h4{font-size:17px;font-weight:700;margin-top:12px}
      .after p{font-size:15px;color:var(--t2);margin-top:6px;line-height:1.45}
      .mbtn .btn{height:50px;padding:0 22px;font-size:16px;border-radius:14px}
      .saved{display:inline-flex;align-items:center;gap:8px;font-size:15px;font-weight:600;color:#2f6b45}
    </style>
    <h1 class="pt">Meetings</h1>
    <div class="mt-cols">
      <div class="mt-list">
        <div class="mt sel" id="m0"><h4>Product roadmap planning</h4><p>Today · 11:00–12:30 · Dana, Omar, Priya</p></div>
        <div class="mt" id="m1"><h4>Maya sync (proposed)</h4><p>Thu · 14:00 · Maya Chen</p></div>
        <div class="mt" id="m2"><h4>Focus block</h4><p>Today · after 13:30</p></div>
        <div class="after" id="after"><span class="tag">Planned · not in this preview</span><h4>After the meeting</h4><p>Hermix is being built to turn meeting records into a summary, decisions, and follow-ups.</p></div>
      </div>
      <div class="mt-det">
        <div class="quote mq" id="mq"><h2>Product roadmap planning</h2><div class="when">Today · 11:00–12:30</div>
          <div class="ppl"><span class="av" style="background:#6e6254">D</span><span class="av" style="background:#3d5a73">O</span><span class="av" style="background:#7a5a4a">P</span><span class="nm">Dana, Omar, Priya</span></div>
          <p>No time change. Last decision was to ship the search beta.</p></div>
        <div class="card prep" id="prep"><span class="tag">Hermix prep</span>
          <ul><li class="b"><b>Decided:</b> ship the search beta.</li><li class="b"><b>Still open:</b> timeline for the Docs follow-up.</li><li class="b"><b>Bring:</b> a pass on the security draft if you want board alignment.</li></ul>
          <div class="src" id="src"><span>${ico("calendar")}Calendar</span><span>${ico("mail")}Email</span><span>${ico("git-pull-request")}Code</span></div>
          <div class="lim" id="lim">Hermix can’t join live meetings yet. Prep and briefs are saved on this device.</div>
        </div>
        <div class="mbtn" id="mbtn"><span class="btn dark" id="cb">Create brief</span><span class="btn">Ask Hermix</span><span class="btn">Related email</span><span class="saved" id="saved">${ico("circle-check")}Brief saved on this device</span></div>
      </div>
    </div>`;
    const cb = at("#cb", 0.5, 0.55);
    this.cam = [
      { t: 0, s: 1.03, x: 0, y: 20, o: 0 },
      { t: 0.6, s: 1.08, x: 0, y: 0, o: 1 },
      { t: 2.2, s: 1.1, x: 0, y: 0 },
      { t: 4.2, s: 1.2, x: -160, y: -10 },
      { t: 6.0, s: 1.22, x: -170, y: -60 },
      { t: 9, s: 1.23, x: -175, y: -64 },
    ];
    this.cur = [
      { t: 0, x: 1200, y: 300 },
      { t: 5.0, x: cb.x + 160, y: cb.y + 120 },
      { t: 6.0, x: cb.x, y: cb.y },
      { t: 9, x: cb.x + 4, y: cb.y + 3 },
    ];
  },
  render(t) {
    applyCamera(this.cam, t);
    rv(".pt", t, 0.3, 0.5, 8);
    for (let i = 0; i < 3; i++) rv("#m" + i, t, 0.55 + i * 0.12, 0.5, 14);
    rv("#mq", t, 1.1, 0.55, 16);
    $$("#mq .av").forEach((el, i) => { const k = eBack(prog(t, 1.6 + i * 0.1, 2.0 + i * 0.1)); el.style.transform = `scale(${k})`; el.style.opacity = clamp(k); });
    rv("#prep", t, 2.2, 0.55, 16);
    $$("#prep .b").forEach((el, i) => rv(el, t, 2.7 + i * 0.5, 0.45, 8));
    rv("#src", t, 4.3, 0.4, 6);
    rv("#lim", t, 4.5, 0.4, 6);
    rv("#mbtn", t, 4.7, 0.45, 8);
    rv("#after", t, 7.0, 0.5, 10);
    const CL = 6.15;
    $("#cb").textContent = t >= CL + 0.1 ? "Refresh brief" : "Create brief";
    $("#cb").style.transform = `scale(${1 - 0.05 * clamp(1 - Math.abs(t - CL) / 0.12)})`;
    const s = eOut(prog(t, CL + 0.2, CL + 0.6));
    $("#saved").style.opacity = s; $("#saved").style.transform = `translateX(${(1 - s) * -10}px)`;
    applyCursor(this.cur, [CL], t, [4.6, 99]);
  },
};

/* ============ 06 ASK HERMIX — chat ============ */
SCENES.ask = {
  duration: 10,
  html: () => STAGE(shell("ask", { dock: false })),
  setup() {
    $("#main").innerHTML = `
    <style>
      .ak{width:740px;margin:0 auto;position:relative;height:760px}
      .ak-hero{position:absolute;left:0;right:0;top:56px;text-align:center}
      .ak-hero .m{width:150px;height:150px;margin:0 auto;position:relative}
      .ak-hero .m img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain}
      .ak-hero h2{font-size:54px;font-weight:800;letter-spacing:-.045em;margin-top:10px}
      .ak-box{position:absolute;left:70px;right:70px;top:340px;height:140px;border:1.6px solid #1a1a1a;border-radius:20px;background:#fffdf9;padding:20px 22px;font-size:19px;color:var(--t1)}
      .ak-box .ph{color:#8f8a83}
      .ak-box .btn{position:absolute;right:14px;bottom:14px;height:44px}
      .sugg{position:absolute;left:80px;right:80px;top:510px}
      .sugg div{display:flex;justify-content:space-between;align-items:center;height:50px;font-size:19px;font-weight:600}
      .sugg svg{width:18px;height:18px;stroke:#555}
      .thread{position:absolute;left:30px;right:30px;top:40px}
      .me{margin-left:auto;width:max-content;max-width:420px;padding:14px 20px;border-radius:20px 20px 6px 20px;background:#1a1a1a;color:#fffdf8;font-size:18px;font-weight:600}
      .hx{display:flex;gap:16px;margin-top:28px;align-items:flex-start}
      .hx .av{width:64px;height:64px;flex:none;position:relative}
      .hx .av img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain}
      .hx .bub{flex:1;padding:20px 24px;border-radius:6px 22px 22px 22px;background:#fffdf9;border:1px solid var(--b1);box-shadow:0 10px 28px rgba(26,26,26,.06);font-size:18px;line-height:1.55;min-height:66px}
      .dots{display:flex;gap:6px;padding:6px 0}
      .dots i{width:9px;height:9px;border-radius:50%;background:#9c8b72}
      .acts2{display:flex;flex-wrap:wrap;gap:10px;margin:18px 0 0 74px}
      .acts2 .btn{height:44px}
      .conf{margin:22px 0 0 74px;display:flex;align-items:center;gap:10px;font-size:16px;font-weight:600;color:#2f6b45}
      .ak-dock{position:absolute;left:30px;right:30px;bottom:30px;height:56px;border-radius:18px;background:#fffdf9;border:1px solid var(--b1);display:flex;align-items:center;padding:0 10px 0 20px;font-size:17px;color:var(--t3)}
      .ak-dock .go{margin-left:auto;width:36px;height:36px;border-radius:50%;border:1px solid var(--b2);display:flex;align-items:center;justify-content:center}
      .ak-dock svg{width:16px;height:16px;stroke:#444}
    </style>
    <div class="ak">
      <div id="intro">
        <div class="ak-hero"><div class="m"><img id="hm" src="assets/default.png" alt=""></div><h2>Good morning.</h2></div>
        <div class="ak-box"><span id="typed"></span><span class="btn">Submit</span></div>
        <div class="sugg" id="sugg">
          <div>What changed in my apps?${ico("chevron-right")}</div>
          <div>Help me prepare for my next meeting.${ico("chevron-right")}</div>
          <div id="sq">What emails need a reply?${ico("chevron-right")}</div>
          <div>What should I remember today?${ico("chevron-right")}</div>
        </div>
      </div>
      <div class="thread" id="thread">
        <div class="me" id="me">What emails need a reply?</div>
        <div class="hx" id="hx"><div class="av"><img id="av1" src="assets/thinking.png" alt=""><img id="av2" src="assets/inbox.png" alt=""></div><div class="bub"><div class="dots" id="dots"><i></i><i></i><i></i></div><span id="reply"></span></div></div>
        <div class="acts2" id="acts"><span class="btn">${ico("mail")}Open Maya’s email</span><span class="btn">${ico("file-text")}Open security draft</span><span class="btn dark" id="rem">${ico("bell")}Remind me tomorrow</span></div>
        <div class="conf" id="conf">${ico("circle-check")}Okay. I’ll remind you tomorrow: finish Maya’s reply and the security draft.</div>
      </div>
      <div class="ak-dock" id="akd">Ask Hermix anything…<span class="go">${ico("arrow-up")}</span></div>
    </div>`;
    const sq = at("#sq", 0.25, 0.5);
    // reminder button position (thread is laid out in final position)
    $("#reply").textContent = "Two things need you in Email. Maya asked to move Thursday’s sync to 2:00 — I drafted a reply. Your security draft for the board is still waiting on your pass and has not been sent.";
    $("#dots").style.display = "none";
    const rem = at("#rem", 0.5, 0.55);
    this.cam = [
      { t: 0, s: 1.03, x: 0, y: 20, o: 0 },
      { t: 0.6, s: 1.08, x: 0, y: 0, o: 1 },
      { t: 3.0, s: 1.1, x: 0, y: 0 },
      { t: 4.2, s: 1.22, x: -110, y: 60 },
      { t: 10, s: 1.24, x: -112, y: 50 },
    ];
    this.cur = [
      { t: 0, x: 1100, y: 700 },
      { t: 1.4, x: sq.x, y: sq.y },
      { t: 2.0, x: sq.x + 6, y: sq.y + 4 },
      { t: 7.2, x: rem.x + 100, y: rem.y + 120 },
      { t: 8.2, x: rem.x, y: rem.y },
      { t: 10, x: rem.x + 3, y: rem.y + 2 },
    ];
  },
  render(t) {
    applyCamera(this.cam, t);
    const ASK = "What emails need a reply?";
    const flap = Math.sin(t * 2.4) * 4;
    $("#hm").style.transform = `translateY(${flap}px)`;
    rv(".ak-hero", t, 0.3, 0.6, 12);
    rv(".ak-box", t, 0.55, 0.5, 12);
    $$("#sugg div").forEach((el, i) => rv(el, t, 0.75 + i * 0.1, 0.45, 8));
    $("#sq").style.color = t > 1.35 && t < 2.4 ? "#000" : "";
    $("#sq").style.textDecoration = t > 1.35 && t < 2.4 ? "underline" : "none";
    $("#hm").src = t > 1.7 ? "assets/thinking.png" : "assets/default.png";
    // typed into box
    if (t < 1.7) $("#typed").innerHTML = '<span class="ph">What would you like me to handle?</span>';
    else typeText("#typed", ASK, t, 1.7, 40);
    const leave = eIO(prog(t, 2.6, 3.0));
    $("#intro").style.opacity = 1 - leave;
    $("#intro").style.transform = `translateY(${-leave * 30}px)`;
    // thread
    rv("#me", t, 2.85, 0.45, 18);
    rv("#hx", t, 3.2, 0.45, 14);
    const thinking = t < 4.6;
    $("#dots").style.display = thinking ? "flex" : "none";
    $$("#dots i").forEach((d, i) => (d.style.opacity = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * 8 - i * 0.9))));
    const sw = prog(t, 4.5, 4.8);
    $("#av1").style.opacity = 1 - sw; $("#av2").style.opacity = sw;
    if (!thinking) typeText("#reply", "Two things need you in Email. Maya asked to move Thursday’s sync to 2:00 — I drafted a reply. Your security draft for the board is still waiting on your pass and has not been sent.", t, 4.6, 52, false);
    else $("#reply").textContent = "";
    $$("#acts .btn").forEach((el, i) => rv(el, t, 6.7 + i * 0.12, 0.4, 8));
    const CL = 8.35;
    $("#rem").style.transform = `scale(${1 - 0.05 * clamp(1 - Math.abs(t - CL) / 0.12)})`;
    rv("#conf", t, CL + 0.2, 0.45, 8);
    if (t > CL + 0.2) $("#av2").src = "assets/success.png"; else $("#av2").src = "assets/inbox.png";
    fade("#akd", t, 2.9, 0.5);
    applyCursor(this.cur, [1.45, CL], t, [0.7, 99]);
  },
};
