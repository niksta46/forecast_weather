# Design System

## Purpose

This document defines the **visual design tokens** for the weather website project.

⚠️ **Stability Rule**

* This file is considered **frozen**
* It must be changed **only when explicitly instructed by the project owner**

---

## Color Palette

### Primary Colors

| Name | Hex | Usage |
|------|-----|-------|
| primary-50 | #EBF5FF | Lightest backgrounds |
| primary-100 | #D6EBFF | Card backgrounds |
| primary-200 | #ADD5FF | Borders, dividers |
| primary-300 | #85BFFF | Secondary elements |
| primary-400 | #5CA8FF | Active states |
| primary-500 | #338EFF | Primary buttons (default) |
| primary-600 | #297ACC | Primary buttons (hover) |
| primary-700 | #1F5C99 | Text on light backgrounds |
| primary-800 | #154766 | Headings |
| primary-900 | #0B3333 | Primary text |

### Weather Condition Colors

| Condition | Color Name | Hex |
|-----------|------------|-----|
| Sunny | sunny | #FCD34D |
| Cloudy | cloudy | #94A3B8 |
| Rainy | rainy | #60A5FA |
| Stormy | stormy | #6366F1 |
| Snowy | snowy | #E2E8F0 |
| Foggy | foggy | #CBD5E1 |

### Semantic Colors

| Name | Hex | Usage |
|------|-----|-------|
| success | #22C55E | Positive weather (warm, clear) |
| warning | #F59E0B | Alerts, severe weather |
| error | #EF4444 | Errors, extreme conditions |
| info | #3B82F6 | Information |

### Neutral Colors

| Name | Hex | Usage |
|------|-----|-------|
| white | #FFFFFF | Backgrounds |
| gray-50 | #F8FAFC | Page background |
| gray-100 | #F1F5F9 | Card backgrounds |
| gray-200 | #E2E8F0 | Borders |
| gray-300 | #CBD5E1 | Disabled states |
| gray-400 | #94A3B8 | Placeholder text |
| gray-500 | #64748B | Secondary text |
| gray-600 | #475569 | Body text |
| gray-700 | #334155 | Headings |
| gray-800 | #1E293B | Primary text |
| gray-900 | #0F172A | Darkest text |

---

## Typography

### Font Families

| Usage | Font | Fallback |
|-------|------|----------|
| Headings | Inter | system-ui, sans-serif |
| Body | Inter | system-ui, sans-serif |
| Mono/Data | JetBrains Mono | monospace |

### Font Sizes

| Name | Size | Line Height |
|------|------|--------------|
| xs | 0.75rem (12px) | 1rem |
| sm | 0.875rem (14px) | 1.25rem |
| base | 1rem (16px) | 1.5rem |
| lg | 1.125rem (18px) | 1.75rem |
| xl | 1.25rem (20px) | 1.75rem |
| 2xl | 1.5rem (24px) | 2rem |
| 3xl | 1.875rem (30px) | 2.25rem |
| 4xl | 2.25rem (36px) | 2.5rem |
| 5xl | 3rem (48px) | 1 |

---

## Spacing

Based on 4px grid system:

| Name | Value |
|------|-------|
| 0 | 0px |
| 1 | 4px |
| 2 | 8px |
| 3 | 12px |
| 4 | 16px |
| 5 | 20px |
| 6 | 24px |
| 8 | 32px |
| 10 | 40px |
| 12 | 48px |
| 16 | 64px |

---

## Border Radius

| Name | Value |
|------|-------|
| none | 0px |
| sm | 4px |
| DEFAULT | 8px |
| md | 12px |
| lg | 16px |
| xl | 24px |
| full | 9999px |

---

## Shadows

| Name | Value |
|------|-------|
| sm | 0 1px 2px 0 rgb(0 0 0 / 0.05) |
| DEFAULT | 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1) |
| md | 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1) |
| lg | 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1) |
| xl | 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1) |

---

## Weather Icons

Using inline SVG icons or a library like `lucide-react`:

| Weather | Icon Name |
|---------|-----------|
| Sunny/Clear | sun |
| Partly Cloudy | sun + cloud |
| Cloudy | cloud |
| Rainy | cloud-rain |
| Thunderstorm | cloud-lightning |
| Snowy | snowflake |
| Foggy | cloud-fog |
| Wind | wind |

---

## Component Guidelines

### Cards
- Background: white
- Border radius: DEFAULT (8px)
- Shadow: DEFAULT
- Padding: 6 (24px)

### Buttons
- Primary: primary-500 bg, white text
- Secondary: gray-100 bg, gray-700 text
- Border radius: DEFAULT
- Padding: 3 (12px) horizontal, 2 (8px) vertical

### Inputs
- Background: white
- Border: gray-200
- Border radius: DEFAULT
- Padding: 3 (12px)

---

## Responsive Breakpoints

| Name | Min Width | Max Width |
|------|-----------|-----------|
| sm | 640px | - |
| md | 768px | - |
| lg | 1024px | - |
| xl | 1280px | - |
| 2xl | 1536px | - |

---

## Implementation

Design tokens are implemented via:
1. Tailwind config (`tailwind.config.js`)
2. CSS custom properties in `src/styles/globals.css`
3. Reusable component primitives in `components/common/`
