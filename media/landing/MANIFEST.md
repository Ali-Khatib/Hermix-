# Hermix landing media

Every clip here is rendered, not a storyboard. Feature demos recreate the real Hermix desktop screens (same layout, tokens, Plus Jakarta Sans, and the app’s sample-day data) in HTML, then render frame by frame with Playwright and encode with FFmpeg. The mascot is cut out of the Hermix character sheet, so it is the same character in every clip. All files are silent.

Source pipeline: `scripts/motion/` (see its README to re-render).

| File | Used for | Length | Size | Rate | Codec | Transparency | Weight |
|---|---|---|---|---|---|---|---|
| `video/feature-ask-hermix.mp4` | Story 06 — Ask Hermix | 10.0 s | 1920×1080 | 30 fps | H264 | no | 1.72 MB |
| `video/feature-email.mp4` | Story 04 — Email / inbox + draft | 9.0 s | 1920×1080 | 30 fps | H264 | no | 2.61 MB |
| `video/feature-meetings.mp4` | Story 05 — Meetings / prep | 9.0 s | 1920×1080 | 30 fps | H264 | no | 2.33 MB |
| `video/feature-tasks.mp4` | Story 03 — Tasks / action plan | 9.0 s | 1920×1080 | 30 fps | H264 | no | 2.96 MB |
| `video/feature-today.mp4` | Story 01 — Today / morning briefing | 8.0 s | 1920×1080 | 30 fps | H264 | no | 2.08 MB |
| `video/feature-whats-new.mp4` | Story 02 — What’s new / catch up | 9.0 s | 1920×1080 | 30 fps | H264 | no | 2.03 MB |
| `video/hermix-hero.mp4` | Landing hero (plays once, ends on the product composition behind the headline) | 9.0 s | 1920×1080 | 30 fps | H264 | no | 1.69 MB |
| `video/hermix-progress-animation.mp4` | Indeterminate “working” loader, seamless 2 s loop (asset; not on the landing page) | 2.0 s | 960×240 | 30 fps | H264 | no | 0.03 MB |
| `video/hermix-progress-animation.webm` | Indeterminate “working” loader, seamless 2 s loop (asset; not on the landing page) | 2.0 s | 960×240 | 30 fps | VP9 | yes (VP9 alpha) | 0.04 MB |
| `video/hermix-startup.mp4` | App-opening animation (asset; not on the landing page) | 2.6 s | 1280×800 | 30 fps | H264 | no | 0.11 MB |
| `video/hermix-startup.webm` | App-opening animation (asset; not on the landing page) | 2.6 s | 1280×800 | 30 fps | VP9 | no | 0.07 MB |
| `video/mascot-outfit-transition.mp4` | Meet Hermix — 7 moods (default, thinking, detective, organizing, inbox, meeting, idle), 2.4 s each, seamless loop | 16.8 s | 1080×1080 | 30 fps | H264 | no | 1.59 MB |
| `video/mascot-outfit-transition.webm` | Meet Hermix — 7 moods (default, thinking, detective, organizing, inbox, meeting, idle), 2.4 s each, seamless loop | 16.8 s | 1080×1080 | 30 fps | VP9 | yes (VP9 alpha) | 1.54 MB |
| `video/720/feature-ask-hermix-720.mp4` | Story 06 — Ask Hermix | 10.0 s | 1280×720 | 30 fps | H264 | no | 0.71 MB |
| `video/720/feature-email-720.mp4` | Story 04 — Email / inbox + draft | 9.0 s | 1280×720 | 30 fps | H264 | no | 0.99 MB |
| `video/720/feature-meetings-720.mp4` | Story 05 — Meetings / prep | 9.0 s | 1280×720 | 30 fps | H264 | no | 0.89 MB |
| `video/720/feature-tasks-720.mp4` | Story 03 — Tasks / action plan | 9.0 s | 1280×720 | 30 fps | H264 | no | 1.10 MB |
| `video/720/feature-today-720.mp4` | Story 01 — Today / morning briefing | 8.0 s | 1280×720 | 30 fps | H264 | no | 0.82 MB |
| `video/720/feature-whats-new-720.mp4` | Story 02 — What’s new / catch up | 9.0 s | 1280×720 | 30 fps | H264 | no | 0.81 MB |
| `video/720/hermix-hero-720.mp4` | Landing hero (plays once, ends on the product composition behind the headline) | 9.0 s | 1280×720 | 30 fps | H264 | no | 0.67 MB |

Notes
- `video/720/` copies are served to phones and Save-Data connections.
- MP4s are H.264, `+faststart`, keyframe every second. MP4s never carry transparency.
- `mascot-outfit-transition.webm` and `hermix-progress-animation.webm` have real alpha (checked with ffprobe `alpha_mode=1` and by decoding over a green plate). Safari can’t show VP9 alpha, so the page falls back to cycling `mascot/*.webp` there. The `.mp4` versions sit on a cream background.
- `posters/` hold the final frame of each feature and hero clip, and a representative frame of the loops (WebP). They show before load, for reduced motion, and if a video fails.
- `mascot/` are transparent WebP cutouts of the 10 outfits on a shared canvas (so they swap without jumping) plus `hero.webp`.
- The startup and loader clips are delivered as assets only. The desktop app was not changed.
- Demo data is the app’s sample day. Nothing in the clips shows sending, posting, or joining a live meeting.

- 2026-11-18: `feature-email-v2` and `feature-meetings-v2` (with 720 copies and posters) replace the originals on the page. Email now says “Review & send” and “Sample preview · nothing is sent”. Meetings adds a dashed “Planned · not in this preview” after-meeting card. Originals are kept unreferenced. Scene source: `scripts/motion/scenes/features.js`.
- 2026-11-18: `video/hermix-fly.webm`, a 6 s seamless loop of Hermix flying a figure-eight (1600×1000, VP9 alpha, 0.5 MB). Plays over the stacked hero after the hero clip ends. Scene: `SCENES.fly` in `scripts/motion/scenes/brand.js`; render with `node render.js fly out/hermix-fly.webm --alpha --w 1600 --h 1000`.
- 2026-11-18: `hermix-hero-v2` (+720 copy and poster) replaces the hero. 11 s: Hermix hops across six generic app tiles with red badges, drains them, lands at the Hermix window and says “Don’t worry. I’ll catch you up.” Tiles use invented glyphs, no real brand logos. Scene: `SCENES.hero2` in `scripts/motion/scenes/hero2.js`; render with `node render.js hero2 out/hermix-hero-v2.mp4`. The old hero clip is kept, unreferenced.

- hermix-hero-v3 (+720, poster): Greek/anime hero, 120fps supersampled to 30 for motion blur, scene scripts/motion/scenes/hero3.js. v2 kept, unreferenced.
