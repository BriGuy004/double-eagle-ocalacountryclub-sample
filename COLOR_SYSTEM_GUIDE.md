# White-Label Color System Guide

## Overview
When you switch clubs in the admin/golf page, the entire marketplace dynamically updates to use that club's colors. Here's what each color controls:

## Color Tokens

### 1. **PRIMARY COLOR** (`--primary`)
**Uses:** Main brand elements and navigation
- Navigation category buttons (Golf, Lifestyle, Dining, etc.)
- Primary buttons throughout the app
- Active states and selections
- Category selectors
- Main interactive elements

**Example locations:**
- Home page: All category navigation buttons
- Golf/Lifestyle/etc pages: Category selector active state
- Buttons with `variant="default"` in components

---

### 2. **PRIMARY GLOW COLOR** (`--primary-glow`)
**Uses:** Subtle highlights and hover states
- Hover effects on primary elements
- Secondary brand accents
- Subtle gradients for depth
- Focus states

**Example locations:**
- Button hover states
- Card highlights
- Gradient overlays

---

### 3. **ACCENT COLOR** (`--accent`)
**Uses:** Call-to-action elements and highlights
- "Account" button on home page
- Important action buttons
- Focus rings on form inputs
- Notification badges
- CTAs like "Book Now" buttons

**Example locations:**
- Home page: "Account" button (top right)
- RedemptionPage: "Book Now" button
- Form input focus states
- Important notifications

---

## How It Works

1. **Admin switches club** → ClubAdmin page sets active brand via `setActiveBrand(clubId)`
2. **BrandContext updates** → `applyBrandStyles()` applies CSS variables to `:root`
3. **All pages re-render** → Components automatically use new color tokens
4. **Smart text colors** → System calculates if text should be black/white based on background luminance

---

## Current Implementation

### Files that apply the theme:
- `src/contexts/BrandContext.tsx` - Applies colors globally via CSS variables
- `src/contexts/ClubThemeProvider.tsx` - Alternative wrapper for individual pages

### CSS Variables set:
```css
--primary: [club's primary_color]
--primary-glow: [club's primary_glow_color]  
--accent: [club's accent_color]
--primary-foreground: [auto-calculated text color]
--accent-foreground: [auto-calculated text color]
--ring: [matches accent for focus rings]
--gradient-premium: [gradient using primary]
--gradient-card: [gradient using primary]
```

### Components using these colors:
- `src/pages/Home.tsx` - Header, navigation buttons, Account button
- `src/components/Header.tsx` - Top navigation
- `src/components/CategorySelector.tsx` - Category pills
- `src/components/ui/button.tsx` - All button variants
- All marketplace pages (Golf, Dining, Hotels, etc.)

---

## Troubleshooting

If colors aren't updating:
1. Check browser console for "Brand styles applied" log
2. Inspect element and verify CSS variables on `:root`
3. Ensure club has valid HSL colors in database (format: "38 70% 15%")
4. Check that `is_active` is properly set in database
5. Try hard refresh (Ctrl+Shift+R)
