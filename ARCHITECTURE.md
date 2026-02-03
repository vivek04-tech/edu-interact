# Edu-Interact Architecture & Design System

## Overview

Edu-Interact is a **production-grade, university-focused learning platform** designed with startup scalability in mind. This document outlines the foundational architecture, design system, and component hierarchy.

---

## 🎨 Design System

### Color Palette (Antigravity-Inspired)

The platform uses a **minimal, authoritative color scheme** with three core components:

#### Light Mode
- **Primary**: Bold Black (`oklch(0.15 0 0)`) — Main actions, navigation
- **Secondary**: Soft Gray (`oklch(0.88 0 0)`) — Background accents, hover states
- **Muted**: Light Gray (`oklch(0.93 0 0)`) — Borders, subtle backgrounds
- **Accent**: Professional Blue (`oklch(0.45 0.12 240)`) — Links, highlights
- **Foreground/Background**: Black/White — Text and surface colors

#### Dark Mode
- Automatically inverted with adjusted luminance for readability
- Primary becomes white on dark backgrounds
- Accent shifts to lighter blue for contrast

### Design Tokens

All semantic colors are defined in `/app/globals.css`:

```css
:root {
  --background: oklch(1 0 0);        /* White */
  --foreground: oklch(0.15 0 0);     /* Black */
  --primary: oklch(0.15 0 0);        /* Bold Black */
  --accent: oklch(0.45 0.12 240);    /* Professional Blue */
  --muted: oklch(0.93 0 0);          /* Light Gray */
  --border: oklch(0.93 0 0);
}
```

**Why OKLch?** Perceptually uniform color space ensures consistent contrast and accessibility across light/dark themes.

---

## 📐 Component Hierarchy

### Level 1: Layout Wrappers

These components enforce consistency across all pages:

#### `PageWrapper`
- Container for all page content
- Enforces max-width (7xl), responsive padding (4-8px)
- Applies consistent background and text colors
- **Usage**: Wrap entire page content with this component

```tsx
<PageWrapper>
  <PageHeader title="..." />
  <PageSection>...</PageSection>
</PageWrapper>
```

#### `PageHeader`
- Large, confident typography for page titles
- Optional subtitle and description
- Built-in spacing and hierarchy
- **Sizes**: 4xl (mobile) → 6xl (desktop)

#### `PageSection`
- Wrapper for logical content sections
- Enforces consistent vertical spacing (mb: 12-20)
- Semantic `<section>` element for accessibility

### Level 2: Foundational Components

#### `Header`
- Sticky navigation bar with logo and CTA
- Mobile-responsive hamburger menu
- Links to main sections and role selection
- **Props**: `showNav` (boolean) to hide navigation on login page

#### `Footer`
- Company branding and links
- Four-column grid (Product, Company, Legal, Brand)
- Copyright with auto-updating year
- Responsive: 1 column mobile → 4 columns desktop

#### `HeroSection`
- Premium landing section with large typography
- Subtle background shapes (no garish decorations)
- Optional CTA buttons (primary + secondary)
- **Used on**: Home page, dashboard landing

### Level 3: Feature Components

#### `RoleCard`
- Featured card for Student/Teacher/Admin roles
- Icon + title + description + feature list
- Animated hover state with arrow indicator
- Links to role-specific pages

#### `FeatureGrid`
- Responsive grid layout (2, 3, or 4 columns)
- Icon + title + description per feature
- Supports optional header section
- **Columns**: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`

---

## 🛣️ Routing Structure (Next.js App Router)

```
/
├── / (Home page)
├── /login (Role selection & credentials)
├── /student (Student dashboard)
│   ├── /student/aktu (AKTU-specific courses)
│   └── /student/lu (Lucknow University courses)
├── /teacher (Teacher dashboard)
│   └── /teacher/[courseId] (Course management details)
└── /admin (Admin panel)
    ├── /admin/students (Student management)
    ├── /admin/teachers (Teacher approval)
    ├── /admin/courses (Course moderation)
    └── /admin/drives (Placement/internship drives)
```

---

## 🎯 Design Principles

### 1. **Minimal, Authoritative**
- Large, bold typography shows confidence
- Ample whitespace creates calm, focused interfaces
- No unnecessary decorations or gradients

### 2. **Component-Driven Consistency**
- All pages built from reusable components
- Global styles applied at the wrapper level
- Individual pages never override theme tokens

### 3. **Mobile-First Responsive**
- Base styles for mobile (< 640px)
- `sm:` breakpoint (640px) for tablets
- `lg:` breakpoint (1024px) for desktop
- All grids adjust: 1 col → 2 col → 3 col

### 4. **Semantic HTML**
- `<header>`, `<main>`, `<footer>` structure
- `<section>` for logical content blocks
- ARIA labels and `sr-only` for accessibility

---

## 🔄 State Management (Frontend)

Currently, the platform uses:
- **React `useState`** for local component state (login form, mobile menu)
- **URL query params** for navigation and filtering
- **No global state management** yet (prepare for later: Redux/Zustand when needed)

### When to Add State Management:
- Real-time notifications across multiple components
- Cross-page data persistence (authentication state)
- Complex filtering/sorting across dashboards

---

## 🔐 Authentication Flow

### Current (Demo)
- Role selection on `/login`
- Simulated 800ms authentication delay
- Redirects based on role:
  - `student` → `/student`
  - `teacher` → `/teacher`
  - `admin` → `/admin`

### Future (Production)
- Replace with real authentication (Supabase/Auth.js)
- Store role in JWT or session cookie
- Add middleware to protect role-specific routes
- Implement university verification for student role

---

## 📱 Responsive Breakpoints

```
Mobile:    < 640px  (base styles, `sm:` prefix hidden)
Tablet:    640px+   (sm: prefix active)
Desktop:   1024px+  (lg: prefix active)
Wide:      1280px+  (xl: prefix, if needed)
```

**Example**:
```tsx
<div className="text-2xl sm:text-3xl lg:text-4xl">
  {/* Mobile: 2xl, Tablet: 3xl, Desktop: 4xl */}
