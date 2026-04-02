# Almost Parallel Website — Code Review
Date: 2026-03-29

## Summary
A well-structured, minimal Astro static site with clean visual intent; several correctness bugs around navigation state, null-safety, and filter page edge cases need fixing before production, plus a handful of SEO and accessibility gaps that should be resolved before Phase 4 deployment.

---

## Issues

### CORRECTNESS

- **[severity: high]** **Correctness — Navigation state desync on filter/project pages:**
  In `Base.astro`, the Grid/Loop button click handlers only fire when `!isHome`. But on filter and project pages, clicking `[ GRID ]` navigates to `/?view=grid`, which triggers `gridBtn.click()` via the `?view=grid` param handler in `index.astro`. However, `index.astro`'s `gridBtn.click()` assumes `scatter` and `grid` variables are non-null — they are only defined inside `index.astro`'s own `<script>`. On non-home pages, `Base.astro` has its own `gridBtn`/`loopBtn` listeners that navigate the user. The `[ LOOP ]` button on a filter page navigates to `/` (correct), but the `[ GRID ]` button on a filter page navigates to `/?view=grid` while also adding the active class — the active state of these buttons is set in `index.astro` only, so returning from a filter page to `/?view=grid` will open grid view correctly. This flow works but is fragile. If `Base.astro`'s button listeners ever conflict with `index.astro`'s listeners (both attached to the same DOM elements via separate `<script is:inline>` blocks on the home page), the home page ends up with *two* sets of event listeners on `gridBtn` and `loopBtn` — the one from `Base.astro` (which does nothing since `isHome` is true) and the one from `index.astro`. This is fine today, but the duplicated attachment is a latent bug if Base.astro's guard logic ever changes. **Fix:** Remove the `gridBtn`/`loopBtn` listeners from `Base.astro` entirely; let `index.astro` own all toggle logic. Add a data-attribute or class on `<body>` for non-home pages to drive the navigation redirect instead.

- **[severity: high]** **Correctness — Keydown handler references potentially-null variables:**
  In `index.astro` line 87:
  ```js
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && grid.style.display !== 'none') {
      loopBtn.click();
    }
  });
  ```
  `grid` and `loopBtn` are referenced inside the callback but could be null if the elements were somehow removed. More critically, this handler is registered unconditionally — the null-check guards (`if (grid)`) used elsewhere are not applied here. If `grid` is null (e.g., if the DOM changes), this throws. **Fix:** Wrap in `if (grid && loopBtn)` before registering the listener.

- **[severity: high]** **Correctness — `?view=grid` handler has no null guard:**
  In `index.astro` line 93:
  ```js
  if (new URLSearchParams(window.location.search).get('view') === 'grid') {
    gridBtn.click();
  ```
  `gridBtn` could be null. **Fix:** Add `if (gridBtn)` guard before `.click()`.

- **[severity: medium]** **Correctness — Filter page scatter layout with fewer than 12 items:**
  The `.ap-scatter` CSS positions items by `:nth-child(1)` through `:nth-child(12)`. If a theme+color combination (Level 2 filter) returns fewer than 12 items, the missing nth-child positions are simply unused — this is fine visually. However if only 1–2 items are returned, the scatter layout will look broken (item 1 at `padding-top: 40px`, item 2 at `padding-top: 180px` on the same grid row). Some theme+color combos in the data only have 1–2 items (e.g., `research + blue` has only A.08). **Fix:** Add a fallback CSS rule for `.ap-scatter` with very few items, or add a minimum-item guard in the filter pages before rendering the scatter layout.

- **[severity: medium]** **Correctness — Instagram handle mismatch:**
  `Base.astro` links to `https://instagram.com/almostparallel.studio` but `about.astro` links to `https://instagram.com/almost__parallel` (two underscores). These must resolve to the same account. Verify which handle is correct and make them consistent.

- **[severity: medium]** **Correctness — `Math.random()` sort at build time produces static output:**
  Every filter and project page uses `.sort(() => Math.random() - 0.5)` at build time in the frontmatter. Because Astro is a static site generator, this sort runs once at `astro build` and produces the same order on every page load — it is not random per visitor. The comment "randomly selected from 60" in `index.astro` is only true for the *first build*. `index.astro` also does this for both `scatterItems` and `gridItems`. The scatter view on the homepage will show the same 12 items in the same positions until the next build. **Fix:** Move the shuffle/slice logic to a client-side `<script>` that runs on page load, or accept that randomness is per-build and update the comment.

