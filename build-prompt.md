# Nike Product Page Build Prompt

## Building the Product Page from Available Assets

To answer "how would someone with no context know what page to build?", here is the build prompt that guides the page construction:

---

## Build Instructions

### 1. Understand the Source Assets

From `Pegasus 43 size and stock list.json`:
- Available sizes: M 8, W 9.5
- Sold out sizes: M 10, W 11.5
- Low stock sizes: M 9, W 9
- Selected size: M 8

From `mobile-product-page-375px-plan.docx` (unavailable):
- Design spec for mobile viewport (375px width)
- Layout structure and styling requirements

### 2. Build the Mobile Product Page

**Create a mobile product page (375px width) with the following elements:**

1. **Hero Image Section**
   - Primary product image display
   - Image navigation/thumbnails
   - 360° view if available

2. **Product Details Section**
   - Product title/name
   - Price display
   - Product description/slogan
   - Color options (if applicable)

3. **Size Selection Section**
   - Render size buttons for all sizes from JSON
   - Apply button styles from `size-buttons.md`:
     - M 8: in_stock (default, or `picked` if starting as selected)
     - M 9: low_stock
     - M 10: sold_out
     - M 8: in_stock
     - W 9.5: in_stock
     - W 9: low_stock
     - W 11.5: sold_out

4. **Quantity Selector** (if applicable)
   - For selected size M 8 (in_stock, qty 1-10 available)

5. **Action Buttons**
   - Add to Cart (enabled for in_stock sizes)
   - Buy Now (enabled for in_stock sizes)
   - Wished/liked state indicator

6. **Additional Information**
   - Shipping details
   - Return policy
   - Product features/benefits

### 3. Interactive Behavior

- Clicking a size button:
  - Updates `picked` state to the selected size
  - Disables other size buttons
  - Updates quantity availability
  - Enables/disables action buttons based on availability

- Sold out sizes:
  - Cannot be clicked
  - Show visual disabled state

- Low stock sizes:
  - Clickable but show "LOW STOCK" warning

### 4. Visual Style Notes

- Use Nike brand colors (#B21E22 for red, #FFFFFF for clean)
- Mobile-first design, 375px viewport
- Clean, minimal aesthetic
- Large touch targets for buttons

---

## Reference Files

| File | Purpose |
|------|---------|
| `Pegasus 43 size and stock list.json` | Size availability data |
| `.gitignore` | Git ignore patterns |
| `README.md` | Project overview |
| `size-buttons.md` | Button styling guide |
| `build-prompt.md` | This file - build instructions |

---

## What to Do Next

1. If you can open `mobile-product-page-375px-plan.docx`, review the design specifications
2. Build the page using your preferred tech stack (React, Vue, HTML/CSS, etc.)
3. Implement the size button styles from `size-buttons.md`
4. Connect to the JSON data for real-time availability
5. Add the interactive behaviors described above