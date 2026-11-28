# Web Platform Performance Notes & Grid Mover Audit

**Project**: Nike Pegasus 43 Mobile Product Page (`nike-pegasus-phone-page`)  
**Style Code**: HV7521-001 (Black/White-Volt)  
**Profile Contract**: `Web Platform Slow 4G Mobile Check Profile.yaml`  
**Test Environment**: 375 × 812 CSS px at 3x pixel density, 4x CPU slowdown, Slow 4G (150 ms RTT, 1638.4 Kbps)

---

## 1. Grid Mover Audit (Slow 4G Trace vs. Fixes)

The size grid (`[data-testid="size-grid"]`) is located directly above the fold. Any late-arriving asset, unreserved container, or font swap above it shifts the grid vertically, violating the `size_grid_shift_px_max: 0` launch gate.

| Grid Mover Element | Selector | Pre-Fix Root Cause (Slow 4G Trace) | Implemented Fix | Vertical Movement After Fix |
| :--- | :--- | :--- | :--- | :--- |
| **Main Product Photo** | `[data-testid="main-photo"]` | The `<img>` tag initially had no explicit `width`, `height`, or CSS `aspect-ratio`. Over Slow 4G (562.5 ms request latency), the image container would collapse before the SVG loaded, causing the size grid to shift downward upon download completion. | Bound the container to an exact `375px × 375px` square (`aspect-ratio: 1/1`) with `#f5f5f7` background. Added explicit `width={375}`, `height={375}`, and `aspectRatio: '1 / 1'` with `object-fit: contain` directly on the `<img>` tag. | **`0 px`** *(CLS = 0.000)* |
| **Price & Installment Block** | `[data-testid="price"]` | Over Slow 4G, `geist-latin.woff2` font streaming delayed text rendering. The price container had no set `min-height` or explicit `line-height`, causing vertical font metric shifts (FOUT) when the web font swapped in. | Added an explicit `min-height: 32px` on the price container matching the plan budget. Set `line-height: 28px` and `min-height: 28px` directly on `<p data-testid="price">`. | **`0 px`** *(CLS = 0.000)* |
| **Product Title & Subtitle** | `h1`, `p` | Subtitle and title text lacked fixed line heights, resulting in micro-shifts when fonts rendered over the throttled connection. | Constrained H1 with `line-height: 1.2`, `margin: 0`, and fixed vertical section padding (`16px 16px 4px`). | **`0 px`** *(CLS = 0.000)* |
| **Size Inventory Hydration** | `[data-testid="size-grid"]` | Client-side `fetch('/sizes.json')` left the size container empty during initial paint, creating a massive layout shift once the 26 buttons rendered. | Pre-hydrated `INITIAL_SIZES` static inventory directly into initial component state, rendering the full 2-row grid at `t = 0` with zero client-fetch layout shift. | **`0 px`** *(CLS = 0.000)* |

---

## 2. Key Prompts & Engineering Log

### Key Prompts
1. **Trace & Layout Shift Audit Prompt**:
   > *"Open localhost:3000 in Chrome, then enable 4x CPU throttling, slow 4G (150 ms round trip, 1638.4 Kbps). Record a performance trace while the page loads and while you scroll down. Then tell me the frame rate, and list any long tasks and what's causing them. Test it on a phone viewport (375×812 CSS px at 3x density). Tell me which elements are causing the layout shift and let me know about the frame rates and long tasks."*

2. **Price Min-Height & Font Space Holding Prompt**:
   > *"give the price element a set min-height, so its box stays the same size whether the font has loaded or not. The font needs its space held too, and the sizes need to be checked for touch size and sold-out handling."*

3. **Stock Snapshot & Sold-Out Handling Prompt**:
   > *"Open the Pegasus Size and Stock Snapshot from 8 December. What does it show about stock across the 26 sizes? Host my current GitHub repo on Vercel and integrate mobile Lighthouse on it. Use Pegasus Size and Stock Snapshot, 8 December 2026. The sold-out sizes buttons should be greyed out or disabled. Run Lighthouse on the live URL, save the report in the repo, and give me the live URL back."*

- **What was checked**:
  - Emulated Slow 4G (`rttMs: 150`, `throughputKbps: 1638.4`), 4x CPU slowdown, and viewport `375 × 812` at `3x` density with touch enabled via Chrome DevTools MCP.
  - Recorded a full navigation trace (`NAVIGATION_0`) covering cold reload and vertical scroll.
  - Inspected LCP breakdown (`1,536 ms`), frame rates during scrolling (`~120 FPS`, `8.19 ms` average frame time), long tasks (`0` long tasks over 50 ms), and layout shift score (`CLS = 0.000`).