- **[severity: low]** **Correctness — `GalleryCard` renders a `<div>` as the image placeholder, not an `<img>`:**
  The card renders `<div class="ap-card__img" style="aspect-ratio:...; background-color:...;" />` — a colored placeholder div — while `item.image` (the picsum URL) is never used. The grid view in `index.astro` does use `<img src={item.image}>`, but the scatter view cards show only a color swatch. This is presumably intentional for Phase 1, but it means the `image` field in `GalleryItem` and the `p()` helper function in `gallery.ts` are entirely unused in the scatter view. **Note:** Mark this as a known placeholder. When real images arrive in Phase 3, the `<div>` must be replaced with `<img>`.

---

### READABILITY

- **[severity: low]** **Readability — `[color].astro` file is inside a `[theme]` directory:**
  The path is `filter/color/[theme]/[color].astro`. The directory is named `[theme]` but the segment represents a theme for the color filter, which is confusing when reading the filesystem. There is no conflict, but renaming the folder to something that makes the route obvious (e.g., keeping the path but adding a comment) would help. Non-blocking.

- **[severity: low]** **Readability — `ap-header__social` class referenced in `layout.css` but not in the HTML:**
  In `layout.css` line 386, `.ap-header__social` is listed in the responsive hide block. This class does not exist anywhere in `Base.astro`. It appears to be a leftover from an earlier iteration. **Fix:** Remove `.ap-header__social` from the media query.

---

### PERFORMANCE

- **[severity: medium]** **Performance — 60 `<img>` tags pre-rendered in grid view, all loaded at build time:**
  `index.astro` renders the full grid view (all 60 items × repeat count = 180–360 img elements) into the HTML on every page load, even when the user never clicks `[ GRID ]`. The grid is hidden with `display:none` but the browser still parses and — depending on browser behavior — may prefetch or request `loading="lazy"` images near the top. **Fix:** Lazily render the grid view only when the user clicks `[ GRID ]`, generating the DOM client-side. This also enables true per-visit randomness (fixing the build-time shuffle issue above).

- **[severity: low]** **Performance — Self-hosted fonts load 4 `.otf` files with no `preload`:**
  The `reset.css` defines four `@font-face` blocks for Adelle Sans. There is no `<link rel="preload">` for the primary weight (300 Light), so the font is discovered late — after CSS is parsed — causing a flash of unstyled text (FOUT) on first load. `font-display: swap` mitigates this but a preload hint would eliminate it. **Fix:** Add to `Base.astro` `<head>`:
  ```html
  <link rel="preload" href="/fonts/AdelleSans-Light.otf" as="font" type="font/otf" crossorigin />
  ```

---

### SECURITY

- **[severity: medium]** **Security — Instagram external link missing `rel="noopener noreferrer"`:**
  In `Base.astro` line 44: `<a href="https://instagram.com/almostparallel.studio" target="_blank">IG</a>` — no `rel` attribute. `target="_blank"` without `rel="noopener"` exposes the opener page to tab-napping attacks via `window.opener`. The `about.astro` link correctly has `rel="noopener"` but is missing `noreferrer`. **Fix:** Add `rel="noopener noreferrer"` to both external links.

- **[severity: low]** **Security — Phone number exposed in plain HTML:**
  `+34. 602 375 521` is rendered as static text in the header. This is a studio number so it is intentional, but it will be scraped by bots. Non-blocking for now, but consider encoding it if spam becomes an issue.

---

### ACCESSIBILITY

- **[severity: high]** **Accessibility — All gallery cards in scatter view have no `alt` text and are not keyboard-navigable:**
  The `.ap-card` divs are click targets but are `<div>` elements, not `<a>` or `<button>`. They are not in the tab order, have no `role`, and have no `aria-label`. A keyboard user cannot navigate the gallery. **Fix:** Wrap each card in an `<a href="/filter/theme/{item.theme}">` or a `<button>` with an `aria-label={item.title}`. At minimum, add `tabindex="0"` and a `role="button"` with a `keydown` handler.

