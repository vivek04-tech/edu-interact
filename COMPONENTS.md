# Edu-Interact Component Library

## Quick Reference

This guide explains how to use each custom component in Edu-Interact. Always use these instead of creating one-off styled divs.

---

## Layout Components

### `PageWrapper`

Outer container for all page content. Enforces max-width, padding, and color scheme.

**Location**: `/components/layout/page-wrapper.tsx`

**Props**:
- `children` (React.ReactNode) — Page content
- `className?` (string) — Additional classes (optional)

**Example**:
```tsx
<PageWrapper>
  <PageHeader title="Your Page" />
  <PageSection>
    {/* Content */}
  </PageSection>
</PageWrapper>
```

**Styling**:
- Max width: 80rem (7xl)
- Padding: responsive (4px mobile → 32px desktop)
- Background: `bg-background` (white by default)

---

### `PageHeader`

Large, confident section header with optional subtitle and description.

**Props**:
- `title` (string) — Main heading (required)
- `subtitle?` (string) — Secondary text
- `description?` (string) — Longer explanation

**Example**:
```tsx
<PageHeader 
  title="Your Courses"
  subtitle="Continue learning"
  description="Pick up where you left off and master new skills."
/>
```

**Typography**:
- Title: `text-4xl sm:text-5xl lg:text-6xl` (bold)
- Subtitle: `text-lg sm:text-xl` (muted)
- Description: `text-base sm:text-lg` (muted, max-width 2xl)

---

### `PageSection`

Semantic `<section>` wrapper with consistent vertical spacing.

**Props**:
- `children` (React.ReactNode) — Section content
- `className?` (string) — Additional classes

**Example**:
```tsx
<PageSection id="features">
  <PageHeader title="Features" />
  {/* Existing content */}
</PageSection>
```

**Spacing**: 
- Bottom margin: `mb-12 sm:mb-16 lg:mb-20`
- Use for separating logical content blocks

---

## Feature Components

### `HeroSection`

Premium hero/landing section with title, description, and CTAs. Used on home and dashboard landing pages.

**Location**: `/components/layout/hero-section.tsx`

**Props**:
- `title` (React.ReactNode) — Main headline (can include JSX)
- `description` (string) — Subheading text
- `cta?` ({text, href, variant?}) — Primary button
- `secondaryCta?` ({text, href}) — Secondary button
- `className?` (string) — Additional classes

**Example**:
```tsx
<HeroSection
  title={
    <span>
      Your Gateway to{' '}
      <span className="text-accent">Learning & Success</span>
    </span>
  }
  description="Master university courses from expert educators."
  cta={{ text: 'Get Started', href: '/login' }}
  secondaryCta={{ text: 'Learn More', href: '#features' }}
/>
```

**Features**:
- Large centered text (5xl mobile → 7xl desktop)
- Subtle animated background shapes
- Two-button layout (primary + secondary)
- Responsive on all screens

---

### `RoleCard`

Featured card showcasing each user role (Student/Teacher/Admin). Used for role selection and platform introduction.

**Location**: `/components/layout/role-card.tsx`

**Props**:
- `icon` (React.ReactNode) — Icon SVG (required)
- `title` (string) — Role name
- `description` (string) — Brief description
- `features` (string[]) — Array of feature bullets
- `href` (string) — Link destination
- `ctaText?` (string) — Button text (default: "Get Started")

**Example**:
```tsx
<RoleCard
  icon={<svg className="w-6 h-6">...</svg>}
  title="Student"
  description="Master your field, grow your network."
  features={[
    "Access curated courses",
    "Learn from experts",
    "Apply for internships",
  ]}
  href="/login"
  ctaText="Start Learning"
/>
```

**Layout**:
- Left icon (primary background)
- Title + description
- Feature list with bullet points
- Bottom CTA with arrow animation

---

### `FeatureGrid`

Flexible grid layout for displaying features, benefits, or capabilities.

**Location**: `/components/layout/feature-grid.tsx`

**Props**:
- `features` (Feature[]) — Array of features (required)
  - `icon` (React.ReactNode)
  - `title` (string)
  - `description` (string)
- `title?` (string) — Optional grid header
- `description?` (string) — Optional subheader
- `columns?` (2 | 3 | 4) — Grid columns (default: 3)

**Example**:
```tsx
<FeatureGrid
  title="Platform Features"
  description="Everything you need to succeed"
  columns={3}
  features={[
    {
      icon: <svg>...</svg>,
      title: "Learn from Experts",
      description: "Access structured courses taught by industry professionals.",
    },
    {
      icon: <svg>...</svg>,
      title: "Connect & Collaborate",
      description: "Learn from peers and build your professional network.",
    },
    {
      icon: <svg>...</svg>,
      title: "Career Opportunities",
      description: "Access internships and placement drives from top companies.",
    },
  ]}
/>
```

**Responsive Behavior**:
- **2 columns**: `grid-cols-1 sm:grid-cols-2`
- **3 columns**: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` (default)
- **4 columns**: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`

---

## Navigation Components

### `Header`

Sticky navigation header with logo, links, and CTA buttons.

**Location**: `/components/layout/header.tsx`

**Props**:
- `showNav?` (boolean) — Show nav links (default: true, hide on login)

**Example**:
```tsx
<Header showNav={true} />
```

