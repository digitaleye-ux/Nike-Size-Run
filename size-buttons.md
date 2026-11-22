# Nike Size Button Style Guide

This document describes the visual appearance of size buttons for different states.

## Size Button States

### `in_stock` (Available)
**Default state** for available sizes.

```text
┌─────────────────┐
│  M 8            │
│                 │
└─────────────────┘
```
- **Background:** White (#FFFFFF)
- **Border:** 1px solid #D1D5DB (Light gray)
- **Text Color:** #1F2937 (Dark gray/black)
- **Font:** Medium weight, 14px
- **Cursor:** Pointer

---

### `low_stock` (Limited Availability)
For sizes with very limited stock (typically ≤ 5 remaining).

```text
┌─────────────────┐
│  M 8            │
│  LOW STOCK      │
└─────────────────┘
```
- **Background:** #FFFBEB (Light amber)
- **Border:** 1px solid #FCD34D (Amber/gold)
- **Text Color:** #92400E (Brown-amber)
- **Bottom Label:** "LOW STOCK" in small text (10px)
- **Font:** Medium weight for size, regular for label
- **Cursor:** Pointer

---

### `sold_out` (Unavailable)
For sizes that are completely out of stock.

```text
┌─────────────────┐
│  M 10           │
│  SOLD OUT       │
│  ⛔             │
└─────────────────┘
```
- **Background:** #F3F4F6 (Light gray, disabled)
- **Border:** 1px solid #E5E7EB (Gray, disabled)
- **Text Color:** #6B7280 (Gray, disabled)
- **Overlay Icon:** Lock/sold-out symbol (⚫ or ⛔)
- **Bottom Label:** "SOLD OUT" in small text (10px)
- **Font:** Medium weight for size, regular for label
- **Cursor:** Not-allowed (disabled)

---

### `picked` (Selected/Chosen)
When user selects this size as their choice.

```text
┌───────────────────────────┐
│  M 8                     │
│  ★ SELECTED              │
└───────────────────────────┘
```
- **Background:** #FE8500 (Nike orange)
- **Border:** 1px solid #FE8500 (Nike orange)
- **Text Color:** #FFFFFF (White)
- **Bottom Label:** "SELECTED" or checkmark (✓) in small text (10px)
- **Font:** Medium weight, 14px
- **Cursor:** Pointer
- **Shadow:** Optional subtle shadow for depth

---

## Combined States

### `picked + in_stock`
The selected size should show as picked styling (orange background).

```text
┌───────────────────────────┐
│  M 8                     │
│                          │
└───────────────────────────┘
```

### `picked + sold_out`
A picked sold-out size is still unselectable:

```text
┌─────────────────┐
│  M 10           │
│  ⛔ SOLD OUT   │
└─────────────────┘
```
- **Background:** Gray disabled (cannot override sold_out state)
- **Opacity:** 0.7 (visually de-emphasized)
- **Cursor:** Not-allowed

---

## Responsive Considerations

### Mobile (375px viewport)
- Button width: 100% of container (touch-friendly)
- Minimum width: 80px
- Height: 40px
- Corner radius: 6px

### Tablet/Desktop
- Button width: Auto-fit to content
- Padding: 12px horizontal, 8px vertical
- Corner radius: 9999px (fully rounded)

---

## Accessibility Notes

- **Color contrast** meets WCAG 2.1 AA standards
- **Sold out buttons:** Add `aria-disabled="true"`
- **Picked state:** Add `aria-selected="true"`
- **Screen readers:** Announce "Size M 8, in stock" or "Size M 8, sold out"