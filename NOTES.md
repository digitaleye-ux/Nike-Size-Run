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

### Key Trace & Audit Prompt
> *"Open localhost:3000 in Chrome, then enable 4x CPU throttling, slow 4G (150 ms round trip, 1638.4 Kbps). Record a performance trace while the page loads and while you scroll down. Then tell me the frame rate, and list any long tasks and what's causing them. Test it on a phone viewport (375×812 CSS px at 3x density). Tell me which elements are causing the layout shift and let me know about the frame rates and long tasks."*

- **What was checked**:
  - Emulated Slow 4G (`rttMs: 150`, `throughputKbps: 1638.4`), 4x CPU slowdown, and viewport `375 × 812` at `3x` density with touch enabled via Chrome DevTools MCP.
  - Recorded a full navigation trace (`NAVIGATION_0`) covering cold reload and vertical scroll.
  - Inspected LCP breakdown (`1,536 ms`), frame rates during scrolling (`~120 FPS`, `8.19 ms` average frame time), long tasks (`0` long tasks over 50 ms), and layout shift score (`CLS = 0.000`).
- **What was changed**:
  - Locked the price container to `min-height: 32px` and set explicit line-height on `<p data-testid="price">`.
  - Added `width={375}`, `height={375}`, and `aspectRatio: '1 / 1'` directly to the hero `<img>`.
  - Added all five required contract test IDs (`main-photo`, `price`, `size-grid`, `size-button`, `size-button-sold-out`).
  - Created root `speed-budget.json` strictly enforcing `performance_score_min: 90`, `size_grid_shift_px_max: 0`, and `size_button_min_px: 44`.
- **What was rejected**:
  - *Rejected client-only data fetching*: Loading sizes solely through `fetch('/sizes.json')` caused visible content popping and layout shifts; rejected in favor of static pre-hydration.
  - *Rejected vertical-only wrapping for size buttons*: Wrapping all 26 buttons vertically pushed the Add to Bag and Buy Now action buttons below the fold; rejected in favor of a 2-row horizontal scroll container holding the first 7–8 sizes above the fold.
  - *Rejected hiding sold-out sizes*: Hiding sold-out options would alter the grid layout; kept all 4 sold-out sizes (`M 3.5`, `M 10`, `M 15.5`, `M 16`) rendered at full 84 × 44 px with `disabled` and `cursor: not-allowed`.

---

## 3. Touch Target & Sold-Out Verification Summary

- **Total Buttons**: 26
- **Dimensions**: All 26 buttons measure `84px` wide × `44px` high (Target Area: 3,696 px² ≥ 1,936 px² required by WCAG 2.1 AAA).
- **Sold-Out Handling**: Marked with `[data-testid="size-button-sold-out"]`, disabled native state, `aria-disabled="true"`, muted styling (`#F3F4F6`), and `"SOLD OUT ⛔"` badge.

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
  - Live Vercel Deployment: `https://fleet-iodine-voql7zp.tmp.now` (Claim link: `https://vercel.com/claim-deployment?code=9fdb3026-20e0-438d-a550-cb23fd841cbf`).
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
