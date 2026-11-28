# Nike Product Page Build Prompt

## Build Instructions

Create a **375px mobile product page as a Next.js project** using:
- @mobile-product-page-375px-plan.docx (design spec)
- Pegasus 43 size and stock list.json (sizes & stock data)

### Implementation Requirements

1. **Pull sizes and stock** from the JSON data
2. **Thumb-accessible size buttons**
   - Grey out sold-out options
3. **Placeholder sections** for images, text, buttons (prevents layout shift)
4. **Run on local server** to test the page

### Size Button States

| Size | Status | Visual |
|------|--------|--------|
| M 4 | low_stock | Amber/gold styling |
| M 4.5 - M 8.5 | in_stock | White background, grey border |
| M 9 - M 9.5 | low_stock | Amber/gold styling |
| M 10 | sold_out | Gray disabled, pointer not allowed |
| M 10.5 - M 15.5 | in_stock | White background, grey border |
| M 15.5, M 16 | sold_out | Gray disabled |

---

## Reference Files

| File | Purpose |
|------|---------|
| `Pegasus 43 size and stock list.json` | Source data with 26 size options |
| `size-buttons.md` | Button styling guide |
| `build-prompt.md` | This file - exact build instructions |