# STAIRCASE — Irresistible Taste

A Next.js website for **STAIRCASE**, a premium Ghanaian restaurant serving main dishes, fluffy pancakes, gourmet ice cream, strawberry treats, and signature cocktails.

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Vanilla CSS
- **Animations**: Motion (Framer Motion)
- **Icons**: Lucide React

---

## Getting Started

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Production build
yarn build
```

---

## Deploying to Vercel

1. Push to GitHub / GitLab.
2. Import the repo on [vercel.com](https://vercel.com).
3. Add this **Environment Variable** in the Vercel project settings:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_SITE_URL` | `https://your-actual-domain.com` |

> **Why?** This variable drives the canonical URL, Open Graph image URL, sitemap, and robots.txt. If you skip it, the app falls back to `https://staircase.vercel.app`.

4. Click **Deploy** — Vercel auto-detects Next.js, no extra config needed.

---

## SEO & Open Graph

- OG image: `public/og-image.jpg` (1200 × 630)
- Sitemap: `/sitemap.xml` (auto-generated)
- Robots: `/robots.txt` (auto-generated)
- Twitter card: `summary_large_image`

---

## Project Structure

```
├── app/
│   ├── layout.tsx      # Root layout + all metadata / OG tags
│   ├── page.tsx        # Home page
│   ├── sitemap.ts      # Auto-generates /sitemap.xml
│   ├── robots.ts       # Auto-generates /robots.txt
│   └── globals.css     # Global styles + responsive breakpoints
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Menu.tsx
│   ├── About.tsx
│   ├── Testimonials.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── public/
│   ├── og-image.jpg          # Open Graph / Twitter card image
│   ├── favicon.png           # Browser favicon
│   └── assets/img/           # Brand assets & food photos
└── next.config.ts            # Image optimisation + security headers
```
