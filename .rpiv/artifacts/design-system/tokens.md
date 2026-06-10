# Design Tokens — Developer Portfolio

> Generated for Tailwind CSS v4. All tokens are defined in `src/app/globals.css` via `@theme inline`.

---

## Color Palette

### Neutral Gray (10-step)

| Token | Value | Usage |
|-------|-------|-------|
| `neutral-50` | `#FAFAFA` | Light surface, near-white |
| `neutral-100` | `#F5F5F5` | Light surface secondary, hover state |
| `neutral-200` | `#E5E5E5` | Borders (light), separators |
| `neutral-300` | `#D4D4D4` | Borders (accent), disabled text |
| `neutral-400` | `#A3A3A3` | Muted text (dark bg) |
| `neutral-500` | `#737373` | Secondary text |
| `neutral-600` | `#525252` | Body text (dark mode) |
| `neutral-700` | `#404040` | Secondary surface (dark) |
| `neutral-800` | `#262626` | Dark surface, borders (dark) |
| `neutral-900` | `#171717` | Body text (light), dark surface secondary |
| `neutral-950` | `#0A0A0A` | Dark background |

### Blue Accent

| Token | Value |
|-------|-------|
| `accent-50` | `#EFF6FF` |
| `accent-100` | `#DBEAFE` |
| `accent-200` | `#BFDBFE` |
| `accent-300` | `#93C5FD` |
| `accent-400` | `#60A5FA` |
| `accent-500` | `#3B82F6` |
| `accent-600` | `#2563EB` |
| `accent-700` | `#1D4ED8` |
| `accent-800` | `#1E40AF` |
| `accent-900` | `#1E3A8A` |
| `accent-950` | `#172554` |

### Semantic Colors

| Role | 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 |
|------|----|-----|-----|-----|-----|-----|-----|-----|
| **Success** | `#F0FDF4` | `#DCFCE7` | `#BBF7D0` | `#86EFAC` | `#4ADE80` | `#22C55E` | `#16A34A` | `#15803D` |
| **Warning** | `#FFFBEB` | `#FEF3C7` | `#FDE68A` | `#FCD34D` | `#FBBF24` | `#F59E0B` | `#D97706` | `#B45309` |
| **Error** | `#FEF2F2` | `#FEE2E2` | `#FECACA` | `#FCA5A5` | `#F87171` | `#EF4444` | `#DC2626` | `#B91C1C` |

---

## Typography

| Property | Value | Notes |
|----------|-------|-------|
| Font Sans | `Geist`, `--font-geist-sans` | Primary typeface |
| Font Mono | `Geist Mono`, `--font-geist-mono` | Code blocks, technical text |
| Scale | Tailwind v4 defaults | `text-xs` through `text-9xl` |
| Headings | `font-bold tracking-tight` | Used on h2/h3 |
| Body | `text-base leading-relaxed` | Default paragraph |

---

## Spacing

Uses Tailwind v4 default spacing scale (4px base): `0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96`.

Section padding: `px-4 py-16 sm:py-24`

---

## Breakpoints

| Token | Width | Usage |
|-------|-------|-------|
| `sm` | `40rem` (640px) | Tablet landscape |
| `md` | `48rem` (768px) | Tablet portrait |
| `lg` | `64rem` (1024px) | Desktop |
| `xl` | `80rem` (1280px) | Wide desktop |
| `2xl` | `96rem` (1536px) | Max container |

---

## Shadows

| Token | Light |
|-------|-------|
| `shadow-xs` | `0 1px 2px 0 rgb(0 0 0 / 0.05)` |
| `shadow-sm` | `0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)` |
| `shadow-md` | `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)` |
| `shadow-lg` | `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)` |
| `shadow-xl` | `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)` |

Dark mode shadows use `rgb(0 0 0 / 0.4)` for more depth on dark backgrounds.

---

## Border Radius

| Token | Value |
|-------|-------|
| `radius-sm` | `0.375rem` (6px) |
| `radius-md` | `0.5rem` (8px) |
| `radius-lg` | `0.75rem` (12px) |
| `radius-xl` | `1rem` (16px) |

---

## Animation

### Timing

| Token | Value |
|-------|-------|
| `duration-fast` | `150ms` |
| `duration-normal` | `250ms` |
| `duration-slow` | `350ms` |
| `ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` |

### Keyframes

| Name | Behavior |
|------|----------|
| `fade-in` | `opacity: 0 → 1` |
| `slide-up` | `opacity: 0, translateY(10px) → opacity: 1, translateY(0)` |
| `slide-down` | `opacity: 0, translateY(-10px) → opacity: 1, translateY(0)` |
| `scale-in` | `opacity: 0, scale(0.95) → opacity: 1, scale(1)` |
| `pulse-soft` | `opacity: 1 → 0.5 → 1` (2s loop) |

### Utility Classes

| Utility | Equivalent |
|---------|------------|
| `animate-fade-in` | `fade-in 250ms ease-out` |
| `animate-slide-up` | `slide-up 250ms ease-out` |
| `animate-scale-in` | `scale-in 250ms ease-out` |
| `animate-pulse-soft` | `pulse-soft 2s ease-in-out infinite` |

---

## Dark Mode

Strategy: CSS class toggle via `.dark` on `<html>`. Uses Tailwind v4 `@custom-variant dark` with `localStorage` persistence and `prefers-color-scheme` fallback.

- **Light**: `bg-white text-neutral-900` surfaces, `border-neutral-200` borders
- **Dark**: `bg-neutral-950 text-neutral-100` surfaces, `border-neutral-800` borders
- **Accent**: Unchanged across both modes (`accent-500` primary, `accent-400` hover)

---

## Component Tokens

### Button
| Variant | Light | Dark |
|---------|-------|------|
| **Primary** | `bg-neutral-900 text-white hover:bg-neutral-700` | `bg-neutral-100 text-neutral-900 hover:bg-neutral-300` |
| **Secondary** | `bg-neutral-100 text-neutral-900 hover:bg-neutral-200` | `bg-neutral-800 text-neutral-100 hover:bg-neutral-700` |
| **Outline** | `border border-neutral-300 text-neutral-700 hover:bg-neutral-100` | `border border-neutral-700 text-neutral-300 hover:bg-neutral-800` |
| **Ghost** | `text-neutral-700 hover:bg-neutral-100` | `text-neutral-400 hover:bg-neutral-800` |

### Card

| Variant | Light | Dark |
|---------|-------|------|
| **Default** | `border-neutral-200 bg-white` | `border-neutral-800 bg-neutral-900` |
| **Hover** | Same + `hover:border-neutral-400 hover:shadow-md` | Same + `hover:border-neutral-600` |
| **Featured** | `border-accent-200 bg-accent-50/30` | `border-accent-800/50 bg-accent-950/20` |

### Badge

| Variant | Light | Dark |
|---------|-------|------|
| **Default** | `bg-neutral-100 text-neutral-700` | `bg-neutral-800 text-neutral-300` |
| **Accent** | `bg-accent-100 text-accent-700` | `bg-accent-900/50 text-accent-300` |
| **Success** | `bg-success-100 text-success-700` | `bg-success-900/50 text-success-300` |
| **Warning** | `bg-warning-100 text-warning-700` | `bg-warning-900/50 text-warning-300` |
| **Error** | `bg-error-100 text-error-700` | `bg-error-900/50 text-error-300` |
