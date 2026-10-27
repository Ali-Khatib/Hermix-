# Hermix website

Marketing site for Hermix. Static HTML/CSS/JS with serverless form APIs.

## Folders

| Path | What it is |
|------|------------|
| `index.html`, `pricing.html`, `faq.html`, `contact.html` | Pages |
| `styles.css`, `page.css`, `app.js`, `forms.js`, `smooth.js` | UI |
| `media/landing/video/` | Feature + hero videos (full + `720/`) |
| `media/landing/mascot/` | Mascot stills |
| `media/landing/posters/` | Video posters |
| `media/fonts/`, `media/vendor/` | Fonts and Lenis |
| `api/` | Waitlist + contact (Vercel serverless) |
| `legal/` | Privacy, terms, and other legal pages |
| `scripts/` | Build + local preview |

## Local

```bash
npm run build
npm run serve
```

Open http://localhost:3000. Forms need `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` if you want them live.

## Deploy

Root of this repo is the Vercel project root. `vercel.json` runs `node scripts/build.mjs` then serves the site and `/api/*`.
