# Developer Portfolio — Information Architecture & Wireframes

## Overview

Dark-minimal developer portfolio with bilingual (EN/MN) support. Built with Next.js 14 (App Router), Tailwind CSS, Framer Motion, and Geist fonts. Blue accent on dark zinc background.

---

## 1. Sitemap

### Public Routes

```
/                         Home
/projects                 Projects Gallery
/projects/[slug]          Project Detail
/about                    About Me
/contact                  Contact
/404                      Custom Not Found
```

### Admin Routes (Future)

```
/admin                    Dashboard
/admin/login              Admin Login
/admin/projects           Projects CRUD List
/admin/projects/new       Create Project
/admin/projects/[id]/edit Edit Project
/admin/messages           Messages Management
```

---

## 2. Navigation Architecture

### Primary Navigation (Header)

```
[Logo: Chinguun]  [Home] [Projects] [About] [Contact]  [EN|MN]
```

- Fixed to top, backdrop-blur-md
- Active route highlighted
- Language switcher on the right
- Mobile: hamburger with slide-out drawer

### Secondary Navigation (Footer)

```
[© 2025 Chinguun. All rights reserved.]  [Built with Next.js & Tailwind CSS]
```

- Minimal, border-top separator
- No deep links

### Admin Navigation (Sidebar)

```
[Dashboard] [Projects] [Messages] [Settings]  [Logout]
```

- Collapsible sidebar
- Active section highlighted with blue accent

---

## 3. Content Hierarchy & Component Tree

### Home Page (`/`)

```
RootLayout
├── Providers (I18nProvider + PageTransition + Analytics)
├── Header
│   ├── Logo (Link to /)
│   ├── NavLinks [Home, Projects, About, Contact]
│   └── LanguageSwitcher [EN | MN]
├── <main>
│   ├── Hero Section
│   │   ├── Greeting (t("hero.greeting"))
│   │   ├── Name (t("hero.name"))
│   │   ├── Title (t("hero.title"))
│   │   ├── Subtitle (t("hero.subtitle"))
│   │   ├── CTA Button (→ /projects)
│   │   └── Secondary Button (→ /contact)
│   ├── Stats Section
│   │   ├── Stat: "10+" Projects
│   │   ├── Stat: "2+" Years Experience
│   │   ├── Stat: "5+" Happy Clients
│   │   └── Stat: "15+" Technologies
│   ├── FeaturedProjects Section
│   │   ├── Section Title + Description
│   │   └── 3× Project Cards (title, desc, tech chips, link)
│   ├── Skills Section (future)
│   │   ├── Section Title
│   │   └── Skills Grid (categorized)
│   ├── Testimonials Section (future)
│   │   ├── Section Title
│   │   └── Carousel of testimonial cards
│   └── Contact CTA Section
│       ├── Title + Description
│       └── CTA Button (→ /contact)
├── Footer
│   ├── Copyright
│   └── Made-with tagline
└── </main>
```

### Projects Page (`/projects`)

```
<main>
├── Page Header
│   ├── Title: "Projects"
│   └── Description
├── Category Filter
│   ├── [All] [Mobile] [Web] [Full Stack] [UI/UX]
│   └── Active state: filled, inactive: outline pill
├── Project Grid (AnimatePresence)
│   └── Project Cards × N
│       ├── Title
│       ├── Description (line-clamp-3)
│       ├── Technology Chips (up to 4)
│       └── "View Project →"
└── Empty State (when no results)
    └── "No projects found"
```

### Project Detail Page (`/projects/[slug]`)

```
<article>
├── Back Link ("← Back to Projects")
├── Hero Image (future: full-bleed banner)
├── Title (h1)
├── Description (longDescription)
├── Tech Stack Section
│   ├── Heading: "Tech Stack"
│   └── Chip list
├── Key Features Section
│   ├── Heading: "Key Features"
│   └── Bullet list with dot markers
├── Project Images Gallery (future: image carousel)
├── Links Section
│   ├── "View Live →" (if liveUrl)
│   └── "View Source" (if githubUrl)
└── Related Projects (future: 2-3 cards at bottom)
```

