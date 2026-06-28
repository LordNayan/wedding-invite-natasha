# Wedding Invitation — Next.js

A config-driven recreation of the Natasha & Nayan wedding invitation, built with
Next.js (App Router) and ready to deploy to Vercel. **Everything you see — text,
images, dates, links — is controlled from a single file: [`site.config.ts`](./site.config.ts).**

---

## Quick start

```bash
npm install
npm run fetch-assets   # downloads the original images + video into /public/assets
npm run dev            # http://localhost:3000
```

> `fetch-assets` pulls the real photos/video from the original site. If you'd
> rather use your own, skip it and drop files into `public/assets/` using the
> filenames referenced in `site.config.ts` (e.g. `hero-bg.webp`, `story-1.webp`).

---

## Editing content

Open **`site.config.ts`** — it is the only file you need to touch:

| Want to change…                | Edit this in `site.config.ts`           |
| ------------------------------ | --------------------------------------- |
| Couple names / monogram        | `couple`                                |
| Hero date & location           | `hero`                                  |
| Countdown target date          | `countdown.targetDate` (ISO format)     |
| Family details (parents, etc.) | `families.groom`, `families.bride`      |
| Story photos & captions        | `story.gallery`                         |
| Schedule cards                 | `schedule.cards`                        |
| Ceremony time / venue / verse  | `wedding`                               |
| Reception                      | `reception`                             |
| RSVP labels & directions link  | `rsvp`                                  |
| Page title / social preview    | `meta`                                  |

**Images:** every image is a path like `/assets/hero-bg.webp`. Put the file in
`public/assets/` with that name and it appears automatically.

The countdown updates live every second based on `countdown.targetDate`.
The RSVP form is **static** (no backend) — it validates and shows a thank-you
message; no data leaves the browser.

---

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. Make sure `public/assets/` is committed **with the images included**
   (the `.gitignore` does not exclude them — run `npm run fetch-assets` first,
   then commit).
3. On [vercel.com](https://vercel.com) → **Add New → Project** → import the repo.
4. Framework preset is auto-detected as **Next.js**. No env vars needed.
5. Click **Deploy**.

Or from the CLI:

```bash
npm i -g vercel
vercel
```

---

## Project structure

```
site.config.ts            ← all content lives here
app/
  layout.tsx              ← fonts + metadata
  page.tsx                ← composes every section from the config
  globals.css             ← design system + per-section styles
components/
  Envelope.tsx            ← tap-to-open intro overlay (video)
  Countdown.tsx           ← live countdown
  Reveal.tsx              ← fade-in-on-scroll wrapper
  Rsvp.tsx                ← static RSVP form
scripts/
  download-assets.mjs     ← fetches original images/video → public/assets
public/assets/            ← image + video files
```

## Notes

- Fonts (Cormorant Garamond, EB Garamond, Great Vibes) load via `next/font`, so
  no manual font files are needed.
- The site is fully responsive and respects `prefers-reduced-motion`.
- Built and tested with Next.js 14.
