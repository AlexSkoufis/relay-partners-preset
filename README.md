# Relay Partners — Exit Planning Preset

A confident, dark-and-gold homepage for a **fictional** exit planning and business succession firm. Slate navy, baton gold and warm paper; a grotesque display face with serif italic accents. The value-roadmap chart, ebook cover and baton logo are drawn in code; portraits and the path photo are Unsplash placeholders.

Next.js 16 (static export) · GSAP 3 + ScrollTrigger · Lenis · CSS Modules. No UI libraries.

```bash
npm install
npm run dev
npm run build     # static site in ./out
```

## Sections

| Section | What it does |
|---|---|
| Hero | "Build value. Exit on your terms." with credential ticks and an illustrated value roadmap: a line rising through milestones against a flat "without a plan" line. |
| Marquee | Services and outcomes on a gold band. |
| Pain points | Three warning signs owners recognise. |
| Services | Exit planning, valuation and value creation. |
| Paths | Five exit routes (family, insiders, third party, shareholders, undecided) as tabs. |
| Process | Four steps from a confidential conversation to a finished transition. |
| Journey | Full-bleed path photo with a pull quote and three count-up figures. |
| Team | Founder portrait with name badge, designations, bio and two team members. |
| Testimonials | Carousel of owner quotes. |
| Ebook | Lead magnet with a cover drawn in CSS. |
| FAQ | Accordion. |
| Call to action and footer | Booking prompt with phone and email cards. |

## Re-skin

- **Copy & data**: `content/site.json` (brand, navigation, contact, footer) and `content/home.json` (every section).
- **Logo**: `components/Logo.js` (two offset batons and the wordmark, drawn in `currentColor`) and `app/icon.svg`. The CTA background motif is in `components/home/ContactCta.js`.
- **Photos**: `public/images/` (credits in `public/images/CREDITS.md`).
- **Colour**: tokens at the top of `app/globals.css` (`--navy*`, `--blue`, `--green*`, `--ink`, `--paper*`). `--green` holds the gold accent; the token names are kept from the base design.
- **Type**: `app/layout.js`.

## Accessibility & motion

`prefers-reduced-motion` stops the roadmap drawing, marquee, parallax and count-ups. Tabs, accordion, carousel and menus are keyboard-operable.

## Demo content

Relay Partners, its people, quotes, figures and email (`.example`) are fictional, and the phone number is a placeholder. A real firm must replace them before launch.
