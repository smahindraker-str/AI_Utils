---
format: 1920x1080
duration: 153s
message: "Lululemon replaced its MDM and got something bigger: stores that run their own mobility, so educators stay with guests."
arc: Premise → Two layers → Before → After → Platform at work (8 proofs) → Outcomes → Lessons → Close
audience: retail technology and store operations leaders at an industry event or on the web
mode: collaborative
---

# Matin, Lululemon: Modernizing Retail Mobility (v1)

## Decisions

- **Message:** Replacing the MDM was the small part; the big part is that stores now run their own mobility, so educators stay with guests.
- **Audience and arc:** retail tech and store ops leaders. Premise → two layers → before → after → eight proofs on real screens → three outcomes → seven lessons → close.
- **Format:** 1920x1080, ~153s, no voiceover, music bed under everything, on-screen type carries the story. No captions, so no caption keep-out.
- **The spine:** the **status ring**. A small device-health ring (the same ring the Site Manager Health screen uses). It sits grey and broken in the "before" act, closes to green at "After ienterprise," rides as the kicker dot on every proof scene, and is the last thing lit on the close.
- **Brand, from the deck:** deck is Apple monochrome. Stage `#0B0B0D`, primary text `#F5F5F7`, secondary `#8E8E93`, hairlines `#2C2C30`, card surface `#1C1C1E`. One accent, taken from the product's own health rings: ready green `#30D158`. A muted alert red `#FF453A` appears only in the "before" act and the tamper beat. Type: Inter (the deck's Arial maps here; closest bundled face to SF Pro) 900 display / 400 body; JetBrains Mono 400 for kickers and telemetry (the deck's Courier New role). Radii 28px cards, 44px device frames. Easing: `power3.out` entrances, `power2.inOut` moves, `expo.out` on the ring close.
- **Bans:** no gradient text, no glow, no neon, no stock icons standing in for product, no fake product UI (every screen is a real deck capture), no em dashes, never "iEnterprise." Motion failures to avoid: the slideshow (a fresh static card every beat, so every proof scene keeps one continuous camera move) and the screensaver (ambient drift that says nothing).
- **Held frames:** "One guest, waiting." (scene 4) and "Done for them. Not to them." (scene 16). Nothing moves for ~1.5s on each.
- **Seam rule:** one direction for the whole film, content exits left, next scene enters from the right. Act changes use a cut to black.
- **Truthfulness:** every product screen is a real capture from the source deck. All copy is the deck's own wording. No invented metrics.

## Still open

- Music bed: a calm, modern instrumental around 95 to 105 BPM, sourced at build time through media-use. Will confirm the pick before render.

## Frame 1 — Retail runs on iOS

- scene: "RETAIL RUNS ON IOS" kicker, then "Modernizing Retail Mobility." and "Matin, Lululemon." over the ienterprise lockup
- duration: 7s
- poster: 5s
- transition_in: cut
- status: built
- blueprint: kinetic-type-beats + logo-assemble-lockup
- src: compositions/01-open.html
- voiceover: onscreen

Mono kicker types "RETAIL RUNS ON IOS" (0.0s). At 1.6s the headline rises word by word, "Modernizing Retail Mobility." At 3.6s "Matin, Lululemon." fades in secondary grey. ienterprise lockup sits small, bottom right. No: no logo spin, no particle burst.
Why: names the speaker, the company, and the claim in one breath.

## Frame 2 — The starting point

- scene: "We replaced an aging MDM platform." then "What changed was much bigger."
- duration: 7s
- poster: 5s
- transition_in: push-left
- status: built
- blueprint: kinetic-type-beats
- src: compositions/02-starting-point.html
- voiceover: onscreen

Kicker "THE STARTING POINT." Line one lands, holds 2.5s, then dims to grey as line two scales in at full white. Hero prop: the status ring appears grey and incomplete beside the kicker. No: no "old vs new" split screen.
Why: sets up the turn the whole film pays off.

## Frame 3 — Two layers, two jobs

- scene: Two stacked slabs, "MDM / Manages the devices. Reliably." below, "IENTERPRISE / Builds on that and manages operations." rising on top
- duration: 7s
- poster: 5s
- transition_in: push-left
- status: built
- blueprint: rules: waterfall-entry, svg-path-draw
- src: compositions/03-two-layers.html
- voiceover: onscreen

Headline "Two layers, two jobs." MDM slab slides up from bottom, settles. A hairline arrow draws upward, then the ienterprise slab lands on top of it with a soft settle. No: no 3D isometric layers.
Why: positions ienterprise with respect to MDM, not against it.

## Frame 4 — Before ienterprise

- scene: Four pain lines stack in, then pills "One educator, waiting." → "One guest, waiting."
- duration: 12s
- poster: 10s
- transition_in: cut
- status: built
- blueprint: rules: dynamic-content-sequencing, discrete-text-sequence
- src: compositions/04-before.html
- voiceover: onscreen

Kicker "THE PROBLEM," title "Before ienterprise." Lines accumulate at ~1.4s each: "Educators could not see if a device was healthy." / "Every issue went to the Educator Help Center." / "Every fix needed access to an MDM console." / "Troubleshooting took too long, with back-and-forth between stores and the Educator Help Center before an incident was resolved." Each line has a grey broken status ring. Then the list dims; pill "One educator, waiting." → arrow → "One guest, waiting." Held frame 1.5s. No: no red flashing, no frustrated stock people.
Why: the cost lands on the guest, which is the business reason for everything after.

## Frame 5 — After ienterprise

- scene: The status ring closes to green, then two role cards: Enterprise Manager and Site Manager
- duration: 9s
- poster: 7s
- transition_in: cut
- status: built
- blueprint: titlecard-reveal + grid-card-assemble
- src: compositions/05-after.html
- voiceover: onscreen

The grey ring from scene 4 closes to green (expo.out, 0.9s), shrinks into the kicker "THE ANSWER." Title "After ienterprise." Two cards rise, left then right: "ENTERPRISE MANAGER / One view across every store and every device. / For the people who run the fleet." and "SITE MANAGER / Every device in the store, and whether it is healthy. / For the people who run the store." Callback: answers scene 4's broken rings.
Why: the turn. Two products, two audiences.

## Frame 6 — Enterprise Manager · Retail Technology

- scene: Store readiness dashboard (image4) in a floating window, slow push toward "Store readiness 90.0%"
- duration: 8s
- poster: 5s
- transition_in: push-left
- status: built
- blueprint: device-surface-showcase
- src: compositions/06-em-retail-tech.html
- voiceover: onscreen

Kicker "ENTERPRISE MANAGER · RETAIL TECHNOLOGY," headline "One view across every store and every device." on the left third. Window enters from right, then a continuous slow push toward the readiness score. No: no fake cursor clicking.
Why: proof for the fleet audience.

## Frame 7 — Enterprise Manager · Networking

- scene: Network topology capture (image5), camera pans across the store topology
- duration: 8s
- poster: 5s
- transition_in: push-left
- status: built
- blueprint: device-surface-showcase
- src: compositions/07-em-networking.html
- voiceover: onscreen

Kicker "ENTERPRISE MANAGER · NETWORKING," headline "All devices in the store and the network, correlated." Sub line from notes: "The fleet, understood before the phone rings." Camera drifts along the topology from access point to devices.
Why: shows the platform sees past the device to the network.

## Frame 8 — Site Manager · Store Leaders

- scene: iPad Health screen (image6), headline "Is the store ready to open? One glance."
- duration: 8s
- poster: 5s
- transition_in: push-left
- status: built
- blueprint: device-surface-showcase
- src: compositions/08-sm-store-leaders.html
- voiceover: onscreen

iPad frame on the right, text left. Body: "Every device in the store, and whether it is healthy. iPhones, iPads, payment devices, printers." Final line "Ready for business." lands with a green status dot. No: no generic tablet clip art, real capture only.
Why: proof for the store leader audience.

## Frame 9 — Site Manager · Educators

- scene: Device Details screen (image7), "See the problem. Fix it on the spot."
- duration: 8s
- poster: 5s
- transition_in: push-left
- status: built
- blueprint: device-surface-showcase
- src: compositions/09-sm-educators.html
- voiceover: onscreen

iPad left, text right (mirror of scene 8 for rhythm). Mono chips tick in: "WI-FI · BATTERY · OS." Body: "Guided steps, on the device. Resolved in the store. Fewer calls to the Educator Help Center, and better ones." Callback to scene 4's "Every issue went to the Educator Help Center."
Why: the direct answer to the before act.

## Frame 10 — Site Manager · ServiceNow

- scene: Three iPad screens (image8, image9, image10) fanning in: Issues, issue detail, telemetry
- duration: 10s
- poster: 7s
- transition_in: push-left
- status: built
- blueprint: device-surface-showcase (showcase-carousel)
- src: compositions/10-sm-servicenow.html
- voiceover: onscreen

Kicker "SITE MANAGER · SERVICENOW," headline "Incidents arrive with evidence." Three screens fan in with a stagger. Mono verbs tick "CREATE IT. TRACK IT. CLOSE IT." Telemetry tags pop along the third screen: "battery · Wi-Fi · latency · OS · apps." Close line: "Faster first-call resolution."
Why: proof that the help desk gets better calls, not just fewer.

## Frame 11 — Site Manager · Security

- scene: Audit screen and Audit Report (image11, image12), "Device audit. Daily. By the store."
- duration: 8s
- poster: 5s
- transition_in: push-left
- status: built
- blueprint: kinetic-type-beats + device-surface-showcase
- src: compositions/11-sm-audit.html
- voiceover: onscreen

Headline in three hard beats: "Device audit." / "Daily." / "By the store." Two iPads slide in overlapping. Body: "Every device accounted for. Exceptions surfaced and resolved in the store. A report for every store, every day."
Why: audit becomes a business capability, not an IT task.

## Frame 12 — Site Manager · Payment and PCI

- scene: PIN pad inspection pass (image13), then tamper path (image14) with red "Report Tamper Issue"
- duration: 9s
- poster: 7s
- transition_in: push-left
- status: built
- blueprint: comparison-split
- src: compositions/12-sm-pci.html
- voiceover: onscreen

Headline "Every PIN pad inspected. Every day." First iPad (pass) with "Signed, timestamped, in the audit." Then second iPad slides beside it, the one red accent of the act: "Tampering found? One tap opens a security and PCI incident."
Why: compliance done by the store, every day.

## Frame 13 — Enterprise Manager · Security and Store Support

- scene: Smart Support device view (image15), "PIM and PAM requirements met. Support still enabled."
- duration: 8s
- poster: 5s
- transition_in: push-left
- status: built
- blueprint: device-surface-showcase
- src: compositions/13-em-security.html
- voiceover: onscreen

Kicker "ENTERPRISE MANAGER · SECURITY AND STORE SUPPORT." Headline as above. Two short lines swap in place: "Least privilege for the platform." → "Full capability for the store." Close: "Smart Support: the fix before the escalation."
Why: closes the security team's objection so the story is complete.

## Frame 14 — Business transformation at Lululemon

- scene: Three numbered outcomes then the closing card
- duration: 15s
- poster: 12s
- transition_in: cut
- status: built
- blueprint: titlecard-reveal
- src: compositions/14-outcomes.html
- voiceover: onscreen

Kicker "IENTERPRISE" (rendered lowercase as "ienterprise"), title "Business transformation at Lululemon." Three rows reveal with hairline rules, ~3s each: "01 Stores open ready, every morning." / "02 Issues resolve faster." / "03 Compliance became routine." each with its one-line support. Then the rows dim and the closing card: "Retail mobile operations are now more efficient and effective. Educators stayed with guests." Callback to scene 4's "One guest, waiting."
Why: the payoff of the message.

## Frame 15 — For other retailers

- scene: Seven takeaways, cycled one at a time on a fixed numbered rail
- duration: 21s
- poster: 4s
- transition_in: push-left
- status: built
- blueprint: fixed-anchor-cycle
- src: compositions/15-takeaways.html
- voiceover: onscreen

Kicker "THE TAKEAWAYS," title "For other retailers." Left rail holds 01 to 07; the active number turns white while its lesson swaps in large on the right, 3s each: "Be clear about the problem before choosing the tools." / "Choose partners who understand the platform and the operating environment." / "Align priorities with internal teams early. Shared support is not shared urgency." / "Use the pilot to find friction, and be ready to change the plan." / "Treat readiness as ongoing work, not the final step." / "Do not shift technology work to educators." / "Expect visibility to expose what the business case missed." No: no seven-card grid.
Why: makes the story useful to the audience in the room.

## Frame 16 — Done for them. Not to them.

- scene: Held line, then caption and ienterprise lockup with the green ring
- duration: 7s
- poster: 5s
- transition_in: cut
- status: built
- blueprint: kinetic-type-beats + logo-assemble-lockup
- src: compositions/16-close.html
- voiceover: onscreen

"Done for them." lands, then "Not to them." Held 1.5s. Caption "Retail mobility, managed in every store." fades in grey; the ienterprise lockup resolves beneath it, the status ring lit green beside it. Hold to end.
Why: the thesis, in the speaker's words.
