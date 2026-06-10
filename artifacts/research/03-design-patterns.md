# Design Patterns Research for Developer Portfolio

_Phase 0 Research Artifact — Design System & Patterns_

---

## 1. Dark Mode Strategy: Dark-First Hybrid

### Recommendation: Dark-First with Light Toggle

**Rationale**: The developer audience (the primary target for this portfolio) overwhelmingly prefers dark mode in their tools (VS Code, terminal, GitHub). Designing dark-first creates a more native feel for this audience.

### Implementation Strategy

**Approach**: System preference detection with manual override.

```
User visits site
  ├── Check localStorage for saved preference
  ├── If saved: apply saved preference
  └── If not saved: check prefers-color-scheme
        ├── dark → apply dark
        └── light → apply light
```

**Toggle UX**: 
- Icon-based toggle (sun/moon) in site header
- Smooth CSS transition between modes
- Persist choice in localStorage
- Respect OS-level `prefers-color-scheme` as default

**Color tokens** (inspired by Geist + Tailwind CSS v4):

```css
/* Dark mode (default) */
:root {
  --bg-primary: #0a0a0a;      /* Background 1 - near black */
  --bg-secondary: #111111;    /* Background 2 - subtle elevation */
  --bg-tertiary: #1a1a1a;    /* Component background */
  --border-primary: #222222;  /* Subtle borders */
  --border-hover: #333333;   /* Border on hover */
  --text-primary: #fafafa;   /* Primary text */
  --text-secondary: #a1a1aa; /* Secondary text */
  --text-tertiary: #71717a;  /* Tertiary text */
  --accent: #3b82f6;         /* Blue accent */
  --accent-hover: #60a5fa;   /* Blue accent hover */
}

/* Light mode */
.light {
  --bg-primary: #ffffff;
  --bg-secondary: #fafafa;
  --bg-tertiary: #f4f4f5;
  --border-primary: #e4e4e7;
  --border-hover: #d4d4d8;
  --text-primary: #18181b;
  --text-secondary: #52525b;
  --text-tertiary: #a1a1aa;
  --accent: #2563eb;
  --accent-hover: #1d4ed8;
}
```

**CSS-only theme switching** (Tailwind v4 dark mode):
- Use Tailwind's `dark:` variant classes
- Toggle by adding/removing `.light` class on `<html>`
- OS preference detection via `@media (prefers-color-scheme: dark)`

---

## 2. Color Palette Recommendation

### Primary Palette

| Token | Dark Hex | Light Hex | Usage |
|-------|----------|-----------|-------|
| Background 1 | `#0A0A0A` | `#FFFFFF` | Page background |
| Background 2 | `#111111` | `#FAFAFA` | Section backgrounds |
| Surface | `#1A1A1A` | `#F4F4F5` | Cards, code blocks |
| Border | `#222222` | `#E4E4E7` | Dividers, outlines |
| Text Primary | `#FAFAFA` | `#18181B` | Headings, body |
| Text Secondary | `#A1A1AA` | `#52525B` | Subtle text |
| Accent Blue | `#3B82F6` | `#2563EB` | Links, buttons, highlights |
| Accent Green | `#22C55E` | `#16A34A` | Success, tech tags |
| Accent Amber | `#F59E0B` | `#D97706` | Warnings, highlights |

### Accent Application
- **Blue**: Primary CTA buttons, active navigation, links
- **Green**: Tech stack tags, "available for work" indicator
- **Amber**: Awards, featured project badges
- Use accents sparingly (<5% of total UI)

---

## 3. Typography System

### Typeface Selection

**Primary (Headings)**: **Geist Sans** (already in project via `next/font/google`)
- Variable font with weight range 100-900
- Designed by Vercel for developer tools
- Modern, geometric, highly readable at all sizes

**Monospace (Code)**: **Geist Mono** (already in project)
- Companion to Geist Sans
- Clean, readable at small sizes
- Perfect for code snippets and technical content