### About Page (`/about`)

```
<main>
├── Intro Section
│   ├── Title: "About Me"
│   └── Bio paragraph
├── Experience Timeline
│   ├── Timeline entry 1
│   │   ├── Title + Company
│   │   ├── Period
│   │   └── Description
│   └── Timeline entry N
├── Education Section (future)
│   └── Timeline entries
├── Skills & Technologies
│   ├── Heading
│   └── Skills Grid (2-col → 4-col)
│       └── Skill Cards (name + proficiency level)
├── Achievements Section (future)
│   └── Achievement cards
├── Languages Section (future)
│   └── Language list with proficiency
└── Contact CTA
    └── "Get in Touch →"
```

### Contact Page (`/contact`)

```
<main>
├── Page Header
│   ├── Title: "Contact Me"
│   └── Description
├── Two-column layout
│   ├── Left: Contact Info
│   │   ├── Email (with mailto link)
│   │   ├── Phone number
│   │   ├── Location
│   │   └── Social Links (future: GitHub, LinkedIn, Twitter)
│   └── Right: Contact Form
│       ├── Name input
│       ├── Email input
│       ├── Message textarea
│       ├── Submit button
│       └── Validation states (error, success, sending)
└── Map embed (future)
```

---

## 4. Wireframes (Text Diagrams)

### 4.1 Home Page

```
┌─────────────────────────────────────────────────────────┐
│ [Chinguun]    Home · Projects · About · Contact  [EN|MN]│  ← Fixed Header (blur)
├─────────────────────────────────────────────────────────┤
│                                                          │
│                    ● ○ ○ ○ ○ (motion fade)              │
│                                                          │
│  Hi, I'm                                                 │
│  Chinguun Vanchinsuren                                   │
│  Frontend Engineer                                       │
│  Flutter · Next.js · Vue.js                              │
│                                                          │
│  [ View Projects ]  [ Get in Touch ]                     │
│                                                          │
│  ────────────────── Stats ──────────────────             │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                    │
│  │ 10+  │ │ 2+   │ │ 5+   │ │ 15+  │                    │
│  │Proj. │ │Years │ │Clients│ │ Tech │                    │
│  └──────┘ └──────┘ └──────┘ └──────┘                    │
│                                                          │
│  ──────────── Featured Projects ────────────             │
│  Selected work that showcases my skills                  │
│                                                          │
│  ┌──────────────────┐ ┌──────────────────┐               │
│  │ И Клиник         │ │ Personal Portfolio│               │
│  │ A comprehensive  │ │ A modern dev      │               │
│  │ clinic mgmt sys..│ │ portfolio built.. │               │
│  │ [Flutter][Vue.js]│ │ [Next.js][TS]     │               │
│  └──────────────────┘ └──────────────────┘               │
│  ┌──────────────────┐                                    │
│  │ И Клиник Admin   │                                    │
│  │ A comprehensive  │                                    │
│  │ admin panel for..│                                    │
│  │ [Vue.js][TS]     │                                    │
│  └──────────────────┘                                    │
│                                                          │
│  ───────────── Skills & Technologies ─────               │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                    │
│  │Flutter│ │ Dart │ │Next.js│ │ React │                  │
│  │Advanced│ │Advanced│ │Advanced│ │Advanced│             │
│  └──────┘ └──────┘ └──────┘ └──────┘                    │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                    │
│  │Vue.js│ │  TS  │ │Node.js│ │Tailwind                  │
│  │Advanced│ │Advanced│ │Intermed  │Advanced               │
│  └──────┘ └──────┘ └──────┘ └──────┘                    │
│                                                          │
│  ──────────── Testimonials ──────────────                │
│  "Great developer who delivers..."                       │
│  — Client Name                                           │
│                                                          │
│  ──────────── Let's Work Together ────────               │
│  Have a project in mind?                                 │
│  [ Get in Touch → ]                                      │
│                                                          │
├─────────────────────────────────────────────────────────┤
│  © 2025 Chinguun. All rights reserved.                   │
│           Built with Next.js & Tailwind CSS              │
└─────────────────────────────────────────────────────────┘
```

