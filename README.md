https://fleet-iodine-voql7zp.tmp.now

# Nike: Size Run

Live Vercel URL: https://fleet-iodine-voql7zp.tmp.now

A mobile product page project for Nike size run data.

## Project Overview

This project implements the mobile product page (375px width) for the **Nike Pegasus 43** (Style HV7521-001, Black/White-Volt) under the Web Platform Slow 4G Mobile Check Profile.

- **Live URL**: https://fleet-iodine-voql7zp.tmp.now
- **Framework**: Next.js 16 (App Router)
- **Data Source**: `Pegasus Size and Stock Snapshot, 8 December 2026.json` (26 size options)
- **Performance Budget**: Enforced via `speed-budget.json` (Performance $\ge$ 90, CLS = 0, touch targets $\ge$ 44px)
- **Audit Reports**: Saved in `reports/lighthouse-mobile-report.html` and `lighthouse-report.json`

## Files

- `mobile-product-page-375px-plan.docx` - Mobile product page design specification
- `Pegasus Size and Stock Snapshot, 8 December 2026.json` - Active inventory data
- `Web Platform Slow 4G Mobile Check Profile.yaml` - Mobile Slow 4G check contract
- `speed-budget.json` - Launch check speed budget contract
- `NOTES.md` - Grid mover audit, Slow 4G trace analysis, and prompt decision log
- `phone-screenshot-size-selected.png` - 375px mobile phone screenshot with size selected and sold-out states
- `screenshots/` - Viewport and full-page mobile screenshots
- `products/pegasus-43-nextjs/` - Next.js project directory
