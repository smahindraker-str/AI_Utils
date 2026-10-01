#!/usr/bin/env python3
"""Generate the 16 scene sub-compositions and index.html from one source.

Scene cuts are snapped to the phrase grid of assets/audio/aylex-rush.mp3
(7 s phrases starting at 0.4 s, breakdown 56.4 to 66.4 s, fade from ~141 s).
Run from the project root:  python3 scripts/build_scenes.py
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

# id, file, duration, transition in ("cut" | "push"), exit ("push" | "fade")
SCENES = [
    ("s01", "01-open", 7.4, "cut", "push"),
    ("s02", "02-starting-point", 7.0, "push", "push"),
    ("s03", "03-two-layers", 7.0, "push", "fade"),
    ("s04", "04-before", 12.0, "cut", "fade"),
    ("s05", "05-after", 9.0, "cut", "push"),
    ("s06", "06-em-retail-tech", 7.0, "push", "push"),
    ("s07", "07-em-networking", 7.0, "push", "push"),
    ("s08", "08-sm-store-leaders", 10.0, "push", "push"),
    ("s09", "09-sm-educators", 7.0, "push", "push"),
    ("s10", "10-sm-servicenow", 11.0, "push", "push"),
    ("s11", "11-sm-audit", 7.0, "push", "push"),
    ("s12", "12-sm-pci", 9.0, "push", "push"),
    ("s13", "13-em-security", 8.0, "push", "fade"),
    ("s14", "14-outcomes", 13.9, "cut", "push"),
    ("s15", "15-takeaways", 19.1, "push", "fade"),
    ("s16", "16-close", 10.0, "cut", "none"),
]

GREEN, GREY, RED = "#30d158", "#48484c", "#ff453a"


def ring(cls, color, broken=False, size=30):
    dash = ' stroke-dasharray="40 100"' if broken else ""
    return (f'<svg class="ring {cls}" viewBox="0 0 36 36" style="width:{size}px;height:{size}px">'
            f'<circle cx="18" cy="18" r="15" fill="none" stroke="{color}" stroke-width="3"{dash}/></svg>')


def kicker(text, ring_color=GREEN, broken=False, extra=""):
    r = ring("k-ring", ring_color, broken) if ring_color else ""
    return f'<div class="k {extra}">{r}<span class="k-t">{text}</span></div>'


SHARED_CSS = """
#ID-root { position: absolute; inset: 0; overflow: hidden; background: #0b0b0d; color: #f5f5f7;
  font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased; }
#ID-root .stage { position: absolute; inset: 0; }
#ID-root .ghost { position: absolute; width: 1300px; height: 1300px; right: -420px; top: -110px; opacity: 0.05; }
#ID-root .k { position: absolute; left: 130px; top: 112px; display: flex; align-items: center; gap: 16px;
  font: 400 22px/1 'JetBrains Mono', monospace; letter-spacing: 0.16em; text-transform: uppercase; color: #8e8e93; }
#ID-root .k.lc { text-transform: none; letter-spacing: 0.04em; }
#ID-root .h { font-weight: 900; letter-spacing: -0.045em; line-height: 1.02; }
#ID-root .xl { font-size: 134px; }
#ID-root .lg { font-size: 88px; }
#ID-root .md { font-size: 69px; }
#ID-root .b { font-size: 30px; line-height: 1.4; color: #8e8e93; font-weight: 400; }
#ID-root .b strong { color: #f5f5f7; font-weight: 700; }
#ID-root .w { display: inline-block; overflow: hidden; vertical-align: top; padding-bottom: 0.08em; margin-bottom: -0.08em; }
#ID-root .wi { display: inline-block; }
#ID-root .chip { display: inline-block; font: 400 20px/1 'JetBrains Mono', monospace; letter-spacing: 0.08em;
  text-transform: uppercase; border: 1px solid #3a3a3e; color: #f5f5f7; border-radius: 99px; padding: 12px 20px; }
#ID-root .ipad { position: absolute; background: #000; border-radius: 44px; padding: 17px; border: 3px solid #3a3a3e;
  box-shadow: 0 40px 96px rgba(0,0,0,0.6); }