- **[severity: high]** **Accessibility — Grid view images lack meaningful alt text context:**
  In `index.astro`, grid images use `alt={item.title}` (e.g., "Subterranean Hall") which is acceptable, but the surrounding context (theme, color, project) is invisible to screen readers. The entire grid is also a decorative/browsing pattern — if grid mode is purely decorative, `alt=""` with `aria-hidden="true"` on the container is more appropriate. Decide one way: either make grid images navigable (with full alt/role) or mark the container `aria-hidden="true"`.

- **[severity: medium]** **Accessibility — Language toggle buttons have no `aria-pressed` state:**
  `[ ENG ]` and `[ ESP ]` buttons convey active state only via `font-style: italic` — a purely visual cue. Screen readers cannot determine which language is active. **Fix:** Add `aria-pressed="true/false"` on each button and toggle it inside `setLang()`.

- **[severity: medium]** **Accessibility — `<main>` has no skip link:**
  With a fixed header that is always in the tab order, keyboard users must tab through all header elements before reaching content. **Fix:** Add a visually-hidden skip link as the first focusable element: `<a href="#site-content" class="skip-link">Skip to content</a>`.

- **[severity: low]** **Accessibility — Intro animation is not respecting `prefers-reduced-motion`:**
  The intro fade-in/out animation plays unconditionally. Users with vestibular disorders who have set `prefers-reduced-motion: reduce` will still see it. **Fix:** Add:
  ```css
  @media (prefers-reduced-motion: reduce) {
    .ap-intro { display: none; }
    .ap-site-content { opacity: 1 !important; }
  }
  ```

---

### SEO

- **[severity: high]** **SEO — No meta description on any page:**
  `Base.astro` only outputs a `<title>` tag. There is no `<meta name="description">`, no Open Graph tags, no `<link rel="canonical">`, and no `robots` meta. Search engines will auto-generate descriptions from page content, which for a mostly-image-and-code page may be empty or nonsensical. **Fix:** Add a `description` prop to `Base.astro`'s Props interface and render `<meta name="description" content={description}>`. Set a sensible default for pages that do not pass one.

- **[severity: medium]** **SEO — No `<meta name="robots">` or `sitemap.xml`:**
  Filter pages (`/filter/theme/*`, `/filter/color/*/*`) should likely be `noindex` — they are internal navigation artifacts, not canonical content. Without a robots directive, crawlers will index all 50+ generated filter permutations, diluting SEO authority. **Fix:** Add `<meta name="robots" content="noindex, follow">` to filter page layouts, and add `@astrojs/sitemap` to `astro.config.mjs`.

- **[severity: low]** **SEO — Filter/color page title format is raw data:**
  Page titles like `concept + black — Almost Parallel` expose internal data taxonomy to search engines and browser history. These pages should probably be `noindex` anyway (see above), but if they remain indexed, use human-readable titles.

---

### CSS

- **[severity: low]** **CSS — `.ap-card__img` has `object-fit: cover` but is a `<div>`, not an `<img>`:**
  In `components.css` line 6, `object-fit: cover` is declared on `.ap-card__img`. The element is a `<div>` with a `background-color` — `object-fit` has no effect on divs. This rule is dead code until the `<div>` is replaced with an `<img>`. **Fix:** Remove `object-fit: cover` from `.ap-card__img` for now; re-add when the element becomes an `<img>`.

- **[severity: low]** **CSS — `.ap-footer__left` and `.ap-footer__right` have `opacity: 1` declared explicitly:**
  Both rules set `opacity: 1`, which is the browser default. These are no-op declarations. Remove them.

- **[severity: low]** **CSS — No responsive breakpoints for the header on tablet/mobile:**
  The `@media (max-width: 1024px)` block hides address, social, and description but does not collapse the 12-col header grid for the remaining visible elements (ALMOST, PARALLEL, toggles, ABOUT, lang). On a 375px phone, two "ALMOST PARALLEL" logos in a 12-col grid will render at ~62px each — barely readable and potentially overlapping the lang buttons. **Fix:** Add a mobile header that stacks or simplifies the grid below 600px.

---

## Verdict
**NEEDS CHANGES** — Multiple high-severity correctness issues (null-safety in keydown, build-time randomness misrepresented as runtime, duplicate event listeners), two high-severity accessibility issues (keyboard navigation, screen reader support), and one high-severity SEO gap (missing meta descriptions) must be resolved. The security issue (missing `rel="noopener noreferrer"`) is a quick one-line fix that should go in immediately.