- **What was changed**:
  - Locked the price container to `min-height: 32px` and set explicit line-height on `<p data-testid="price">` so its box stays identical whether the font is loaded or loading.
  - Added `width={375}`, `height={375}`, and `aspectRatio: '1 / 1'` directly to the hero `<img>`.
  - Added all five required contract test IDs (`main-photo`, `price`, `size-grid`, `size-button`, `size-button-sold-out`).
  - Created root `speed-budget.json` strictly enforcing `performance_score_min: 90`, `size_grid_shift_px_max: 0`, and `size_button_min_px: 44`.
- **What was rejected**:
  - *Rejected client-only data fetching*: Loading sizes solely through `fetch('/sizes.json')` caused visible content popping and layout shifts; rejected in favor of static pre-hydration.
  - *Rejected vertical-only wrapping for size buttons*: Wrapping all 26 buttons vertically pushed the Add to Bag and Buy Now action buttons below the fold; rejected in favor of a 2-row horizontal scroll container holding the first 7–8 sizes above the fold.
  - *Rejected hiding sold-out sizes*: Hiding sold-out options would alter the grid layout; kept all sold-out sizes rendered at full 84 × 44 px with `disabled` and `cursor: not-allowed`.

---

## 3. Touch Target & Sold-Out Matching Summary

### How Sold-Out Sizes Were Matched
- **Matching Rule**: We parsed `Pegasus Size and Stock Snapshot, 8 December 2026.json` across all 26 size items and matched sizes where `stock_quantity === 0`, `in_stock === false`, or `stock_status === 'sold_out'`.
- **Matched Inventory**:
  - **9 Sold-Out Sizes**: `M 4.5 / W 6`, `M 6 / W 7.5`, `M 9 / W 10.5`, `M 10 / W 11.5`, `M 11.5 / W 13`, `M 14 / W 15.5`, `M 15 / W 16.5`, `M 15.5 / W 17`, `M 16 / W 17.5`.
  - **7 Low-Stock Sizes** (1–5 units left, amber warning badge): `M 3.5`, `M 4`, `M 5`, `M 8.5`, `M 13`, `M 13.5`, `M 14.5`.
  - **10 In-Stock Sizes** (White standard button): `M 5.5`, `M 6.5`, `M 7`, `M 7.5`, `M 8`, `M 9.5`, `M 10.5`, `M 11`, `M 12`, `M 12.5`.
- **UI & Accessibility Implementation**:
  - Each sold-out button receives `data-testid="size-button-sold-out"` (replacing `size-button`), HTML `disabled={true}`, and `aria-disabled="true"`.
  - Visual styling uses disabled grey background (`#F3F4F6`), subtle border (`#E5E7EB`), muted text (`#6B7280`), `cursor: not-allowed`, and a distinct `"SOLD OUT ⛔"` status label.
  - Clicks and keyboard selections are completely prevented, ensuring no sold-out size can be added to cart.
- **Touch Target Dimensions**: All 26 size buttons strictly adhere to `min-width: 84px` and `min-height: 44px` (touch area 3,696 px² > WCAG minimum 1,936 px²).

---

## 4. Mobile Phone Screenshot (Size Selected)

A mobile phone screenshot emulating an iPhone 375 × 812 CSS px viewport at 3x density with touch enabled, showing size **`M 8 / W 9.5`** actively selected and sold-out sizes greyed out and disabled:

- **Screenshot File**: [`phone-screenshot-size-selected.png`](./phone-screenshot-size-selected.png) (and [`screenshots/phone-screenshot-size-selected.png`](./screenshots/phone-screenshot-size-selected.png))
- **Full-Page Screenshot**: [`screenshots/phone-screenshot-full.png`](./screenshots/phone-screenshot-full.png)

---

## 4. 8 December Stock Snapshot & Mobile Lighthouse Audit

- **Data Source**: Swapped inventory to `Pegasus Size and Stock Snapshot, 8 December 2026.json`.
- **Inventory Changes**:
  - **9 Sold-Out Sizes** (Disabled, grayed out with `SOLD OUT ⛔`): `M 4.5 / W 6`, `M 6 / W 7.5`, `M 9 / W 10.5`, `M 10 / W 11.5`, `M 11.5 / W 13`, `M 14 / W 15.5`, `M 15 / W 16.5`, `M 15.5 / W 17`, `M 16 / W 17.5`.
  - **7 Low-Stock Sizes** (Amber warning, `LOW STOCK` label): `M 3.5 / W 5`, `M 4 / W 5.5`, `M 5 / W 6.5`, `M 8.5 / W 10`, `M 13 / W 14.5`, `M 13.5 / W 15`, `M 14.5 / W 16`.
  - **10 In-Stock Sizes** (`in_stock` white styling): `M 5.5 / W 7`, `M 6.5 / W 8`, `M 7 / W 8.5`, `M 7.5 / W 9`, `M 8 / W 9.5`, `M 9.5 / W 11`, `M 10.5 / W 12`, `M 11 / W 12.5`, `M 12 / W 13.5`, `M 12.5 / W 14`.