#ID-root .ipad img { display: block; width: 100%; border-radius: 27px; }
#ID-root .win { position: absolute; background: #fff; border-radius: 27px; overflow: hidden; box-shadow: 0 40px 96px rgba(0,0,0,0.6); }
#ID-root .win img { display: block; width: 100%; }
#ID-root .card { position: absolute; background: #1c1c1e; border-radius: 31px; }
"""

# Shared JS helpers. Each scene runs in its own IIFE so names never collide in the assembled page.
SHARED_JS = """
  const R = document.getElementById('ID-root');
  const $ = (s) => R.querySelector(s);
  const $$ = (s) => Array.from(R.querySelectorAll(s));
  // Wrap each word of .split elements in a mask so it can rise into view.
  $$('.split').forEach((el) => {
    el.innerHTML = el.textContent.trim().split(/\\s+/)
      .map((w) => '<span class="w" data-layout-allow-overflow><span class="wi">' + w + '</span></span>').join(' ');
  });
  // Per-character spans for typed kickers.
  $$('.type').forEach((el) => {
    el.innerHTML = Array.from(el.textContent).map((c) => '<span class="c">' + (c === ' ' ? '&nbsp;' : c) + '</span>').join('');
  });
  const tl = gsap.timeline({ paused: true });
  const D = DUR;
  const rise = (sel, at, stagger = 0.06, dur = 0.7) =>
    tl.fromTo(R.querySelectorAll(sel + ' .wi'), { yPercent: 110 }, { yPercent: 0, duration: dur, ease: 'power3.out', stagger }, at);
  const fadeUp = (sel, at, y = 28, dur = 0.6) =>
    tl.fromTo(sel, { opacity: 0, y }, { opacity: 1, y: 0, duration: dur, ease: 'power3.out' }, at);
  const typeIn = (sel, at, per = 0.035) =>
    tl.fromTo(R.querySelectorAll(sel + ' .c'), { opacity: 0 }, { opacity: 1, duration: 0.01, stagger: per }, at);
  // Ambient: the ghost status ring turns slowly for the whole scene.
  if ($('.ghost')) tl.fromTo('#ID-root .ghost', { rotation: -8 }, { rotation: 14, duration: D, ease: 'none' }, 0);
  // Seams: push enters from the right; exits leave to the left or fade through black.
  PUSH_IN
"""

EXIT_JS = """
  SEAM_OUT
  window.__timelines['ID'] = tl;
"""

GHOST = ('<svg class="ghost" viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="none" stroke="#f5f5f7" '
         'stroke-width="0.5" stroke-dasharray="210 80"/></svg>')

# ---------------------------------------------------------------------------
# Scene bodies: (markup, css, js). Times are scene-local seconds.
# ---------------------------------------------------------------------------
S = {}

S["s01"] = (f"""
  <div class="k"><span class="type">Retail runs on iOS</span></div>
  <div class="h xl split" id="s01-title" style="position:absolute;left:130px;top:360px;width:1400px">Modernizing Retail Mobility.</div>
  <div class="b" id="s01-name" style="position:absolute;left:134px;top:680px;font-size:44px">Matin, Lululemon.</div>
  <img id="s01-logo" src="assets/deck/ienterprise-logo.png" alt="" style="position:absolute;right:130px;bottom:110px;width:300px">
""", "", """
  typeIn('.k', 0.2, 0.05);
  rise('#s01-title', 1.3, 0.12, 0.9);
  fadeUp('#s01-name', 2.8);
  tl.fromTo('#s01-logo', { opacity: 0 }, { opacity: 0.9, duration: 1.0, ease: 'power1.out' }, 3.6);
""")

S["s02"] = (f"""
  {kicker('The starting point', GREY, True)}
  <div class="h md split" id="s02-l1" style="position:absolute;left:130px;top:330px;width:1600px">We replaced an aging MDM platform.</div>
  <div class="h xl split" id="s02-l2" style="position:absolute;left:130px;top:470px;width:1500px">What changed was much bigger.</div>
""", "", """
  fadeUp('#s02-root .k', 0.3, 12);
  rise('#s02-l1', 0.6, 0.07);
  tl.to('#s02-l1', { color: '#48484c', duration: 0.6, ease: 'power1.inOut' }, 3.3);
  rise('#s02-l2', 3.5, 0.09, 0.8);
  tl.fromTo('#s02-l2', { scale: 0.97, transformOrigin: '0% 50%' }, { scale: 1, duration: 1.6, ease: 'power2.out' }, 3.5);
""")

S["s03"] = ("""
  <div class="h md split" id="s03-title" style="position:absolute;left:130px;top:112px;width:1600px">Two layers, two jobs.</div>
  <div class="slab" id="s03-top" style="top:300px;background:#f5f5f7;color:#1d1d1f">
    <div class="sk" style="color:#6e6e73">ienterprise</div>
    <div class="st">Builds on that and manages operations.</div>
  </div>
  <svg id="s03-arrow" viewBox="0 0 20 40" style="position:absolute;left:940px;top:548px;width:40px;height:80px">
    <path d="M10 38 V4 M3 11 L10 3 L17 11" stroke="#8e8e93" stroke-width="2" fill="none" stroke-dasharray="60" stroke-dashoffset="60"/></svg>
  <div class="slab" id="s03-mdm" style="top:650px;background:#1c1c1e;border:1px solid #2c2c30">
    <div class="sk">MDM</div>
    <div class="st">Manages the devices. <span style="color:#8e8e93">Reliably.</span></div>
  </div>