**Fallback Stack**:
```css
--font-sans: 'Geist Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 
             Roboto, 'Helvetica Neue', Arial, sans-serif;
--font-mono: 'Geist Mono', 'Fira Code', 'JetBrains Mono', 
             'SF Mono', Consolas, 'Courier New', monospace;
```

### Type Scale (Clamped Fluid Typography)

```css
/* Headings — use clamp() for fluid scaling */
--text-hero: clamp(2.5rem, 5vw, 4.5rem);    /* 40px-72px */
--text-h1: clamp(2rem, 4vw, 3.5rem);         /* 32px-56px */
--text-h2: clamp(1.5rem, 3vw, 2.5rem);        /* 24px-40px */
--text-h3: clamp(1.25rem, 2vw, 1.75rem);      /* 20px-28px */
--text-h4: clamp(1.125rem, 1.5vw, 1.375rem);  /* 18px-22px */

/* Body */
--text-body-lg: clamp(1.125rem, 1.5vw, 1.25rem);  /* 18px-20px */
--text-body: clamp(0.938rem, 1vw, 1rem);           /* 15px-16px */
--text-body-sm: clamp(0.813rem, 0.8vw, 0.875rem);  /* 13px-14px */

/* Labels */
--text-label: 0.813rem;  /* 13px fixed */
--text-caption: 0.75rem;  /* 12px fixed */
```

### Line Heights
- Headings: 1.05 - 1.15 (tight)
- Body: 1.6 - 1.75 (comfortable reading)
- Labels: 1.4 (compact)

### Typographic Texture Tips
- **Max line length**: 65-75 characters per line ideal for readability
- **Headings**: Bold weight (600-700) at all sizes
- **Body**: Regular weight (400) for desktop, slight bump for mobile
- **Code**: Monospace with 0.9x relative size to body
- **Letter-spacing**: -0.02em for headings (tight), 0 for body

---

## 4. Motion Design Patterns

### Recommendation: Subtle Motion

**Approach**: Spring-based animations for natural feel. Keep motion duration 200-500ms.

### Animation Categories

#### 1. Page Transitions (Moderate)
```
- Route change: 300ms spring
- Content fade-in: stagger 100ms per child
- No full-page transitions (adds complexity, not value)
```

#### 2. Scroll-Triggered Reveals (Subtle)
```
- Elements fade in + slide up (20-40px)
- Stagger children by 50-100ms
- Trigger at 20% into viewport
- Use IntersectionObserver via Framer Motion `whileInView`
```

#### 3. Micro-Interactions (Expressive)
```
- Button hover: scale 1.02 + slight shadow/glow
- Link hover: underline slide-in
- Card hover: subtle translateY(-2px) + border glow
- Tech tag hover: scale 1.05 + color shift
- Theme toggle: rotate icon + background fade
```

#### 4. Performance Optimizations
```
- Use transform and opacity only (GPU-accelerated)
- Respect prefers-reduced-motion
- Use will-change: transform sparingly
- Debounce scroll listeners
- Framer Motion's layout animations for list reordering
```

### Framer Motion Configuration

```typescript
// Spring presets for consistent feel
export const spring = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

export const gentleSpring = {
  type: "spring",
  stiffness: 200,
  damping: 25,
};

export const springSnap = {
  type: "spring",
  stiffness: 400,
  damping: 20,
};

// Staggered reveal
export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 25 },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};
```

---

## 5. Layout System

### Grid Architecture

**Foundation**: Tailwind CSS grid + custom container