</div>
```

---

## 🎨 Typography System

### Fonts
- **Sans (Body)**: Geist (Google Fonts)
- **Mono (Code)**: Geist Mono (fallback: system mono)

### Sizes & Hierarchy
- **Page Titles**: `text-4xl sm:text-5xl lg:text-6xl` (bold)
- **Section Titles**: `text-2xl sm:text-3xl lg:text-4xl` (bold)
- **Body Text**: `text-base sm:text-lg` (14-18px)
- **Small Text**: `text-xs sm:text-sm` (12-14px)

### Line Height
- **Headings**: `leading-tight` (1.25)
- **Body**: `leading-relaxed` (1.625)
- **Dense**: `leading-normal` (1.5)

---

## 🔗 Component Usage Examples

### Creating a New Page

```tsx
// /app/example/page.tsx
import { Header } from '@/components/layout/header';
import { PageWrapper, PageSection, PageHeader } from '@/components/layout/page-wrapper';
import { Footer } from '@/components/layout/footer';

export default function ExamplePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header showNav={true} />
      
      <main className="flex-1">
        <PageWrapper>
          <PageSection>
            <PageHeader 
              title="Your Title"
              description="Your description"
            />
            {/* Your content here */}
          </PageSection>
        </PageWrapper>
      </main>
      
      <Footer />
    </div>
  );
}
```

### Using FeatureGrid

```tsx
<FeatureGrid
  title="Platform Features"
  description="Everything you need to succeed"
  columns={3}
  features={[
    {
      icon: <svg>...</svg>,
      title: "Feature Name",
      description: "Feature description",
    },
    // ... more features
  ]}
/>
```

### Using RoleCard

```tsx
<RoleCard
  icon={<svg>...</svg>}
  title="Student"
  description="Learn and grow your career"
  features={[
    "Feature 1",
    "Feature 2",
    "Feature 3",
  ]}
  href="/login"
  ctaText="Start Learning"
/>
```

---

## 📦 File Organization

```
app/
├── layout.tsx              # Root layout + metadata
├── globals.css             # Design tokens + theme
├── page.tsx                # Home page
├── login/
│   └── page.tsx            # Role selection + auth
├── student/
│   ├── page.tsx            # Student dashboard
│   ├── aktu/
│   │   └── page.tsx        # AKTU courses
│   └── lu/
│       └── page.tsx        # LU courses
├── teacher/
│   └── page.tsx            # Teacher dashboard
└── admin/
    └── page.tsx            # Admin panel

components/
├── layout/
│   ├── header.tsx
│   ├── footer.tsx
│   ├── page-wrapper.tsx
│   ├── hero-section.tsx
│   ├── role-card.tsx
│   └── feature-grid.tsx
└── ui/                     # shadcn/ui components (pre-installed)
    ├── button.tsx
    ├── card.tsx
    └── ... (40+ components)

lib/
├── utils.ts                # Helper functions (cn, etc.)

hooks/
├── use-mobile.ts
├── use-toast.ts
```

---

## 🚀 Next Steps (Backend Integration)

### Phase 2: Database & Authentication
1. **Supabase Integration**
   - User authentication (role-based)
   - University verification system
   - Real course content storage

2. **API Routes**
   - `/api/auth/login`
   - `/api/students/courses`
   - `/api/teachers/courses`
   - `/api/admin/approvals`

### Phase 3: Real Features
1. Video player + lecture uploads
2. Assignment submission system
3. Student-teacher messaging
4. Placement drive applications
5. Payment processing (Stripe)

---

## ✨ Design Philosophy Summary

**Edu-Interact follows these core principles:**

1. **Clarity over decoration** — Every element serves a purpose
2. **Consistency through components** — Reusable, well-designed patterns
3. **Scalability by design** — Easy to add features without redesign
4. **Accessibility first** — WCAG 2.1 AA compliance
5. **Performance-ready** — Minimal CSS, optimized images, lazy loading
6. **Mobile-first always** — Desktop is an enhancement, not the default

This foundation allows the platform to grow from MVP to Series A without major refactoring.