- **Vercel & CI Integration**:
  - Configured root `vercel.json` and root `package.json` for mono-repo builds.
  - Added `.github/workflows/lighthouse-ci.yml` and `.lighthouserc.json` enforcing the Slow 4G profile on every push.
  - Live Vercel Deployment: `https://nike-size-run-mu.vercel.app` (connected to `digitaleye-ux/Nike-Size-Run` on Vercel).
- **Mobile Lighthouse Audit Results (Slow 4G Throttling)**:
  - **Performance Score**: **`99 / 100`** *(passes `performance_score_min: 90`)*
  - **Cumulative Layout Shift (CLS)**: **`0.000`** *(passes `size_grid_shift_px_max: 0`)*
  - **First Contentful Paint (FCP)**: **`0.8 s`**
  - **Largest Contentful Paint (LCP)**: **`2.0 s`**
  - **Total Blocking Time (TBT)**: **`70 ms`**
  - **Speed Index**: **`1.1 s`**
  - **Best Practices**: **`100`**
  - **SEO**: **`100`**
  - **Full Reports Saved**: [`lighthouse-report.json`](./lighthouse-report.json) and [`reports/lighthouse-mobile-report.html`](./reports/lighthouse-mobile-report.html).

---

## 5. `/emil-unslop-design` Redesign Pass

Applied the `/emil-unslop-design` workflow (plus `emil-color`, `emil-typography`, `emil-surfaces`, `emil-mobile-native`, and `emil-touch-and-accessibility`):

- **What was stripped**:
  - Removed the top gray shipping banner above the gallery, floating `"JUST IN"` / `"VOLT GLOW"` badges over the product photo, and the noisy swipe hint caption below the size grid.
  - Removed all generic `#0071e3` blue CTAs, `#FE8500` orange shadow glows, `#ffd700` review stars, all emojis (`⛔`, `⚠️`, `⚡`, `✓`, `★★★★☆`), and fabricated customer reviews (`sarah.m@example.com`, `john.d@example.com`).
  - Replaced the competing twin 50/50 CTA buttons with one clear primary Obsidian pill CTA (`Add to Bag`).
  - Removed `maximumScale: 1` / `userScalable: false` WCAG zoom lockouts from `layout.tsx` viewport metadata.
- **Product-derived point of view**:
  - **Real Studio Product Photography**: Replaced vector shoe SVGs with two 750×750 `.webp` studio photographs (`pegasus-43-side.webp` at 23 KB and `pegasus-43-top.webp` at 28 KB) on a matching `--surface-studio` backdrop with `1px` inset `outline-black/10`.
  - **OKLCH Black / White / Volt Palette**: Derived `--surface-*`, `--ink-*`, `--border-hairline` (`0.5px` on retina), and `--accent-volt` (`oklch(0.905 0.21 124)`) directly from the Black/White-Volt shoe.
  - **Typography**: Self-hosted `Space Grotesk` (`next/font/google`, `.woff2`) for display/price hierarchy with `font-synthesis: none` and `tabular-nums`, keeping `<p data-testid="price">` locked at `min-height: 28px; line-height: 28px` inside a `min-height: 32px` wrapper.
  - **Mobile-Native & Touch**: 108 × 52 px single-line size buttons (`>= 44px` hit targets), `touch-action: manipulation`, `-webkit-tap-highlight-color: transparent`, `:hover` gated behind `@media (hover: hover) and (pointer: fine)`, `:active` press scale (`0.98`), and an accessible `role="dialog"` Size Guide modal with Escape & focus restoration.
- **Updated Slow 4G Mobile Lighthouse Results**:
  - **Performance**: **`99 / 100`** | **Accessibility**: **`96 / 100`** | **Best Practices**: **`100 / 100`** | **SEO**: **`100 / 100`**
  - **FCP**: **`0.8 s`** | **LCP**: **`2.3 s`** | **TBT**: **`50 ms`** | **CLS**: **`0.000`** | **Speed Index**: **`1.0 s`**