```
Layout Structure:
┌─────────────────────────────────────────┐
│              Header (fixed)             │
│   Logo   Nav   Theme Toggle   Language  │
├─────────────────────────────────────────┤
│                                         │
│           Main Content Area             │
│         max-w-5xl mx-auto px-4          │
│                                         │
│   ┌─────────────────────────────────┐   │
│   │         Hero Section            │   │
│   └─────────────────────────────────┘   │
│                                         │
│   ┌─────────────────────────────────┐   │
│   │         About Section           │   │
│   └─────────────────────────────────┘   │
│                                         │
│   ┌──────────┐ ┌──────────┐ ┌──────────┐│
│   │  Project │ │  Project │ │  Project ││
│   │  Card    │ │  Card    │ │  Card    ││
│   └──────────┘ └──────────┘ └──────────┘│
│                                         │
│   ┌─────────────────────────────────┐   │
│   │      Experience Timeline        │   │
│   └─────────────────────────────────┘   │
│                                         │
│   ┌─────────────────────────────────┐   │
│   │         Contact Section         │   │
│   └─────────────────────────────────┘   │
│                                         │
├─────────────────────────────────────────┤
│              Footer                      │
│   Social Links   Credits   Copyright     │
└─────────────────────────────────────────┘
```

### Breakpoints (Mobile-First)
| Breakpoint | Width | Layout |
|------------|-------|--------|
| Base | <640px | Single column, stacked |
| sm | 640px | Single column, wider |
| md | 768px | 2-column grids possible |
| lg | 1024px | 3-column grids, full layout |
| xl | 1280px | Max width constraint |

### Card Design Pattern
```css
.card {
  background: var(--bg-tertiary);
  border: 1px solid var(--border-primary);
  border-radius: 12px;  /* Geist-style rounded corners */
  padding: 1.5rem;
  transition: border-color 200ms, transform 200ms;
}
.card:hover {
  border-color: var(--border-hover);
  transform: translateY(-2px);
}
```

### Spacing Scale
```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
```

---

## 6. Navigation & Interaction Patterns

### Header Navigation
- Fixed at top, semi-transparent background on scroll
- Items: About, Experience, Projects, Contact (minimal)
- Mobile: Hamburger menu with slide-in drawer
- Active section highlighted via IntersectionObserver

### Project Filtering
- Category tabs (All, Mobile, Web, Design)
- Client-side filtering with URL query parameter
- Smooth filter transitions with AnimatePresence

### Contact Pattern
- Email address (click-to-copy)
- Contact form (optional, via API route)
- Social links: GitHub, LinkedIn, Twitter/X
- Calendar booking link (optional, premium feel)

---

## 7. Accessibility Checklist

| Requirement | Implementation |
|-------------|---------------|
| Skip to content link | First focusable element |
| Semantic HTML | `<main>`, `<nav>`, `<section>`, `<article>` |
| Focus management | Visible focus rings, logical tab order |
| Color contrast | All text ≥4.5:1 ratio against backgrounds |
| prefers-reduced-motion | Disable animations when set |
| prefers-color-scheme | Respect OS dark/light preference |
| Alt text on all images | Descriptive, context-appropriate |
| ARIA labels | On interactive elements when needed |
| Keyboard navigation | All interactive elements reachable via keyboard |
| Screen reader announcements | Dynamic content changes announced |
| Language attribute | `<html lang="en">` or `<html lang="mn">` |

---

## 8. Quick Reference: Design Direction Summary

| Attribute | Choice | Rationale |
|-----------|--------|-----------|
| Mode | Dark-first with light toggle | Developer audience preference |
| Layout | Centered max-w-5xl with generous padding | Readability, breathing room |
| Grid | 4/8px foundation, 12-column responsive | Flexibility, consistency |
| Rounded corners | 8-12px (cards), 6-8px (buttons) | Modern, approachable |
| Shadows | Subtle, non-intrusive | Depth without clutter |
| Typography | Geist Sans + Geist Mono | Developer-native, clean |
| Motion | Spring-based, subtle, purposeful | Natural feel, performant |
| Accents | Blue primary, green secondary | Clear, professional hierarchy |
| Content width | 65-75 characters per line | Optimal readability |