### 4.2 Projects Page

```
┌─────────────────────────────────────────────────────────┐
│ [Chinguun]    Home · Projects · About · Contact  [EN|MN]│
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Projects                                                │
│  A collection of projects I've built                     │
│                                                          │
│  [All] [Mobile] [Web] [Full Stack] [UI/UX]              │
│                                                          │
│  ┌────────────────────┐ ┌────────────────────┐           │
│  │ И Клиник           │ │ Personal Portfolio │           │
│  │ A comprehensive..  │ │ A modern dev..     │           │
│  │ [Flutter][Vue.js]  │ │ [Next.js][TS]      │           │
│  │ [Node.js]          │ │ [Tailwind][FM]     │           │
│  │ View Project →     │ │ View Project →     │           │
│  └────────────────────┘ └────────────────────┘           │
│                                                          │
│  ┌────────────────────┐                                  │
│  │ И Клиник Admin     │                                  │
│  │ A comprehensive..  │                                  │
│  │ [Vue.js][TS][Vuex] │                                  │
│  │ [SCSS]             │                                  │
│  │ View Project →     │                                  │
│  └────────────────────┘                                  │
│                                                          │
├─────────────────────────────────────────────────────────┤
│  © 2025 Chinguun. All rights reserved.                   │
└─────────────────────────────────────────────────────────┘
```

### 4.3 Project Detail Page

```
┌─────────────────────────────────────────────────────────┐
│ [Chinguun]    Home · Projects · About · Contact  [EN|MN]│
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ← Back to Projects                                      │
│                                                          │
│  ┌─────────────────────────────────────────────────┐     │
│  │                                                 │     │
│  │           Project Hero Image                    │     │
│  │           (full-bleed banner)                   │     │
│  │                                                 │     │
│  └─────────────────────────────────────────────────┘     │
│                                                          │
│  И Клиник                                                 │
│  A full-featured clinic management platform...            │
│                                                          │
│  ──── Tech Stack ────                                    │
│  [Flutter] [Vue.js] [TypeScript] [Node.js]               │
│                                                          │
│  ──── Key Features ────                                  │
│  • Patient registration and management                    │
│  • Appointment scheduling system                          │
│  • Electronic health records                              │
│  • Multi-platform (Mobile + Web Admin)                    │
│                                                          │
│  ──── Project Gallery ──── (future)                      │
│  [img1] [img2] [img3]                                    │
│                                                          │
│  [ View Live → ] [ View Source ]                         │
│                                                          │
│  ──── Related Projects ──── (future)                     │
│  ┌──────────────┐ ┌──────────────┐                       │
│  │ Portfolio    │ │ Admin Panel  │                       │
│  └──────────────┘ └──────────────┘                       │
│                                                          │
├─────────────────────────────────────────────────────────┤
│  © 2025 Chinguun. All rights reserved.                   │
└─────────────────────────────────────────────────────────┘
```

### 4.4 About Page

