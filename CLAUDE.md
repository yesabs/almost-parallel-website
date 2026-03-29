Role: You are an expert Full-Stack Developer specializing in high-performance static websites with headless CMS integration.

Objective: Build a custom static website for "Almost Parallel," a studio site focused on a non-linear, image-led browsing experience. The site must be extremely fast, minimal, and animation-free.

Tech Stack & Environment:

Platform: Astro (static site generator) — ships pure HTML, zero JS by default.
CMS: Sanity (planned Phase 2) — structured content, hosted Studio UI for non-technical editing.
Hosting: Cloudflare Pages (planned) — free, unlimited bandwidth, global CDN.
Image CDN: Sanity built-in image pipeline (planned). Currently using picsum.photos placeholders.
Frontend: Vanilla JavaScript + CSS. No frameworks (React/Vue/etc).
Dev Server: `npm run dev` → localhost:4321
Project Location: `active/almost-parallel-website/site/`

1. Design System & Visual Identity

Font: Adelle Sans (studio font, self-hosted .otf files in /public/fonts/)
  - Light (300): body text, all general content
  - Book (400): logo (ALMOST PARALLEL), active state buttons, ABOUT link
  - Never use Bold/Semibold/Heavy for UI text — keep everything light and refined
  - Logo font size: 12px (same as everything else)
  - All text: 12px, weight 300, Adelle Sans Light

Background: #f0f0f0 (light warm gray)
Text Color: #1a1a1a (near-black)
Font Rendering: -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-rendering: optimizeLegibility;
Page Margins: 10px on all sides (--page-pad: 10px)

2. Header Layout (Fixed, Transparent)

Two-row structure on a 12-column grid:

Row 1:
  - Col 1-2: ALMOST (logo, clickable → home)
  - Col 3-4: PARALLEL (logo, clickable → home)
  - Col 5-6: Address (Carrer Santiago Apostol 69 / 08903 Barcelona / Spain)
  - Col 7: IG + (Instagram link + plus symbol)
  - Col 8-10: Description text ("This website is our digital archive...")
  - Col 12: ABOUT (right-aligned)

Row 2:
  - Col 1-2: (empty)
  - Col 3-4: [ LOOP ] [ GRID ] (inline, horizontal)
  - Col 5-6: Contact (email + phone, stacked)
  - Col 11-12: [ ENG ] [ ESP ] (inline, right-aligned)

On project pages: project name appears in header top-right (col 11-13) AND replaces footer-left text.

3. Button/Link States

- All buttons (LOOP, GRID, ENG, ESP) use same color and font-weight as body text (no opacity difference)
- Active state: italic (font-style: italic)
- Hover state: italic (font-style: italic) on ALL links and buttons globally
- No bold, no underline, no color change on hover — italic only

4. Footer (Fixed at Bottom)

- Left: "θ=€ (0<€<1)" (default) OR project name when on a project page
- Right: Live clock (HH:MM AM/PM CET format, updates every second)
- Same font/size/weight as everything else
- Fixed position, z-index 100

5. Scatter Layout (Loop/Random View — Home + Filter Pages)

- 16-column CSS grid for fine positional control
- Shows 12 images per page load (randomly selected from 60)
- Each image spans 3 of 16 columns (~18.75% viewport width)
- Images placed at deliberately irregular grid positions with varied vertical padding (40px–300px)
- 5 visual rows, 2-3 images per row — massive whitespace between
- Images default to grayscale (filter: grayscale(100%)), color on hover (0.3s transition)
- Image labels (A.01, A.02 etc.) right-aligned below each image, same font as body
- Scrollable page, content flows between fixed header and footer

6. Grid View (Parametro-Inspired)