**Features**:
- Sticky positioning (z-50)
- Mobile hamburger menu (hidden on md+)
- Desktop navigation links
- Logo + Get Started CTA
- Backdrop blur effect

**Structure**:
- Logo (clickable home link)
- Desktop nav links (Features, For Users, About)
- Desktop CTA (Sign In, Get Started)
- Mobile menu button + dropdown

---

### `Footer`

Platform footer with branding, links, and copyright.

**Location**: `/components/layout/footer.tsx`

**Features**:
- Four-column grid (Brand, Product, Company, Legal)
- Company branding with logo
- Links to main sections
- Auto-updating copyright year
- Responsive: 1 col mobile → 4 cols desktop

**Example**:
```tsx
<footer className="flex flex-col min-h-screen">
  <Header />
  <main className="flex-1">...</main>
  <Footer />
</footer>
```

---

## Icon Guidelines

All components use inline SVG icons. Use these standards:

**Icon Size**:
- Large (page headers): `w-12 h-12` or `w-16 h-16`
- Medium (cards, list items): `w-6 h-6`
- Small (badges, inline): `w-4 h-4`

**Icon Styling**:
```tsx
<svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="..." />
</svg>
```

**Color Classes**:
- `text-primary` — Main color (black)
- `text-accent` — Highlight (blue)
- `text-muted-foreground` — Subtle
- `text-primary-foreground` — On dark backgrounds

---

## Common Patterns

### Creating a Dashboard

```tsx
export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header showNav={true} />
      
      <main className="flex-1">
        <PageWrapper>
          <PageSection>
            <PageHeader title="Dashboard" />
            {/* Stats grid */}
          </PageSection>
          
          <PageSection>
            <PageHeader title="Your Content" />
            {/* Main content */}
          </PageSection>
        </PageWrapper>
      </main>
      
      <Footer />
    </div>
  );
}
```

### Creating a Landing Page

```tsx
export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header showNav={true} />
      
      <main className="flex-1">
        <HeroSection
          title="Main Headline"
          description="Subheading text"
          cta={{ text: 'CTA', href: '/action' }}
        />
        
        <PageWrapper>
          <PageSection>
            <FeatureGrid columns={3} features={[...]} />
          </PageSection>
        </PageWrapper>
      </main>
      
      <Footer />
    </div>
  );
}
```

### Creating a Role Card Grid

```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
  <RoleCard
    icon={<svg>...</svg>}
    title="Student"
    description="..."
    features={[...]}
    href="/login"
  />
  {/* More cards */}
</div>
```

---

## Tailwind Class Conventions

Always use these patterns instead of arbitrary values:

### Spacing
✅ `p-4 mb-8 gap-6` — Correct (uses spacing scale)
❌ `p-[16px] mb-[32px] gap-[24px]` — Avoid arbitrary values

### Colors
✅ `bg-primary text-foreground border-border` — Use tokens
❌ `bg-black text-white border-gray-200` — Don't hardcode

### Typography
✅ `text-lg font-bold leading-relaxed` — Semantic classes
❌ `text-[18px] font-[700] leading-[1.625]` — Avoid arbitrary

### Responsive
✅ `text-2xl sm:text-3xl lg:text-4xl` — Mobile-first
❌ `lg:text-4xl md:text-3xl text-2xl` — Don't reverse order

---

## Adding New Components

When creating a new component:

1. **Place in** `/components/layout/` (if layout-related) or `/components/` (if standalone)
2. **Follow naming**: Use PascalCase, descriptive names (`RoleCard.tsx`, not `card.tsx`)
3. **Use TypeScript**: Define prop interfaces
4. **Use design tokens**: Reference `--primary`, `--foreground`, etc.
5. **Make responsive**: Always consider mobile, tablet, desktop
6. **Document**: Add JSDoc comments for props and usage
7. **No inline styles**: Use Tailwind classes only

**Template**:
```tsx
interface ComponentProps {
  title: string;
  description?: string;
}

/**
 * MyComponent: Description of what this component does
 * Follows platform design system principles
 */
export function MyComponent({ title, description }: ComponentProps) {
  return (
    <div className="p-6 bg-card rounded-lg border border-border">
      <h2 className="text-2xl font-bold text-foreground mb-2">
        {title}
      </h2>
      {description && (
        <p className="text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
```

---

## Troubleshooting

### Component not showing styles?
- Check that `PageWrapper` wraps the content
- Verify design tokens are defined in `globals.css`
- Ensure Tailwind classes are spelled correctly

### Colors look different in dark mode?
- Check `.dark` theme in `globals.css`
- Use semantic tokens (`bg-background`) not hardcoded colors
- Test with `<html className="dark">`

### Mobile menu not working?
- Verify `Header` has `showNav={true}`
- Check z-index hierarchy (header is z-50)
- Test on actual mobile device or use DevTools

### Responsive breakpoints not working?
- Mobile-first: write base styles first
- Add `sm:`, `lg:` prefixes for larger screens
- Never reverse order: `sm:text-lg lg:text-2xl` ❌

---

## Resources

- **Design System**: `/ARCHITECTURE.md`
- **All Components**: `/components/layout/`
- **Global Styles**: `/app/globals.css`
- **Tailwind Docs**: https://tailwindcss.com
- **shadcn/ui**: Pre-installed in `/components/ui/`

---

**Last Updated**: 2026-01-31
**Maintainer**: Edu-Interact Engineering
