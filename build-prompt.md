# Nike Product Page Build Prompt

## Build Instructions

Create a **375px mobile product page as a Next.js project** using:
- @mobile-product-page-375px-plan.docx (design spec)
- `Pegasus Size and Stock Snapshot, 8 December 2026.json` (and synced `Pegasus 43 size and stock list.json`)

### Implementation Requirements

1. **Pull sizes and stock** from the JSON data (26 sizes: 9 sold out, 7 low stock, 10 in stock)
2. **Thumb-accessible size buttons** (`>= 44px`)
   - Grey out and disable sold-out options (`data-testid="size-button-sold-out"`)
3. **Placeholder sections** for images, text, buttons (prevents layout shift)
4. **Run on local server** to test the page

### Size Button States (8 December 2026 Snapshot)

| Size | Status | Visual |
|------|--------|--------|
| M 3.5, M 4, M 5 | low_stock | Few left indicator (1, 2, 4 remaining) |
| M 4.5, M 6 | sold_out | Gray disabled, line-through, pointer not allowed |
| M 5.5, M 6.5 - M 8 | in_stock | White background, hairline border |
| M 8.5 | low_stock | Few left indicator (3 remaining) |
| M 9, M 10, M 11.5 | sold_out | Gray disabled, line-through, pointer not allowed |
| M 9.5, M 10.5 - M 11, M 12 - M 12.5 | in_stock | White background, hairline border |
| M 13 - M 13.5, M 14.5 | low_stock | Few left indicator (5, 2, 3 remaining) |
| M 14, M 15 - M 16 | sold_out | Gray disabled, line-through, pointer not allowed |

---

## Reference Files

| File | Purpose |
|------|---------|
| `Pegasus 43 size and stock list.json` | Source data with 26 size options |
| `size-buttons.md` | Button styling guide |
| `build-prompt.md` | This file - exact build instructions |