- Activated by [ GRID ] button (works from any page)
- Each row = one image repeated N times across full width
- Repeat pattern cycles: [4, 3, 5, 2, 4, 3, 6, 2, 5, 3, 4, 3]
- Zero gaps between images, flex-wrap layout
- Images maintain natural aspect ratios
- Infinite scroll — rows clone when user nears bottom
- Grayscale with color on hover
- Full viewport overlay (position: fixed, z-index: 50)
- Header stays visible on top (z-index: 100)
- ESC key exits grid view

7. Looping Navigation (3-Level Click System)

Home (Level 0): Random 12 images → click any image
  ↓
Theme Filter (Level 1): Shows images with same Theme tag → click any image
  ↓
Color Filter (Level 2): Shows images with same Theme+Color → click any image
  ↓
Project Page (Level 3): If image has project → show project page. Click → back to Home.
  OR
Back to Home: If image has no project → return to Home random.

All filter/project pages use the same scatter layout. No filter text shown.

8. Project Pages

- Same scatter layout as home (16-col grid, irregular placement)
- Max 12 images from that project
- Project name appears in:
  - Header top-right (col 11-13, right-aligned)
  - Footer bottom-left (replaces default text)
- Click any image → loops back to home

Current projects (3): Casa Negra, Casa Luz, Pavilion BCN
Projects defined in: src/data/gallery.ts → `projects` array

9. Language Toggle (ENG/ESP)

- Uses data-en and data-es attributes on translatable elements
- JavaScript swaps textContent based on selected language
- Persists via localStorage ('ap-lang')
- Restores on page load
- To add translation: add data-en="English text" data-es="Spanish text" to any element

10. Data Structure (src/data/gallery.ts)

60 gallery items, each with:
  - id: string (A.01–A.60)
  - title: string
  - theme: Theme (concept|execution|interior|furniture|photography|objects|research|illustration|site)
  - color: Color (yellow|blue|red|green|violet|black)
  - project?: string (slug reference to projects array)
  - aspectRatio: string (3/4, 4/3, 1/1, 16/9, 2/3)
  - image: string (URL — currently picsum.photos placeholders)

3 projects: casa-negra, casa-luz, pavilion-bcn

11. File Structure

site/
├── src/
│   ├── layouts/Base.astro          # Main layout (header, footer, clock, lang toggle)
│   ├── components/GalleryCard.astro # Image card with grayscale/hover
│   ├── data/gallery.ts             # All 60 items + projects + types
│   └── pages/
│       ├── index.astro             # Home (scatter + grid views)
│       ├── about.astro             # About page
│       ├── filter/theme/[theme].astro     # Level 1 filter
│       ├── filter/color/[theme]/[color].astro  # Level 2 filter
│       └── project/[slug].astro    # Project pages
├── public/
│   ├── fonts/                      # Adelle Sans .otf files
│   └── styles/
│       ├── reset.css               # Reset + @font-face + intro animation
│       ├── layout.css              # Header, footer, scatter, grid, responsive
│       └── components.css          # Card styles
├── package.json
├── astro.config.mjs
└── tsconfig.json

12. User Preferences & Rules

- NEVER use bold/heavy font weights for UI — keep everything light (300) except logo (400)
- All interactive states use ITALIC only — no color change, no underline, no opacity
- Margins must be equal on all sides (currently 10px)
- No layout shift between pages (html overflow-y: scroll always)
- Images always grayscale by default, color on hover
- No filter/breadcrumb text on filtered pages — keep it clean
- Font size is 12px everywhere, no exceptions
- When adding new features, maintain the same visual language
- The website should feel like a quiet, refined digital archive
- Reference sites: falaatelier.com (whitespace), parametro.studio/blog (grid), estudioalem.com (header style)

13. Next Steps

- Phase 2: Connect Sanity CMS — define schemas, fetch content via GROQ queries
- Phase 3: Replace picsum.photos with real project images via Sanity
- Phase 4: Deploy to Cloudflare Pages + Sanity webhook for auto-rebuild
- Phase 5: About page content expansion
- Phase 6: SEO, meta tags, Open Graph images