```
┌─────────────────────────────────────────────────────────┐
│ [Chinguun]    Home · Projects · About · Contact  [EN|MN]│
├─────────────────────────────────────────────────────────┤
│                                                          │
│  About Me                                                │
│  Hi, I'm Chinguun, a Frontend Engineer passionate about  │
│  building performant, user-friendly web and mobile apps. │
│                                                          │
│  ──── Experience ────                                    │
│  │ Frontend Engineer                                     │
│  │ И Клиник │ 2024 — Present                             │
│  │ Built and maintained cross-platform clinic system...  │
│  │                                                       │
│  │ (future entries)                                      │
│                                                          │
│  ──── Education ──── (future)                            │
│  │ Bachelor's in Computer Science                        │
│  │ University Name │ 2020 — 2024                         │
│                                                          │
│  ──── Skills & Technologies ────                         │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐            │
│  │ Flutter│ │  Dart  │ │Next.js │ │ React  │            │
│  │Advanced│ │Advanced│ │Advanced│ │Advanced│            │
│  └────────┘ └────────┘ └────────┘ └────────┘            │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐            │
│  │ Vue.js │ │   TS   │ │Node.js │ │Tailwind│            │
│  │Advanced│ │Advanced│ │Intermed│ │Advanced│            │
│  └────────┘ └────────┘ └────────┘ └────────┘            │
│                                                          │
│  ──── Achievements ──── (future)                         │
│  ┌──────────────────────────────────┐                    │
│  │ 🏆 Award / Certification Name    │                    │
│  └──────────────────────────────────┘                    │
│                                                          │
│  ──── Languages ──── (future)                            │
│  Mongolian (Native) │ English (Professional)             │
│                                                          │
│  [Download CV ↓]  [ Get in Touch → ]                    │
│                                                          │
├─────────────────────────────────────────────────────────┤
│  © 2025 Chinguun. All rights reserved.                   │
└─────────────────────────────────────────────────────────┘
```

### 4.5 Contact Page

```
┌─────────────────────────────────────────────────────────┐
│ [Chinguun]    Home · Projects · About · Contact  [EN|MN]│
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Contact Me                                              │
│  Have a project in mind? Let's work together.            │
│                                                          │
│  ┌───────────────────┐ ┌─────────────────────────┐       │
│  │   Contact Info     │ │     Send a Message      │       │
│  │                    │ │                         │       │
│  │  EMAIL             │ │  Name                   │       │
│  │  chinguunv@gmail   │ │  [__________________]   │       │
│  │  .com              │ │                         │       │
│  │                    │ │  Email                  │       │
│  │  PHONE             │ │  [__________________]   │       │
│  │  95247512          │ │                         │       │
│  │                    │ │  Message                │       │
│  │  LOCATION          │ │  [__________________]   │       │
│  │  Ulaanbaatar,      │ │  [__________________]   │       │
│  │  Mongolia          │ │                         │       │
│  │                    │ │  [ Send Message ]       │       │
│  │  ── Social ──      │ │                         │       │
│  │  [GitHub][LinkedIn]│ │                         │       │
│  │  [Twitter]         │ │                         │       │
│  └───────────────────┘ └─────────────────────────┘       │
│                                                          │
├─────────────────────────────────────────────────────────┤
│  © 2025 Chinguun. All rights reserved.                   │
└─────────────────────────────────────────────────────────┘
```

### 4.6 Admin Dashboard

```
┌─────────────────────────────────────────────────────────┐
│ ☰ Admin Panel                           Chinguun ▼ [↩] │
├──────────┬──────────────────────────────────────────────┤
│          │                                              │
│ Dashboard│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐        │
│ Projects │  │ 10   │ │ 3    │ │ 5    │ │ 2    │        │
│ Messages │  │Total │ │Active│ │New   │ │Unread│        │
│ Settings │  │Proj. │ │Proj. │ │Msg   │ │Msg   │        │
│          │  └──────┘ └──────┘ └──────┘ └──────┘        │
│ ──────   │                                              │
│ Logout   │  ──────── Quick Actions ────────             │
│          │  [ + New Project ]  [ View Messages ]        │
│          │                                              │
│          │  ──────── Recent Messages ────────           │
│          │  ┌──────────────────────────────────────┐    │
│          │  │ John: "Hey, love your work!"  • 2m   │    │
│          │  ├──────────────────────────────────────┤    │
│          │  │ Sarah: "Question about..."    • 1h   │    │
│          │  ├──────────────────────────────────────┤    │
│          │  │ Mike: "Would you be open to..." • 1d │    │
│          │  └──────────────────────────────────────┘    │
│          │                                              │
└──────────┴──────────────────────────────────────────────┘
```

### 4.7 Admin Login Page

