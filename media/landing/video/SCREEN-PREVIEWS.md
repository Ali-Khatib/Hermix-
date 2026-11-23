# Real-screen landing previews

These silent six-second, 20 fps WebM loops only animate the camera over actual app screenshots. They do not demonstrate working actions or fabricate UI states.

- Setup: setup-interview-screen-v1.webp is a crop (654, 204)–(1397, 795) of the supplied onboarding screenshot. It intentionally isolates the first-account starter question from browser connection setup.
- Browser: browser-connection-v2.webp is the actual receiver-off connection panel. The page explicitly describes manual installation/pairing and limits current helper support to supported AI conversation sync and click OCR.

Each has a 720px-wide lightweight copy and a poster for reduced-motion, data-saving, or unavailable playback. All screen edges remain visible throughout the subtle periodic camera move. No audio track.

Rebuild from the checked-in screenshot sources with Pillow and FFmpeg (libvpx):

    python scripts/render-screen-previews.py --ffmpeg /path/to/ffmpeg

The landing page uses the existing visibility-based lazy-loader and single-decoder budget. These previews add keyboard-accessible play/pause buttons. Reduced-motion and data-saving users see the poster until they explicitly play a preview.
