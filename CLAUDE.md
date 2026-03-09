# Tiffany Chen Art Portfolio

Recreating https://tiffanychen.site/ — a bilingual (English / Traditional Chinese) art portfolio for Tiffany Chen (陳嬋娟), a Taiwanese-American artist.

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Deployment**: Vercel (target domain: tiffanychen.site)
- **Images**: Local `/public/images/` directory, organized by gallery category
- **GitHub**: https://github.com/yuchenglin444-open/tiffanychen-site

## Project Structure

```
src/
  app/
    layout.tsx              # Root layout: Navbar + Footer, Geist font
    page.tsx                # Landing page (Hero, About, News, Contact)
    news/
      page.tsx              # News listing grouped by year
      [slug]/page.tsx       # Individual news article pages
    gouache-painting/       # (planned) Gouache gallery
    paintings/              # (planned) Paintings gallery
    sculptures/             # (planned) Sculptures gallery
    other-mediums/          # (planned) Others gallery
    about/                  # (planned) Biography page
  components/
    Navbar.tsx              # Fixed/sticky nav, mobile hamburger, scroll-aware
    Footer.tsx              # Copyright + back-to-top
  lib/
    artworks.ts             # All 115 artworks (74 gouache, 22 paintings, 10 sculptures, 9 others)
    news.ts                 # 4 news entries + helpers (getNewsByYear, getLatestNews, getNewsBySlug)
  types/
    index.ts                # Artwork, NewsItem interfaces
public/
  images/
    hero.jpg                # Full-quality hero image (2.8MB)
    gouache/                # 74 thumbnail images
    paintings/              # 22 thumbnail images
    sculptures/             # 10 thumbnail images
    others/                 # 9 thumbnail images
    news/                   # 4 news thumbnails
scripts/
  download-images.sh        # Image download script (without hashes — broken)
  download-with-hashes.sh   # Image download script (with CDN auth hashes — working)
```

## Site Architecture

### Pages & Routes

| Nav Label        | Route              | Status    | Content Type                 |
| ---------------- | ------------------ | --------- | ---------------------------- |
| (Landing)        | `/`                | Done      | Hero + About + News + Contact |
| Gouache painting | `/gouache-painting`| Planned   | Gallery grid (74 works)      |
| Paintings        | `/paintings`       | Planned   | Gallery grid (22 works)      |
| Sculptures       | `/sculptures`      | Planned   | Gallery grid (10 works)      |
| Others           | `/other-mediums`   | Planned   | Gallery grid (9 works)       |
| News             | `/news`            | Done      | Articles grouped by year     |
| News detail      | `/news/[slug]`     | Done      | Individual article           |
| About            | `/about`           | Planned   | Biography text               |

### Landing Page Sections (in order)

1. **Navbar** — Fixed/sticky, transparent over hero, solidifies on scroll. Logo left, links right. Mobile hamburger.
2. **Hero** — Full viewport height, latest artwork as background (`/images/hero.jpg`), dark overlay. "Tiffany Chen" large centered text, "陳嬋娟" smaller beneath.
3. **About** — One paragraph bio. Links to `/about`.
4. **News** — Up to 5 latest items in list format. Each links to `/news/[slug]`.
5. **Contact** — Email (t59122@gmail.com) + Facebook link with icons.
6. **Footer** — Copyright + back-to-top.

### Navbar

- Fixed position, `z-50`
- Transparent background over hero, becomes `bg-white/95 backdrop-blur` on scroll
- Text color flips: white (over hero) → dark (scrolled)
- Mobile: hamburger with animated bars, slide-down menu

### News Page

- `/news` — Full listing grouped by year (descending), with year headers
- `/news/[slug]` — Detail page with back link, date, title, summary

## Design System

### Colors

- **Background**: `#ffffff`
- **Text**: `#171717` (foreground)
- **Hero overlay**: `bg-black/50`
- **Footer**: `bg-gray-950`
- **Accents**: Minimal — `gray-400` for labels, `gray-600` for body text

### Typography

- **Font**: Geist Sans (via `next/font/google`)
- **Hero heading**: `text-6xl`–`text-8xl font-extralight tracking-[0.3em]`
- **Section headers**: `text-sm uppercase tracking-[0.3em] text-gray-400`
- **Body**: `text-lg leading-relaxed text-gray-600`

### Layout Patterns

- Max width: `max-w-7xl` for nav, `max-w-3xl` for content sections
- Sections: `py-24` vertical padding
- Dividers: `h-px w-12 bg-gray-300 mx-auto` under section headings

## Content Data

### Artwork Categories

| Category   | Count | Data Key     |
| ---------- | ----- | ------------ |
| Gouache    | 74    | `"gouache"`  |
| Paintings  | 22    | `"paintings"`|
| Sculptures | 10    | `"sculptures"`|
| Others     | 9     | `"others"`   |

All artwork data in `src/lib/artworks.ts`. Filterable via `getArtworksByCategory()`.

### News

4 articles in `src/lib/news.ts`. Helpers: `getLatestNews(n)`, `getNewsByYear()`, `getNewsBySlug(slug)`.

### About (for future page)

Tiffany Chen (陳嬋娟): Born 1953, Kaohsiung, Taiwan. Master's in Arts from Chinese Culture University. 39 years in Eastern gouache painting. Moved to US 1999. Portrait oil painting + sculpture training. Member of Art Students League of New York, Chairman of Green Water Painting Society, Taiwan Gouache Painting Association. Exhibitions 1986–2024.

## Development Conventions

- All gallery pages should reuse shared `GalleryGrid` + `ArtworkCard` components (to be built)
- Use `next/image` for artwork display with proper alt text
- Keep components small and focused
- Accessibility: semantic HTML, keyboard navigation, bilingual alt text
- SEO: per-page `<title>` and meta description

## Commands

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run ESLint
```

## Image Notes

- Thumbnail images are ~202x158px (CDN crop size)
- Hero image is full quality (~2.8MB)
- CDN base: `https://cdn.myportfolio.com/ff5f2b2d-778b-40f6-83f9-424596a725bf/`
- CDN requires `?h=` auth hash parameter — see `scripts/download-with-hashes.sh`
- Gallery pages will need larger images for lightbox; re-download with `_car_` (no `x32`) suffix + matching hash