```
┌─────────────────────────────────────────────────────────┐
│                                                          │
│                                                          │
│                    Admin Login                           │
│                                                          │
│              ┌────────────────────────┐                  │
│              │   Admin Panel          │                  │
│              │                        │                  │
│              │  Email                 │                  │
│              │  [__________________]  │                  │
│              │                        │                  │
│              │  Password              │                  │
│              │  [__________________]  │                  │
│              │                        │                  │
│              │  [ Sign In ]           │                  │
│              │                        │                  │
│              │  Forgot password?      │                  │
│              └────────────────────────┘                  │
│                                                          │
│              ← Back to Portfolio                         │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### 4.8 Admin Projects CRUD

```
┌─────────────────────────────────────────────────────────┐
│ ☰ Admin Panel                           Chinguun ▼ [↩] │
├──────────┬──────────────────────────────────────────────┤
│          │                                              │
│ Dashboard│  Projects                    [ + New Project ]│
│ Projects │                                              │
│ Messages │  ┌──┬──────────┬──────────┬────────┬──────┐  │
│ Settings │  │# │  Title   │ Category │ Status │      │  │
│          │  ├──┼──────────┼──────────┼────────┼──────┤  │
│ ──────   │  │1 │И Клиник  │ Fullstack│ Published│ 📝🗑│  │
│ Logout   │  │2 │Portfolio │ Web      │ Draft  │ 📝🗑│  │
│          │  │3 │Admin Panel│ Web     │ Published│ 📝🗑│  │
│          │  └──┴──────────┴──────────┴────────┴──────┘  │
│          │                                              │
│          │  ──── Create / Edit Modal / Page ────        │
│          │  Title:    [_______________________]         │
│          │  Slug:     [_______________________]         │
│          │  Category: [Web          ▼]                  │
│          │  Tech:     [Next.js] [TypeScript] [+]        │
│          │  Desc:     [_______________________]          │
│          │  [_______________________]                    │
│          │  Features:  [+ Add Feature]                  │
│          │  Live URL:  [_______________________]         │
│          │  GitHub:    [_______________________]         │
│          │  Featured:  [✓]                              │
│          │                                              │
│          │  [ Cancel ]        [ Save Project ]          │
│          │                                              │
└──────────┴──────────────────────────────────────────────┘
```

### 4.9 Admin Messages Management

```
┌─────────────────────────────────────────────────────────┐
│ ☰ Admin Panel                           Chinguun ▼ [↩] │
├──────────┬──────────────────────────────────────────────┤
│          │                                              │
│ Dashboard│  Messages           [ Search... ] [Filter ▼] │
│ Projects │                                              │
│ Messages │  ┌────────────────────────────────────────┐  │
│ Settings │  │ ● John Doe                2 minutes ago│  │
│          │  │   "Hey, love your portfolio! Would..." │  │
│ ──────   │  │   [Reply] [Mark Read] [Delete]        │  │
│ Logout   │  ├────────────────────────────────────────┤  │
│          │  │ ● Sarah Smith             1 hour ago   │  │
│          │  │   "Question about the clinic..."       │  │
│          │  │   [Reply] [Mark Read] [Delete]        │  │
│          │  ├────────────────────────────────────────┤  │
│          │  │ ○ Mike Johnson           1 day ago     │  │
│          │  │   "Would you be open to a freelance..."│  │
│          │  │   [Reply] [Mark Read] [Delete]        │  │
│          │  └────────────────────────────────────────┘  │
│          │                                              │
│          │  ── Message Detail Overlay ──                │
│          │  ┌──────────────────────────────────┐        │
│          │  │ From: John Doe                   │        │
│          │  │ Email: john@example.com          │        │
│          │  │ Date: 2025-01-15 14:30           │        │
│          │  ├──────────────────────────────────┤        │
│          │  │ Hi Chinguun,                     │        │
│          │  │                                  │        │
│          │  │ Love your portfolio! Would you.. │        │
│          │  │ ...                              │        │
│          │  ├──────────────────────────────────┤        │
│          │  │ Reply:                           │        │
│          │  │ [__________________________]     │        │
│          │  │ [ Send Reply ]                   │        │
│          │  └──────────────────────────────────┘        │
│          │                                              │
└──────────┴──────────────────────────────────────────────┘
```

### 4.10 Mobile Navigation

```
┌─────────────────────────┐
│  [≡] Chinguun      [EN] │  ← Mobile header
├─────────────────────────┤
│                         │
│  ── Overlay Drawer ──   │
│  ┌───────────────────┐  │
│  │                   │  │
│  │   Chinguun        │  │  ← Logo
│  │                   │  │
│  │  ───────────────  │  │
│  │                   │  │
│  │  🏠 Home          │  │
│  │                   │  │
│  │  💼 Projects      │  │
│  │                   │  │
│  │  👤 About         │  │
│  │                   │  │
│  │  ✉️ Contact       │  │
│  │                   │  │
│  │  ───────────────  │  │
│  │                   │  │
│  │  EN │ MN          │  │  ← Language toggle
│  │                   │  │
│  │  ───────────────  │  │
│  │                   │  │
│  │  © 2025 Chinguun  │  │
│  └───────────────────┘  │
│                         │
│  ── Page Content ──     │
│  (dimmed behind drawer) │
│                         │
└─────────────────────────┘