""", """
#s03-root .slab { position: absolute; left: 130px; right: 130px; height: 230px; border-radius: 31px; padding: 44px 52px; }
#s03-root .sk { font: 400 22px/1 'JetBrains Mono', monospace; letter-spacing: 0.04em; color: #8e8e93; }
#s03-root .st { font-weight: 800; font-size: 52px; letter-spacing: -0.03em; margin-top: 26px; }
""", """
  rise('#s03-title', 0.2, 0.07);
  fadeUp('#s03-mdm', 0.9, 90, 0.9);
  tl.to('#s03-arrow path', { strokeDashoffset: 0, duration: 0.6, ease: 'power2.inOut' }, 2.1);
  tl.fromTo('#s03-top', { opacity: 0, y: -70 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 2.7);
""")

pains = [
    "Educators could not see if a device was healthy.",
    "Every issue went to the Educator Help Center.",
    "Every fix needed access to an MDM console.",
    "Troubleshooting took too long, with back-and-forth between stores and the Educator Help Center before an incident was resolved.",
]
pain_html = "".join(
    f'<div class="pain" id="s04-p{i}">{ring("", GREY, True, 34)}<span>{t}</span></div>' for i, t in enumerate(pains))
S["s04"] = (f"""
  {kicker('The problem', None)}
  <div class="h md split" id="s04-title" style="position:absolute;left:130px;top:160px;width:1600px">Before ienterprise.</div>
  <div id="s04-list" style="position:absolute;left:130px;top:300px;width:1180px;display:grid;gap:30px">{pain_html}</div>
  <div style="position:absolute;left:130px;bottom:120px;display:flex;align-items:center;gap:32px">
    <div class="pill" id="s04-pill1">One educator, waiting.</div>
    <div id="s04-arrow" style="font-size:44px;color:#8e8e93">&rarr;</div>
    <div class="pill" id="s04-pill2" style="border-color:{RED};color:#f5f5f7;font-weight:800">One guest, waiting.</div>
  </div>
""", """
#s04-root .pain { display: flex; gap: 24px; align-items: flex-start; font-size: 34px; line-height: 1.32; color: #f5f5f7; }
#s04-root .pain svg { flex: none; margin-top: 4px; }
#s04-root .pill { font-weight: 700; font-size: 44px; border: 2px solid #3a3a3e; border-radius: 99px; padding: 20px 40px; color: #8e8e93; }
""", """
  fadeUp('#s04-root .k', 0.1, 12);
  rise('#s04-title', 0.3, 0.08);
  [1.3, 2.7, 4.1, 5.5].forEach((t, i) => tl.fromTo('#s04-p' + i, { opacity: 0, x: -36 }, { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }, t));
  tl.to('#s04-list', { opacity: 0.32, duration: 0.8, ease: 'power1.inOut' }, 7.4);
  fadeUp('#s04-pill1', 7.7, 20);
  tl.fromTo('#s04-arrow', { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }, 8.6);
  tl.fromTo('#s04-pill2', { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.6)' }, 9.0);
""")

S["s05"] = (f"""
  <div class="k" id="s05-k"><span style="width:30px;height:30px;display:inline-block"></span><span class="k-t">The answer</span></div>
  <svg id="s05-big" viewBox="0 0 36 36" style="position:absolute;left:840px;top:420px;width:240px;height:240px">
    <circle id="s05-c" cx="18" cy="18" r="15" fill="none" stroke="{GREY}" stroke-width="2.4" stroke-dasharray="94.25" stroke-dashoffset="56"/></svg>
  <div class="h md split" id="s05-title" style="position:absolute;left:130px;top:160px;width:1600px">After ienterprise.</div>
  <div class="card role" id="s05-c1" style="left:130px">
    <div class="rk">Enterprise Manager</div>
    <div class="rt">One view across every store and every device.</div>
    <div class="b" style="font-size:26px;margin-top:28px">For the people who run the fleet.</div>
  </div>
  <div class="card role" id="s05-c2" style="left:980px">
    <div class="rk">Site Manager</div>
    <div class="rt">Every device in the store, and whether it is healthy.</div>
    <div class="b" style="font-size:26px;margin-top:28px">For the people who run the store.</div>
  </div>
""", """
#s05-root .role { top: 384px; width: 810px; height: 520px; padding: 50px; }
#s05-root .rk { font: 400 22px/1 'JetBrains Mono', monospace; letter-spacing: 0.16em; text-transform: uppercase; color: #8e8e93; }
#s05-root .rt { font-weight: 800; font-size: 48px; line-height: 1.1; letter-spacing: -0.03em; margin-top: 30px; }
""", f"""
  tl.to('#s05-c', {{ strokeDashoffset: 0, stroke: '{GREEN}', duration: 1.0, ease: 'expo.out' }}, 0.4);
  tl.to('#s05-big', {{ x: -710, y: -308, scale: 0.125, transformOrigin: '0% 0%', duration: 0.9, ease: 'power3.inOut' }}, 1.6);
  tl.fromTo('#s05-k .k-t', {{ opacity: 0, x: -10 }}, {{ opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }}, 2.3);
  rise('#s05-title', 2.4, 0.08);
  fadeUp('#s05-c1', 3.2, 70, 0.8);
  fadeUp('#s05-c2', 3.6, 70, 0.8);
""")


def proof(sid, kick, head, head_style, extra_html, extra_css, js):
    return (f"""
  {GHOST}
  <div class="stage">
  {kicker(kick)}
  <div class="h md split" id="{sid}-head" style="position:absolute;{head_style}">{head}</div>
  {extra_html}
  </div>
""", extra_css, js)


S["s06"] = proof("s06", "Enterprise Manager · Retail technology", "One view across every store and every device.",
                 "left:130px;top:300px;width:640px", """
  <div class="win" id="s06-win" style="left:830px;top:240px;width:1190px">
    <img id="s06-img" src="assets/deck/image4.png" alt=""></div>
""", "", """
  rise('#s06-head', 0.3, 0.06);
  tl.fromTo('#s06-win', { x: 320, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }, 0.5);
  tl.fromTo('#s06-img', { scale: 1 }, { scale: 1.32, transformOrigin: '8% 12%', duration: 5.2, ease: 'power1.inOut' }, 1.4);
""")

S["s07"] = proof("s07", "Enterprise Manager · Networking", "All devices in the store and the network, correlated.",
                 "left:130px;top:250px;width:640px", """
  <div class="b" id="s07-sub" style="position:absolute;left:132px;top:640px;width:560px">The fleet, understood before the phone rings.</div>
  <div class="win" id="s07-win" style="left:830px;top:220px;width:1190px">
    <img id="s07-img" src="assets/deck/image5.png" alt=""></div>
""", "", """
  rise('#s07-head', 0.3, 0.06);
  tl.fromTo('#s07-win', { x: 320, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }, 0.5);
  tl.fromTo('#s07-img', { scale: 1.18, x: 40 }, { scale: 1.3, x: -120, transformOrigin: '30% 45%', duration: 6.0, ease: 'power1.inOut' }, 0.8);
  fadeUp('#s07-sub', 3.0);
""")

S["s08"] = proof("s08", "Site Manager · Store leaders", "Is the store ready to open? One glance.",
                 "left:130px;top:280px;width:880px", """
  <div class="b" id="s08-body" style="position:absolute;left:132px;top:560px;width:720px">Every device in the store, and whether it is healthy. iPhones, iPads, payment devices, printers.</div>
  <div id="s08-ready" style="position:absolute;left:132px;top:760px;display:flex;align-items:center;gap:18px;font-weight:700;font-size:40px">
    <span id="s08-dot" style="width:22px;height:22px;border-radius:50%;background:#30d158;display:block"></span>Ready for business.</div>
  <div class="ipad" id="s08-ipad" style="right:150px;top:90px;width:600px"><img src="assets/deck/image6.png" alt=""></div>
""", "", """
  tl.fromTo('#s08-ipad', { y: 160, opacity: 0 }, { y: 0, opacity: 1, duration: 1.4, ease: 'power3.out' }, 0.3);
  tl.to('#s08-ipad', { y: -18, duration: 8.0, ease: 'none' }, 1.7);
  rise('#s08-head', 0.9, 0.09, 0.9);
  fadeUp('#s08-body', 3.0);
  tl.fromTo('#s08-ready', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' }, 5.4);
  tl.fromTo('#s08-dot', { scale: 0 }, { scale: 1, duration: 0.6, ease: 'back.out(2.2)' }, 5.5);
""")

S["s09"] = ("""
  """ + GHOST + f"""
  <div class="stage">
  <div class="ipad" id="s09-ipad" style="left:140px;top:90px;width:600px"><img src="assets/deck/image7.png" alt=""></div>
  <div class="k" style="left:900px">{ring('k-ring', GREEN)}<span class="k-t">Site Manager · Educators</span></div>
  <div class="h lg" id="s09-l1" style="position:absolute;left:900px;top:260px;width:960px">See the problem.</div>
  <div class="h lg" id="s09-l2" style="position:absolute;left:900px;top:360px;width:960px">Fix it on the spot.</div>
  <div id="s09-chips" style="position:absolute;left:900px;top:510px;display:flex;gap:14px">
    <span class="chip">Wi-Fi</span><span class="chip">Battery</span><span class="chip">OS</span></div>
  <div class="b" id="s09-body" style="position:absolute;left:902px;top:610px;width:820px">Guided steps, on the device. Resolved in the store. Fewer calls to the Educator Help Center, and better ones.</div>
  </div>
""", "", """
  tl.fromTo('#s09-ipad', { x: -260, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, 0.05);
  fadeUp('#s09-root .k', 0.3, 12);
  tl.fromTo('#s09-l1', { opacity: 0, scale: 1.12, transformOrigin: '0% 50%' }, { opacity: 1, scale: 1, duration: 0.35, ease: 'power3.out' }, 0.45);
  tl.fromTo('#s09-l2', { opacity: 0, scale: 1.12, transformOrigin: '0% 50%' }, { opacity: 1, scale: 1, duration: 0.35, ease: 'power3.out' }, 1.0);
  tl.fromTo('#s09-chips .chip', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out', stagger: 0.22 }, 1.7);
  fadeUp('#s09-body', 2.6);
""")

S["s10"] = proof("s10", "Site Manager · ServiceNow", "Incidents arrive with evidence.", "left:130px;top:170px;width:1400px", f"""
  <div id="s10-verbs" style="position:absolute;left:132px;top:270px;display:flex;gap:22px;font:400 24px/1 'JetBrains Mono',monospace;letter-spacing:.14em">
    <span>CREATE IT.</span><span>TRACK IT.</span><span>CLOSE IT.</span></div>
  <div class="ipad" id="s10-a" style="left:400px;top:370px;width:400px"><img src="assets/deck/image8.png" alt=""></div>
  <div class="ipad" id="s10-c" style="left:1080px;top:370px;width:400px"><img src="assets/deck/image10.png" alt=""></div>
  <div class="ipad" id="s10-b" style="left:740px;top:320px;width:400px"><img src="assets/deck/image9.png" alt=""></div>
  <div id="s10-tags" style="position:absolute;right:110px;top:380px;display:flex;flex-direction:column;align-items:flex-end;gap:14px">
    <span class="chip">battery</span><span class="chip">Wi-Fi</span><span class="chip">latency</span><span class="chip">OS</span><span class="chip">apps</span></div>
  <div id="s10-close" style="position:absolute;left:130px;top:830px;width:300px;font-weight:800;font-size:34px;line-height:1.15;letter-spacing:-.02em">Faster first-call resolution.</div>
""", "", """
  rise('#s10-head', 0.3, 0.06);
  tl.fromTo('#s10-verbs span', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out', stagger: 0.45 }, 1.0);
  tl.fromTo('#s10-b', { y: 260, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }, 2.2);
  tl.fromTo('#s10-a', { x: 340, y: 60, rotation: 0, opacity: 0 }, { x: 0, y: 0, rotation: -5, opacity: 1, duration: 0.9, ease: 'power3.out' }, 2.6);
  tl.fromTo('#s10-c', { x: -340, y: 60, rotation: 0, opacity: 0 }, { x: 0, y: 0, rotation: 5, opacity: 1, duration: 0.9, ease: 'power3.out' }, 2.9);
  tl.fromTo('#s10-tags .chip', { opacity: 0, x: 24 }, { opacity: 1, x: 0, duration: 0.4, ease: 'power3.out', stagger: 0.3 }, 4.4);
  fadeUp('#s10-close', 7.0);
""")

S["s11"] = ("""
  """ + GHOST + f"""
  <div class="stage">
  {kicker('Site Manager · Security')}
  <div class="h lg" id="s11-a" style="position:absolute;left:130px;top:230px">Device audit.</div>
  <div class="h lg" id="s11-b" style="position:absolute;left:130px;top:330px;color:#8e8e93">Daily.</div>
  <div class="h lg" id="s11-c" style="position:absolute;left:130px;top:430px">By the store.</div>
  <div class="b" id="s11-body" style="position:absolute;left:132px;top:610px;width:720px">Every device accounted for. Exceptions surfaced and resolved in the store. A report for every store, every day.</div>
  <div class="ipad" id="s11-i1" style="left:1000px;top:150px;width:430px"><img src="assets/deck/image11.png" alt=""></div>
  <div class="ipad" id="s11-i2" style="left:1320px;top:230px;width:430px"><img src="assets/deck/image12.png" alt=""></div>
  </div>
""", "", """
  fadeUp('#s11-root .k', 0.2, 12);
  [['#s11-a', 0.3], ['#s11-b', 1.0], ['#s11-c', 1.7]].forEach(([s, t]) =>
    tl.fromTo(s, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power3.out' }, t));
  tl.fromTo('#s11-i1', { x: 300, rotation: 0, opacity: 0 }, { x: 0, rotation: -3, opacity: 1, duration: 0.9, ease: 'power3.out' }, 2.2);
  tl.fromTo('#s11-i2', { x: 300, rotation: 0, opacity: 0 }, { x: 0, rotation: 3, opacity: 1, duration: 0.9, ease: 'power3.out' }, 2.6);
  fadeUp('#s11-body', 3.4);
""")

S["s12"] = proof("s12", "Site Manager · Payment and PCI", "Every PIN pad inspected. Every day.", "left:130px;top:170px;width:1600px", """
  <div class="ipad" id="s12-i1" style="left:140px;top:330px;width:400px"><img src="assets/deck/image13.png" alt=""></div>
  <div class="b" id="s12-t1" style="position:absolute;left:590px;top:520px;width:320px">Signed, timestamped, in the audit.</div>
  <div class="ipad" id="s12-i2" style="left:990px;top:330px;width:400px"><img src="assets/deck/image14.png" alt=""></div>
  <div class="b" id="s12-t2" style="position:absolute;left:1440px;top:500px;width:380px"><strong>Tampering found?</strong> One tap opens a security and PCI incident.</div>
""", "", f"""
  rise('#s12-head', 0.3, 0.06);
  tl.fromTo('#s12-i1', {{ y: 200, opacity: 0 }}, {{ y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }}, 0.9);
  fadeUp('#s12-t1', 1.8);
  tl.fromTo('#s12-i2', {{ x: 320, opacity: 0 }}, {{ x: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }}, 3.6);
  tl.to('#s12-i2', {{ borderColor: '{RED}', duration: 0.5, ease: 'power1.inOut' }}, 4.5);
  fadeUp('#s12-t2', 4.6);
""")

S["s13"] = proof("s13", "Enterprise Manager · Security and store support", "PIM and PAM requirements met. Support still enabled.",
                 "left:130px;top:220px;width:760px", """
  <div class="b" id="s13-a" style="position:absolute;left:132px;top:560px;width:720px;color:#f5f5f7">Least privilege for the platform.</div>
  <div class="b" id="s13-b" style="position:absolute;left:132px;top:610px;width:720px">Full capability for the store.</div>
  <div class="b" id="s13-c" style="position:absolute;left:132px;top:720px;width:720px"><strong>Smart Support:</strong> the fix before the escalation.</div>
  <div class="win" id="s13-win" style="left:960px;top:230px;width:960px"><img id="s13-img" src="assets/deck/image15.png" alt=""></div>
""", "", """
  rise('#s13-head', 0.3, 0.05);
  tl.fromTo('#s13-win', { x: 320, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }, 0.6);
  tl.fromTo('#s13-img', { scale: 1 }, { scale: 1.12, transformOrigin: '30% 20%', duration: 6.5, ease: 'power1.inOut' }, 1.2);
  fadeUp('#s13-a', 2.0, 20);
  tl.to('#s13-a', { color: '#8e8e93', duration: 0.5 }, 3.4);
  tl.fromTo('#s13-b', { opacity: 0, y: 20, color: '#f5f5f7' }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 3.4);
  fadeUp('#s13-c', 5.0, 20);
""")

outs = [
    ("01", "Stores open ready, every morning.", "Every store leader sees every device and knows the store is ready for business."),
    ("02", "Issues resolve faster.", "Incidents arrive with telemetry attached, so the help desk resolves them faster. Educators fix common issues on the spot."),
    ("03", "Compliance became routine.", "PIM and PAM requirements met. Device audits and PCI tamper inspections done by the store, every day."),
]
rows = "".join(f"""
    <div class="row" id="s14-r{i}"><div class="rule"></div>
      <div class="rn">{n}</div><div><div class="rt">{t}</div><div class="rs">{s}</div></div></div>""" for i, (n, t, s) in enumerate(outs))
S["s14"] = (f"""
  {GHOST}
  <div class="stage">
  <div class="k lc"><span class="k-t">ienterprise</span></div>
  <div class="h md split" id="s14-title" style="position:absolute;left:130px;top:160px;width:1600px">Business transformation at Lululemon.</div>
  <div id="s14-rows" style="position:absolute;left:130px;top:310px;width:1100px">{rows}</div>
  <div class="card" id="s14-card" style="right:130px;bottom:110px;width:560px;padding:44px">
    <div style="font-size:30px;line-height:1.35;color:#8e8e93">Retail mobile operations are now more efficient and effective.</div>
    <div id="s14-guest" style="font-weight:800;font-size:44px;line-height:1.1;letter-spacing:-.02em;margin-top:20px">Educators stayed with guests.</div>
  </div>
  </div>
""", """
#s14-root .row { position: relative; display: grid; grid-template-columns: 100px 1fr; padding: 30px 0; }
#s14-root .rule { position: absolute; left: 0; right: 0; top: 0; height: 1px; background: #2c2c30; }
#s14-root .rn { font: 400 22px/1.6 'JetBrains Mono', monospace; color: #8e8e93; }
#s14-root .rt { font-weight: 800; font-size: 44px; letter-spacing: -0.025em; }
#s14-root .rs { font-size: 26px; line-height: 1.4; color: #8e8e93; margin-top: 10px; max-width: 900px; }
""", """
  fadeUp('#s14-root .k', 0.1, 12);
  rise('#s14-title', 0.3, 0.06);
  [1.4, 3.9, 6.4].forEach((t, i) => {
    tl.fromTo('#s14-r' + i + ' .rule', { scaleX: 0, transformOrigin: '0% 50%' }, { scaleX: 1, duration: 0.8, ease: 'power2.inOut' }, t);
    tl.fromTo('#s14-r' + i + ' .rn, #s14-r' + i + ' .rt', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, t + 0.25);
    tl.fromTo('#s14-r' + i + ' .rs', { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power1.out' }, t + 0.7);
  });
  tl.to('#s14-rows', { opacity: 0.35, duration: 0.8, ease: 'power1.inOut' }, 9.1);
  fadeUp('#s14-card', 9.4, 60, 0.9);
  tl.fromTo('#s14-guest', { opacity: 0 }, { opacity: 1, duration: 0.6 }, 10.3);
""")

lessons = [
    ("Be clear about the problem before choosing the tools.", ""),
    ("Choose partners who understand the platform and the operating environment.", ""),
    ("Align priorities with internal teams early.", "Shared support is not shared urgency."),
    ("Use the pilot to find friction, and be ready to change the plan.", ""),
    ("Treat readiness as ongoing work, not the final step.", ""),
    ("Do not shift technology work to educators.", ""),
    ("Expect visibility to expose what the business case missed.", ""),
]
rail = "".join(f'<div class="rn" id="s15-n{i}">0{i + 1}</div>' for i in range(7))
lhtml = "".join(f"""<div class="lesson" id="s15-l{i}"><div class="lt">{t}</div>{f'<div class="ls">{s}</div>' if s else ''}</div>"""
                for i, (t, s) in enumerate(lessons))
S["s15"] = (f"""
  <div class="stage">
  {kicker('The takeaways', None)}
  <div class="h md split" id="s15-title" style="position:absolute;left:130px;top:160px;width:1600px">For other retailers.</div>
  <div id="s15-rail" style="position:absolute;left:134px;top:380px;display:grid;gap:22px">{rail}</div>
  <div style="position:absolute;left:400px;top:400px;width:1390px;height:520px">{lhtml}</div>
  </div>
""", """
#s15-root .rn { font: 400 26px/1 'JetBrains Mono', monospace; color: #48484c; letter-spacing: 0.08em; }
#s15-root .lesson { position: absolute; left: 0; top: 0; width: 100%; opacity: 0; }
#s15-root .lt { font-weight: 900; font-size: 84px; line-height: 1.04; letter-spacing: -0.04em; }
#s15-root .ls { font-size: 44px; color: #8e8e93; margin-top: 30px; }
""", """
  fadeUp('#s15-root .k', 0.1, 12);
  rise('#s15-title', 0.3, 0.07);
  tl.fromTo('#s15-rail .rn', { opacity: 0 }, { opacity: 1, duration: 0.4, stagger: 0.05 }, 0.7);
  const step = 2.5, first = 1.4;
  for (let i = 0; i < 7; i++) {
    const t = first + i * step;
    tl.fromTo('#s15-l' + i, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, t);
    tl.to('#s15-n' + i, { color: '#f5f5f7', duration: 0.25 }, t);
    if (i < 6) {
      tl.to('#s15-l' + i, { opacity: 0, y: -30, duration: 0.3, ease: 'power2.in' }, t + step - 0.3);
      tl.to('#s15-n' + i, { color: '#8e8e93', duration: 0.25 }, t + step - 0.1);
    }
  }
""")

S["s16"] = (f"""
  <div class="stage">
  <div class="h xl" id="s16-a" style="position:absolute;left:0;right:0;top:300px;text-align:center">Done for them.</div>
  <div class="h xl" id="s16-b" style="position:absolute;left:0;right:0;top:440px;text-align:center">Not to them.</div>
  <div class="b" id="s16-cap" style="position:absolute;left:0;right:0;top:640px;text-align:center;font-size:36px">Retail mobility, managed in every store.</div>
  <div id="s16-lock" style="position:absolute;left:0;right:0;top:770px;display:flex;justify-content:center;align-items:center;gap:30px">
    <svg viewBox="0 0 36 36" style="width:52px;height:52px"><circle id="s16-ring" cx="18" cy="18" r="15" fill="none" stroke="{GREEN}" stroke-width="3" stroke-dasharray="94.25" stroke-dashoffset="94.25"/></svg>
    <img id="s16-logo" src="assets/deck/ienterprise-logo.png" alt="" style="width:330px"></div>
  </div>
""", "", """
  tl.fromTo('#s16-a', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.4);
  tl.fromTo('#s16-b', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 1.4);
  fadeUp('#s16-cap', 3.6, 20, 0.9);
  tl.fromTo('#s16-logo', { opacity: 0 }, { opacity: 1, duration: 1.0, ease: 'power1.out' }, 4.4);
  tl.to('#s16-ring', { strokeDashoffset: 0, duration: 1.2, ease: 'expo.out' }, 4.8);
  tl.to('#s16-root .stage', { opacity: 0, duration: 1.0, ease: 'power1.in' }, 9.0);
""")


def wrap_stage(sid, markup):
    # Proof scenes already carry their own .stage; wrap the rest so seams have one target.
    if 'class="stage"' in markup:
        return markup
    return f'\n  <div class="stage">{markup}  </div>\n'


def build():
    (ROOT / "compositions").mkdir(exist_ok=True)
    t = 0.0
    slots = []
    for sid, name, dur, tin, tout in SCENES:
        markup, css, js = S[sid]
        markup = wrap_stage(sid, markup)
        push_in = ("tl.fromTo('#ID-root .stage', { x: 160, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, 0);"
                   if tin == "push" else "")
        seam_out = {"push": "tl.to('#ID-root .stage', { x: -160, opacity: 0, duration: 0.45, ease: 'power2.in' }, D - 0.45);",
                    "fade": "tl.to('#ID-root .stage', { opacity: 0, duration: 0.4, ease: 'power1.in' }, D - 0.4);"}.get(tout, "")
        shared_js = SHARED_JS.replace("PUSH_IN", push_in).replace("ID", sid).replace("DUR", str(dur))
        exit_js = EXIT_JS.replace("SEAM_OUT", seam_out).replace("ID", sid)
        html = f"""<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
  </head>
  <body>
    <template>
      <style>{SHARED_CSS.replace('ID', sid)}{css}</style>
      <div id="{sid}-root" data-composition-id="{sid}" data-width="1920" data-height="1080">{markup}</div>
      <script>
(() => {{{shared_js}{js}{exit_js}}})();
      </script>
    </template>
  </body>
</html>
"""
        (ROOT / "compositions" / f"{name}.html").write_text(html)
        slots.append(f'      <div id="el-{sid}" data-composition-id="{sid}" data-composition-src="compositions/{name}.html" '
                     f'data-start="{round(t, 2)}" data-duration="{dur}" data-track-index="1" data-width="1920" data-height="1080"></div>')
        t += dur
    total = round(t, 2)
    index = f"""<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1920, height=1080" />
    <script src="assets/vendor/gsap-3.14.2.min.js"></script>
    <style>
      * {{ margin: 0; padding: 0; box-sizing: border-box; }}
      html, body {{ margin: 0; width: 1920px; height: 1080px; overflow: hidden; background: #0b0b0d; }}
      #root {{ position: relative; width: 100%; height: 100%; overflow: hidden; background: #0b0b0d; }}
      [data-composition-id="main"] > div[data-composition-src] {{ position: absolute; inset: 0; }}
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="{total}" data-width="1920" data-height="1080">
{chr(10).join(slots)}
      <audio id="music" data-timeline-role="music" src="assets/audio/aylex-rush.mp3" data-start="0" data-duration="{total}" data-track-index="10" data-volume="0.8"></audio>
    </div>
    <script>
      window.__timelines["main"] = gsap.timeline({{ paused: true }});
    </script>
  </body>
</html>
"""
    (ROOT / "index.html").write_text(index)
    print(f"built {len(SCENES)} scenes, total {total}s")


if __name__ == "__main__":
    build()
