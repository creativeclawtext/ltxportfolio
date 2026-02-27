# James McKay -- AI Video Creator Portfolio

A single-page portfolio site for James McKay, showcasing AI video production, brand/social work, agentic AI projects, and film/broadcast credits. Built with Next.js 16, React 19, Tailwind CSS 4, and Motion (Framer Motion).

**Live domain:** `jamesmckay.dev` (configured in sitemap)

## Tech Stack

| Layer         | Technology                                       |
| ------------- | ------------------------------------------------ |
| Framework     | Next.js 16.1.6 (App Router, React Server Components) |
| UI            | React 19, TypeScript 5, Tailwind CSS 4           |
| Components    | shadcn/ui (new-york style) -- Badge, Card, Separator |
| Animation     | Motion 12 (`motion/react`) -- variants, scroll-linked, springs |
| Icons         | Lucide React + hand-drawn animated SVGs          |
| Fonts         | DM Sans (display), Plus Jakarta Sans (body), JetBrains Mono (mono) |
| Image Optimization | Next.js `<Image>` with AVIF/WebP, custom device sizes |
| Deployment    | Vercel-ready (security headers in `next.config.ts`) |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The page hot-reloads as you edit.

Other scripts:

```bash
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # ESLint (core-web-vitals + typescript)
```

## Directory Structure

```
portfolio/
  app/
    layout.tsx          # Root layout -- fonts, metadata, OG tags, skip-to-content
    page.tsx            # Home page -- assembles all sections
    globals.css         # Tailwind config, Lightricks brand tokens, CSS animations
    robots.ts           # SEO -- allows all crawlers
    sitemap.ts          # SEO -- jamesmckay.dev sitemap
    favicon.ico         # Favicon
    icon.png            # App icon
    apple-icon.png      # Apple touch icon
  components/
    header.tsx          # Fixed nav with scroll-fade, mobile hamburger menu
    hero.tsx            # Animated gradient orbs, headline, "Making videos with LTX-2" badge
    ai-videos.tsx       # AI Video section -- 3 LTX-2 projects + 8-step workflow pipeline
    brand-social.tsx    # Brand & Social section -- 4 categories (Pharma, Motion, Doc, Healthcare)
    ai-portfolio.tsx    # AI & Agentic section -- 4 projects (Avatars, CCS, storyATL, Bartender)
    film-broadcast.tsx  # Film section -- production reel, Flexjet interactive, credits, client marquee
    footer.tsx          # CTA, location info, copyright
    project-modal.tsx   # Shared modal -- focus trap, Escape close, scroll lock, animated entrance
    section-heading.tsx # Text scramble heading with in-view trigger
    tilt-card.tsx       # 3D perspective tilt on mouse move (spring physics)
    ui/
      badge.tsx         # shadcn Badge (CVA variants)
      card.tsx          # shadcn Card family
      separator.tsx     # shadcn Separator (Radix primitive)
  hooks/
    use-text-scramble.ts  # rAF-driven character scramble animation
  lib/
    animations.ts       # Motion variant presets (fadeInUp, staggerContainer, workflowStep, etc.)
    utils.ts            # cn() utility (clsx + tailwind-merge)
  public/
    brand/              # 35 project images -- thumbnails and screenshots for all sections
    reel/               # 6 reel assets -- frames and thumbnail
  components.json       # shadcn/ui config (new-york, RSC, Lucide, Tailwind CSS vars)
  next.config.ts        # Image formats, security headers (X-Frame, CSP, Permissions-Policy)
  tsconfig.json         # TypeScript strict mode, path aliases (@/*)
  eslint.config.mjs     # ESLint 9 flat config -- Next.js core-web-vitals + TypeScript
  postcss.config.mjs    # PostCSS with @tailwindcss/postcss
```

## Page Sections

The site is a single page with five content sections, each rendered as its own component:

1. **Hero** -- Gradient orb background, headline ("AI Video and Creative Technologist"), LTX-2 status badge
2. **AI Video** (`#ai-video`) -- Three LTX-2 video projects (Open Source, Style, Monday Morning) with YouTube embeds in modals; an 8-step animated workflow pipeline (Concept > Agentic Skills > Script > LTX-2 > Remotion Agent > Speech Agent > Polish > Deliver)
3. **Brand & Social** (`#brand-social`) -- Four category cards (Pharma, Motion Graphics, Doc Style, Healthcare) each opening a modal with video links to YouTube/Instagram
4. **AI, APIs, & Agentic Systems** (`#ai-portfolio`) -- Four project cards (Patient Digital Twins, Creative Context Studio, storyATL, Bartender Friend) with screenshot galleries and external links
5. **Film, Broadcast, & Interactive** (`#film`) -- Production reel (YouTube embed), Flexjet command center project, selected credits (netuser, CW, Travel Channel, IBM), and a client marquee (IBM, Adidas, JP Morgan Chase, Disney, Warner Bros., etc.)

## Design System

The site uses Lightricks brand tokens defined as CSS custom properties in `globals.css`:

- **Brand colors:** `--ltx-black` (#0c0e1a), `--ltx-studio` (#3066ff), `--ltx-pink` (#f37dd9), `--ltx-lavender` (#e0d3ff), `--ltx-sky` (#61ddfa), `--ltx-violet` (#c199fe), `--ltx-green` (#b2ee3c)
- **Gradient:** Pink > Lavender > Sky (135deg), used for text highlights and orb backgrounds
- **Typography:** DM Sans for headings, Plus Jakarta Sans for body, JetBrains Mono for code/labels
- **Cards:** `.card-glow` class with gradient background and multi-shadow hover effect
- **Animations:** Floating orbs, scroll bounce indicator, marquee scroll, gradient border spin, workflow line draw, text scramble

## Key Patterns

- **Dynamic imports:** Below-fold sections (`BrandSocial`, `AiPortfolio`, `FilmBroadcast`, `Footer`) are loaded with `next/dynamic` to reduce initial bundle
- **Motion variants:** All scroll-triggered animations use reusable variants from `lib/animations.ts` with `whileInView` + `viewport={{ once: true }}`
- **Modal system:** `ProjectModal` provides a shared overlay with focus trapping, keyboard navigation (Escape, Tab cycling), body scroll lock, and animated mount/unmount via `AnimatePresence`
- **TiltCard:** 3D perspective tilt using Motion spring physics on mouse position
- **Text scramble:** Section headings use `useTextScramble` hook -- characters randomize then resolve left-to-right when scrolled into view
- **Accessibility:** Skip-to-content link, ARIA roles on interactive cards, keyboard handlers (`Enter`/`Space`), focus management in modals
- **Security headers:** `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, and `Permissions-Policy` set in `next.config.ts`

## Static Assets

Images in `public/` are organized by section:

- `public/brand/` -- 35 images covering all project thumbnails and screenshots (avatars, CCS, storyATL, bartender, flexjet, pharma, documentary, healthcare, motion graphics)
- `public/reel/` -- 6 images (4 reel frames + 2 thumbnail versions)

YouTube thumbnails for AI Video cards are loaded directly from `img.youtube.com` (unoptimized).