Behavior:
- Hamburger → slide-in right drawer (Framer Motion)
- Overlay backdrop-blur
- Close on: [X] button, backdrop tap, link click, escape key
- Active link highlighted with blue accent
- Language toggle at bottom of drawer
```

---

## 5. Responsive Breakpoints

| Breakpoint | Width      | Layout Changes                       |
|-----------|------------|--------------------------------------|
| Mobile    | < 640px    | Single column, stacked sections      |
| Tablet    | 640-1024px | 2-column grids, side-by-side contact |
| Desktop   | > 1024px   | 3-column featured, full-width layouts|

### Specific Component Behavior

| Component             | Mobile                          | Tablet/Desktop                     |
|-----------------------|---------------------------------|------------------------------------|
| Header                | Logo + Hamburger                | Full nav links                     |
| Hero                  | Centered, smaller text           | Larger text, more whitespace       |
| Stats                 | 2-column grid                   | 4-column row                       |
| Featured Projects     | 1 column                        | 2-3 columns                        |
| Project Gallery       | 1 column                        | 2 columns                          |
| Contact (form+info)   | Stacked (info above form)       | Side-by-side 2-column              |
| About Skills          | 2-column grid                   | 4-column grid                      |
| Admin Sidebar         | Top bar with slide-out          | Fixed left sidebar                 |
| Admin Tables          | Horizontal scroll on mobile     | Full-width tables                  |
| 404 Page              | Centered, smaller               | Centered, larger                   |

---

## 6. Content Structure (i18n Keys)

### EN Keys (existing)
```json
{
  "nav": { "home", "projects", "about", "contact" },
  "hero": { "greeting", "name", "title", "subtitle", "cta", "contact" },
  "home": {
    "featured", "featuredDesc",
    "stats": { "projects", "experience", "clients", "technologies" }
  },
  "projects": {
    "title", "description", "all", "viewProject", "techStack",
    "features", "noProjects", "backToProjects"
  },
  "about": {
    "title", "intro", "experience", "education", "skills",
    "achievements", "languages", "contact"
  },
  "contact": {
    "title", "description",
    "form": { "name", "email", "message", "send", "sending", "success", "error" },
    "info": { "email", "phone", "location" }
  },
  "footer": { "copyright", "madeWith" },
  "notFound": { "title", "description", "backHome" },
  "theme": { "light", "dark" }
}
```

### Future Keys Needed

```json
{
  "home": {
    "skills": { "title", "description" },
    "testimonials": { "title", "description" },
    "cta": { "title", "description" }
  },
  "contact": {
    "form": { "namePlaceholder", "emailPlaceholder", "messagePlaceholder" },
    "social": { "github", "linkedin", "twitter" }
  },
  "about": {
    "education": "Education",
    "cv": { "download", "downloadLabel" },
    "languages": "Languages"
  },
  "admin": {
    "title": "Admin Panel",
    "login": { "title", "email", "password", "signIn", "forgotPassword", "backToPortfolio" },
    "dashboard": { "title", "totalProjects", "activeProjects", "newMessages", "unreadMessages" },
    "projects": { "title", "newProject", "editProject", "deleteProject", "search" },
    "messages": { "title", "search", "filter", "reply", "markRead", "delete", "sendReply" },
    "settings": { "title", "profile", "notifications", "appearance" },
    "quickActions": { "newProject", "viewMessages" },
    "sidebar": { "dashboard", "projects", "messages", "settings", "logout" }
  },
  "project": {
    "category": { "mobile", "web", "fullstack", "uiux", "other" },
    "status": { "published", "draft" }
  }
}
```

---

## 7. Data Flow & State Management

### Public Site
- **i18n**: React Context (`I18nProvider`) — dynamically imports EN/MN JSON
- **Theme**: Tailwind `dark:` class on `<html>` (class-based dark mode)
- **Animations**: Framer Motion variants (from `src/lib/animations.ts`)
- **Project Data**: Static content array (`src/content/projects.ts`) → filtered by category → rendered with AnimatePresence

### Admin Panel (Future)
- **Auth**: JWT-based, stored in httpOnly cookie; login route, guarded by middleware
- **Messages**: Server API route (`/api/messages`); form submit → POST → list in admin
- **Projects CRUD**: Server API routes (`/api/projects`); revalidate ISR on mutation
- **State**: React Hook Form for forms, SWR/React Query for list fetching

### API Routes (Future)
```
POST /api/contact          → Submit contact form
GET    /api/admin/messages  → List all messages (admin only)
GET    /api/admin/messages/[id] → Single message detail
DELETE /api/admin/messages/[id] → Delete message
POST   /api/admin/projects  → Create project
PUT    /api/admin/projects/[id] → Update project
DELETE /api/admin/projects/[id] → Delete project
POST   /api/admin/auth/login    → Login
POST   /api/admin/auth/logout   → Logout
GET    /api/admin/stats         → Dashboard statistics
```

---

## 8. Design Tokens (Dark Minimal)

```css
/* Colors */
--background:    zinc-950 (#09090b)
--foreground:    zinc-100  (#f4f4f5)
--muted:         zinc-800  (#27272a)
--border:        zinc-800  (#27272a)
--accent:        blue-500  (#3b82f6)
--accent-hover:  blue-400  (#60a5fa)
--card-bg:       zinc-900  (#18181b)

/* Typography */
--font-sans:     'Geist', system-ui, sans-serif
--font-mono:     'Geist Mono', monospace

/* Spacing */
--max-width:     1280px (max-w-5xl ~1024px)
--header-height: 56px (pt-14)
```

---

## 9. Accessibility Considerations

- Skip-to-content link at top of each page
- All interactive elements focusable and keyboard-navigable
- ARIA labels on icon-only buttons (hamburger, language switcher)
- Color contrast ratios ≥ 4.5:1 (zinc-100 on zinc-950 passes at 13.5:1)
- Motion media query: `prefers-reduced-motion: reduce` disables Framer Motion
- Form inputs have associated labels, validation messages via `aria-describedby`
- Language switcher sets `document.documentElement.lang` for screen readers
- Admin tables use `<th>`, `<caption>`, and proper scope attributes
- Toast notifications for form submission have `role="status"` and `aria-live="polite"`

---

## 10. Performance Considerations

- **Next.js App Router**: Server components by default, client components only where interactivity needed
- **Image Optimization**: Use `next/image` for project screenshots with WebP/AVIF
- **AnimatePresence**: `mode="wait"` to prevent layout thrash during transitions
- **i18n**: Dynamic imports per locale, cached in `messagesCache`
- **Admin**: Implement pagination/infinite scroll on messages list
- **Bundle**: Lazy-load admin routes via `next/dynamic`
- **Fonts**: `next/font` with `display: swap` for Geist font loading
