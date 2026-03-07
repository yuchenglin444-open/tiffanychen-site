# Tiffany Chen Art Portfolio

Recreating https://tiffanychen.site/ — a bilingual (English / Traditional Chinese) art portfolio for Tiffany Chen (陳嬋娟), a Taiwanese-American artist.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Deployment**: Vercel (target domain: tiffanychen.site)
- **Images**: Local `/public/images/` directory, organized by gallery category

## Project Structure

```
src/
  app/
    layout.tsx          # Root layout: header, nav, footer
    page.tsx            # Homepage (gouache painting gallery — default landing)
    paintings/page.tsx
    sculptures/page.tsx
    other-mediums/page.tsx
    news/page.tsx
    about/page.tsx
    [slug]/page.tsx     # Individual artwork detail pages
  components/
    Header.tsx          # Site title + nav + social links
    GalleryGrid.tsx     # Reusable thumbnail grid for artwork pages
    ArtworkCard.tsx     # Single gallery thumbnail card
    Lightbox.tsx        # Full-screen image overlay viewer
    Footer.tsx          # Back-to-top link
  lib/
    artworks.ts         # Artwork data (title, image path, category, slug)
    news.ts             # News/press entries data
    about.ts            # Biography content data
  types/
    index.ts            # Shared TypeScript types
public/
  images/
    gouache/            # ~75 works
    paintings/          # ~29 works
    sculptures/         # ~10 works
    others/             # ~9 works
    news/               # News article thumbnails
```

## Site Architecture

### Pages & Routes

| Nav Label        | Route             | Content Type       |
| ---------------- | ----------------- | ------------------ |
| Gouache painting | `/` (homepage)    | Gallery grid (~75) |
| Paintings        | `/paintings`      | Gallery grid (~29) |
| Sculptures       | `/sculptures`     | Gallery grid (~10) |
| Others           | `/other-mediums`  | Gallery grid (~9)  |
| News             | `/news`           | Article cards (4)  |
| About            | `/about`          | Biography text     |

### Header

- **Logo/Title**: "Tiffany Chen / 陳嬋娟" (links to `/`)
- **Subtitle**: "個人藝術美學創作" (Personal Artistic Aesthetic Creations)
- **Navigation**: Horizontal menu — Gouache painting, Paintings, Sculptures, Others, News, About
- **Social**: Facebook icon link + email icon (t59122@gmail.com)

### Footer

- Minimal: "Back to Top" link only

## Design System

### Aesthetic

Minimalist, gallery-focused. Artwork is the focal point. Clean white background with minimal UI chrome.

### Colors

- **Background**: `#ffffff`
- **Text**: Dark gray/black for contrast against white
- **Overlay (lightbox)**: White at 94% opacity (`rgba(255, 255, 255, 0.94)`)
- **Accents**: Minimal — let artwork provide all color

### Typography

- Clean, sans-serif font stack
- Bilingual support required: must render Traditional Chinese (繁體中文) characters properly
- Minimal text styling — no decorative fonts

### Layout

- **Gallery grid**: Responsive thumbnail grid, ~202x158px base thumbnail size
- **Geometric theme**: Clean lines, structured grid alignment
- **Responsive**: Mobile-friendly layout that reflows grid columns
- **Page transitions**: Subtle fade/transition animations between pages

### Lightbox

- Clicking a gallery thumbnail opens full-size image in overlay
- White overlay background at 94% opacity
- Close on click outside or close button
- Right-click download disabled on images

## Content Details

### Gouache Painting Gallery (homepage, ~75 works)

Key named works include:
- 物競天擇, 覓食, 合家歡, 花現 非典型膠彩畫
- 心之嚮往, 阿母的叮嚀, 生命的律動
- 花現心靈 series (multiple variations including NO.6)
- 聖潔之花, 白色松鼠, 風中花, MOMA, 歸來
- Lotes, 夏日, 修道者, Swan, 西班牙風情
- 黑面船仔媽, 半讀, 月世界, 本質, 鑽石寶貝
- 想飛的心情, Lighthouse of Pictured Rocks, 野百合的春天
- ~40+ untitled works

### Paintings Gallery (~29 works)

Oil paintings and portraits:
- George W. Bush (two portraits), Portrait - Jason, Portrait - Jack
- Portrait - 陳火木, 浪漫威尼斯, Alison Lee
- Several untitled works

### Sculptures Gallery (~10 works)

Primarily portrait busts:
- 林博文, 陳火木, 李建中, 陳水扁, 林天扶
- Several untitled works

### Others Gallery (~9 works)

Mixed mediums: Hand bag, Lamp turn, 瓷器繪畫, 琉璃熔合, 飾品, 咖啡拉花, Dog outfit, Hand made bag

### News (4 articles)

Press/media coverage entries with Traditional Chinese headlines:
1. 偶發的藝術-陳嬋娟 | 大媒體 數位藝廊
2. 膠彩畫特展 未演先轟動...
3. 走入花間 全新發現...
4. 花現心靈...

### About

Biography of Tiffany Chen (陳嬋娟):
- Born 1953 in Kaohsiung, Taiwan
- Master's degree in Arts from Chinese Culture University
- 39 years specializing in Eastern gouache painting
- Relocated to the United States in 1999
- Pursued portrait oil painting and sculpture training in the US
- Professional memberships: Art Students League of New York, Green Water Painting Society (Chairman), Taiwan Gouache Painting Association
- Exhibition history spanning 1986–2024

Bilingual presentation: Traditional Chinese primary text with English summary.

## Development Conventions

- Use `next/image` for all artwork images with proper alt text (artwork title)
- All gallery pages share `GalleryGrid` + `ArtworkCard` components — no duplication
- Artwork data lives in `src/lib/artworks.ts` as a typed array, filterable by category
- Keep components small and focused; no over-abstraction
- Image placeholders: use blurred placeholder strategy via Next.js
- Accessibility: proper alt text (bilingual titles), semantic HTML, keyboard-navigable lightbox
- SEO: proper `<title>` and meta description per page

## Commands

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run ESLint
```
